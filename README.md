# SiekGPT

Bienvenido al proyecto **SiekGPT**, una aplicación web que permite a los usuarios interactuar con el modelo GPT de OpenAI. Esta plataforma proporciona una interfaz sencilla y funcional, diseñada para ofrecer una experiencia de chat fluida y moderna. Los usuarios pueden conversar en tiempo real con el modelo GPT-3.5-turbo (o cualquier otro modelo compatible de OpenAI), todo a través de una interfaz de usuario atractiva y fácil de usar.

## Características

- **Chat en tiempo real**: Los usuarios pueden enviar mensajes y recibir respuestas generadas por el modelo de OpenAI al instante.
- **Validaciones**: El servidor valida cada mensaje antes de procesarlo, asegurando una comunicación efectiva.
- **Historial de chat**: Los mensajes enviados y las respuestas del modelo se mantienen en un flujo continuo de conversación.
- **Diseño atractivo y responsivo**: El diseño se gestiona con **Sass**, lo que permite personalizar la apariencia de la aplicación para una experiencia visual óptima en dispositivos de cualquier tamaño.

## Tecnologías utilizadas

El proyecto está construido utilizando las siguientes herramientas y dependencias:

### Frontend
- **React**: Librería de JavaScript para construir interfaces de usuario interactivas.
- **Next.js**: Framework basado en React para aplicaciones de servidor y cliente, optimizado para un rendimiento rápido.
- **Sass**: Preprocesador de CSS para estilos más estructurados y personalizados.

### Backend
- **OpenAI API**: Utiliza la biblioteca oficial de OpenAI para interactuar con el modelo de lenguaje GPT.
- **Next.js API Routes**: Utilizado para manejar las solicitudes del lado del servidor de manera eficiente.
- **PostgreSQL**: Base de datos relacional para almacenar el historial de chats.
- **Prisma**: ORM que facilita la interacción con la base de datos PostgreSQL.

### Desarrollo
- **TypeScript**: Lenguaje con tipado estático que mejora la seguridad y la calidad del código.
- **ESLint**: Herramienta de análisis estático que ayuda a mantener un código limpio y consistente.
- **Docker**: Contenerización para facilitar la configuración y el despliegue del entorno de desarrollo y producción.


## Configuración inicial

### Requisitos previos

1. Tener instalado **Docker** y **Docker Compose**.
2. Clonar el repositorio:
   ```bash
   git clone https://github.com/sebas1913/api-openai.git
   cd api-openai
   ```

3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
   ```env
   OPENAI_API_KEY=api_key_openai
   DATABASE_URL=postgresql://postgres:postgres@db:5432/apiopenaidb
   ```

   Asegurar de que la clave de OpenAI sea válida y que la URL de la base de datos coincida con la configuración en `docker-compose.yml`.

### Cómo iniciar el proyecto

1. Construir y levantar los contenedores:
   ```bash
   docker compose up --build
   ```

   Este comando debe ejecutarse en una terminal y permanecer en ejecución mientras trabajas con el proyecto.

2. En otra terminal, aplicar las migraciones de la base de datos con prisma con el contenedor en ejecución:
   ```bash
   npx prisma migrate dev
   ```

3. Aplica cualquier migración pendiente:
   ```bash
   docker compose exec app npx prisma migrate deploy
   ```

4. La aplicación estará disponible en:
   [http://localhost:3000](http://localhost:3000)

### Debugging y desarrollo

Si encuentras problemas, utiliza estas herramientas para depurar:

1. **Cliente Prisma**:
   Si necesitas regenerar el cliente Prisma:
   ```bash
   npx prisma generate
   ```

### Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts:

- `npm run dev`: Inicia la aplicación en modo de desarrollo utilizando Turbopack.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run start`: Inicia el servidor en modo de producción.
- `npm run lint`: Analiza y corrige errores de estilo de código.

## Colaboradores

Este proyecto ha sido desarrollado por los siguientes colaboradores:

- **Sebastian Osorno**: [sebas1913](https://github.com/sebas1913)
- **Karina Pineda**: [Womka7](https://github.com/Womka7)
- **Edwin Carmona**: [ecc97](https://github.com/ecc97)
