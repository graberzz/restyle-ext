import React from 'react';
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
  } from "material-ui/List";
  import Avatar from "material-ui/Avatar";
  import IconButton from "material-ui/IconButton";
  import { FormGroup, FormControlLabel } from "material-ui/Form";
  import Checkbox from "material-ui/Checkbox";
  import Grid from "material-ui/Grid";
  import Typography from "material-ui/Typography";
  import FolderIcon from "material-ui-icons/Folder";
  import DeleteIcon from "material-ui-icons/Delete";
  import Web from "material-ui-icons/Web";
  import Edit from "material-ui-icons/Edit";
  import Paper from "material-ui/Paper";
  import Modal from "material-ui/Modal";
  import Button from "material-ui/Button";
  import brace from "brace";
  import AceEditor from "react-ace";
  import storageManager from '../helpers/storageManager';
  import CSSJSON from '../lib/cssjson';
  import "brace/mode/css";
  import "brace/theme/monokai";
import notify, { notifyTypes } from '../helpers/notify';
  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  }
  


  const modalInnerStyle = {
    width: "200px",
    height: "100px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };
  
  const modalEditorStyle = {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: '100vw',
    height: '80vh',
  };
  
export default class Options extends React.Component {
    state = {
        styles: {},
        deleteConfirmModalOpen: false,
        urlToDelete: '',
        editorOpen: false,
        editorURL: '',
        editorContent: '',
        validationErrors: [],
      }

    componentDidMount() {
      // TODO: obtain styles from storageManager
      storageManager.getStylesheet(styles => {
        this.setState({
          styles: styles.styles // :DDDD
        });
      })
    }

    onEdit = url => {
      console.log(this.state);
      this.setState({
        editorOpen: true,
        editorContent: CSSJSON.toCSS(this.state.styles[url]),
        editorURL: url,
      });
    };
  
    onDelete = url => {
      this.setState({
        deleteConfirmModalOpen: true,
        urlToDelete: url
      });
    
    };

    onSave = () => {
      if (this.state.validationErrors.length > 0) {
        notify({
          text: 'Incorrect CSS',
          type: notifyTypes.ERROR,
        });
      } else {
        notify({
          text: 'CSS has been saved',
          type: notifyTypes.SUCCESS,
        });
        storageManager.saveStylesheet(this.state.editorURL, CSSJSON.toJSON(this.state.editorContent));
        this.closeEditor();
      }
    }
  
    onValidate = (annotations) => {
      this.setState({
        validationErrors: annotations.filter(a => a.type === 'error'),
      });
    }

    handleClose = () => {
      this.setState({
        deleteConfirmModalOpen: false
      });
    }
  
    closeEditor = () => {
      this.setState({
        editorOpen: false
      });
    }

    onEditorChange = (val) => {
      this.setState({
        editorContent: val
      })
    }
  
    onDeleteConfirmed = () => {
      // this.setState(
      //   {
      //     sites: [
      //       ...this.state.sites.slice(0, this.state.urlIndexToDelete),
      //       ...this.state.sites.slice(this.state.urlIndexToDelete + 1)
      //     ],
      //     urlIndexToDelete: -1
      //   },
      //   this.handleClose
      // );
      const styles = Object.assign({}, this.state.styles);
      delete styles[this.state.urlToDelete];

      storageManager.saveStyles(styles);

      this.setState({
        styles,
        deleteConfirmModalOpen: false,
      });
    };
  
    render() {
      const { styles, deleteConfirmModalOpen, editorOpen, editorContent } = this.state;
      console.log(styles);
      return (
        <div>
          <Modal
            open={editorOpen}
            onClose={this.closeEditor}
            style={getModalStyle()}
          >
            <div>
              <AceEditor editorProps={{$blockScrolling: true}} onChange={this.onEditorChange} onValidate={this.onValidate} style={modalEditorStyle} mode="css" theme="monokai" value={editorContent}/>
              <Button variant="raised" color="primary" onClick={this.onSave}>
                Save
              </Button>
              <Button
                variant="raised"
                color="secondary"
                onClick={this.closeEditor}
              >
                Close
              </Button>
            </div>
          </Modal>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant="title">Your styles:</Typography>
              <div>
                <List>
                  { Object.keys(styles).length > 0 ? Object.keys(styles).map((url, i) => (
                                          <ListItem key={i}>
                                              <ListItemAvatar>
                                              <Avatar>
                                                  <Web />
                                              </Avatar>
                                              </ListItemAvatar>
                                              <ListItemText primary={url} />
                                              <ListItemSecondaryAction>
                                              <IconButton onClick={() => this.onEdit(url)}>
                                                  <Edit />
                                              </IconButton>
                                              <IconButton onClick={() => this.onDelete(url)}>
                                                  <DeleteIcon />
                                              </IconButton>
                                              </ListItemSecondaryAction>
                                          </ListItem>
                                          )) :
                                          'No styles'
                  }
                </List>
              </div>
            </Grid>
          </Grid>
          <div>
            <Modal
              open={deleteConfirmModalOpen}
              onClose={this.handleClose}
              style={getModalStyle()}
            >
              <Paper style={modalInnerStyle}>
                <Typography variant="title" align="center" gutterBottom>
                  Are you sure?
                </Typography>
                <div>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.onDeleteConfirmed}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={this.handleClose}
                  >
                    No
                  </Button>
                </div>
              </Paper>
            </Modal>
          </div>
        </div>
      );
    }
}