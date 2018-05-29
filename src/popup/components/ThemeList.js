import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Theme from './Theme';

const styles = {
  list: {
    maxHeight: 430,
    overflow: 'auto',
  },
};

const renderThemes = ({
  themes, onToggle, onEdit, onDelete,
}) => {
  if (themes && themes.length) {
    return themes.map(theme => <Theme theme={theme}
                                 onToggle={onToggle}
                                 onEdit={onEdit}
                                 onDelete={onDelete} />);
  }

  return <Typography variant="headline"
           align="center"
           component="h2"
           style={{ margin: '10px 0' }}>
           No Styles Yet!
         </Typography>;
};

const ThemeList = props => (
  <div className={props.classes.list}>
    { renderThemes(props) }
  </div>
);

export default withStyles(styles)(ThemeList);
