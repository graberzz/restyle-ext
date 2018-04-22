import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const ElementStateRadio = ({ selected, onClick }) => (
  <div>
    <Typography variant="title">
      State:
    </Typography>
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

export default ElementStateRadio;
