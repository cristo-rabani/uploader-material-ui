import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Random} from 'meteor/random';
import _ from 'lodash';

const exclusiveProps = [
    'fileTypeRegex',
    'onChange',
    'onFileUploaded',
    'onProgress',
    'onError',
    'label',
    'disabled',
    'className',
    'buttonStyle',
    'disabledBackgroundColor',
    'disabledLabelColor',
    'fullWidth',
    'icon',
    'labelColor',
    'labelStyle',
    'overlayStyle',
    'labelPosition',
    'primary',
    'secondary',
    'rippleColor',
    'onFileLoad',
    'onUpload'
];

export class UploadInputComponent extends React.Component {

    constructor (props) {
        super(props);
        this.onInputChange = (e) => {
            const {onFileLoad, onFileUploaded, onProgress, onUpload} = this.props;

            _.filter(
                e.target.files,
                (file) => file.type.match(this.props.fileTypeRegex) !== null
            ).forEach(file => {
                const uploadId = Random.id();
                onFileLoad({file, uploadId});
                const onUploadProgress = progressEvent => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress({percent, uploadId});
                };
                onUpload(
                    Object.assign(this.getControlProps(), {file, uploadId, onProgress: onUploadProgress}),
                    () => onFileUploaded(uploadId)
                );
            });
        };

    }

    getControlProps () {
        return Object
            .keys(this.props)
            .filter(
                (name) => exclusiveProps.indexOf(name) === -1
            )
            .reduce(
                (acc, name) => {
                    acc[name] = this.props[name];
                    return acc;
                },
                {}
            );
    }

    getButtonProps () {
        return _.pick(this.props, [
            'label',
            'disabled',
            'className',
            'buttonStyle',
            'disabledBackgroundColor',
            'disabledLabelColor',
            'fullWidth',
            'icon',
            'labelColor',
            'labelStyle',
            'overlayStyle',
            'style',
            'labelPosition',
            'primary',
            'secondary',
            'rippleColor'
        ]);
    }

    render () {
        const props = this.getControlProps();
        return (
            <div className="Container">
                <FlatButton
                    containerElement={'label'}
                    className="Control"
                    {...this.getButtonProps()}
                >
                    <input
                        className="FileInput"
                        type="file"
                        ref="file-input"
                        onChange={this.onInputChange}
                        {...props}
                    />
                </FlatButton>
            </div>
        );
    }

}

UploadInputComponent.propTypes = {
    onUpload: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired
};

UploadInputComponent.defaultProps = {
    fileTypeRegex: /.*/,
    onFileLoad: () => undefined,
    onFileUploaded: () => undefined,
    onProgress: () => undefined,
    onError: () => undefined
};

export default UploadInputComponent;
