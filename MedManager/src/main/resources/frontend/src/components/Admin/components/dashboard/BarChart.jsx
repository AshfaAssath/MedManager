import React from 'react'

import { Bar, defaults } from 'react-chartjs-2';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '90px',
    }
}))

defaults.global.legend.position = 'bottom'

export default function BarChart() {

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Bar
                data={{
                    labels: ['Monday', 'Tuesday','Wednesday','Thursday','Friday'],
                    datasets:[
                        {
                            label: 'Number of Students',
                            position: 'left',
                            data: [30, 23, 34, 28, 25, 36],
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
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
