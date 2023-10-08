"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { formatNumber } from '@/services/format';

import LoadingIcon from '@/public/assets/img/spinner.svg';
import { CryptoField } from '@/services/cryptoField';

interface TableTypeProps {
    tableData: CryptoField[];
    isLoading: boolean
}

const Table: React.FC<TableTypeProps> = ({...props}) => {  
    
    const router = useRouter();
    const hasBorder = props.isLoading ? "border-0" : "border-[1px]";

    const handleClick = (id: string) => {
      router.push(`/crypto/${id}`)
    }
    
    return (
      <div className={`px-12 py-6 mt-16 rounded-xl ${hasBorder} relative`}>
        {props.isLoading ? <div className="mt-32 flex justify-center items-center">
          <Image
            src={LoadingIcon}
            alt="loading-icon"
            className="h-24 w-24"
            width={0}
            height={0} 
            sizes={"100vw"}
          />
        </div> : 
          <div className="">
            <table id="crypto-table" className="mt-6 w-full whitespace-nowrap text-left">
                <colgroup>
                <col className="w-8/12 lg:w-4/12"/>
                <col className="w-3/12 lg:w-3/12" />
                <col className="w-4/12 md:w-4/12 lg:w-2/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-zinc-200 text-sm text-zinc-800">
                <tr>
                    <th scope="col" className="pt-2 pb-6 pr-8 font-semibold uppercase">
                    coin
                    </th>
                    <th scope="col" className="hidden pt-2 pb-6  pr-8 font-semibold sm:table-cell uppercase">
                    price
                    </th>
                    <th scope="col" className="pt-2 pb-6 pl-0 pr-4 font-semibold sm:pr-8 sm:text-left lg:pr-20 uppercase">
                     change
                    </th>
                    <th scope="col" className="hidden pt-2 pb-6 pl-0 pr-8 font-semibold md:table-cell lg:pr-20 uppercase">
                     volume
                    </th>
                    <th scope="col" className="hidden pt-2 pb-6 pl-0 pr-4 font-semibold sm:table-cell sm:pr-6 lg:pr-8 uppercase">
                    market cap
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                {props.tableData?.map((crypto: CryptoField) => (
                    <tr key={crypto.id} className='hover:bg-zinc-100 cursor-pointer' onClick={()=>handleClick(crypto.id)}>
                        <td className="py-5 pr-8">
                          <div className='flex gap-x-4 items-center'>
                            <Image
                              src={crypto.image}
                              alt={crypto.name}
                              className="h-8 w-8 rounded-full bg-zinc-800"
                              width={0}
                              height={0} 
                              sizes={"100vw"}
                            />
                            <span className="truncate text-sm font-medium text-zinc-700">{crypto.name}</span>
                          </div>
                        </td>
                        <td className="hidden py-5 pl-0 pr-4 sm:table-cell sm:pr-8">
                            <div className="text-sm text-zinc-700">{"$" + crypto.current_price}</div>
                        </td>
                        <td className="py-4 pl-0 pr-4 text-sm sm:pr-2 lg:pr-4">
                            <div className="flex gap-x-2">
                              {crypto.price_change_percentage_24h < 0 ? (
                                <span className="text-red-500 sm:block">
                                  {crypto.price_change_percentage_24h.toFixed(2)}&nbsp;%
                                </span>
                              ) : (
                                <span className="text-lime-600 sm:block">
                                  {crypto.price_change_percentage_24h.toFixed(2)}&nbsp;%
                                </span>
                              )}
                            </div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-zinc-700 md:table-cell lg:pr-20">
                            {formatNumber(crypto.total_volume)}
                        </td>
                        <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-zinc-700 sm:table-cell sm:pr-6 lg:pr-8">
                            <time dateTime={crypto.name}>{formatNumber(crypto.market_cap)}</time>
                        </td>
                    </tr>
                    ))}
                    </tbody>
              </table>
          </div>}
        </div>
    )
}

export default Table;   