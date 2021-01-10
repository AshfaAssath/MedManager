import React, {useState,useEffect,useCallback} from 'react'
import {AppBar,Button ,makeStyles,Grid,InputBase,IconButton,Select,Toolbar,Badge,TextField, FormControl, InputLabel,MenuItem} from '@material-ui/core'
import {useForm,Form} from '../../Component/useForm';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
//import classes from '*.module.css';
import DateFnsUtils from '@date-io/date-fns'
import axios from 'axios';
import authHeader from '../../../../services/auth-header';

//const useStyles=makeStyles(theme=>({
    //root:{
       //'&.MuiFormControl-root':{
           // width:'80%',
           // margin:theme.spacing(1)
        //}
    //}
//}))
const initialFValues={
    // id:0,
    // drugCode:'',
    // // drugName:'',
    // //  category:'',
    // quantity:'',
    // // lowQuntity:'',
    // entryDate:new Date(new Date().toDateString()),
    // expiryDate:new Date(new Date().toDateString()),
    // // orderQuantity:'',
    
        
    //    const newDrug= {
     
            // drug: {
            //     drugCode: "P-1"
            // },
            DrugCode:'',
            quantity: '',
            entryDate: new Date(new Date().toDateString()),
            expiryDate:new Date(new Date().toDateString())
        
    



}
export default function MedicineForm(props) {

    const[values,setValues]=useState(initialFValues);
    const[temp,setTemp]=useState("");
    const[valuesForDrugCode,setValuesForDrugCode]=useState([])
    //const classes=useStyles();
    const{addOrEdit,recordForEdit}=props;


    const loadDrugCode = useCallback(() => {

        axios
         .get("http://localhost:8080/api/test/pharmacist/drug/Drugs",{headers:authHeader()})
         .then((result) => setValuesForDrugCode(result.data) 
            
         )
        
       }, []);
 
    //   useEffect(() => {
         
    //       showAert();
         
    //     }) 
        useEffect(() => {
            loadDrugCode();
            alert(valuesForDrugCode);
        
       }, [loadDrugCode])
  // const {

        //values,
        //setValues,
        //handleInputChange
         //}= useForm(initialFValues)
        //  const loadMedicine = useCallback(() => {
        //     axios
        //     .get("http://localhost:8080/stock/drugC/100")
        //     .then(result => setValues(result.data));
        //   }, []);

    const handleInputChange=(e)=>{
      
        const  {name,value}=e.target
        setValues({
            ...values,
            [name]:value
        })

        // if(e.target.value==100){
        //     loadMedicine();
        
        // }
    }

    // const handleInputChangeDrugCode=(e)=>{
    //     setValues({...drug.drugCode:e.target.value})
    // }
     
    const convertToDetEventPara=(name,value)=>({
        target:{
            name, 
            value
        }
    })
    const handleSubmit=(e)=>{
        e.preventDefault()    
        addOrEdit(values);
        handleReset();
        // alert(Error)

               

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
            <Grid item xs={6}>  <FormControl variant='outlined'>
                    <InputLabel>Drug Code </InputLabel>
                        <Select  
                        label='DrugCode'
                        name='DrugCode'
                        value={values.DrugCode}
                        onChange={handleInputChange}
                       >

                        {/* <MenuItem key='1' value='100'>100</MenuItem>  
                          <MenuItem key='1' value='Tablet'>Tablet</MenuItem>   */}
                     {
                     valuesForDrugCode.map(item=>
                        (
                           <MenuItem key='1' value={item}>{item}</MenuItem>  
                        //    <MenuItem key='1' value='Tablet'>Tablet</MenuItem>   
                        //    <MenuItem key='1' value='Capsule'>Caps ule</MenuItem> 
                        )
                      )
                        } 
                        </Select>
                   
                </FormControl>



            {/* <TextField style={{margin:5}}
                variant='outlined' 
                // label='Drug Code'
                // name='drugCode'
                // value={values.drugCode}
                onChange={handleInputChange}
                
            
                /> */}

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
                            
            {/* </Grid>
            <Grid item xs={6}>
                */}

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
 