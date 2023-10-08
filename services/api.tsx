import { useQuery } from '@tanstack/react-query';

const COINS_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const fetchCrypto = async () => {
    const result = await fetch(COINS_URL);
    return result.json();
}

export const useCryptoCoins = () => {
    return useQuery({queryKey: ["cryptoscoins"],
                     queryFn: fetchCrypto,
                     staleTime: Infinity,
                     cacheTime: 0,
           })
};
