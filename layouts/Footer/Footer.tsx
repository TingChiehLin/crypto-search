import { FC } from "react";

const Footer:FC = () => {
    return  <footer className="w-full py-4 bg-lime-600 text-zinc-100 text-xs md:text-sm">
                <span className="flex justify-center items-center">
                    © Copyright 2023. Developed by
                    <a  className="font-semibold" target="_blank" 
                        rel="noopener noreferrer" 
                        href="https://github.com/TingChiehLin">
                        &nbsp;Ting Chieh Lin
                    </a>
                </span>
            </footer>
}

export default Footer;  