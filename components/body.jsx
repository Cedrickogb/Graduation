import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MarqHome from "./home/marques";
import InfluHome from "./home/influenceurs"
import DefaultHome from "./home/default"


export default function Body() {

    const [type,setType]=useState("");

    const handleBody=()=>{
      switch (type) {
        case "marque":
          return <MarqHome/>
        case "influenceur":
          return <InfluHome/>
        default:
            return <DefaultHome/>
            
      }
    }
    useEffect(()=>{
      setType(Cookies.get('userType'));
    },[type])


    return (
        <div>
            <div className="flex flex-col justify-center items-center my-20 mt-40">
                {handleBody()}
            </div>
        </div>
    );
}
