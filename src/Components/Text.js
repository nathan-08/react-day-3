import React from "react";
import PropTypes from 'prop-types';

function Text(props) {
  const { text, isHeader } = props;
  return isHeader ? <h4>{text}</h4> : <p>{text}</p>;
}

Text.propTypes = {
    text:PropTypes.string,
    isHeader:PropTypes.bool
}
export default Text;