import React, {useState} from 'react'
import StudentService from './StudentService';

import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { InputLabel, MenuItem, Select, Button, Paper } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                width: '80%',
                //   spacing: 1,
                marginBottom: '25px',
                marginLeft: '40px',
                maxWidth: '500px',
                display: 'flex',
            },
        },
    },
});




const initialFieldValues = {
    id: 0,
    firstName: '',
    lastName: '',
    age: '',
    faculty: '',
    gender: 'Male',
    email: '',
    address: '',
    contactNumber: '',
    stayingPlace: '',
    height: '',
    weight: '',
    chronicDisease: '',
    allergies: ''
}


function AddStudent() {

    const [values, setValues] = useState(initialFieldValues);

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
        StudentService.createStudent(values).then(res =>{
            alert('Patient added successfully!!!');
            setValues(initialFieldValues);
        })
            .catch(err => alert(err));
    };


    const handleReset = e => {
        e.preventDefault();
        setValues(initialFieldValues);
    };


    return (
        <Paper style={{marginTop: '10px'}}>

            <ThemeProvider theme={theme}>
                {/*<form onSubmit={e =>{*/}
                {/*    e.preventDefault();*/}
                {/*    submit(e);*/}
                {/*}}>*/}
                <form style={{padding:'20px'}}>
                    <label style={{fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Add Patient</label>
                    <br/><br/>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                size="small"
                                label="First Name"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Age"
                                name="age"
                                value={values.age}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                size="small"
                                variant="outlined"
                                label="Address"
                                name="address"
                                value={values.address}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Contact Number"
                                name="contactNumber"
                                value={values.contactNumber}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Chronic Disease"
                                name="chronicDisease"
                                value={values.chronicDisease}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Allergies"
                                name="allergies"
                                value={values.allergies}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Last Name"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleInputChange}
                            />

                            {/* Radio Button */}
                            <FormControl variant="outlined" size="small">
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup row={true}
                                            name="gender"
                                            value={values.gender}
                                            onChange={handleInputChange}
                                >
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>

                            {/* SelectSegment Option for Faculty*/}
                            <FormControl variant="outlined" size="small">
                                <InputLabel>Faculty</InputLabel>
                                <Select
                                    label="Faculty"
                                    name="faculty"
                                    value={values.faculty}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="Science">Faculty of Science</MenuItem>
                                    <MenuItem value="Humanities and Social Science">Faculty of Humanities and Social Science</MenuItem>
                                    <MenuItem value="Fisheries and Marine Science Technology">Faculty of Fisheries and Marine Science Technology</MenuItem>
                                    <MenuItem value="Management and Finance">Faculty of Management and Finance</MenuItem>
                                </Select>
                            </FormControl>

                            {/*SelectSegment option  for StayingPlace*/}
                            <FormControl variant="outlined" size="small" >
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
                            </FormControl>


                            <TextField
                                variant="outlined"
                                size="small"
                                label="Height"
                                name="height"
                                value={values.height}
                                onChange={handleInputChange}
                            />

                            <TextField
                                variant="outlined"
                                size="small"
                                label="Weight"
                                name="weight"
                                value={values.weight}
                                onChange={handleInputChange}
                            />

                            <br />
                            <Button size="large" text="submit" variant="contained" style={{backgroundColor: '#9da4ad'}} onClick={submit}>Submit</Button>
                            {" "}<Button size="large" text="submit" variant="contained" style={{backgroundColor: 'red', color:"white"}} onClick={handleReset}>Reset</Button>
                        </Grid>
                    </Grid>
                </form>
            </ThemeProvider>
        </Paper>
    )
}

export default AddStudent;
