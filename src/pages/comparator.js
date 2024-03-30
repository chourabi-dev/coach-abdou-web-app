import { useEffect, useState } from "react";
import SocialMediaBloc from "../components/socialMediaBloc";
import CircularProgress from '@mui/material/CircularProgress';
import SuspendedAccount from "../components/home/suspendedAccount";
import ConnectedUserCard from "../components/home/connectedUserCard";
import ErrorPage from "./error";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";




export default function ComparatorPage(){
    const PUBLIC_URL = process.env.REACT_APP_URL;

    


    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    const [progress,setProgress] = useState([]);
    const [firstWeekNumber,setFirstWeekNumber] = useState(null);
    const [secondWeekNumber,setSecondWeekNumber] = useState(null);

    

    
 
    
     
    

    const getUserData = function(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json"); 
        myHeaders.append("Authorization",  localStorage.getItem("token") ); 
         
        
        var raw = JSON.stringify({"token":localStorage.getItem("token")});
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders, 
          redirect: 'follow'
        };
        
        fetch(PUBLIC_URL+"/api/v1/get-member-data", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
 

            setUser(result)
            

            setProgress(result.progress)

        
        })
          .catch(error =>{
            /*alert("Session expired");
            
            localStorage.removeItem("token");
            window.location="/";*/
            
          }).finally(()=>{
            setIsLoading(false);
          })
    }


    useEffect(()=>{
        getUserData();
    },[])




    return(
        <div className="px-3">


            
            {
                isLoading === true ?
                <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh'}}>
                    <CircularProgress color="warning" />
                </div>

                :

                <div>
                    {
                        user != null ?
                        <div>
                            {
                                user.suspend_day != null ?  

                                <SuspendedAccount />
                                    
                                : 
                                
                                <div className="app">
                                    <h1 className="mt-3">Comparator</h1>
                                    <p className="text-muted">
                                        You can improve you training using our weekly update comparator.
                                    </p>








                                    <hr/>
                                    <div className="mt-3 row">
                                        <div className="col"> 
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Week N°</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={firstWeekNumber}
                                                    label="Age"
                                                    onChange={ (event)=>{ setFirstWeekNumber(event.target.value) } }
                                                > 
                                                    {
                                                        progress.map((p,index)=>{
                                                            return ( <MenuItem key={index} value={ p.week_number }>Week N° {p.week_number}</MenuItem> );
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>

                                        </div>
                                        <div className="col">
                                            <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Week N°</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={secondWeekNumber}
                                                        label="Age"
                                                        onChange={ (event)=>{ setSecondWeekNumber(event.target.value) } }
                                                    > 
                                                        {
                                                            progress.map((p,index)=>{
                                                                return ( <MenuItem key={index} value={ p.week_number }>Week N° {p.week_number}</MenuItem> );
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                        </div>
                                    </div>




                                    {
                                        firstWeekNumber !== null && secondWeekNumber !== null ? 
                                        <div className="row"> 
                                            <h3>Result</h3>
                                            {
                                                progress.map((p,index)=>{
                                                    if (p.week_number == firstWeekNumber) {
                                                        return ( 
                                                        
                                                        <div className="col-6" key={index}>
                                                            <h6>Feedback</h6>
                                                            <p className="text-muted">
                                                                {p.feedback}
                                                            </p>
                                                            <h6>Weight</h6>
                                                            <p className="text-muted">
                                                                {p.weight} <strong>Kg</strong>
                                                            </p>
                                                            <h6>Size</h6>
                                                            <p className="text-muted">
                                                                {p.waist_size} <strong>Cm</strong>
                                                            </p>
                                                            
                                                            <h6>Back</h6>
                                                            <img className="w-100 rounded mb-3" src={ p.back }  />
                                                            
                                                            <h6>Side</h6>
                                                            <img className="w-100 rounded mb-3" src={ p.side }  />
                                                            
                                                            <h6>Front</h6>
                                                            <img className="w-100 rounded mb-3" src={ p.front }  />
                                                            
                                                        </div> 
                                                        );
                                                    }
                                                })
                                            }





                                            {
                                                progress.map((p,index)=>{
                                                    if (p.week_number == secondWeekNumber) {
                                                        return ( 
                                                        
                                                        <div className="col-6" key={index}>
                                                            <h6>Feedback</h6>
                                                            <p className="text-muted">
                                                                {p.feedback}
                                                            </p>
                                                            <h6>Weight</h6>
                                                            <p className="text-muted">
                                                                {p.weight} <strong>Kg</strong>
                                                            </p>
                                                            <h6>Size</h6>
                                                            <p className="text-muted">
                                                                {p.waist_size} <strong>Cm</strong>
                                                            </p>
                                                            
                                                            <h6>Back</h6>
                                                            <img className="w-100 rounded mb-3" src={ p.back }  />
                                                            
                                                            <h6>Side</h6>
                                                            <img className="w-100 rounded mb-3" src={ p.side }  />
                                                            
                                                            <h6>Front</h6>
                                                            <img className="w-100 rounded mb-3" src={ p.front }  />
                                                            
                                                        </div> 
                                                        );
                                                    }
                                                })
                                            }
                                            




                                        </div>
                                        :
                                        null
                                    }



                                </div>
                                
                            } 
                        </div>
                        :
                        <ErrorPage />
                        
                    }
                </div>
                

            }
        </div>
    );
}