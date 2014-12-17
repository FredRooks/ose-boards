'use strict';

var Ose = require('ose');
var M = Ose.module(module);

var List = require('ose-control/lib/pin/bb/list');

// Public {{{1
exports.profile = {  // {{{2
  name: {
    place: 'caption',
    required: true
  }
};

exports.updateState = function(state) {  // {{{2
  if (state.pins) List.updatePins(this, state.pins);
};

// }}}1
