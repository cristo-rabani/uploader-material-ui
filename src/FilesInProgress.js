import React from 'react';
import FileImage from 'react-file-image';
import {List, ListItem} from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';

const imageRegExp = /^image\//;
export const FilesInProgress = ({files, height = '48', Icon = () => <i/>}) => {
    const filesArr = files.map(({file, percent, uploadId}) => {
        if (file && imageRegExp.test(file.type)) {
            return (
                <ListItem key={uploadId}
                          leftAvatar={<FileImage file={file} height={height} />}
                          primaryText={file.name||'File'}
                          secondaryText={percent && <LinearProgress mode="determinate" value={percent} />}
                />
            );
        }
        return (
            <ListItem key={uploadId}
                      leftAvatar={<Icon type={file.type} name={file.name}/>}
                      primaryText={file.name||'File'}
                      secondaryText={percent && <LinearProgress mode="determinate" value={percent} />}
            />
        );
    });
    return <List>{filesArr}</List>;
};

export default FilesInProgress;
