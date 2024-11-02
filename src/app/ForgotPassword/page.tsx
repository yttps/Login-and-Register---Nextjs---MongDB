"use client"
import React from 'react'
import Navbar from '../components/navbarLoginpage'

export default function forgotpassword() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        //check email in DB 
    }

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <div className='container py-5 border-2 p-5 pt-5 w-max shadow-2xl rounded-xl'>
                    <p className='pt-5 text-black font-bold text-xl'>Forgot your password</p>
                    <p className='pt-5 text-black font-bold text-sm'>Enter your Email.</p>
                    <hr className='my-3' />
                    <form onSubmit={handleSubmit}>
                        <input type="email"
                            placeholder='Enter your email'
                            className='block bg-white-300 p-2 my-2 rounded-md border-2 border-b-500 w-80' />
                        <br />
                        <button type='submit'
                            className='bg-green-500 p-2 rounded-3xl text-white font-bold w-80 h-12 hover:bg-green-600'
                        >Submit</button>
                    </form>
                </div>
            </div>

        </div>

    )
}