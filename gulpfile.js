'use strict';


const pkg = require('./package.json');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const notifier = require('node-notifier');
// const gutil = require('gulp-util');
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


const path = {
  root: './',
  src: './src',
  cache: './src/.cache',
  dist: './dist',
  textSrc: './text-src/index.yaml',
};

/** =======================================================
 * Utility
 ======================================================= */
let setHbsIDs = function (target_, level_) {
  for (let i = 0; i < target_.length; i += 1) {
    let current = target_[i];
    let currentLevel = level_ + "" + i;
    current["id"] = currentLevel;
    // console.log("    " + current["id"], current.text);
    if (current.children) {
      setHbsIDs(current.children, currentLevel + "-");
    }
  }
};


let doCompileHandlebars = function (src, fileName, distPath) {
  // json のデータを読み込み
  let fs = require('fs');
  let hbsModel = JSON.parse(fs.readFileSync(src, 'utf-8'));
  console.log("handlebars 変換用に json に対して ID を設定します");
  setHbsIDs(hbsModel.body, "");

  let options = {
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
    .pipe(rename(fileName))
    .pipe(gulp.dest(distPath));
};


/** =======================================================
 * Delete
 ======================================================= */

/**
 * clean / del
 */
gulp.task('clean', del.bind(null, [
  path.cache + '/**/*.html',
  path.cache + '/**/*.js',
  path.cache + '/**/*.css'
]));


/** =======================================================
 * CSS / compass
 ======================================================= */

gulp.task('deploy-css', function () {
  return gulp.src(path.src + '/scss/*.scss').pipe(plumber({
    errorHandler: function (error) {
      return notifier.notify({
        message: error.message,
        title: error.plugin,
        sound: 'Glass'
      });
    }
  })).pipe(compass({
    config_file: './config.rb',
    css: path.dist + '/css/',
    sass: path.src + '/scss/',
    environment: "production",
    comments: false,
    force: true
  }));
});


/** =======================================================
 * Javascript
 ======================================================= */

/**
 * Javascript: remove console.log
 */
gulp.task('strip-debug', function () {
  return gulp.src(path.dist + '/js/*.js')
    .pipe(stripDebug())
    .pipe(gulp.dest(path.dist + '/js/'));
});


/*
 * Javascript: compress
 */
gulp.task('compress', function () {
  return gulp.src(path.dist + '/js/*.js')
    .pipe(uglify({
      preserveComments: 'all'
    }))
    .pipe(gulp.dest(path.dist + '/js/'));
});


/**
 * Javascript: compile
 */
gulp.task('js-browserify', () => {
  return browserify({
    entries: `${path.src}/js/app.js`
  })
    .transform(babelify.configure({presets: ['es2015']}))
    .bundle()
    .on('error', function (err) {
      console.log(err.message);
      console.log(err.codeFrame);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify()) // gutil.noop()
    .pipe(gulp.dest(`${path.dist}/js`));
});


/** =======================================================
 * YAML / Handlebars
 ======================================================= */

/**
 * YAML Document to JSON
 */
gulp.task('yaml-to-json', function () {
  gulp.src(path.textSrc)
    .pipe(yaml({
      schema: 'DEFAULT_SAFE_SCHEMA'
    }))
    .pipe(gulp.dest(path.src + '/data/'))
});

/**
 * Handlebars
 */
gulp.task('compile-handlebars', () => {
  return doCompileHandlebars(path.src + '/data/index.json', 'index.html', path.cache + '/html');
});


/** =======================================================
 * HTML
 ======================================================= */

/**
 * HTML Minify
 */
gulp.task('minify-html', function () {
  return gulp.src(path.cache + '/html/**/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
    }))
    .pipe(gulp.dest(path.dist));
});


/** =======================================================
 * Notify
 ======================================================= */

gulp.task('nf-start-watching', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Start: Watching...'
  });
});

gulp.task('nf-complete-js', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Complete: Javascript!'
  });
});

gulp.task('nf-complete-css', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Complete: Compass!'
  });
});

gulp.task('nf-complete-deploy', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Complete: Deploy!'
  });
});

gulp.task('nf-complete-yaml', function () {
  return notifier.notify({
    title: pkg.name,
    message: 'Complete: Handlebars!'
  });
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
        "nf-complete-css"
      );
    });
  gulp.watch(
    [
      `${path.src}/js/**/*.js`
    ], [
      'js',
      "nf-complete-js"
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
        'compile-handlebars',
        'minify-html',
        'js-browserify',
        "nf-complete-yaml"
      );
    }
  );
});


/**
 * task default
 */
gulp.task('default', function () {
  return runSequence(
    'clean',
    'yaml-to-json',
    'deploy-css',
    'compile-handlebars',
    'minify-html',
    'js-browserify',
    "nf-start-watching",
    "watch"
  );
});
