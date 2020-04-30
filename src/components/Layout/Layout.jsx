import React from 'react';
import Auxiliary from '../../hoc/auxiliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import styles from './Layout.module.css'

const Layout = (props) => {
    return (
        <Auxiliary>
            <SideDrawer/>
            <Toolbar/>
            <main className={styles.content}>
            {props.children}
            </main>
        </Auxiliary>
    );
};

export default Layout;