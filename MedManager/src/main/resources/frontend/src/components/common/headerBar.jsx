
import React,{useState,useEffect} from 'react';
import { Link,Switch,Route } from 'react-router-dom';

// import SideMenu from '../Doctor/sideBar'
import AuthService from '../../services/auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons'

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Grid, IconButton, Badge } from '@material-ui/core';
// import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';

import Login from './../Login';
import Profile from './../Profile';
import Home from './../Home';

const useStyles = makeStyles((theme) => ({
  Typography: {
    marginTop: '5px',
    marginLeft: '10px',
    fontSize:'26px', 
    fontWeight:'bold', 
    color:'red', 
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  LinkMobile: {
    textDecoration: 'none',
  },

  LinkDesktop: {
    marginLeft: '15px',
    color: '#606264',
    textDecoration: 'none',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    "&:hover": {
      color: '#8A8D91',
    },
    '&:focus': {
      color: 'black',
    },
    '&:active': {
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
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}),
);


function HeaderBar(){
  const classes = useStyles();

  const [showAdminBoard,setShowAdminBoard] =useState(false);
  const [showDoctorBoard,setShowDoctorBoard] =useState(false);
  const [showPharmacistBoard,setShowPharmacistBoard] =useState(false);
  const [showReceptionistBoard,setShowReceptionistBoard] =useState(false);
  const [showPHIBoard,setShowPHIBoard] =useState(false);
  const [currentUser,setCurrentUser] =useState(undefined);


  useEffect(() =>{

  //  setInterval(data,2000);
  //  alert('thisis called')
    data();
  },[data]);

  const data=()=>{

    const user =AuthService.getCurrentUser();

    if(user){
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowDoctorBoard(user.roles.includes("ROLE_DOCTOR"));
      setShowPharmacistBoard(user.roles.includes("ROLE_PHARMACIST"));
      setShowPHIBoard(user.roles.includes("ROLE_PHI"));
      setShowReceptionistBoard(user.roles.includes("ROLE_RECEPTIONIST"));
    }
  }

  const logOut= () =>{
    AuthService.logout();
  }




  const [sideMenu, setSideMenu] = React.useState(false)

  

    return (
      <div>
        <AppBar position="fixed" style={{backgroundColor:'#ffffff'}} className={classes.appBar}>
          <Toolbar>
            <Grid container>
              <Grid item className={classes.sectionDesktop}>
                <Link to={"/"} style={{textDecoration: 'none'}}>     
                  <Typography className={classes.Typography} >
                    <FontAwesomeIcon icon={faLaptopMedical} />
                    {" "}MedManager
                  </Typography>
                </Link>
              </Grid>
              <Grid item className={classes.sectionMobile}>
                <Link>
                  <IconButton
                      className={classes.iconButton}
                      edge="start"
                      aria-label="open drawer"
                      aria-haspopup="true"
                      color="#292b2c"
                      // aria-controls={mobileMenuId1}
                      // onClick={handleMobileMenu1Open}
                      // onClick={showSideMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                </Link>
                <Link to={"/"} style={{textDecoration: 'none'}} >     
                  <Typography className={classes.Typography}>
                    <FontAwesomeIcon icon={faLaptopMedical} />
                    {" "}MedManager
                  </Typography>
                </Link>
              </Grid>
        
              <Grid item sm className={classes.sectionDesktop}></Grid>
              <Grid item xs className={classes.sectionMobile}></Grid>
              
              <Grid item
               className={classes.sectionDesktop}>
                
                <Link to={"/home"}>     
                   {/* <IconButton className={classes.iconButton}>
                    <Badge badgeContent={4} color="error">
                    < NotificationsIcon />   
                    </Badge>
                  </IconButton> } */}
                  Home
                </Link>
       {         
                  currentUser?

                (<div>
                <Link to={"/profile"}>             
                  {/* <IconButton className={classes.iconButton}>
                    <Badge badgeContent={4} color="error">
                    < EmailIcon />       
                    </Badge>
                  </IconButton> */}Profile
                </Link>
                
                <Link to={"/login"}         
                
                  onClick={logOut}>
                        LogOut
                </Link>

                </div>
                )
                :(
                  <Link to={"/login"}>         
                  {/* <IconButton className={classes.iconButton}>
                    <Badge>
                      <AccountCircle />     
                    </Badge>
                  </IconButton> */}Login
                </Link>

                )

}

{/*                
                <Link to={"/"}>              
                  <IconButton className={classes.iconButton}>
                    <Badge>
                    < ExitToAppIcon />     
                    </Badge>
                  </IconButton>
                </Link>
              </Grid> */}
            
              {/* <Grid item className={classes.sectionMobile} >
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
              </Grid> */}
            </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu1}
        {renderMenu1}
        {renderMobileMenu2}
        {renderMenu2} */}



        <Switch>
                <Route exact path={["/" ,"/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                {/* <Route exact path="/register" component={Register} /> */}
                <Route exact path="/profile" component={Profile} />
      </Switch>
      </div>
    );
}

  
export default HeaderBar;