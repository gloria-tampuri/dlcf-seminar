import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import classes from './Layout.module.css'


const Layout = ({children}) => {
  return (
    <div className={classes.layout}>
        <Header/>
       <main className={classes.content}> {children}</main>

        <Footer/>
    </div>
  )
}

export default Layout