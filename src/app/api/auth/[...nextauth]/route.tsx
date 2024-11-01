import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user"; 
import bcrypt from 'bcryptjs';


const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },

            async authorize(credentials) {

                const { email , password } = credentials as {email: string; password: string};

                try {
                    
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if(!user){
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password , user.password);

                    if(!passwordMatch){
                        return null;
                    }

                    return user;

                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    session : {
        strategy: "jwt" as const,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handle = NextAuth(authOptions);
export { handle as GET, handle as POST };