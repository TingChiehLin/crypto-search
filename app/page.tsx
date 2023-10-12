"use client"; 

import * as React from 'react';

import SearchBar from "@/components/SearchBar";
import H1 from '@/components/H1';
import Button from '@/components/Button';
import Table from '@/components/Table';
import Image from 'next/image';

import { useCryptoCoins } from '@/services/api';
import { CryptoField } from '@/services/cryptoField';

import NotFound from '@/public/assets/img/notfund.png';

import Pagnation from '@/components/Pagnation';
import Dropdown from '@/components/Dropdown';

type FieldConfig = {
  value: string,
  error: string,
  validator: (currentValue: requestFormType) => string,
}

interface requestFormType {
  "crypto-search": FieldConfig
}

const validateSearch = (currentValue:requestFormType) => {
  const value = currentValue["crypto-search"].value;
  
  if(!value.match(/^[a-zA-Z0-9 ]*$/)) { 
    return "Please input without special characters";
  }

  if(value === "") {
    return "Search bar can not be empty"
  }

  return ""
}

const initialData:requestFormType = {
  "crypto-search": {
    value: "",
    error: "",
    validator: validateSearch  
  } 
}

export default function Home() {

  const cryptos = useCryptoCoins();
  const [values, setValues] = React.useState(initialData);
  const [filteredData, setFilteredData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage] = React.useState(10);

  const start = (currentPage - 1) * perPage;
  const end = currentPage * perPage; 
  const formateDate = filteredData?.slice(start, end);
  const totalPage = Math.ceil(filteredData?.length / perPage);

  React.useEffect(() => {
    if(cryptos.data) {
      setFilteredData(cryptos.data);
    }
  }, [cryptos.data])

  const handleValues = (event:React.ChangeEvent<HTMLInputElement>) => {
  
    const {name, value} = event.target;

    if(value !== ""){
      setValues((preState) => {
        return {
          ...preState,
          [name]: {
            ...preState[name as keyof requestFormType],
            error: ""
          }
        }
      })
    } else {
       setFilteredData(cryptos.data);
    }
 
    setValues((preState) => {
      return {
        ...preState,
        [name]: {
          ...preState[name as keyof requestFormType],
          value
        }
      }
    })

  }

  const handleBlur = (event:React.FocusEvent<HTMLInputElement>) => {
    const {name} = event.target;
    setValues((preState) => {
      return {
        ...preState,
        [name]: {
          ...preState[name as keyof requestFormType],
          error: preState[name as keyof requestFormType].validator(preState)
        }
      }
    })
  }

  const handleSubmit = () => {

    const value = values["crypto-search"].value.toLocaleLowerCase().trim();

    if(value === "" || !value.match(/^[a-zA-Z0-9 ]*$/)) {
      setValues((preState) => {
        return {
          ...preState,
          ["crypto-search"]: {
            ...preState["crypto-search" as keyof requestFormType],
            error: preState["crypto-search" as keyof requestFormType].validator(preState)
          }
        }
      })
      return;
    }

      const newFilteredData = cryptos.data?.filter((crypto: CryptoField) => {
      const result = crypto.id?.toLocaleLowerCase().trim().includes(value) 
                     || crypto.symbol?.toLocaleLowerCase().trim().includes(value);
      return result;
    })
    setFilteredData(newFilteredData);
    setCurrentPage(1);
  }

  const handleCurPage = (number: number) => {
    setCurrentPage((preState) => preState = number);
  }

  const handlePrevPage = () => {
    setCurrentPage((preState) => preState - 1);
  } 

  const handleNextPage = () => {
    setCurrentPage((preState) => preState + 1);
  }

  const handleSortPrice= (value: string) => {
      const newFilteredData = filteredData.toSorted((a: CryptoField, b: CryptoField) => {
      if(value === "Ascending") {
        return a.current_price - b.current_price;
      } else {
        return b.current_price - a.current_price
      }
    })
    setFilteredData(newFilteredData);
  }

  return (
    <>
      <H1 title={"Crypto Search"}/>
        <div className='flex flex-col md:flex-row justify-between items-baseline gap-y-4 md:gap-y-0'>
          <div className='flex flex-col md:flex-row items-baseline gap-x-6 gap-y-4'>
            <SearchBar  id={"crypto-search"} 
                        label={"search bar"} 
                        type={"search"} 
                        name={"crypto-search"} 
                        value={values["crypto-search"].value} 
                        error={values["crypto-search"].error}
                        placeholder={"Please input search text"} 
                        onChange={handleValues} 
                        onBlur={handleBlur}
            />
            <Button title={'Search'} onClick={handleSubmit}/>
          </div>
          <Dropdown handleClick={handleSortPrice}/>
        </div>
      
      {(filteredData.length === 0 && !cryptos.isLoading) ? 
          <div className='flex flex-col justify-center items-center'>
            <Image 
              src={NotFound} alt="no data" width={0} height={0} sizes={"100vw"}
            />
            <span className='text-zinc-700'>There is no any data can not be found</span>
          </div>
        : <Table tableData={formateDate} isLoading={cryptos.isLoading }/>
      }
      {!cryptos.isLoading  && filteredData.length !== 0 && 
                <Pagnation  currentPage={currentPage}
                            totalPage={totalPage}
                            handleCurPage={handleCurPage}
                            handlePrevPage={handlePrevPage}
                            handleNextPage={handleNextPage} 
                />
      }
      {cryptos.error && <div className='text-red-500'>Error</div>}
    </>
  )
}
