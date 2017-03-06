/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ivy-videojs',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {

    this._super.included.call(this, app)

    if (!process.env.EMBER_CLI_FASTBOOT) {
      var options = app.options.videojs || {};
      var env = app.env;

      console.log('running savo version of ivy-videojs');
      console.log('bowerDirectory: ', app.bowerDirectory);

      app.bowerDirectory = app.bowerDirectory || 'bower_components';

      if(app.env === 'production') {
        app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js.min.css'));
      } else {
        app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js.css'));
      }

      app.import(path.join(app.bowerDirectory, 'video.js/dist/font/VideoJS.eot'), { destDir: 'assets/font' });
      app.import(path.join(app.bowerDirectory, 'video.js/dist/font/VideoJS.svg'), { destDir: 'assets/font' });
      app.import(path.join(app.bowerDirectory, 'video.js/dist/font/VideoJS.ttf'), { destDir: 'assets/font' });
      app.import(path.join(app.bowerDirectory, 'video.js/dist/font/VideoJS.woff'), { destDir: 'assets/font' });

      app.import('vendor/ivy-videojs/shims.js', {
        exports: {
          videojs: ['default']
        }
      });

      if(app.env === 'production') {
        app.import(path.join(app.bowerDirectory, 'video.js/dist/video.min.js'));
      } else {

        app.import(path.join(app.bowerDirectory, 'video.js/dist/video.js'));
      }


      (options.languages || []).forEach(function(language) {
        app.import(path.join(app.bowerDirectory, 'video.js/dist/lang/' + language + '.js'));
      });

      app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js.swf'), { destDir: 'assets' });
    }
  }
};
