import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = ( props ) => {
    let attachedClasses = ['Close', 'sideDraver'];
    if (props.open) {
        attachedClasses = ['Open', 'sideDraver'];
    }
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className='Logo' style={{height: '50px'}}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;