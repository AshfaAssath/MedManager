import React from 'react'

import { Pie, defaults } from 'react-chartjs-2';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '30px',
    }
}))

defaults.global.legend.position = 'bottom'

export default function BarChart() {

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Pie
                data={{
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets:[
                        {
                            label: '# of Students',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ]
                        },
                    ]
                }}
                height={400}
                width={600}
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    maintainAspectRatio: false, 
                    title: {
                        display: true,
                        text: 'Number of patients per week',
                    } 
                }}
            />
        </Paper>
    )
}
