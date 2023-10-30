export default function FeildLabel(props){
    return(
        <div className="d-flex justify-content-between">
            <div className="text-muted">
                {props.left}
            </div>
            <div className="text-muted" style={{textAlign:'right'}}>
                {props.right}
            </div>
            
        </div>
    );
}