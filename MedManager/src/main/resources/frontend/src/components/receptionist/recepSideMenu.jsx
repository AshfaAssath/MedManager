import React,{useState} from 'react'
import {Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import { red } from '@material-ui/core/colors';
import AuthService from '../../services/auth.service';

import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '120px',
        width : '300px',
        // minWidth : '240px',
        marginLeft : '40px',
        // display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    nested: {
        paddingLeft: theme.spacing(4),
    },

    link: {
        color: '#606264',
        "&:hover": {
            color: '#8A8D91',
          },
          '&:focus': {
            //color: '#8A8D91',
            backgroundColor: '#8a8d9175',
          },
          '&:active': {
              color: 'black',
          },
          fontWeight: 'italic',
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: '#fff',
        backgroundColor: red[500],
    },

}));


function SideMenu() {

    const classes=useStyles();
    // const [openAppointments,setOpenAppointments]=useState(false);
    // const [openPrescription,setOpenPrescription]=useState(false);
    // const [openMedical,setOpenMedical]=useState(false);
    // const [openIssuedMedicals,setOpenIssuedMedicals]=useState(false);
    // const [openIssuedPres,setOpenIssusedPres]=useState(false);
    // const [openSearchStudentDetails,setOpenSearchStudentDetails]=useState(false);



    const handleLogout=()=>{
        AuthService.logout();
    }

    return (
        <Card className={classes.root}> 
            <CssBaseline/>
            <div>

                {/*<AccountCircleIcon fontSize="large" />*/}
                <div alignItems="center" style={{padding:"30px"}} >
                    {/*<CardMedia*/}
                    {/*    component="img"*/}
                    {/*    alt="User"*/}
                    {/*    height="50"*/}
                    {/*    image={Avatar}*/}
                    {/*    title="User"*/}
                    {/*/>*/}
                    <Avatar alt="Administrator" src="./avatar.png" className={classes.avatar} alignItems="center" />
                    <Typography textAlign="center">
                        RECEPTIONIST
                    </Typography>
                </div>
                <Divider />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                 <Link to={"/home"}  style={{textDecoration: "none"}} >
                    <ListItem button className={classes.link}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                    </ListItem>
                </Link>

                <Link to={"/receptionist/appoint/"}  style={{textDecoration: "none"}} >
                    <ListItem button className={classes.link}>
                    <ListItemIcon>
                        <ViewListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Appointments"/>
                    </ListItem>
                </Link>

                <Link to={"/receptionist"} style={{textDecoration: "none"}} >
                    <ListItem button className={classes.link} >
                    <ListItemIcon>
                    <ScheduleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Time slots" />
                    </ListItem>
                </Link>

                <Link to={"/profile"} style={{textDecoration: "none"}} >
                    <ListItem button className={classes.link} >
                    <ListItemIcon>
                    <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                    </ListItem>
                </Link>

                <Link to={"/login"} style={{textDecoration: "none"}} >
                    <ListItem button className={classes.link} onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                    </ListItem>
                </Link>
               </List> 
            </div>

        </Card>
    )
}

export default SideMenu
