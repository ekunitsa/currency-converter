import React from 'react';
import PropTypes from 'prop-types';

function ResultString({ number, currency }) {
    if (!number || !currency) {
        return false;
    }

    return <div className="p-4 border border-gray-200 rounded max-w-2xl m-auto">Result: <b>{ number }</b> { currency }</div>;
};

ResultString.propTypes = {
    number: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
};

export default ResultString;
