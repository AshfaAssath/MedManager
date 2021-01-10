import React from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons'
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Grid, IconButton, Badge } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  Typography: {
    marginTop: '5px',
    marginLeft: '10px',
    fontSize:'26px', 
    fontWeight:'bold', 
    color:'red', 
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  Link: {
    marginLeft: '15px',
    color: '#606264',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    "&:hover": {
      color: '#8A8D91',
    },
    '&:focus': {
      color: 'black',
    },
  },

  iconButton: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.divider, 0.1),
    },
  },

  title: {
    display: 'none',
    color: 'red',
    fontSize: '24px',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}),
);


function HeaderBar(){
  const classes = useStyles();

  //These are created for mobile version-------start

  //--------------Menu Icon-----------------
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [mobileMoreAnchorEl1, setMobileMoreAnchorEl1] = React.useState(null);

  const isMenu1Open = Boolean(anchorEl1);
  const isMobileMenu1Open = Boolean(mobileMoreAnchorEl1);

  const handleMobileMenu1Close = () => {
    setMobileMoreAnchorEl1(null);
  };

  const handleMenu1Close = () => {
    setAnchorEl1(null);
    handleMobileMenu1Close();
  };

  const handleMobileMenu1Open = (event) => {
    setMobileMoreAnchorEl1(event.currentTarget);
  };

  const menuId1 = 'primary-search-account-menu';
  const renderMenu1 = (
    <Menu
      anchorEl={anchorEl1}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId1}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenu1Open}
      onClose={handleMenu1Close}
    >
    </Menu>
  );

  const mobileMenuId1 = 'primary-search-account-menu-mobile';
  const renderMobileMenu1 = (
    <Menu
      anchorEl={mobileMoreAnchorEl1}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={mobileMenuId1}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMobileMenu1Open}
      onClose={handleMobileMenu1Close}
    >
    

      <MenuItem>
        <Link to="/drug" underline='none'>            {/*-------------Change these Links------------ */}
          <p style={{color: '#606264', fontWeight: 'bold'}}>Drug</p>
        </Link>
      </MenuItem>
    
      <MenuItem>
        <Link to="/stock" underline='none'>            {/*-------------Change these Links------------ */}
          <p style={{color: '#606264', fontWeight: 'bold'}}>Stock</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/Prescription" underline='none'>       {/*-------------Change these Links------------ */}
          <p style={{color: '#606264', fontWeight: 'bold'}}>Prescription</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/reports" underline='none'>       {/*-------------Change these Links------------ */}
          <p style={{color: '#606264', fontWeight: 'bold'}}>Reports</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  //----------------------Menu Icon-----------------------


  //---------------------More Icon--------------------------
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [mobileMoreAnchorEl2, setMobileMoreAnchorEl2] = React.useState(null);

  const isMenu2Open = Boolean(anchorEl2);
  const isMobileMenu2Open = Boolean(mobileMoreAnchorEl2);

  const handleMobileMenu2Close = () => {
    setMobileMoreAnchorEl2(null);
  };

  const handleMenu2Close = () => {
    setAnchorEl2(null);
    handleMobileMenu2Close();
  };

  const handleMobileMenu2Open = (event) => {
    setMobileMoreAnchorEl2(event.currentTarget);
  };

  const menuId2 = 'primary-search-account-menu';
  const renderMenu2 = (
    <Menu
      anchorEl={anchorEl2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId2}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenu2Open}
      onClose={handleMenu2Close}
    >
    </Menu>
  );

  const mobileMenuId2 = 'primary-search-account-menu-mobile';
  const renderMobileMenu2 = (
    <Menu
      anchorEl={mobileMoreAnchorEl2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId2}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenu2Open}
      onClose={handleMobileMenu2Close}
    >

      <Link href="/Notifications" underline='none'>    {/*-------------Change these Links------------ */}
        <MenuItem>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />   {/* ---------Change these icons--------- */}
            </Badge>
          </IconButton>
          <p style={{color: '#606264', fontWeight: 'bold'}}>Notifications</p>
        </MenuItem>
      </Link>
      <Link href="/Emails" underline='none'>       {/*-------------Change these Links------------ */}
        <MenuItem>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <EmailIcon />         {/* ---------Change these icons--------- */}
            </Badge>
          </IconButton>
          <p style={{color: '#606264', fontWeight: 'bold'}}>Emails</p>
        </MenuItem>
      </Link>
      <Link href="/Profile" underline='none'>      {/*-------------Change these Links------------ */}
        <MenuItem >
          <IconButton>
            <AccountCircle />           {/* ---------Change these icons--------- */}
          </IconButton>
          <p style={{color: '#606264', fontWeight: 'bold'}}>Profile</p>
        </MenuItem>
      </Link>
      <Link href="/h" underline='none'>        {/*-------------Change these Links------------ */}
        <MenuItem>
          <IconButton>
            <ExitToAppIcon />         {/* ---------Change these icons--------- */}
          </IconButton>
          <p style={{color: '#606264', fontWeight: 'bold'}}>LogOut</p>
        </MenuItem>
      </Link>
    </Menu>
  );

  //--------------------------More Icon----------------------------
  //These are created for mobile version-----end


    return (
      <div>
        <AppBar position="static" style={{backgroundColor:'#ffffff'}}>
          <Toolbar>
            <Grid container>
              <Grid item className={classes.sectionDesktop}>
                <Link to="/" underline='none'>      {/*-------------Change these Links------------ */}
                  <Typography className={classes.Typography} >
                    <FontAwesomeIcon icon={faLaptopMedical} />
                    {" "}MedManager
                  </Typography>
                </Link>
              </Grid>
              <Grid item className={classes.sectionMobile}>
                <IconButton
                  className={classes.iconButton}
                  edge="start"
                  aria-label="open drawer"
                  aria-haspopup="true"
                  color="#292b2c"
                  aria-controls={mobileMenuId1}
                  onClick={handleMobileMenu1Open}
                >
                  <MenuIcon />
                </IconButton>
                <Link to="/" underline='none'>      {/*-------------Change these Links------------ */}
                  <Typography className={classes.Typography}>
                    <FontAwesomeIcon icon={faLaptopMedical} />
                    {" "}MedManager
                  </Typography>
                </Link>
              </Grid>
              {/* <Grid item className={classes.sectionDesktop}>
                <Typography className={classes.Typography} >
                  
                  <Link to="/stock" underline='none' className={classes.Link}>   
                    Stock
                  </Link>
                  <Link to="/prescription" underline='none' className={classes.Link}>     
                    Prescription
                  </Link>
                  <Link to="/reports" underline='none' className={classes.Link}>       
                    Reports
                  </Link>
                </Typography>
              </Grid> */}
              <Grid item sm className={classes.sectionDesktop}></Grid>
              <Grid item xs className={classes.sectionMobile}></Grid>
              <Grid item className={classes.sectionDesktop}>
                <Link href="/Notifications" underline='none'>      {/*-------------Change these Links------------ */}
                  <IconButton className={classes.iconButton}>
                    <Badge badgeContent={4} color="error">
                    < NotificationsIcon />    {/* ---------Change these icons--------- */}
                    </Badge>
                  </IconButton>
                </Link>
                <Link to="/Emails" underline='none'>              {/*-------------Change these Links------------ */}
                  <IconButton className={classes.iconButton}>
                    <Badge badgeContent={4} color="error">
                    < EmailIcon />       {/* ---------Change these icons--------- */}
                    </Badge>
                  </IconButton>
                </Link>
                <Link to="/profile" underline='none'>          {/*-------------Change these Links------------ */}
                  <IconButton className={classes.iconButton}>
                    <Badge>
                      <AccountCircle />     {/* ---------Change these icons--------- */}
                    </Badge>
                  </IconButton>
                </Link>
                <Link to="/h" underline='none'>               {/*-------------Change these Links------------ */}
                  <IconButton className={classes.iconButton}>
                    <Badge>
                    < ExitToAppIcon />     {/* ---------Change these icons--------- */}
                    </Badge>
                  </IconButton>
                </Link>
              </Grid>
              <Grid item className={classes.sectionMobile} >
                <IconButton
                  aria-label="show more"
                  aria-haspopup="true"
                  color="#292b2c"
                  edge="end"
                  aria-controls={mobileMenuId2}
                  onClick={handleMobileMenu2Open}
                  className={classes.iconButton}
                >
                  <MoreIcon />   
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {renderMobileMenu1}
        {renderMenu1}
        {renderMobileMenu2}
        {renderMenu2}
      </div>
    );
}

  
export default HeaderBar;