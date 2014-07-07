# node-stathat [![Build Status](https://drone.io/github.com/FGRibreau/node-stathat/status.png)](https://drone.io/github.com/FGRibreau/node-stathat/latest) [![Gittip](http://badgr.co/gittip/fgribreau.png)](https://www.gittip.com/fgribreau/) [![Deps](https://david-dm.org/FGRibreau/node-stathat.png)](https://david-dm.org/FGRibreau/node-stathat)

Stathat client for NodeJS that handles concurrency and auto-retry

[![npm](https://nodei.co/npm/node-stathat.png)](https://npmjs.org/package/node-stathat)

### Usage

```javascript
var stathat = require('node-stathat'); // default config
var stathat = require('node-stathat').setup({
  // your own configuration
});

stathat.trackEZCount('you@example.com', 'messages sent - female to male', 3, function(status, json) {
    console.log("status: " + status);
    console.log("json:   " + json);
});
```

### Configuration

```javascript
{
  // How many requests should `node-stathat` we send at the same time
  concurrency: 4,

  // Should node-stathat use https requests
  useHTTPS: false,

  // `request-retry` options
  request: {
    maxAttempts: 5,   // try 5 times
    retryDelay: 5000  // wait for 5s before trying again
  }
}
```

## Methods

Extracted from the official [nodejs stathat readme](https://raw.githubusercontent.com/stathat/shlibs/master/node/README.md).

### stathat.trackEZCount(email, stat_name, count, callback)

Track a counter using the EZ API.  `stat_name` can be a new stat name and
you can create new stats for your account in the middle of your code
without having to create them on the stathat.com site.  The callback is
called with the status of the call and the json response.

### stathat.trackEZValue(email, stat_name, value, callback)

Track a value using the EZ API.  `stat_name` can be a new stat name and
you can create new stats for your account in the middle of your code
without having to create them on the stathat.com site.  The callback is
called with the status of the call and the json response.

### stathat.trackCount(user_key, stat_key, count, callback)

Track a counter using the classic API.  Get `user_key` and `stat_key`
from the details page for a stat on [stathat.com](http://www.stathat.com).
The callback is called with the the status of the call and the json response.

### stathat.trackValue(user_key, stat_key, value, callback)

Track a value using the classic API.  Get `user_key` and `stat_key`
from the details page for a stat on [stathat.com](http://www.stathat.com).
The callback is called with the the status of the call and the json response.


### Credits

Inspired from [async-stathat](https://github.com/jmontrose/async-stathat/blob/master/main.js) and [stathat](https://github.com/stathat/shlibs/blob/master/node/main.js).

### License

Copyright (c) 2014, Francois-Guillaume Ribreau node@fgribreau.com.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
