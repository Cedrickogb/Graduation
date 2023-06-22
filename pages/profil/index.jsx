import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContextProvider } from "../../components/context/AuthContext";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import MarqProfil from "../../components/profils/marque"
import InfluProfil from "../../components/profils/influenceur"



export default function Profil(){
    const [type,setType]=useState("");

    const handleProfil=()=>{
      switch (type) {
        case "marque":
          return <MarqProfil/>
        case "influenceur":
          return <InfluProfil/>

            
      }
    }
    useEffect(()=>{
      setType(Cookies.get('userType'));
    },[type])


    return (
        <AuthContextProvider>
            <NavBar/>
            <div className="">
                {type === "marque" && type === "influenceur"  &&
                    <>
                        <div className="flex flex-col justify-center items-center my-20 mt-40">
                            {handleProfil()}
                        </div>
                    </>
                }
                {type !== "marque" && type !== "influenceur" &&
                    <>
                        <div className="flex justify-center items-center py-60 space-x-4">
                            <p className="text-purple-500 text-2xl font-medium">404 </p> <span className="text-purple-500 pl-6 border-l-2 border-purple-500 py-2"> Page not found </span> 
                        </div>
                    </>
                }
            </div>
            <Footer/>
        </AuthContextProvider>
    )
}