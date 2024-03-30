import { useEffect, useState } from "react";
import SocialMediaBloc from "../components/socialMediaBloc";
import CircularProgress from '@mui/material/CircularProgress';
import SuspendedAccount from "../components/home/suspendedAccount";
import ConnectedUserCard from "../components/home/connectedUserCard";
import ErrorPage from "./error";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2'; 
import { Link } from "react-router-dom";



  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Progress chart',
      },
    },
  };
  

 
  


export default function ProgressPage(){
  const PUBLIC_URL = process.env.REACT_APP_URL;

    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    const [progress,setProgress] = useState([]);
    const [labels,setLabels] = useState([]);
    const [showChartOne,setShowChartOne] = useState(false);
    
    
    
    

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

            setUser(result);
            setProgress(result.progress);

        
        })
          .catch(error =>{
             /*alert("Session expired");
            
            localStorage.removeItem("token");
            window.location="/";*/
              

            console.log(error);
            
          }).finally(()=>{
            setIsLoading(false);
          })
    }


    useEffect(()=>{
        getUserData();
    },[])


 
 



    let tmpWeeksLabels = [];
    let tmpWeightsData = [];
    let tmpWaistSizesData = [];
    
    
    progress.map((p)=>{
        tmpWeeksLabels.push(`Week ${p.week_number}`)

        tmpWeightsData.push(p.weight)

        tmpWaistSizesData.push(p.waist_size) 
    })
    

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
                                    
                                    <div className="d-flex justify-content-between mt-3">
                                        <div>
                                            <h1 >Progress</h1>
                                        </div>
                                        <div style={{marginTop:32}}>
                                        

                                        <Link to={ '/profile/progress/add' }>
                                            <Button size="small"   className='w-100' variant="outlined" style={{borderRadius:'30px'}}><AddIcon /> Create </Button>
                                        </Link>
                                                


                                        </div>
                                    </div>
                                    <p className="text-muted">
                                        You can always track your fitness progress here.
                                    </p>

                                    
                                        <div> 
                                        <p className="text-muted">
                                        The chart down below will give you a visual information about your waist size evolutions every time you add a new progress
                                        </p>

                                                <Line options={options} data={ {
                                                    labels: tmpWeeksLabels,
                                                    datasets: [
                                                        {
                                                        label: 'Waist size / week',
                                                        data:  tmpWaistSizesData,
                                                        borderColor: '#039be5',
                                                        backgroundColor: '#71d1ff',
                                                        },
                                                        
                                                    ],
                                                } } />  
                                        </div>


                                        <div>

                                        <p className="text-muted">
                                        The chart down below will give you a visual information about your weight evolutions every time you add a new progress
                                        </p>

                                                <Line options={options} data={ {
                                                    labels: tmpWeeksLabels,
                                                    datasets: [
                                                        {
                                                        label: 'Weight / week',
                                                        data:  tmpWeightsData,
                                                        borderColor: '#ffc107',
                                                        backgroundColor: '#FFC107',
                                                        },
                                                        
                                                    ],
                                                } } />  
                                                                                                
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