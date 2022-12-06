import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserAuth } from '../context/AuthContext';
import { UserBlog } from '../context/BlogContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import BurgerIcon from './assets/Burger';
import SearchIcon from './assets/SearchIcon';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Nawbar() {


    const { user, LogOut } = UserAuth();
    const { userInfo } = UserBlog()
    const navigate = useNavigate();

    const HandleSignOut = async () => {

        try {
            LogOut(auth)
            navigate('/')
        } catch (error) {

        }
    };


    return (
        <Disclosure as="nav" className="bg-[#fff]">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center duration-300 rounded-md p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <BurgerIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <BurgerIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <NavLink to={'/'}>NothingBlog</NavLink>
                                </div>
                                <div className="hidden sm:ml-6 sm:block w-full">
                                    <div className="flex">

                                        {!user?.email ? <ul className="flex gap-4 items-center  w-full text-black p-3">

                                            <li className="hover:text-[#dbdbdb]">
                                                <NavLink to={'/'} className="block py-2 pr-4 pl-3" aria-current="page">Home</NavLink>
                                            </li>

                                            <li className="hover:text-[#dbdbdb]">
                                                <NavLink to={'/SignUp'} className="block py-2 pr-4 pl-3">SignUp</NavLink>
                                            </li>

                                            <li className="hover:text-[#dbdbdb]">
                                                <NavLink to={'/SignIn'} className="block py-2 pr-4 pl-3">SignIn</NavLink>
                                            </li>

                                        </ul> : <ul className="flex gap-4 items-center justify-center text-black p-3">

                                            <li className="hover:text-[#dbdbdb]">
                                                <NavLink to={'/'} className="block py-2 pr-4 pl-3" aria-current="page">Home</NavLink>
                                            </li>

                                            <li className="hover:text-[#dbdbdb]">
                                                <NavLink to={'/Discover'} className="flex items-center gap-2 py-2 pr-4 pl-3">Discover</NavLink>
                                            </li>

                                            <li className="hover:text-[#dbdbdb]">
                                                <button onClick={HandleSignOut}>Sign Out</button>
                                            </li>

                                        </ul>}

                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Profile */}
                                {!user?.email ? null : <NavLink to={'/Account'} className="bg-[#fe39a2] hover:bg-[#ff51ae] border border-[#fe39a2] py-2 px-3 duration-300 text-white rounded-md flex gap-2 items-center">
                                    <p className="block">@{userInfo?.displayName}</p>
                                    {userInfo?.ppImage === '' || userInfo?.ppImage === null || userInfo?.ppImage === undefined ? null : <img src={userInfo?.ppImage} alt={''} className='h-[28px] w-[28px] rounded-full' />}
                                </NavLink>}

                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {!user?.email ? <ul className="flex flex-col gap-4 items-center text-black p-3">

                                <li className="hover:text-[#dbdbdb]">
                                    <NavLink to={'/'} className="block py-2 pr-4 pl-3" aria-current="page">Home</NavLink>
                                </li>

                                <li className="hover:text-[#dbdbdb]">
                                    <NavLink to={'/SignUp'} className="block py-2 pr-4 pl-3">SignUp</NavLink>
                                </li>

                                <li className="hover:text-[#dbdbdb]">
                                    <NavLink to={'/SignIn'} className="block py-2 pr-4 pl-3">SignIn</NavLink>
                                </li>

                            </ul> : <ul className="flex flex-col gap-4 items-center text-black p-3">

                                <li className="hover:text-[#dbdbdb]">
                                    <NavLink to={'/'} className="block py-2 pr-4 pl-3" aria-current="page">Home</NavLink>
                                </li>

                                <li className="hover:text-[#dbdbdb]">
                                    <NavLink to={'/Discover'} className="block py-2 pr-4 pl-3">Discover</NavLink>
                                </li>

                                <li className="hover:text-[#dbdbdb]">
                                    <button onClick={HandleSignOut}>Sign Out</button>
                                </li>

                            </ul>}


                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
