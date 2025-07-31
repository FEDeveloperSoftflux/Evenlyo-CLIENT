import React, { useState, useRef, useEffect } from "react";

const faq = [
  {
    question: "How do I search for an event?",
    answer:
      "To search for an event, use the search bar at the top of the page. Enter keywords related to the event you're looking for, then click 'Search Now'."
  },
  {
    question: "What if I don't know the event name?",
    answer:
      "No problem! You can browse events by category. Scroll down to the 'Categories' section and select a category that interests you."
  },
  {
    question: "Can I filter events by date or location?",
    answer:
      "Yes! After searching or selecting a category, use the filters provided to narrow down events by date, location, or other criteria."
  },
  {
    question: "I need more help!",
    answer:
      "If you need further assistance, feel free to contact our support team or check the FAQ section."
  }
];

const customQuickQuestions = [
  {
    question: "How do I search for an event?",
    answer: "To search for an event, use the search bar at the top of the page. Enter keywords related to the event you're looking for, then click 'Search Now'."
  },
  {
    question: "What if I don't know the event name?",
    answer: "No problem! You can browse events by category. Scroll down to the 'Categories' section and select a category that interests you."
  },
  {
    question: "Can I filter events by date or location?",
    answer: "Yes! After searching or selecting a category, use the filters provided to narrow down events by date, location, or other criteria."
  }
];

function HelpBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your Event Help Bot. I can help you find events. You can ask me things like 'How do I search for an event by name?' or 'How do I browse by category?'" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    let botResponse = {
      from: "bot",
      text: "Sorry, I didn't understand that. Please try asking about searching, categories, or filters."
    };
    for (const item of faq) {
      if (input.toLowerCase().includes(item.question.toLowerCase().split(" ")[2])) {
        botResponse = { from: "bot", text: item.answer };
        break;
      }
    }
    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  const handleQuickQuestion = (question) => {
    const userMessage = { from: "user", text: question };
    let botResponse = { from: "bot", text: "Sorry, I didn't get that." };
    // First check custom quick questions
    const custom = customQuickQuestions.find(q => q.question === question);
    if (custom) {
      botResponse = { from: "bot", text: custom.answer };
    } else {
      for (const item of faq) {
        if (question.toLowerCase().includes(item.question.toLowerCase().split(" ")[2])) {
          botResponse = { from: "bot", text: item.answer };
          break;
        }
      }
    }
    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-2 sm:right-8 z-50 flex justify-end">
      {open ? (
        <div className="w-72 max-w-xs h-[80vh] mx-auto sm:w-96 sm:max-w-full sm:max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
          {/* Gradient header bar */}
          
          {/* Header with title and close button */}
          <div className="relative flex items-center justify-between px-6 py-4 pb-2">
            <h3 className="text-xl font-bold bg-gradient-to-b from-pink-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              AI Help
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2.5 right-3.5 w-8 h-8 bg-gradient-brand text-white border-none rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-10"
              aria-label="Close Help Bot"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto px-5 py-2 bg-gray-50 flex flex-col gap-2 scrollbar-hide">
            {messages.map((msg, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`
                      max-w-64 sm:max-w-xs px-4 py-2.5 rounded-2xl text-sm font-medium break-words mb-0.5
                      ${msg.from === "bot"
                        ? "bg-gray-50 text-gray-600 shadow-sm"
                        : "bg-gradient-brand text-white shadow-md"
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
                {/* Show quick questions after every bot reply */}
                {msg.from === "bot" && (
                  <div className="px-2 py-1">
                    <div className="flex flex-wrap gap-2 mt-1">
                      {customQuickQuestions.map((item, qidx) => (
                        <button
                          key={qidx}
                          onClick={() => handleQuickQuestion(item.question)}
                          className="px-3 py-1.5 text-[11px] sm:text-[12px] font-medium text-primary-600 bg-primary-50 rounded-full hover:bg-primary-100 transition-colors"
                        >
                          {item.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="flex items-center gap-2.5 border-t border-gray-100 bg-white px-4 py-3.5 shadow-sm mt-0">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 border-none outline-none px-4 py-2.5 rounded-full text-sm bg-gray-50 text-gray-800 shadow-sm focus:bg-white focus:shadow-md transition-all"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-gradient-brand text-white border-none rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Send"
            >
              <span className="text-lg font-bold leading-none">➤</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 bg-gradient-brand text-white border-none rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center font-bold"
          aria-label="Open Help Bot"
        >
          <div className="w-9 h-10  rounded-lg flex items-center justify-center">
          <img src="/assets/Bot.svg" alt="Open Help Bot" style={{width: 38, height: 42, display: 'block'}} />
          </div>
        </button>
      )}
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default HelpBot;