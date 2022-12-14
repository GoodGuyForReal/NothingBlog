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

                const fireBaseTimeStamp = Timestamp.fromDate(new Date())
                const creationDate = fireBaseTimeStamp.toDate().toDateString();
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

    const bannerImg = `https://images.unsplash.com/photo-1544194215-541c2d3561a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80`

    return (
        <div className='h-[91vh] w-full'>

            <div className='SignUpPage grid grid-cols-2 gap-4 items-center justify-center h-full'>

                <div className='h-full w-full flex flex-col items-center justify-center ' >
                    <div className='SignUpleftbody flex flex-col gap-10'>
                        <div className='text-left'>
                            <h1 className='text-black font-bold text-[42px] mb-2'>SignUp</h1>
                            <p className='text-[#0007] text-[16px]'>Welcome please enter your deatil</p>
                            {error && <p className='bg-[#ff314d] text-[15px] rounded-md mt-5 duration-300 ease-out text-white p-3'>{error}</p>}
                        </div>
                        <form className='flex flex-col gap-5 text-center'>
                            <input onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder='User Name' className='p-3 border rounded-md border-[#2227] w-[50vh] text-black' />
                            <input onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())} type="text" placeholder='Email' className='p-3 border rounded-md border-[#2227] w-[50vh] text-black' />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='p-3 border rounded-md border-[#2227] w-[50vh] text-black' />
                            <input onChange={(e) => setVerify(e.target.value)} type="password" placeholder='Verify your password' className='p-3 border rounded-md border-[#2227] w-[50vh] text-black' />
                            <button onClick={HandleSubmit} className='bg-[#ff4fad] text-white py-3 hover:duration-300 hover:bg-[#ff74be]'>Sign Up</button>
                            <Link className='text-black underline hover:duration-300 hover:text-[#c1c1c1]' to={'/SignIn'}>Do you have an account</Link>
                        </form>
                    </div>

                </div>

                <div className='bg-white h-full w-full visible'>
                    <img src={bannerImg} alt={bannerImg}  className='w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl' />
                </div>

            </div>

        </div>
    )
}

export default SignUp