import { useState } from "react";
import axios from "axios";
import { Bot, Send } from "lucide-react";

export default function Bob({ theme }: { theme: any }) {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: "user", content: userMsg }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("https://electronova-api-p5gf.onrender.com/api/v1/chat", { pregunta: userMsg });
      setChatHistory(prev => [...prev, { role: "bob", content: response.data.respuesta }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: "bob", content: "Error de conexión con el motor analítico." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`${theme.cardBg} border-2 ${theme.cardBorder} rounded-xl shadow-lg flex flex-col h-[400px]`}>
      
      {/* Cabecera del Chat */}
      <div className="p-4 border-b border-[#5C4033] bg-[#722F37] rounded-t-lg flex items-center gap-3 text-white">
        <Bot size={24} />
        <h3 className="font-bold text-lg">Consultor IA (Bob)</h3>
      </div>
      
      {/* Historial de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-50 space-y-3">
            <Bot size={48} />
            <p className="text-sm text-center">Pregúntame sobre estrategias, inventario o rendimiento regional.</p>
          </div>
        ) : (
          chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-[80%] text-sm shadow-sm ${
                msg.role === 'user' ? 'bg-[#4B5563] text-white' : 'bg-transparent border border-[#5C4033] text-inherit'
              }`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        
        {/* Animación de "Bob está escribiendo..." */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-transparent border border-[#5C4033] animate-pulse flex gap-2 items-center">
              <div className="w-2 h-2 bg-[#722F37] rounded-full"></div>
              <div className="w-2 h-2 bg-[#722F37] rounded-full delay-75"></div>
              <div className="w-2 h-2 bg-[#722F37] rounded-full delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input de Envío */}
      <div className="p-4 border-t border-[#5C4033]">
        <div className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu consulta aquí..."
            className={`flex-1 p-3 rounded-md bg-transparent border border-[#5C4033] focus:outline-none focus:border-[#722F37] ${theme.text}`}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isTyping || !chatInput.trim()}
            className="p-3 bg-[#722F37] text-white rounded-md hover:bg-opacity-80 transition-all disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}