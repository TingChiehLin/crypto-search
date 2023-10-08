"use client"

import { NextPage } from "next";
import Image from "next/image";

import { useCryptoCoins } from '@/services/api';

import {formateDate} from '@/services/format';

import H1 from "@/components/H1";
import InfoRow from "@/components/InfoRow";
import { CryptoField } from "@/services/cryptoField";

interface CryptoPageTypeProps {
    params: {
        cryptoid: string,
    };
}

const CryptoPage:NextPage<CryptoPageTypeProps> = ({params}) => { 
    const cryptos = useCryptoCoins();
    const crypto = cryptos.data?.find((item:CryptoField) => item.id === params.cryptoid);
    return (
        <>
            <div className="flex items-baseline gap-x-2">
                <H1 title={crypto?.name}/>
                <span className="text-3xl font-semibold text-zinc-400 uppercase block">{crypto?.symbol}</span>
            </div>
            <Image
                    src={crypto?.image}
                    alt={crypto?.name}
                    className="h-32 w-32 rounded-full bg-zinc-800 mb-6"
                    width={0}
                    height={0} 
                    sizes={"100vw"}
            />
            <div className="flex items-center gap-x-4">
                <span className="text-4xl font-semibold">{`$${crypto?.current_price}`}</span>    
                <div className="flex gap-x-2">
                    {crypto?.price_change_percentage_24h < 0 ? (
                    <span className="text-red-500 sm:block">
                        {crypto?.price_change_percentage_24h.toFixed(2)}&nbsp;%
                    </span>
                    ) : (
                    <span className="text-lime-600 sm:block">
                        {crypto?.price_change_percentage_24h.toFixed(2)}&nbsp;%
                    </span>
                    )}
                </div>
            </div>
            <span className="text-sm text-zinc-500 mt-2">Last update:&nbsp;{formateDate(crypto?.last_updated)}</span>
            <div className="mt-8">
                <InfoRow title={"Volume"} value={crypto?.total_volume}/>
                <InfoRow title={"24h High"} value={crypto?.high_24h}/>
                <InfoRow title={"24h Low"} value={crypto?.low_24h}/>
                <InfoRow title={"Market Cap"} value={crypto?.market_cap}/>
                <InfoRow title={"Supply"} value={crypto?.total_supply}/>
            </div>
        </>
    );
}

export default CryptoPage;  
