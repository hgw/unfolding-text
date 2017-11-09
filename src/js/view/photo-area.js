/**
 *
 * 写真エリアの表示担当
 *
 * MainSlide と同じインターフェースを保つクラスです。
 *
 */
export default class PhotoArea {


  /**
   *
   * @param $el
   * @param numMaximumImages_
   */
  constructor($el, numMaximumImages_) {
    this._$el = $el;
    this._numChildren = 0;
    this._$elChild = $('<div class="js-inner"></div>');
    this._htmlTpl = "<a class='js-photo-node'><img src='#'></a>";

    this._init();
  }


  /**
   * 初期化
   *
   * @private
   */
  _init() {
    this._$el.append(this._$elChild);
    this._$elChild.data('top', 0);

  }


  /**
   * スライドショーに画像を push する
   * @param src_
   */
  push(src_) {
    let id = "photo-" + this._numChildren;

    // make HTML
    let $node = $(this._htmlTpl);
    let className = 'js-photo-node--' + Math.floor(Math.random() * 4);

    // add CLASS and ID
    $node.addClass(className);
    $node.attr('id', id);
    $($node.find('img')).attr('src', src_);

    // appends
    this._$elChild.append($node);
    $node.hide().fadeIn(700, 'easeOutQuart');

    // scroll To
    this.to($("#" + id));

    this._numChildren += 1;
  }

  /**
   *
   */
  to($htmlNode) {
    let targetTop = $htmlNode.offset().top + (-this._$elChild.data('top'));

    // this._$elChild.css({'top': -targetTop});
    this._$elChild.css({
      "-webkit-transform": "translateY(" + (-targetTop) + "px)",
      "-moz-transform": "translateY(" + (-targetTop) + "px)",
      "-o-transform": "translateY(" + (-targetTop) + "px)",
      "-ms-transform": "translateY(" + (-targetTop) + "px)",
      "transform": "translateY(" + (-targetTop) + "px)"
    });
    this._$elChild.data('top', -targetTop);
  }

  // 画像の URL からスクロール
  toWithImgSrc(imgsrc){
    let $findHtmlNode = $(".js-photo-node img[src='"+ imgsrc +"']");
    this.to($($findHtmlNode.parent()));
  }


}

