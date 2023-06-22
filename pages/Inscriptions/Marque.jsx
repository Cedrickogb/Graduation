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
/* eslint-disable */
const MarqueInscription = () => {
    const router = useRouter();
  const {dispatch}=useContext(AuthContext)
  const [perc, setPerc] = useState(null)
//   const [allergies, setAllergies] = useState([])
  const [marque, setMarque] = useState({
    firstName:"",
    lastName:"",
    personalEmail:"",
    name:"",
    domaine:"",
    email:"",
    phone:"",
    adresse:"",
    img:""
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
    if(!marque.phone)
      return true 
    else if(marque.phone && expresion.test(marque.phone)) 
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
     const result = await api.createMarque(image,marque,passWord)
     if(result.error!==null){
      console.log(error)
        setLoading(false)
     }else{
        router.replace("/login")
     }
    
    
  };

  return (
    <AuthContextProvider>
        <NavBar/>
        <div className="animate-slidedown mt-20">
            <div className="p-4 md:m-4 md:mx-52 md:px-6 bg-slate-50">
                <div className="flex justify-center"> <h1 className="text-4xl font-semibold text-purple-400 p-4">Inscription Marque</h1></div>
                <p className="text-sm m-2 text-gray-700">Vous un influenceur ?<a href="/Inscriptions/Influenceur" className="text-purple-500"> Cliquez ici</a> | Vous avez un compte ? <a href="/login" className="text-purple-500"> Connectez-vous ici</a> </p>
                <form className="flex flex-col gap-4 p-4 md:p-8 shadow-xl bg-white rounded-lg" onSubmit={handleSubmit}>

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

                        <div className="w-2/3 flex flex-col space-y-4">
                            <div>
                                <div>
                                    <h2 className="m-2 text-gray-700 font-bold">Gestionnaire du compte</h2>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="nom"
                                            value="Nom"
                                        />
                                        {/* <span className="text-sm text-gray-400 ml-2">(gestionnaire du compte)</span> */}
                                    </div>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="nom"
                                        type="text"
                                        placeholder="Nom"
                                        required={true}
                                        shadow={true}
                                        value={marque.lastName}
                                        onChange={(e)=>setMarque({...marque,lastName:e.target.value})}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="prenom"
                                            value="Prenom"
                                        />
                                        {/* <span className="text-sm text-gray-400 ml-2">(gestionnaire du compte)</span> */}
                                    </div>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="prenom"
                                        type="text"
                                        placeholder="Prenom"
                                        required={true}
                                        shadow={true}
                                        value={marque.firstName}
                                        onChange={(e)=>setMarque({...marque,firstName:e.target.value})}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email"
                                            value="Votre Email"
                                        />
                                        {/* <span className="text-sm text-gray-400 ml-2">(gestionnaire du compte)</span> */}
                                    </div>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="email"
                                        type="email"
                                        placeholder="name@gmail.com"
                                        required={true}
                                        shadow={true}
                                        value={marque.personalEmail}
                                        onChange={(e)=>setMarque({...marque,personalEmail:e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <h2 className="m-2 text-gray-700 font-bold">Marque</h2>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="nom"
                                            value="Nom de l'entreprise"
                                        />
                                    </div>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="nom"
                                        type="text"
                                        placeholder="Nom"
                                        required={true}
                                        shadow={true}
                                        value={marque.name}
                                        onChange={(e)=>setMarque({...marque,name:e.target.value})}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="domaine"
                                            value="Domaine"
                                        />
                                    </div>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="domaine"
                                        type="text"
                                        placeholder="domaine"
                                        required={true}
                                        shadow={true}
                                        value={marque.domaine}
                                        onChange={(e)=>setMarque({...marque,domaine:e.target.value})}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email"
                                            value="Email"
                                        />
                                    </div>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="email"
                                        type="email"
                                        placeholder="name@company.com"
                                        required={true}
                                        shadow={true}
                                        value={marque.email}
                                        onChange={(e)=>setMarque({...marque,email:e.target.value})}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="tel"
                                            value="Téléphone"
                                        />
                                    </div>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="tel"
                                        type="telephone"
                                        placeholder="98462982"
                                        color={!verifyTel()?"failure":""}
                                        helperText={!verifyTel()?"Le numero de téléphone est invalid. Vueillez bien entrez un numéro valid du bénin":""}
                                        required={true}
                                        shadow={true}
                                        value={marque.phone}
                                        onChange={(e)=>setMarque({...marque,phone:e.target.value})}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="adresse"
                                            value="Adresse"
                                        />
                                    </div>
                                    <TextInput
                                        className="rounded-none focus:border-purple-400"
                                        id="adresse"
                                        type="text"
                                        placeholder="Adresse"
                                        required={true}
                                        shadow={true}
                                        value={marque.adresse}
                                        onChange={(e)=>setMarque({...marque,adresse:e.target.value})}
                                    />
                                </div>                   
                            </div>



                            <div className="">
                                <div className="flex flex-col md:flex-row justify-center items-center">
                                <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 w-2/3">
                                    <div className="relative md:w-1/2 w-full">
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="password"
                                                value="Mot de passe"
                                            />
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




export default MarqueInscription;
    