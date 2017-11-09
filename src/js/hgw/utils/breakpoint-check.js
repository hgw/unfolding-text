
/*
:before {
  content: "desktop-l";
  display: none;

  @include responsive('<', $break-point-laptop) {
    content: "desktop";
  }
  @include responsive('<', $break-point-tablet-s) {
    content: "tablet";
  }
  @include responsive('<', $break-point-mobile-l) {
    content: "smartphone";
  }
}
 */
/**
 *
 * CSS の body:before に書かれた content の値を取得する
 *
 */

export default class BreakpointCheck {
  static check() {
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  }
}
