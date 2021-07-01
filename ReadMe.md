# ButcherBox Worth It 

ButcherBox Worth It is a Chrome Extension that gives the price per pound for items at ButcherBox.com, and tells users whether items in the custom box are a good value based on the prices listed elsewhere on the website.

## Installation

1. Clone this repository to your local machine
2. Open Google Chrome and go to "chrome://extensions/" in the address bar
3. Click "Load unpacked" in the upper left corner of the screen and select your ButcherBox Worth It folder.

## Usage

1. You will need an Butcherbox.com account in order to use this extension.
2. To use the extension, you click on the extension icon. It is recommended that you pin this to always be visible on the toolbar.
3. The first use of this extension is to give price per pound data for addon items (https://www.butcherbox.com/account/addons) and deals (https://www.butcherbox.com/account/deals)

| Before      | After      |
|------------|-------------|
|<img src="screenshots\BB Before 1.png"> | <img src="screenshots\BB After 1.png"> |
|<img src="screenshots\BB Before 2.png"> | <img src="screenshots\BB After 2.png"> |

4. The second use of this extension is to color code whether something in the custom box is worth while to purchase. This function activates at (https://www.butcherbox.com/account/customize-your-box)
Some items are much cheaper to purchase as add ons or deals, and this indicates how to get the most bang for your buck.

| Before      | After      |
|------------|-------------|
|<img src="screenshots\BB Before 3.png"> | <img src="screenshots\BB After 3.png"> |


## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT License

Copyright (c) 2021 Samuel Berger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Things I learned with this project

* The basics of creating a Chrome Extension
* How to get Firebase Database to connect with a Chrome Extension
* Using an API (Chrome API, Firebase API)
* How "complex" websites are structured since I spend so much time in the ButcherBox source code
* How to manipulate the DOM more effectively
* Its not helpful to define new functions within other functions, It is better to always just declare them indepently and then call them. Caused unnecessary refactoring
