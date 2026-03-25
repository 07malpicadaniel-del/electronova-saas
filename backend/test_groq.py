import os
from groq import Groq
from dotenv import load_dotenv

# Cargamos la llave desde el archivo .env
load_dotenv()

# Inicializamos el cliente
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

print("Consultando servidores de Groq...")

try:
    # Pedimos la lista de modelos activos
    models = client.models.list()
    
    print("\n--- Modelos Activos Disponibles ---")
    # Filtramos y mostramos solo los IDs que necesitamos
    for m in models.data:
        print(f"✅ {m.id}")
        
    print("\nRecomendación: Busca uno que diga 'llama-3.1-8b-instant' o 'llama-3.3-70b-versatile'.")
    
except Exception as e:
    print(f"\n❌ Error de conexión: {e}")