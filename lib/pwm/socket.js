'use strict';

var Ose = require('ose');
var M = Ose.class(module, C);

var I2c = require('i2c');

// Public {{{1
function C(entry) {  // {{{2
  this.entry = entry;

  connect(this);
};

exports.open = function(req) {  // {{{2
//  console.log('PWM BOARD SLAVE PIN OPENED');

  this.link.update(1);  // TODO read and update should accept callback with response
};

exports.close = function(req) {  // {{{2
  if (req === 'UNREACHABLE') {
    setTimeout(connect.bind(null, this), 1000);
  }
};

exports.error = function(err) {  // {{{2
  M.log.error(err);
  this.close(err.message);
};

exports.update = function(req) {  // {{{2
//  console.log('PWM BOARD SLAVE PIN UPDATED', req);

  openI2c(this.entry);
};

// }}}1
// Private {{{1
function connect(that) {  // {{{2
  var e = that.entry;

  e.find(e.data.master, function(err, master) {
    if (err) {
      Ose.link.error(this, err);
      return;
    }

    var b = e.data.i2cBoards;

    if (! b) {
      openI2c(e);
      return;
    }

    b = b[e.data.board];

    e.postTo(
      e.data.master,
      'registerPin',
      {
        index: e.data.pin,
        type: 'din',
        flavour: 'switch',
        debounce: e.state.debounce,
        tap: e.state.tapTimeout,
        hold: e.state.holdTimeout,
      },
      that
    );

    return;
  });
};

function openI2c(entry) {  // {{{2
//  console.log('OPENNING I2C BUS', entry.identify());

  if (entry.bus) {  //
    M.log.unhandled('I2C bus is already opened.');
    delete entry.bus;  // TODO Close bus correctly.
  }

  if (! (I2c && entry.data.bus && entry.data.address)) {
    M.log.notice('There is no I2C or bus is not defined. Creating dummy PWM board.', entry.identify());
    return;
  }

  entry.bus = new I2c(entry.data.address, {device: '/dev/i2c-' + entry.data.bus});

  M.log.notice('I2C bus opened.', entry.identify());

  entry.bus.writeBytes(0x00, [parseInt('00100000', 2)]);  // mode1 - enable autoincrement
  entry.bus.writeBytes(0x01, [parseInt('00000100', 2)]);  // mode2 - totem-pole

  // TODO: Read channel values.
  entry.pins.readAll();

  return;
};

// }}}1
