import React, { useCallback, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'

import Api from '@/services/api'
import { MainContext } from '@/App'
import getValidationErrors from '@/utils/getValidationErrors'
import { useToast } from '@/hooks/useToast'

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

export default function Login(){
    const classes = useStyles()
    const history = useHistory()
    const { currentUser, updateUser } = useContext(MainContext)
    const [formError, setFormError] = useState({
        email: '',
        password: ''
    })
    const { addToast } = useToast()

    function handleBack() {
        history.push('/')
    }

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        
        const {
            email,
            password
        } = event.target

        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('The email field is required'),
                password: Yup.string().required('The password field is required'),
            })

            await schema.validate({
                email: email.value,
                password: password.value,
            }, {abortEarly: false})

            Api.post('/api/users/sign_in', {
                user: {
                    email: email.value,
                    password: password.value
                }
            }).then(response => {            
                updateUser(response.data)

                if (response.data.email) {
                    history.push('/')
                    return                
                }

                addToast({
                    type: 'error',
                    title: 'Error!',
                    description: response.data[0].message
                })
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
                <h2>Insert your awesome credentials:</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <div className="mui-text-fields">
                            <TextField
                                label="Email" 
                                id="email"
                                error={!!formError.email}
                                helperText={formError.email}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                id="password"
                                error={!!formError.password}
                                helperText={formError.password}
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