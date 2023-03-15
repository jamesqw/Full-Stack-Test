import React, {
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { Link } from 'react-router-dom'
import {
  Container,
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import EditIcon from '@material-ui/icons/Edit'
import { parseISO, format } from 'date-fns'

import { MainContext } from '@/App'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 80,
    maxWidth: 720,
  },
  media: {
    height: 0,
    paddingTop: '80%',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default () => {
  const classes = useStyles();
  const { currentUser, setCurrentPosition } = useContext(MainContext);

  const joinDate = useMemo(() => {
    if (!currentUser.created_at) return;

    const tempDate = parseISO(currentUser.created_at.toString())
    return format(tempDate, "'Joined' MM-dd-y 'at' HH:mm");
  }, [currentUser]);

  const editLink = useMemo(() => {
    return `/users/edit/${currentUser.id}`;
  }, [currentUser]);

  useEffect(() => {
    setCurrentPosition('Profile')
  }, []);

  return (
    <>
      <TopBar />
      { currentUser.admin && <Navbar /> }
      <Container maxWidth="sm" className={classes.root}>
        <Card className={classes.root}>
          <CardHeader
            title={currentUser.full_name}
            subheader={joinDate}
            action={
              <Link to={editLink}>
                <IconButton aria-label="Edit profile">
                  <EditIcon />
                </IconButton>
              </Link>
            }
          />
          {currentUser.avatar_image && (
            <CardMedia
              className={classes.media}
              image={currentUser.avatar_image}
              title={currentUser.full_name}
            />
          )}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Email: ${currentUser.email}`}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
