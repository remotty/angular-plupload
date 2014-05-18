/**!
 * AngularJS Plupload directive
 * @author Chungsub Kim <subicura@subicura.com>
 */

/* global plupload */
(function () {
  'use strict';

  angular.module('angular-plupload', [])
    .provider('pluploadOption', function () {
      /* jshint camelcase: false */
      var opts = {
        runtimes: 'html5, flash, silverlight, html4',
        max_file_size: '2mb',
        filters: [
          { title: 'Image files', extensions: 'jpg,jpeg,gif,png' }
        ],
        multi_selection: true,
        autostart: true
      };
      return {
        setOptions: function (newOpts) {
          angular.extend(opts, newOpts);
        },
        $get: function () {
          return opts;
        }
      };
    })
    .directive('plupload', [
      '$timeout', 'pluploadOption', 
      function ($timeout, pluploadOption) {
        function lowercaseFirstLetter(string) {
          return string.charAt(0).toLowerCase() + string.slice(1);
        }

        return {
          scope: {
            url:'=plupload',
            options:'=pluploadOptions',
            callbacks:'=pluploadCallbacks'
          },
          /* jshint camelcase: false */
          link: function postLink(scope, element, attrs) {
            var opts = pluploadOption;
            opts.url = scope.url;
            /* jshint unused: false */
            opts.browse_button = element[0];
            angular.extend(opts, scope.options);

            var uploader = new plupload.Uploader(opts);

            if(scope.callbacks) {
              var callbackMethods = ['FilesAdded', 'UploadProgress', 'FileUploaded', 'Error'];
              angular.forEach(callbackMethods, function(method) {
                var callback = (scope.callbacks[lowercaseFirstLetter(method)] || angular.noop);
                uploader.bind(method, function() {
                  var args = arguments;
                  scope.$apply(function() {
                    callback.apply(null, args);
                  });
                });
              });
            }

            uploader.init();
          }
        };
      }
    ]
  );
})();
