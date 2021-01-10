import React from 'react'

import AddStudentDialog from './AddStudentDialog';

import { Card, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff00',
        width: 'auto',
        marginTop: '90px',
        variant: 'none'
    },
    button: {
        spacing: '1',
    },
}));

// function handleAddStudent() {
//     return(
//         <AddStudentDialog />
//     );
// }

function Buttons() {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Button 
                variant="outlined" 
                color="primary"
                className={classes.button}
                startIcon={<PersonAddIcon />}
                // onClick={handleAddStudent}
            >
                Add New Patient
            </Button>
        </Card>
    )
}

export default Buttons;
