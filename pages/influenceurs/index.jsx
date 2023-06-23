import React, { useEffect, useState } from "react";
import { AuthContextProvider } from "../../components/context/AuthContext";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Cookies from "js-cookie";
import Link from "next/link";

import Pics1 from "../../assets/images/photo1.jpg"
import Pics2 from "../../assets/images/photo2.jpg"

import Image from "next/image";

export default function MarqChat(){

    const [user, setUser] = useState("")

    useEffect(()=>{
        setUser(Cookies.get('userType'));
    },[]);

    return (
        <AuthContextProvider>
            <NavBar/>
            <div className="py-20 mt-20">
                {    console.log("connected user", user)}
                <div>
                    {user === "influenceur" &&
                        <div></div>
                    }
                    {user === "marque" &&
                        <div></div>
                    }
                    {user !== "marque" && user !== "influenceur" &&
                        <div>
                            <div>
                                <div>
                                    <div className="relative">
                                        <div className='absolute xl:-top-10 xl:right-52 bg-purple-700 opacity-30 w-72 h-72 rounded-full blur-2xl -z-10'></div>
                                        <div className='absolute xl:top-0 xl:left-52 bg-pink-700 opacity-30 w-48 h-48 rounded-full blur-2xl -z-10'></div>
                                        <div className='absolute xl:-bottom-6 xl:left-96 bg-amber-400 opacity-30 w-52 h-52 rounded-full blur-xl -z-10'></div>
                                        <div className="flex justify-center items-center p-2 px-40">
                                            <div className="space-y-10 p-1 -mt-24 -mr-">
                                                <p className="text-5xl font-bold text-zinc-800 w-2/4">Influenceurs, collaborez avec les plus belles marques</p>
                                                <div className="flex space-x-4 text-sm">
                                                    <Link href="/Inscriptions/Influenceur" className="py-2 px-4 bg-purple-500 hover:bg-purple-700 transition-all duration-700 ease-in-out text-gray-200 rounded-lg">Je m'inscrit gratuitement</Link>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="h-96"></div>
                                                <div className="w-full">
                                                    <div className="p-2 h-[250px] w-[300px] absolute -top-24 -right-6">
                                                        <Image src={Pics1} alt="" className="border border-purple-300 p-1 shadow-2xl rounded-lg" />
                                                    </div>
                                                    <div className="p-2 h-[250px] w-[300px] absolute bottom-32 right-52">
                                                        <Image src={Pics2} alt="" className="border border-purple-300 p-1 shadow-2xl rounded-lg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    
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