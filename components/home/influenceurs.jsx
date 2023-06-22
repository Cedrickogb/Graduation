import React from "react";
import { useRouter } from "next/router";

export default function InflueHome(){

    const redirectToPage = () => {
        const router = useRouter();
        router.push('/Campagnes');
      };

    redirectToPage();
    
    return(
        <div>

        </div>
    )
}