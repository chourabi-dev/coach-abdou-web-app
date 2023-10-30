import { useEffect, useState } from "react";
import SocialMediaBloc from "../components/socialMediaBloc";
import CircularProgress from '@mui/material/CircularProgress';
import SuspendedAccount from "../components/home/suspendedAccount";
import ConnectedUserCard from "../components/home/connectedUserCard";
import ErrorPage from "./error";
import { Link, Navigate, json } from "react-router-dom";
import { ArrowBack, ArrowRight, ArrowRightAlt, ArrowRightAltOutlined, ArrowRightRounded, ArrowRightSharp, ArrowRightTwoTone, BoyRounded, Delete, FitnessCenter, FolderSpecialOutlined, Interests, LockClock, MarkAsUnread, MonitorHeart } from "@mui/icons-material";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";




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
            setUser(result.data);


            const workoutDetails = JSON.parse(result.workout.json_workout);

             
            console.log(workoutDetails);

            setWorkoutDetials(workoutDetails)

        
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
    },[])




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
 
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong className="text-muted">Goal :</strong> 
                                                </td>
                                                <td> 
                                                    <p className="text-muted mb-0">{ workoutDetails.goal }</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong className="text-muted">Body section :</strong> 
                                                </td>
                                                <td> 
                                                    <p className="text-muted mb-0">{ workoutDetails.bodysection }</p>
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
                                                workoutDetails.program.monday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        
                                                        setDay("Monday");
                                                        setExercices(workoutDetails.program.monday.exercices); 
                                                        setNavigateToList(true);


                                                        
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                    workoutDetails.program.monday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                    workoutDetails.program.monday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Monday"
                                            secondary={  workoutDetails.program.monday != null ? workoutDetails.program.monday.split  : 'Rest day' }
                                            />
                                        </ListItem>









                                        <ListItem  secondaryAction={ 
                                                workoutDetails.program.tusday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Tuesday");
                                                        setExercices(workoutDetails.program.tusday.exercices); 
                                                        setNavigateToList(true);

                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                    workoutDetails.program.tusday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                    workoutDetails.program.tusday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Tuesday"
                                            secondary={  workoutDetails.program.tusday != null ? workoutDetails.program.tusday.split  : 'Rest day' }
                                            />
                                        </ListItem>

                                        













                                        <ListItem  secondaryAction={ 
                                                workoutDetails.program.wensday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Wednesday");
                                                        setExercices(workoutDetails.program.wensday.exercices); 
                                                        setNavigateToList(true);

                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                    workoutDetails.program.wensday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                    workoutDetails.program.wensday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Wednesday"
                                            secondary={  workoutDetails.program.wensday != null ? workoutDetails.program.wensday.split  : 'Rest day' }
                                            />
                                        </ListItem>


                                        






                                        <ListItem  secondaryAction={ 
                                                workoutDetails.program.thursday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Thursday");
                                                        setExercices(workoutDetails.program.thursday.exercices); 
                                                        setNavigateToList(true);
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                    workoutDetails.program.thursday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                    workoutDetails.program.thursday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Thursday"
                                            secondary={  workoutDetails.program.thursday != null ? workoutDetails.program.thursday.split  : 'Rest day' }
                                            />
                                        </ListItem>
                                        







                                        <ListItem  secondaryAction={ 
                                                workoutDetails.program.friday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Friday");
                                                        setExercices(workoutDetails.program.friday.exercices); 
                                                        setNavigateToList(true);
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                    workoutDetails.program.friday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                    workoutDetails.program.friday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Friday"
                                            secondary={  workoutDetails.program.friday != null ? workoutDetails.program.friday.split  : 'Rest day' }
                                            />
                                        </ListItem>

                                        









                                        <ListItem  secondaryAction={ 
                                                workoutDetails.program.saturday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Saturday");
                                                        setExercices(workoutDetails.program.saturday.exercices); 
                                                        setNavigateToList(true);
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                    workoutDetails.program.saturday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                    workoutDetails.program.saturday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Saturday"
                                            secondary={  workoutDetails.program.saturday != null ? workoutDetails.program.saturday.split  : 'Rest day' }
                                            />
                                        </ListItem>

                                        







                                        <ListItem  secondaryAction={ 
                                                workoutDetails.program.sanday != null ?
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        setDay("Sunday");
                                                        setExercices(workoutDetails.program.sanday.exercices); 
                                                        setNavigateToList(true);
                                                    }}>
                                             
                                                    <ArrowRight sx={{fontSize:35}} color="primary" />
                                                    </IconButton> : null  
                                           
                                            }  > 
                                            <ListItemAvatar>
                                                {
                                                    workoutDetails.program.sanday == null ?
                                                    <Interests  color="success" />
                                                    :

                                                    workoutDetails.program.sanday.split == 'cardio' ?
                                                    <MonitorHeart  color="error" />:<FitnessCenter color="primary" />

                                                 
                                                }
                                            
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary="Sunday"
                                            secondary={  workoutDetails.program.sanday != null ? workoutDetails.program.sanday.split  : 'Rest day' }
                                            />
                                        </ListItem>
                                        


                                         



                                        


                                        

                                        
                                    </List>
                                    
 
                                    
                                     
                                    
                                    

                                    

                                     


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