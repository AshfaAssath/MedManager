import React from 'react'
import { FormControl, FormHelperText, InputLabel,MenuItem,Select as MuiSelect } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';

function Select(props) {

const { name, label, value, error=null , onChange , options } = props;

    return (
        <FormControl variant="outlined"
        { ...(error && {error:true} )}
        >
            
            <InputLabel>{label}</InputLabel>
            <MuiSelect
            multiple
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(item=>(<MenuItem key={item.id} name={item.drugName} value={item.id}>{item.drugName}</MenuItem>))

                //    options.map(item=>( <FormControlLabel
                //     control={<Checkbox checked={item.name} value={item.id} name={item.drugName} />}
                //     label={item.drugName} 
        //   />) 
        //   )
                }


            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        
    )
}

export default Select
