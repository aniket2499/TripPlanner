import React, {useContext} from 'react';
import {AuthContext} from '../firebase/Auth';
import SignOutBtn from './SignOut';
import '../App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const Navigation = () => {
  const currentUser = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
      <Toolbar >
      <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRAVEL ADVISOR
          </Typography>
          <Button key='home' sx={{ color: '#fff' }}>
            <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'block' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                }}
              >Home
              </Typography>
            </Button>
            <Button key='accont' sx={{ color: '#fff' }}>
              <Typography
                  variant="h6"
                  component="a"
                  href="/account"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', sm: 'block' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                  }}
                >Account
                </Typography>
            </Button>
            <SignOutBtn />
        </Toolbar>
      </Container>
    </AppBar>
  );
};



const NavigationNonAuth = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
      <Toolbar >
      <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRAVEL ADVISOR
          </Typography>
          <Button key='home' sx={{ color: '#fff' }}>
            <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'block' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                }}
              >Home
              </Typography>
            </Button>
            <Button key='signup' sx={{ color: '#fff' }}>
              <Typography
                  variant="h6"
                  component="a"
                  href="/signup"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', sm: 'block' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                  }}
                >Sign-up
                </Typography>
            </Button>
            <Button key='login' sx={{ color: '#fff' }}>
              <Typography
                  variant="h6"
                  component="a"
                  href="/login"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', sm: 'block' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                  }}
                >Login
                </Typography>
            </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;