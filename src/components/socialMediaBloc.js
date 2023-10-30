import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SocialMediaBloc(){
    return(
        <div className='social-media-icons d-flex justify-content-center mt-3 mb-3'>
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
    );
}