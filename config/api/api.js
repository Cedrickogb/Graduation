import {db, auth,storage} from '../firebase.config'
import {setDoc,updateDoc,query,where, collection,getDocs,getDoc,doc,deleteDoc, serverTimestamp, addDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword,signOut,updateProfile,updateEmail,updatePassword,deleteUser } from "firebase/auth";
import {ref,uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import Cookies from 'js-cookie';

const marquesCollectionRef=collection(db,'marques');
const campagnesCollectionRef=collection(db,'campagnes');
const postulatsCollectionRef=collection(db,'postulats');
const influenceursCollectionRef=collection(db,'influenceurs');
const contenueTypesCollectionRef=collection(db,'contenues');





const api = {

    /**
     * 
     * @param {string} image 
     * @param {string} location 
     * @returns un objet comportant le lien de l'image uploadé (imgUrl) et l'error sinon (imgError)
     */
    async uploadFile(image,location) { 
        const name = new Date().getTime();
        const storageRef = ref(storage, location+"/"+name);
        let imgUrl="";
        let imgError="";
        await uploadString(storageRef, image,"data_url")
            .then(async ()=>{
                imgUrl=await getDownloadURL(storageRef);
            })
            .catch((error)=>{
                imgError=error;
            });
        return {imgUrl,imgError};
    },

// Fonction de deconnexion de compte
    async logout(){
        var logoutSuccess=true;
        signOut(auth).then(() => {
            // Sign-out successful.
            Cookies.remove("userUid")
            Cookies.remove("userType")
            logoutSuccess=true;
        }).catch((error) => {
            // An error happened.
            logoutSuccess=false;
        });
        return logoutSuccess
    },


// Ensemble des fonctions concernant l'utilisateur de type marque
    // Fonction pour créer une marque
    async createMarque (image,data,password){
        const marque={response:null,error:null};
        await createUserWithEmailAndPassword(auth,data.email,password)
            .then(async (userCredential) => {
                marque.response=userCredential.user;
                let img={
                    imgUrl:""
                };
                if(image!=null){
                    img.imgUrl= await api.uploadFile(image,`usersPofils/${userCredential.user.uid}/`);
                }
                await setDoc(doc(db,"users",userCredential.user.uid),{uid:userCredential.user.uid,userType:"marque"})
                await setDoc(doc(db,"marques",userCredential.user.uid),{...data,img:img.imgUrl});
            })
            .catch((error) => {
                marque.error=error;
            });
        return marque;
        
    },

    /**
     * 
     * @returns récupère tous les marques qui sont enrégistrés
     */

    async getMarques(){
        const marques=await getDocs(marquesCollectionRef);
        return marques.docs?.map((doc)=>({id:doc.id,...doc?.data()}))
    },


    /**
     * 
     * @param {string} id 
     * @returns retoune la marque dont l'identifiant a été passé en paramètre
     */
    async getMarque (id){
        const marques=await getDoc(doc(db,'marques',id));
        return({id:id,...marques.data()});
    },


    //Fonction pour mettre à jour une marque 

    async updateMarque (data){
        let success=true;
        let fail=false;
        this.updateUserEmail(data.email)
        .then(async ()=>{
            const marque=doc(db,'marques',data.id);
            await updateDoc(marque,{...data}).then(()=>{
                success=true
            }).catch(()=>{
                fail=true
            })
        })
        .catch(()=>{
            fail=true
        })
        return(success,fail)
    },

    //Fonction pour supprimer un marque 

    async deleteMarque(id){
        const marque=doc(db,'marques',id);
        await deleteDoc(marque)
    },

////////////////////////////////////////////////////
//Ensemble des fonctions concernant les campagnes d'influence
    //Fonction de création d'une campagne d'influence
    async createCampagne(data) {
        try {
        const campagneData = { ...data }; // Copie des données pour éviter les modifications accidentelles
        const imageFile = campagneData.imageFile;
    
        // 1. Envoi de l'image vers le stockage Firebase
        const name = new Date().getTime().toString();
        const storageRef = ref(storage, `campagnes/${campagneData.title + name}/image`); // Modification du chemin d'accès
        await uploadBytes(storageRef, imageFile);
    
        // 2. Récupération de l'URL de l'image enregistrée
        const imageUrl = await getDownloadURL(storageRef);
        campagneData.image = imageUrl;
    
        // 3. Enregistrement de la campagne dans la collection "campagnes"
        const campagneRef = await addDoc(campagnesCollectionRef, campagneData);
        const campagneId = campagneRef.id;
    
        // 4. Retourner l'ID de la nouvelle campagne
        return campagneId;
        } catch (error) {
        console.error("Erreur lors de la création de la campagne :", error);
        throw error; // Renvoyer l'erreur pour la traiter au niveau supérieur si nécessaire
        }
    },
      

    /**
     * 
     * @returns récupère tous les campagnes publiées
     */

    async getCampagnes(){
        const campagnes=await getDocs(campagnesCollectionRef);
        return campagnes.docs?.map((doc)=>({id:doc.id,...doc?.data()}))
    },

    /**
     * 
     * @param {string} id 
     * @returns retoune les campagne d'une marque connecté
     */
    async getCampagne(userId) {
        try {
          const querySnapshot = await getDocs(collection(db, 'campagnes'));
          const campagnes = [];
      
          querySnapshot.forEach((doc) => {
            const campagneData = doc.data();
            if (campagneData.userId === userId) {
              const campagne = {
                id: doc.id,
                ...campagneData,
              };
              campagnes.push(campagne);
            }
          });
      
          return campagnes;
        } catch (error) {
          console.error("Erreur lors de la récupération des campagnes :", error);
          throw error;
        }
    },

    // recupère la campagne grace à l'id du post
    async getCampaign (id){
        const campaign=await getDoc(doc(db,'campagnes',id));
        return({id:id,...campaign.data()});
    },

    // mise à jour de campagne

    async updateCampagne (data){
        const campagne=doc(db,'campagnes',data.id);
        await updateDoc(campagne,{...data,}).then(()=>{
            success=true
        }).catch(()=>{
            fail=true
        })
        console.log
    },

    // fonction de suppression d'une campagne
    async deleteCampagne(id) {
        const campagneRef = doc(db, "campagnes", id);
        await deleteDoc(campagneRef)
        if (await deleteDoc(campagneRef)){
            alert("Suppression réussi")
        }else{
            alert("Echec de suppresion")
        }
    },
      

    // postulation pour une campagne
    async postulCampagne(data){
        let fail=true;
        await addDoc(collection(db,"postulats"),data).then(()=>{
            fail=false
        }).catch(()=>{
            fail=true
        })
        return fail
    },

    // récupérer les postulation de l'influenceur connecter
    async getPostuls(influ){
        const q=query(postulatsCollectionRef, where("influID", "==", influ));
        const querySnapshot = await getDocs(q);
        const data=[];
        querySnapshot.forEach((doc) => {
            data.push({id:doc.id,...doc.data()})
        });
        return data;
    },

    // récupérer les postulation envoyer à la marque connecté
    async getMarqPostul(marq){
        const q=query(postulatsCollectionRef, where("marqID", "==", marq), where ("etat", "==", "en attente"));
        const querySnapshot = await getDocs(q);
        const data=[];
        querySnapshot.forEach((doc) => {
            data.push({id:doc.id,...doc.data()})
        });
        return data;
    },
      



////////////////////////////////////////////////////
// Ensemble des fonctions concernant l'utilisateur de type influenceur
    // Fonction pour créer une influenceur
    async createInfluenceur (image,data,password){
        const influenceur={response:null,error:null};
        await createUserWithEmailAndPassword(auth,data.email,password)
            .then(async (userCredential) => {
                influenceur.response=userCredential.user;
                let img={
                    imgUrl:""
                };
                if(image!=null){
                    img.imgUrl= await api.uploadFile(image,`usersPofils/${userCredential.user.uid}/`);
                }
                await setDoc(doc(db,"users",userCredential.user.uid),{uid:userCredential.user.uid,userType:"influenceur"})
                await setDoc(doc(db,"influenceurs",userCredential.user.uid),{...data,img:img.imgUrl});
            })
            .catch((error) => {
                influenceur.error=error;
            });
        return influenceur;
        
    },

    /**
     * 
     * @returns récupère tous les influenceurs qui sont enrégistrés
     */

    async getInfluenceurs(){
        const influenceurs=await getDocs(influenceursCollectionRef);
        return influenceurs.docs?.map((doc)=>({id:doc.id,...doc?.data()}))
    },


    /**
     * 
     * @param {string} id 
     * @returns retoune l'influenceur dont l'identifiant a été passé en paramètre
     */
    async getInfluenceur (id){
        const influenceur=await getDoc(doc(db,'influenceurs',id));
        return({id:id,...influenceur.data()});
    },


    //Fonction pour mettre à jour une influenceur 

    async updateInfluenceur (data){
        let success=true;
        let fail=false;
        this.updateUserEmail(data.email)
        .then(async ()=>{
            const influenceur=doc(db,'influenceurs',data.id);
            await updateDoc(influenceur,{...data}).then(()=>{
                success=true
            }).catch(()=>{
                fail=true
            })
        })
        .catch(()=>{
            fail=true
        })
        return(success,fail)
    },

    //Fonction pour supprimer un influenceur 

    async deleteInfluenceur(id){
        const influenceur=doc(db,'influenceurs',id);
        await deleteDoc(influenceur)
    },

    async getContenueTypes(){
        const contenueTypes=await getDocs(contenueTypesCollectionRef)
        return contenueTypes.docs?.map((doc)=>({id:doc.id,...doc?.data()}))
    },



// Fonction pour vérifier l'utilisateur connecté
    /**
     * 
     * @param {string} uid 
     * @returns {Object}
     * Retoune un objet qui relate sur le type d'utilisateur et son uid
     */

        async getUserType(uid){
            const user=await getDoc(doc(db,'users',uid));
            return({...user.data()})
        },
}
export default api;