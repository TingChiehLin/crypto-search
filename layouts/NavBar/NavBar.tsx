"use client" 

import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Logo from '@/public/logo.svg'
import Link from "next/link";

const NavBar: FC = () => {
    const router = useRouter();   
    const handleRefresh =  () => {
        router.refresh();
    };
    return (
        <div className="w-full py-6 bg-lime-500">
            <nav className="w-auto max-w-7xl mx-auto px-6 md:px-8 2xl:px-0 flex items-center justify-between">
                <Link href={"/"}>
                    <Image
                        src={Logo}
                        alt="logo"
                        className='w-12 cursor-pointer'
                        width={0}
                        height={0}
                        sizes='100vw'
                        onClick={handleRefresh}
                    />
                </Link>
                <ul className="flex gap-x-6 text-zinc-50 font-semibold text-sm md:text-base">
                    <Link href={"/"} className="cursor-pointer hover:text-lime-900">Home</Link>
                    <Link href={"/about"} className="cursor-pointer hover:text-lime-900">About</Link>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;