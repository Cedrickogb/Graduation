// import React, { useEffect, useRef, useState, useContext } from "react";
// import { AuthContextProvider } from "../context/AuthContext";

// import IdContexte from "../context/EditContext";

// import api from "../../config/api/api";
// import Cookies from "js-cookie";

// import { Label, Select, TextInput, Textarea } from "flowbite-react";
// import styles from "../../assets/Mod.module.css"


// export default function EditCampaign(props){
//     let campId = useContext(IdContexte)

//     const [contenueTypes, setContenueTypes] = useState([])
//     const [contenue, setContenue] = useState([])

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("")
//     const filePickerRef = useRef(null);
//     const [selectedFile, setSelectedFile] = useState(null);

//     const [upcampagne, setUpCampagne] = useState({})


    

//     // Fonction de modification d'une campagne
//     const updateCampaign = async (e) => {
//         e.preventDefault();
//         setLoading(true)
//          const result = await api.updateCampagne(upcampagne)
//          if(!result){
//             alert("Echec de la mise à jour de campagne")
//             setLoading(false)
//          }else{
//             setAreOpen(areopen)
//          }
//     };

// /////////////////////////////////////
//     // recupération de la campagne sélectionné por une modification
//     // const fetchUpCampagnes = async () => {
//     //     if(campId !== ""){
//     //         api.getCampaign(campId).then(data =>{
//     //             console.log("zaza", data);
//     //             setUpCampagne(data)
//     //         })
//     //     }
        
//     // }

//     // Récupération des différents types de contenue de campagne
//     const fetchContenueTypes = async () => {
//         api.getContenueTypes().then(data =>{
//             setContenueTypes(data)
//         })
//     }

//     // fonction de selection de type de contenue
//     const handleContenueChange = (e) =>{
//         const cont = contenueTypes.filter((item) => item.type === e.target.value)
//         let data=contenue;
//         console.log(data)
//         if(data.length!==0){
//         const nombreExiste = data.filter((item) => item.type === e.target.value)
//         if(nombreExiste.length!==1){
//             data.push(cont[0]);
//             setContenue(data)
//             setUpCampagne({...upcampagne,contenue:data})
//         }
//         }else{
//             data.push(cont[0]);
//             setContenue(data)
//             setUpCampagne({...upcampagne,contenue:data})
//         }
//     }

//     // fonction de déselection de type de contenue
//     const handleDelete = (id) => {
//         const cont = contenue.filter((med) => med.id !== id)
//         setContenue(cont)
//         setUpCampagne({...upcampagne,contenue:cont})
//     }

//     //ajout d'une image pour une campagne
//     const addImageToCampaign = (e) => {
//         const reader = new FileReader();
//         if (e.target.files[0]) {
//             reader.readAsDataURL(e.target.files[0]);
//             console.log(e.target.files[0])
//             setUpCampagne({...upcampagne, image:e.target.files[0]})

//         }
    
//         reader.onload = (readerEvent) => {
//             setSelectedFile(readerEvent.target.result);
//         };
//     };

//     const setCampInUpCampagne = (camp)=>{
//         console.log(camp);
//         setUpCampagne(camp);
//     }
//     useEffect(()=>{
//         fetchContenueTypes();
//         setCampInUpCampagne(props.camp);
//     },[])


//     return(
//         <AuthContextProvider>
//             <div className="">


//             </div>
//         </AuthContextProvider>
//     )
// }