# Actividad Bootcamp - Descripción

Este repositorio contiene una API sencilla desarrollada con Node.js que se conecta a una base de datos MongoDB desplegada en un contenedor Docker. La API tiene las siguientes funcionalidades:

- **GET /documents:** Devuelve todos los documentos en la colección de la base de datos.

- **GET /documentsFiltered:** Devuelve los documentos que cumplen una condición específica en base a un query sobre uno o varios campos de un documento.

- **PUT /updateDocument:** Modifica algunos campos de un documento que cumple una condición o query. Si el documento no se encuentra, crea uno nuevo.

- **DELETE /deleteDocument:** Elimina el(los) documento(s) que cumplen alguna condición o query. Si el documento no se encuentra, no realiza ninguna acción.

## Instrucciones para usar el código en otra máquina

### Requisitos previos

1. Tener un IDE instalado en tu máquina (por ejemplo, Visual Studio Code).

2. Crear un perfil de GitHub.

3. Instalar Docker en tu máquina.

## Inicialización de la Base de Datos

Antes de ejecutar la API, es necesario inicializar y poblar la base de datos MongoDB. Sigue estos pasos:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/ActividadBootcamp.git

2. Crear un nuevo directorio para el proyecto 

    ```bash
    mkdir mi_proyecto_api

3. Navega al directorio del proyecto:   

    ```bash
    cd ejercicio-bootcamp/mi_proyecto_api

4. Ejecutar el script de inicializacion de la base de datos:

    ```bash
    node inicializarBD.js

Este script se conectará a la base de datos MongoDB y agregará datos de muestra desde el archivo users.json ubicado en la carpeta db_sample. Asegúrate de que la base de datos MongoDB esté en ejecución antes de ejecutar este script.

### Pasos para desplegar la base de datos MongoDB en un contenedor Docker

1. Crear una red Docker
    ```bash
    docker network create bootcamp

2. Ejecutar el contenedor de Docker para MongoDB:

    ```bash
    docker run --name mongodb_container --hostname mi-mongodb -d -p 27017:27017 --network bootcamp mongo

### Pasos para ejecutarla API en una maquina local

1. Iniciar un nuevo proyecto de Node.js con npm

    ```bash
    npm init -y

2. Instalar los modulos necesarios

    ```bash
    npm install express mongodb

3. Ejecutar la API escribiendo en la terminal

    ```bash
    node server.js

La API estará disponible en http://localhost:8080.

4. Utilizar herramientas como Postman o cURL para probar las diferentes rutas de la API.

## Rutas y cómo probarlas

1. **GET /documents:**

   - Descripción: Devuelve todos los documentos en la colección.
   - Método: GET
   - URL: http://localhost:8080/documents

2. **GET /documentsFiltered:**

   - Descripción: Devuelve los documentos cuyo campo 'gender' es igual a 'Female'.
   - Método: GET
   - URL: http://localhost:8080/documentsFiltered

3. **PUT /updateDocument:**

   - Descripción: Modifica el campo 'married_status' a true para el documento con 'first_name' igual a 'Julio' si existe; de lo contrario, crea un nuevo documento.
   - Método: PUT
   - URL: http://localhost:8080/updateDocument
   - Ejemplo de cuerpo de la solicitud (JSON):
     ```json
     {
       "first_name": "Julio",
       "married_status": true
     }

4. **DELETE /deleteDocument:**

   - Descripción: Elimina el(los) documento(s) cuyo campo 'last_name' es igual a 'Southwell'.
   - Método: DELETE
   - URL: http://localhost:8080/deleteDocument


### Dockerizacion de la API

He creado mi archivo Dockerfile para poder dockerizar mi APi.
Despues debo cosntruir y ejecutar mi contener docker con los siguiente comandos:

1. Construir la imagen del Docker

    ```bash
    docker build -t test_node_api . 

2. Ejecutar el contenedor

    ```bash
    docker run -p 8080:8080 -d --name test_node_api --network bootcamp test_node_api
