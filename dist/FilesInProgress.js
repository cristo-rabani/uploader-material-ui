'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilesInProgress = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFileImage = require('react-file-image');

var _reactFileImage2 = _interopRequireDefault(_reactFileImage);

var _List = require('material-ui/List');

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageRegExp = /^image\//;
var FilesInProgress = exports.FilesInProgress = function FilesInProgress(_ref) {
    var files = _ref.files,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? '48' : _ref$height,
        _ref$Icon = _ref.Icon,
        Icon = _ref$Icon === undefined ? function () {
        return _react2.default.createElement('i', null);
    } : _ref$Icon;

    var filesArr = files.map(function (_ref2) {
        var file = _ref2.file,
            percent = _ref2.percent,
            uploadId = _ref2.uploadId;

        if (file && imageRegExp.test(file.type)) {
            return _react2.default.createElement(_List.ListItem, {
                key: uploadId,
                leftAvatar: _react2.default.createElement(_reactFileImage2.default, { file: file, height: height }),
                primaryText: file.name || 'File',
                secondaryText: percent && _react2.default.createElement(_LinearProgress2.default, { mode: 'determinate', value: percent })
            });
        }
        return _react2.default.createElement(_List.ListItem, {
            key: uploadId,
            leftAvatar: _react2.default.createElement(Icon, { type: file.type, name: file.name }),
            primaryText: file.name || 'File',
            secondaryText: percent && _react2.default.createElement(_LinearProgress2.default, { mode: 'determinate', value: percent })
        });
    });
    return _react2.default.createElement(
        _List.List,
        null,
        filesArr
    );
};

exports.default = FilesInProgress;