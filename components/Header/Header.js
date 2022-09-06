import React from 'react';
import Image from 'next/image';
import classes from './Header.module.css'
import logo from '../../assets/dlbc-logo.jpg'

const Header = () => {
  return <div className={classes.Header}>
    <Image src={logo} alt='dlcm logo'className={classes.Himage} height={55} width={60}/>
    <div className={classes.logowords}>
      <h2>DLCF</h2>
      <h3>Weija Division</h3>
    </div>
    <div > </div>
  </div>;
};

export default Header;
