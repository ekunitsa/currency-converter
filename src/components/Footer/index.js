import React from 'react';
import PropTypes from 'prop-types';

function Footer({ copy }) {
    return (
        <footer className="bg-gray-200 text-center mt-auto">
            <div className="container m-auto text-gray-700 text-center p-4">
                { copy }
            </div>
        </footer>
    )
};

Footer.defaultProps = {
    copy: 'Copyright',
};

Footer.propTypes = {
    copy: PropTypes.string,
};

export default Footer;
