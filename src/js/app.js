"use strict";

import $ from 'jquery';
import jQuery from 'jquery';

import Tlp from './tlp/tpl';

window.$ = $;
window.jQuery = jQuery;


/**
 *
 * todo: 全て開く機能
 *
 */
export default class App {
  constructor() {
    this._tlp = new Tlp({
      el: document.getElementById('view'),
      effect: 'fade',
      change: (button, doOpen) => {
        // if (doOpen) {
        //   this._urlHashControler.add($(button).attr('href'))
        // } else {
        //   this._urlHashControler.remove($(button).attr('href'))
        // }
      }
    });
  }
}


// 開始
// ===
$(function () {
  new App();
});
