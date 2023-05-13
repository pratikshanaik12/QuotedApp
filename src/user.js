import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {db,auth} from '../firebase'

export const updateProfile = async(name, image, userId)=>{
    let url = '';
    // 'file' comes from the Blob or File API
    if(image !== null){
        const storage = getStorage();
        const storageRef = ref(storage, image.name);
        await uploadBytes(storageRef, image).then(async (snapshot) => {
            url = await getDownloadURL(snapshot.ref);
        })
    }

    const prevObj = doc(db, "users", userId);
    const docSnap = await getDoc(prevObj);
    const prevData = docSnap.data();
    prevData['name'] = name;
       
    prevData['profileURL'] = image === null? prevData['profileURL'] : url;
    await setDoc(prevObj, prevData);

}

export const getLoggedInUser = async()=>{
    const userId = auth.currentUser.uid;

    const obj = doc(db, "users", userId);
	const docSnap = await getDoc(obj);
	const data = docSnap.data();

    return {...data, uid:userId};
}