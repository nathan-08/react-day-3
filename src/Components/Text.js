import React from "react";
import propTypes from 'prop-types';

function Text(props) {
  const { text, isHeader } = props;
  return isHeader ? <h4>{text}</h4> : <p>{text}</p>;
}

Text.propTypes = {
    text: propTypes.oneOfType([
      propTypes.string, 
      propTypes.number
    ]),
    isHeader: propTypes.bool.isRequired
}
export default Text;