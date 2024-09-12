import { create } from 'zustand';

export const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (conversation) => {
    console.log('Setting selected conversation:', conversation);
    set({ selectedConversation: conversation, messages: conversation.messages });
  },
  setMessages: (updateFn) => {
    set((state) => {
      const updatedMessages = updateFn(state.messages);
      console.log('Updated messages:', updatedMessages);
      return { messages: updatedMessages };
    });
  },
}));
