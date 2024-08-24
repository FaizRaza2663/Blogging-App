import { addDoc, auth, collection, createUserWithEmailAndPassword, db } from "../firebase.js"

const nameEle = document.getElementById("name")
const emailEle = document.getElementById("email")
const passwordEle = document.getElementById("password")
const signupBtn = document.getElementById("signup-Btn")


window.onload = () => {
    const userToken = JSON.parse(localStorage.getItem("usertoken"));

    if (userToken) {
        window.location.href = "/";
    }
};


signupBtn.addEventListener("click", ()=>{



    if(!nameEle.value || !emailEle.value ||!passwordEle.value ){
        alert("Please Fill Required Fields")
        return
    }



    
    

    createUserWithEmailAndPassword(auth, emailEle.value, passwordEle.value)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;

    // console.log(user);


    // return

    const docRef = await addDoc(collection(db, "users"), {
        name: nameEle.value,
        email: emailEle.value,
        userId :  user.uid
      });
      // console.log("Document written with ID: ", docRef.id);

      window.location.href = "./add-blog.html";
    // ...

    alert('Sign up ssuccessful.')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

    

})