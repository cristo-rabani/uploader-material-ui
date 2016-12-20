import React from 'react';
import UploadInput from './UploadInput';
import FilesInProgress from './FilesInProgress';
import _ from 'lodash';

class FileUploader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {files: {}, percents: {}};
        this.onProgress = ({percent, uploadId}) => {
            const percents = this.state.percents;
            percents[uploadId] = percent;
            this.setState(percents);
            if (this.props.onProgress) {
                this.props.onProgress({percent, uploadId});
            }
        };

        this.onFileLoad = ({file, uploadId}) => {
            const files = this.state.files;
            files[uploadId] = file;
            this.setState(files);
            if (this.props.onFileLoad) {
                this.props.onFileLoad({file, uploadId});
            }
        };
        this.onUpload = (params) => {
            const uploadId = params.uploadId;
            if (this.props.onUpload) {
                this.props.onUpload(params, () => {
                    const {files, percents} = this.state;
                    delete files[uploadId];
                    delete percents[uploadId];
                    this.setState(files);
                });
            }
        };
    }

    render () {
        const {files = {}, percents = {}} = this.state;
        const filesArr = Object.keys(files).map(uploadId => {
            const file = files[uploadId];
            const percent = percents[uploadId] || 0;
            return {file, percent, uploadId};
        });
        const props = _.omit(this.props, 'onFileLoad', 'onFileUploaded', 'onProgress');
        props.label = props.label || 'Add File';
        return (
            <div>
                <UploadInput
                    onFileLoad={this.onFileLoad}
                    onUpload={this.onUpload}
                    onProgress={this.onProgress}
                    {...props}
                />
                <FilesInProgress files={filesArr} />
            </div>
        );
    }
}

export default FileUploader;
