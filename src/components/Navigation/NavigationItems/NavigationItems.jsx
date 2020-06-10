import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return (
        <ul className='NavigationItems'>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/checkout">Checkout</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    );
};

export default NavigationItems;