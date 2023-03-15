import React, {
    useCallback,
    useState,
    useContext,
    useEffect
} from 'react';
import {
    Container,
    Button,
    TextField,
    makeStyles,
} from '@material-ui/core';
import * as Yup from 'yup';

import { MainContext } from '@/App';
import { useToast } from '@/hooks/useToast'
import getValidationErrors from '@/utils/getValidationErrors';

import TopBar from '@/components/TopBar';
import SideBar from '@/components/Navbar';

import Api from '@/services/api';

const useStyles = makeStyles(() => ({
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
}));

export default () => {
    const classes = useStyles();
    const { currentUser, setCurrentPosition } = useContext(MainContext);
    const [ formError, setFormError ] = useState({
        password: '',
        password_confirmation: '',
    })
    const { addToast } = useToast();

    useEffect(() => {
        setCurrentPosition('Change password');
    }, []);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();

        const {
            password,
            password_confirmation,
        } = event.target;

        try {
            const schema = Yup.object().shape({
                password: Yup.string().required('The new password is required'),
                password_confirmation: Yup.string().required('You must confirm your new password'),
            })

            await schema.validate({
                password: password.value,
                password_confirmation: password_confirmation.value,
            }, {abortEarly: false});

            Api.patch(`/api/users/${currentUser.id}`, {
                user: {
                    password: password.value,
                    password_confirmation: password_confirmation.value,
                },
            }).then(() => {
                addToast({
                    type: 'success',
                    title: 'Success!',
                    description:
                        'Password updated successfuly! You must login again!',
                    });

                setTimeout(() => {
                    location.reload();
                }, 3000);
            });
        } catch(error) {
            if (error instanceof Yup.ValidationError) {
                const serializedErrors = getValidationErrors(error);
                setFormError(serializedErrors);

                return;
            }
        }
    }, []);

    return (
        <>
            <TopBar />
            {currentUser.admin && <SideBar />}
            <Container maxWidth="sm" style={{marginTop: '72px'}}>
                <form className={classes.root} onSubmit={handleSubmit}>
                    <TextField
                        id="password"
                        error={!!formError.password}
                        helperText={formError.password}
                        type="password"
                        label="Type a new password"
                    />
                    <TextField
                        id="password_confirmation"
                        error={!!formError.password_confirmation}
                        helperText={formError.password_confirmation}
                        type="password"
                        label="Retype the new password"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Update password
                    </Button>
                </form>
            </Container>
        </>
    );
};
