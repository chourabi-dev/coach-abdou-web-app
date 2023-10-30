import { useEffect, useState } from "react";
import SocialMediaBloc from "../components/socialMediaBloc";
import CircularProgress from '@mui/material/CircularProgress';
import SuspendedAccount from "../components/home/suspendedAccount";
import ConnectedUserCard from "../components/home/connectedUserCard";
import ErrorPage from "./error";
import { Link, useLocation } from 'react-router-dom';
import { ArrowBack, Movie, MovieTwoTone, PlayArrow, YouTube } from "@mui/icons-material";




export default function ExercicesList(props){
    const PUBLIC_URL = process.env.REACT_APP_URL;

    
    const location = useLocation(); 

    console.log(location.state);
    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    const [exercices,setExercices] = useState( location.state.exercices );
    
    
  
    

    const getUserData = function(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("gympro-token", "yytgsfrahjuiplns2sutags4poshn1");
        
        var raw = JSON.stringify({"token":localStorage.getItem("token")});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(PUBLIC_URL+"/API/mobile/getUserData/index.php", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
 

            setUser(result.data)
            



        
        })
          .catch(error =>{
            alert("Session expired");
            
            localStorage.removeItem("token");
            window.location="/";
            
          }).finally(()=>{
            setIsLoading(false);
          })
    }


    useEffect(()=>{
        getUserData();
        setExercices(location.state.exercices)
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
                                    <h1 className="mt-3"><Link to={ '/app/workout' } className="text-secondary"><ArrowBack /></Link> { location.state.day }</h1>
                                    <p className="text-muted">
                                        List of exercices.
                                    </p>




                                    <div className="list-of-exercices">
                                        {
                                            exercices.map((data,index)=>{
                                                return   <div className="exercice-card mb-3" key={index} style={{} }>

                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex">
                                                            
                                                            <div className="strong" style={{ textTransform:"capitalize" }}>
                                                                <strong>{
                                                                    data.exercice.title_exercice
                                                                }</strong>
                                                                {
                                                                    data.superSet != null ?  <div> { data.superSet == true ? <div className="seper-set-badge"><small>super set</small></div>: null } </div>    :   null
                                                                }
                                                                
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-danger">
                                                                <small>{ data.exercice.sets } set(s) {data.exercice.reps} Reps(s) {data.exercice.pause} Rest(s) </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="text-muted"  style={{ textTransform:"capitalize" }}>
                                                        <strong>{ data.exercice.body_section }</strong>
                                                    </p>
                                                    
                                                    <p className="text-muted" style={ {whiteSpace:"pre-line"} } >
                                                        { data.exercice.instruction_exercice }
                                                    </p>
                                                    {
                                                        data.exercice.url  != null ? 
                                                        <p>
                                                            <a href={ data.exercice.url } target="_blank" className="text-primary" style={{textDecoration:'none'}}> Watch online video <YouTube color="secondary" /></a>
                                                        </p>
                                                        :
                                                        null
                                                        
                                                    }
                                                    <hr/>
                                                </div>
                                                
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