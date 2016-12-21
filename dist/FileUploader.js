'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UploadInput = require('./UploadInput');

var _UploadInput2 = _interopRequireDefault(_UploadInput);

var _FilesInProgress = require('./FilesInProgress');

var _FilesInProgress2 = _interopRequireDefault(_FilesInProgress);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileUploader = function (_React$Component) {
    (0, _inherits3.default)(FileUploader, _React$Component);

    function FileUploader(props) {
        (0, _classCallCheck3.default)(this, FileUploader);

        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

        _this.state = { files: {}, percents: {} };
        _this.onProgress = function (_ref) {
            var percent = _ref.percent,
                uploadId = _ref.uploadId;

            var percents = _this.state.percents;
            percents[uploadId] = percent;
            _this.setState(percents);
            if (_this.props.onProgress) {
                _this.props.onProgress({ percent: percent, uploadId: uploadId });
            }
        };

        _this.onFileLoad = function (_ref2) {
            var file = _ref2.file,
                uploadId = _ref2.uploadId;

            var files = _this.state.files;
            files[uploadId] = file;
            _this.setState(files);
            if (_this.props.onFileLoad) {
                _this.props.onFileLoad({ file: file, uploadId: uploadId });
            }
        };

        _this.onUpload = function (params, done) {
            if (_this.props.onUpload) {
                _this.props.onUpload(params, done);
            }
        };

        _this.onFileUploaded = function (uploadId) {
            var _this$state = _this.state,
                files = _this$state.files,
                percents = _this$state.percents;

            delete files[uploadId];
            delete percents[uploadId];
            _this.setState(files);
            if (_this.props.onFileUploaded) {
                _this.props.onFileUploaded(uploadId);
            }
        };
        return _this;
    }

    FileUploader.prototype.render = function render() {
        var _state = this.state,
            _state$files = _state.files,
            files = _state$files === undefined ? {} : _state$files,
            _state$percents = _state.percents,
            percents = _state$percents === undefined ? {} : _state$percents;

        var filesArr = (0, _keys2.default)(files).map(function (uploadId) {
            var file = files[uploadId];
            var percent = percents[uploadId] || 0;
            return { file: file, percent: percent, uploadId: uploadId };
        });
        var props = _lodash2.default.omit(this.props, ['onFileLoad', 'onFileUploaded', 'onProgress']);
        props.label = props.label || 'Add File';
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_UploadInput2.default, (0, _extends3.default)({
                onFileLoad: this.onFileLoad,
                onUpload: this.onUpload,
                onFileUploaded: this.onFileUploaded,
                onProgress: this.onProgress
            }, props)),
            _react2.default.createElement(_FilesInProgress2.default, { files: filesArr })
        );
    };

    return FileUploader;
}(_react2.default.Component);

exports.default = FileUploader;