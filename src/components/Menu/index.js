import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function Menu({ data }) {
    const buttonState = {
        active: 'bg-orange-500 inline-block font-semibold text-white py-2 px-4 border border-transparent rounded mr-2 sm:mr-0 ml-2 sm:ml-4',
        default: 'bg-transparent hover:bg-orange-500 inline-block text-white font-semibold py-2 px-4 border border-orange-500 hover:border-transparent rounded mr-2 sm:mr-0 ml-2 sm:ml-4',
    };

    return (
        <nav className="text-md">
            {data.map(({ id, link, text }) => (
                <NavLink
                    className={({ isActive }) => isActive ? buttonState.active : buttonState.default }
                    key={ id }
                    to={ link }
                >
                    { text }
                </NavLink>
            ))}
        </nav>
    )
};

Menu.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Menu;
