import React,{useState} from 'react';

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
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import ViewListIcon from '@material-ui/icons/ViewList';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    marginTop: '90px',
    marginLeft: '20px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    //flexShrink: 0,
    borderStyle: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#ffffff",
    borderStyle: 'none',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    // flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function SideBar() {

    const classes=useStyles();
    const [openAppointments,setOpenAppointments]=useState(false);
    const [openPrescription,setOpenPrescription]=useState(false);
    const [openMedical,setOpenMedical]=useState(false);
    const [openIssuedMedicals,setOpenIssuedMedicals]=useState(false);
    const [openIssuedPres,setOpenIssusedPres]=useState(false);
    const [openSearchStudentDetails,setOpenSearchStudentDetails]=useState(false);

    // const handleClickAppoint =()=>{
    //     setOpenAppointments(!openAppointments);
    // }

    return (
        <Card classes={classes.root}>
            <CssBaseline/>
            <Drawer
            className={classes.drawer}
            style={{backgroundColor:'ffffff00'}}
                variant="permanent"
                classes={{
                    paper:classes.drawerPaper
                }}
                >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List
                        component="nav"
                        aria-labelledby
                    ="nested-list-subheader"  >

                            <ListItem button>
                               <ListItemIcon>
                                     <DashboardIcon />
                               </ListItemIcon>
                                     <ListItemText primary="Appointments"/>
                            </ListItem>
                            <Divider/>

                            <ListItem button>
                                <ListItemIcon>
                                    <CreateIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Prescribe Medicine"/>   
                            </ListItem>
                            
                            <Divider/>

                            <ListItem button>
                            <ListItemIcon>
                                <CardMembershipIcon />
                            </ListItemIcon>
                            <ListItemText primary="Issue A Medical" />
                            </ListItem>

                            <Divider/>

                            <ListItem button>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Check Issued Prescriptions" />
                            </ListItem>
                            

                            <ListItem button>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Check Issued medicals" />
                            </ListItem>

                            <ListItem button>
                            <ListItemIcon>
                                 <PeopleAltIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Search Student Details" />
                            </ListItem>

                           <Divider/>

                           <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                            </ListItem>

                            <ListItem button>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                            </ListItem>


                    </List>

                </div>


        </Drawer>
        </Card>
    )
}

export default SideBar
