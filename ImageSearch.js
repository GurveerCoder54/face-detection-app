import React from "react";

const ImageSearch =({searchChange,buttonClick,name})=>{
            return(
<div>
         <h1>Hi {`${name}`}</h1>
    <div className="ImageSearch dib shadow-1">
                    <p>Enter A Image And The App Will Detect Face In It </p>
                 
   <input type="search" placeholder="Enter Image Url" className="search shadow-5" onChange={searchChange} id="imgUrl"/>
   <button className="btn shadow-5" onClick={buttonClick}>Detect</button>
        </div>
        </div>
    )
}
export default ImageSearch;