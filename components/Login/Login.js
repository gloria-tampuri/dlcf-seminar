import React from 'react'
import classes from './Login.module.css'

const Login = () => {
  return (
    <div className={classes.Login}>
      <h2> Login </h2>
      <form>
        <div className={classes.section}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' />
        </div>
        <div className={classes.section}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' />
        </div>
          <button>Login</button>
      </form>
    </div>
  )
}

export default Login