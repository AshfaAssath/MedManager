import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React from 'react'
import Button from '../controls/button';

function PopUp(props) {

const{title,children,openPopup,setOpenPopup} =props;

    return (
        <Dialog open={openPopup} maxWidth="md">
          
            <DialogTitle>
                <div style={{display:'flex',flexGrow:1}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {title}
                    
                    </Typography>

                    <Button
                    color="secondary"
                    text="X"
                    onClick={()=>setOpenPopup(false)}
                    >

                    </Button>
                </div>
            </DialogTitle>
           
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default PopUp
