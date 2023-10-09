import React from 'react';
import Menu from '../Menu';
import PropTypes from 'prop-types';
import { ReactComponent as Logo } from './img/logo.svg';

function Header({ menu }) {
    return (
        <header className="bg-cyan-800 pb-4 pt-4">
            <div className="container mx-auto px-4">
                <div className="items-center justify-between flex-wrap block sm:flex">
                    <div className="flex items-center flex-shrink-0 text-white mr-6 mb-4 sm:mb-0 justify-center sm:justify-start">
                        <Logo/>
                        <span className="font-semibold text-xl tracking-tight leading-none">
                            Currency<br/>converter
                        </span>
                    </div>
                    <div className="flex justify-center sm:block">
                        <Menu data={menu} />
                    </div>
                </div>
            </div>
        </header>
    )
};

Header.propTypes = {
    menu: PropTypes.array.isRequired,
};

export default Header;
