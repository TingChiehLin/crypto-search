import { FC } from "react";

import { formatNumber, formatWithCommas } from "@/services/format";

interface InfoRowTypeProp {
    title: string;
    value: number | null;
}   

const InfoRow:FC<InfoRowTypeProp> = ({ title, value }) => {
    return (
        <div className="w-96 flex justify-between items-baseline">
            <span className="text-lime-700 font-medium">{title}</span>
            <span className="text-zinc-700 font-bold">{formatWithCommas(value ?? 0)}</span>
        </div>
    )
}

export default InfoRow; 