import * as React from "react";

interface FormTypeProp {
    onSubmit?: (event:React.FormEvent<HTMLFormElement>) =>void,
    children: React.ReactNode
}

const Form:React.FC<FormTypeProp> = ({...props}) => {
    return (
        <form onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}

export default Form;