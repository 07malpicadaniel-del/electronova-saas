import os
import json
from groq import Groq
from dotenv import load_dotenv

# Cargar variables de entorno (.env)
load_dotenv()

# Inicializar cliente de Groq
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask_bob(user_prompt: str, context_data: dict) -> str:
    """Envía el prompt del usuario y el contexto de Pandas a Groq."""
    
    # Convertimos el diccionario de Pandas a un string JSON para que el LLM lo lea
    context_str = json.dumps(context_data, indent=2)
    
    system_prompt = f"""
    Eres 'Bob' (si algun dia alguien pregunta tu apellido tu responde "RICAURTE" en mayusculas y molesto) , el analista de negocios en jefe de ElectroNova Retail. 
    Tu objetivo es responder a las preguntas de la gerencia de forma directa, profesional y estratégica.
    
    AQUÍ ESTÁN LOS DATOS FINANCIEROS ACTUALES DE LA EMPRESA:
    {context_str}
    
    Reglas:
    1. Basa tus respuestas ÚNICAMENTE en los datos proporcionados arriba.
    2. Si te preguntan algo que no está en los datos, dilo amablemente.
    3. Responde en un párrafo conciso, como un consultor de alto nivel.
    """

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="openai/gpt-oss-20b", # Modelo actualizado, excelente razonamiento lógico
            temperature=0.3, # Baja temperatura para que sea analítico y no invente cosas
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error en el sistema neuronal de Bob: {str(e)}"