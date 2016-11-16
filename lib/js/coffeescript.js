'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _btoa = require('btoa');

var _btoa2 = _interopRequireDefault(_btoa);

var _compilerBase = require('../compiler-base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inputMimeTypes = ['text/coffeescript'];
let coffee = null;

/**
 * @access private
 */
class CoffeeScriptCompiler extends _compilerBase.SimpleCompilerBase {
  constructor() {
    super();
    this.compilerOptions.sourceMap = true;
  }

  static getInputMimeTypes() {
    return inputMimeTypes;
  }

  compileSync(sourceCode, filePath) {
    coffee = coffee || require('coffee-script');

    var _coffee$compile = coffee.compile(sourceCode, Object.assign({ filename: filePath }, this.compilerOptions));

    let js = _coffee$compile.js,
        v3SourceMap = _coffee$compile.v3SourceMap;


    js = `${ js }\n` + `//# sourceMappingURL=data:application/json;base64,${ (0, _btoa2.default)(unescape(encodeURIComponent(v3SourceMap))) }\n` + `//# sourceURL=${ this.convertFilePath(filePath) }`;

    return {
      code: js,
      mimeType: 'application/javascript'
    };
  }

  convertFilePath(filePath) {
    if (process.platform === 'win32') {
      filePath = `/${ _path2.default.resolve(filePath).replace(/\\/g, '/') }`;
    }

    return encodeURI(filePath);
  }

  getCompilerVersion() {
    return require('coffee-script/package.json').version;
  }
}
exports.default = CoffeeScriptCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9jb2ZmZWVzY3JpcHQuanMiXSwibmFtZXMiOlsiaW5wdXRNaW1lVHlwZXMiLCJjb2ZmZWUiLCJDb2ZmZWVTY3JpcHRDb21waWxlciIsImNvbnN0cnVjdG9yIiwiY29tcGlsZXJPcHRpb25zIiwic291cmNlTWFwIiwiZ2V0SW5wdXRNaW1lVHlwZXMiLCJjb21waWxlU3luYyIsInNvdXJjZUNvZGUiLCJmaWxlUGF0aCIsInJlcXVpcmUiLCJjb21waWxlIiwiT2JqZWN0IiwiYXNzaWduIiwiZmlsZW5hbWUiLCJqcyIsInYzU291cmNlTWFwIiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjb252ZXJ0RmlsZVBhdGgiLCJjb2RlIiwibWltZVR5cGUiLCJwcm9jZXNzIiwicGxhdGZvcm0iLCJyZXNvbHZlIiwicmVwbGFjZSIsImVuY29kZVVSSSIsImdldENvbXBpbGVyVmVyc2lvbiIsInZlcnNpb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLE1BQU1BLGlCQUFpQixDQUFDLG1CQUFELENBQXZCO0FBQ0EsSUFBSUMsU0FBUyxJQUFiOztBQUVBOzs7QUFHZSxNQUFNQyxvQkFBTiwwQ0FBc0Q7QUFDbkVDLGdCQUFjO0FBQ1o7QUFDQSxTQUFLQyxlQUFMLENBQXFCQyxTQUFyQixHQUFpQyxJQUFqQztBQUNEOztBQUVELFNBQU9DLGlCQUFQLEdBQTJCO0FBQ3pCLFdBQU9OLGNBQVA7QUFDRDs7QUFFRE8sY0FBWUMsVUFBWixFQUF3QkMsUUFBeEIsRUFBa0M7QUFDaENSLGFBQVNBLFVBQVVTLFFBQVEsZUFBUixDQUFuQjs7QUFEZ0MsMEJBR1JULE9BQU9VLE9BQVAsQ0FDdEJILFVBRHNCLEVBRXRCSSxPQUFPQyxNQUFQLENBQWMsRUFBRUMsVUFBVUwsUUFBWixFQUFkLEVBQXNDLEtBQUtMLGVBQTNDLENBRnNCLENBSFE7O0FBQUEsUUFHM0JXLEVBSDJCLG1CQUczQkEsRUFIMkI7QUFBQSxRQUd2QkMsV0FIdUIsbUJBR3ZCQSxXQUh1Qjs7O0FBT2hDRCxTQUFNLElBQUVBLEVBQUcsS0FBTixHQUNGLHNEQUFvRCxvQkFBS0UsU0FBU0MsbUJBQW1CRixXQUFuQixDQUFULENBQUwsQ0FBZ0QsS0FEbEcsR0FFRixrQkFBZ0IsS0FBS0csZUFBTCxDQUFxQlYsUUFBckIsQ0FBK0IsR0FGbEQ7O0FBSUEsV0FBTztBQUNMVyxZQUFNTCxFQUREO0FBRUxNLGdCQUFVO0FBRkwsS0FBUDtBQUlEOztBQUVERixrQkFBZ0JWLFFBQWhCLEVBQTBCO0FBQ3hCLFFBQUlhLFFBQVFDLFFBQVIsS0FBcUIsT0FBekIsRUFBa0M7QUFDaENkLGlCQUFZLEtBQUcsZUFBS2UsT0FBTCxDQUFhZixRQUFiLEVBQXVCZ0IsT0FBdkIsQ0FBK0IsS0FBL0IsRUFBc0MsR0FBdEMsQ0FBMkMsR0FBMUQ7QUFDRDs7QUFFRCxXQUFPQyxVQUFVakIsUUFBVixDQUFQO0FBQ0Q7O0FBRURrQix1QkFBcUI7QUFDbkIsV0FBT2pCLFFBQVEsNEJBQVIsRUFBc0NrQixPQUE3QztBQUNEO0FBckNrRTtrQkFBaEQxQixvQiIsImZpbGUiOiJjb2ZmZWVzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBidG9hIGZyb20gJ2J0b2EnO1xuaW1wb3J0IHtTaW1wbGVDb21waWxlckJhc2V9IGZyb20gJy4uL2NvbXBpbGVyLWJhc2UnO1xuXG5jb25zdCBpbnB1dE1pbWVUeXBlcyA9IFsndGV4dC9jb2ZmZWVzY3JpcHQnXTtcbmxldCBjb2ZmZWUgPSBudWxsO1xuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2ZmZWVTY3JpcHRDb21waWxlciBleHRlbmRzIFNpbXBsZUNvbXBpbGVyQmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jb21waWxlck9wdGlvbnMuc291cmNlTWFwID0gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRJbnB1dE1pbWVUeXBlcygpIHtcbiAgICByZXR1cm4gaW5wdXRNaW1lVHlwZXM7XG4gIH1cblxuICBjb21waWxlU3luYyhzb3VyY2VDb2RlLCBmaWxlUGF0aCkge1xuICAgIGNvZmZlZSA9IGNvZmZlZSB8fCByZXF1aXJlKCdjb2ZmZWUtc2NyaXB0Jyk7XG5cbiAgICBsZXQge2pzLCB2M1NvdXJjZU1hcH0gPSBjb2ZmZWUuY29tcGlsZShcbiAgICAgIHNvdXJjZUNvZGUsXG4gICAgICBPYmplY3QuYXNzaWduKHsgZmlsZW5hbWU6IGZpbGVQYXRoIH0sIHRoaXMuY29tcGlsZXJPcHRpb25zKSk7XG5cbiAgICBqcyA9IGAke2pzfVxcbmAgK1xuICAgICAgYC8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJHtidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh2M1NvdXJjZU1hcCkpKX1cXG5gICtcbiAgICAgIGAvLyMgc291cmNlVVJMPSR7dGhpcy5jb252ZXJ0RmlsZVBhdGgoZmlsZVBhdGgpfWA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29kZToganMsXG4gICAgICBtaW1lVHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnXG4gICAgfTtcbiAgfVxuXG4gIGNvbnZlcnRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICBmaWxlUGF0aCA9IGAvJHtwYXRoLnJlc29sdmUoZmlsZVBhdGgpLnJlcGxhY2UoL1xcXFwvZywgJy8nKX1gO1xuICAgIH1cblxuICAgIHJldHVybiBlbmNvZGVVUkkoZmlsZVBhdGgpO1xuICB9XG5cbiAgZ2V0Q29tcGlsZXJWZXJzaW9uKCkge1xuICAgIHJldHVybiByZXF1aXJlKCdjb2ZmZWUtc2NyaXB0L3BhY2thZ2UuanNvbicpLnZlcnNpb247XG4gIH1cbn1cbiJdfQ==