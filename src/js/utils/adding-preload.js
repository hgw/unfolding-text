//   <link rel="preload" href="assets/img/dummy/001.jpg" as="image">
import $ from 'jquery';

/**
 *
 *
 */
export default class AddingPreload {
  /**
   *
   */
  static load(imagePaths) {
    for (let i = 0; i <= imagePaths.length - 1; i += 1) {
      // chrome 以外で対応していないので link 属性は使わない
      // let code = '<link rel="preload" href="' + imagePaths[i] + '" as="image">';
      // $('head').append(code);

      let img = new Image();
      img.src = imagePaths[i];
      // img.onload = (e)=> {
        // console.log('Image has pre-loaded: ', e);
      // };
    }
  }
}

