import { create } from 'zustand';

// Definišemo globalno stanje za chat
export const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  
  // Metode za ažuriranje stanja
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  setMessages: (messages) => set({ messages }),
}));
