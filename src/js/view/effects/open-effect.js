export default class OpenEffect {

  constructor() {
  }

  /**
   *
   * @param $target
   */
  static fadeIn($target) {
    $target.addClass('ani-child--show').show();
    if ($target.hasClass('inline')) {
      $target.css('display', 'inline');
    }
  }
  static fadeOut($target) {
    $target.removeClass('ani-child--show').hide();
    if ($target.hasClass('inline')) {
      $target.removeAttr('style');
    }
  }

  /**
   * パラパラ動くアニメーションにしたい
   * todo: 作成中
   * @param $target
   */
  static count($target, callback) {

    console.log('展開を開始します');
    console.log($target);


    if ($target.hasClass('inline')) {
      $target.css('display', 'inline');
    }

    let nexts = $target.children();
    let targetString = "";
    for (let i = 0; i < nexts.length; i += 1) {
      let $check = $(nexts[i]);
      if ($check.css('display') !== 'none') {
        targetString += $check.text();
      }
    }
    console.log(targetString);

    let html = $target.html();
    let count = 1;
    let total = targetString.length;
    $target.text('');

    let itvId = setInterval(function () {

      $target.text(targetString.substr(0, count));
      count += 1;

      if (count >= total - 1) {
        clearInterval(itvId);
        $target.html(html);
        callback();
      }
    }, 1000 / 30);
  }

}
