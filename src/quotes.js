import { doc, updateDoc, arrayUnion, collection, getDocs, getDoc, setDoc } from "firebase/firestore";
import {db, auth} from '../firebase'
import { v4 as uuidv4 } from 'uuid';

// Add Quote
export const addQuote = async ({ quote, authorName }) => {
  const quoteData = {
    quoteId: uuidv4(),
    quote: quote,
    authorName: authorName,
    timeStamp: new Date().getTime()
  };

  const userDocRef = doc(db, "users", auth.currentUser.uid);

  try {

    // Atomically add a new Quote to the "quotes" array field.
    await updateDoc(userDocRef, {
      quotes: arrayUnion(quoteData),
    });
    
    return { message: "Quote added successfully!" };
  } catch (error) {
    return { error: error.message };
  }
};


// Delete Quote if the Quote is written by that user
export const deleteQuote = async(
  quoteId, userId
)=>{

	const prevObj = doc(db, "users", userId);
	const docSnap = await getDoc(prevObj);
	const prevData = docSnap.data();
  
	for(let i=0;i<prevData['quotes'].length;i++){
	  if(prevData['quotes'][i]['quoteId'] === quoteId){
		 prevData['quotes'].splice(i, 1);
		break;
	  }
	}
	await setDoc(doc(db, "users", userId), prevData);
}

export const getAllQuotes = async(
) => {
  const allQuotes = []
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    for(let i=0;i<doc.data().quotes.length;i++){
      const obj = doc.data().quotes[i];
      obj['userID'] = doc.id;
	  obj['profileURL']= doc.data().profileURL;
      allQuotes.push(obj)
    }
  });
  const allQuotesN = allQuotes.sort((a,b) =>{
    return b.timeStamp-a.timeStamp;
  })
  return allQuotesN;
}

export const editQuote = async(
  quoteId, userId, newQuote, authorName
)=>{
  const prevObj = doc(db, "users", userId);
  const docSnap = await getDoc(prevObj);
  const prevData = docSnap.data();

  for(let i=0;i<prevData['quotes'].length;i++){
    if(prevData['quotes'][i]['quoteId'] === quoteId){
      prevData['quotes'][i]['quote'] = newQuote;
      prevData['quotes'][i]['authorName'] = authorName;
	  break;
    }
  }
  await setDoc(doc(db, "users", userId), prevData);
}