import { useEffect, useState } from "react";
import SocialMediaBloc from "../components/socialMediaBloc";
import CircularProgress from '@mui/material/CircularProgress';
import SuspendedAccount from "../components/home/suspendedAccount";
import ConnectedUserCard from "../components/home/connectedUserCard";
import ErrorPage from "./error";
import { Link, Navigate, json } from "react-router-dom";
import { ArrowBack, ArrowRight, ArrowRightAlt, ArrowRightAltOutlined, ArrowRightRounded, ArrowRightSharp, ArrowRightTwoTone, BoyRounded, Delete, FitnessCenter, FolderSpecialOutlined, Interests, LockClock, MarkAsUnread, MonitorHeart } from "@mui/icons-material";
import { Alert, Avatar,Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";




export default function WorkoutPage(){
    const PUBLIC_URL = process.env.REACT_APP_URL;

    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    const [progress,setProgress] = useState([]);
    
    const [notifications,setNotification] = useState([]);
    const [reclamtions,setReclamtions] = useState([]);
    const [workout,setWorkout] = useState(null);
    const [workoutDetails,setWorkoutDetials] = useState(null);
    
    const [diet,setDiet] = useState(null);
    const [payments,setPayments] = useState([]);
    

    const [exercices,setExercices] = useState([]);
    const [day,setDay] = useState("");
    const [navigateToList,setNavigateToList] = useState(false);

    const [loading,setLoading] = useState(false);
    const [feedback,setFeedBack] = useState("");
    const [successMessage,setSuccessMessage] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    
    
    
    
 
    
     
    

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
            setFeedBack(result.workout_feedback);

            console.log(result.workout);
 
            setWorkoutDetials(result.workout)

        
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



 

    const saveFeedBack = function(){
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json"); 
        myHeaders.append("Authorization",  localStorage.getItem("token") ); 
        
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({ feedback: feedback }),
          redirect: 'follow'
        };
        
        fetch(PUBLIC_URL+"/api/v1/update-workout-feedback", requestOptions)
          .then(response => response.json())
          .then(result =>{
            if (result.success === true) {
                
                setSuccessMessage(result.message); 
                
            } else {
                setErrorMessage(result.message);
            }
          } )
          .catch(error => {
            setErrorMessage("Something went wrong, please try again.")
          }).finally(()=>{
                setLoading(false);
          });
    }


    return(
        <div className="px-3">

            
            {
                navigateToList === true ? <Navigate to="/app/workout/exercices-list" replace={false}  state={ { day:day, exercices:exercices } } /> : null
            }

            
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
                                    <h1 className="mt-3"><Link to={ '/home' } className="text-secondary"><ArrowBack /></Link> Workout</h1>
                            
                                    <h3 style={{textTransform:'capitalize'}} >{ workoutDetails.title }</h3>
                                    <p className="text-muted">
                                        { workoutDetails.goal }
                                    </p>
 
                                    <table className="w-100">
                                        <tbody>
                                             
                                            <tr>
                                                <td>
                                                    <strong className="text-muted">Body section :</strong> 
                                                </td>
                                                <td> 
                                                    <p className="text-muted mb-0">{ workoutDetails.body_section }</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong className="text-muted ">Duration :</strong> 
                                                </td>
                                                <td> 
                                                    <p className="text-muted mb-0">{ workoutDetails.duration } week(s)</p>
                                                </td>
                                            </tr>
                                        </tbody> 
                                    </table> 
                                    <hr />




                                    
                                    <List dense={false}  >
                                         
                                        <ListItem  secondaryAction={ 
                                               workoutDetails.monday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        
                                                        setDay("Monday");
                                                        setExercices(workoutDetails.monday); 
                                                        setNavigateToList(true);


                                                        
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                   workoutDetails.monday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                   workoutDetails.monday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Monday"
                                            secondary={ workoutDetails.monday != null ?workoutDetails.monday.split  : 'Rest day' }
                                            />
                                        </ListItem>









                                        <ListItem  secondaryAction={ 
                                               workoutDetails.tuesday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Tuesday");
                                                        setExercices(workoutDetails.tuesday); 
                                                        setNavigateToList(true);

                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                   workoutDetails.tuesday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                   workoutDetails.tuesday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Tuesday"
                                            secondary={ workoutDetails.tuesday != null ?workoutDetails.tuesday.split  : 'Rest day' }
                                            />
                                        </ListItem>

                                        













                                        <ListItem  secondaryAction={ 
                                               workoutDetails.wednesday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Wednesday");
                                                        setExercices(workoutDetails.wednesday); 
                                                        setNavigateToList(true);

                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                   workoutDetails.wednesday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                   workoutDetails.wednesday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Wednesday"
                                            secondary={ workoutDetails.wednesday != null ?workoutDetails.wednesday.split  : 'Rest day' }
                                            />
                                        </ListItem>


                                        






                                        <ListItem  secondaryAction={ 
                                               workoutDetails.thursday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("thursday");
                                                        setExercices(workoutDetails.thursday); 
                                                        setNavigateToList(true);
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                   workoutDetails.thursday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                   workoutDetails.thursday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="thursday"
                                            secondary={ workoutDetails.thursday != null ?workoutDetails.thursday.split  : 'Rest day' }
                                            />
                                        </ListItem>
                                        







                                        <ListItem  secondaryAction={ 
                                               workoutDetails.friday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Friday");
                                                        setExercices(workoutDetails.friday); 
                                                        setNavigateToList(true);
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                   workoutDetails.friday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                   workoutDetails.friday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Friday"
                                            secondary={ workoutDetails.friday != null ?workoutDetails.friday.split  : 'Rest day' }
                                            />
                                        </ListItem>

                                        









                                        <ListItem  secondaryAction={ 
                                               workoutDetails.saturday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Saturday");
                                                        setExercices(workoutDetails.saturday); 
                                                        setNavigateToList(true);
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                   workoutDetails.saturday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                   workoutDetails.saturday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Saturday"
                                            secondary={ workoutDetails.saturday != null ?workoutDetails.saturday.split  : 'Rest day' }
                                            />
                                        </ListItem>

                                        







                                        <ListItem  secondaryAction={ 
                                               workoutDetails.sunday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Sunday");
                                                        setExercices(workoutDetails.sunday); 
                                                        setNavigateToList(true);
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                   workoutDetails.sunday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                   workoutDetails.sunday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Sunday"
                                            secondary={ workoutDetails.sunday != null ?workoutDetails.sunday.split  : 'Rest day' }
                                            />
                                        </ListItem>
                                        


                                         



                                        


                                        

                                        
                                    </List>


 

                                    
                                <div className="row mb-3">
                                    <div className="col">
                                        <TextField variant="outlined"  multiline={true} rows={5} className="w-100" label="Feedback" value={feedback}  onChange={(e)=>{setFeedBack(e.target.value)}} />
                                    </div>
                                </div>
                                


                                  
                                <div className="mb-3">
                                {
                                        loading === false ?
                                        <div className="mb-3">
                                            <Button type='submit' onClick={()=>{
                                                saveFeedBack();
                                            }} disabled={ false } variant="contained" className='w-100' style={{borderRadius:'30px'}} >Save feedback</Button>
                                        </div>
                                        :
                                        <div className="mb-3 text-center">
                                            <p className="text-muted">Please wait, this may take a minute.</p>
                                            <CircularProgress />
                                        </div>

                                }


                                {
                                    errorMessage !== '' ? <Alert severity="error">{errorMessage}</Alert> : null
                                }
                                {
                                    successMessage !== '' ? <Alert severity="success">{successMessage}</Alert> : null
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