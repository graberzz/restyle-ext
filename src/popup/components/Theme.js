import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

const styles = {
  card: {
    maxWidth: 400,
    margin: '15px 0',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const Theme = ({
  classes, theme, onToggle,
  onEdit, onDelete,
}) => (
  <div>
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={theme.preview}
      />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {theme.name}
        </Typography>
        <Typography component="p">By {theme.author}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="raised" size="small" color={theme.enabled ? 'secondary' : 'primary'} onClick={() => onToggle(theme.enabled)}>
          {theme.enabled ? 'Disable' : 'Enable'}
        </Button>
        <Button variant="raised" size="small" color="primary" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="raised" size="small" color="primary" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  </div>
);

Theme.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(Theme);
