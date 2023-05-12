import { useToast } from "@chakra-ui/react";
import { getAuth, confirmPasswordReset, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase'
import { getAllQuotes } from "@/quotes";
import { getLoggedInUser } from "@/user";

export const AuthContext = createContext();

const auth = getAuth();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const toast = useToast();


    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            setLoading(true);
            if (user) {
                const loggedData = await getLoggedInUser();
                setUser(loggedData);
            } else {
                setUser(null)
                router.push("/login")
                setLoading(false);
              // User is signed out
            }
          });
    },[])

    const handleRegister = async(signUpObj) => {
        try {


            const {fullname, email, password}= signUpObj

            const nameRegex = /^[A-Z][a-z]/;
            

            if (!fullname || !nameRegex.test(fullname)) {
                throw new Error('Invalid full name');
            }

            

            
              
              


            //console.log('from context',signUpObj)
            await createUserWithEmailAndPassword(auth, email, password).then(
                async (userCredential) => { 
                    
                    const userData = {
                        name: fullname,
                        email: email,
                        profileURL: '',
                        quotes: []
                    }

                    const docRef = doc(db, "users",userCredential.user.uid)
                    await setDoc(docRef, userData)
                   // Signed in 
                    updateProfile(auth.currentUser, {
                        displayName: fullname
                    }).then(()=>{
                        toast({
                            title:"User registered successfully!",
                            status:"success",
                            position:"top-left",
                            variant:"subtle"
                        });
                    })
            
                    setTimeout(() => router.push("/"), 2000)
                  }
            ).catch(e => {
                console.log(e)
                toast({
                    title:`${e.code}: ${e.message}`,
                    status:"error",
                    position:"top-left",
                    variant:"subtle"
                });
                throw {error: true}
            }) 
        } catch (error) {
            throw error
        }

    }

    const handleLogin = async(loginObj) => {
        try {
            const {email, password} = loginObj
            signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                
                toast({
                    title:`Welcome!`,
                    status:"success",
                    position:"top-left",
                    variant:"subtle"
                });
                
                router.push("/")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast({
                    title:`${errorCode}: ${errorMessage}`,
                    status:"error",
                    position:"top-left",
                    variant:"subtle"
                });
                throw {errorMessage}
            });
            
        } catch (error) {
            throw error
        }
    }

    const handleLogout = () => {
        signOut(auth).then(()=>{
            router.push('/login')
            toast({
                title:`User Logged Out!!`,
                status:"success",
                position:"top-left",
                variant:"subtle"
            });
        })}
        const [quoteList, setQuoteList] = useState([])

        const fetchQuotes = async()=>{
            try {
              const quoteL = await getAllQuotes()
              setQuoteList(quoteL)
              return
            } catch (error) {
              console.log("Error getting quote list")
            }
           }

    return <AuthContext.Provider value={{handleRegister,handleLogin, user, loading, handleLogout, setUser, fetchQuotes, quoteList}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;