import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PostAddIcon from '@material-ui/icons/PostAdd';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Typography} from "@material-ui/core";

import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '90px',
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

    const classes = useStyles();
    const [openPatient, setOpenPatient] = React.useState(false);
    const [openStaffM, setOpenStaffM] = React.useState(false);
    const [openAppointment, setOpenAppointment] = React.useState(false);
    const [openReport, setOpenReport] = React.useState(false);
    const [openSetting, setOpenSetting] = React.useState(false);
  
    const handleClickPatient = () => {
      setOpenPatient(!openPatient);
    };
  
    const handleClickStaff = () => {
      setOpenStaffM(!openStaffM);
    };
  
    const handleClickAppointment = () => {
      setOpenAppointment(!openAppointment);
    };
  
    const handleClickReport = () => {
      setOpenReport(!openReport);
    };
  
    const handleClickSetting = () => {
      setOpenSetting(!openSetting);
    };

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
                        ADMINISTRATOR
                    </Typography>
                </div>
                <Divider />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {/* <Link to={"/Dashboard"}  style={{textDecoration: "none"}} >
                    <ListItem button className={classes.link}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                    </ListItem>
                </Link> */}

                <Link to={"/Student"} style={{textDecoration: "none"}} >
                    <ListItem button className={classes.link} onClick={handleClickPatient}>
                    <ListItemIcon>
                        <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Patients" />
                    {/*{openPatient ? <ExpandLess /> : <ExpandMore />}*/}
                    </ListItem>
                </Link>
                {/* <Collapse in={openPatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to={"/AddStudent"} style={{textDecoration: "none", color:"inherit"}}>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <GroupAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Patients" />
                        </ListItem>
                    </Link>
                    <Link to={"/ListStudents"} style={{textDecoration: "none", color:"inherit"}}>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Patients" />
                        </ListItem>
                    </Link>
                </List>
                </Collapse> */}

                <Link to={"/User"} style={{textDecoration: "none"}}>
                    <ListItem button className={classes.link} onClick={handleClickStaff}>
                    <ListItemIcon>
                        <RecentActorsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Staff Members" />
                    {/*{openStaffM ? <ExpandLess /> : <ExpandMore />}*/}
                    </ListItem>
                </Link>
                {/* <Collapse in={openStaffM} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to={"/AddUSer"} style={{textDecoration: "none", color:"inherit"}}>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Staff Members" />
                        </ListItem>
                    </Link>
                    <Link to={"/ListUser"} style={{textDecoration: "none", color:"inherit"}}>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Staff Members" />
                        </ListItem>
                    </Link>
                </List>
                </Collapse> */}

                <Link  to={"/Appointment"} style={{textDecoration: "none"}}>
                    <ListItem button className={classes.link} onClick={handleClickAppointment}>
                    <ListItemIcon>
                        <EventNoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Appointments" />
                    {/*{openAppointment ? <ExpandLess /> : <ExpandMore />}*/}
                    </ListItem>
                </Link>
                {/* <Collapse in={openAppointment} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <PostAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Appointments" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <ViewListIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Appointments" />
                    </ListItem>
                </List>
                </Collapse> */}

                {/* <Link  to={"/User"} style={{textDecoration: "none"}} >
                    <ListItem button className={classes.link} onClick={handleClickReport}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                    {openReport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </Link> */}
                {/* <Collapse in={openReport} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Medical Certificates" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Medical Reports" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drug Reports" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Equipments Reports" />
                    </ListItem>
                </List>
                </Collapse> */}

                <Divider />

                {/* <ListItem button onClick={handleClickSetting}  className={classes.link}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                {openSetting ? <ExpandLess /> : <ExpandMore />}
                </ListItem> */}
                {/*<Collapse in={openSetting} timeout="auto" unmountOnExit>*/}
                {/*<List component="div" disablePadding>*/}
                {/*    <ListItem button className={classes.nested} >*/}
                {/*    <ListItemIcon>*/}
                {/*        <SettingsIcon />*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="setting 1" />*/}
                {/*    </ListItem>*/}
                {/*    <ListItem button className={classes.nested}>*/}
                {/*    <ListItemIcon>*/}
                {/*        <SettingsIcon />*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="setting 2" />*/}
                {/*    </ListItem>*/}
                {/*</List>*/}
                {/*</Collapse>*/}
                    {/* <Link to={"/Profile"} style={{textDecoration: "none"}} >
                <ListItem button  className={classes.link}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItem>
                </Link> */}

                <ListItem button  className={classes.link}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
                </ListItem>

                <br /><br /><br />
                
                {/* <ListItem button>
                <ListItemText primary="" />
                </ListItem>
                
                <ListItem button>
                <ListItemText primary="" />
                </ListItem>

                <ListItem button>
                <ListItemText primary="" />
                </ListItem> */}
            </List>
            </div>
        </Card>
    )
}

export default SideMenu;
