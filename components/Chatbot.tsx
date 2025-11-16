import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, XIcon } from './IconComponents';
import { getChatbotResponse, isAiAvailable } from '../services/geminiService';

type Message = {
    role: 'user' | 'model';
    text: string;
};

type ChatHistory = { role: 'user' | 'model'; parts: { text: string }[] }[];

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm the Newark Hospital virtual assistant. How can I help you today?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    if (!isAiAvailable()) {
        return null;
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const newMessages: Message[] = [...messages, { role: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        const history: ChatHistory = newMessages.slice(1).map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        try {
            const responseText = await getChatbotResponse(userInput, history);
            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-5 right-5 z-50 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-secondary/90 transform hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary"
                    aria-label="Open Chat"
                    aria-expanded={isOpen}
                >
                    <ChatIcon className="h-8 w-8" aria-hidden="true" />
                </button>
            </div>

            <div className={`fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm h-[70vh] max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col transition-transform duration-300 origin-bottom-right ${isOpen ? 'scale-100' : 'scale-0'}`}>
                {/* Header */}
                <div className="bg-primary text-white p-4 flex justify-between items-center rounded-t-lg">
                    <h3 className="font-bold text-lg" id="chat-title">Hospital Assistant</h3>
                    <button onClick={() => setIsOpen(false)} aria-label="Close Chat" aria-describedby="chat-title" className="p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50" aria-live="polite">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === 'user' ? 'bg-secondary text-white' : 'bg-gray-200 text-dark'}`} role="logitem">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start mb-4" role="status" aria-live="polite">
                            <div className="rounded-lg px-4 py-2 max-w-[80%] bg-gray-200 text-dark">
                                <div className="flex items-center">
                                    <span className="font-bold">Typing</span>
                                    <div className="animate-bounce ml-1 w-1 h-1 bg-gray-500 rounded-full [animation-delay:-0.3s]"></div>
                                    <div className="animate-bounce ml-1 w-1 h-1 bg-gray-500 rounded-full [animation-delay:-0.15s]"></div>
                                    <div className="animate-bounce ml-1 w-1 h-1 bg-gray-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-white rounded-b-lg">
                    <div className="flex">
                        <label htmlFor="chat-input" className="sr-only">Ask a question</label>
                        <input
                            type="text"
                            id="chat-input"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                            placeholder="Ask a question..."
                            className="flex-1 px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-primary-light"
                            disabled={isLoading}
                            aria-label="Type your message"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-primary text-white px-5 py-2 rounded-r-full hover:bg-primary-light disabled:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                            aria-label="Send message"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;