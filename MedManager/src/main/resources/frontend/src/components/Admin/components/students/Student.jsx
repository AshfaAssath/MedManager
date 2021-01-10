import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import ListStudents from './ListStudents';
//import AddStudent from './AddStudent';
import ViewStudent from './ViewStudent';
import SearchStudent from './SearchStudent';
import SelectSegment from './SelectSegment';
import AddStudentDialog from './AddStudentDialog'
import AddStudentList from './AddStudentList';

import { Grid } from '@material-ui/core';



function Student() {

    return (
        <Router>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={8} direction="column" justify="flex-start" alignItems="center" position="fixed">
                {/* <Grid item>
                    <SearchStudent />
                </Grid> */}
                <Grid item>
                    <ListStudents/>
                </Grid>
                {/* <Grid item>
                    <AddStudent/>
                </Grid> */}
                {/* <Grid item>
                    <ViewStudent/>
                </Grid> */}
            </Grid>
            <Grid container item xs={4} direction="column" justify="flex-start" alignItems="center" position="fixed">
                <Grid item>
                    <AddStudentDialog />
                </Grid>
                <Grid item>
                    <AddStudentList />
                </Grid>
                {/* <Grid item>
                    <SelectSegment />
                </Grid> */}
            </Grid>
        </Grid>
    </Router>
        
    );
}

export default Student;


