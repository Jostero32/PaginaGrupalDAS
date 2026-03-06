# Página Grupal DAS

Aplicación web para el grupo DAS con funcionalidad de blog.

## Configuración

### Supabase (almacenamiento + base de datos)

1. **Crear un proyecto en Supabase** y habilitar la base de datos PostgreSQL.
2. **Crear un bucket de almacenamiento** llamado `blog-covers` y marcarlo como público (esto permite que las imágenes sean accesibles vía URL).
3. **Copiar las credenciales** (URL y `anon` key) desde el panel de proyecto.

### Backend (PostgreSQL + manejo de archivos)

La base de datos puede residir en Supabase; usa la URL y credenciales que provee el proyecto. Además, el backend se encarga de subir las portadas al bucket `blog-covers` para mantener la lógica en servidor. Para ello hace falta la **service role key** de Supabase (su uso es seguro en el servidor, nunca la expongas al cliente).

1. **Configurar credenciales** en `backend/.env`:
   ```
   DB_HOST=tu-proyecto.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=tu_password
   PORT=3001

   # credenciales necesarias para la subida de imagenes
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_SERVICE_KEY=la_service_role_key
   ```

(ya vienen configuradas si utilizas las del proyecto compartido).

3. **Crear tabla** ejecutando el script SQL:
   ```bash
   cd backend
   psql -U tu_usuario -d pagina_grupal_das -f schema.sql
   ```

4. **Instalar dependencias y poblar base de datos**:
   ```bash
   cd backend
   npm install
   npm run seed
   ```

5. **Iniciar el backend**:
   ```bash
   npm run dev
   ```

### Frontend (React + Vite)

Para subir imágenes ya no es necesario agregar ninguna clave de Supabase al cliente. El frontend envía el archivo al backend, el cual se encarga de guardar la imagen en el bucket y devolver la URL pública.

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar el frontend**:
   ```bash
   npm run dev
   ```

## Funcionalidades

- Ver lista de posts
- Leer posts individuales
- Crear nuevos posts con portada
- Subir imágenes al bucket de Supabase a través del backend
- API REST con PostgreSQL para persistencia (rutas CRUD)

### Rutas importantes del backend

- `GET /posts`, `GET /posts/:slug`, `POST /posts`, `PUT /posts/:slug`, `DELETE /posts/:slug`
- `POST /upload` → acepta `multipart/form-data` con campo `image` y devuelve la URL pública de la imagen

## Estructura del Proyecto

```
/
├── backend/          # API REST con Node.js + Express + PostgreSQL
│   ├── server.js     # Servidor principal
│   ├── seed.js       # Script para poblar BD
│   ├── schema.sql    # Esquema de la base de datos
│   └── .env          # Credenciales de BD
├── src/              # Frontend React
│   ├── api.js        # Cliente API
│   ├── data/posts.js # Funciones para manejar posts
│   └── pages/        # Páginas del blog
└── package.json      # Dependencias del frontend
```
