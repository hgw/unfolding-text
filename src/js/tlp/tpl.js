import $ from 'jquery';
import OpenEffect from '../view/effects/open-effect';

/**
 *
 * Tlp ... 論考の略です
 * tpl 形式のデータをパースして表示する
 */
export default class Tlp {

  /**
   *
   */
  constructor(opt) {
    this.el = opt.el;
    this.$el = $(this.el);
    this.effect = opt.effect;
    this.cbChange = opt.change;

    this._addEvents();
  }


  /**
   * initialize
   *
   * @private
   */
  _init() {
    this._addEvents();
  }


  /**
   *
   */
  _addEvents() {
    this._removeEvents();
    let $links = this.$el.find('.tpl-link');
    $links.off('click');
    $links.on('click', (e)=> {
      let $currentTarget = $(e.currentTarget);
      let isDeadLink = $currentTarget.hasClass('ani-button--dead');

      if (isDeadLink) {
        this.cbChange($currentTarget, false);
      } else {
        this.cbChange($currentTarget, true);
      }

      e.preventDefault();
      return false;
    });
  }


  /**
   *
   */
  _removeEvents() {
    let $links = this.$el.find('.tpl-link');
    $links.off('click');
  }


  /**
   *
   * @param $abutton
   */
  _close($abutton) {
    if (!$abutton.hasClass('ani-button--dead')) {
      return;
    }

    if ($abutton.find('.heading').length > 0) {
      $abutton.addClass('tpl-link')
    }

    let $el = $($abutton.attr('href') + ", " + $abutton.attr('href') + '--before');
    OpenEffect.fadeOut($el);

    $abutton.removeClass('ani-button--dead');
    if ($abutton.children().hasClass("heading-2")) {
      $abutton.removeClass('ani-button--heading');
    }
  }

  /**
   *
   * @param $abutton ... 対象となるボタン
   */
  _open($abutton) {

    // 改行が効かなくなるので無理やり調整
    if ($abutton.find('.heading').length > 0) {
      $abutton.removeClass('tpl-link')
    }

    // 前のやつも後ろのやつも対象とする
    let $el = $($abutton.attr('href') + ", " + $abutton.attr('href') + '--before');
    OpenEffect.fadeIn($el);
    $abutton.addClass('ani-button--dead');
    if ($abutton.children().hasClass("heading-2")) {
      $abutton.addClass('ani-button--heading');
    }
  }


  /**
   * 全て開く
   * todo: 別の class で操作しても良いかも
   */
  openAll() {
    let $links = this.$el.find('.tpl-link').not('.ani-button--dead');

    console.log('すべてのリンクをひらきます。', $links[0]);
    if ($links.length > 0) {
      this.cbChange($($links[0]), true);
      setTimeout(()=> {
        this.openAll();
      }, 1000 / 5);
    }
  }


  /**
   * ID 一覧の状態にあわせて View を更新する
   */
  updateWithIds(idList) {
    // todo ここ .tpl-link が削除されないようにしたい
    // tpl-link が削除されるリンクがあるので、.ani-button--deadもセレクタに加える
    let links = this.$el.find('.tpl-link, .ani-button--dead');
    for (let i = 0; i < links.length; i += 1) {
      let $link = $(links[i]);
      let linkTarget = $link.attr('href');
      let hit = false;
      for (let j = 0; j < idList.length; j += 1) {
        let checkTarget = idList[j];
        if (linkTarget == checkTarget) {
          hit = true;
          break;
        }
      }
      if (hit) {
        this._open($link);
      } else {
        this._close($link);
      }
    }
    $(this).trigger('update');
  }


  /**
   *
   * @returns {*}
   */
  totalChildren() {
    return this.$el.find('.tpl-link').length;
  }

  /**
   *
   * @returns {*}
   */
  restChildren() {
    return this.$el.find('.tpl-link').not('.ani-button--dead').length;
  }
}

