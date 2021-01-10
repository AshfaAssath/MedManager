import React from 'react'
import Home from '../Welcome'
import{ BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {CssBaseline, Grid} from '@material-ui/core';
import CreateAppointment from './createAppointment';
import UpdateAppointment from './updateAppointment';

import AppointmentsList from './appointmentsList';
import AvailableSlots from './availableSlots';
import SideMenu from './recepSideMenu';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './../Profile';


const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1160,
            xl: 1920,
        },
    },
  })
  
  const useStyles = makeStyles(theme => ({
    //     root: {
    //         [theme.breakpoints.up('md')]: {
    //             backgroundColor: 'red',
    //         },
    //     },
        sectionDesktop: {
            display: 'none',
                [theme.breakpoints.up('lg')]: {
                display: 'flex',
            },
        }
    }));


function ReceptionistMain() {

    const classes= useStyles();

    return (
        
            <BrowserRouter>
                       <Grid container>
                   <ThemeProvider theme={theme}>
                     <Grid className={classes.sectionDesktop} container spacing={3} direction="row" justify="center" alignItems="flex-start" >
                        <Grid item md={3}>
                         <SideMenu/>
                        </Grid>
                    <Grid item md={9}> 
                    <Grid direction="column" justify="space-between" alignItems="center" position="fixed">
                      <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/profile" exact component={Profile}/>
                     <Route  path="/receptionist" exact component={AvailableSlots} />
                    <Route path="/receptionist/addAppoint" component={CreateAppointment }></Route> 
                    <Route path="/receptionist/updateAppoint/:id" component={UpdateAppointment }></Route>    
                    <Route path="/receptionist/appoint/" exact component={AppointmentsList }></Route>
                    </Switch> 
                    </Grid>
                    </Grid>
                    </Grid>
                    </ThemeProvider>
                    </Grid>
                    <CssBaseline/>
                    </BrowserRouter> 



                   
               
      
    )
}

export default ReceptionistMain
