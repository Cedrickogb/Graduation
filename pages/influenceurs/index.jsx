import React, { useEffect, useRef, useState } from "react";
import { AuthContextProvider } from "../../components/context/AuthContext";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Cookies from "js-cookie";
import Link from "next/link";

import Pics1 from "../../assets/images/photo1.jpg"
import Pics2 from "../../assets/images/photo2.jpg"

import Test from "../../assets/images/bg.jpg"
import Test2 from "../../assets/images/campaign.jpg"
import Test3 from "../../assets/images/test.png"
import Test4 from "../../assets/images/Toji.jpg"


import Click from "../../assets/icons/click-icon.svg"
import Wallet from "../../assets/icons/light-bulb-icon.svg"
import Cocktail from "../../assets/icons/cocktail-icon.svg"

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import api from "../../config/api/api";

export default function InfluHome(){

    const [influenceurs, setInfluenceurs] = useState([])
    const [user, setUser] = useState("")
    const [ref, inView] = useInView();
    const elementRef = useRef()

    useEffect(() => {
        if(inView){
            elementRef.current.classList.add('animate-slidetoleft');
        }
    },[inView])

    useEffect(()=>{
        setUser(Cookies.get('userType'));
        fetchInfluenceur()
    },[]);

    const fetchInfluenceur = async () => {
        api.getInfluenceurs().then(data =>{
            setInfluenceurs(data)
            console.log("liste des influenceurs",data)
        })
    }

    return (
        <AuthContextProvider>
            <NavBar/>
            <div className="py-20 mt-20">
                {    console.log("connected user", user)}
                <div>
                    {user === "influenceur" &&
                        <>
                            <div className="flex justify-center items-center py-60 space-x-4">
                                <p className="text-purple-500 text-2xl font-medium">404 </p> <span className="text-purple-500 pl-6 border-l-2 border-purple-500 py-2"> Page not found </span> 
                            </div>
                        </>
                    }
                    {user === "marque" &&
                        <div className="bg-zinc-300">
                            <div>
                                <div>
                                    <p className="text-2xl font-medium text-purple-500 text-center">Liste des inluenceurs</p>
                                </div>
                                <div className="flex flex-col bg-zinc-200 p-2">
                                    {
                                        influenceurs?.map( (influ) => {
                                            return(
                                                <div className="flex items-center bg-white h-24 border p-3 m-2">
                                                    <div>
                                                        <img src={influ.img} className="h-20 w-20 rounded-full" width={80} height={80}/>
                                                    </div>
                                                    <div className="flex flex-col space-x-2 justify-start items-center">
                                                        <p>Nom: <span>{influ.lastName}</span></p>
                                                        <p>Prenom: <span>{influ.firstName}</span></p>
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        <button>Profil</button>
                                                        <button>

                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {user !== "marque" && user !== "influenceur" &&
                        <div>
                            <div>
                                <div className="my-10">
                                    <div ref={ref} className="relative">
                                        <div className='absolute -top-6 right-6 xl:-top-10 xl:right-52 bg-purple-700 opacity-30 w-72 h-72 rounded-full blur-2xl -z-10'></div>
                                        <div className='absolute sm:top-0 xl:top-0 xl:left-52 bg-pink-700 opacity-30 w-48 h-48 rounded-full blur-2xl -z-10'></div>
                                        <div className='absolute -bottom-4 sm:left-72 xl:-bottom-6 xl:left-96 bg-amber-400 opacity-30 w-52 h-52 rounded-full blur-xl -z-10'></div>
                                        <div className="flex justify-center items-center -mt-20 sm:mt-0 p-2 px-10 sm:px-20 lg:px-32 xl:px-40">
                                            
                                            <div ref={elementRef} className="space-y-10 p-1 -mt-24 sm:-ml-10 lg:ml-0 animate-slidetoleft">
                                                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-800 sm:w-2/4">Influenceurs, collaborez avec les plus belles marques</p>
                                                <div className="flex space-x-4 text-sm">
                                                    <Link href="/Inscriptions/Influenceur" className="py-2 px-4 bg-purple-500 hover:bg-purple-700 transition-all duration-700 ease-in-out text-gray-100 rounded-lg font-semibold">Je m'inscrit gratuitement</Link>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="h-96"></div>
                                                <div className="w-full">
                                                    <div className="animate-slidedown duration-700 p-2 h-[150px] w-[200px] sm:h-[200px] sm:w-[250px] lg:h-[250px] lg:w-[300px] absolute -bottom-6 -right-8 sm:-top-24 sm:-right-10 lg:-top-24 lg:-right-20 xl:-top-24 xl:-right-6">
                                                        <Image src={Pics1} alt="" className="border border-purple-300 p-1 shadow-2xl rounded-lg" />
                                                    </div>
                                                    <div className="animate-slidedown p-2 h-[130px] w-[180px] sm:h-[180px] sm:w-[230px] lg:h-[200px] lg:w-[250px] xl:h-[250px] xl:w-[300px] absolute -bottom-10 right-28 sm:bottom-10 sm:right-20 lg:bottom-16 lg:right-32 xl:bottom-32 xl:right-52">
                                                        <Image src={Pics2} alt="" className="border border-purple-300 p-1 shadow-2xl rounded-lg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-20 pt-20 space-y-10 relative">
                                    <div className="flex text-center justify-center border-y py-10 w-full">
                                        <p className="text-2xl font-medium w-2/3 sm:w-2/5 lg:w-1/4 xl:w-1/6">Avec nôtre plateforme vous pouvez</p>
                                    </div>
                                    <div className="flex flex-col-reverse sm:flex-row lg:ml-[100px] xl:ml-0 justify-center items-center p-2 space-x-4 lg:px-32 lg:w-2/3">
                                        <p className=" mt-6 sm:mt-0 text-2xl lg:text-3xl font-light text-center">participer à des <span className="font-medium">campagnes créatives rémunérées</span></p>
                                        <Image src={Wallet} className="h-16 sm:h-1/5 lg:h-1/2 w-16 sm:w-1/5 lg:w-1/2" alt=""/>
                                    </div>
                                    <div className="flex flex-col sm:flex-row lg:ml-[300px] xl:ml-[450px] justify-center p-2 items-center space-x-4 lg:px-32 lg:w-2/3">
                                        <Image src={Click} className="h-16 sm:h-1/5 lg:h-1/2 w-16 sm:w-1/5 lg:w-1/2" alt=""/>
                                        <p className=" mt-6 sm:mt-0 text-2xl lg:text-3xl font-light text-center">postuler pour des <span className="font-medium">campagnes d'affiliation</span></p>
                                    </div>
                                    <div className="flex flex-col-reverse sm:flex-row lg:ml-[100px] xl:ml-0 justify-center items-center p-2 space-x-4 lg:px-32 lg:w-2/3">
                                        <p className=" mt-6 sm:mt-0 text-2xl lg:text-3xl font-light text-center">participer à des <span className="font-medium">évenements de marque</span></p>
                                        <Image src={Cocktail} className="h-16 sm:h-1/5 lg:h-1/2 w-16 sm:w-1/5 lg:w-1/2" alt=""/>
                                    </div>
                                </div>

                                <div className="py-4 pb-32">
                                    <div className="h-[300px] flex">
                                        <div className="relative">
                                            <p className="bg-purple-500 text-zinc-200 text-6xl p-20 py-32 font-bold">Comment ca marche </p>
                                        </div>
                                        <div className="flex">
                                            <div className="h-[436px] w-1/4 hover:w-2/4 transition-all duration-700 ease-in-out relative">
                                                <Image src={Test} className="h-full" alt=""/>
                                                <div className="absolute transition-all duration-700 ease-in-out w-full h-full top-0 bg-grey hover:bg-purp flex justify-center hover:text-inherit">
                                                    <p className="text-transparent hover:text-zinc-200 font-medium text-center text-xl p-2 pt-[340px]">Je m'inscrit gratuitement</p>
                                                </div>
                                            </div>
                                            <div className="h-[436px] w-1/4 hover:w-2/4 transition-all duration-700 ease-in-out relative">
                                                <Image src={Test2} className="h-full" alt=""/>
                                                <div className="absolute transition-all duration-700 ease-in-out w-full h-full top-0 bg-grey hover:bg-purp flex justify-center hover:text-inherit">
                                                    <p className="text-transparent hover:text-zinc-200 font-medium text-center text-xl p-2 pt-[340px]">Je postule pour les campagnes qui me plaisent</p>
                                                </div>                                            </div>
                                            <div className="h-[436px] w-1/4 hover:w-2/4 transition-all duration-700 ease-in-out relative">
                                                <Image src={Test3} className="h-full" alt=""/>
                                                <div className="absolute transition-all duration-700 ease-in-out w-full h-full top-0 bg-grey hover:bg-purp flex justify-center hover:text-inherit">
                                                    <p className="text-transparent hover:text-zinc-200 font-medium text-center text-xl p-2 pt-[340px]">La marque me sélectionne</p>
                                                </div>                                            </div>
                                            <div className="h-[436px] w-1/4 hover:w-2/4 transition-all duration-700 ease-in-out relative">
                                                <Image src={Test4} className="h-full" alt=""/>
                                                <div className="absolute transition-all duration-700 ease-in-out w-full h-full top-0 bg-grey hover:bg-purp flex justify-center hover:text-inherit">
                                                    <p className="text-transparent hover:text-zinc-200 font-medium text-center text-xl p-2 pt-[340px]">J'effectue la campagne jusqu'a terme</p>
                                                </div>                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Footer/>
        </AuthContextProvider>
    )
}