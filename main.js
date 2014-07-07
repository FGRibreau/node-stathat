// StatHat API node.js module
var _       =require('lodash');
var async   = require('async');
var request = require('requestretry');

var DEFAULT = {
  // How many requests should we send at the same time
  concurrency: 4,
  useHTTPS: false,

  // Request option
  request: {
    maxAttempts: 5,   // try 5 times
    retryDelay: 5000  // wait for 5s before trying again
  }
};

function StatHat(options){
  this.opts = _.defaults(options || {}, DEFAULT);
  this.opts.concurrency = parseInt(this.opts.concurrency, 10);
  this.postQueue        = async.queue(this.processTask.bind(this), this.opts.concurrency);
}

StatHat.prototype = {
  postRequest: function(path, params, f) {
    var options = _.defaults({
      url: 'http' + (this.opts.useHTTPS ? 's':'') + '://api.stathat.com',
      method: 'POST',
      form: params
    }, this.opts.requestOptions);

    request(options, function(err, response, body){
      if(err){
        return f(600, err.message, body);
      }

      f(response.statusCode, body);
    });
  },

  queueOrPostRequest: function(path, params, f) {
    if (_.isFunction(f)) {
      this.postRequest(path, params, f);
    } else {
      this.postQueue.push({
        path: path,
        params: params
      });
    }
  },

  processTask: function(task, f) {
    this.postRequest(task.path, task.params, function(status, data) {
      if (status !== 200) {
        // @todo, emit error
        console.log('stathat post error', task, status, data);
      }
      f();
    });
  },

  length: function() {
    return this.postQueue.length();
  },
  trackValue: function(user_key, stat_key, value, f) {
    this.queueOrPostRequest('/v', {
      key: stat_key,
      ukey: user_key,
      value: value
    }, f);
  },

  trackValueWithTime: function(user_key, stat_key, value, timestamp, f) {
    this.queueOrPostRequest('/v', {
      key: stat_key,
      ukey: user_key,
      value: value,
      t: timestamp
    }, f);
  },

  trackCount: function(user_key, stat_key, count, f) {
    this.queueOrPostRequest('/c', {
      key: stat_key,
      ukey: user_key,
      count: count
    }, f);
  },

  trackCountWithTime: function(user_key, stat_key, count, timestamp, f) {
    this.queueOrPostRequest('/c', {
      key: stat_key,
      ukey: user_key,
      count: count,
      t: timestamp
    }, f);
  },

  trackEZValue: function(ezkey, stat_name, value, f) {
    this.queueOrPostRequest('/ez', {
      ezkey: ezkey,
      stat: stat_name,
      value: value
    }, f);
  },

  trackEZValueWithTime: function(ezkey, stat_name, value, timestamp, f) {
    this.queueOrPostRequest('/ez', {
      ezkey: ezkey,
      stat: stat_name,
      value: value,
      t: timestamp
    }, f);
  },

  trackEZCount: function(ezkey, stat_name, count, f) {
    this.queueOrPostRequest('/ez', {
      ezkey: ezkey,
      stat: stat_name,
      count: count
    }, f);
  },

  trackEZCountWithTime: function(ezkey, stat_name, count, timestamp, f) {
    this.queueOrPostRequest('/ez', {
      ezkey: ezkey,
      stat: stat_name,
      count: count,
      t: timestamp
    }, f);
  }
};

module.exports = new StatHat();

module.exports.setup = function(options){
  return new StatHat(options);
};

module.exports.StatHat = StatHat;
