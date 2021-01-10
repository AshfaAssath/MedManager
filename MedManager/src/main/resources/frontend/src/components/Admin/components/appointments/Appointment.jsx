import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";

import { Grid } from '@material-ui/core';

import SearchAppointment from './SearchAppointment';
import ListAppointments from './ListAppointments';
import ViewAppointment from './ViewAppointment';
import AddAppointmentDialog from './AddAppointmentDialog';
import AppointmentStatus from './AppointmentStatus';
import AddAppointmentList from './AddAppointmentList';

function Appointment() {
    return (
        <Router>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item xs={8} direction="column" justify="flex-start" alignItems="center" position="fixed">
                    {/* <Grid item>
                        <SearchAppointment />
                    </Grid> */}
                    <Grid item>
                        <ListAppointments />
                    </Grid>
                    {/* <Grid item>
                        <AddStudent/>
                    </Grid> */}
                    {/* <Grid item>
                        <ViewAppointment/>
                    </Grid> */}
                </Grid>
                <Grid container item xs={4} direction="column" justify="flex-start" alignItems="center" position="fixed">
                    <Grid item>
                        <AddAppointmentDialog />
                    </Grid>
                    {/*<Grid item>*/}
                    {/*    <AddAppointmentList />*/}
                    {/*</Grid>*/}
                    {/* <Grid item>
                        <AppointmentStatus />
                    </Grid> */}
                </Grid>
            </Grid>
        </Router>
        
    );
}

export default Appointment;