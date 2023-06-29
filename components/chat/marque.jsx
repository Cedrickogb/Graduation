import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import api from "../../config/api/api";
import { Modal } from "flowbite-react";

import insta from "../../assets/icons/insta.svg"
import tiktok from "../../assets/icons/tiktok.svg"
import Image from "next/image";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";

export default function MarqChat(){
    const postulatsCollectionRef=collection(db,'postulats');

    const [campPost, setCampPost] = useState([])
    const [campAccepPost, setCampAccepPost] = useState([])
    const [campRejPost, setCampRejPost] = useState([])
    const [iD, setID] = useState("")
    const [influ, setInflu] = useState([])
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState("")

    useEffect(()=>{
        fetchPostulation(),
        fetchAccepPostulation(),
        fetchRejPostulation(),
        fecthCandidat(),
        setUser(Cookies.get('userType'));
    },[user]);

    // fonction de récupération des candidatures pour la marque connecté
    const fetchPostulation = async () => {
        api.getMarqPostul(Cookies.get('userUid')).then(data =>{
            setCampPost(data);
        })
    }

    const fetchAccepPostulation = async () => {
        api.getMarqPostulAccep(Cookies.get('userUid')).then(data =>{
            setCampAccepPost(data);
        })
    }

    const fetchRejPostulation = async () => {
        api.getMarqPostulRej(Cookies.get('userUid')).then(data =>{
            setCampRejPost(data);
        })
    }

    // acceptationde candidature
    const handleAccept = async (id) => {
        const campagneRef = doc(db, "postulats", id);
        const updateData = {
            etat:"Accepté"
        };
        await updateDoc(campagneRef, updateData)
        alert("Candidature accepté avec succès")
    };

    const handleReject = async (id) => {
        const campagneRef = doc(db, "postulats", id);
        const updateData = {
            etat:"Rejeté"
        };
        await updateDoc(campagneRef, updateData)
        alert("Candidature réjeté avec succès")
    };

    const fecthCandidat = async () => {
        api.getInfluenceur(iD).then((data)=>{
            console.log("rzerzre",data)
            setInflu(data)
        })
    }

    async function goToInflu(id){
        setID(id)
        setOpen(!open)
        console.log("ddqsd",id)
    }

    async function close(){
        setID("");
        // setInflu({});
        setOpen(!open)
    };





    return(
        <div>
            <div>

                <div className="p-6">
                    <p className="p-2 text-purple-600 font-medium text-3xl text-center">Candidatures en attentes</p>
                    <div className="m-2 p-2 bg-zinc-200 sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:gap-2 lg:gap-4">
                        {
                            campPost?.map((cand, index) =>{
                                return(
                                    <div className="flex flex-col lg:p-2 m-1 lg:m-2 border relative space-y-4 p-2 bg-white rounded-lg">
                                        <div className="p-1" >
                                            <img src={cand.campImg} className="h-[200px] w-[1200px] lg:h-[250px] lg:w-[1200px]" alt="" />
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-sm ">Campagne: <span className="text-base font-medium text-purple-700 ml-1">{cand.campTitle}</span></p>
                                            <p className="text-sm ">Candidat: <span className="text-base font-medium text-purple-700 ml-1">{cand.influName}</span></p>
                                            <button onClick={() => goToInflu(cand.influID)} className="text-sm text-zinc-200 font-medium bg-purple-500 hover:bg-purple-600 duration-700 transition-all ease-in-out p-1 px-2 rounded-lg">Profil</button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm ">Candidature: <span className="text-base font-medium text-purple-700 ml-1">{cand.etat}</span></p>
                                            <button onClick={()=>handleAccept(cand.id)} className="flex justify-center items-center font-medium bg-lime-400 hover:bg-lime-500 duration-700 transition-all ease-in-out text-white text-sm p-1 px-3 rounded-lg">
                                                <p>Accepter</p>
                                            </button>
                                            <button onClick={()=>handleReject(cand.id)} className="flex justify-center items-center font-medium bg-red-500 hover:bg-red-600 duration-700 transition-all ease-in-out text-zinc-200 text-sm p-1 px-3 rounded-lg">
                                                <p>Rejeter</p>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="p-6">
                    <p className="p-2 text-purple-600 font-medium text-3xl text-center">Candidatures accepté</p>
                    <div className="m-2 p-2 bg-zinc-200 sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:gap-2 lg:gap-4">
                        {
                            campAccepPost?.map((cand, index) =>{
                                return(
                                    <div className="flex flex-col lg:p-2 m-1 lg:m-2 border relative space-y-4 p-2 bg-white rounded-lg">
                                        <div className="p-1" >
                                            <img src={cand.campImg} className="h-[200px] w-[1200px] lg:h-[250px] lg:w-[1200px]" alt="" />
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-sm ">Campagne: <span className="text-base font-medium text-purple-700 ml-1">{cand.campTitle}</span></p>
                                            <p className="text-sm ">Candidat: <span className="text-base font-medium text-purple-700 ml-1">{cand.influName}</span></p>
                                            <button onClick={() => goToInflu(cand.influID)} className="text-sm text-zinc-200 font-medium bg-purple-500 hover:bg-purple-600 duration-700 transition-all ease-in-out p-1 px-2 rounded-lg">Profil</button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm ">Candidature: <span className="text-base font-medium text-purple-700 ml-1">{cand.etat}</span></p>
                                            {/* <button onClick={()=>handleAccept(cand.id)} className="flex justify-center items-center font-medium bg-lime-400 hover:bg-lime-500 duration-700 transition-all ease-in-out text-white text-sm p-1 px-3 rounded-lg">
                                                <p>Accepter</p>
                                            </button>
                                            <button onClick={()=>handleReject(cand.id)} className="flex justify-center items-center font-medium bg-red-500 hover:bg-red-600 duration-700 transition-all ease-in-out text-zinc-200 text-sm p-1 px-3 rounded-lg">
                                                <p>Rejeter</p>
                                            </button> */}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="p-6">
                    <p className="p-2 text-purple-600 font-medium text-3xl text-center">Candidatures rejeté</p>
                    <div className="m-2 p-2 bg-zinc-200 sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:gap-2 lg:gap-4">
                        {
                            campRejPost?.map((candr, index) =>{
                                return(
                                    <div className="flex flex-col lg:p-2 m-1 lg:m-2 border relative space-y-4 p-2 bg-white rounded-lg">
                                        <div className="p-1" >
                                            <img src={candr.campImg} className="h-[200px] w-[1200px] lg:h-[250px] lg:w-[1200px]" alt="" />
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-sm ">Campagne: <span className="text-base font-medium text-purple-700 ml-1">{candr.campTitle}</span></p>
                                            <p className="text-sm ">Candidat: <span className="text-base font-medium text-purple-700 ml-1">{candr.influName}</span></p>
                                            <button onClick={() => goToInflu(candr.influID)} className="text-sm text-zinc-200 font-medium bg-purple-500 hover:bg-purple-600 duration-700 transition-all ease-in-out p-1 px-2 rounded-lg">Profil</button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm ">Candidature: <span className="text-base font-medium text-purple-700 ml-1">{candr.etat}</span></p>
                                            {/* <button onClick={()=>handleAccept(cand.id)} className="flex justify-center items-center font-medium bg-lime-400 hover:bg-lime-500 duration-700 transition-all ease-in-out text-white text-sm p-1 px-3 rounded-lg">
                                                <p>Accepter</p>
                                            </button>
                                            <button onClick={()=>handleReject(cand.id)} className="flex justify-center items-center font-medium bg-red-500 hover:bg-red-600 duration-700 transition-all ease-in-out text-zinc-200 text-sm p-1 px-3 rounded-lg">
                                                <p>Rejeter</p>
                                            </button> */}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <Modal show={open} size="3xl" popup={true} onClose={()=>close()}>
                        <Modal.Header/>
                        <Modal.Body>
                            <div>
                                <div className="flex space-x-2">
                                    <div className="p-2 border border-purple-600 rounded-lg w-3/4">
                                        <img src={influ.img} className="rounded-lg" alt="" />
                                    </div>
                                    <div className="flex flex-col p-2">
                                        <p>Nom: <span className="text-base font-medium text-purple-700 ml-1">{influ.lastName}</span></p>
                                        <p>Prénom: <span className="text-base font-medium text-purple-700 ml-1">{influ.firstName}</span></p>
                                        <p>Age: <span className="text-base font-medium text-purple-700 ml-1">22 ans</span></p>
                                        <p>Sexe: <span className="text-base font-medium text-purple-700 ml-1">{influ.sex}</span></p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="p-2 justify-between flex flex-col space-y-3">
                                        <p>Type de contenue: <span className="text-base font-medium text-purple-700 ml-1">{influ.typeCont}</span></p>

                                        <div className="flex space-x-6 items-center">
                                            <span className="text-base font-medium text-purple-700 ml-1">Réseaux de l'influenceur: </span>
                                            <div className="flex space-x-4">
                                                <button>
                                                    <Image src={insta} className="h-8 w-8" alt="" />
                                                </button>
                                                <button>
                                                    <Image src={tiktok} className="h-8 w-8 rounded-lg" alt="" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="text-zinc-200 text-sm bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-700 py-1.5 px-3 rounded-lg space-x-2 flex">
                                        <p>Contacter</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Modal.Body>

                    </Modal>
                </div>
            </div>
        </div>
    )
}