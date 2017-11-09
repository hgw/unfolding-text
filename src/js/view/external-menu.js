import $ from 'jquery';
import BreakpointCheck from '../hgw/utils/breakpoint-check';
import MenuPcBehavior from './menu/menu-pc-behavior';
import MenuSpBehavior from './menu/menu-sp-behavior';


/**
 * todo: スマホ対応が未解決
 *
 */
export default class ExternalMenu {

  /**
   *
   */
  constructor() {
    this.$el = $('.js-menu-list');
    this.$spButton = $('.js-sp-menu-button');
    this._pcBehavior = new MenuPcBehavior(this.$el, this.$spButton);
    this._spBehavior = new MenuSpBehavior(this.$el, this.$spButton);
    this._behavior = null;

    // check window size
    $(window).on("resize.ExternalMenu", (e)=> {
      this._windowSizeCheck();
    });
    this._windowSizeCheck();
  }


  /**
   * ウィンドウサイズによってビヘイビアを変更
   * @private
   */
  _windowSizeCheck() {
    let windowMode = BreakpointCheck.check();

    if($('html').hasClass('ua-mobile')){
      if (this._behavior) {
        this._behavior.sleep();
      }
      this._behavior = this._spBehavior;
      this._behavior.resume();

      return;
    }

    if (windowMode == 'smartphone') {
      if (this._behavior) {
        this._behavior.sleep();
      }
      this._behavior = this._spBehavior;
      this._behavior.resume();
    } else {
      if (this._behavior) {
        this._behavior.sleep();
      }
      this._behavior = this._pcBehavior;
      this._behavior.resume();
    }
  }

}

