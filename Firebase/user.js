import fire from "../firebase";
// import { fbApp } from "firebase/app";

export const FBsignup = ({ email, password, fullName }, successFn, errorFn) => {
    const userData = {
        fullName: fullName,
        emailId:email,
        // profilePic: profilePic
        
      
    };
    //Random Number Gen Logic between 1 to 9 for DP
    const db = fire.firestore();
    //Firebase Authentication Signup
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // console.log("user created");
        let user = fire.auth().currentUser;
        // Pushing to Firestore
        db.collection("users")
          .doc(user.uid)
          .set({ id: user.uid, ...userData })
          .then(() => {
            // console.log("Pushed to Firestore");
          })
          .catch((er) => console.log(er));
      })
      .catch(function (error) {
        console.log(error);
        errorFn(error);
      });
  };