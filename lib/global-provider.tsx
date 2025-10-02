import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";


interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

    const {
        data: user,
        loading,
        refetch
    } = useAppwrite({
        fn: getCurrentUser
    });

    const isLoggedIn = !!user;

    // Wrapper to make refetch parameter optional
    const refetchWrapper = async (newParams?: Record<string, string | number>) => {
        await refetch(newParams || {});
    };

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user: user ?? null,
            loading,
            refetch: refetchWrapper
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }

    return context;
}

export default GlobalProvider