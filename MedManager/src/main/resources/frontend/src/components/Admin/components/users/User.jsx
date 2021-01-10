import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";

import { Grid } from '@material-ui/core';

import AddUserDialog from './AddUserDialog.jsx';
import ListUser from './ListUser';
import SearchUser from './SearchUser';
// import SelectSegmentUser from './SelectSegmentUser';
import Status from '../welocme/Status'
import ViewUser from './ViewUser';

function User() {
    return (
        <Router>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={8} direction="column" justify="flex-start" alignItems="center" position="fixed">
                {/* <Grid item>
                    <SearchUser />
                </Grid> */}
                <Grid item>
                    <ListUser/>
                </Grid>
                {/* <Grid item>
                    <AddStudent/>
                </Grid> */}
                {/* <Grid item>
                    <ViewUser/>
                </Grid> */}
            </Grid>
            <Grid container item xs={4} direction="column" justify="flex-start" alignItems="center" position="fixed">
                <Grid item>
                    <AddUserDialog />
                </Grid>
                {/* <Grid item>
                    <Status />
                </Grid> */}
            </Grid>
        </Grid>
    </Router>
    )
}

export default User;





