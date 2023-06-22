import React, { useState,useContext, useEffect } from "react";
import { Label , TextInput, Button , Select ,Spinner, ToggleSwitch } from "flowbite-react";
import api from "../../config/api/api";
import {storage} from '../../config/firebase.config'
import PasswordInput from '../../components/utilities/passwordinput';
import { AuthContext, AuthContextProvider } from '../../components/context/AuthContext';
import { useRouter } from "next/router";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaPlus } from "react-icons/fa";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";

const InfluenceurInscription = () => {
    const router = useRouter();
    const {dispatch}=useContext(AuthContext)
    const [perc, setPerc] = useState(null)
    const [contenueTypes, setContenueTypes] = useState([])
    const [contenue, setContenue] = useState([])
    const [influenceur, setInfluenceur] = useState({
        lastName:"",
        firstName:"",
        sex:"",
        email:"",
        phone:"",
        adresse:"",
        img:"",
        contenue: []
    })
    const [passWord, setPassWord] = useState("")
    const [image, setImage] = useState(null);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const verifyUpload=()=>{
        return perc !== null && perc < 100
    }
    const verifyTel=()=>{
        const expresion= new RegExp(/^[2|4|5|6|9]{1}[0-9]{7}$/)
        if(!influenceur.phone)
        return true 
        else if(influenceur.phone && expresion.test(influenceur.phone)) 
        return true;
        else
        return false
    }
    const verifyPasswords=()=>{
        return confirmPassword!==passWord || passWord.length<8 ? true : false;
    }


    const hadleUploadImage=(e)=>{
        const img=e.target.files[0];
        if (img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        const reader=new FileReader();
        reader.readAsDataURL(img)
        reader.onload=async (readerEvent)=>{
            const url= api.uploadFile(readerEvent.target.result,'usrsProfils')
            console.log(url)
            setImage(readerEvent.target.result)
        }
        }else{
        setImage(null)
        }
    }

// fonction de création du compte
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        console.log(influenceur)

        const result = await api.createInfluenceur(image,influenceur,passWord)
        if(result.error!==null){
        console.log(error)
            setLoading(false)
        }else{
            router.replace("/login")
        }
    };

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
            setInfluenceur({...influenceur,contenue:data})
        }
        }else{
            data.push(cont[0]);
            setContenue(data)
            setInfluenceur({...influenceur,contenue:data})
        }
    }

    const handleDelete = (id) => {
        const cont = contenue.filter((med) => med.id !== id)
        setContenue(cont)
        setInfluenceur({...influenceur,contenue:cont})
    }


    useEffect(()=>{
        fetchContenueTypes()
    },[])

// Récupération des différents types de contenue d'influenceur
    const fetchContenueTypes = async () => {
        api.getContenueTypes().then(data =>{
            console.log(data),
            setContenueTypes(data)
        })
    }

  return (
    <AuthContextProvider>
        <NavBar/>
        <div className="animate-slidedown">
            <div className="p-4 md:m-4 md:mx-52 md:px-6 bg-slate-50">
                <div className="flex justify-center"> 
                    <h1 className="text-4xl font-semibold text-purple-400 p-4">Inscription Influenceur</h1>
                </div>
                <p className="text-sm m-2 text-gray-700">Vous êtes une marque ?<a href="/Inscriptions/Marque" className="text-purple-500"> Cliquez ici</a> | Vous avez un compte ? <a href="/login" className="text-purple-500"> Connectez-vous ici</a> </p>
                <form className="flex flex-col gap-4 p-4 md:p-8 shadow-xl bg-white rounded-lg" onSubmit={handleSubmit}>
                    <div className=" ">
                    <div className="flex space-x-4">

                        <div className="w-1/3 flex items-center justify-center">
                            <div className="flex justify-center items-center">
                                <div className="relative w-24 ">
                                    <img
                                    src={
                                        image
                                        ? image
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    }
                                    className=" w-24 h-24 rounded-full"
                                    alt=""
                                    />
                                    <div className="absolute bottom-1 right-2 bg-purple-400 w-5 h-5 rounded-full flex justify-center items-center">
                                    <label htmlFor="file">
                                        <FaPlus className="text-white"/>
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        accept="/image/*"
                                        onChange={hadleUploadImage}
                                        style={{ display: "none" }}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-2/3 flex flex-col space-y-3">

                            <div>
                                <div>
                                    <Label htmlFor="nom" value="Nom"/>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="nom"
                                        type="text"
                                        placeholder="Nom"
                                        required={true}
                                        shadow={true}
                                        value={influenceur.lastName}
                                        onChange={(e)=>setInfluenceur({...influenceur,lastName:e.target.value})}
                                    />
                                </div>
                                <div className="mt-3">
                                    <Label htmlFor="prenom" value="Prenom" />
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="prenom"
                                        type="text"
                                        placeholder="Prenom"
                                        required={true}
                                        shadow={true}
                                        value={influenceur.firstName}
                                        onChange={(e)=>setInfluenceur({...influenceur,firstName:e.target.value})}
                                    />
                                </div>

                                <div className="mt-3">
                                    <Label htmlFor="sex" value="Sexe" />
                                    <Select
                                        className=" focus:border-emerald-400"
                                        id="sex"
                                        type="select"
                                        required={true}
                                        shadow={true}
                                        value={influenceur.sex}
                                        onChange={(e)=>setInfluenceur({...influenceur,sex:e.target.value})}
                                        >
                                        <option value="M" selected>Masculin</option>
                                        <option value="F">Femme</option>
                                    </Select>
                                </div>

                                <div className="mt-3">
                                    <Label htmlFor="date" value="Date" />
                                    <TextInput
                                        className="rounded-none focus:border-emerald-400"
                                        id="date"
                                        type="date"
                                        required={true}
                                        shadow={true}
                                        value={influenceur.birthdate}
                                        onChange={(e)=>setInfluenceur({...influenceur,birthdate:e.target.value})}
                                    />
                                </div>

                            </div>

                            <div>

                                <div>
                                    <Label htmlFor="email" value="Email" />
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="email"
                                        type="email"
                                        placeholder="name@company.com"
                                        required={true}
                                        shadow={true}
                                        value={influenceur.email}
                                        onChange={(e)=>setInfluenceur({...influenceur,email:e.target.value})}
                                    />
                                </div>
                                <div className="mt-3">
                                    <Label htmlFor="tel" value="Téléphone" />
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="tel"
                                        type="telephone"
                                        placeholder="98462982"
                                        color={!verifyTel()?"failure":""}
                                        helperText={!verifyTel()?"Le numero de téléphone est invalid. Vueillez bien entrez un numéro valid du bénin":""}
                                        required={true}
                                        shadow={true}
                                        value={influenceur.phone}
                                        onChange={(e)=>setInfluenceur({...influenceur,phone:e.target.value})}
                                    />
                                </div>
                                <div className="mt-3">
                                    <Label htmlFor="adresse" value="Adresse" />
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="adresse"
                                        type="text"
                                        placeholder="Adresse"
                                        required={true}
                                        shadow={true}
                                        value={influenceur.adresse}
                                        onChange={(e)=>setInfluenceur({...influenceur,adresse:e.target.value})}
                                    />
                                </div>                   
                            </div>

                            <div>
                                <Label htmlFor="nom" value="Type de contenue" />
                                <div className="w-full mb-4 flex  justify-center items-center">
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


                            <div className="">
                                <div className="flex flex-col md:flex-row justify-center items-center">
                                    <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 w-2/3">
                                        <div className="relative md:w-1/2 w-full">
                                            <div className="mb-2 block">
                                                <Label htmlFor="password" value="Mot de passe" />
                                            </div>
                                            <PasswordInput
                                                className="focus:border-purple-400"
                                                id="password"
                                                required={true}
                                                shadow={true}
                                                // color={verifyPasswords()?"failure":""}
                                                helperText={passWord!==""&&passWord.length<8&&<span>Mot de passe trop faible nous recommandons 8 charactères</span>}
                                                value={passWord}
                                                onChange={(e)=>setPassWord(e.target.value)}
                                            />
                                        </div>
                                        <div className="relative md:w-1/2 w-full">
                                            <div className="mb-2 block">
                                                <Label
                                                    htmlFor="confpassword"
                                                    value="Confirmer le mot de passe"
                                                />
                                            </div>
                                            <PasswordInput
                                                className="focus:border-purple-400"
                                                id="confpassword"
                                                value={confirmPassword}
                                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                                // color={verifyPasswords()?"failure":""}
                                                required={true}
                                                shadow={true}
                                            />
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>    
                    </div>
                    
                    <div className="flex justify-center">
                    <Button type="submit" disabled={verifyPasswords() || !verifyTel() || verifyUpload()} className="bg-purple-400 hover:bg-purple-600 transition-all ease-in-out duration-500 w-[400px]">
                        {loading&&<Spinner className="mr-4"/>}
                        Enrégistrer
                    </Button>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
    </AuthContextProvider>
  );
};




export default InfluenceurInscription;
    