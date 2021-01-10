import React, {useState} from 'react'
import UserService from './UserService';

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
        },
      },
    },
  });

  


const initialFieldValues = {
    id: 0,
    name: '', 
    role: '',
    password: '',
    age: '',  
    gender: 'Male', 
    email: '', 
    contactNumber: '', 
    qualifications: '', 
}


function AddUser(props) {

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
        console.log('user => ' +JSON.stringify(values));
        UserService.createUser(values).then(res =>{
            alert('User added successfully!!!');
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
            <label style={{fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Add Users</label>
                <br/><br/>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                        variant="outlined"
                        size="small"
                        label="Full Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            label="Password"
                            name="password"
                            value={values.password}
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
                        size="small"
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={values.email}
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
                    </Grid>
                    <Grid item xs={6}>
                        {/* SelectSegment Option for Role*/}
                        <FormControl variant="outlined" size="small">
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                                name="role"
                                value={values.role}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Administrator">Administrator</MenuItem>
                                <MenuItem value="Doctor">Doctor</MenuItem>
                                <MenuItem value="Nurse">Nurse</MenuItem>
                                <MenuItem value="Pharmacist">Pharmacist</MenuItem>
                                <MenuItem value="PHI">PHI</MenuItem>
                                <MenuItem value="Lab Assistent">Lab Assistent</MenuItem>
                                <MenuItem value="Receptionist">Receptionist</MenuItem>
                                <MenuItem value="Councilor">Councilor</MenuItem>
                            </Select>
                        </FormControl>

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

                        <TextField
                            variant="outlined"
                            size="small"
                            label="Qualifications"
                            name="qualifications"
                            value={values.qualifications}
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

export default AddUser;
