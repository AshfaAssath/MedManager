import React, {useState,useEffect,useCallback} from 'react'
import {AppBar,Button ,makeStyles,Grid,InputBase,IconButton,Select,Toolbar,Badge,TextField, FormControl, InputLabel,MenuItem} from '@material-ui/core'
import {useForm,Form} from '../../Component/useForm';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
//import classes from '*.module.css';
import DateFnsUtils from '@date-io/date-fns'
import axios from 'axios'

//const useStyles=makeStyles(theme=>({
    //root:{
       //'&.MuiFormControl-root':{
           // width:'80%',
           // margin:theme.spacing(1)
        //}
    //}
//}))
const initialFValues={
   
    drugCode:'',
    drugName:'',
    category:'',
    lowQuantity:0,
    orderQuantity:0
    
   
    // drugIssuing:[],
}
export default function DrugForm(props) {

    const[values,setValues]=useState(initialFValues);
    //const classes=useStyles();
    const{addOrEdit,recordForEdit}=props;
 

    const handleInputChange=(e)=>{
      
        const  {name,value}=e.target
        setValues({
            ...values,
            [name]:value
        })

      
    }
     
    // const convertToDetEventPara=(name,value)=>({
    //     target:{
    //         name, 
    //         value
    //     }
    // })
    const handleSubmit=(e)=>{
        e.preventDefault()    
        addOrEdit(values);
        handleReset();

               

    }
    useEffect(() =>{
        if(recordForEdit != null)
                setValues({
                    ...recordForEdit
                })
    },[recordForEdit])

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

                <TextField style={{margin:5}}
                variant='outlined' 
                label='Name'
                name='drugName'
                value={values.drugName}
                onChange={handleInputChange}
                />

             

                <TextField style={{margin:5}}

                variant='outlined'
                label='Low Quantity'
                name='lowQuantity'
                value={values.lowQuantity}
                onChange={handleInputChange}
                />

                
                <TextField style={{margin:5}}

                variant='outlined'
                label='Order Quantity'
                name='orderQuantity'
                value={values.orderQuantity}
                onChange={handleInputChange}
                />
                            
            </Grid>
            <Grid item xs={6}>
                <FormControl variant='outlined'>
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
                           <MenuItem key='1' value='Syrup'>Syrup</MenuItem> 
                           
                        </Select>
                   
                </FormControl>

                

                

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
 