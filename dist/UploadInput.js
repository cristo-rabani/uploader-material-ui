'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UploadInputComponent = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vazcoServicesSdkIntegration = require('meteor/vazco:services-sdk-integration');

var _vazcoServicesSdkIntegration2 = _interopRequireDefault(_vazcoServicesSdkIntegration);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _random = require('meteor/random');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXCLUSIVE_Props = ['fileTypeRegex', 'onChange', 'onFileUploaded', 'onProgress', 'onError', 'label', 'disabled', 'className', 'buttonStyle', 'disabledBackgroundColor', 'disabledLabelColor', 'fullWidth', 'icon', 'labelColor', 'labelStyle', 'overlayStyle', 'labelPosition', 'primary', 'secondary', 'rippleColor', 'onFileLoad', 'onUpload'];

var UploadInputComponent = exports.UploadInputComponent = function (_React$Component) {
    (0, _inherits3.default)(UploadInputComponent, _React$Component);

    function UploadInputComponent(props) {
        (0, _classCallCheck3.default)(this, UploadInputComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

        _this.filesService = _vazcoServicesSdkIntegration2.default.getService('files');
        _this.onInputChange = function (e) {
            var _this$props = _this.props,
                onFileLoad = _this$props.onFileLoad,
                onFileUploaded = _this$props.onFileUploaded,
                onError = _this$props.onError,
                onProgress = _this$props.onProgress,
                onUpload = _this$props.onUpload;


            (0, _lodash.filter)(e.target.files, function (file) {
                return file.type.match(_this.props.fileTypeRegex) !== null;
            }).forEach(function (file) {
                var uploadId = _random.Random.id();
                onFileLoad({ file: file, uploadId: uploadId });
                var onUploadProgress = function onUploadProgress(progressEvent) {
                    var percent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                    onProgress({ percent: percent, uploadId: uploadId });
                };
                onUpload((0, _assign2.default)(_this.getControlProps(), { file: file, uploadId: uploadId, onProgress: onUploadProgress }));
            });
        };

        return _this;
    }

    UploadInputComponent.prototype.getControlProps = function getControlProps() {
        var _this2 = this;

        return (0, _keys2.default)(this.props).filter(function (name) {
            return EXCLUSIVE_Props.indexOf(name) === -1;
        }).reduce(function (acc, name) {
            acc[name] = _this2.props[name];
            return acc;
        }, {});
    };

    UploadInputComponent.prototype.getButtonProps = function getButtonProps() {
        return _.pick(this.props, ['label', 'disabled', 'className', 'buttonStyle', 'disabledBackgroundColor', 'disabledLabelColor', 'fullWidth', 'icon', 'labelColor', 'labelStyle', 'overlayStyle', 'style', 'labelPosition', 'primary', 'secondary', 'rippleColor']);
    };

    UploadInputComponent.prototype.render = function render() {
        var props = this.getControlProps();
        return _react2.default.createElement(
            'div',
            { className: 'Container' },
            _react2.default.createElement(
                _FlatButton2.default,
                (0, _extends3.default)({
                    containerElement: 'label',
                    className: 'Control'
                }, this.getButtonProps()),
                _react2.default.createElement('input', (0, _extends3.default)({
                    className: 'FileInput',
                    type: 'file',
                    ref: 'file-input',
                    onChange: this.onInputChange
                }, props))
            )
        );
    };

    return UploadInputComponent;
}(_react2.default.Component);

UploadInputComponent.defaultProps = {
    fileTypeRegex: /.*/,
    onFileLoad: function onFileLoad() {
        return undefined;
    },
    onUpload: function onUpload() {
        return undefined;
    },
    onProgress: function onProgress() {
        return undefined;
    },
    onError: function onError() {
        return undefined;
    }
};

exports.default = UploadInputComponent;