import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { stringAvatar } from '../../utils/Utils';
import { JWT_TOKEN_NAME } from '../../types/Constants';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'User', path: '/user' },
];

const operationLinks = [
  { name: 'Create Operation', path: '/operation/create' },
  { name: 'List operations record', path: '/operation/listAll' },
];

const settings = [{ name: 'Profile' }, { name: 'Logout', path: '/logout' }];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [operationAnchorEl, setOperationAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenOperationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOperationAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseOperationMenu = () => {
    setOperationAnchorEl(null);
  };

  const { setIsUserLoggedIn, signedInUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleOptionClick = (optionName: string, path: string) => {
    if (path === '/logout') {
      localStorage.removeItem(JWT_TOKEN_NAME);
      setIsUserLoggedIn(false);
      navigate('/login');
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CalculateIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="/dashboard"
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
            TNCalculator
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.name}
                  component={Link}
                  to={link.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{link.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleOpenOperationMenu}>
                <Typography
                  textAlign="center"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Operations
                </Typography>
                <ArrowDropDownIcon fontSize="small" />
              </MenuItem>
              <Menu
                id="operations-menu"
                anchorEl={operationAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(operationAnchorEl)}
                onClose={handleCloseOperationMenu}
              >
                {operationLinks.map((link) => (
                  <MenuItem
                    key={link.name}
                    component={Link}
                    to={link.path}
                    onClick={handleCloseOperationMenu}
                  >
                    <Typography textAlign="center">{link.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Menu>
          </Box>
          <CalculateIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TNCalculator
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {link.name}
              </Button>
            ))}

            <Button
              onClick={handleOpenOperationMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Operations <ArrowDropDownIcon fontSize="small" />
            </Button>

            <Menu
              id="operations-menu"
              anchorEl={operationAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(operationAnchorEl)}
              onClose={handleCloseOperationMenu}
            >
              {operationLinks.map((link) => (
                <MenuItem
                  key={link.name}
                  component={Link}
                  to={link.path}
                  onClick={handleCloseOperationMenu}
                >
                  <Typography textAlign="center">{link.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={signedInUser?.username}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  {...stringAvatar(signedInUser?.username ?? 'Default')}
                />
              </IconButton>
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
              {settings.map((option) => (
                <Button
                  key={option.name}
                  component={Link}
                  to={''}
                  onClick={() => {
                    handleOptionClick(option.name, option.path ?? '');
                  }}
                  sx={{ display: 'block' }}
                >
                  {option.name}
                </Button>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
