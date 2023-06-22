import React,{useContext, useState} from 'react'
import {TextInput,Button,Spinner, Modal} from 'flowbite-react'
import {FaMailBulk} from 'react-icons/fa'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase.config';
import { useRouter } from 'next/router';
import PasswordInput from '../../components/utilities/passwordinput';
import { AuthContext, AuthContextProvider } from '../../components/context/AuthContext';
import api from '../../config/api/api';
import Cookies from "js-cookie";
import NavBar from "../../components/navbar";
import Footer from '../../components/footer';

export default function Login() {
  //Déclaration of variable and utilities
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [networkError, setNetworkError] = useState(false)
  const {dispatch}=useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  //Definition of fonctions

  const handleLogin=(e)=>{
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Get user login information 
      const user = userCredential.user;
      //Get user in users table with uid
      const userFetch = await api.getUserType(user.uid)
      Cookies.set("userUid",user.uid)
      Cookies.set("userType",userFetch.userType)
      // Redirect to dashbord
      router.replace("/")
      //Put user in currentUser state
      dispatch({type:"LOGIN",userUid:user.uid,userType:userFetch.userType})
    })
    .catch((error) => {
      setLoading(false)
      switch (error.message) {
        case "Firebase: Error (auth/network-request-failed).":
              setNetworkError(true);
              setErrorLogin(false)
          break;
      
        default:
          setErrorLogin(true)
          setNetworkError(false)
          break;
      }
    });
  }
  

  return (
    <AuthContextProvider>
      <NavBar/>
      <div className="relative py-20 flex justify-center items-center pt-40">
        <div className='absolute xl:top-15 xl:right-80 bg-purple-700 opacity-30 w-52 h-52 rounded-full blur-2xl -z-10'></div>
        <div className='absolute xl:top-10 xl:left-72 bg-pink-700 opacity-30 w-32 h-32 rounded-full blur-2xl -z-10'></div>
        <div className='absolute xl:bottom-5 xl:left-96 bg-amber-400 opacity-30 w-32 h-32 rounded-full blur-xl -z-10'></div>
        <Modal 
            show={networkError}
            size="md"
            popup={true}
            onClose={()=>{setNetworkError(false)}}
          >
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
                Problème de connexion. Nous vous vous prions bien de vérifier votre connexion avant de poursuivre!!!
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="gray"
                  onClick={() => setNetworkError(false)}
                  className="dark:bg-red-500 hover:dark:bg-red-600"
                >
                  ok
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white text-center">
                Connexion à la plateforme
            </h1>
            {/* <p className='mt-4'>Bienvenue</p> */}
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-4 my-10 mx-auto">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-white shadow-xl rounded-lg">
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                  <div className="space-y-4">

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <TextInput 
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        rightIcon={FaMailBulk}
                        id="email"
                        color={errorLogin?"failure":""} 
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder={"name@gmail.com"}
                        helperText={errorLogin&&<span className='text-red'>Email invalid</span>} 
                        required={true}
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <PasswordInput 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} 
                        helperText={errorLogin&&<span>mot de passe incorrect</span>}
                        color={errorLogin?"failure":""} 
                        placeholder=""
                        required={true}
                      />
                    </div>

                  </div>

                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Se rappeler de moi</label>
                          </div>
                      </div>
                      <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2">Mot de passe oublié</a>
                  </div>

                  <Button type="submit" className="flex justify-center items-center w-full text-white bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      {loading&&<Spinner className='mr-4'/>}
                      Sign in
                  </Button>
                  <div className="flex text-sm">
                    <p>Je n'ai pas un compte?</p>
                    <a href="/Inscriptions/Marque" className="ml-2">S'inscrire</a>
                  </div>
                  

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </AuthContextProvider>
  )
}
