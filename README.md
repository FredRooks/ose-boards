# Open Smart Environment Boards package

This package contains definitions of [kinds of entries](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html) that
represent OSE boards. These boards use the [pins](http://opensmartenvironment.github.io/doc/modules/control.pin.html) component and
allow to control < 250 V AC and < 30 V DC appliances.

Boards are intended to be used in a power distributor.

OSE boards are in development, and their production date is not yet
specified.

## Status
- Pre-alpha stage (insecure and buggy)
- Unstable API
- Gaps in the documentation
- No test suite

This is not yet a piece of download-and-use software. Its important
to understand the basic principles covered by this documentation.

Use of this software is currently recommended only for users that
wish participate in the development process (see Contributions).

TODO: Make "Contributions" a link

## Getting started
To get started with OSE, refer to the [ose-bundle](http://opensmartenvironment.github.io/doc/modules/bundle.html) package and
[Media player example application](http://opensmartenvironment.github.io/doc/modules/bundle.media.html). You can read the entire OSE
documentation [here]( http://opensmartenvironment.github.io/doc).

## Modules
Open Smart Environment Boards package consists of the following modules:
- OSE Boards core
- OSE boards content

### OSE Boards core
Core singleton of ose-boards npm package. Registers [entry kinds](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html)
defined by this package to the `control` [scope](http://opensmartenvironment.github.io/doc/classes/ose.lib.scope.html).

Module [OSE Boards core](http://opensmartenvironment.github.io/doc/classes/boards.lib.html) reference ... 

### OSE boards content
Provides files of OSE boards package to the browser.

Module [OSE boards content](http://opensmartenvironment.github.io/doc/classes/boards.content.html) reference ... 

## Contributions
To get started contributing or coding, it is good to read about the
two main npm packages [ose](http://opensmartenvironment.github.io/doc/modules/ose.html) and [ose-bb](http://opensmartenvironment.github.io/doc/modules/bb.html).

This software is in the pre-alpha stage. At the moment, it is
premature to file bugs. Input is, however, much welcome in the form
of ideas, comments and general suggestions.  Feel free to contact
us via
[github.com/opensmartenvironment](https://github.com/opensmartenvironment).

## Licence
This software is licensed under the terms of the [GNU GPL version
3](../LICENCE) or later
