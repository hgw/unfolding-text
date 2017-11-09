import $ from 'jquery';
import BreakpointCheck from '../hgw/utils/breakpoint-check';
/**
 *
 */
export default class NarrationCoundown {

  /**
   *
   */
  constructor($el, totalNum_) {
    this.$el = $el;
    this.update(totalNum_);
  }

  /**
   *
   */
  update(num) {
    this.$el.text(-num);
  }
}

