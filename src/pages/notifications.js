import { useEffect, useState } from "react"; 
import CircularProgress from '@mui/material/CircularProgress'; 
import ErrorPage from "./error"; 
import 'firebase/compat/messaging'; 

import notif from  '../notif.png';
import gym from  '../gym.png';
import food from  '../food.png';


export default function NotificationPage(){
  const PUBLIC_URL = process.env.REACT_APP_URL;


    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    const [notifications,setNotification] = useState([]);  
    

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
            setNotification(result.notifications) 
        
        })
          .catch(error =>{
            /*alert("Session expired");
            
            localStorage.removeItem("token");
            window.location="/";*/
            


            // refresh NOTIFICATIONS

            



          }).finally(()=>{
            setIsLoading(false);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json"); 
            myHeaders.append("Authorization",  localStorage.getItem("token") ); 
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders, 
              redirect: 'follow'
            };
            
            fetch(PUBLIC_URL+"/api/v1/notifications-refresher", requestOptions)
              .then(response => response.json())
              .then(result => {  })

              
          })
 



    }


    useEffect(()=>{
        getUserData();
    },[])

 

    return(
        <div className="px-3">

     
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
                           <div className="app">

                           <ul className="list-group px-1" style={{listStyleType:'none'}}>
                           {
                                    notifications.sort( (b, a) => a.id - b.id ).map((n)=>{
                                        return  <li className="list-group-item">
                                        <div className="media d-flex">
                                            <div style={{ width: 70, marginRight: 15 }}>
                                            <   img src={ n.type == null ? notif :  ( n.type == 1 ? gym : food  ) }  alt="Icon" style={{width: '100%' }} />
                        
                                            </div>
                                            <div className="media-body">
                                                <h5   className="mt-0 mb-1" style={ { fontWeight: n.opened == false ? 'bold': 'normal' } } >{ n.title }</h5>
                                                <p style={ { fontWeight: n.opened == false ? 'bold': 'normal' } }>{ n.content }</p>
                                                <small className="text-muted" style={ { fontWeight: n.opened == false ? 'bold': 'normal' } }>{ n.createdAt }</small>
                                            </div>
                                        </div>
                                    </li>
                                    })
                                }   
                             </ul>
                                   
                            
                            </div>
                        </div>
                        :
                        <ErrorPage />
                        
                    }
                </div>
                

            }
        </div>
    );
}