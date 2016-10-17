Raspi Soft PWM
==============

This library provides support from node.js for managing software PWM on the Raspberry Pi. It uses the [Wiring Pi library](http://wiringpi.com/reference/software-pwm-library/) for the software PWM.

This library is almost entirely based on the excellent [Raspi-PWM](https://github.com/nebrius/raspi-pwm) by Bryan Hughes. That library lets you control the Raspberry Pi's single PWM pin.

This one lets you use any pin as a software PWM but make sure you read [Limitations](#limitations) below.

## Installation

First, be sure that you have installed [raspi](https://github.com/nebrius/raspi).

Install with NPM:

```Shell
npm install raspi-soft-pwm
```

**Warning**: this module requires GCC 4.8 or newer. This means that you should be running Raspbian Jessie or newer, released in September of 2015.

## Example Usage

```JavaScript
var raspi = require('raspi');
var SoftPWM = require('raspi-soft-pwm').SoftPWM;

raspi.init(function() {
  var pwm = new SoftPWM({
    pin: 7,
    initialValue: 0,
    range: 255
  });
  pwm.write(128); // set an LED to half brightness
});
```

## Pin Naming

The pins on the Raspberry Pi are a little complicated. There are multiple headers on some Raspberry Pis with extra pins, and the pin numbers are not consistent between Raspberry Pi board versions.

To help make it easier, you can specify pins in three ways. The first is to specify the pin by function, e.g. ```'GPIO18'```. The second way is to specify by pin number, which is specified in the form "P[header]-[pin]", e.g. ```'P1-7'```. The final way is specify the [Wiring Pi virtual pin number](http://wiringpi.com/pins/), e.g. ```7```. If you specify a number instead of a string, it is assumed to be a Wiring Pi number.

Be sure to read the [full list of pins](https://github.com/nebrius/raspi-io/wiki/Pin-Information) on the supported models of the Raspberry Pi.

## Limitations

Since the PWM isn't implemented in hardware, there are some limitations to be aware of when using the library.

Every SoftPWM pin you enable uses up about 0.5% of the CPU according to the [Wiring Pi software PWM documentation](uses approximately 0.5% of the CPU).

Your program must continue running for the software PWM to continue outputting a signal.

## API

### new SoftPWM(config)

Instantiates a new software PWM instance on the given pin.

_Arguments_:

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>config (optional)</td>
    <td>Number | String | Object</td>
    <td>The configuration for the software PWM pin. If the config is a number or string, it is assumed to be the pin number for the peripheral. If it is an object, the following properties are supported:</td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tr>
          <td>pin (optional)</td>
          <td>Number | String</td>
          <td>The pin number or descriptor for the peripheral</td>
        </tr>
        <tr>
          <td>initialValue (optional)</td>
          <td>Number</td>
          <td>Sets the initial value for the PWM on this pin.</td>
        </tr>
        <tr>
          <td>range (optional)</td>
          <td>Number</td>
          <td>Sets the maximum value that can be written to this pin.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Instance Properties

#### range

A number representing the maximum number that can be written to this pin using the `write(value)` instance method. This cannot be changed once you create a software PWM on a pin.


### Instance Methods

#### write(value)

Updates the PWM value for this pin.

_Arguments_:

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>value</td>
    <td>Number</td>
    <td>The value for the PWM to set, must be between 0 and `range`</td>
  </tr>
</table>

_Returns_: None


License
=======

The MIT License (MIT)

Copyright (c) 2016 Andrew Nicolaou <me@andrewnicolaou.co.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
