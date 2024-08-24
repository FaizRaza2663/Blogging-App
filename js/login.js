import { auth, signInWithEmailAndPassword } from "../firebase.js"

const emailEle = document.getElementById("email")
const passwordEle = document.getElementById("password")
const loginBtn = document.getElementById("login-Btn")

window.onload = () => {
    const userToken = JSON.parse(localStorage.getItem("usertoken"));

    if (userToken) {
        window.location.href = "/";
    }
};

loginBtn.addEventListener("click", () => {


    if (
        !emailEle.value || !passwordEle.value
    ){
        alert("Please Fill required Fields")
        return
    }

    signInWithEmailAndPassword(auth, emailEle.value, passwordEle.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    
    

    localStorage.setItem("usertoken", JSON.stringify(user.accessToken))
    // localStorage.removeItem("usertoken")


    window.location.href = "./add-blog.html";
    // window.location.href = "/";
    // ...

    // alert('Log In successful.')
    alert("Log In successful!");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

})


