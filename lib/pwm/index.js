'use strict';

var Ose = require('ose');
var M = Ose.singleton(module, 'ose/lib/kind');
exports = M.append('node').exports;

// Public {{{1
exports.init = function() {  // {{{2
  this.on('ose-control/lib/pin/commands');
};

