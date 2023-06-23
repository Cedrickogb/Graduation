import React, { useState } from "react";
import Link from "next/link";

export default function  DefaultNav () {


  return (
    <div>
        <div>
            <nav className="flex p-4 justify-between">
                <div>
                    <img src="" alt=""/>
                </div>
                <div>
                    <div className="space-x-2 text-base -mr-32 flex items-center justify-center">
                        <Link href="/" className="p-2 hover:text-purple-500 transition-all ease-in-out duration-700 text-sm">Nos Services</Link>
                        <Link href="/influenceurs" className="p-2 hover:text-purple-500 transition-all ease-in-out duration-700 text-sm">Influenceurs</Link>
                        {/* <Link href="/" className="p-2 border-pink-400 hover:border-b-2 transition-all ease-in-out text-sm">Stats</Link> */}
                        <Link href="/" className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-all ease-in-out duration-700 text-sm">Contactez-nous</Link>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Link href="/login" className="p-2 mr-6 font-semibold hover:text-purple-500 transition-all ease-in-out duration-700">Connexion</Link>
                </div>
            </nav>
        </div>
    </div>
  );
};
