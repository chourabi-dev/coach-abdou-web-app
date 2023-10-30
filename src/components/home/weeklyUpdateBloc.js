import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function WeeklyUpdateBloc(props){

    const [goTo,setGo] = useState(false);

    return(
        <div onClick={()=>{setGo(true)}} className='mt-3' style={ { display:"flex", height:"130px", justifyContent:'center', alignItems:'center', border:'1px solid #dedede', borderRadius:'9px',backgroundImage:'url(/assets/progress.jpg)',backgroundSize:'cover', backgroundPosition:'center' } }  >
            

            {
                goTo === true ? <Navigate to="/profile/progress/add" replace={true} /> : null
            }
            
            <h1 className='text-white'>CHECK IN</h1>
        </div>
    );
}