import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"

// Import assets
import profileIcon from '../assets/icons/Profile.svg';;

const dummyConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/assets/Profile.svg",
    lastMessage: "Thanks for the quick res...",
    time: "3 hrs ago",
    unread: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/assets/Profile.svg",
    lastMessage: "Thanks for the quick res...",
    time: "3 hrs ago",
    unread: false,
  },
  // Repeat for demo
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "/assets/Profile.svg",
    lastMessage: "Thanks for the quick res...",
    time: "3 hrs ago",
    unread: false,
  },
  {
    id: 4,
    name: "Michael Chen",
    avatar: "/assets/Profile.svg",
    lastMessage: "Thanks for the quick res...",
    time: "3 hrs ago",
    unread: false,
  },
  {
    id: 5,
    name: "Sarah Johnson",
    avatar: "/assets/Profile.svg",
    lastMessage: "Thanks for the quick res...",
    time: "3 hrs ago",
    unread: false,
  },
  {
    id: 6,
    name: "Michael Chen",
    avatar: "/assets/Profile.svg",
    lastMessage: "Thanks for the quick res...",
    time: "3 hrs ago",
    unread: false,
  },
];

const dummyMessages = [
  {
    id: 1,
    sender: "them",
    avatar: "/assets/Profile.svg",
    text: "Hi! I wanted to follow up on our previous discussion about the project timeline.",
    time: "12 mins ago",
  },
  {
    id: 2,
    sender: "me",
    avatar: "/assets/Profile.svg",
    text: "Hello! Of course, I've been working on the revised timeline. Let me share the updated schedule with you.",
    time: "12 mins ago",
  },
  {
    id: 3,
    sender: "them",
    avatar: "/assets/Profile.svg",
    text: "That sounds great! When can we schedule the next meeting?",
    time: "12 mins ago",
  },
  {
    id: 4,
    sender: "me",
    avatar: "/assets/Profile.svg",
    text: "Hello! Of course, I've been working on the revised timeline. Let me share the updated schedule with you.",
    time: "12 mins ago",
  },
];

function ChatContainer({
  dummyConversations,
  dummyMessages,
}) {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(dummyConversations[0]);
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = React.useRef(null);
  const emojiPickerRef = React.useRef(null);

  const emojis = ["😀", "😂", "😍", "😎", "👍", "🎉", "🙏", "🥳", "😢", "🔥", "❤️", "😇", "🤔", "😅", "🙌", "👏", 
    "😡"
  ];

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    }
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() || attachedFile) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "me",
          avatar: "/assets/Profile.svg",
          text: input + (attachedFile ? ` [File: ${attachedFile.name}]` : ""),
          time: "Just now",
        },
      ]);
      setInput("");
      setAttachedFile(null);
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleEmojiClick = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="max-w-6xl w-full mx-auto my-8 md:my-10 bg-white rounded-2xl border border-gray-200 shadow-lg flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b px-4 md:px-8 py-4 flex items-center gap-4 rounded-t-2xl">
        <button
          className="btn-primary-mobile text-white px-4 py-2 rounded-2xl font-semibold flex items-center gap-2 hover:bg-pink-600 transition"
          onClick={() => navigate(-1)}
        >
          <span className="text-lg">←</span> Back
        </button>
        {/* Mobile: Toggle sidebar button */}
        <button
          className="ml-auto md:hidden bg-gray-100 px-3 py-2 rounded-lg text-pink-500 font-bold"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          {sidebarOpen ? "Hide Chats" : "All Chats"}
        </button>
      </div>
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r flex flex-col p-4 md:p-6 gap-4 min-w-[220px] max-w-xs w-full md:w-80 z-20 transition-all duration-300
            ${sidebarOpen ? "block" : "hidden"} md:block fixed md:static top-[92px] left-0 h-full md:h-auto shadow-lg md:shadow-none`
          }
        >
          <div>
            <h2 className="font-bold text-base md:text-lg mb-1">All Communication</h2>
            <p className="text-xs text-gray-500 mb-3">You can talk and view your all chat with vendor</p>
            <input
              type="text"
              placeholder="Search"
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            {dummyConversations.map((conv, idx) => (
              <div
                key={conv.id}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-1 transition-all ${selectedConversation.id === conv.id ? "bg-pink-50" : "hover:bg-gray-100"}`}
                onClick={() => {
                  setSelectedConversation(conv);
                  setSidebarOpen(false); // auto-close on mobile
                }}
              >
                <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{conv.name}</div>
                  <div className="text-xs text-gray-500 truncate">{conv.lastMessage}</div>
                </div>
                <div className="flex flex-col items-end min-w-[60px]">
                  <span className="text-xs text-gray-400">{conv.time}</span>
                  {conv.unread && <span className="w-2 h-2 bg-pink-500 rounded-full mt-1"></span>}
                </div>
              </div>
            ))}
          </div>
        </aside>
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-white min-w-0">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b px-4 md:px-8 py-4">
            <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-semibold text-base">{selectedConversation.name}</div>
              <div className="text-xs text-gray-500">Thanks for the quick res....</div>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-2 md:px-8 py-4 md:py-6 flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "them" && (
                  <img src={msg.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-2 self-end" />
                )}
                <div className={`max-w-[80%] md:max-w-[60%] px-4 md:px-5 py-2 md:py-3 rounded-2xl text-sm ${msg.sender === "me" ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>
                  {msg.text}
                  <div className="text-xs text-white mt-2 text-right">{msg.time}</div>
                </div>
                {msg.sender === "me" && (
                  <img src={msg.avatar} alt="avatar" className="w-8 h-8 rounded-full ml-2 self-end" />
                )}
              </div>
            ))}
          </div>
          {/* Message Input */}
          <form className="flex items-center gap-2 border-t px-2 md:px-8 py-3 md:py-4 bg-white relative" onSubmit={handleSend}>
            <div className="relative">
              <button
                type="button"
                className="px-2 border-2 rounded-xl flex items-center justify-center w-10 h-10"
                onClick={() => setShowEmojiPicker((v) => !v)}
                tabIndex={-1}
              >
                <img src="/assets/Emoji.svg" alt="Emoji" className="w-6 h-6" />
              </button>
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute left-0 bottom-12 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-2 grid grid-cols-5 gap-2 w-56"
                >
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="text-2xl hover:bg-gray-100 rounded-lg p-1"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="px-2 border-2 rounded-xl flex items-center justify-center w-10 h-10"
              onClick={handleAttachmentClick}
            >
              <img src="/assets/Attachemnt.svg" alt="Attachment" className="w-6 h-6" />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </button>
            <input
              type="text"
              className="flex-1 border rounded-full px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="Reply to soham here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {attachedFile && (
              <span className="text-xs text-gray-500 truncate max-w-[100px]">{attachedFile.name}</span>
            )}
            <button
              type="submit"
              className="bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white px-3 md:px-2 py-1 rounded-xl font-semibold hover:bg-pink-600 transition text-xl"
            >
              <span role="img" aria-label="send">➤</span>
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

const ChatPage = () => {
  const { vendorId } = useParams();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <ChatContainer dummyConversations={dummyConversations} dummyMessages={dummyMessages} />
      <Footer />
    </div>
  );
};

export default ChatPage; 