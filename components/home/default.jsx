import React from "react";
import Phone from "../../assets/images/smartphone.webp"
import Image from "next/image";
import Link from "next/link";

export default function DefaultHome(){
    return(
        <div>
            <div className="relative">
                <div className='absolute xl:-top-10 xl:right-52 bg-purple-700 opacity-30 w-72 h-72 rounded-full blur-2xl -z-10'></div>
                <div className='absolute xl:top-0 xl:left-52 bg-pink-700 opacity-30 w-48 h-48 rounded-full blur-2xl -z-10'></div>
                <div className='absolute xl:-bottom-6 xl:left-96 bg-amber-400 opacity-30 w-52 h-52 rounded-full blur-xl -z-10'></div>
                <div className="flex justify-center items-center p-2 px-40">
                    <div className="space-y-10 p-1 -mt-24 -mr-">
                        <p className="text-5xl font-bold text-zinc-800 w-3/4">Technologie et campagne d'influence pour les plus belles marques</p>
                        <div className="flex space-x-4 text-sm">
                            <p className="py-2 px-4 bg-purple-500 hover:bg-purple-700 transition-all duration-700 ease-in-out text-gray-200 rounded-lg">Je suis une marque / entreprise</p>
                            <Link href="/influenceurs" className="py-2 px-4 bg-purple-500 hover:bg-purple-700 transition-all duration-700 ease-in-out text-gray-200 rounded-lg">Je suis un influenceur</Link>
                        </div>
                    </div>
                    <div className="relative">
                        <Image src={Phone} alt="" className="h-[450px] w-[1500px]" />
                        <div className="absolute top-12 right-0">
                            <div className="relative">
                                <p className="p-2 px-6 font-medium rounded-xl shadow-lg bg-white border w-fit text-sm text-zinc-800">Se faire connaître</p>
                                <span className="rounded-full bg-yellow-300 p-0.5 text-white absolute -left-4 top-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="absolute top-40 left-10">
                            <div className="relative">
                                <p className="p-2 px-8 font-medium rounded-xl shadow-lg bg-white border w-fit text-sm text-zinc-800">Se faire aimer</p>
                                <span className="rounded-full bg-pink-500 p-1 text-white absolute -right-4 top-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="absolute bottom-32 right-3">
                            <div className="relative">
                                <p className="p-2 px-8 font-medium rounded-xl shadow-lg bg-white border w-fit text-sm text-zinc-800">Dévélopper ses ventes</p>
                                <span className="rounded-full bg-purple-700 p-1 text-white absolute -left-4 top-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}