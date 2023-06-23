import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import api from "../../config/api/api";

export default function InfluChat(){
    const [campPost, setCampPost] = useState([])
    const [user, setUser] = useState("")

    useEffect(()=>{
        fetchPostulation(),
        setUser(Cookies.get('userType'));
    },[user]);

    // fonction de récupération des postulations pour l'influenceur connecté
    const fetchPostulation = async () => {
        api.getPostuls(Cookies.get('userUid')).then(data =>{
            console.log("dumebi", {...data});
            setCampPost(data);
            console.log("ohio",campPost)
        })
    }


    return(
        <div>
            <div>
                {
                    campPost?.map((camp) => {
                        return(
                            <div className="bg-zinc-100 p-2 m-2">
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <img src={camp.campImg} alt="" className="h-16 w-32" />
                                    </div>
                                    <div>
                                        <p>Marque: {camp.marqName}</p>
                                        <p>Campagne: {camp.campTitle}</p>
                                    </div>
                                    <p>Etat: {camp.etat}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}