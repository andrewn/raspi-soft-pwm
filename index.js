/*
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
*/

import { Peripheral } from 'raspi-peripheral';
import addon from '../build/Release/addon';

export class SoftPWM extends Peripheral {
  constructor(config) {
    let pin = null;
    let initialValue = 0;
    let range = 100;
    if (typeof config == 'number' || typeof config == 'string') {
      pin = config;
    } else if (typeof config == 'object') {
      if (typeof config.pin == 'number' || typeof config.pin == 'string') {
        pin = config.pin;
      }
      if (typeof config.initialValue == 'number') {
        initialValue = config.initialValue;
      }
      if (typeof config.range == 'number') {
        range = config.range;
      }
    }
    super(pin);
    addon.init(this.pins[0], initialValue, range);
    Object.defineProperties(this, {
      range: {
        get() {
          return range;
        },
        enumerable: true
      }
    });
  }

  write(value) {
    if (!this.alive) {
      throw new Error('Attempted to write to a destroyed peripheral');
    }
    if (typeof value != 'number' || value < 0 || value > this.range) {
      throw new Error('Invalid SoftPWM value ' + value + '. Maximum is ' + this.range);
    }
    addon.write(this.pins[0], value);
  }
}
