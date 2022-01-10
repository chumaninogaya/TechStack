import React from "react";
import Spinner from "./img/spinner.gif";
// import Tech from "./img/tech.png";

const FullPageLoader = () =>{
    return(
        <div className="fp-container">
            <img src={Spinner} className="fp-loader" alt="loading" />
        </div>
    );

};

export default FullPageLoader;