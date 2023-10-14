'use client'
import Image from 'next/image'
import styles from '../modulestyle/auth.module.css'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'

import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from '../components/Google';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const fetcher = (url, data) => {
  return axios.get(url, data).then(res => res.data);
};

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        var curUser = await fetcher(`/api/login?email=${email}&password=${password}`, false)
        if(curUser){
            location.href = `/?id=${curUser.id}`
        }
    }

    function updateEmail(e) {
        setEmail(e.target.value)
    }
    function updatePassword(e) {
        setPassword(e.target.value)
    }

  return (
    <main className={styles.main}>
      <div className={styles.navbar_background}></div>
      <div className={styles.navbar}>
        <a className={styles.logo_container} href='./'>
          <img src="data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7"></img>
        </a>
      </div>

      <div className={styles.auth_background}></div>
      <div className={styles.auth}>
        <div className={styles.oauth_container}>
          <h1>Login</h1>
          <p>

          </p>
          <GoogleOAuthProvider clientId="210605776235-5d6dm7d38f2mdo0hv1dpl5mg2oh3mopa.apps.googleusercontent.com">
                <Google />
          </GoogleOAuthProvider>
        </div>
        <form className={styles.login_container}>
        <TextField id="outlined-basic" label='Email' onChange={updateEmail} variant="outlined" sx={{marginBottom: 1}} value={email}/>
                    <FormControl sx={{marginBottom: 1}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput 
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            onChange={updatePassword}
                            value={password}
                            label="Password"
                        />
                    </FormControl>
                    <Button variant='contained' className='login' onClick={login}>Login</Button>
          <a href='./register' style={{color: 'grey'}}>Don't have an account?</a>
        </form>
      </div>
    </main >
  )
}
