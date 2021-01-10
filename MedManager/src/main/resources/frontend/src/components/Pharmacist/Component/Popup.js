import React from 'react'
import{Dialog,DialogTitle,DialogContent,Typography,Button} from '@material-ui/core'

export default function Popup(props) {

    const {title,children,openPopup,setOpenPopup}=props;

    return (
       <Dialog open={openPopup} maxWidth='md'>
           <DialogTitle>
               <div style={{display:'flex'}}>
                <Typography variant='h6' component='div'  style={{flexGrow:1}}>
                    {title}
                </Typography>
                <Button
                        style={{margin:10,right:5}}
                        //type='submit'
                        variant='contained'
                        //size='large'
                        color='secondary'
                       onClick={()=>setOpenPopup(false)}
                        
                      >
                          X
                    </Button>

                
                </div>
           </DialogTitle>
          
           <DialogContent dividers>
           {children}

           </DialogContent>
       </Dialog>
    )
}
