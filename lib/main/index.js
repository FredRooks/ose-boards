'use strict';

var Ose = require('ose');
var M = Ose.singleton(module, 'ose/lib/kind');
exports = M.append('node').exports;

// Public {{{1
exports.init = function() {  // {{{2
  this.on('ose-control/lib/pin/commands');
  this.on('i2cBoard', i2cBoard);
  this.on('digitalBoard', digitalBoard);
};

// }}}1
// Private {{{1
function i2cBoard(req, socket) {  // {{{2
//  console.log('REGISTERING I2C BOARD', action.serialize());

  var b = this.entry.data.i2cBoards[req.index];

  if (! b) {
    Ose.link.error(socket, Ose.error(this.entry, 'invalidIndex', req));
    return;
  }

  Ose.link.close(socket, b);
  return;
};

function digitalBoard(req, socket) {  // {{{2
//  console.log('REGISTERING DIGITAL BOARD', req);

  var b = this.entry.data.digitalBoards[req.index];

  if (! b) {
    Ose.link.error(socket, Ose.error(this.entry, 'invalidIndex', req));
    return;
  }

  Ose.link.close(socket, b);
  return;
};

// }}}1
