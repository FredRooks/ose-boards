'use strict';

var Ose = require('ose');
var M = Ose.package(module);
exports = M.init();

/** Docs {{{1
 * @caption Open Smart Environment Boards package
 * 
 * @readme
 * 
 * This package contains definitions of [kinds of entries] that
 * represent OSE boards. These boards use the [pins] component and
 * allow to control < 250 V AC and < 30 V DC appliances.
 *
 * Boards are intended to be used in a power distributor.
 *
 * OSE boards are in development, and their production date is not yet
 * specified.
 *
 * @aliases oseBoard oseBoards oseMainBoard oseMainBoards osePwmBoard osePwmBoards
 * @module boards
 * @main boards
 */

/**
 * @caption OSE Boards core
 *
 * @readme
 * Core singleton of ose-boards npm package. Registers [entry kinds]
 * defined by this package to the `control` [scope].
 *
 * @class boards.lib
 * @type singleton
 */

// Public {{{1
exports.browserConfig = true;

M.content();

M.scope = 'control';
//M.kind('./aio', 'oseAio');
M.kind('./main', 'oseMain');
M.kind('./pwm', 'osePwm');
M.kind('./relay', 'oseRelay');

