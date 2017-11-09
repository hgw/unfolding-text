import $ from 'jquery';

/**
 *
 *
 */
export default class Effect {

  /**
   *
   */
  constructor() {

    this._init = false;

    let $select = $('.main a');

    $select.on("click.effect", (e) => {
      this._init = true;
      $select.off("click.effect");

      let top = $(e.currentTarget).offset().top - 100;
      $('html,body').animate({
        scrollTop: top
      }, 750);

    });
  }

}

