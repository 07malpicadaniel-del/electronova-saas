# Usamos una imagen ligera de Node.js
FROM node:20-alpine

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar el caché de Docker)
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm ci

# Copiamos todo el resto del código del frontend
COPY . .

# Construimos la aplicación de Next.js para producción
RUN npm run build

# Exponemos el puerto que usará el contenedor
EXPOSE 3000

# Comando para encender el servidor
CMD ["npm", "start"]