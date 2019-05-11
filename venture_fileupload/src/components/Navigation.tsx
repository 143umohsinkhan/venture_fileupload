import * as React from 'react';
import {
  Divider,
  Container,
  Menu,
  Icon,
  Grid,
  Segment
} from 'semantic-ui-react';
import { IUploadedFile } from '../types/IUploadedFile';
import Viewer from './Viewer';
import { emptyUploadedFile } from '../types/emptyFileInfoObject';

interface IState {
  uploadedFiles: IUploadedFile[];
  selectedFile: IUploadedFile;
}

class Navigation extends React.Component<{}, IState> {

  private readonly inputOpenFileRef: React.RefObject<HTMLInputElement>;

  constructor() {
    super({});
    this.state = {
      uploadedFiles: [],
      selectedFile: emptyUploadedFile
    };
    this.inputOpenFileRef = React.createRef();
  }

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };

  upload = e => {
    const formData = new FormData();
    const uploadedFile = e.target.files[0];
    formData.append('file', uploadedFile, uploadedFile.name);
    this.setState(state => {
      const itemName = `Document #${state.uploadedFiles.length + 1}`;
      state.uploadedFiles.push({
        fileName: itemName,
        isActive: false,
        fileData: formData
      });
      const uploadedFiles = state.uploadedFiles;
      const selectedFile = state.selectedFile;
      return {
        uploadedFiles,
        selectedFile
      };
    });
  };

  private LoadView = (e, index) => {
    const selectedItem = this.state.uploadedFiles[index.value];
    this.setState({
      selectedFile: selectedItem
    });
  };

  private renderMenuItem = () => {
    {
      let menuItems = this.state.uploadedFiles.map((itemObj, i) => {
        return (
          <Menu.Item
            name={itemObj.fileName}
            value={i}
            key={i}
            onClick={this.LoadView}
          />
        );
      });
      return menuItems;
    }
  };

  render() {
    const renderMenuItem = this.renderMenuItem();
    return (
      <Grid columns={2}  padded='vertically' divided>
        <Grid.Row stretched>
          <Grid.Column width={6}>
            <Segment>
              <h3>
                FILES Upload
                <Icon
                  name={'upload'}
                  size="large"
                  onClick={this.showOpenFileDlg}
                />
              </h3>
              <input
                ref={this.inputOpenFileRef}
                type="file"
                onChange={this.upload}
                style={{ display: 'none' }}
              />
              <Divider />
              <div className="ui pointing secondary vertical menu">
                <Container fluid>
                  <Menu pointing secondary vertical>
                    {renderMenuItem}
                  </Menu>
                </Container>
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={10} >
            <Segment>
              <Viewer fileInfo={this.state.selectedFile} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Navigation;
