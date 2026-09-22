import React, { useState, useRef, useEffect } from 'react';
import { Send, ConciergeBell, Sparkles, User, Wine, Plus } from 'lucide-react';
import { ChatMessage } from '../types';

interface ConciergeViewProps {
  messages: ChatMessage[];
  cannedPrompts: string[];
  onSendMessage: (text: string) => void;
  onQuickAdd: (name: string, price: number, restaurant: string) => void;
}

export const ConciergeView: React.FC<ConciergeViewProps> = ({
  messages,
  cannedPrompts,
  onSendMessage,
  onQuickAdd,
}) => {
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div id="view-private-concierge" className="flex flex-col w-full space-y-4 pb-12">
      {/* Header */}
      <div className="bg-[#1f2022] rounded-xl p-4 sm:p-5 border border-[#343537]/60 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#e9c176]/20 border border-[#e9c176]/40 flex items-center justify-center text-[#e9c176] shadow-[0_0_16px_rgba(233,193,118,0.2)]">
            <ConciergeBell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl text-[#e3e2e5] font-medium">
              Privé Sommelier & Concierge
            </h2>
            <p className="text-xs text-[#e9c176] flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e9c176] animate-pulse" />
              Vincent · Online · Instant Taste Architecture
            </p>
          </div>
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#9a8f80] font-semibold hidden sm:inline">
          24/7 Bespoke
        </span>
      </div>

      {/* Canned Prompt Starters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {cannedPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSendMessage(prompt)}
            className="px-3 py-1.5 rounded-full bg-[#292a2c] hover:bg-[#343537] text-xs text-[#e3e2e5] whitespace-nowrap border border-[#4e4639]/40 active:scale-95 transition-all cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="h-[420px] sm:h-[460px] overflow-y-auto space-y-3.5 bg-[#1b1c1e] rounded-xl p-4 sm:p-5 border border-[#343537]/60 shadow-inner flex flex-col">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[90%] sm:max-w-[80%] ${
                isUser ? 'self-end' : 'self-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#e9c176] text-[#412d00] rounded-tr-sm font-medium shadow-md'
                    : 'bg-[#1f2022] text-[#e3e2e5] border border-[#343537]/60 rounded-tl-sm shadow-sm'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.suggestedAction && (
                  <div className="mt-3 pt-2.5 border-t border-[#343537]/60 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-[#e9c176] font-semibold">
                      {msg.suggestedAction.dishName} (₹{msg.suggestedAction.price})
                    </span>
                    <button
                      onClick={() =>
                        onQuickAdd(
                          msg.suggestedAction!.dishName,
                          msg.suggestedAction!.price,
                          msg.suggestedAction!.restaurant
                        )
                      }
                      className="px-2.5 py-1 bg-[#e9c176] hover:bg-[#f3d389] text-[#412d00] rounded text-[10px] uppercase font-bold tracking-wider shadow-sm transition-all"
                    >
                      + Add Course
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-[#9a8f80] mt-1 px-1">{msg.timestamp}</span>
            </div>
          );
        })}
        <div ref={chatBottomRef} />
      </div>

      {/* Input box */}
      <div className="flex items-center gap-2 bg-[#1f2022] rounded-xl p-2 border border-[#343537]">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Ask for wine pairings, courses, dietary needs, or etiquette..."
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-[#e3e2e5] placeholder:text-[#9a8f80] focus:outline-none font-sans"
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-lg bg-[#e9c176] hover:bg-[#f3d389] disabled:opacity-40 text-[#412d00] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
