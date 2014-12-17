'use strict';

var Ose = require('ose');
var M = Ose.class(module, C);

// Public
function C(entry) {
  this.entry = entry;

  connect(this);
};

exports.open = function(req) {
  console.log('PWM BOARD SOCKET OPEN', req);
};

exports.close = function(req) {
  if (req !== 'unknownCommand') {
    setTimeout(connect.bind(null, this), 1000);
  }
};

exports.error = function(err) {
  M.log.error(err);
  this.close(err.message);
};

exports.update = function(req) {
  console.log('PWM BOARD SOCKET MASTER PIN UPDATED', req);
};

function connect(that) {
  that.entry.postTo(
    that.entry.data.master,
    'registerI2c', 
    {
      index: that.entry.data.board,
      caption: that.entry.getCaption(),
    },
    that
  );
};

