import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import MarqNav from "./navbars/marque";
import InfluNav from "./navbars/influenceurs";
import DefaultNav from "./navbars/home";

export default function  NavBar () {

    const [type,setType]=useState("");
    const handleNavBar=()=>{
      switch (type) {
        case "marque":
          return <MarqNav/>
        case "influenceur":
          return <InfluNav/>
        default:
            return <DefaultNav/>
            
      }
    }
    useEffect(()=>{
      setType(Cookies.get('userType'));
    },[type])

    return (
        <div>
            <div className="">
              <div className="w-full bg-zinc-900 text-gray-300 text-sm fixed top-0 z-20">
                  {handleNavBar()}
              </div>
            </div>
        </div>
    );
};
