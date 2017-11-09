/**
 * 6:4 比率に固定
 *
 */
export default class ElementResize {

  /**
   *
   */
  constructor(el, ratio_w, ratio_h) {
    this.$doc = $(document);
    this.$el = $(el);
    this._ratio = {
      width: ratio_w,
      height: ratio_h
    };

    if(!ratio_w){
      this._ratio.width = 4;
    }
    if(!ratio_h){
      this._ratio.height = 3;
    }

    this._addResizeEvents();
  }


  /**
   *
   * @private
   */
  _addResizeEvents() {
    this._removeResizeEvents();

    $(window).on('resize.ElementResizer', ()=> {
      this._onResizeWindow();
    });
    this._onResizeWindow();
  }

  /**
   *
   * @private
   */
  _removeResizeEvents() {
    $(window).off('resize.ElementResizer');
  }




  /**
   *
   * @private
   */
  _onResizeWindow() {

    let docWidth = this.$doc.width();
    let docHeight = this.$doc.height();
    let imgWidth = this._ratio.width;
    let imgHeight = this._ratio.height;
    let targetWidth = ElementResize.getImageLength(docWidth);
    let targetHeight = ElementResize.getImageLength(docHeight);
    let ratio = targetWidth / imgWidth;

    if (ratio * imgHeight > targetHeight) {
      ratio = targetHeight / imgHeight;
    }

    var newWidth = imgWidth * ratio;
    var newHeight = imgHeight * ratio;

    this.$el.css({
      position: 'fixed',
      width: Math.floor(newWidth) + 'px',
      height: Math.floor(newHeight) + 'px',
      left: Math.floor((docWidth - newWidth) * 0.5),
      top: Math.floor((docHeight - newHeight) * 0.5)
    });

  }

  doKill() {
    this._removeResizeEvents();
  }

  doResize() {
    this._onResizeWindow();
  }

  /**
   *
   * @param currentWinLength 現在の window の高さ・幅
   * @param maxPercentage 余白をあける % の最大値
   * @param minPercentage 余白をあける % の最小値
   * @param maxLength 縮小を始める window の最大サイズ
   * @param minLength 縮小を止める window の最小サイズ
   * @param maxMarginLength マージンの最大値
   * @returns {number}
   * @private
   */
  static getImageLength(currentWinLength, maxPercentage = 0.6, minPercentage = 0.4, maxLength = 1500, minLength = 640, maxMarginLength = 250) {
    if (currentWinLength < maxLength) {
      maxPercentage -= (maxLength - currentWinLength) / (maxLength - minLength) * minPercentage;
      if (maxPercentage <= minPercentage) maxPercentage = minPercentage;
    }
    let margin = currentWinLength * maxPercentage;
    margin = (margin > maxMarginLength) ? maxMarginLength : margin;
    return currentWinLength - margin;
  }


}

