import issa from '../assets/issa.png';
import logo from '../assets/logo.png';


import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import YouTube from '@mui/icons-material/YouTube';

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useState } from 'react';
import FeildLabel from '../components/signup/feildLabel';






export default function CreateAccountPage() {

    const PUBLIC_URL = process.env.REACT_APP_URL;



    const currentYear = new Date().getFullYear();

    const [fullname,changeFullname] = useState("");
    const [sexe,changeSexe] = useState("Male");
    const [address,changeAddress] = useState("");
    const [phone,changePhone] = useState("");
    const [age,changeAge] = useState(""); 
    const [height,changeHeight] = useState(""); 
    const [weight,changeWeight] = useState("");
    const [waist,changeWaist] = useState("");
    const [since,changeSince] = useState("");
    const [time,changeTime] = useState("");
    const [diet,changeDiet] = useState("");
    const [alergic,changeAlergic] = useState("");
    const [malady,changeMalady] = useState("");
    const [goal,changeGoal] = useState("");

    const [moreInfo,changeMoreInfo] = useState("");

    



    const [email,changeEmail] = useState("");
    const [password,changePassword] = useState("");


    const [loading,changeLoading] = useState(false);
    const [errorMessage,changeErrorMessage] = useState("");
    const [successMessage,changeSuccessMessage] = useState("");

    

    const createAccount = function(){

        let json = '{"fullname": "'+fullname+'","phone": "'+phone+'","gender": "'+sexe+'","adress": "'+address+'","email": "'+email+'","password": "'+password+'",' ;
        json+='"age": "'+age+'","height": "'+height+'","weight": "'+weight+'","waist": "'+waist+'","since": "'+since+'","time": "'+time+'","diet": "'+diet+'","food": "'+diet+'","health": "'+malady+'","goal": "'+goal+'","more": "'+moreInfo+'"  } ';
   

        changeLoading(true);
        changeErrorMessage("")   
        changeSuccessMessage("")   
         
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("gympro-token", "yytgsfrahjuiplns2sutags4poshn1");

         

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: json,
        redirect: 'follow'
        };

        fetch(PUBLIC_URL+"/API/mobile/signUpUser/index.php", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if (result.success === false) {
                changeErrorMessage(result.message)
            }else{
                changeSuccessMessage(result.message)
                localStorage.setItem("new-account-created","1")
                
            }
        })
        .catch(error =>{
            changeErrorMessage("Something went wrong, please try again.")
        }).finally(()=>{
            changeLoading(false);

        }) 
    }
    

    return (
        <div  >



           <Box className="  mt-3">
              <Card className='w-100' color="dark" >
               <CardContent>

                
                       
                        <div className="content text-center">
                            <img src={logo} width={130} style={ {borderRadius:'50%'} } alt="" />
                            <h3 >Create a new account</h3>
                            <p  className='text-muted'>Please fill out the questionnaire form with accuracy, The more information provided will allow Abdou to build you a detailed custom plan.</p>
                                
                        </div>



                        <form onSubmit={ (event)=>{
                            event.preventDefault();
        
                            createAccount();

                        } }>

                            <FormControl className='mb-3'>
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        onChange={(event)=>{
                                            changeSexe(event.target.value);
                                        }}
                                    >
                                    <FormControlLabel value="Male" control={<Radio />} label="Male / ذكر" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female / أنثى" /> 
                                </RadioGroup>
                            </FormControl>




                            <div className="mb-3">
                                <FeildLabel left="Full Name" right="الاسم بالكامل" />

                                <TextField    variant="standard" className='w-100' value={fullname} onChange={ (event)=>{
                                     changeFullname(event.target.value)
                                } }  />
                            </div>



                            <div className="mb-3">
                                <FeildLabel left="Address" right="العنوان" />

                                <TextField    variant="standard" className='w-100' value={address} onChange={ (event)=>{
                                     changeAddress(event.target.value)
                                } }  />
                            </div>

                            <div className="mb-3">
                                <FeildLabel left="Phone number" right="رقم الهاتف" />

                                <TextField    variant="standard" className='w-100' value={phone} onChange={ (event)=>{
                                     changePhone(event.target.value)
                                } }  />
                            </div>

                            <div className="mb-3">
                                <FeildLabel left="Age" right="العمر" />

                                <TextField  type="number"  variant="standard" className='w-100' value={age} onChange={ (event)=>{
                                     changeAge(event.target.value)
                                } }  />
                            </div>

                            <div className="mb-3">
                                <FeildLabel left="Height" right="الطول" />

                                <TextField  type="number"  variant="standard" className='w-100' value={height} onChange={ (event)=>{
                                     changeHeight(event.target.value)
                                } }  />
                            </div>

                            <div className="mb-3">
                                <FeildLabel left="Weight" right="الوزن" />

                                <TextField  type="number"  variant="standard" className='w-100' value={weight} onChange={ (event)=>{
                                     changeWeight(event.target.value)
                                } }  />
                            </div>

                            <div className="mb-3">
                                <FeildLabel left="Waist" right="قياس الخصر" />

                                <TextField  type="number"  variant="standard" className='w-100' value={waist} onChange={ (event)=>{
                                     changeWaist(event.target.value)
                                } }  />
                            </div>


                            <div className="mb-3">
                                <FeildLabel left="How long have you been training" right="منذ متى كنت تتدرب" />

                                <TextField   variant="standard" className='w-100' value={since} onChange={ (event)=>{
                                     changeSince(event.target.value)
                                } }  />
                            </div>


                            <div className="mb-3">
                                <FeildLabel left="What time do you usually go to the gym" right="في أي ساعة تتدَرب" />

                                <TextField   variant="standard" className='w-100' value={time} onChange={ (event)=>{
                                     changeTime(event.target.value)
                                } }  />
                            </div>


                            <div className="mb-3">
                                <FeildLabel left="Your last Diet plan" right="آخر برنامج غذائي إتبعته" />

                                <TextField   variant="standard" className='w-100' value={diet} onChange={ (event)=>{
                                     changeDiet(event.target.value)
                                } }  />
                            </div>

                           
 
                            

                            
                            <div className="mb-3">
                                <FeildLabel left="Are you allergic to a certain food?" right="هل لديك حساسية من أكل معين؟" />

                                <TextField    variant="standard" className='w-100' value={alergic} onChange={ (event)=>{
                                     changeAlergic(event.target.value)
                                } }  />
                            </div>

                            <div className="mb-3">
                                <FeildLabel left="Do you have injury or chronic disease?" right="هل لديك إصابة أو مرض مزمن؟" />

                                <TextField    variant="standard" className='w-100' value={malady} onChange={ (event)=>{
                                     changeMalady(event.target.value)
                                } }  />
                            </div>

                            <div className="mb-3">
                                <FeildLabel left="Your goal" right="ماهو هدفك؟" />

                                <TextField    variant="standard" className='w-100' value={goal} onChange={ (event)=>{
                                     changeGoal(event.target.value)
                                } }  />
                            </div>


                            <div className="mb-3">
                                <FeildLabel left="Any additional information?" right="هل تريد إضافة أي معلومات" />

                                <TextField    variant="standard" className='w-100' value={moreInfo} onChange={ (event)=>{
                                     changeMoreInfo(event.target.value)
                                } }  />
                            </div>













                            <div className="mb-3">
                                <FeildLabel left="Email" right="البريد الإلكتروني" />
                            
                                <TextField      className='w-100' variant="standard" value={email} onChange={ (event)=>{
                                     changeEmail(event.target.value)
                                } }  />
                            </div>


                            <div className="mb-3">
                                <FeildLabel left="Password" right="كلمه السر" />
                            
                                <TextField     type='password' className='w-100' variant="standard" value={password} onChange={ (event)=>{
                                     changePassword(event.target.value)
                                } }  />
                            </div>

                            {
                                loading === false ?
                                <div className="mb-3">
                                    <Button type='submit' disabled={ email === '' || password==='' } variant="contained" className='w-100' style={{borderRadius:'30px'}} >Create account</Button>
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



                            <div className="mb-3 d-flex justify-content-between">
                                <p className='text-muted'><Link className='text-primary' to={ '/login' }>Back to login</Link> </p>
                                
                                 
                                
                            </div>


                        </form>




                        <div className="card-footer text-center">
                            <img src={issa} style={{ width:50 }} alt="" />
                            <p className='text-muted'>Coach abdou All rights reserved {currentYear}</p>
                            
                            <div className='social-media-icons d-flex justify-content-center'>
                                <div style={{marginRight:'15px'}}>
                                    <Link to={ 'https://facebook.com/144138919523869' } target="_blank" ><Facebook sx={{ color: '#3b5998' }} /> </Link>
                                </div>
                                <div style={{marginRight:'15px'}}>
                                    <Link to={ 'https://youtube.com/channel/UCxBObq_F0u0BuA3PCWJKVVA' } target="_blank" ><YouTube sx={{ color: '#ff254b' }} /> </Link>
                                </div>

                                <div>
                                    <Link to={ 'https://www.instagram.com/coach_abdou_/' } target="_blank" > <Instagram sx={{ color: '#ff254b' }} />  </Link>    
                                   
                                </div>
                            </div>


                        </div>
               </CardContent> 
              </Card>
                    
            
           </Box>
             
        </div>
    );
}