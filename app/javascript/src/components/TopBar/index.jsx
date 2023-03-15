import React, { useContext, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    makeStyles,
    Avatar
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import InputIcon from '@material-ui/icons/Input'
import RoomIcon from '@material-ui/icons/Room'

import { MainContext } from '@/App'

import Api from '@/services/api'

const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        width: 60,
        height: 60
    }
}))

const TopBar = ({
    className,
    onMobileNavOpen,
    ...rest
}) => {
    const classes = useStyles()
    const { currentUser, updateUser, currentPosition } = useContext(MainContext)
    const history = useHistory()

    const handleLogout = useCallback(async () => {
        await Api.delete('/api/users/sign_out')

        updateUser({})        
        history.push('/')
    })

    return (
        <AppBar
            className={clsx(classes.root, className)}
            elevation={0}
            {...rest}
        >
            <Toolbar>
                <Link to="/">
                    <HomeIcon fontSize="large" style={{color: 'white'}}/>
                </Link>
                <Box flexGrow={1} />
                <RoomIcon />
                {currentPosition && currentPosition}
                <Box flexGrow={1} />
                <Link to="/profile">
                    <Avatar alt={currentUser.full_name} src={currentUser.avatar_image}></Avatar>
                </Link>
                <IconButton onClick={handleLogout} style={{color: 'white'}}>
                    <InputIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

TopBar.propTypes = {
    className: PropTypes.string,
    onMobileNavOpen: PropTypes.func
}

export default TopBar
