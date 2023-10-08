import { NextPage } from "next";

import H1 from "@/components/H1";
import {FaSquareGithub} from 'react-icons/fa6';

const AboutPage:NextPage = () => {
    return (
        <>
            <H1 title={"About"}/>
            <div className="w-full max-w-2xl flex flex-col gap-y-2 leading-loose text-sm md:text-base">
                <p>Crypto Search App is inspired by 
                    <a 
                        href="https://www.coingecko.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-lime-600">
                        &nbsp;coingecko
                    </a> 
                </p>   
                <p>My Task is to design better experience within 2 days</p>         
                <div className="flex gap-x-2">
                    <p>You can find source code:</p>
                    <a
                        className="inline-block"
                        href="https://github.com/TingChiehLin/crypto-search"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaSquareGithub size={"32px"} className='cursor-pointer'/>
                    </a>
                </div>    
            </div>
        </>
    )
}

export default AboutPage;

