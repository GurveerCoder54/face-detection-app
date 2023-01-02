import React from 'react';


const Navigation =({route})=>{
    return (
        <div className='nav flex' onClick={()=>{
          localStorage.setItem('state','signin')
             route('signin');
            }} >
   <p>Sign Out</p>
        
        </div>
    )
    
}
export default Navigation;