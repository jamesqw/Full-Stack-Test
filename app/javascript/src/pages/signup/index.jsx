import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'

import Api from '@/services/api'
import { useToast } from '@/hooks/useToast'
import getValidationErrors from '@/utils/getValidationErrors'

import './styles.scss'

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root' : {
            marginBottom: '16px',
            width: '100%',
            '& .MuiFormLabel-root': {
                color: 'white'
            },
            '& .MuiInput-underline::before': {
                borderBottom: '1px solid white'
            },
            '& .MuiInputBase-input': {
                color: 'white'
            }
        }
    }
})

export default function Signup(){
    const classes = useStyles()
    const history = useHistory()
    const [formError, setFormError] = useState({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar_url: '',
        admin: false,
    })
    const { addToast } = useToast()

    function handleBack() {
        history.push('/')
    }

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        
        const {
            full_name,
            email,
            password, 
            password_confirmation,
            avatar_image,
            admin
        } = event.target

        try {
            const schema = Yup.object().shape({
                full_name: Yup.string().required('The full name field is required'),
                email: Yup.string().required('The email field is required'),
                password: Yup.string().required('The password field is required'),
                password_confirmation: Yup.string().required('You must confirm the password'),
                avatar_image: Yup.string().required('Insert the user avatar image url'),
            })

            await schema.validate({
                full_name: full_name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value,
                avatar_image: avatar_image.value,
            }, {abortEarly: false})

            Api.post('/api/users', {
                user: {
                full_name: full_name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value,
                avatar_image: avatar_image.value,
                admin: admin.value,
                },
            }).then(() => {
                addToast({
                    type: 'success',
                    title: 'Welcome!',
                    description: 'Now feel yourself at home!',
                })

                history.push('/')
            })
        } catch(error) {
            if (error instanceof Yup.ValidationError) {
                const serializedErrors = getValidationErrors(error)
                setFormError(serializedErrors)

                return
            }
        }
    })

    return (
        <div className="container">
            <Container maxWidth="sm">
                <h2>There's your Sign Up form:</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <div className="mui-text-fields">
                            <input type="hidden" id="admin" value={false}/>
                            <TextField 
                                label="Full Name" 
                                id="full_name"
                                error={!!formError.full_name}
                                helperText={formError.full_name}
                            />
                            <TextField 
                                label="Email" 
                                id="email"
                                error={!!formError.email}
                                helperText={formError.email}
                            />
                            <TextField 
                                label="Password" type="password"
                                id="password"
                                error={!!formError.password}
                                helperText={formError.password}
                            />
                            <TextField 
                                label="Password confirmation" type="password"
                                id="password_confirmation"
                                error={!!formError.password_confirmation}
                                helperText={formError.password_confirmation}
                            />
                            <TextField 
                                label="Avatar url" 
                                id="avatar_image"
                                error={!!formError.avatar_image}
                                helperText={formError.avatar_image}
                            />
                        </div>
                    </div>
                    <div className="button-group">
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                        <Button variant="contained" color="secondary" onClick={handleBack}>Back</Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}