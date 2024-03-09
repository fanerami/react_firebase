import React from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Tooltip, Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { AccountCircle } from '@mui/icons-material';




const Navbar = () => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const navigate = useNavigate();

    const deconnect = () => {
        localStorage.removeItem("user");
        signOut(auth).then(() => {
            navigate("/connexion")
        });
    }


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
  return (
    <AppBar position="relative" component="nav">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 3, display: { xs: 'none', md: 'flex' } }}>


                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    <Button
                        sx={{ my: 2, color: 'white', display: 'block', mr:2 }}
                        onClick={() => {navigate("/notes")}}
                    >
                        Notes
                    </Button>

                    <Tooltip>
                        <Button
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                        >
                            Mon Compte<AccountCircle  />
                        </Button>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >

                        <MenuItem onClick={() => {navigate("/")}}>
                            <Typography textAlign="center">Profil</Typography>
                        </MenuItem>
                        <MenuItem onClick={deconnect}>
                            <Typography textAlign="center">Deconnexion</Typography>
                        </MenuItem>

                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Navbar
