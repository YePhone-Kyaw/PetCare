import { db } from "@/app/_utils/firebase";
import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";


export async function dbAddNewPet(userId, petPostObj) {
    try {
        let petCollection = collection(db, "users", userId, "pet-posts");
        const addedPetPost = await addDoc(petCollection, petPostObj);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

export async function dbGetAllPosts(userId, updatePetList) {
    const petCollection = collection(db, "users", userId, "pet-posts");
    const petPostQuery = query(petCollection);
    const querySnapshot = await getDocs(petPostQuery);
    const petPostList = [];
    querySnapshot.forEach( (doc) => {
        let thisPost = {
            id: doc.id,
            ...doc.data()
        }
        petPostList.push(thisPost);
    } );
    updatePetList(petPostList);
}