"use client";
import React from 'react'
import Navbar from '../components/navbar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


function WelcomePage() {

    const { data: session } = useSession();
    console.log(session);

    if(!session) redirect('/login');
 
    return (
        <div>
            <Navbar />
            <div className='container mx-auto'>
                <h3 className='text-3xl my-3'>Welcome user {session?.user?.name}</h3>
                <hr className='my-3' />
            </div>
        </div>
    )
}

export default WelcomePage;