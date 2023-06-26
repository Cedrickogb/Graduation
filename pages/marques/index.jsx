import React, { useEffect, useRef, useState } from "react";
import { AuthContextProvider } from "../../components/context/AuthContext";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Cookies from "js-cookie";
import Link from "next/link";

// import Dark from "../../assets/images/dark.avif"
import Head from "../../assets/images/header.jpg"

import Test from "../../assets/images/bg.jpg"
import Test2 from "../../assets/images/campaign.jpg"
import Test3 from "../../assets/images/test.png"
import Test4 from "../../assets/images/Toji.jpg"


import Click from "../../assets/icons/click-icon.svg"
import Wallet from "../../assets/icons/light-bulb-icon.svg"
import Cocktail from "../../assets/icons/cocktail-icon.svg"

import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function MarqCHome(){

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
    },[]);

    return (
        <AuthContextProvider>
            <NavBar/>
            <div className="py-20 pt-40 bg-blaack">
                {    console.log("connected user", user)}
                <div>
                    {user === "influenceur" &&
                        <div>
                            <div className="flex justify-center items-center py-60 space-x-4">
                                <p className="text-purple-500 text-2xl font-medium">404 </p> <span className="text-purple-500 pl-6 border-l-2 border-purple-500 py-2"> Page not found </span> 
                            </div>
                        </div>
                    }
                    {user === "marque" &&
                        <div>
                            <div className="flex justify-center items-center py-60 space-x-4">
                                <p className="text-purple-500 text-2xl font-medium">404 </p> <span className="text-purple-500 pl-6 border-l-2 border-purple-500 py-2"> Page not found </span> 
                            </div>
                        </div>
                    }
                    {user !== "marque" && user !== "influenceur" &&
                        <div>
                            <div className="flex flex-col space-y-3">
                                <div className="my-10">
                                    <div ref={ref} className="relative h-full">
                                        <div className='absolute -top-6 right-6 xl:-top-10 xl:right-52 bg-purple-700 opacity-30 w-72 h-72 rounded-full blur-2xl -z-10'></div>
                                        <div className='absolute sm:top-0 xl:top-0 xl:left-52 bg-pink-700 opacity-30 w-48 h-48 rounded-full blur-2xl -z-10'></div>
                                        <div className='absolute -bottom-4 sm:left-72 xl:-bottom-6 xl:left-96 bg-amber-400 opacity-30 w-52 h-52 rounded-full blur-xl -z-10'></div>
                                        <div className="flex justify-center items-center -mt-20 sm:mt-0 p-2 px-10 sm:px-20 lg:px-32 xl:px-40">
                                            
                                            <div ref={elementRef} className="space-y-10 p-1 -mt-24 sm:-ml-10 lg:ml-0 animate-slidetoleft ">
                                                <p className="text-3xl sm:text-4xl lg:text-4xl font-bold text-zinc-200 sm:w-3/4">La plateforme d’influence pour vos campagnes avec des influenceurs</p>
                                                <div className="flex space-x-4 text-sm">
                                                    <Link href="/Inscriptions/Marque" className="py-2 px-4 bg-purple-500 hover:bg-purple-700 transition-all duration-700 ease-in-out text-gray-100 rounded-lg font-semibold">Je m'inscrit gratuitement</Link>
                                                </div>
                                            </div>
                                            <div className="relative animate-slidetoleft">
                                                <div className="w-full">
                                                    <Image src={Head} alt="" className="h-[350px] w-[1800px]"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-whiite text-zinc-200 rounded-lg relative p-5 m-10 mx-60 flex flex-col space-y-4 justify-center items-center overflow-hidden">
                                    <div className='absolute -top-6 right-6 xl:-top-32 xl:right-10 bg-pink-700 opacity-30 w-80 h-80 rounded-full blur-3xl z-10'></div>
                                    <div className='absolute sm:top-0 xl:-top-10 xl:left-0 bg-amber-400 opacity-30 w-52 h-52 rounded-full blur-3xl z-10'></div>
                                    <div className='absolute -bottom-4 sm:left-72 xl:-bottom-28 xl:left-96 bg-purple-700 opacity-30 w-52 h-52 rounded-full blur-3xl z-10'></div>


                                    <p className="text-2xl font-semibold z-10">Fonctionnalités</p>
                                    <div className="py-6 z-10">
                                        <ul className="space-y-4 flex flex-col items-start">
                                            <div className="flex justify-center items-center space-x-3">
                                                <span className="h-4 w-4 rounded-full bg-purple-600 animate-bounce"></span>
                                                <li>Accès à un catalogue d'influenceur </li>
                                            </div>
                                            <div className="flex justify-center items-center space-x-3">
                                                <span className="h-4 w-4 rounded-full bg-purple-600 animate-bounce"></span>
                                                <li>Contacter les influenceur via notre plateforme</li>
                                            </div>                                        <div className="flex justify-center items-center space-x-3">
                                                <span className="h-4 w-4 rounded-full bg-purple-600 animate-bounce"></span>
                                                <li>Publication de vos campagnes avec des détails</li>
                                            </div>                                        <div className="flex justify-center items-center space-x-3">
                                                <span className="h-4 w-4 rounded-full bg-purple-600 animate-bounce"></span>
                                                <li>Possibilité de choisir parmis les candidature de campagne</li>
                                            </div>
                                        </ul>
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