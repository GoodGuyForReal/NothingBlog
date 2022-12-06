
import { async } from "@firebase/util";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../Firebase";
import { UserAuth } from "./AuthContext";


const BlogContext = createContext();

export function BlogContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState([])
    const [url, setUrl] = useState('')
    const [blogs, setBlogs] = useState([])
    const [allUsers, setallUsers] = useState([])
    console.log(blogs)

    const { user } = UserAuth();
   
    useEffect(() => {
        const q = query(collection(db, 'discoverBlogs'));
        const unsubscribe = onSnapshot(q, (query) => {
            let blogsarray = [];
            query.forEach((doc) => {
                blogsarray.push({ ...doc.data(), id: doc.id })
            });

            setBlogs(blogsarray)

        })
        return () => unsubscribe()

    }, [])

    console.log(blogs)

    //?followersarray
    // useEffect(() => {
    //     const q = doc(db, 'usersinfo', `${user?.email}`);
    //     const unsubscribe = onSnapshot(q, (query) => {
    //         let followersarray = [];
    //         query.forEach((doc) => {
    //             followersarray.push({ ...doc.data(), id: doc.id })
    //         });

    //         setfollowers(followersarray)

    //     })
    //     return () => unsubscribe()

    // }, [])

    //?images
    
    const personpp = ref(storage, `ppimage/${user?.email}`)
    useEffect(() => {
        getDownloadURL(personpp).then((url) => {
            return setUrl(url)
        }).catch((error) => console.log(error.message))

    }, [personpp])

    //?all usersinfo
    useEffect(() => {
        const q = query(collection(db, 'users'));
        const unsubscribe = onSnapshot(q, (query) => {
            let userArr = [];
            query.forEach((doc) => {
                userArr.push({ ...doc.data()})
            });

            setallUsers(userArr)

        })
        return () => unsubscribe()

    }, [])
   
    //? userInfoFirebase
    useEffect(() => {

        try {
            onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
                setUserInfo(doc.data())
            });
        } catch (error) {

        }

    }, [user?.email])



    return (
        <BlogContext.Provider value={{ blogs, url, userInfo , allUsers}}>
            {children}
        </BlogContext.Provider>
    )
}

export function UserBlog() {
    return useContext(BlogContext);
}