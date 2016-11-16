'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _compilerBase = require('../compiler-base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const mimeTypes = ['text/less'];
let lessjs = null;

/**
 * @access private
 */
class LessCompiler extends _compilerBase.CompilerBase {
  constructor() {
    super();

    this.compilerOptions = {
      sourceMap: { sourceMapFileInline: true }
    };

    this.seenFilePaths = {};
  }

  static getInputMimeTypes() {
    return mimeTypes;
  }

  shouldCompileFile(fileName, compilerContext) {
    return _asyncToGenerator(function* () {
      return true;
    })();
  }

  determineDependentFiles(sourceCode, filePath, compilerContext) {
    return _asyncToGenerator(function* () {
      return [];
    })();
  }

  compile(sourceCode, filePath, compilerContext) {
    var _this = this;

    return _asyncToGenerator(function* () {
      lessjs = lessjs || require('less');

      let thisPath = _path2.default.dirname(filePath);
      _this.seenFilePaths[thisPath] = true;

      let paths = Object.keys(_this.seenFilePaths);

      if (_this.compilerOptions.paths) {
        paths.push(..._this.compilerOptions.paths);
      }

      let opts = Object.assign({}, _this.compilerOptions, {
        paths: paths,
        filename: _path2.default.basename(filePath)
      });

      let result = yield lessjs.render(sourceCode, opts);

      return {
        code: result.css,
        mimeType: 'text/css'
      };
    })();
  }

  shouldCompileFileSync(fileName, compilerContext) {
    return true;
  }

  determineDependentFilesSync(sourceCode, filePath, compilerContext) {
    return [];
  }

  compileSync(sourceCode, filePath, compilerContext) {
    lessjs = lessjs || require('less');

    let source = '';
    let error = null;

    let thisPath = _path2.default.dirname(filePath);
    this.seenFilePaths[thisPath] = true;

    let paths = Object.keys(this.seenFilePaths);

    if (this.compilerOptions.paths) {
      paths.push(...this.compilerOptions.paths);
    }

    let opts = Object.assign({}, this.compilerOptions, {
      paths: paths,
      filename: _path2.default.basename(filePath),
      fileAsync: false, async: false, syncImport: true
    });

    lessjs.render(sourceCode, opts, (err, out) => {
      if (err) {
        error = err;
      } else {
        // NB: Because we've forced less to work in sync mode, we can do this
        source = out.css;
      }
    });

    if (error) {
      throw error;
    }

    return {
      code: source,
      mimeType: 'text/css'
    };
  }

  getCompilerVersion() {
    return require('less/package.json').version;
  }
}
exports.default = LessCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jc3MvbGVzcy5qcyJdLCJuYW1lcyI6WyJtaW1lVHlwZXMiLCJsZXNzanMiLCJMZXNzQ29tcGlsZXIiLCJjb25zdHJ1Y3RvciIsImNvbXBpbGVyT3B0aW9ucyIsInNvdXJjZU1hcCIsInNvdXJjZU1hcEZpbGVJbmxpbmUiLCJzZWVuRmlsZVBhdGhzIiwiZ2V0SW5wdXRNaW1lVHlwZXMiLCJzaG91bGRDb21waWxlRmlsZSIsImZpbGVOYW1lIiwiY29tcGlsZXJDb250ZXh0IiwiZGV0ZXJtaW5lRGVwZW5kZW50RmlsZXMiLCJzb3VyY2VDb2RlIiwiZmlsZVBhdGgiLCJjb21waWxlIiwicmVxdWlyZSIsInRoaXNQYXRoIiwiZGlybmFtZSIsInBhdGhzIiwiT2JqZWN0Iiwia2V5cyIsInB1c2giLCJvcHRzIiwiYXNzaWduIiwiZmlsZW5hbWUiLCJiYXNlbmFtZSIsInJlc3VsdCIsInJlbmRlciIsImNvZGUiLCJjc3MiLCJtaW1lVHlwZSIsInNob3VsZENvbXBpbGVGaWxlU3luYyIsImRldGVybWluZURlcGVuZGVudEZpbGVzU3luYyIsImNvbXBpbGVTeW5jIiwic291cmNlIiwiZXJyb3IiLCJmaWxlQXN5bmMiLCJhc3luYyIsInN5bmNJbXBvcnQiLCJlcnIiLCJvdXQiLCJnZXRDb21waWxlclZlcnNpb24iLCJ2ZXJzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxZQUFZLENBQUMsV0FBRCxDQUFsQjtBQUNBLElBQUlDLFNBQVMsSUFBYjs7QUFFQTs7O0FBR2UsTUFBTUMsWUFBTixvQ0FBd0M7QUFDckRDLGdCQUFjO0FBQ1o7O0FBRUEsU0FBS0MsZUFBTCxHQUF1QjtBQUNyQkMsaUJBQVcsRUFBRUMscUJBQXFCLElBQXZCO0FBRFUsS0FBdkI7O0FBSUEsU0FBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNEOztBQUVELFNBQU9DLGlCQUFQLEdBQTJCO0FBQ3pCLFdBQU9SLFNBQVA7QUFDRDs7QUFFS1Ms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b0Q7a0JBQWxDekMsWSIsImZpbGUiOiJsZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge0NvbXBpbGVyQmFzZX0gZnJvbSAnLi4vY29tcGlsZXItYmFzZSc7XG5cbmNvbnN0IG1pbWVUeXBlcyA9IFsndGV4dC9sZXNzJ107XG5sZXQgbGVzc2pzID0gbnVsbDtcblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVzc0NvbXBpbGVyIGV4dGVuZHMgQ29tcGlsZXJCYXNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29tcGlsZXJPcHRpb25zID0ge1xuICAgICAgc291cmNlTWFwOiB7IHNvdXJjZU1hcEZpbGVJbmxpbmU6IHRydWUgfVxuICAgIH07XG5cbiAgICB0aGlzLnNlZW5GaWxlUGF0aHMgPSB7fTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRJbnB1dE1pbWVUeXBlcygpIHtcbiAgICByZXR1cm4gbWltZVR5cGVzO1xuICB9XG5cbiAgYXN5bmMgc2hvdWxkQ29tcGlsZUZpbGUoZmlsZU5hbWUsIGNvbXBpbGVyQ29udGV4dCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgZGV0ZXJtaW5lRGVwZW5kZW50RmlsZXMoc291cmNlQ29kZSwgZmlsZVBhdGgsIGNvbXBpbGVyQ29udGV4dCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGFzeW5jIGNvbXBpbGUoc291cmNlQ29kZSwgZmlsZVBhdGgsIGNvbXBpbGVyQ29udGV4dCkge1xuICAgIGxlc3NqcyA9IGxlc3NqcyB8fCByZXF1aXJlKCdsZXNzJyk7XG5cbiAgICBsZXQgdGhpc1BhdGggPSBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xuICAgIHRoaXMuc2VlbkZpbGVQYXRoc1t0aGlzUGF0aF0gPSB0cnVlO1xuXG4gICAgbGV0IHBhdGhzID0gT2JqZWN0LmtleXModGhpcy5zZWVuRmlsZVBhdGhzKTtcblxuICAgIGlmICh0aGlzLmNvbXBpbGVyT3B0aW9ucy5wYXRocykge1xuICAgICAgcGF0aHMucHVzaCguLi50aGlzLmNvbXBpbGVyT3B0aW9ucy5wYXRocyk7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbXBpbGVyT3B0aW9ucywge1xuICAgICAgcGF0aHM6IHBhdGhzLFxuICAgICAgZmlsZW5hbWU6IHBhdGguYmFzZW5hbWUoZmlsZVBhdGgpXG4gICAgfSk7XG5cbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbGVzc2pzLnJlbmRlcihzb3VyY2VDb2RlLCBvcHRzKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb2RlOiByZXN1bHQuY3NzLFxuICAgICAgbWltZVR5cGU6ICd0ZXh0L2NzcydcbiAgICB9O1xuICB9XG5cbiAgc2hvdWxkQ29tcGlsZUZpbGVTeW5jKGZpbGVOYW1lLCBjb21waWxlckNvbnRleHQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGRldGVybWluZURlcGVuZGVudEZpbGVzU3luYyhzb3VyY2VDb2RlLCBmaWxlUGF0aCwgY29tcGlsZXJDb250ZXh0KSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29tcGlsZVN5bmMoc291cmNlQ29kZSwgZmlsZVBhdGgsIGNvbXBpbGVyQ29udGV4dCkge1xuICAgIGxlc3NqcyA9IGxlc3NqcyB8fCByZXF1aXJlKCdsZXNzJyk7XG5cbiAgICBsZXQgc291cmNlID0gJyc7XG4gICAgbGV0IGVycm9yID0gbnVsbDtcblxuICAgIGxldCB0aGlzUGF0aCA9IHBhdGguZGlybmFtZShmaWxlUGF0aCk7XG4gICAgdGhpcy5zZWVuRmlsZVBhdGhzW3RoaXNQYXRoXSA9IHRydWU7XG5cbiAgICBsZXQgcGF0aHMgPSBPYmplY3Qua2V5cyh0aGlzLnNlZW5GaWxlUGF0aHMpO1xuXG4gICAgaWYgKHRoaXMuY29tcGlsZXJPcHRpb25zLnBhdGhzKSB7XG4gICAgICBwYXRocy5wdXNoKC4uLnRoaXMuY29tcGlsZXJPcHRpb25zLnBhdGhzKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29tcGlsZXJPcHRpb25zLCB7XG4gICAgICBwYXRoczogcGF0aHMsXG4gICAgICBmaWxlbmFtZTogcGF0aC5iYXNlbmFtZShmaWxlUGF0aCksXG4gICAgICBmaWxlQXN5bmM6IGZhbHNlLCBhc3luYzogZmFsc2UsIHN5bmNJbXBvcnQ6IHRydWVcbiAgICB9KTtcblxuICAgIGxlc3Nqcy5yZW5kZXIoc291cmNlQ29kZSwgb3B0cywgKGVyciwgb3V0KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGVycm9yID0gZXJyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTkI6IEJlY2F1c2Ugd2UndmUgZm9yY2VkIGxlc3MgdG8gd29yayBpbiBzeW5jIG1vZGUsIHdlIGNhbiBkbyB0aGlzXG4gICAgICAgIHNvdXJjZSA9IG91dC5jc3M7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjb2RlOiBzb3VyY2UsXG4gICAgICBtaW1lVHlwZTogJ3RleHQvY3NzJ1xuICAgIH07XG4gIH1cblxuICBnZXRDb21waWxlclZlcnNpb24oKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJ2xlc3MvcGFja2FnZS5qc29uJykudmVyc2lvbjtcbiAgfVxufVxuIl19