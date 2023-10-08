interface H1TypeProp {
    title: string
}

const H1: React.FC<H1TypeProp> = ({...props}) => {
    return (
        <h1 className="text-3xl lg:text-4xl font-semibold text-lime-700 mb-8">{props.title}</h1>
    )
}

export default H1;