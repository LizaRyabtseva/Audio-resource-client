import React from 'react';
import classes from './Navigation.module.css';
import NavLinks from "./components/NavLinks";

const Navigation = () => {
   return (
        <header>
            <nav className={'navbar navbar-expand-lg'}>
                <div className={"container-fluid " + classes.Navbar}>
                    <span className="navbar-brand col-1 mx-2 mb-2 fs-6 text">MusicBug</span>
                    <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLinks />
                </div>
            </nav>
    </header>
    );
    // return ReactDOM.createPortal(content, document.getElementById('navigation'));
};

export default Navigation;