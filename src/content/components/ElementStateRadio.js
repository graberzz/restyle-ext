import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = {
  elemState: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
};

const ElementStateRadio = ({ selected, onClick, classes }) => (
  <div className={classes.elemState}>
    <Button variant={selected === 'default' ? 'raised' : 'flat'}
      color="primary"
      onClick={() => onClick('default')}>
      Default
    </Button>
    <Button variant={selected === 'hover' ? 'raised' : 'flat'}
      color="primary"
      onClick={() => onClick('hover')}>
      Hover
    </Button>
    <Button variant={selected === 'click' ? 'raised' : 'flat'}
      color="primary"
      onClick={() => onClick('click')}>
      Click
    </Button>
  </div>
);

ElementStateRadio.propTypes = {
  selected: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ElementStateRadio.defaultProps = {
  selected: 'default',
};

export default withStyles(styles)(ElementStateRadio);
