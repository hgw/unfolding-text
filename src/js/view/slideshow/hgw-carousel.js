export default class HgwCarousel {


  /**
   *
   */
  constructor(opt) {

    this._opt = opt;
    this.$el = opt.$el;
    this.$pages = $(this.$el.find('.js-slide__item'));
    this._totalPages = this.$pages.length;
    this._currentPage = 0;
    this._fadeAnimIntervalID = 0;
    this._intervalId = 0;

    // 画像切り替えの合間の時間
    this._blankTime = 1000;

    if (opt.autoplay) {
      clearInterval(this._intervalId);
      this._intervalId = setInterval(()=> {
        this.next();
      }, opt.autoplayTimeout);
    }

    console.log(opt.autoplayTimeout);

    // この処理はここじゃなくていいかも
    for (let i = 0; i < this.$pages.length; i += 1) {
      let $page = $(this.$pages[i]);
      let src = $page.data('src');

      if (src) {
        if ($page.hasClass('js-bg-contain')) {
          console.debug('001', src);
          $page.css({'background-image': 'url(' + src + ')'});
        } else {
          console.debug('002');
          $page.attr('src', src);
        }
      }
    }

    this._updateSlide(this._currentPage, 0);

    this.$el.stop().hide().delay(100).fadeIn({
      duration: this._opt.autoplayDuration,
      easing: this._opt.easing
    });
  }


  /**
   *
   */
  /**
   *
   */
  destroy() {
    this.$el.stop().hide();
    this.$pages.stop().hide();
    this.$el = null;
    clearInterval(this._intervalId);
    clearTimeout(this._fadeAnimIntervalID);
  }

  /**
   * スライドを更新する
   * @private
   */
  _updateSlide(page, duration_) {

    let $fadeOutPage = $(this.$pages[this._currentPage]);

    // フェードアウトする
    $fadeOutPage.fadeOut({
      duration: duration_,
      easing: this._opt.easing,

      complete: ()=> {
        // すこし待つ
        this._fadeAnimIntervalID = setTimeout(()=> {
          // ページを更新
          this._currentPage = page;
          this.$pages.stop().removeClass('current').css('z-index', 0);
          let $fadeInPage = $(this.$pages[this._currentPage]);

          // フェードイン
          $fadeInPage.stop().addClass('current').css('z-index', 1).hide().fadeIn({
            duration: duration_,
            easing: this._opt.easing,
            complete: ()=> {
              this.$pages.not('.current').stop().fadeOut(0);
            }
          });
        }, this._blankTime);
      }
    });
  }


  /**
   * 次のページへ
   *
   */
  next() {

    let page = this._currentPage + 1;

    console.debug(`Hgw Carousel > page: ${page} / ${this._totalPages}`);

    if (page >= this._totalPages) {
      page = 0;

      // もし complete のコールバックが設定されてたら呼び出して終了する
      if (this._opt.complete) {

        let $fadeOutPage = $(this.$pages[this._currentPage]);


        // このあたりの処理が汚いのでどうにかしたい
        $fadeOutPage.fadeOut({
          duration: this._opt.autoplayDuration,
          easing: this._opt.easing,
          complete: ()=> {
            // フェードアウトする
            this._opt.complete();
          }
        });

        return;
      }

    }
    this._updateSlide(page, this._opt.autoplayDuration);
  }


  /**
   * 前のページへ
   *
   */
  prev() {
    let page = this._currentPage -= 1;
    if (page < 0) {
      page = this._totalPages - 1;
    }
    this._updateSlide(page, this._opt.autoplayDuration);
  }


  /**
   * どこかのページへ
   *
   * @param page
   */
  to(page) {
    if (n > 0 && n < this._totalPages) {
      this._updateSlide(page, this._opt.autoplayDuration);
    } else {
      console.warn('表示できるページ数を指定してください');
    }
  }

  /**
   * 全ページ数を取得
   *
   * @returns {*}
   */
  getTotalPages() {
    return this._totalPages;
  }


  /**
   * 現在のページを取得
   *
   * @returns {*}
   */
  getCurrentPage() {
    return this._currentPage;
  }

}
