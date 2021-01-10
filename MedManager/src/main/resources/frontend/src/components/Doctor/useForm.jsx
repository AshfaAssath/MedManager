import React ,{ useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';


export function UseForm(initialFormValues,validateOnChange=false, validate) {

  
    const[values,setValues]=useState(initialFormValues);
    const[errors,setErrors]=useState({}) ;
    const [drugs,setDrugs] =useState([]);
    const[presNo,setPresNo]=useState(0);
    // const[issuDruList,setIssuDruList]=useState([]);

    const handleInputChange= e =>{
        const{name,value}=e.target
        setValues({
            ...values,
            [name]:value
        })

        if(validateOnChange)
            validate({  [name] : value  })

    }

    
const resetForm =() =>{
    setValues({...initialFormValues,
        issuDruList:[]});
    setErrors({});
}

    return {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm,
        drugs,
        setDrugs,
        presNo,
        setPresNo
        
    }
}

const useStyles = makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin:theme.spacing(1)
        }
    }

}))

export function Form(props) {

    const classes=useStyles();
    const {children, ...other}=props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>  
            {props.children}
        </form>
    )
}



