'use strict';

let errorHandler;

const pkg = require('./package.json');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const notifier = require('node-notifier');
const gutil = require('gulp-util');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const yaml = require('gulp-yaml');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const wait = require('gulp-wait');
const compass = require('gulp-compass');
const plumber = require('gulp-plumber');


const path = {};
path.root = './';
path.src = './src';
path.cache = './src/.cache';
path.dist = './dist';
path.textSrc = './text-src/index.yaml';

const options = {};
options.minify = false;


/** =======================================================
 * adding ID to html elements
 ======================================================= */
let setHbsIDs = function (target_, level_) {
  for (let i = 0; i < target_.length; i += 1) {
    let current = target_[i];
    let currentLevel = level_ + "" + i;
    current["id"] = currentLevel;
    console.log("    " + current["id"], current.text);
    if (current.children) {
      setHbsIDs(current.children, currentLevel + "-");
    }
  }
};


/** =======================================================
 * Define tasks
 ======================================================= */

/**
 * error
 * common error handler
 */
errorHandler = function (error) {
  return notifier.notify({
    message: error.message,
    title: error.plugin,
    sound: 'Glass'
  });
};


/**
 * clean / del
 */

gulp.task('clean', del.bind(null, [path.cache + '/**/*.js']));


/*
 * console.log を削除
 */
gulp.task('strip-debug', function () {
  return gulp.src(path.dist + '/js/*.js').pipe(stripDebug()).pipe(gulp.dest(path.dist + '/js/'));
});


/*
 * jsの圧縮
 */
gulp.task('compress', function () {
  return gulp.src(path.dist + '/js/*.js').pipe(uglify({
    preserveComments: 'all'
  })).pipe(gulp.dest(path.dist + '/js/'));
});


/**
 * JS
 */
gulp.task('js', () => {
  return browserify({entries: `${path.src}/js/app.js`})
    .transform(babelify.configure({presets: ['es2015']}))
    .bundle()
    .on('error', function (err) {
      console.log(err.message);
      console.log(err.codeFrame);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(options.minify ? uglify() : gutil.noop())
    .pipe(gulp.dest(`${path.dist}/js`));
});

/**
 *
 * YAML to JSON
 *
 */
gulp.task('yaml-to-json', function () {
  gulp.src(path.textSrc)
    .pipe(yaml({
      schema: 'DEFAULT_SAFE_SCHEMA'
    }))
    .pipe(gulp.dest(path.src + '/data/'))
});

gulp.task('wait-a-second', function () {
  return gulp.src(path.textSrc)
    .pipe(wait(500));
});


/**
 * handlebars をコンパイルする
 */
gulp.task('handlebars-compile', () => {
  console.log(path.dist+ 'に書き出します');
  return handlebarsCompile(path.src+'/data/index.json', 'index.html', path.cache +'/html');
});


let handlebarsCompile = function (src, filename, destPath) {
  // json のデータを読み込み
  let fs = require('fs');
  let hbsModel = JSON.parse(fs.readFileSync(src, 'utf-8'));
  console.log("handlebars 変換用に json に対して ID を設定します");
  setHbsIDs(hbsModel.body, "");

  // ***************************
  // hbsModel.config.fqdn = "/";

  let options = {
  //   batch: [path.src + '/hbs/partials'],
    helpers: {
      isExistBothValues: function (v1, v2, options) {
        if (v1 || v2) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      }
    }
  };

  return gulp.src(path.src + '/handlebars/tpl.hbs')
    .pipe(handlebars(hbsModel, options))
    // .pipe(handlebars(hbsModel))
    .pipe(rename(filename))
    .pipe(gulp.dest(destPath));
};



gulp.task('compass-deploy', function () {
  return gulp.src(path.src + '/scss/*.scss').pipe(plumber({
    errorHandler: errorHandler
  })).pipe(compass({
    config_file: './config.rb',
    css: path.dist + '/css/',
    sass: path.src + '/scss/',
    environment: "production",
    comments: false,
    force: true
  }));
});



/**
 * HTML Minify
 */
gulp.task('minify', function () {
  return gulp.src(path.cache + '/html/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.dist));
});


/**
 * Watch
 */
gulp.task('watch', function (callback) {
  gulp.watch(
    [
      path.src + '/scss/**/*.scss'
    ],
    function (e) {
      return runSequence(
        'compass-dev',
        "notify-complete_compass"
      );
    });
  gulp.watch(
    [
      `${path.src}/js/**/*.js`
    ], [
      'js',
      "notify-complete_js"
    ]);
  gulp.watch(
    [
      `${path.src}/hbs/**/*.hbs`,
      `${path.src}/yaml/**/*.yml`
    ],
    function () {
      return runSequence(
        'clean',
        'yaml-to-json',
        'wait-a-second',
        'handlebars-compile',
        'minify',
        'js',
        "notify-complete_yaml"
      );
    }
  );
});


/**
 *
 * notify
 *
 */
gulp.task('notify-start_watching', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Start: Watching!'
  });
});

gulp.task('notify-complete_js', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Complete: Javascript'
  });
});

gulp.task('notify-complete_compass', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Complete: Compass'
  });
});

gulp.task('notify-complete_deploy', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Complete: Deploy'
  });
});

gulp.task('notify-complete_yaml', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Complete: YAML and Handlebars!'
  });
});


/**
 * task default
 */
gulp.task('default', function () {
  return runSequence(
    'clean',
    'yaml-to-json',
    'compass-deploy',
    'wait-a-second',
    'handlebars-compile',
    'minify',
    'js',
    "notify-start_watching",
    "watch"
  );
});
