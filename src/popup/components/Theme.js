import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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

const Theme = ({ classes, name, author }) => (
  <div>
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/styles/full/public/end-of-evangelion.jpg?itok=cRV4AQNU&mtime=1471000677"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          { name }
        </Typography>
        <Typography component="p">By { author }</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Enable
          </Button>
        <Button size="small" color="primary">
          Edit
          </Button>
        <Button size="small" color="primary">
          Delete
          </Button>
      </CardActions>
    </Card>
  </div>
);

export default withStyles(styles)(Theme);
