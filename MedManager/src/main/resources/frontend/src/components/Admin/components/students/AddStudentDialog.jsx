import React, { useState } from 'react';
// import StudentService from './StudentService';

import { Button, TextField,Dialog, DialogActions, DialogContent, DialogTitle, Card } from '@material-ui/core';
import { MenuItem, InputLabel, Select, FormControl, FormControlLabel, Radio, FormLabel, Grid, RadioGroup } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import adminService from '../../../../services/admin.service';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff00',
        width: 'auto',
        marginTop: '90px',
        variant: 'none'
    },
    button: {
        spacing: '1',
        width: 'auto',
        variant: 'none'
    },
    formControl: {
        width: '80%',
        //   spacing: 1,
        //marginBottom: '25px',
        //marginLeft: '20px',
        maxWidth: '300px',
        display: 'flex',
    },
}));

const theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                width: '80%',
                //   spacing: 1,
                marginBottom: '20px',
                marginLeft: '20px',
                maxWidth: '240px',
                //display: 'flex',
            },
        },
    },
});

const initialFieldValues = {
    id: "",
    firstName: '',
    lastName: '',
    password:'password123',
    faculty: '',
    acedemicYear:'',
    gender: 'Male',
    email: '',
    contactNumber: '',  
    activeStatus:false,
    
}

function AddStudentDialog() {

    const classes = useStyles();

    const [values, setValues] = useState(initialFieldValues);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //text Field onChange
    const handleInputChange = (e) => {
        const {name, value } = e.target
        setValues({
            ...values,
            [name]:value
        })
    };

    const submit = e => {
        e.preventDefault();
        const {name, value } = e.target
        setValues({
            ...values,
            [name]:value
        })
        console.log('student => ' +JSON.stringify(values));
        adminService.createStudent(values).then(res =>{
            alert('Patient added successfully!!!');
            setValues(initialFieldValues);
            handleClose();
        })
            .catch(err => alert(err));
    };


    const handleReset = e => {
        e.preventDefault();
        setValues(initialFieldValues);
        handleClose();
    };



    return (  
        <div>
            {/* <Card className={classes.root}> */}
                <Button 
                    style={{marginTop: '90px'}}
                    variant="outlined" 
                    color="primary"
                    className={classes.button}
                    startIcon={<PersonAddIcon />}
                    onClick={handleClickOpen}
                >
                    Add New Patient
                </Button>
    
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Patient</DialogTitle>
                <DialogContent>
                    <ThemeProvider theme={theme}>
                    {/*<form onSubmit={e =>{*/}
                    {/*    e.preventDefault();*/}
                    {/*    submit(e);*/}
                    {/*}}>*/}
                    <form style={{padding:'10px'}}>
                        <Grid container>
                            <Grid item xs={6}>

                            <TextField
                                    variant="outlined"
                                    size="small"
                                    label="Student Id"
                                    name="id"
                                    value={values.id}
                                    onChange={handleInputChange}
                                    className={classes.formControl}

                                    />

                                <TextField
                                    variant="outlined"
                                    size="small"
                                    label="First Name"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleInputChange}
                                    className={classes.formControl}
                                />
                                {/* <TextField
                                    variant="outlined"
                                    size="small"
                                    label="Age"
                                    name="age"
                                    value={values.age}
                                    onChange={handleInputChange}
                                    className={classes.formControl}
                                /> */}
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    className={classes.formControl}
                                />
                             
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    label="Contact Number"
                                    name="contactNumber"
                                    value={values.contactNumber}
                                    onChange={handleInputChange}
                                    className={classes.formControl}
                                />
                               
                            </Grid>
                            <Grid item xs={6}>


                            <TextField
                                    size="small"
                                    variant="outlined"
                                    label="Adecemic Year "
                                    name="acedemicYear"
                                    value={values.acedemicYear}
                                    onChange={handleInputChange}
                                    className={classes.formControl}
                                />
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    label="Last Name"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleInputChange}
                                    className={classes.formControl}
                                />

                                {/* Radio Button */}
                                <FormControl variant="outlined" size="small">
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup row={true}
                                                name="gender"
                                                value={values.gender}
                                                onChange={handleInputChange}
                                                color="primary"
                                    >
                                        <FormControlLabel value="Male" control={<Radio color="primary" />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio color="primary" />} label="Female" />
                                        
                                    </RadioGroup>
                                </FormControl>

                                {/* SelectSegment Option for Faculty*/}
                                <FormControl variant="outlined" size="small" className={classes.formControl}>
                                    <InputLabel>Faculty</InputLabel>
                                    <Select
                                        label="Faculty"
                                        name="faculty"
                                        value={values.faculty}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="SC">Faculty of Science</MenuItem>
                                        <MenuItem value="HS">Faculty of Humanities and Social Science</MenuItem>
                                        <MenuItem value="FMST">Faculty of Fisheries and Marine Science Technology</MenuItem>
                                        <MenuItem value="MGT">Faculty of Management and Finance</MenuItem>
                                    </Select>
                                </FormControl>

                                {/*SelectSegment option  for StayingPlace*/}
                                {/* <FormControl variant="outlined" size="small" className={classes.formControl}>
                                    <InputLabel>Staying Place</InputLabel>
                                    <Select
                                        label="Staying Place"
                                        name="stayingPlace"
                                        value={values.stayingPlace}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Boarding Place">Boarding Place</MenuItem>
                                        <MenuItem value="Eliyakanda Girls New">Eliyakanda Girls New</MenuItem>
                                        <MenuItem value="Eliyakanda Girls Old">Eliyakanda Girls Old</MenuItem>
                                        <MenuItem value="Eliyakanda Boys">Eliyakanda Boys</MenuItem>
                                        <MenuItem value="Meddawatta">Meddawatta</MenuItem>
                                        <MenuItem value="Pamburana Girls">Pamburana Girls</MenuItem>
                                        <MenuItem value="Pamburana Boys">Pamburana Boys</MenuItem>
                                        <MenuItem value="Wellamadama One">Wellamadama One</MenuItem>
                                        <MenuItem value="Wellamadama Two">Wellamadama Two</MenuItem>
                                        <MenuItem value="Wellamadama Three">Wellamadama Three</MenuItem>
                                    </Select>
                                </FormControl> */}


                            </Grid>
                        </Grid>
                    </form>
                </ThemeProvider>
                </DialogContent>
                <DialogActions style={{marginBottom: '20px', marginRight: '20px'}}>
                    <Button 
                        variant="outlined" 
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={submit}
                    >
                        Save
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        className={classes.button}
                        startIcon={<CancelIcon />}
                        onClick={handleReset}   
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddStudentDialog;