"use strict";

import $ from 'jquery';
import jQuery from 'jquery';
import Tlp from './tlp/tpl';

window.$ = $;
window.jQuery = jQuery;


export default class App {
  constructor() {
    this._tlp = new Tlp({
      el: document.getElementById('tpl-view')
    });
  }
}


// 開始
// ===
$(function () {
  new App();
});
