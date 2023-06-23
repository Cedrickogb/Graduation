import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import api from "../../config/api/api";

export default function MarqChat(){
    const [campPost, setCampPost] = useState({})
    const [user, setUser] = useState("")

    useEffect(()=>{
        fetchPostulation(),
        setUser(Cookies.get('userType'));
    },[user]);

    // fonction de récupération des candidatures pour la marque connecté
    const fetchPostulation = async () => {
        api.getMarqPostul(Cookies.get('userUid')).then(data =>{
            console.log("dumebi", {...data});
            setCampPost(data);
            console.log("ohio",campPost)
        })
    }


    return(
        <div>
            <div>

            </div>
        </div>
    )
}