import React, { createContext, useState, ReactNode, useContext } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true });

interface AppContextProps {
  isEntering: boolean;
  setIsEntering: (value: boolean) => void;
  inRoom: boolean;
  setInRoom: (value: boolean) => void;
  isExiting: boolean;
  setIsExiting: (value: boolean) => void;
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
  updateRoom: (roomId: string) => void;
  sendMessageToGroq: (message: string) => Promise<void>;
  groqResponse: string;
  onTitleScreen: boolean;
  setOnTitleScreen: (value: boolean) => void;
  carouselComplete: boolean;
  setCarouselComplete: (value: boolean) => void;
}

const defaultState = {
  isEntering: false,
  setIsEntering: () => {},
  inRoom: false,
  setInRoom: () => {},
  isExiting: false,
  setIsExiting: () => {},
  selectedRoom: null,
  setSelectedRoom: () => {},
  updateRoom: () => {},
  sendMessageToGroq: async () => {},
  groqResponse: '',
  onTitleScreen: true,
  setOnTitleScreen: () => {},
  carouselComplete: false,
  setCarouselComplete: () => {},
};

export const AppContext = createContext<AppContextProps>(defaultState);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [inRoom, setInRoom] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [carouselComplete, setCarouselComplete] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [groqResponse, setGroqResponse] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<Groq.Chat.Completions.ChatCompletionMessageParam[]>([]);
  const [onTitleScreen, setOnTitleScreen] = useState<boolean>(true);

  const sendMessageToGroq = async (message: string) => {
    try {
      const updatedHistory: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
        ...conversationHistory,
        { role: 'user', content: message + 'Reply to me in 5 words or less.' }
      ];
      setConversationHistory(updatedHistory);

      const response = await groq.chat.completions.create({
        messages: updatedHistory,
        model: "llama3-8b-8192",
      });

      const assistantResponse = response.choices[0]?.message?.content || "";
      setGroqResponse(assistantResponse);
      setConversationHistory([
        ...updatedHistory,
        { role: 'assistant', content: assistantResponse }
      ]);
    } catch (error) {
      console.error("Error fetching Groq response:", error);
      setGroqResponse("Failed to fetch response");
    }
  };

  const updateRoom = (roomId: string) => {
    console.log(`Updating room to: ${roomId}`);
  };

  return (
    <AppContext.Provider value={{ 
      isEntering,
      setIsEntering,
      inRoom, 
      setInRoom, 
      isExiting,
      setIsExiting,
      selectedRoom, 
      setSelectedRoom, 
      updateRoom, 
      sendMessageToGroq, 
      groqResponse,
      onTitleScreen,
      setOnTitleScreen,
      carouselComplete,
      setCarouselComplete,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};