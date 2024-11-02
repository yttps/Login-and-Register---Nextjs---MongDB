"use client"
import React, { useState, useEffect } from 'react'
//ประกาศ client component เพื่อที่จะใช้ state ต่างๆได้
import NavbarLoginPage from '../components/navbarLoginpage';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) redirect("/welcome");
    }, [session, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            const res = await signIn("credentials", {
                email, password, redirect: false
            });

            if (res?.error) {
                setError("Invalid user");
                return;
            }

            router.replace("welcome");

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <NavbarLoginPage />
            <br />
            <div className='flex justify-center'>
                <div className='container py-5 border-2 p-5 pt-5 w-max shadow-2xl rounded-xl'>
                    <p className='pt-5 text-black font-bold text-xl'>Sign in</p>
                    <p className='pt-5 text-black font-bold text-sm'>Welcome back!</p>
                    <hr className='my-3' />
                    <form onSubmit={handleSubmit}>

                        {error && (
                            <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md my-2'>
                                {error}
                            </div>
                        )}

                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            className='block bg-white-300 p-2 my-2 rounded-md border-2 border-b-500 w-80' />
                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password'
                            className='block bg-white-300 p-2 my-2 rounded-md border-2 border-b-500 w-80' />
                        <Link className='text-blue-500 hover:underline pl-2' href="/ForgotPassword">Forgot password?</Link>
                        <br />
                        <br />
                        <button type='submit'
                            className='bg-blue-500 p-2 rounded-3xl text-white font-bold w-80 h-12 hover:bg-blue-600'
                        >Sign In</button>
                        <div className='flex pt-3 justify-center'>
                            <p className='px-3 text-gray-500 pb-2'>Or</p>
                        </div>
                        <div className='flex flex-col'>
                            <button type='submit'
                                className='bg-sky-600 p-2 rounded-3xl text-white font-bold w-80 h-12 mb-3 flex items-center justify-center space-x-2 hover:bg-sky-700'
                            ><span className="flex items-center space-x-2">
                                    <svg
                                        className='h-5 w-5 pr-2'
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                    </svg>
                                </span>Sign is with Facebook</button>
                            <button type='submit'
                                className='bg-white border border-black p-2 rounded-3xl text-black font-bold w-80 h-12 flex flex-center justify-center space-x-2 hover:bg-gray-200'
                            ><span className="flex items-center space-x-2">
                                    <svg
                                        className='h-6 w-6 pr-2 pt-0'
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 488 512">
                                        <path
                                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                    </svg>
                                </span>Sign in with Google</button>
                        </div>
                    </form>
                    <hr className='my-3' />
                    <p>Already have an account? go to <Link className='text-blue-500 hover:underline' href="/register">Register</Link> Page</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;