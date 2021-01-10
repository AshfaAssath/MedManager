import React, {useState,useEffect,useCallback} from 'react'
import {AppBar,Button ,makeStyles,Grid,InputBase,IconButton,Select,Toolbar,Badge,TextField, FormControl, InputLabel,MenuItem} from '@material-ui/core'
import {useForm,Form} from '../../Component/useForm';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import axios from 'axios'


const initialFValues={
    id:0,
    drugCode:'',
    drugName:'',
    category:'',
    quantity:'',
    lowQuntity:'',
    entryDate:new Date(new Date().toDateString()),
    expiryDate:new Date(new Date().toDateString()),
    orderQuantity:'',
    drugIssuing:[],
}
export default function MedicineForm2(props) {

    const[values,setValues]=useState(initialFValues);
    const{ addEx}=props;
 
            
    const handleInputChange=(e)=>{
        const  {name,value}=e.target
        setValues({
            ...values,
            [name]:value
        })
    }
     
    const convertToDetEventPara=(name,value)=>({
        target:{
            name, 
            value
        }
    })

   

    const handleSubmit=(e)=>{
        e.preventDefault()
        addEx(values)
        handleReset();             

    }
   

    const handleReset=()=>{

        setValues(
            initialFValues
        )

    }

    return (
        <div>
            
            <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>

            <TextField style={{margin:5}}
                variant='outlined' 
                label='Drug Code'
                name='drugCode'
                value={values.drugCode}
                onChange={handleInputChange}
            
                />

                {/* <TextField style={{margin:5}}
                variant='outlined' 
                label='Name'
                name='drugName'
                value={values.drugName}
                onChange={handleInputChange}
                /> */}

                <TextField style={{margin:5}}

                variant='outlined'
                label='Quantity'
                name='quantity'
                value={values.quantity}
                onChange={handleInputChange}
                />

                {/* <TextField style={{margin:5}}

                variant='outlined'
                label='Low Quantity'
                name='lowQuntity'
                value={values.lowQuntity}
                onChange={handleInputChange}
                /> */}

                
                {/* <TextField style={{margin:5}}

                variant='outlined'
                label='Order Quantity'
                name='orderQuantity'
                value={values.orderQuantity}
                onChange={handleInputChange}
                /> */}
                            
            </Grid>
            <Grid item xs={6}>
                {/* <FormControl variant='outlined'>
                    <InputLabel>Category </InputLabel>
                        <Select  
                        label='Category'
                        name='category'
                        value={values.category}
                        onChange={handleInputChange}
                        >
                           <MenuItem key='1' value='None'>None</MenuItem>  
                           <MenuItem key='1' value='Tablet'>Tablet</MenuItem>   
                           <MenuItem key='1' value='Capsule'>Capsule</MenuItem> 
                        </Select>
                   
                </FormControl> */}

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar variant='inline'
                            inputVariant='outlined'
                            label='Entry Date'
                            formate='MMM/dd/yyyy'
                            name='entryDate'
                            value={values.entryDate}
                           onChange={date=>handleInputChange(convertToDetEventPara('entryDate',date))}
                        
                        
                        
                        />

                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar variant='inline'
                            inputVariant='outlined'
                            label='Expire Date'
                            formate='MMM/dd/yyyy'
                            name=' expiryDate'
                            value={values.  expiryDate}
                           onChange={date=>handleInputChange(convertToDetEventPara('expiryDate',date))}
                        
                        
                        
                        />

                </MuiPickersUtilsProvider>


                <div>
                    <Button
                        style={{margin:10}}
                        type='submit'
                        variant='outlined'
                        size='large'
                        color='primary'
                       // onClick={han}
                        
                    >
                        Submit
                    </Button>

                    <Button
                        style={{margin:10}}
                        //type='submit'
                        variant='outlined'
                        size='large'
                        color='primary'
                       onClick={handleReset}
                        
                    
                    >

                        Reset
                    </Button>


                </div>
            </Grid>
               
         </Grid>  
         </Form>   
        
            
        </div>
    )
}
 