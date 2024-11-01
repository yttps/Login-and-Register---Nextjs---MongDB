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
    }, [session,router]);

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
            <div className='container mx-auto py-5'>
                <h3>Login Page</h3>
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
                        className='block bg-gray-300 p-2 my-2 rounded-md' />
                    <input type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        className='block bg-gray-300 p-2 my-2 rounded-md' />
                    <button type='submit'
                        className='bg-green-500 p-2 rounded-md text-white'
                    >Sign In</button>
                </form>
                <hr className='my-3' />
                <p>Already have an account? go to <Link className='text-blue-500 hover:underline' href="/register">Register</Link> Page</p>
            </div>
        </div>
    )
}

export default LoginPage;