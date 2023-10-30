import Alert from '@mui/material/Alert';

export default function ErrorPage(){
    return(
    <div className="d-flex align-items-center justify-content-center px-3" style={{minHeight:'100vh'}}>
        <Alert severity="error">
            Something went wrong, this session is expired. <span className="text-primary" onClick={()=>{ localStorage.removeItem("token"); window.location="/" }}>Logout</span>
        </Alert>
    </div>
    );
}