'use strict';

var Ose = require('ose');
var M = Ose.module(module);

// Public {{{1
exports.homeInit = function(entry) {  // {{{2
  entry.state = {pins: {}};

//  entry.onActions(Actions);

  /* TODO
//  entry.postTo(entry.data.master, {registerDigital: {
  entry.action(
    'registerDigital',
    {
      index: entry.data.board,
      entry: entry.identify(),
      caption: entry.getCaption(),
    },
    entry.data.master,
    function(err, data) {
      if (err) {
        M.log.unhandled('Board not registered.', err);
      } else {
        var state = {};

        for (var i = 0; i < data.pins.length; i++) {
          state[i] = {masterPin: data.pins[i]};
        }

        entry.setState({pins: state});
      }
    }
  );
  */
};

// }}}1
//var Actions = {};  // {{{1
// }}}1
// Private {{{1
function registerPin(that, pin, data, slave) {  // {{{2
  var ps = that.state.pins[pin];
  if (ps.registered) {
    M.log.unhandled('PIN duplicity!', {powerBoard: that.identify(), pin: pin, orig: ps, data: data});
    return;
  }

  data.entry = slave.identify();
  data.registered = Ose.getTime();
  data.register = pin.substr(0, 1);
  data.index = pin.substr(1, 1);

  var state = {};
  state[pin] = data;
  that.setState({pins: state});
};

// }}}1
/* OBSOLETE {{{1
Actions.master = function(data) {  // Sent by PIC when state of some registered pin changes. {{{2
//  console.log('POWER BOARD ON MASTER', data);

  var state = {};

  if (data.pins) for (var key in this.state.pins) {
    var pin = this.state.pins[key];
    if (! (pin.masterPin in data.pins)) continue;

    var value = data.pins[pin.masterPin];
    state[key] = {value: value};

    if (pin.entry) {
      var resp = {};
      resp[key] = value;

      this.postTo(pin.entry, {master: {pins: resp}});
    }
  }

  this.setState(state);

};

Actions.register = function(that, action, cb) {  // Register Power Board PIN. {{{2
  registerPin(that, action.data.pin, action.data, action.source);  // TODO: Remove second argument.

  cb && cb(null, {registered: true});  // TODO: Call cb after succesfull pin read.
};

Actions.registerPins = function(pins, data, cb) {  // Register PIC PIN. {{{2
  for (var key in pins) {
    registerPin(this, key, pins[key]);
  }

  cb && cb(null, {registered: true});
};

// }}}2
Actions.update = function(data) {  // {{{2
//  console.log('POWER BOARD UPDATE', data);

  var action = {};

  for (var key in data) {
    var state = this.state.pins[key];

    if (! (state && state.masterPin)) {
      M.log.unhandled('There is no state', key);
      continue;
    }

    action[state.masterPin] = data[key];
  }

//  console.log('POWER BOARD SEND MASTER', action);

  this.postTo(this.data.master, {update: action});
};

}}}1 */
