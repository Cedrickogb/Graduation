import React from "react";
import { AuthContextProvider } from "../../components/context/AuthContext";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";

export default function MarqChat(){
    return (
        <AuthContextProvider>
            <NavBar/>
            <div>
                <div></div>
            </div>
            <Footer/>
        </AuthContextProvider>
    )
}