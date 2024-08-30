# Ecommerce Alexcr87

## Descripción

Ecommerce Alexcr87 es un proyecto de comercio electrónico desarrollado como parte del módulo 4 de los estudios en Henry. Este proyecto permite la creación de usuarios, productos y categorías, así como el inicio de sesión. Incluye tanto rutas privadas como públicas.

## Instalación

Para instalar el proyecto y todas sus dependencias, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Alexcr87/Ecommerce.git
   
2. Navega al directorio del proyecto:
   ```bash
   Ecommerce/back 

3. Instala las dependenciasa
   ```bash
   npm install

Nota: Asegúrate de que todas las dependencias en package.json se instalen correctamente. Si algunas dependencias no se instalan, verifica manualmente o intenta instalar los módulos faltantes.

4. Configura las variables de entorno:
Crea un archivo .env en el directorio raíz (back/) basado en el archivo .env.development.
Asegúrate de configurar las variables necesarias, como las credenciales de base de datos, Cloudinary, y Auth0.

## Uso

Puedes utilizar el proyecto de las siguientes maneras:

1. Despliegue en Render:
   El proyecto está desplegado y accesible a través de Render.
   ```bash
   https://ecommerce-latest-dv0c.onrender.com

2. Ejecutar localmente con Docker Compose:
Asegúrate de tener Docker y Docker Compose instalados en tu máquina.
Inicia los contenedores con:
   ```bash
   docker-compose up

Accede a la API en http://localhost:3001/api

3. Ejecutar localmente sin Docker:
Inicia el servidor de desarrollo:
   ```bash
   npm run start:dev

Accede a la API en http://localhost:3000/api.

## Caracteristicas

Creación de usuarios, productos y categorías.
Autenticación de usuarios.
Rutas públicas y privadas protegidas.
Integración con Cloudinary para la gestión de imágenes.
Validación y seguridad con class-validator y bcrypt.
Base de datos PostgreSQL gestionada con TypeORM.

## Tecnologías

El proyecto está construido utilizando las siguientes tecnologías:

- TypeScript: Lenguaje principal utilizado en todo el proyecto.
- NestJS: Framework utilizado para construir el backend.
- TypeORM: ORM para manejar la interacción con la base de datos PostgreSQL.
- PostgreSQL: Base de datos relacional.
- Cloudinary: Servicio de gestión de imágenes.
- Auth0: Servicio de autenticación.
- Bcrypt: Utilizado para la encriptación de contraseñas.
- Class-validator: Utilizado para la validación de datos.
- Swagger: Documentación y pruebas de la API.

## Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

```plaintext
  back/
    ├── dist/
    ├── node_modules/
    ├── src/
    │   ├── assets/
    │   │   └── sinStock.png
    │   ├── common/
    │   │   ├── decorators/
    │   │   │   ├── roles.decorator.ts
    │   ├── config/
    │   │   ├── cloudinary.service.ts
    │   │   └── cloudinary.ts
    │   ├── files/
    │   │   ├── files.controller.ts
    │   │   ├── files.module.ts
    │   │   ├── files.service.ts
    │   │   ├── files.dto.ts
    │   ├── modules/
    │   │   ├── Auth/
    │   │   │   ├── auth.controller.ts
    │   │   │   ├── auth.module.ts
    │   │   │   ├── auth.service.ts
    │   │   │   └── auth.repository.ts
    │   │   ├── Categories/
    │   │   │   ├── categories.controller.ts
    │   │   │   ├── categories.module.ts
    │   │   │   └── categories.service.ts
    │   │   ├── Orders/
    │   │   │   ├── orders.controller.ts
    │   │   │   ├── orders.module.ts
    │   │   │   └── orders.service.ts
    │   │   ├── Products/
    │   │   │   ├── products.controller.ts
    │   │   │   ├── products.module.ts
    │   │   │   ├── products.service.ts
    │   │   │   └── products.repository.ts
    │   │   ├── Seeds/
    │   │   │   ├── categories.seed.ts
    │   │   │   └── products.seed.ts
    │   │   └── Users/
    │   │       ├── users.controller.ts
    │   │       ├── users.module.ts
    │   │       ├── users.service.ts
    │   │       └── users.repository.ts
    │   ├── middlewares/
    │   │   └── logger.middleware.ts
    │   ├── pipes/
    │   ├── app.module.ts
    ├── test/
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── docker-compose.yaml
    ├── Dockerfile
    ├── .env.development
    └── package.json

