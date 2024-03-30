import { useEffect, useState } from "react";
import SocialMediaBloc from "../components/socialMediaBloc";
import CircularProgress from '@mui/material/CircularProgress';
import SuspendedAccount from "../components/home/suspendedAccount";
import ConnectedUserCard from "../components/home/connectedUserCard";
import ErrorPage from "./error";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";




export default function DietPage(){
    const PUBLIC_URL = process.env.REACT_APP_URL;

    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    const [progress,setProgress] = useState([]);
    
    const [notifications,setNotification] = useState([]);
    const [reclamtions,setReclamtions] = useState([]);
    const [workout,setWorkout] = useState(null);
    const [diet,setDiet] = useState(null);
    const [payments,setPayments] = useState([]);
    
 
    
     
    

    const getUserData = function(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json"); 
        myHeaders.append("Authorization",  localStorage.getItem("token") ); 
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders, 
          redirect: 'follow'
        };
 
        fetch(PUBLIC_URL+"/api/v1/get-member-data", requestOptions)
          .then(response => response.json())
          .then(result => {
            setUser(result); 

            
            setDiet(result.diet);


        
        })
          .catch(error =>{
             
            
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
                                    <h1 className="mt-3"><Link to={ '/home' } className="text-secondary"><ArrowBack /></Link> Diet</h1>
                            

                                    <p className="text-muted">
                                        <strong>{ diet.name }</strong> <br /> 
                                        <span style={ {whiteSpace:"pre-line" } }>{diet.descreption}</span>
                                    </p>


                                    <div>
                                        {
 

                                        Object.values(diet.meals) .map((meal,index)=>{
                                                return(
                                                    <div style={ { borderBottom:'1px solid #d2d2d2' } } key={index}>
                                                        <h3>Meal N° : {index +1} </h3>
                                                        <p className="text-muted" style={ {whiteSpace:"pre-line"} }>{meal}</p>
                                                        
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>


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