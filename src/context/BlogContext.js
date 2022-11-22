import { collection, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../Firebase";
import { UserAuth } from "./AuthContext";


const BlogContext = createContext();

export function BlogContextProvider({ children }) {

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

    const personpp = ref(storage, `ppimage/${user?.email}`)
    useEffect(() => {
      
      getDownloadURL(personpp).then((url) => {
        return setUrl(url)
      }).catch((error) => console.log(error.message))
  
    }, [personpp])



    
    return (
        <BlogContext.Provider value={{ blogs , url }}>
            {children}
        </BlogContext.Provider>
    )
}

export function UserBlog() {
    return useContext(BlogContext);
}