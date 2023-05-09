import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode } from 'react'

export const queryClient = new QueryClient()

interface ReactQueryClientProps {
    children: ReactNode
}

function ReactQueryClient({ children }: ReactQueryClientProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryClient;