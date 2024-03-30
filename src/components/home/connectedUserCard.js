import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';

import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Camera, CameraEnhance, CameraFront, Edit, EditAttributes, EditNote, Email, ExitToApp, ExitToAppOutlined, NotificationImportant, Phone, Photo } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

import './style.css';
import { Link } from 'react-router-dom';

export default function ConnectedUserCard(props){
    const PUBLIC_URL = process.env.REACT_APP_URL;


    const user = props.data;

    const payment = user.payment;
    const last_renewal_date = user.subscribtion_date;
    const [passedDays,setPassedDays] = useState(0);


    const [ logoutDialog, setLogoutDialog ] = useState(false);
    const [avatarURL,setAvatarURL] = useState(null);

    const [uploading,setUploading] =useState(false);

    const [notifications,setNotifictaions] = useState(0);

    

    useEffect(()=>{ 
        setPassedDays(countDays())
        setAvatarURL(user.photoURL);

        if (user.notifications) {
            setNotifictaions( user.notifications.filter(n=>n.opened == false).length )
        }
        
        closeParentIFOutOfPayment()
    },[])



    function closeParentIFOutOfPayment(){
        
        
        if (payment != null) {
            if (    (payment.duration - countDays())  <= 0     ) {
                props.stopAppFn(true);
            
            }
        }
    }


    function getLeftWeeks(){
        const total = Math.floor(passedDays / 7); 
        return total; 
    }

    function getTotalWeeks() {
        return Math.round(payment.duration / 7);
    }
    


    const countDays = function(){ 
       if (last_renewal_date != null) {
        const year = parseInt(last_renewal_date.substring(0, 4));
        const month = parseInt(last_renewal_date.substring(5, 7));
        const days = parseInt(last_renewal_date.substring(8, 10));

        const today = new Date();

        const differenceInMilliseconds = today.getTime() - new Date(year, month-1, days).getTime();

        // transform them into days now
        const daysPassed = (differenceInMilliseconds / (1000 * 60 * 60 * 24));
        const exactPassedDays = Math.round(daysPassed);
        return exactPassedDays;

       }else{
        return 0;
       }
        

    }


    const progressValue =function(){ 
        return ((getLeftWeeks() * 100) / getTotalWeeks()) 
    }



    const handleImageUpload = async (event)  => {
        setUploading(true);
        const reader = new FileReader();
        const file = event.target.files[0];
    
        reader.onload = () => {
          setAvatarURL(reader.result);
        };
    
        reader.readAsDataURL(file);

        console.log(file);

        
        var myHeaders = new Headers(); 
        myHeaders.append("Authorization",  localStorage.getItem("token") ); 
        
        var formdata = new FormData();
        formdata.append("profile", file, file.name); 

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch(PUBLIC_URL+'/api/v1/update-member-photo', requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error)).finally(()=>{
            setUploading(false);
          })
    };
    
    
    

    return(
        <div style={ {  border:'1px solid #dedede', borderRadius:'9px', padding:'10px' } }  >
            <div >
                 
                    <div className='d-flex mt-3 justify-content-between'>
                        <div className="avatar"   >
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                        
                            


                            {
                                uploading === false ? 
                                <div style={{position:'relative'}}>
                                    <Avatar sx={{ width: 80, height: 80 }} alt={user.fullname_member} src={ avatarURL } 
                                    /> 

                                    <div className='edit-photo-button'  onClick={()=>{
                                        document.getElementById('fileInput').click();
                                    }}
                                    
                                    >
                                        <CameraEnhance color='primary' />
                                    </div>
                                    
                                </div>
                                :
                                <div className='avatar-loader'>
                                    <CircularProgress />
                                </div>

                            
                            }
                        </div>

                        <div className='pt-2'>
                            <h3 className='text-center mt-auto mb-auto' style={{textTransform:'capitalize'}}>{user.fullname}</h3>
                            <p className='text-center text-muted mt-auto mb-auto' ><Email sx={{fontSize:13}} /> {user.email}</p>
                            <p className='text-center text-muted mt-auto ' ><Phone sx={{fontSize:13}} /> {user.phone}</p>
                                                

                            {
                                notifications != 0 ?
                                <p className='text-center text-danger mt-auto ' ><NotificationImportant fontSize='20' sx={{fontSize:13}} /> {notifications} new notifictaion(s)</p>
                                 : null
                            }               

                              
                        </div>    
                                
                    </div>



                    <div>
                    {
                        
                        payment != null ? 
                        <div>
                             {
                                ( (payment.duration - passedDays) > 0)     ?

                                <div>
                                    
                                
                                    <div>
                                        <div className='text-muted text-center mb-2'>Weeks( { getLeftWeeks() } / { getTotalWeeks() } )</div>
                                        <LinearProgress variant="determinate" value={ progressValue() } />
                                    </div>
                                
                                </div>
                                : 
                                <div>
                                    <div className='expired-account'>
                                        <Alert severity="error">
                                            Your subscription has been expired, please contact your coach for more informations.
                                        </Alert>
                                    </div>
                                    
                                </div>
                             }


 

                        </div>
                        :
                        <div>
                            <Alert severity="error">
                                        Your subscription has been expired, please contact your coach for more informations.
                                    </Alert>
                        </div>


                    }
                    </div>




                    <div className="row">
                        <div className="col ">
                            <div className="mt-2">
                                <Link to={ '/profile/edit' }><Button size="small"   className='w-100' variant="outlined" style={{borderRadius:'30px'}}><EditNote /> Edit profile </Button></Link>
                        
                            </div>
                        </div>
                        <div className="col">
                        <div className='mt-2'>
                        <Button size="small"  onClick={()=>{
                            setLogoutDialog(true);
                        }} className='w-100' variant="outlined" style={{borderRadius:'30px'}}><ExitToAppOutlined color='error' /> Logout </Button>
                    



                    <Dialog
                            open={ logoutDialog } 
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Close account ?"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you really want to close this session and disconnect from the app ?

                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={()=>{
                                setLogoutDialog(false)
                            }}>Close</Button>
                            <Button color='error' onClick={()=>{
                                setLogoutDialog(false)
                                localStorage.clear();
                                window.location="/";

                            }} autoFocus>
                                    Logout
                            </Button>
                            </DialogActions>
                        </Dialog>
                        
                    
                        </div>
                    
                        </div>
                    </div>

                    
                
             
            </div>
        </div>
    );
}