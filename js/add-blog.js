import { addDoc, auth, collection, db, onSnapshot, query, Timestamp, signOut  } from "../firebase.js";
const titleEle = document.getElementById("title")
const descriptionEle = document.getElementById("description")
const imageUrlEle = document.getElementById("imageUrl")
const button = document.getElementById("addBlogBtn")
const logOutBtn = document.getElementById('log-out-button')




const form = document.getElementById("home-form")
const blogGrid = document.getElementById("blogs")
window.onload = () => {
    const userToken = JSON.parse(localStorage.getItem("usertoken"));

    if (!userToken) {
        form.style.display = "none"
        window.location.href = '/'
    }
};

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
button.addEventListener("click", async (e) => {

    e?.preventDefault()
    button.setAttribute("disabled", true)
    button.innerHTML = "Loading..."

    try {

        const collectionRef = collection(db, "blogs")
        const data = { title: titleEle?.value, description: descriptionEle?.value, imageUrl: imageUrlEle?.value, createdOn: Timestamp.fromDate(new Date()), }
        await addDoc(collectionRef, data);
        titleEle.value = ""
        descriptionEle.value = ""
        imageUrlEle.value = ""



    } catch (e) {

        console.error("Error adding document: ", e);

    } finally {

        button.setAttribute("disabled", false)
        button.innerHTML = "Add Blog"
    }
})

getBlogs()


// console.log(signOut);


// log out process
logOutBtn.addEventListener('click', () => {

    signOut(auth).then(() => {
        // Sign-out successful.
    localStorage.clear()

    window.location.href = "/";

    Swal.fire("Sign-out successful.")


      }).catch((error) => {
        // An error happened.
        console.log(error);
        
      });

})
