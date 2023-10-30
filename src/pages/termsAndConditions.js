import issa from '../assets/issa-logo.png';
import issaDark from '../assets/issa-logo-dark.png';

import logo from '../assets/logo.png';


import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import { useEffect, useState } from 'react';



import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SocialMediaBloc from '../components/socialMediaBloc';
import { CheckBox } from '@mui/icons-material';
import { Checkbox, FormControlLabel } from '@mui/material';



export default function TermsAndConditions(){

    const  [accpeted,setAccepted] = useState(false)
    const  [goToCreateAccount,setGoToCreateAccount] = useState(false)
    

    


    return(
        <div>
            
             
            {
                goToCreateAccount === true ? <Navigate to="/create-account" replace={true} /> : null
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
                            <p className='text-center text-muted' style={{marginBottom:"15px"}}>Terms and conditions</p> 
                                
                        </div>


                        <ul style={{ listStyleType:"none" }}>
                            <li>
                                <p className='text-right'>
                                ليس هناك إمكانية إرجاع المبلغ بعد تسليم البرنامج.
                                </p>
                            </li>
                            <li>
                                <p className='text-right'>
                                يتعهد المتدرب / المتدربة بإتباع البرنامج 100٪؜
                                </p>
                                
                            </li>
                            <li>
                                <p className='text-right'>
                                إذا لم يتم إرسال الصور و الوزن مدة أسبوعين متتاليين سيتم إيقاف الاشتراك و يجب الدفع مرة أخرى إذا أراد المتدرب / المتدربة إكمال البرنامج.
                                </p> 
                            </li>
                            <li>
                                <p className='text-right'>
                                لديك إمكانية إيقاف الاشتراك مرة واحدة بسبب المرض لا غير. 
                                </p> 
                            </li>
                            <li>
                                <p>
                                There is no possibility of refunding after getting the program.
                                </p> 
                            </li>
                            <li>
                                <p>
                                The trainee must follow the program 100%.
                                </p> 
                            </li>
                            <li>
                                <p>
                                If the photos and weights are not sent for two consecutive weeks, the subscription will be suspended and the payment must be made again if the trainee wants to complete.
                                </p> 
                            </li>
                            <li>
                                <p>
                                The trainee have the possibility to stop the subscription once and only for health reasons.
                                </p>
                            </li>
                            
                        </ul>


                        <p className='text-muted'> 
                            <FormControlLabel required control={<Checkbox checked={ accpeted } onChange={ (event)=>{ setAccepted(true) } } />} label="I accept the terms and conditions" />
                        </p>
                        
                        
                        
                        


                        {
                            accpeted == true ? 
                            <Button type='submit' onClick={ ()=>{ setGoToCreateAccount(true) } }  variant="contained" className='w-100' style={{borderRadius:'30px'}} >Continue</Button>

                            :
                            null
                        }


                       


 
                </CardContent> 
            </Card>
                    
            
            </div>
            
            </div> 
        </div>
    );
}