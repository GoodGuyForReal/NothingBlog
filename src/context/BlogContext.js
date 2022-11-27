
import { async } from "@firebase/util";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../Firebase";
import { UserAuth } from "./AuthContext";


const BlogContext = createContext();

export function BlogContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState([])
    const [url, setUrl] = useState(null)
    const [blogs, setBlogs] = useState([])
    console.log(blogs)
    

    const { user } = UserAuth();

    useEffect(() => {
        const q = query(collection(db, 'Blogs'));
        const unsubscribe = onSnapshot(q, (query) => {
            let blogsarray = [];
            query.forEach((doc) => {
                blogsarray.push({ ...doc.data(), id: doc.id })
            });

            setBlogs(blogsarray)

        })
        return () => unsubscribe()

    }, [])

    //?images
    const personpp = ref(storage, `ppimage/${user?.email}`)
    useEffect(() => {
        getDownloadURL(personpp).then((url) => {
            return setUrl(url)
        }).catch((error) => console.log(error.message))

    }, [personpp])

    //? userInfoFirebase
    // const userdatafirebase = async () => {
    //     const docRef = doc(db, "usersinfo", `${user?.email}`);
    //     const docSnap = await getDoc(docRef);
    //     console.log("Document data:", docSnap.data());
    // }
    // console.log(userdatafirebase())



    useEffect(() => {

        try {
            onSnapshot(doc(db, "usersinfo", `${user?.email}`), (doc) => {
                setUserInfo(doc.data())
            });
        } catch (error) {

        }


    }, [user?.email])



    return (
        <BlogContext.Provider value={{ blogs, url, userInfo }}>
            {children}
        </BlogContext.Provider>
    )
}

export function UserBlog() {
    return useContext(BlogContext);
}