import food from '../../assets/food.jpg';
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


export default function DietBloc(props){

    

    const [goTo,setGoTo]  = useState(false);
    


    return(
        <div onClick={()=>{ setGoTo(true) }} className='mt-3' style={ { display:"flex", height:"130px", justifyContent:'center', alignItems:'center', border:'1px solid #dedede', borderRadius:'9px',backgroundImage:'url(/assets/food.jpg)',backgroundSize:'cover', backgroundPosition:'center' } }  >


            {
                goTo === true ? <Navigate to="/app/diet" replace={true} /> : null
            }


            <h1 className='text-white'>DIET PLAN</h1>
        </div>
    );
}