import React from 'react';
import PropTypes from 'prop-types';

/* import all of the icons that you want to use */

import reply_default from '../../assets/icons/reply_default.png';
import favorite_default from '../../assets/icons/favorite_default.png';

interface Icon {
    name: string;
}

/* create a function that will pick which icon to use */
const pickIcon = (name: string) => {
  switch(name) {
  case 'reply': return reply_default;
  case 'favorite': return favorite_default;
  default: throw new Error('No Icon For: ' + name);
  }
};

/* pass the name & fill props (that we will specify in our 
other components) to Icon to pick the right icon */
const Icon = ({ name}: Icon) => {
  const ico = pickIcon(name);
  return(
    <img src={require('./test.jpg')} />
  );
};

/* set the propTypes so we can catch bugs with typechecking */
Icon.propTypes = {
  name: PropTypes.string.isRequired
}

export default Icon;
