import { useEffect, useState } from "react";
import SocialMediaBloc from "../components/socialMediaBloc";
import CircularProgress from '@mui/material/CircularProgress';
import SuspendedAccount from "../components/home/suspendedAccount";
import ConnectedUserCard from "../components/home/connectedUserCard";
import ErrorPage from "./error";
import DietBloc from "../components/home/dietBloc";
import WorkoutBloc from "../components/home/workoutBloc";
import NothingToShowBloc from "../components/home/NothingToShowBloc";
import WeeklyUpdateBloc from "../components/home/weeklyUpdateBloc";
import firebase from 'firebase/compat/app';

import 'firebase/compat/messaging';
import { Navigate } from "react-router-dom";
import { Alert } from "@mui/material";


export default function HomePage(){
  const PUBLIC_URL = process.env.REACT_APP_URL;


    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    const [notifications,setNotification] = useState([]);
    const [reclamtions,setReclamtions] = useState([]);
    const [workout,setWorkout] = useState(null);
    const [diet,setDiet] = useState(null);
    const [payments,setPayments] = useState([]);
    
     
    const [newAccountCreated,setFirstWeekdUpdate] = useState( localStorage.getItem("new-account-created") );
    


    
    const [subscriptionEnd,setSubscriptionEnd] = useState(false);
     

    
 
                
    

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
            console.log(result); 
            setUser(result) 

            
            setWorkout(result.workout);
            setDiet(result.diet);
        
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




    useEffect(() => {
        console.log("firebase");
        // Initialize Firebase
        firebase.initializeApp({
            apiKey: "AIzaSyDVX-ZfxhaaMB7uYJZdLW2NrRk63xBEQic",
            authDomain: "coachabdou-818ad.firebaseapp.com",
            databaseURL: "https://coachabdou-818ad.firebaseio.com",
            projectId: "coachabdou-818ad",
            storageBucket: "coachabdou-818ad.appspot.com",
            messagingSenderId: "671727476299",
            appId: "1:671727476299:web:d85eae5faa1adeeab2b7ce",
            measurementId: "G-0M7CC8KF88"
        });
    
        let messaging  = null;

        try {
            messaging = firebase.messaging();
        } catch (error) {
            console.log("cannot init firebase messaging");
        }
    
        if (messaging != null) {

            messaging.getToken().then((currentToken) => {
                if (currentToken) {
                  console.log('Token:', currentToken);
                  // Send the token to your server for storing and targeting notifications
      
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json"); 
                  myHeaders.append("Authorization",  localStorage.getItem("token") ); 
                  
                  var raw = JSON.stringify({ "fcm":currentToken });
          
                  var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                  };
          
                  fetch(PUBLIC_URL+"/api/v1/update-account-fcm", requestOptions)
                  .then(response => response.json())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));
                  
      
                } else {
                  console.log('No registration token available.');
                }
              }).catch((err) => {
                console.log('An error occurred while retrieving the token.', err);
              });
              
        }
    
        
          // Listen for incoming notifications while the app is in the foreground
        if (messaging != null) {
            messaging.onMessage((payload) => {
                console.log('Received foreground message: ', payload);
    
            }); 
        }


         
          
      }, []);




    return(
        <div className="px-3">

            {
              newAccountCreated == "1" ?
              <Navigate to={ '/profile/progress/add' } />
              : null
            }


            {
                isLoading === true ?
                <div className="d-flex justify-content-center align-items-center" style={{minHeight:'calc( 100vh )'}}>
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
                                    <SocialMediaBloc />

                                      <ConnectedUserCard data={user} stopAppFn={ setSubscriptionEnd } />

                                    
                                      {
                                        subscriptionEnd == true ? 
                                        <div className="mt-5 mb-5">
                                          <Alert severity="error">
                                              Your subscription has been expired, please contact your coach for more informations.
                                          </Alert>
                                        </div>
                                        :
                                        <div>
                                          { diet != null ? <DietBloc  /> : null }
                                          {  workout != null ? <WorkoutBloc />  : null }
                                          <WeeklyUpdateBloc />
                                        </div>
                                      }
                                      
                                      
                                      
                                    
                                     
                                    {( diet == null && workout == null )? <NothingToShowBloc /> : null }

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