'use strict';

var Ose = require('ose');
var M = Ose.singleton(module, 'ose/lib/kind');
exports = M.exports;

var Socket = M.class('./socket');

/** Doc {{{
 * @caption Relay board kind
 *
 * @readme
 * Relay board is OSE board with four relays.
 */

// Public  // {{{1
exports.init = function() {  // {{{2
  this.on('registerPin', registerPin);
};

exports.homeInit = function(entry) {  // {{{2
  entry.state = {pins: {}};

  if (entry.data.pins) {
    for (var key in entry.data.pins) {
      entry.state.pins[key] = entry.data.pins;
    }
  } else {
    new Socket(entry);
  }
};

// }}}1
// Private {{{1
function registerPin(req, socket) {  // {{{2
  console.log('RELAY BOARD REGISTER PIN', req);

  req.index = this.entry.state.pins[req.index];

  if (req.index === undefined) {
    Ose.link.error(socket, Ose.error(this, 'invalidPin', req));
  } else {
    this.entry.postTo(this.entry.data.master, 'registerPin', req, socket);
  }
};

// }}}1
