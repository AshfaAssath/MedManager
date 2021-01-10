import React, {useState} from 'react'
//import StudentService from './StudentService';

import { FormControl, Grid} from '@material-ui/core';
import { InputLabel, MenuItem, Select, Button, Paper } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                width: '80%',
                //   spacing: 1,
                marginBottom: '25px',
                marginLeft: '12%',
                maxWidth: '240px',
            },
        },
    },
});


const initialFieldValues = {
    faculty: 'All',
    academicYear: 'All',
    stream: '',
};


function SelectSegment() {

    const [values, setValues ] = useState(initialFieldValues);

    const handleInputChange = (e) => {
        const {name, value } = e.target
        setValues({
            ...values,
            [name]:value
        })
    };

    const submit = e => {
        e.preventDefault();
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    };

    return (
        <Paper style={{marginTop: '25px', width: '280px'}}>

            <ThemeProvider theme={theme}>
                {/*<form onSubmit={e =>{*/}
                {/*    e.preventDefault();*/}
                {/*    submit(e);*/}
                {/*}}>*/}
                <form style={{padding:'20px', alignItems: 'center'}} >
                    <label style={{fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Select Segment</label>
                    <br/><br/>
                    <Grid container direction='column' justify='flex-start' alignItems='stretch'>
                        <Grid item>
                        {/* SelectSegment Option for Faculty*/}
                            <FormControl variant="outlined" size="small">
                                <InputLabel>Faculty</InputLabel>
                                <Select
                                    label="Faculty"
                                    name="faculty"
                                    value={values.faculty}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="Science">Faculty of Science</MenuItem>
                                    <MenuItem value="Humanities and Social Science">Faculty of Humanities and Social Science</MenuItem>
                                    <MenuItem value="Fisheries and Marine Science Technology">Faculty of Fisheries and Marine Science Technology</MenuItem>
                                    <MenuItem value="Management and Finance">Faculty of Management and Finance</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl variant="outlined" size="small">
                                <InputLabel>Academic Year</InputLabel>
                                <Select
                                    label="Academic Year"
                                    name="academicYear"
                                    value={values.academicYear}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="2015/16">2015/16</MenuItem>
                                    <MenuItem value="2016/17">2016/17</MenuItem>
                                    <MenuItem value="2017/18">2017/18</MenuItem>
                                    <MenuItem value="2018/19">2018/19</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* {values.faculty === 'All' ? 
                        (
                            null
                        )
                        :
                        (
                        <Grid item>
                            <FormControl variant="outlined" size="small">
                                <InputLabel>Stream</InputLabel>
                                
                                    {values.faculty === 'Science' ?
                                        (
                                            <Select
                                                label="Stream"
                                                name="stream"
                                                value={values.stream}
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Biological Science">Biological Science</MenuItem>
                                                <MenuItem value="Physical Science">Physical Science</MenuItem>
                                                <MenuItem value="Computer Science">Computer Science</MenuItem>
                                            </Select>
                                        )
                                        : values.faculty === 'Management and Finance' ?
                                            (
                                                <Select
                                                    label="Stream"
                                                    name="stream"
                                                    value={values.stream}
                                                    onChange={handleInputChange}
                                                >
                                                    <MenuItem value="All">All</MenuItem>
                                                    <MenuItem value="Management">Management</MenuItem>
                                                    <MenuItem value="Accounting">Accounting</MenuItem>
                                                    <MenuItem value="Human Resource">Human Resource</MenuItem>
                                                </Select>
                                            )
                                            : values.faculty === 'Fisheries and Marine Science Technology' ?
                                                (
                                                    <Select
                                                        label="Stream"
                                                        name="stream"
                                                        value={values.stream}
                                                        onChange={handleInputChange}
                                                    >
                                                        <MenuItem value="All">All</MenuItem>
                                                        <MenuItem value="Stream 1">Stream 1</MenuItem>
                                                        <MenuItem value="Stream 2">Stream 2</MenuItem>
                                                        <MenuItem value="Stream 3">Stream 3</MenuItem>
                                                    </Select>
                                                )
                                                : 
                                                (
                                                    <Select
                                                        label="Stream"
                                                        name="stream"
                                                        value={values.stream}
                                                        onChange={handleInputChange}
                                                    >
                                                        <MenuItem value="All">All</MenuItem>
                                                        <MenuItem value="History">History</MenuItem>
                                                        <MenuItem value="Social Science">Social Science</MenuItem>
                                                        <MenuItem value="Another">Another</MenuItem>
                                                    </Select>
                                                )
                                                
                                    }
                            </FormControl>
                        </Grid>
                        )
                        } */}



                        <Grid item style={{marginLeft: '120px'}}>
                            <Button   
                                variant="outlined"
                                onClick={submit}
                                spacing='1'
                                color='primary'
                                variant="outlined" 
                                startIcon={<CheckCircleIcon />}
                            >
                                Select
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </ThemeProvider>
        </Paper>
    )
}

export default SelectSegment;
