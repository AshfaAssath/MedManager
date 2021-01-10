import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import BarChart from './BarChart'
import PieChart from './PieChart'
 
import { Grid } from '@material-ui/core';

export default function Charts() {
    return (
        <Router>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item xs={8} direction="column" justify="flex-start" alignItems="center" position="fixed">
                    <Grid item>
                        <BarChart/>
                    </Grid>
                    <Grid item>
                        <PieChart/>
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
                        {/* <AddStudentDialog /> */}
                    </Grid>
                    {/* <Grid item>
                        <AddStudentList />
                    </Grid>
                    <Grid item>
                        <SelectSegment />
                    </Grid> */}
                </Grid>
            </Grid>
        </Router>
    )
}
