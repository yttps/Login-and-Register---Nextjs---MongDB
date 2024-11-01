"use client";
// ประกาศ client component เพื่อที่จะใช้ state ต่างๆได้ **ประกาศบรรทัดแรกเท่านั้น
import React, { useState } from 'react'
import NavbarLoginPage from '../components/navbarLoginpage';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function RegisterPage() {

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [error , setError] = useState('');
    const [success, setSuccess] = useState('');

    const { data: session } = useSession();
    if(session) redirect("/welcome");

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(password != confirmPassword){
            setError('Password do not match!');
            return;
        }

        if(!name || !email || !password || !confirmPassword){
            setError('Please complete all inputs!');
            return;
        }

        try {
            
            const resCheckUser = await fetch('http://localhost:3000/api/checkUser' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });

            const { user } = await resCheckUser.json();

            if(user){
                setError("User already exists!");
                return;
            }

            const res = await fetch('http://localhost:3000/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email , password
                })
        });

        if(res.ok){
            setError('');
            setSuccess('User registration successfully!');
            (e.target as HTMLFormElement).reset();
        } else {
            console.log("User resgister failed");
        }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <NavbarLoginPage />
            <div className='container mx-auto py-5'>
                <h3>Register Page</h3>
                <hr className='my-3'/>
                <form onSubmit={handleSubmit}>

                    {error && (
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md my-2'>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md my-2'>
                            {success}
                        </div>
                    )}
                    
                    <input onChange={(e) => setName(e.target.value)} type="text"
                        placeholder='Enter your name' 
                        className='block bg-gray-300 p-2 my-2 rounded-md'/>
                    <input onChange={(e) => setEmail(e.target.value)}type="email"
                        placeholder='Enter your email' 
                        className='block bg-gray-300 p-2 my-2 rounded-md'/>
                    <input onChange={(e) => setPassword(e.target.value)}type="password"
                        placeholder='Enter your password' 
                        className='block bg-gray-300 p-2 my-2 rounded-md'/>
                    <input onChange={(e) => setConfirmPassword(e.target.value)}type="password"
                        placeholder='Confirm your password' 
                        className='block bg-gray-300 p-2 my-2 rounded-md'/>
                    <button type='submit'
                        className='bg-green-500 p-2 rounded-md text-white'
                    >Sign Up</button>
                </form>
                <hr className='my-3' />
                <p>Don not have an account? go to <Link className ='text-blue-500 hover:underline' href="/login">Login</Link> Page</p>
            </div>
        </div>
    )
}

export default RegisterPage;