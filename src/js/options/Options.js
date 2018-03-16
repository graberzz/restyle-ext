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
  import "brace/mode/css";
  import "brace/theme/monokai";
  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: '500px',
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
        sites: [
          {
            url: "vk.com",
            stylesheet: {}
          },
          {
            url: "youtube.com",
            stylesheet: {}
          },
          {
            url: "fb.com",
            stylesheet: {}
          },
          {
            url: "vk.com",
            stylesheet: {}
          },
          {
            url: "youtube.com",
            stylesheet: {}
          }
        ],
        deleteConfirmModalOpen: false,
        urlIndexToDelete: -1,
        editorOpen: false
      };
      componentDidMount() {
        // TODO: obtain styles from storageManager
      }

      onEdit = url => {
        this.setState({
          editorOpen: true
        });
      };
    
      onDelete = url => {
        const siteIndex = this.state.sites.findIndex(site => site.url === url);
        if (siteIndex < 0) return;
    
        this.setState({
          deleteConfirmModalOpen: true,
          urlIndexToDelete: siteIndex
        });
      };
    
      handleClose = () => {
        this.setState({
          deleteConfirmModalOpen: false
        });
      };
    
      closeEditor = () => {
        this.setState({
          editorOpen: false
        });
      };
    
      onDeleteConfirmed = () => {
        this.setState(
          {
            sites: [
              ...this.state.sites.slice(0, this.state.urlIndexToDelete),
              ...this.state.sites.slice(this.state.urlIndexToDelete + 1)
            ],
            urlIndexToDelete: -1
          },
          this.handleClose
        );
      };
    
      render() {
        const { sites, deleteConfirmModalOpen, editorOpen } = this.state;
    
        return (
          <div>
            <Modal
              open={editorOpen}
              onClose={this.closeEditor}
              style={getModalStyle()}
            >
              <div>
                <AceEditor style={modalEditorStyle} mode="css" theme="monokai" />
                <Button variant="raised" color="primary" onClick={this.closeEditor}>
                  Save
                </Button>
                <Button
                  variant="raised"
                  color="secondary"
                  onClick={this.closeEditor}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="title">Your styles:</Typography>
                <div>
                  <List>
                    { sites.length > 0 ? sites.map(({ url }, i) => (
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