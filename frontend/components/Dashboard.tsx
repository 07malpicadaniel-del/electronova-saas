"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Moon, Sun, Home, BarChart2, MessageSquare } from "lucide-react";
import Stats from "./Stats";
import Bob from "./Bob";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Estado para controlar en qué "página" estamos
  const [activeTab, setActiveTab] = useState("home"); 

  useEffect(() => {
    axios.get("https://electronova-api-h9f4.onrender.com/api/v1/analyze-sales")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#111827]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#722F37]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#111827] text-gray-200">
        <p className="text-2xl font-bold text-red-500">Error: Servidor Desconectado</p>
      </div>
    );
  }

  const theme = {
    bg: isDarkMode ? "bg-[#111827]" : "bg-gray-50",
    text: isDarkMode ? "text-gray-200" : "text-gray-800",
    cardBg: isDarkMode ? "bg-[#1F2937]" : "bg-white",
    cardBorder: isDarkMode ? "border-[#5C4033]" : "border-gray-200",
    accentText: isDarkMode ? "text-[#9CA3AF]" : "text-gray-500",
    highlight: "text-[#722F37]",
    navBg: isDarkMode ? "bg-[#1F2937]" : "bg-white",
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme.bg} ${theme.text}`}>
      
      {/* Cabecera Superior (Fija) */}
      <header className={`sticky top-0 z-50 flex justify-between items-center p-4 border-b ${theme.cardBorder} ${theme.bg}`}>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            ElectroNova <span className={theme.highlight}>Retail</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full border ${theme.cardBorder} hover:bg-[#722F37] hover:text-white transition-all`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Área de Contenido Principal (con padding bottom para que no lo tape la barra) */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 max-w-4xl mx-auto w-full space-y-6">
        
        {/* VISTA 1: INICIO (KPIs) */}
        {activeTab === "home" && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Resumen Ejecutivo</h2>
            <div className="grid grid-cols-2 gap-4">
              <KpiCard title="Ingreso Total" value={`$${data.kpis.ingreso_total.toLocaleString()}`} theme={theme} />
              <KpiCard title="Ticket Promedio" value={`$${data.kpis.ticket_promedio.toFixed(2)}`} theme={theme} />
              <KpiCard title="Transacciones" value={data.kpis.transacciones_validas} theme={theme} />
              <KpiCard title="Producto Top" value={data.kpis.producto_top} theme={theme} />
            </div>
            {/* Pequeño widget visual para rellenar el inicio */}
            <div className={`${theme.cardBg} border ${theme.cardBorder} p-4 rounded-xl mt-6`}>
              <p className={`text-sm ${theme.accentText}`}>Última actualización de la base de datos: Hoy</p>
              <p className="text-sm font-semibold text-green-500 mt-1">✓ Sistema operando al 100%</p>
            </div>
          </div>
        )}

        {/* VISTA 2: ESTADÍSTICAS (Gráficas) */}
        {activeTab === "stats" && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Métricas Detalladas</h2>
            <Stats data={data} theme={theme} />
          </div>
        )}

        {/* VISTA 3: BOB (Inteligencia Artificial) */}
        {activeTab === "bob" && (
          <div className="animate-fadeIn h-full">
            <h2 className="text-xl font-bold mb-4">Asistente IA</h2>
            <Bob theme={theme} />
          </div>
        )}

      </main>

      {/* Barra de Navegación Inferior estilo App (Fija) */}
      <nav className={`fixed bottom-0 w-full border-t ${theme.cardBorder} ${theme.navBg} pb-safe`}>
        <div className="flex justify-around items-center p-3 max-w-md mx-auto">
          
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center p-2 transition-all ${activeTab === "home" ? theme.highlight : theme.accentText}`}>
            <Home size={24} className={activeTab === "home" ? "scale-110" : ""} />
            <span className="text-[10px] mt-1 font-medium">Inicio</span>
          </button>
          
          <button onClick={() => setActiveTab("stats")} className={`flex flex-col items-center p-2 transition-all ${activeTab === "stats" ? theme.highlight : theme.accentText}`}>
            <BarChart2 size={24} className={activeTab === "stats" ? "scale-110" : ""} />
            <span className="text-[10px] mt-1 font-medium">Análisis</span>
          </button>
          
          <button onClick={() => setActiveTab("bob")} className={`flex flex-col items-center p-2 transition-all ${activeTab === "bob" ? theme.highlight : theme.accentText}`}>
            <MessageSquare size={24} className={activeTab === "bob" ? "scale-110" : ""} />
            <span className="text-[10px] mt-1 font-medium">Bob IA</span>
          </button>

        </div>
      </nav>

    </div>
  );
}

// Tarjeta de KPI simplificada para el Home
function KpiCard({ title, value, theme }: any) {
  return (
    <div className={`${theme.cardBg} p-4 rounded-xl border ${theme.cardBorder} shadow-sm flex flex-col justify-center`}>
      <p className={`text-xs font-medium mb-1 ${theme.accentText}`}>{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}