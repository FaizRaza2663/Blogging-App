
const logOutbtn = document.getElementById('log-out-botton')
const logInbtn = document.getElementById('log-in-botton')
const signUpbtn = document.getElementById('signup-botton')



import { auth, collection, db, onSnapshot, query, signOut } from "./firebase.js";





window.onload = () => {
    const userToken = JSON.parse(localStorage.getItem("usertoken"));

    if (userToken) {
        logInbtn.style.display = "none"
        signUpbtn.style.display = "none"
   }
   if (!userToken) {
    logOutbtn.style.display = "none"
    
   }
};



// log out process
logOutbtn.addEventListener('click', () => {

    signOut(auth).then(() => {
        // Sign-out successful.
    localStorage.clear()

    window.location.reload()

    alert("Sign-out successful.")


      }).catch((error) => {
        // An error happened.
        console.log(error);
        
      });

})





const blogGrid = document.getElementById("blogs")


function convertTimestampToDate(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== 'number' || typeof timestamp.nanoseconds !== 'number') {
        throw new Error('Invalid timestamp object');
    }

    // Convert Firebase timestamp to JavaScript Date object
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

    // Format the date as a readable string
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
}

function getBlogs() {

    const collectionRef = collection(db, "blogs")
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        blogGrid.innerHTML = ""
        querySnapshot.forEach((doc) => {
            const data = doc?.data()
            blogGrid.innerHTML += `
            <div class="blog-card">
            <div class="blog-content">
            <img class="blog-image" src=${data?.imageUrl} />
                <h2 class="blog-title">${data?.title}</h2>
                <p class="blog-description">${data?.description}</p>
                <p class="blog-date">${convertTimestampToDate(data?.createdOn)}</p>
            </div>
        </div>
            `
        });
    });
    return unsubscribe
}
getBlogs()

