'use strict';

exports = require('ose')
  .singleton(module, 'ose/lib/http/content')
  .exports
;

/** Docs  {{{1
 * @module boards
 */

/**
 * @caption OSE boards content
 *
 * @readme
 * Provides files of OSE boards package to the browser.
 *
 * @class boards.content
 * @type singleton
 * @extends ose.lib.http.content
 */

// Public {{{1
exports.addFiles = function() {
  this.addModule('lib/aio/index');
  this.addModule('lib/index');
  this.addModule('lib/main/bb/detail');
  this.addModule('lib/main/index');
  this.addModule('lib/pwm/bb/detail');
  this.addModule('lib/pwm/index');
  this.addModule('lib/relay/bb/detail');
  this.addModule('lib/relay/index');
  this.addModule('lib/relay/socket');
};

