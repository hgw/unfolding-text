require('jquery-mousewheel');

/**
 *
 * マウスホイールを横方向に反応させるようにするクラス
 *
 */
export default class HorizontalWheel {

  /**
   *
   */
  constructor() {
    this._init();
  }

  /**
   *
   * initialize
   *
   * @private
   */
  _init() {

    console.log('HorizontalWheel.init');

    $('body, html').on('mousewheel', function (e) {
      console.log(e.originalEvent.deltaX, e.originalEvent.deltaY, e.originalEvent.deltaFactor);
    });
  }

}

