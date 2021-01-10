import React from 'react'
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';

export default function M() {
    return (
        <div>


        <BrowserRouter>
      
        <Switch>
             <Route path='/MedicineForm' component={MedicineForm} />
             
 
         </Switch>

        </BrowserRouter> 
            
        </div>
    )
}
