import * as React from 'react'; 
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChart from '@mui/icons-material/BarChart';
import HomePage from './home'; 
import ComparatorPage from './comparator';
import { CompareArrows, Home } from '@mui/icons-material';
import ProgressPage from './progress';

export default function MainNavigationPage(){
    const [value, setValue] = React.useState(0);

    

    return(
        <div className='d-flex' style={{flexDirection:'column',height:'100vh'}} >
            <div className='app-content' style={{overflowY:"scroll",height:" calc( 100vh - 60px ) "}}>
                {
                    value == 0 ? <HomePage /> : null
                }
                {
                    value == 1 ? <ComparatorPage /> : null
                }
                {
                    value == 2 ? <ProgressPage /> : null
                } 
            </div>



            <BottomNavigation
                style={{borderTop:'1px solid #efefef',position:'fixed',bottom:'0',width:'100%',left:0}}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    console.log(newValue);
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Home" icon={<Home />} />
                <BottomNavigationAction label="Comparator" icon={<CompareArrows />} />
                <BottomNavigationAction label="Progress" icon={<BarChart />} />
            </BottomNavigation>
            
        </div>
    );
}