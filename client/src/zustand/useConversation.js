import { create } from 'zustand';

export const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (conversation) => {
    set({ selectedConversation: conversation, messages: conversation.messages });
  },
  setMessages: (updateFn) => {
    set((state) => {
      const updatedMessages = updateFn(state.messages);
      return { messages: updatedMessages };
    });
  },
}));
