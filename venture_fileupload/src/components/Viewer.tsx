import * as React from 'react';
import { IUploadedFile } from '../types/IUploadedFile';
import { emptyUploadedFile } from '../types/emptyFileInfoObject';

interface IProps {
  fileInfo: IUploadedFile;
}

interface IState {
  fileInfo: IUploadedFile;
}

class Viewer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileInfo: emptyUploadedFile
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.fileInfo.fileName !== prevProps.fileInfo.fileName) {
      this.setState({
        fileInfo: this.props.fileInfo
      });
    }
  }

  render() {
    return (
      <div>
        <header>{this.state.fileInfo.fileName}</header>
      </div>
    );
  }
}

export default Viewer;
