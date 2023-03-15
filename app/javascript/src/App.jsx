import React, { createContext, useCallback, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Route from '@/routes/Route'
import { ToastProvider } from '@/hooks/useToast'

import Home from '@/pages/home'
import Signup from '@/pages/signup'
import Login from '@/pages/login'
import Profile from '@/pages/profile'
import EditUser from '@/pages/editUser'
import Dashboard from '@/pages/dashboard'
import EditPassword from '@/pages/editPassword'
import CreateUser from '@/pages/createUser'
import ImportCsv from '@/pages/import'

import '@/styles/global.scss'

export const MainContext = createContext({})

export default function App() {
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        full_name: '',
        email: '',
        avatar_image: '',
        admin: false,
        created_at: ''
    })
    const [currentPosition, setCurrentPosition] = useState('/')

    const updateUser = useCallback((user) => {
        const {id, full_name, email, avatar_image, admin, created_at} = user
        
        setCurrentUser({
            id: id,
            full_name: full_name,
            email: email,
            avatar_image: avatar_image,
            admin: admin,
            created_at: created_at
        })
    })

    return (
        <BrowserRouter>
            <MainContext.Provider value={{currentUser, updateUser, currentPosition, setCurrentPosition}}>
                <ToastProvider>
                    <Route path="/" exact component={Home} />
                    <Route path="/sign-up" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" isPrivate component={Profile} />
                    <Route path="/dashboard" isPrivate isAdmin component={Dashboard} />
                    <Route path="/users/edit/:id" isPrivate component={EditUser} />
                    <Route path="/users/edit-password" isPrivate isAdmin component={EditPassword} />
                    <Route path="/users/add" isPrivate isAdmin component={CreateUser} />
                    <Route path="/users/import" isPrivate isAdmin component={ImportCsv} />
                </ToastProvider>
            </MainContext.Provider>
        </BrowserRouter>
    )
}