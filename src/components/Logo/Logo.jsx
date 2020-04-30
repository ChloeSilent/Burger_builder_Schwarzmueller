import React from 'react';
import Pict from '../../assets/images/original.png';
import styles from './Logo.module.css';

const Logo = (props) => {
    return (
        <div className={styles.Logo} style={{ height: props.height }}>

            <img src={Pict} alt="burger_logo" />
        </div>
    );
};

export default Logo;