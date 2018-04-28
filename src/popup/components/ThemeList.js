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

const renderThemes = (themes) => {
  if (themes && themes.length) {
    return themes.map(theme => <Theme name={theme.name}
                                 author={theme.author} />);
  }

  return <Typography variant="headline"
           align="center"
           component="h2">
           NO THEMES
         </Typography>;
};

const ThemeList = ({ themes, classes }) => (
  <div className={classes.list}>
    { renderThemes(themes) }
  </div>
);

export default withStyles(styles)(ThemeList);
