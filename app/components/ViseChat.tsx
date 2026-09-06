import React, {useState, useRef, useEffect} from 'react';
import {X, Send, MessageCircle, Sparkles} from 'lucide-react';
import {useNavigate} from '@remix-run/react';
import ViseAvatar from './ViseAvatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickReply {
  id: string;
  label: string;
  message: string;
  response: string;
}

const QUICK_REPLIES: QuickReply[] = [
  {
    id: '1',
    label: 'Shipping Info',
    message: 'How long does shipping take?',
    response:
      '📦 We offer FREE Standard Delivery (3-5 business days) on orders over £75, and Express Delivery (£14.99, next business day) for urgent orders. Track your package in real-time once it ships!',
  },
  {
    id: '2',
    label: 'Returns & Refunds',
    message: "What's your return policy?",
    response:
      '↩️ We offer hassle-free returns within 30 days of purchase. If you\'re not satisfied, simply return the item in original condition for a full refund or exchange. No questions asked!',
  },
  {
    id: '3',
    label: 'Product Help',
    message: 'Can you help me find a product?',
    response:
      '🔍 Absolutely! I can help you find the perfect product. Tell me what you\'re looking for—whether it\'s a smartphone, laptop, headphones, or gaming gear—and I\'ll recommend the best options for your budget!',
  },
  {
    id: '4',
    label: 'Warranty',
    message: 'Do you offer warranties?',
    response:
      '🛡️ Yes! All our products come with manufacturer warranties. We also offer optional Protection Plans starting from just a few pounds that cover accidental damage, loss, and theft. Would you like to know more?',
  },
  {
    id: '5',
    label: 'Payment Methods',
    message: 'What payment methods do you accept?',
    response:
      '💳 We accept all major credit and debit cards, PayPal, and Apple Pay. You can also pay in 3 interest-free instalments with Klarna. All payments are secure and encrypted.',
  },
  {
    id: '6',
    label: 'Track Order',
    message: 'How do I track my order?',
    response:
      '📍 Once your order ships, you\'ll receive a tracking email with a link to monitor your delivery in real-time. You can also check your order status anytime in your account under "My Orders".',
  },
];

export default function ViseChat() {
  const [open, setOpen] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hey there! 👋 I'm Vise, your friendly Alvis assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = (reply: QuickReply) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: reply.message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setShowQuickReplies(false);
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply.response,
          timestamp: new Date(),
        },
      ]);
      setLoading(false);
    }, 600);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setShowQuickReplies(false);
    setLoading(true);

    setTimeout(() => {
      const responses = [
        "That's a great question! 🌟 I'd love to help you find the perfect product.",
        'We have amazing deals on electronics right now! ✨ Would you like me to recommend something?',
        "I'm here to help! What are you looking for today?",
        'Our team works hard to bring you the best products at fair prices. 💜',
        'Thanks for reaching out! Let me find the best answer for you.',
      ];
      const response =
        responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        },
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Vise Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #a78bfa, #c084fc)',
          animation: open ? 'none' : 'bounce 2s infinite',
        }}
        aria-label="Open Vise chat"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-7 h-7 text-white" />
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col max-h-[600px] overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <ViseAvatar size="sm" />
              <div>
                <h3 className="text-white font-bold text-lg">Vise</h3>
                <p className="text-white/80 text-xs">Your Alvis Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages & Quick Replies */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Quick Reply Buttons */}
            {showQuickReplies && messages.length === 1 && !loading && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-gray-600 font-medium px-2">
                  Quick questions:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_REPLIES.map(reply => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply)}
                      className="text-left text-xs bg-white border border-purple-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition duration-200 flex items-start gap-2"
                    >
                      <MessageCircle className="w-3 h-3 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{reply.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{animationDelay: '0ms'}}
                    />
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{animationDelay: '150ms'}}
                    />
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{animationDelay: '300ms'}}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 flex gap-2 bg-white rounded-b-2xl">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 text-gray-900 text-sm px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  );
}
