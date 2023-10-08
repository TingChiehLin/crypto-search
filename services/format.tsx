
export const formatNumber = (number: number) => { 
    if(number > 1000000000) {
      return (number/1000000000).toFixed(2) + "B"
    } else if(number > 1000000) {
      return (number/1000000).toFixed(2) + "M"
    } else if(number > 1000) { 
      return (number/1000).toFixed(2) + "K"
    }
    return number
}

 export const formatWithCommas = (x: number) =>  {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const formateDate = (value: string) => {
    const result = value?.slice(0, 10);
    return result;
}

