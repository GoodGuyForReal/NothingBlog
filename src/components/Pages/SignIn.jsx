import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

import '../css/Style.css'

const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const { SignIn } = UserAuth();

    const HandleSubmit = async (event) => {
        event.preventDefault()
        try {
            await SignIn(email, password)
            navigate('/');
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    }
    const bannerImg = `https://images.unsplash.com/photo-1544194215-541c2d3561a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80`

    return (
        <div className=' h-[91vh] w-full'>

            <div className='SignInPage md:flex gap-4 items-center justify-center h-full overflow-y-hidden'>

                <div className='signinEventContainer h-full w-full md:w-1/2 flex flex-col items-center justify-center ' >
                    <div className='SignINleftbody flex w-full max-w-[50vh] px-3 flex-col gap-10'>
                        <div className='text-left'>
                            <h1 className='text-black font-bold text-[42px] mb-2'>SignIn</h1>
                            <p className='text-[#0007] text-[16px]'>Welcome please enter your deatil</p>
                            {error && <p className='bg-[#ff314d] text-[15px] rounded-md mt-5 duration-300 ease-out text-white p-3'>Email or Password wrong!</p>}
                        </div>
                        <form className='flex flex-col gap-5 text-center'>
                            <input onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())} type="text" placeholder='Email' className='p-3 border rounded-md border-[#2227] w-full text-black' />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='p-3 border rounded-md border-[#2227] w-full text-black' />
                            <button onClick={HandleSubmit} className='bg-[#ff4fad] text-white py-3 hover:duration-300 hover:bg-[#ff74be]'>Sign In</button>

                            <Link className='text-black underline hover:duration-300 hover:text-[#c1c1c1]' to={'/SignUp'}>Don't you have an account</Link>
                        </form>
                    </div>
                </div>


                <div className='signinImageContainer bg-white h-full md:w-1/2'>
                    <img src={bannerImg} alt={bannerImg} className='w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl' />
                </div>


            </div>

        </div>
    )
}

export default SignInPage