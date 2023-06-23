import React, {useState, useEffect} from "react";
import { AuthContextProvider } from "../../components/context/AuthContext";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Influenceur from "../../components/chat/influenceur";
import Marque from "../../components/chat/marque";
import Cookies from "js-cookie";


export default function InfluChat(){
    const [user, setUser] = useState("")

    useEffect(()=>{
        setUser(Cookies.get('userType'));
    },[]);



    return (
        <AuthContextProvider>
            <NavBar/>
            <div className="py-20">
                {    console.log("connected user", user)}
                <div>
                    {user === "influenceur" &&
                        <div>
                            <Influenceur/>
                        </div>
                    }
                    {user === "marque" &&
                        <div>
                            <Marque/>
                        </div>
                    }
                </div>
            </div>
            <Footer/>
        </AuthContextProvider>
    )
}