import React from 'react';

const ImgBox = ({source,box})=>{
    return (
        <div className='center a'>
          <div className='absolute ' id='parentDiv'>
            <img id='inputimage' alt='' src={source} width='500px' height='auto' className='center1'/>
            <div className='bounding-box' style={{top:box.topRow,bottom:box.bottomRow,left:box.leftCol,right:box.rightCol}}></div>
          </div>
        </div>
      );
}
export default ImgBox