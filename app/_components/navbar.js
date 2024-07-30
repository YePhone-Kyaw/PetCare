"use client";

import { dbGetAllPosts } from "@/app/_services/adoption-service";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/app/images/logo.png"


export default function NavBar() {
    // const logo = "./app/images/logo.png";
    const { user, firebaseSignOut  } = useUserAuth() || {};

    async function handleSignOut() {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    const [petPostList, setPetPostList] = useState([]);

    useEffect( () => {
        if (user) {
            dbGetAllPosts(user.uid, setPetPostList)
        }
    }, [user] );

    return (
        <main className="bg-navigation text-black font-" >
            <header>
                <b>
                <h1 className="text-4xl" >Pet Care</h1>
                </b>
            </header>
            <div>
                {user ? (
                    <button className="flex bg-navigation rounded-md p-2 hover:bg-hover-style" onClick={handleSignOut} >
                        Logout
                    </button>

                ) : 
                null }
            </div>
        </main>
    );
}