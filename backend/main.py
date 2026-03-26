from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Importamos nuestros módulos locales
from stats_engine import generate_business_stats
from bob_architect import ask_bob

app = FastAPI(title="ElectroNova API Modular")

# --- CONFIGURACIÓN DE CORS (La Lista VIP) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://electronova-frontend-7fcl.onrender.com", # El dominio oficial de tu interfaz
        "http://localhost:3000", # Por si necesitas hacer pruebas locales en el futuro
        "*" # Respaldo universal para evitar cualquier bloqueo residual
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Esquema para validar la petición de chat entrante
class ChatRequest(BaseModel):
    pregunta: str

@app.get("/")
def health_check():
    return {"status": "online", "message": "Arquitectura modular lista y en la nube"}

@app.get("/api/v1/analyze-sales")
def analyze_sales():
    # El main solo delega la tarea al stats_engine
    return generate_business_stats()

@app.post("/api/v1/chat")
def chat_with_data(request: ChatRequest):
    # 1. Obtenemos los datos frescos de pandas
    current_data = generate_business_stats()
    
    # 2. Le pasamos la pregunta y los datos a bob
    respuesta = ask_bob(request.pregunta, current_data)
    
    return {"respuesta": respuesta}