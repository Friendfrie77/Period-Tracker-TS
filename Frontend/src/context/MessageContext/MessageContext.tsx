import { createContext, useState, useContext, ReactNode} from "react";

interface MessageContextType{
    message: string | null;
    setMessage: (message: string | null) => void;
}

interface MessageProviderProps {
    children: ReactNode;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider: React.FC<MessageProviderProps> =({})