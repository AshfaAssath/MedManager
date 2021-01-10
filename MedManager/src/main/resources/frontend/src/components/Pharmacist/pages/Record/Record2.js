<Grid item xs={3}>

<Paper style={{marginTop: '40px', width: '240px',marginLeft: 10}}>

       <ThemeProvider theme={theme}>
           {/*<form onSubmit={e =>{*/}
           {/*    e.preventDefault();*/}
           {/*    submit(e);*/}
           {/*}}>*/}
           <form style={{padding:'20px', alignItems: 'center'}} >
               <label style={{fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Filter Segment</label>
               <br/><br/>
               <Grid container direction='column' justify='flex-start' alignItems='stretch'>
                         <Grid item > 
                                    <div  style={{margin:10,width:'100%'}}>
                                        <FormControl variant='outlined' style={{width:'80%'}} size='small'>
                                                <InputLabel>Types Of Reports</InputLabel>
                                                    <Select  
                                                    label='Types Of Reports'
                                                    name='Types Of Reports'
                                                                                        
                                                // value={values.category}
                                                onChange={handleInputChange}
                                                    >
                                                    <MenuItem key='1' value='None'>None</MenuItem>  
                                                    <MenuItem key='1' value='Daily Report'>Daily Report</MenuItem>   
                                                    <MenuItem key='1' value='Order drug list'>Drug Order list</MenuItem> 
                                                    </Select>
                                            
                                            </FormControl>
                                     </div>
                             </Grid> 
                            

                             <Grid item>
                            <div  >
                                 <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                        <KeyboardDatePicker
                                            disableToolbar variant='inline'
                                            inputVariant='outlined'
                                            label='Date'
                                            formate='MMM/dd/yyyy'
                                            name='date'
                                            size='small'
                                            style={{margin:10}}
                                        value={values.date}
                                        onChange={date=>handleInputChangeDate(convertToDetEventPara('date',date))}
                                                    
                                        />
                                </MuiPickersUtilsProvider>
                            </div>
                        </Grid> 

                  
                             <Grid item> 
                                    <Button
                                        //style={{margin:10,right:5,position: 'absolute', top: 140,
                                        //right: 130}}
                                        //type='submit'
                                        style={{margin:10}}
                                        variant='outlined'
                                        size='large'
                                        color='primary'
                                    // onClick={()=>setOpenPopup(true )}
                                    onClick={generatReport}
                                    //display:'flex',
                                        
                                    >
                                        Generate Report
                                    </Button>
                            </Grid>                                 
                     </Grid>
           </form>
       </ThemeProvider>
   </Paper>
</Grid>