import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@material-ui/core'

import './style.scss'

export default function Home(){
    return(
        <div className="container">
            <aside>FullStack Developer Test</aside>
            <main>
                <span>Welcome to the test application!</span>
                <span>You might choose between</span>
                <div className="sign-in">
                    <Button color="primary">
                        <Link to="/login">Login</Link>
                    </Button>
                </div>
                <span>or</span>
                <div className="sign-up">
                    <Button color="secondary">
                        <Link to="/sign-up">Sign Up</Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}