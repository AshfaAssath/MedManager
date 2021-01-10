//import { AppBar } from '@material-ui/core'
import React from 'react'
import {AppBar ,makeStyles,Grid,InputBase,IconButton,Toolbar,Badge} from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
const useStyles=makeStyles({
    root:{
        backgroundColor:'#fff'
    },

    searchInput: {
        opacity:'0.6',
        padding:'0px 8px',
        fontSize:'0.8rem',
        '&:hover':{
            backgroundColor:'#f2f2f2'
        }
    }
})
export default function Header() {

    const classes=useStyles();
    return (
        <div>

        <AppBar position='static' className={classes.root}>
            <Toolbar>
                <Grid container >
                    <Grid item ><InputBase placeholder='Searh' className={classes.searchInput} startAdornment={<SearchIcon fontSize='small'/>}/></Grid>
                    <Grid item  sm={true}></Grid>
                    <Grid item >
                    <IconButton>
                       <Badge badgeContent={4} color='secondary'>
                           <NotificationsNoneIcon fontSize='small'/>
                        </Badge> 
                    </IconButton>
                            
                    <IconButton>
                    <PowerSettingsNewIcon fontSize='small'/>
                    </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
            
        </div>
    )
}
