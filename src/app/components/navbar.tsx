"use client"
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function navbar() {
    return (
        <nav className='bg-[#333] text-white p-5'>
            <div className="container mx-auto">
                <div className='flex justify-between items-center'>
                    <div>
                        <Link href="/">NextAuth</Link>
                    </div>
                    <ul className='flex '>
                        <li className='mx-3 hover:focus'>
                            <button onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Logout</button>
                        </li>
                    </ul>
                </div>
                <div></div>
            </div>
        </nav>
    )
}
//rfce
export default navbar;