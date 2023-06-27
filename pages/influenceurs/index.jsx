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
                        <div className="">
                            <div>
                                <div>
                                    <p className="text-2xl font-bold text-purple-500 text-center">Liste des inluenceurs</p>
                                </div>
                                <div className="flex flex-col p-4 mx-20">
                                    <div className="bg-zinc-200 p-2 rounded-lg">
                                        {
                                            influenceurs?.map( (influ) => {
                                                return(
                                                    <div className="flex items-center rounded-lg bg-white h-24 border p-4 m-2 relative animate-slidetoleft">
                                                        <div>
                                                            <img src={influ.img} className="h-20 w-20 rounded-full" width={80} height={80}/>
                                                        </div>
                                                        <div className="flex space-x-4 justify-center items-center p-2">
                                                            <p className="text-sm">Nom: <span className="text-base text-purple-700 font-medium">{influ.lastName}</span></p>
                                                            <p className="text-sm">Prenom: <span className="text-base text-purple-700 font-medium">{influ.firstName}</span></p>
                                                        </div>
                                                        <div className="flex space-x-4 justify-center items-center p-2 absolute right-60">
                                                            <p className="text-sm">Sexe: <span className="text-base text-purple-700 font-medium">{influ.sex}</span></p>
                                                            <p className="text-sm">Type de contenue: <span className="text-base text-purple-700 font-medium">{influ.typeCont}</span></p>
                                                            <p className="text-sm">Langue: <span className="text-base text-purple-700 font-medium">Francais</span></p>
                                                        </div>
                                                        <div className="text-zinc-100 flex justify-center space-x-4 items-center absolute right-6 text-sm">
                                                            <button className="bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-700 py-1.5 px-3 rounded-lg ">Profil</button>
                                                            <button className="bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-700 py-1.5 px-3 rounded-lg ">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                                                </svg>
                                                            </button>
                                                            <div className="flex space-x-0">
                                                                <button className="text-zinc-700 hover:bg-zinc-300 rounded-full p-1 transition-all ease-in-out duration-500">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                </button>
                                                                <button className="text-zinc-700 hover:bg-zinc-300 rounded-full p-1 transition-all ease-in-out duration-500">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
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