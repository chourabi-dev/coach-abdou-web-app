import { useEffect, useState } from "react"; 
import CircularProgress from '@mui/material/CircularProgress'; 
import ErrorPage from "./error"; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";


import frontIMG from '../assets/front.png';
import sideIMG from '../assets/side.png';
import backIMG from '../assets/back.png';


export default function CreateProgressPage(){
    const PUBLIC_URL = process.env.REACT_APP_URL;


    
    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    
    const [weight,setWeight] = useState("");
    const [size,setSize] = useState("");
    const [feedback,setFeedBack] = useState("");
    
    const [front,setFrontFile] = useState(frontIMG);
    const [back,setBackFile] = useState(backIMG);
    const [side,setsideFile] = useState(sideIMG);
    

    const [frontFile,setFrontUploadFile] = useState(null);
    const [backFile,setBackUploadFile] = useState(null);
    const [sideFile,setSideUploadFile] = useState(null);
    

    
    const [loading,setLoading] = useState(false);
    
    const [successMessage,setSuccessMessage] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    
    
    
    
     
    

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
           /* alert("Session expired");
            
            localStorage.removeItem("token");
            window.location="/";*/
            
          }).finally(()=>{
            setIsLoading(false);
          })
    }


    useEffect(()=>{
        getUserData();
    },[])


    const handleFrontImageChange = async (event)  => {
       
        const reader = new FileReader();
        const file = event.target.files[0];
    
        reader.onload = () => {
          setFrontFile(reader.result);
        };
    
        reader.readAsDataURL(file);

        console.log(file);

        setFrontUploadFile(file);

        
       
    };
    

    const handleSideImageChange = async (event)  => {
       
        const reader = new FileReader();
        const file = event.target.files[0];
    
        reader.onload = () => {
          setsideFile(reader.result);
        };
    
        reader.readAsDataURL(file);

        console.log(file);
        setSideUploadFile(file);
    };

    const handleBackImageChange = async (event)  => {
       
        const reader = new FileReader();
        const file = event.target.files[0];
    
        reader.onload = () => {
          setBackFile(reader.result);
        };
    
        reader.readAsDataURL(file);

        console.log(file);
        setBackUploadFile(file);
    };
    

    const startUploading = function(){
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("gympro-token", "yytgsfrahjuiplns2sutags4poshn1");
        
        var formdata = new FormData();
        formdata.append("front", frontFile, frontFile.name);
        formdata.append("back", backFile, backFile.name);
        formdata.append("side", sideFile, sideFile.name);
        
        formdata.append("token", localStorage.getItem("token"));


        formdata.append("weight", weight);
        formdata.append("size", size);
        formdata.append("feedback", feedback);
        
        
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch(PUBLIC_URL+"/API/mobile/upload-progress/index.php", requestOptions)
          .then(response => response.json())
          .then(result =>{
            if (result.success === true) {
                localStorage.setItem('new-account-created',"2");
                
                setSuccessMessage(result.message);
                setWeight("");
                setSize("");
                setFeedBack("");
                
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

    


    const formSubmit = function(){ 
        setErrorMessage("");
        
        

        if (frontFile != null) {
            if (sideFile != null) {
                if (backFile != null) {
                    
                    if (size != '') {
                        if (size != '') {
                            startUploading();
                        }else{
                            setErrorMessage("Please provide your Size informations.");
                        
                        }
                    } else {
                        setErrorMessage("Please provide your weight informations.");

                    }

                } else {
                    setErrorMessage("Please add a back photo.")
                }
            }else{
                setErrorMessage("Please add a side photo.");
            }
        }else{
            setErrorMessage("Please add a front photo.");
        }
    }



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
                            <h1 className="mt-3"><Link to={ '/home' } className="text-secondary"><ArrowBack /></Link> Add progress</h1>
                            
                            <p className="text-muted">
                                By filling the form down below you are helping you coach tracking your fitness advancement.
                            </p>

                            



                            <form className="edit-form" onSubmit={ (event)=>{
                                event.preventDefault();
                                formSubmit();
                            } }>


                                <div className="row mb-3">
                                    <div className="col">
                                        <img  src={front} className="w-75 d-block m-auto" onClick={()=>{
                                            document.getElementById("front_photo").click();
                                        }} />
                                        <p className="text-center text-muted">Front photo</p>
                                        <input type="file"
                                                id="front_photo"
                                                accept="image/*"
                                                style={{ display: 'none' }} onChange={handleFrontImageChange} />
                        
                            
                                    </div>
                                    <div className="col">
                                        <img  src={side} className="w-75 d-block m-auto"  onClick={()=>{
                                            document.getElementById("side_photo").click();
                                        }} />
                                        <p className="text-center text-muted">Side photo</p>
                                        <input type="file"
                                                id="side_photo"
                                                accept="image/*"
                                                style={{ display: 'none' }}  onChange={handleSideImageChange}  />
                                    </div>
                                    <div className="col">
                                        <img  src={back} className="w-75 d-block m-auto" onClick={()=>{
                                            document.getElementById("back_photo").click();
                                        }} />
                                        <p className="text-center text-muted">Back photo</p>
                                        <input type="file"
                                                id="back_photo"
                                                accept="image/*"
                                                style={{ display: 'none' }}  onChange={handleBackImageChange}  />
                                    </div>
                                    
                                </div>


                                <div className="row mb-3">
                                    <div className="col">
                                        <TextField variant="outlined" type="number" label="Weight" value={weight} onChange={(e)=>{setWeight(e.target.value)}}  />
                                    </div>
                                    <div className="col">
                                        <TextField variant="outlined" type="number" label="Size" value={size} onChange={(e)=>{setSize(e.target.value)}} /> 
                                    </div> 
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <TextField variant="outlined"  multiline={true} rows={5} className="w-100" label="Feedback" value={feedback}  onChange={(e)=>{setFeedBack(e.target.value)}} />
                                    </div>
                                </div>
                                


                                 


                                <div className="mb-3">
                                {
                                        loading === false ?
                                        <div className="mb-3">
                                            <Button type='submit' disabled={ false } variant="contained" className='w-100' style={{borderRadius:'30px'}} >Save progress</Button>
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
                                
                                
                                

                            </form>

                             
                        </div>
                        :
                        <ErrorPage />
                        
                    }
                </div>
                

            }
        </div>
    );
}