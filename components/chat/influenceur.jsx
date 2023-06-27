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
                <p className="p-2 text-purple-600 font-medium text-3xl text-center">Mes postulations</p>
            </div>
            <div className="p-2 bg-zinc-200 m-2 rounded-lg">
                {
                    campPost?.map((camp) => {
                        return(
                            <div className="bg-white p-2 m-2 rounded-lg flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <img src={camp.campImg} alt="" className="h-16 w-32" />
                                    </div>
                                    <div>
                                        <p className="text">Marque: <span className="text-lg text-purple-600 ml-2">{camp.marqName}</span></p>
                                        <p className="text">Campagne: <span className="text-lg text-purple-600 ml-2">{camp.campTitle}{camp.campTitle}</span></p>
                                    </div>
                                    <p className="">Etat:
                                        {
                                            camp.etat === "Accepté" &&
                                            <span className="bg-lime-400 text-white font-medium p-1 px-2 ml-4 rounded-lg">Accepté</span>
                                        }
                                    </p>
                                </div>
                                <div>
                                    <button className="text-zinc-200 text-sm bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-700 py-1.5 px-3 rounded-lg ">Détails</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}