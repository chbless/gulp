var fs = require('fs'),
    config = require('./gulp/gulp.config')(fs),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gulpTaskList = fs.readdirSync( config.baseUrl + '/gulp/tasks/' );

    console.log(config);
