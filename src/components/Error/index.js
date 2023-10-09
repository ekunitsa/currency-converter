import React from 'react';
import PropTypes from 'prop-types';

function Error({ msg }) {
    return <div className="p-4 border border-red-500 rounded max-w-2xl text-red-500 m-auto">{ msg }</div>;
};

Error.defaultProps = {
    msg: 'Error',
};

Error.propTypes = {
    msg: PropTypes.string,
};

export default Error;
