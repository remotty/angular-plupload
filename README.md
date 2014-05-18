# angular-plupload

AngularJS directive for Plupload

## Getting started

(1) Get angular-plupload via [Bower](http://bower.io/)

```sh
$ bower install angular-plupload
```
or add bower.json
```sh
$ bower install angular-plupload --save
```

(2) add javascript link to html

```html
...
<script src="bower_components/plupload/js/plupload.full.min.js"></script>
<script src="bower_components/angular-plupload/dist/angular-plupload.min.js"></script>
...
```

(3) add `'angular-plupload'` to your main module's list of dependencies

```javascript
var myApp = angular.module('myApp', ['angular-plupload']);
```

(4) enjoy!

## Quick example

### app.js (global plupload setting)

[Plupload setting](http://www.plupload.com/docs/Uploader#Uploader-settings-method)


```javascript
angular.module('myApp', ['angular-plupload'])
.config(function (pluploadOptionProvider) {
  // global setting
  pluploadOptionProvider.setOptions({
    flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
    silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
    max_file_size: '10mb',
    ...
  });
});
```


### controller

basic

```javascript
$scope.profileUpload = {
  url: '/post/1/attachment'
}
```

edit setting

```javascript
$scope.profileUpload = {
  url: '/post/1/attachment',
  options: {
    multi_selection: false,
    max_file_size: '32mb',
    headers: {
      'token': 'xxx token'
    }
  }
}
```

use callback

[Plupload event](http://www.plupload.com/docs/Uploader#events)

```javascript
$scope.profileUpload = {
  url: '/post/1/attachment',
  callbacks: {
    filesAdded: function(uploader, files) {
      $scope.loading = true;
    },
    uploadProgress: function(uploader, file) {
      $scope.loading = file.percent/100.0;
    },
    fileUploaded: function(uploader, file, response) {
      $scope.loading = false;
      alert('Upload Complete!');
    },
    error: function(uploader, error) {
      $scope.loading = false;
      alert(error.message);
    }
  }
}
```

### view

basic

```html
<a plupload="profileUpload.url">
  Upload Button
</a>
```

basic (with static value)

```html
<a plupload="'/upload'">
  Upload Button
</a>
```

edit setting

```html
<a plupload="profileUpload.url"
   plupload-options="profileUpload.options">
  Upload Button
</a>
```

use callback

```html
<a plupload="profileUpload.url"
   plupload-callbacks="profileUpload.callbacks">
  Upload Button
</a>
```

edit setting & use callback

```html
<a plupload="profileUpload.url"
   plupload-options="profileUpload.options"
   plupload-callbacks="profileUpload.callbacks">
  Upload Button
</a>
```

## Links

* [Plupload](http://www.plupload.com/)
* [Plupload API](http://www.plupload.com/docs/API)
* [Plupload API#event](http://www.plupload.com/docs/Uploader#events)
* [Plupload API#settings](http://www.plupload.com/docs/Uploader#Uploader-settings-method)

## Contributing

1. Fork it ( https://github.com/remotty/angular-plupload/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
