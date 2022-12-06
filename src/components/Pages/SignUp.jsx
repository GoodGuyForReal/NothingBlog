import { doc, setDoc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { db, storage } from '../../Firebase'
import { ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
const SignUp = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verify, setVerify] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const img = 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'

    const { SignUp } = UserAuth()
    const uuid = uuidv4()

    const HandleSubmit = async (event) => {
        event.preventDefault()


        if (password !== verify) {
            return setError('Passwords do not match');
        }

        try {
            await SignUp(email, password)

            if (img) {
                const imageRef = ref(storage, `ppimage/${email}`)
                uploadBytes(imageRef, img)

                const creationDate = Timestamp.fromDate(new Date())
                await setDoc(doc(db, 'users', email), {
                    displayName: displayName,
                    email: email,
                    joinedDate: creationDate,
                    ppImage: img,
                    uuid: uuid,
                })

            }
            navigate('/');
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
        }
    }


    return (
        <div className='h-[100vh] w-full bg-black'>

            <div className='SignUpPage items-center justify-center h-[100vh]'>

                <div className='h-full w-full flex flex-col items-center justify-center ' >
                    <div className='SignUpleftbody flex flex-col gap-10'>
                        <div className='text-left'>
                            <h1 className='text-white font-medium text-[38px]'>Welcome</h1>
                            <p className='text-[#fff7] text-[15px]'>Welcome please enter your deatil</p>
                            {error && <p className='bg-white text-[15px] rounded-md mt-5 duration-300 ease-out text-black p-3'>{error}</p>}
                        </div>
                        <form className='flex flex-col gap-5 text-center'>
                            <input onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder='User Name' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                            <input onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())} type="text" placeholder='Email' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                            <input onChange={(e) => setVerify(e.target.value)} type="password" placeholder='Verify your password' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                            <button onClick={HandleSubmit} className='bg-white text-black py-3 hover:duration-300 hover:bg-[#dedede]'>Sign Up</button>
                            <Link className='text-white underline hover:duration-300 hover:text-[#c1c1c1]' to={'/SignIn'}>Do you have an account</Link>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SignUp