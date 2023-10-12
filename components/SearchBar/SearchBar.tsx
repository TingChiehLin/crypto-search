import { FC } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchPropType {  
    id: string,
    label: string,
    type: string,
    name: string,
    value: string,
    error: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
}

const SearchBar:FC<SearchPropType> = ({...props}) => {  
    const isinvalid = props.error !== "";
    const icon = isinvalid ? "top-1/4 -translate-y-1/4" : "top-1/2 -translate-y-1/2";
    const borderColor = isinvalid ? "border-red-500" : "border-zinc-300";
    return (
        <div className="relative w-72">
            <label htmlFor={props.id} className="sr-only">
                {props.label}
            </label>
            <FiSearch
                className={`text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2
                           ${icon}`}
                size={"18px"}
            />
            <input 
                className={`w-full pl-12 pr-6 py-3.5 rounded-xl outline-none text-sm text-zinc-500
                            border-[1px] focus:border-zinc-300
                            ${borderColor}
                          `}
      
                {...props}
            />
            {isinvalid && <span className="text-red-500 text-xs">{props.error}</span>}
        </div>
    );
}

export default SearchBar;
