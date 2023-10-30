export default function SuspendedAccount(){
    return(
        <div className="w-75">
            <p className="text-muted text-center">
                Your account was suspended by your personal coach. <span className="text-primary" onClick={()=>{ localStorage.clear(); window.location="/" }}>Logout</span>
            </p> 
        </div>
        
    );
}