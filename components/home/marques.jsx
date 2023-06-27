import React from "react";
import { useRouter } from "next/router";

export default function MarqeHome(){

    const redirectToPage = () => {
        const router = useRouter();
        router.push('/influenceurs');
      };

    redirectToPage();
    
    return(
        <div>

        </div>
    )
}