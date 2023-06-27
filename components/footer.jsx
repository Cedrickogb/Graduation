import React from "react";

export default function Footer(){
    return(
        <div>
            <div class="bg-zinc-800">
                <div class="flex flex-col space-y-6 sm:space-y-0 mx-6 sm:grid sm:grid-cols-4 sm:gap-8 border-b sm:mx-24 py-12 font-semibold text-gray-300">

                    <div class="flex items-center justify-center p-1">
                        <a href="/" className="text-whitee text-4xl">INFLUEN<span className="text-purple-700">X</span></a>
                    </div>
                    <div class="text-left flex flex-col space-y-4 p-2 font-medium">
                        <h3 class="text-sm text-whitee uppercase font-semibold">Service</h3>
                        <a href="" class="text-base text-white">Gestion de campane</a>
                        <a href="" class="text-base text-white">Evaluation d'influenceur</a>
                        <a href="" class="text-base text-white">Connexion entre Entreprise et inflenceur</a>
                    </div>
                    <div class="text-left flex flex-col space-y-4 p-2 font-medium">
                        <h3 class="text-sm text-whitee uppercase font-semibold">A propos</h3>
                        <a href="/influenceurs" class="text-base text-white">Comment ca marche ?</a>
                        <a href="/marques" class="text-base text-white">Entreprise</a>
                    </div>            
                    <div class="text-left flex flex-col space-y-4 p-2 font-medium">
                        <h3 class="text-sm text-whitee uppercase font-semibold">Contacts</h3>
                        <p href="" class="text-base text-white">influenx@gmail.com</p>
                        <p href="" class="text-base text-white">+229 96172375 | +229 65110889</p>
                    </div>            
                </div>
                <div class="flex flex-col -ml-20 space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between sm:mx-24 py-8">
                    <div class="">
                        <p class="text-gray-300 text-sm">© 2023 INFLUENX. Tous droits réservés.</p>
                    </div>

                    <div class="">
                        <a href="/login" class="text-sm text-purple-500 hover:text-purple-700 transition-all ease-in-out duration-700 underline font-semibold">S'identifier</a>
                    </div>
                </div>
            </div>            
        </div>
    )
}