import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';  

import Styles from './Styles/signin.module.css'

function Register({setLogged, FetchData}) {
    const [dupError, setDupError] = useState(false);
    const [serverErr, SetserverErr] = useState(false);
    
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const form = e.target;
        const user = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        }

        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) {
                // Show error only if it's a duplicate or server error
                if (res.status === 409) {
                    setDupError(true);
                } else {
                    console.error('Other server error:', data.error);
                }
            } else {
                setDupError(false);
                setLogged(true);
                FetchData();
                navigate('/');
            }
        })
        .catch(err => {
            console.error('Error:', err)
            SetserverErr(true);
        });
    }

  return (
    <div className={Styles.bgColor}>
        <Navbar logged={false}/>
        <div className={Styles.container}>
            <h1 className={Styles.topHeader}>Register</h1>
            {dupError && (
                <div className={Styles.dupError}>
                    <p>The user already exist. Try Login again.</p>
                    <p className={Styles.closeErr} onClick={() => {setDupError(false)}}>x</p>
                </div>
            )}
            {serverErr && (
                <div className={Styles.dupError}>
                    <p>Server Error</p>
                    <p className={Styles.closeErr} onClick={() => {SetserverErr(false)}}>x</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className={Styles.signIn}>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label> 
                    Email Address:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <input className={Styles.Btn} type="submit" value="Submit" />
            </form>
        </div>
    </div>
  )
}

export default Register