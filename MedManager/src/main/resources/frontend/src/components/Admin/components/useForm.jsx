import React, { useState } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export  function useForm(initialFieldValues) {

    const [values, setValues] = useState(initialFieldValues);

    const handleInputChange = (e) => {
        const {name, value } = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    return (
        values,
        setValues,
        handleInputChange
    )
}


const theme = createMuiTheme({
    overrides: {
      MuiFormControl: {
        root: {
          width: '80%',
        //   spacing: 1,
          marginBottom: '25px',
        },
      },
    },
  });

export function Form(props) {

    const {children, ...other} = props;

    return (
        <ThemeProvider theme={theme}>
            <form autoComplete='off' {...other}>
                {props.children}
            </form>
        </ThemeProvider>
    )
}

