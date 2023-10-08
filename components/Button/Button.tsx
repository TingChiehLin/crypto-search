
type ButtonField = "button" | "submit" | "reset" | undefined;

interface ButtonTypeProp {
    title: string,  
    type?: ButtonField,
    isDisable?: boolean,
    children?: React.ReactNode,
    onClick?: () => void
}

const Button:React.FC<ButtonTypeProp> = ({type = "button", ...props}) => {
    return (
        <button
            type={type}
            onClick={props.onClick}
            className={`inline-flex items-center rounded-xl bg-zinc-200 px-4 py-3 
                        text-xs md:text-sm font-semibold text-zinc-900
                        hover:bg-lime-300 hover:text-lime-900
                        disabled:bg-zinc-300
                        `}
            disabled={props.isDisable}
            >
            <span className="">{props.title}</span>
      </button>
    )
}

export default Button;