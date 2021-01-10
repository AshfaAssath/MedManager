import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import Welcome from './Welcome';
//import News from './News';
import Search from './Search';
import { Grid } from '@material-ui/core';
import Warning from './Status';

function WelcomePage() {
    return (
        <Router>
            <Grid container spacing={3} direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item md={8}>
                    <Welcome />
                </Grid>
                <Grid container item md={4} direction="column" justify="flex-start" alignItems="center" position="fixed">
                    <Grid item>
                        <Search />
                    </Grid>
                    <Grid item>
                        <Warning />
                    </Grid>
                </Grid>
            </Grid>
        </Router>
    )
}

export default WelcomePage;
