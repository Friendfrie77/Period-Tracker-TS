import { createContext, useState, useContext, ReactNode} from "react";

type messageType = 'error' | 'success' | null;
interface MessageContextType{
    message: string | null;
    messageType: messageType | null; 
    messageState: (message: string | null, type: messageType | null) => void;
}

interface MessageProviderProps {
    children: ReactNode;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider: React.FC<MessageProviderProps> = ({children}) =>{
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<messageType | null>(null)
    const messageState = (message: string | null, type:messageType | null ) =>{
        setMessage(message)
        setMessageType(type)
    }
    return(
        <MessageContext.Provider value = {{message, messageType, messageState}}>
            {children}
        </MessageContext.Provider>
    )
}

const useMessage = (): MessageContextType =>{
    const context = useContext(MessageContext);
    if(context === undefined){
        throw new Error('useMessage must be used within a Message Provider')
    }
    return context
}
export {MessageProvider, useMessage}