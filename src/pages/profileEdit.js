import { useEffect, useState } from "react"; 
import CircularProgress from '@mui/material/CircularProgress'; 
import ErrorPage from "./error"; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ProfileEditPage(){
    const PUBLIC_URL = process.env.REACT_APP_URL;

    const [isLoading,setIsLoading] = useState(true);

    const [user,setUser] = useState(null);
    
    const [email,setEmail] = useState(null);
    const [phone,setPhone] = useState(null);
    const [fullname,setFullname] = useState(null);
    
    const [loading,setLoading] = useState(false);
    
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
            console.log(result); 
            setUser(result)  
            setEmail(result.email);
            setFullname(result.fullname);
            setPhone(result.phone);
            
 
        
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



    const editProfile = function(){
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json"); 
        myHeaders.append("Authorization",  localStorage.getItem("token") ); 
        
        var raw = JSON.stringify({ "fullname":fullname,"phone":phone });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(PUBLIC_URL+"/api/v1/update-account-infos", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if ( result.success === true ) {
                setSuccessMessage("Account informations updated successfully.");
            }else{
                setErrorMessage(result.message);
            }
        })
        .catch(error => console.log('error', error))
        .finally(()=>{
            setLoading(false);
        })
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
                            <h1 className="mt-3"><Link to={ '/home' } className="text-secondary"><ArrowBack /></Link> My Account</h1>
                            <p className="text-muted">
                                Manage your account and edit your personal data anytime.
                            </p>

                            



                            <form className="edit-form" onSubmit={ (event)=>{
                                event.preventDefault();
                                editProfile();
                            } }>


                                <div className="mb-3">
                                    <TextField disabled type="email" className="w-100" label="Email" value={ email} variant="standard" onChange={ (e)=>{setEmail(e.target.value)} } />
                                </div>

                                <div className="mb-3">
                                    <TextField type="text" className="w-100" label="Fullname" value={ fullname} variant="standard" onChange={ (e)=>{setFullname(e.target.value)} } />
                                </div>
                                
                                <div className="mb-3">
                                    <TextField type="tel" className="w-100" label="Phone number" value={ phone } variant="standard" onChange={ (e)=>{setPhone(e.target.value)} } />
                                </div>
                                <div className="mb-3">
                                {
                                        loading === false ?
                                        <div className="mb-3">
                                            <Button type='submit' disabled={ email === '' || fullname==='' || phone ==='' } variant="contained" className='w-100' style={{borderRadius:'30px'}} >Update</Button>
                                        </div>
                                        :
                                        <div className="mb-3 text-center">
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