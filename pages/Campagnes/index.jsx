import {db, auth,storage} from '../../config/firebase.config'
import {setDoc,updateDoc, collection,getDocs,getDoc,doc,deleteDoc, serverTimestamp, addDoc} from 'firebase/firestore'
import {ref,uploadString, getDownloadURL, uploadBytes } from "firebase/storage";

import React, { useEffect, useRef, useState } from "react";
import { AuthContextProvider } from "../../components/context/AuthContext";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import api from "../../config/api/api";
import { Button, Label, Modal, Select, TextInput, Textarea } from "flowbite-react";
import Cookies from "js-cookie";

import styles from "../../assets/Mod.module.css"
import Image from "next/image";
import { useRouter } from "next/router";
import EditCampaign from "../../components/campagnes/editCampaign";
import IdContexte from "../../components/context/EditContext";

import Img from "../../assets/images/campa.jpg"

export default function Campaign() {
    const campagnesCollectionRef=collection(db,'campagnes');
    const [img,setImg]= useState("")

    const [camp, setCamp] = useState({})
    var val = camp

    const [camId, setCamId] = useState("")

    const [open, setOpen] = useState(false);
    const [isopen, setIsOpen] = useState(false);
    const [areopen, setAreOpen] = useState(false);
    const [reopen, setReOpen] = useState(false);

    const [user, setUser] = useState("");

    const [contenueTypes, setContenueTypes] = useState([])
    const [contenue, setContenue] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const filePickerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [campagne, setCampagne] = useState({
        userId: Cookies.get('userUid'),
        title:"",
        description:"",
        type:contenue,
        dateDeb:"",
        dateFin:"",
        terms:"",
        image:null
    })

    // campagnes à afficher  à l'utilisateur
    const [campaigns, setCampaigns] = useState([])

    //campagens à afficher à l'influenceur connecté
    const [influcamp, setInflucamp] = useState([])

    const [postCamp, setPostCamp] = useState({})

    // information à envyer pour postuler à une campagne
    const [ctrl, setCtrl] = useState(false)
    const [postulCamp, setPostulCamp] = useState({})


    const [marque, setMarque] = useState({})
    const fetchMarque = async () => {
        api.getMarque(Cookies.get('userUid')).then((data)=>{
            setMarque({...data})
            console.log("set",marque)
        })
    }
    
    //Fonction de publication d'une campagne
    const sendCampaign = async (e) => {
        e.preventDefault();
        if(loading) return;
        setLoading(true)
        
        const docRef = await addDoc(collection(db, "campagnes"), {
            userId: Cookies.get('userUid'),
            marqName: marque.name,
            marqImg: marque.img,
            title: campagne.title,
            description:campagne.description,
            type:campagne.type,
            dateDeb:campagne.dateDeb,
            dateFin:campagne.dateFin,
            requir: campagne.requir,
            terms:campagne.terms,
        });

        const name = new Date().getTime().toString();
        const imageRef = ref(storage, `campagnes/${campagne.title + name}/image`);

        if (selectedFile){
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL= await getDownloadURL(imageRef);
                console.log("image url after post", downloadURL)
                if(downloadURL){
                    const campagneRef = doc(db, "campagnes", docRef.id);
                    const updateData = { image: downloadURL };
                    await updateDoc(campagneRef, updateData);
                }
            });
        }

        // setCampagne({});
        setSelectedFile(null);
        setLoading(false);
        alert("Campagne publié avec succès")
        setOpen(!open)
        if(setOpen(!open)){
            setCampagne({})
        }
    };

    // Fonction de mise à ojour de campagne séléctionée
    const updateCampaign = async (e) => {
        e.preventDefault();
        if(loading) return;
        setLoading(true)

        const name = new Date().getTime().toString();
        const imageRef = ref(storage, `campagnes/${campagne.title + name}/image`);

        await uploadString(imageRef, selectedFile, "data_url").then(async () => {
            const downloadURL= await getDownloadURL(imageRef);
            console.log("image url after updatepost", downloadURL)
            setImg(downloadURL)
            if(downloadURL){
                const campagneRef = doc(db, "campagnes", camp.id);
                const updateData = {
                    userId: Cookies.get('userUid'),
                    marqName: marque.name,
                    marqImg: marque.img,
                    title: camp.title,
                    description:camp.description,
                    type:camp.type,
                    dateDeb:camp.dateDeb,
                    dateFin:camp.dateFin,
                    requir: campagne.requir,
                    terms:camp.terms,
                    image: downloadURL 
                };
                await updateDoc(campagneRef, updateData);


                console.log("update data",updateData)
                // const result = await api.updateCampagne(camp)
            }
            setSelectedFile(null);
            setLoading(false);
            alert("Campagne modifié avec succès")
            setAreOpen(!areopen)
        });      

    };

    // Fermeture du modal de publication et remise à zero du formulaire
    async function closeForm(){
        setCampagne({});
        setOpen(!open)
    };

    // Fermeture du modal de modification et remise à zero du formulaire
    async function closeForm2(){
        setCamp({});
        setAreOpen(!areopen)
    };

    // Recuperation de la campagne selectionner
    async function takeCampaign(camp){
        console.log(camp)
        setCamp(camp);
        setAreOpen(!areopen)
    };

    //ajout d'une image pour une campagne
    const addImageToCampaign = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
          console.log(e.target.files[0])
          setCampagne({...campagne, image:e.target.files[0]})

        }
    
        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result);
        };
    };

    useEffect(()=>{
        fetchMarque();
        fetchContenueTypes();
        fetchCampagnes();
        fetchInflucamp();
        setUser(Cookies.get('userType'));
    },[user]);


// fonction de selection de type de contenue
    const handleContenueChange = (e) =>{
        const cont = contenueTypes.filter((item) => item.type === e.target.value)
        let data=contenue;
        console.log(data)
        if(data.length!==0){
        const nombreExiste = data.filter((item) => item.type === e.target.value)
        if(nombreExiste.length!==1){
            data.push(cont[0]);
            setContenue(data)
            setCampagne({...campagne,contenue:data})
        }
        }else{
            data.push(cont[0]);
            setContenue(data)
            setCampagne({...campagne,contenue:data})
        }
    }

// fonction de déselection de type de contenue
    const handleDelete = (id) => {
        const cont = contenue.filter((med) => med.id !== id)
        setContenue(cont)
        setCampagne({...campagne,contenue:cont})
    }


// Récupération des différents types de contenue de campagne
    const fetchContenueTypes = async () => {
        api.getContenueTypes().then(data =>{
            setContenueTypes(data)
        })
    }

// Récupération des campagnes publiée par la marque connecter
const fetchCampagnes = async () => {
    api.getCampagne(Cookies.get('userUid')).then(data =>{
        // console.log("dumebi", {...data});
        setCampaigns(data)
    })
}


// Suppression d'une campagnes
async function suppCampaigne(id){
    setCamId(id)
    console.log(id)
    if (window.confirm("Are you sure you want to delete this post?")){
        const campagneRef = doc(db, "campagnes", id);
        await deleteDoc(campagneRef)
        if (await deleteDoc(campagneRef)){
            alert("Suppression réussi")
        }
    }
}

/////////// ENSEMBLE DES FONCTIONS CONCERNANT UN INFLUENCEUR //////////////
// Récupération des campagnes à affiché a l'influenceur connecté
const fetchInflucamp = async () =>{
    api.getCampagnes().then (data =>{
        console.log("toutes les campagnes publiées", data)
        setInflucamp(data)
    })
}

// Récupération de de l'id de la campagne pour le postulant
async function postCampaign(postul){
    console.log(postul)
    setPostCamp(postul);
    setReOpen(!reopen)
};

// Fermeture du modal de postulation
async function closeForm3(){
    setCampagne({});
    setReOpen(!reopen)
};


// fonction de postulation pour une campagne
async function postulToCampaign(id, title, img, marqId, mqName, marqImage){
    console.log("postulation")
    setPostulCamp({
        campID: id,
        campTitle: title,
        campImg: img,
        marqID: marqId,
        marqName: mqName,
        marqImg: marqImage,
        influID: Cookies.get('userUid'),
        etat: "en attente"
    })

    if (postulCamp){
        console.log(postulCamp)
        api.postulCampagne(postulCamp)
        alert("Candidature envoyé avce succès")
        setReOpen(!reopen)

    }


    
};

    return(
        <AuthContextProvider>
            {user==="marque" &&
                <>
                    <NavBar/>
                    <IdContexte.Provider value={val}>
                        <div className="py-20 mt-20">


                            <div className="flex items-center justify-center text-sm">
                                <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-100 bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-700 rounded-lg flex space-x-2 items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p>Add campaign</p>
                                </button>
                            </div>

                            <div className="bg-gray-100 p-2 m-2">
                            {
                                campaigns?.map((camp, index) => {
                                    return(
                                        <div className="bg-white p-2 m-2 flex space-x-2 relative rounded-lg" key={index}>
                                            <div>
                                                <img src={camp.image} alt="" className="h-[150px] w-[300px]" />
                                            </div>
                                            <div>
                                                <div className="flex space-x-4">
                                                    <p className="font-medium">Titre : <span>{camp.title}</span> </p>
                                                </div>
                                                <div className="flex space-x-4 text-sm text-gray-500">
                                                    <p>{camp.dateDeb}</p>
                                                    <p>-</p>
                                                    <p>{camp.dateFin}</p>
                                                </div>
                                                <div className="p-2 -ml-2 space-y-1">
                                                    <p className="font-medium">Description :</p>
                                                    <p className="text-md">{camp.description}</p>
                                                </div>
                                            </div>
                                            <div className="absolute right-3 bottom-2 flex justify-center items-center hover:text-purple-500 transition-all ease-in-out duration-700 font-medium cursor-pointer" onClick={() => setIsOpen(!isopen)}>
                                                <button>Actions</button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>
                                            </div>
                                            <div className={`z-10 absolute -bottom-[70px] -right-1 bg-white px-4 p-2 flex flex-col space-y-2 border text-md animate-smooth ${isopen? 'translate-y-0':'hidden'}`}>
                                                <button onClick={() => takeCampaign(camp)}>Modifier</button>
                                                <button onClick={() => suppCampaigne(camp.id)}>Supprimer</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>

                            {/* div contenant les deux types de modal concernant les campagnes */}
                            <div>
                                {/* Modal contenant le formulaire de publication d'une campagne */}
                                <Modal show={open} size="6xl" popup={true} onClose={()=>closeForm()} className="" >
                                    <Modal.Header/>
                                    <Modal.Body>
                                        <div className="p-1 bg-zinc-100 rounded-lg flex flex-col justify-center items-center w-full animate-slidedown">
                                            <hi className="text-2xl font-medium text-purple-500 m-2">Créer votre campagne</hi>
                                            <div className="flex flex-col lg:flex-row w-full p-1 sm:p-2">
                                                <div className={`bg-cover relative bg-left bg-no-repeat lg:w-1/3 shadow-xl ${styles.background}`} >
                                                </div>

                                                <div className="lg:w-2/3 bg-white">
                                                    <div className="p-2 shadow-xl">
                                                        <div className="p-2 space-y-2">
                                                            <div className="space-y-2">
                                                                <div>
                                                                    <Label htmlFor="title" value="Titre"/>
                                                                    <TextInput
                                                                        className="rounded-none focus:border-purple-400 mt-1"
                                                                        id="title"
                                                                        type="text"
                                                                        placeholder="titre"
                                                                        required={true}
                                                                        shadow={true}
                                                                        value={campagne.title}
                                                                        onChange={(e)=>setCampagne({...campagne,title:e.target.value})}
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <Label htmlFor="description" value="Description"/>
                                                                    <Textarea
                                                                        className="focus:border-purple-400 mt-1"
                                                                        id="description"
                                                                        type="text"
                                                                        placeholder="description"
                                                                        required={true}
                                                                        shadow={true}
                                                                        value={campagne.description}
                                                                        onChange={(e)=>setCampagne({...campagne,description:e.target.value})}
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <div>
                                                                        <Label htmlFor="nom" value="Type de contenue" className="" />
                                                                        <div className="w-full my-2 flex space-x-2 justify-center items-center">
                                                                            <div className="border border-gray-300 rounded-lg focus:border-purple-400 p-4 mb-4 w-4/5">
                                                                                {
                                                                                    contenue.map((all) => {
                                                                                        if (all) {
                                                                                        return (
                                                                                            <span className="text-sm text-center text-white mx-1 bg-purple-400 p-1.5 rounded-lg" key={all.id}>
                                                                                                {all.type}
                                                                                                <span className="ml-4 text-sm cursor-pointer z-20" onClick={() => { handleDelete(all.id) }}>x</span>
                                                                                            </span>
                                                                                        );
                                                                                        }
                                                                                        return null;
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            <div className="flex justify-center items-center w-1/5">
                                                                                <Select onChange={handleContenueChange}>
                                                                                    {
                                                                                        contenueTypes?.map((cont)=>{
                                                                                            return <option value={cont.type} key={cont.id}>{cont.type}</option>
                                                                                        })
                                                                                    }
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="flex space-x-2">
                                                                    <div className="w-1/2">
                                                                        <Label htmlFor="datedeb" value="Début"/>
                                                                        <TextInput
                                                                            className="focus:border-purple-400"
                                                                            id="datedeb"
                                                                            type="date"
                                                                            required={true}
                                                                            shadow={true}
                                                                            value={campagne.dateDeb}
                                                                            onChange={(e)=>setCampagne({...campagne,dateDeb:e.target.value})}
                                                                        />
                                                                    </div>
                                                                    <div className="w-1/2">
                                                                        <Label htmlFor="datefin" value="Fin"/>
                                                                        <TextInput
                                                                            className="focus:border-purple-400"
                                                                            id="datefin"
                                                                            type="date"
                                                                            required={true}
                                                                            shadow={true}
                                                                            value={campagne.dateFin}
                                                                            onChange={(e)=>setCampagne({...campagne,dateFin:e.target.value})}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <Label htmlFor="requir" value="Conditions à remplir pour postuler"/>
                                                                    <Textarea
                                                                        className="rounded focus:border-purple-400"
                                                                        id="requir"
                                                                        type="text"
                                                                        placeholder="..."
                                                                        required={true}
                                                                        shadow={true}
                                                                        value={campagne.requir}
                                                                        onChange={(e)=>setCampagne({...campagne,requir:e.target.value})}
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <Label htmlFor="terms" value="Termes de contrat"/>
                                                                    <TextInput
                                                                        className="rounded-none focus:border-purple-400"
                                                                        id="terms"
                                                                        type="text"
                                                                        placeholder="..."
                                                                        required={true}
                                                                        shadow={true}
                                                                        value={campagne.terms}
                                                                        onChange={(e)=>setCampagne({...campagne,terms:e.target.value})}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="">
                                                                {selectedFile && ( // Affichage de la sélection d'image avec option de suppression de selection de celle selectioné
                                                                    <div className="relative bg-slate-500">
                                                                        
                                                                        <svg onClick={() => setSelectedFile(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 absolute p-0.5 m-1 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-700 rounded-full">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>

                                                                        <img
                                                                            src={selectedFile}
                                                                            className={`${loading && "animate-pulse"}`}
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    {!loading && (
                                                                        <div className="w-full">
                                                                            <Label htmlFor="image" value="Image"/>
                                                                            <div className="overflow-hidden cursor-pointer" onClick={() => filePickerRef.current.click()} >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                                </svg>
                                                                                <input type="file" hidden id="image" ref={filePickerRef} onChange={addImageToCampaign} />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <button  onClick={sendCampaign} className="bg-purple-400 hover:bg-purple-600 transition-all ease-in-out duration-500 w-full p-1.5 text-white rounded-lg" > Publier </button>

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                                
                                {/* Modal contenant le formulaire de modification d'une campagne */}
                                <Modal show={areopen} size="5xl" popup={true} onClose={()=>closeForm2()} className="" >
                                    <Modal.Header/>
                                    <Modal.Body>
                                        <div>
                                        <div className="bg-white">
                                            {/* formulaire de modification d'une campagne */}
                                            <div className="p-1 bg-zinc-100 rounded-lg flex flex-col justify-center items-center w-full">
                                                <hi className="text-2xl font-medium text-purple-500 m-2">Modifier votre campagne</hi>
                                                <div className="flex flex-col lg:flex-row w-full p-1 sm:p-2">
                                                    <div className={`bg-cover relative bg-center bg-white bg-fixed bg-no-repeat lg:w-1/3 shadow-xl ${styles.background}`} >

                                                    </div>
                                                    <div className="lg:w-2/3">
                                                        <form  className="flex flex-col gap-4 p-2 sm:p-4 md:p-8 shadow-xl bg-white" >
                                                            <div className="space-y-2">
                                                                <div>
                                                                    <Label htmlFor="title" value="Titre"/>
                                                                    <TextInput
                                                                        className="rounded-none focus:border-purple-400 mt-1"
                                                                        id="title"
                                                                        type="text"
                                                                        placeholder="titre"
                                                                        required={true}
                                                                        shadow={true}
                                                                        value={camp.title}
                                                                        onChange={(e)=>setCamp({...camp,title:e.target.value})}
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <Label htmlFor="description" value="Description"/>
                                                                    <Textarea
                                                                        className="focus:border-purple-400 mt-1"
                                                                        id="description"
                                                                        type="text"
                                                                        placeholder="description"
                                                                        required={true}
                                                                        shadow={true}
                                                                        value={camp.description}
                                                                        onChange={(e)=>setCamp({...camp,description:e.target.value})}
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <div>
                                                                        <Label htmlFor="nom" value="Type de contenue" className="" />
                                                                        <div className="w-full my-2 flex space-x-2 justify-center items-center">
                                                                            <div className="border border-gray-300 rounded-lg focus:border-purple-400 p-4 mb-4 w-4/5">
                                                                                {
                                                                                    contenue.map((all) => {
                                                                                        if (all) {
                                                                                        return (
                                                                                            <span className="text-sm text-center text-white mx-1 bg-purple-400 p-1.5 rounded-lg" key={all.id}>
                                                                                                {all.type}
                                                                                                <span className="ml-4 text-sm cursor-pointer" onClick={() => { handleDelete(all.id) }}>x</span>
                                                                                            </span>
                                                                                        );
                                                                                        }
                                                                                        return null;
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            <div className="flex justify-center items-center w-1/5">
                                                                                <Select onChange={handleContenueChange}>
                                                                                    {
                                                                                        contenueTypes?.map((cont)=>{
                                                                                            return <option value={cont.type} key={cont.id}>{cont.type}</option>
                                                                                        })
                                                                                    }
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="flex space-x-2">
                                                                    <div className="w-1/2">
                                                                        <Label htmlFor="datedeb" value="Début"/>
                                                                        <TextInput
                                                                            className="focus:border-purple-400"
                                                                            id="datedeb"
                                                                            type="date"
                                                                            required={true}
                                                                            shadow={true}
                                                                            value={camp.dateDeb}
                                                                            onChange={(e)=>setCamp({...camp,dateDeb:e.target.value})}
                                                                        />
                                                                    </div>
                                                                    <div className="w-1/2">
                                                                        <Label htmlFor="datefin" value="Fin"/>
                                                                        <TextInput
                                                                            className="focus:border-purple-400"
                                                                            id="datefin"
                                                                            type="date"
                                                                            required={true}
                                                                            shadow={true}
                                                                            value={camp.dateFin}
                                                                            onChange={(e)=>setCamp({...camp,dateFin:e.target.value})}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <Label htmlFor="terms" value="Termes de contrat"/>
                                                                    <TextInput
                                                                        className="rounded-none focus:border-purple-400"
                                                                        id="terms"
                                                                        type="text"
                                                                        placeholder="......"
                                                                        required={true}
                                                                        shadow={true}
                                                                        value={camp.terms}
                                                                        onChange={(e)=>setCamp({...camp,terms:e.target.value})}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="">
                                                                {camp.image === "" &&
                                                                    <div>
                                                                        {selectedFile && ( // Affichage de la sélection d'image avec option de suppression de selection de celle selectioné
                                                                            <div className="relative bg-slate-500">
                                                                                
                                                                                <svg onClick={() => setSelectedFile(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 absolute p-0.5 m-1 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-700 rounded-full">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                </svg>
                                
                                                                                <img
                                                                                    src={selectedFile}
                                                                                    className={`${loading && "animate-pulse"}`}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                }
                                                                {camp.image !=="" && ( // Affichage de la sélection d'image avec option de suppression de selection de celle selectioné
                                                                    <div className="relative bg-slate-500">
                                                                        
                                                                        <svg onClick={() => setCamp({ ...camp, image: "" })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 absolute p-0.5 m-1 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-700 rounded-full">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>

                                                                        <img
                                                                            src={camp.image}
                                                                            className=""
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    {!loading && (
                                                                        <div className="w-full">
                                                                            <Label htmlFor="image" value="Image"/>
                                                                            <div className="overflow-hidden" onClick={() => filePickerRef.current.click()} >
                                                                                <input type="file" id="image" ref={filePickerRef} onChange={addImageToCampaign} />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <button onClick={updateCampaign} className="bg-purple-400 hover:bg-purple-600 transition-all ease-in-out duration-500 w-full p-1.5 text-white rounded-lg" > Modifier </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </IdContexte.Provider>
                    <Footer/>
                </>
            }
            {user!=="marque" && user!=="influenceur" &&
                <>
                    <NavBar/>
                    <div className="flex justify-center items-center py-60 space-x-4">
                        <p className="text-purple-500 text-2xl font-medium">404 </p> <span className="text-purple-500 pl-6 border-l-2 border-purple-500 py-2"> Page not found </span> 
                    </div>
                    <Footer/>
                </>
            }
            {user==="influenceur" &&
                <>
                    <NavBar/>
                    <IdContexte.Provider value={val}>
                        <div className="py-20 mt-20">
                            <div>
                                <p className="text-purple-500 font-semibold text-4xl text-center">Campagnes disponibles</p>
                            </div>

                            <div className="bg-gray-100 p-2 lg:m-2">
                                
                                <div className="flex p-2">
                                    <div className="sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:gap-2 lg:gap-4">
                                    {
                                        influcamp?.map((camp, index) => {
                                            return(
                                                <div className="flex flex-col p-1 lg:p-2 m-1 lg:m-2 border relative">
                                                    <div className="flex bg-white justify-between p-2">
                                                        <p className="text-sm">Type: {camp.type.type} </p>
                                                        <button className="text-purple-500 rounded-full hover:bg-zinc-100 p-0.5">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <img src={camp.image} alt="" className="h-[200px] w-[1200px] lg:h-[250px] lg:w-[1200px]" />
                                                    </div>
                                                    <img src={camp.image} alt="" className="absolute bottom-10 left-6 h-[55px] w-[90px] p-0.5 border"/>
                                                    <div className="justify-items-end grid bg-white px-2 py-1">
                                                        <p className="text-sm">Terms</p>
                                                    </div>
                                                    <div className="flex bg-white justify-between px-2 py-1">
                                                        <p className="text-xs">Titre: <span className="text-sm">{camp.title}</span></p>
                                                        <button onClick={()=> postCampaign(camp)} className="text-sm font-medium text-purple-500 hover:text-purple-600 transition-all ease-in-out duration-700">Postuler</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                                <div>
                                    <Modal show={reopen} size="4xl" popup={true} onClose={()=>closeForm3()} className="" >
                                        <Modal.Header/>
                                        <Modal.Body>
                                            <div className="flex flex-col space-y-2 text-gray-600 ">
                                                <div className="p-2 border relative">
                                                    <img src={postCamp.image} alt="" className="h-auto lg:h-[500px] w-[1000px]" />
                                                    <div className="absolute bottom-0 flex space-x-2 items-center justify-start bg-zinc-400 w-full -ml-2">
                                                        <img src={postCamp.marqImg} alt="" className="h-[55px] w-[90px] p-0.5 z-20" />
                                                        <p className="text-lg text-white">{postCamp.marqName}</p>
                                                    </div>
                                                </div>
                                                <div className="p-1 space-y-1">
                                                    <p className="text-sm text-purple-500 font-medium">Description:</p>
                                                    <p>{postCamp.description}</p>
                                                </div>
                                                <div className="p-2 space-y-1 border border-purple-500 rounded-lg">
                                                    <p className="text-sm text-purple-500 font-medium">Conditions:</p>
                                                    <p>{postCamp.requir}</p>
                                                </div>
                                                <div className="p-1 mt-6 space-y-1 justify-items-end grid">
                                                    <div className="flex items-center space-x-4 justify-center">
                                                        <div className="flex space-x-2">
                                                            <div className="flex items-center h-5">
                                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" onChange={()=>setCtrl(true)}/>
                                                            </div>
                                                            <div className="text-sm">
                                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">J'acceopte les conditions de la campagne</label>
                                                            </div>
                                                        </div>
                                                            <Button disabled={!ctrl} onClick={()=> postulToCampaign(postCamp.id, postCamp.title, postCamp.image, postCamp.userId, postCamp.marqName, postCamp.marqImg )} className="px-2 text-sm font text-gray-200 rounded-lg bg-purple-400 hover:bg-purple-500 transition-all ease-in-out duration-700">Je postule</Button>
                                                      </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                        
                                    
                            </div>
                        </div>

                    </IdContexte.Provider>
                    <Footer/>
                </>
            }

        </AuthContextProvider>
    )
}