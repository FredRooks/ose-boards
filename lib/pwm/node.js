'use strict';

var Ose = require('ose');
var M = Ose.module(module);

var Pins = M.class('ose-control/lib/pin/list');
var Socket = M.class('./socket');

// Public {{{1
exports.homeInit = function(entry) {  // {{{2
  entry.data.pinTypes = PinTypes;
  entry.data.pins = PwmPins;
  entry.pins = new Pins(entry, PinTypes, PwmPins);

  entry.socket = new Socket(entry);  // Socket to master pin controlling I2C address.
};

// }}}1
// Private {{{1
var PinTypes = {  // {{{2
  pwm: {
    read: readPin,
    write: writePin,
  },
};

var PwmPins = {};  // {{{2
for (var i = 0; i < 16; i++) {
  PwmPins[i] = {pwm: 4096};
};

function readPin(pin) {  // {{{2
  var that = pin.pins.master;

  if (pin.interval) {
    return;
  }

  if (that.bus) {
    var address = parseInt(pin.index) * 4 + 6;

    var result = that.bus.readBytes(address, 4);
    if (result.length !== 4) {
      M.log.unhandled('Read error');
      return;
    }

    var start = result[1] * 0x100 + result[0];
    var stop = result[3] * 0x100 + result[2];
    var val;

    switch (start) {
    case 0:
      if (stop === 0x1000) {
        val = 0x1000;
      } else {
        val = 0x1000 - stop;
      }
      break;
    case 0x1000:
      val = 0;
      break;
    default:
      M.log.unhandled('Invalid value', start);
      return;
    }

    if (isNaN(val) || (val < 0) || (val > 0x1000)) {
      M.log.unhandled('Invalid value.', val);
    }

    pin.send(val);

//    console.log('READ PIN', pin.index, val, result, start, stop);
  } else {
    pin.send(0);
  }
};

function writePin(pin, value, cb) {  // {{{2
//  console.log('WRITE PIN', pin.index, value);

  if (isNaN(value) || (typeof value !== 'number')) {
    cb && cb(Ose.error(pin, 'invalidValue', value));
    return;
  }

  var bus = pin.pins.master.bus;
  if (! bus) {
    cb && cb(null, true);
    return;
  }

  var address = parseInt(pin.index) * 4 + 6;

  if (value === 4096) {
    bus.writeBytes(address, [0x00, 0x00, 0x00, 0x10]);
  } else if (value === 0) {
    bus.writeBytes(address, [0x00, 0x10, 0x00, 0x00]);
  } else {
    value = 4096 - value;

    bus.writeBytes(address, [0x00, 0x00, value % 0x100, value >> 8]);
  }

  cb && cb(null, true);
  return;
};

// }}}1
