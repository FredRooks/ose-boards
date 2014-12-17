'use strict';

var Ose = require('ose');
var M = Ose.module(module);

var Serial = require('serialport');
var Pins = M.class('ose-control/lib/pin/list');

/* Docs {{{1
entry.state = {
  pins: {
    'E7': {
      type: "din"  // (din | dout | adc | pwm)
      slave: <slave entry identity>
      value: 1,  // current pin value
    },
    'A2': ...
    ...
  }
};

*/
// Public {{{1
exports.homeInit = function(entry) {  // {{{2
  entry.data.pinTypes = PinTypes;
  entry.data.pins = PicPins;
  entry.data.i2cBoards = I2cBoards;
  entry.data.digitalBoards = DigitalBoards;

  entry.pins = new Pins(entry, PinTypes, PicPins);

  openSerial(entry);  // TODO call openSerial after master pins initialization.

/*
  var that = this;

  this.findEntry(this.data.master, function(err, master) {
    if (err) {
      M.log.unhandled('Master not found', err);
      return;
    }

    that.master = master;
    var pin = master.registerDout(4, that);  // TODO: Read change on PIN, call openSerial after pin is turned on.
    pin.write(1);

    openSerial(that);

    return;
  });

  registerPin(this, 'D2', {
    caption: '5 V',
    type: 'digital',
    direction: 'out',
    confirm: 'true'
  });
  registerPin(this, 'K7', {
    caption: '12 V',
    type: 'digital',
    direction: 'out',
    confirm: 'true'
  });

  */
};

// }}}1
// Event Handlers {{{1
function onSerial(data) {  // {{{
//  console.log('PIC SERIAL', data);

  try {
    data = JSON.parse(data);
  } catch (err) {
    M.log.caught(err, 'Parsing data', data);

    return;
  }

  if ('ts' in data) {
    var timestamp = data.ts;  // TODO What about "timestamp"?
    delete data.ts;

    for (var key in data) {
      deviceValue(this, key, data[key]);
    }
  }

  return;
};

// }}}1
// Private  // {{{1
var PinTypes = {  // {{{2
  din: {
    read: readDigital,
  },
  dout: {
    read: readDigital,
    write: writeDout,
  }
};

var PicPins = {  // {{{2
  A0: {  // {{{3
    din: true,
    dout: true,
  },
  A1: {
    din: true,
    dout: true,
  },
  A2: {
    din: true,
    dout: true,
  },
  A3: {
    din: true,
    dout: true,
  },
  A4: {
    din: true,
    dout: true,
  },
  A5: {
    din: true,
    dout: true,
  },
  A6: {
    din: true,
    dout: true,
  },
  A7: {
    din: true,
    dout: true,
  },

  B0: {  // {{{3
    din: true,
    dout: true,
  },
  B1: {
    din: true,
    dout: true,
  },
  B2: {
    din: true,
    dout: true,
  },
  B3: {
    din: true,
    dout: true,
  },
  B4: {
    din: true,
    dout: true,
  },
  B5: {
    din: true,
    dout: true,
  },
  B6: {
    din: true,
    dout: true,
  },
  B7: {
    din: true,
    dout: true,
  },

  C0: {  // {{{3
    din: true,
    dout: true,
  },
  C1: {
    din: true,
    dout: true,
  },
  C2: {
    din: true,
    dout: true,
  },
  C3: {
    din: true,
    dout: true,
  },
  C4: {
    din: true,
    dout: true,
  },
  C5: {
    din: true,
    dout: true,
  },
  C6: {
    din: true,
    dout: true,
  },
  C7: {
    din: true,
    dout: true,
  },

  D0: {  // {{{3
    din: true,
    dout: true,
  },
  D1: {
    din: true,
    dout: true,
  },
  D2: {
    din: true,
    dout: true,
  },
  D3: {
    din: true,
    dout: true,
  },
  D4: {
    din: true,
    dout: true,
  },
  D5: {
    din: true,
    dout: true,
  },
  D6: {
    din: true,
    dout: true,
  },
  D7: {
    din: true,
    dout: true,
  },

  E0: {  // {{{3
    din: true,
    dout: true,
  },
  E1: {
    din: true,
    dout: true,
  },
  E2: {
    din: true,
    dout: true,
  },
  E3: {
    din: true,
    dout: true,
  },
  E4: {
    din: true,
    dout: true,
  },
  E5: {
    din: true,
    dout: true,
  },
  E6: {
    din: true,
    dout: true,
  },
  E7: {
    din: true,
    dout: true,
  },

  F0: {  // {{{3
    din: true,
    dout: true,
  },
  F1: {
    din: true,
    dout: true,
  },
  F2: {
    din: true,
    dout: true,
  },
  F3: {
    din: true,
    dout: true,
  },
  F4: {
    din: true,
    dout: true,
  },
  F5: {
    din: true,
    dout: true,
  },
  F6: {
    din: true,
    dout: true,
  },
  F7: {
    din: true,
    dout: true,
  },

  G0: {  // {{{3
    din: true,
    dout: true,
  },
  G1: {
    din: true,
    dout: true,
  },
  G2: {
    din: true,
    dout: true,
  },
  G3: {
    din: true,
    dout: true,
  },
  G4: {
    din: true,
    dout: true,
  },
  G5: {
    din: true,
    dout: true,
  },
  G6: {
    din: true,
    dout: true,
  },
  G7: {
    din: true,
    dout: true,
  },

  H0: {  // {{{3
    din: true,
    dout: true,
  },
  H1: {
    din: true,
    dout: true,
  },
  H2: {
    din: true,
    dout: true,
  },
  H3: {
    din: true,
    dout: true,
  },
  H4: {
    din: true,
    dout: true,
  },
  H5: {
    din: true,
    dout: true,
  },
  H6: {
    din: true,
    dout: true,
  },
  H7: {
    din: true,
    dout: true,
  },

  J0: {  // {{{3
    din: true,
    dout: true,
  },
  J1: {
    din: true,
    dout: true,
  },
  J2: {
    din: true,
    dout: true,
  },
  J3: {
    din: true,
    dout: true,
  },
  J4: {
    din: true,
    dout: true,
  },
  J5: {
    din: true,
    dout: true,
  },
  J6: {
    din: true,
    dout: true,
  },
  J7: {
    din: true,
    dout: true,
  },

  K0: {  // {{{3
    din: true,
    dout: true,
  },
  K1: {
    din: true,
    dout: true,
  },
  K2: {
    din: true,
    dout: true,
  },
  K3: {
    din: true,
    dout: true,
  },
  K4: {
    din: true,
    dout: true,
  },
  K5: {
    din: true,
    dout: true,
  },
  K6: {
    din: true,
    dout: true,
  },
  K7: {
    din: true,
    dout: true,
  },

  L0: {  // {{{3
    din: true,
    dout: true,
  },
  L1: {
    din: true,
    dout: true,
  },
  L2: {
    din: true,
    dout: true,
  },
  L3: {
    din: true,
    dout: true,
  },
  L4: {
    din: true,
    dout: true,
  },
  L5: {
    din: true,
    dout: true,
  },
  L6: {
    din: true,
    dout: true,
  },
  L7: {
    din: true,
    dout: true,
  },

  // }}}3
};

var I2cBoards = {  // {{{2
  0: 'G0',
  1: 'G1',
  2: 'G2',
  3: 'G3',
  4: 'G4',
  5: 'F7',
  6: 'F6',
  7: 'F5',
};

var DigitalBoards = {  // {{{2
  0: {  // RJ 8
    analog: 'F2',
    pins: ['K6', 'D5', 'D4', 'D3']
  },
  1: {  // RJ 9
    analog: 'C2',
    pins: ['D6', 'D7', 'J0', 'J1']
  },
  2: {  // RJ 10
    analog: 'A4',
    pins: ['K5', 'B1', 'J3', 'J2']
  },
  3: {  // RJ 11
    analog: 'A5',
    pins: ['B2', 'B3', 'B4', 'B5']
  },
  4: {  // RJ 12
    analog: 'A0',
    pins: ['C5', 'K2', 'K3', 'K4']
  },
  5: {  // RJ 13
    analog: 'A1',
    pins: ['C4', 'K1', 'C3', 'J7']
  },
  6: {  // RJ 14
    analog: 'A2',
    pins: ['C7', 'J4', 'J5', 'J6']
  },
  7: {  // RJ 15
    analog: 'A3',
    pins: ['C6', 'K0', 'C0', 'C1']
  }
};

function deviceValue(that, input, value) {  // {{{2
//  console.log('PIC SET VALUE', input, value);

  var pos = input.substring(1);

  switch (input.charAt(0)) {
    case 'a':
    /*
      var number = parseInt(pos);
      if (number != pos) throw new Error('Invalid position');
      that.analog[number].setValue(value);

      */
      that.pins.update(pos, value);
      break;
    case 'd':
    case 'o':
      that.pins.update(pos, value);
      break;
    case 'm':
      M.log.notice('Main Board unhandled response "m"');
      break;
    case 'e':
      M.log.error('PIC error', {input: input, value: value});
      break;
    default:
      M.log.unhandled('PIC deviceValue', {entry: that.identify(), input: input, value: value});
  }
};

function openSerial(that) {  // {{{2
  if (! Serial) {
    M.log.unhandled('SerialPort is not defined. Main board is not working');
    return;
  }

  M.log.notice('Opening Mainboard serial port.', that.identify());

  that.serial = new (Serial.SerialPort)(that.data.port, {
    baudrate: that.data.baudrate || 115200,
    databits: that.data.databits || 8,
    parity: that.data.parity || 'none',
    stopbits: that.data.stopbits || 1,
    parser: Serial.parsers.readline('\n')
  });

  that.serial.on('open', onOpen);  // M.log.bind('debug', 'Serial port openned'));
  that.serial.on('data', onSerial.bind(that));
  that.serial.on('error', M.log.bind('unhandled', 'Serial port error.'));

  return;

  function onOpen() {  // {{{3
    M.log.notice('Serial port openned.', that.data.port);

    that.serial.write('\n', onWriteLine);
    that.setState({serial: true});

    that.pins.readAll();
    /*
    for (var key in that.state.pins) {
      var pin = that.state.pins[key];

      switch (pin.type) {
        case 'din':
        case 'dout':
          readDigital(that, key);
          break;
        default:
          M.log.unhandled('Unknown pin type', {index: key, data: pin});
      }
    }
    */
  }

  function onWriteLine() {  // {{{3
    /*
    var counter = Ose.counter(onDone);
    writeDout(that, 'D2', true, counter.bind());  // Switch +5V on.
    writeDout(that, 'K7', true, counter.bind());  // Switch +12V on.
    counter.dec();
    */
    onDone();
  }

  function onDone() {  // {{{3
    M.log.debug('PIC modules initialized.');

    that.emit('initModules');
    that.setState({modules: true});
  }

  // }}}3
};

function readDigital(pin) {  // {{{2
  writeAio(pin.pins.master, 'g' + pin.index);
};

function writeDout(pin, value, cb) {  // {{{2
//  console.log('MAIN WRITE DOUT', pin.index, value);

  switch (value) {
  case 0:
  case '0':
  case 'off':
  case false:
    value = 0;
    break;
  case 1:
  case '1':
  case 'on':
  case true:
    value = 1;
    break;
  default:
    var err = Ose.error(pin, 'INVALID_ARGS', 'Invalid state', value);
    if (cb) {
      cb(err);
    } else {
      M.log.error(err);
    }
    return;
  }

  return writeAio(pin.pins.master, 'o' + pin.index + value, cb);
};

function writeAio(that, value, cb) {  // {{{2
  if (that.state.serial) {
//    console.log('WRITE AIO', value);

    that.serial.write(value + '\n', onWrite);
  } else {
    cb && cb(Ose.error(that, 'notConnected', value));
  }

  function onWrite(err, data) {  // {{{3
//    console.log('SERIAL WRITTEN', err, data);

    cb && cb(err);
  }

  // }}}3
};

// }}}1
/* OBSOLETE {{{1
Actions.master = function(data) {  // RPi changed GPIO pin. {{{2
//  console.log('PIC MASTER', data);

  if (data.pins) for (var key in data.pins) {
    if (key === 'GPIO4') {
      if (data.pins.GPIO4) {
        if (this.data.port && Serial) openSerial(this)
      } else {
        // TODO close serial port.
      }
    } else {
      M.log.unhandled('Invalid PIN', data);
    }
  }
};

}}}1 */
