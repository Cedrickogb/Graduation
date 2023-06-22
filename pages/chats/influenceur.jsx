import React from "react";
import { AuthContextProvider } from "../../components/context/AuthContext";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";


export default function InfluChat(){
    return (
        <AuthContextProvider>
            <NavBar/>
            <div className="py-20">
                <div>
                    
                </div>
            </div>
            <Footer/>
        </AuthContextProvider>
    )
}