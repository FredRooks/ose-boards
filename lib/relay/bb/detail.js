'use strict';

// Public {{{1
exports.profile = {  // {{{2
  parent: 1
  /*
  name: {
    place: 'caption',
    required: true
  }
  */
};

exports.displayLayout = function() {  // {{{2
  this.$('list').append(
    $('<li>').append([
      $('<p>').text(this.entry.id),
      this.slider('slider', {
        min: 0,
        max: 1,
        change: onChange.bind(this)
      })
    ])
  );
};

exports.updateState = function(state) {  // {{{2
  for (var key in state) {
    switch (key) {
      case 'power':
        this.slider('slider', state[key]);
        break;
    }
  }
};

// Private {{{1

function onChange(ev, isTriggered) {  // {{{2
  if (this.updatingState || isTriggered) return false;

  this.entry.sendAction({power: this.slider('slider')});

  if (ev.gesture) ev.gesture.preventDefault();
  ev.preventDefault();
  return false;
}
