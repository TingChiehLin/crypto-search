"use client"

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

interface RootContainerTypeProp {
    children: React.ReactNode
}

const queryClient = new QueryClient();

const RootContainer:React.FC<RootContainerTypeProp> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default RootContainer;