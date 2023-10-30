import issa from '../assets/issa-logo.png';
import issaDark from '../assets/issa-logo-dark.png';

import logo from '../assets/logo.png';


import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import YouTube from '@mui/icons-material/YouTube';

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import { useEffect, useState } from 'react';



import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SocialMediaBloc from '../components/socialMediaBloc';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});




export default function SiginPage() {
    const PUBLIC_URL = process.env.REACT_APP_URL;

 

    const currentYear = new Date().getFullYear();


    const [email,changeEmail] = useState("");
    const [password,changePassword] = useState("");


    const [loading,changeLoading] = useState(false);
    const [errorMessage,changeErrorMessage] = useState("");

    const [connected,setConnected] = useState(false);


    useEffect(()=>{
        if (localStorage.getItem('token')) {
            setConnected(true);
        }
    },[])


    const connect = function(){
        changeLoading(true);
        changeErrorMessage("")    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("gympro-token", "yytgsfrahjuiplns2sutags4poshn1");

        var raw = JSON.stringify({"email":email,"password":password});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(PUBLIC_URL+"/API/mobile/SignInUser/index.php", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if (result.success === false) {
                changeErrorMessage(result.message)
            }else{
                console.log(result);
                localStorage.setItem('token',result.token);

                
                setConnected(true)
            }
        })
        .catch(error =>{
            changeErrorMessage("Something went wrong, please try again.")
        }).finally(()=>{
            changeLoading(false);

        })
    }
    

    return (
        <ThemeProvider theme={darkTheme}>
             <CssBaseline />
            {
                connected === true ? <Navigate to="/home" replace={true} /> : null
            }
            <div style={ { minHeight: '100vh' } }   className="d-flex align-items-center">



            <div className="container">
            <Card >
                <CardContent>
                        <div className="content text-center">
                            <div className='mb-3'>
                                <img src={logo} width={130} style={ {borderRadius:'50%'} } alt="" />
                            </div>
                            <div>
                                <img src={issa} style={{ width:'80%' }} alt="" />
                            </div>
                            <p className='text-center text-muted' style={{marginBottom:"15px"}}>Welcome to Coach Abdou for online coaching</p> 
                                
                        </div>



                        <form onSubmit={ (event)=>{
                            event.preventDefault();

                            connect();

                        } }>


                            <div className="mb-3">
                                <TextField  label="Email" variant="outlined" className='w-100' value={email} onChange={ (event)=>{
                                    changeEmail(event.target.value)
                                } }  />
                            </div>

                            <div className="mb-3">
                                <TextField   label="Password" type='password' className='w-100' variant="outlined" value={password} onChange={ (event)=>{
                                    changePassword(event.target.value)
                                } }  />
                            </div>

                            {
                                loading === false ?
                                <div className="mb-3">
                                    <Button type='submit' disabled={ email === '' || password==='' } variant="contained" className='w-100' style={{borderRadius:'30px'}} >Login</Button>
                                </div>
                                :
                                <div className="mb-3 text-center">
                                    <CircularProgress />
                                </div>

                            }

                            

                            {
                                errorMessage !== '' ? <Alert severity="error">{errorMessage}</Alert> : null
                            }



                            <div className="mb-3 d-flex justify-content-between">
                                <p className='text-muted'><Link style={{textDecoration:'none'}} className='text-muted' to={ '/terms-and-conditions' }>Create new account</Link> </p>
                                
                                <p className='text-muted'><Link style={{textDecoration:'none'}} className='text-muted' target='_blank' to={ 'https://coach-abdou.com/API/mobile/public/index.php' }>forget password ?</Link> </p>
                                
                            </div>


                        </form>




                        <div className="card-footer text-center">
                          
                            <p className='text-muted'>Coach abdou All rights reserved {currentYear}</p>


                            <p>
                             <span className='text-muted'>Developed by</span> <br/>
                                <a href='https://www.linkedin.com/in/taher-chourabi-270749140/' target="_blank">
                                    
                                    Chourabi Taher
                                </a>
                            </p>
                            
                            <SocialMediaBloc />



                        </div>
                </CardContent> 
            </Card>
                    
            
            </div>
            
            </div>
        </ThemeProvider>
    );
}