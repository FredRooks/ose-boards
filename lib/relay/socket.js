'use strict';

var Ose = require('ose');
var M = Ose.class(module, C);

/** Doc {{{1
 * @caption Relay board-to-controller client socket
 */

// Public {{{1
function C(entry) {  // {{{2
  this.entry = entry;

  connect(this);
};

exports.open = function(req) {  // {{{2
  throw Ose.error(this, 'invalidResponse');
};

exports.close = function(req) {  // {{{2
//  console.log('RELAY BOARD DIGITAL BOARD RESPONSE', req);

  var s = {};
  for (var i = 0; i < req.pins.length; i++) {
    s[i] = req.pins[i];
  }

  this.entry.setState({pins: s});
};

exports.error = function(err) {  // {{{2
  M.log.error(err);
};

// }}}1
// Private {{{1
function connect(that) {  // {{{2
  that.entry.postTo(
    that.entry.data.master,
    'digitalBoard',
    {
      index: that.entry.data.board,
    },
    that
  );
};

// }}}1
