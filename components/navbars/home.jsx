import React, { useState } from "react";
import Link from "next/link";

export default function  DefaultNav () {


  return (
    <div>
        <div>
            <nav className="flex p-4 justify-between">
                <div class="flex items-center justify-center p-1">
                    <a href="/" className="text-whitee text-xl font-medium">INFLUEN<span className="text-purple-700">X</span></a>
                </div>
                <div>
                    <div className="space-x-2 text-base -mr-32 flex items-center justify-center">
                        <Link href="/marques" className="p-2 hover:text-purple-500 transition-all ease-in-out duration-700 text-sm">Marques</Link>
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
