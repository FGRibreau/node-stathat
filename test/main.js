var sinon = require('sinon'),
    assert = require('assert');

var stathatKey = 'abc';

describe('Test StatHat', function() {
  var stathat;

  beforeEach(function() {
    stathat = require('../main');
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

    it('should post and yield when called with a callback', function() {
      stathat.postRequest = sinon.stub().yields();
      var callback = sinon.stub();
      stathat.trackValue(stathatKey, 'baby steps', 1, callback);
      sinon.assert.calledOnce(stathat.postRequest);
      sinon.assert.calledOnce(callback);
    });
  });

  describe('#postQueue', function() {
    it('honors STATHAT_OUTBOUND_CONCURRENCY', function() {
      stathat = require('../main').setup({
        concurrency: 11
      });
      assert.equal(stathat.postQueue.concurrency, 11);
    });
  });
});
