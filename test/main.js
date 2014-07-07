'use strict';
var sinon = require('sinon'),
    t     = require('assert');

var stathatKey = 'abc';
var EMAIL      = process.env.EMAIL;

if(!EMAIL){
  throw new Error('Please specify a valid stathat email in order to run the tests');
}

describe('Test StatHat', function() {
  var stathat;


  beforeEach(function() {
    stathat = require('../main').setup();
  });

  describe('#trackValue', function() {

    it('should enqueue when called without a callback', function() {
      stathat.postQueue.push = sinon.stub();
      stathat.trackValue(stathatKey, 'baby steps', 1);
      sinon.assert.calledWith(
        stathat.postQueue.push,
        {
          params: {
            key: "baby steps",
            ukey: "abc",
            value: 1 },
          path: "/v" });
    });

    it('should pop queue automatically', function(f){
      stathat.postRequest = function(){
        f();
      };
      stathat.trackValue(stathatKey, 'baby steps', 1);
    });

    it('should post and yield when called with a callback', function() {
      stathat.postRequest = sinon.stub().yields();
      var callback = sinon.stub();
      stathat.trackValue(stathatKey, 'baby steps', 1, callback);
      sinon.assert.calledOnce(stathat.postRequest);
      sinon.assert.calledOnce(callback);
    });
  });

  describe('#trackEZCount', function () {
    it('should post count and return a 200 status', function(f) {
      stathat.trackEZCount(stathatKey, 'run test', 1, function(status, json){
        t.strictEqual(status, 200);
        t.deepEqual(json, {'status':200,'msg':'ok'});
        f();
      });
    });
  });

  describe('#postQueue', function() {
    it('honors STATHAT_OUTBOUND_CONCURRENCY', function() {
      stathat = require('../main').setup({
        concurrency: 11
      });
      t.equal(stathat.postQueue.concurrency, 11);
    });
  });
});
