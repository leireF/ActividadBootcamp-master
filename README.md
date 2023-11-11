 PUNTO 3
 
 docker network create bootcamp
 docker run --name mongodb_container --hostname mi-mongodb -d -p 27017:27017 --network bootcamp mongo

 PUNTO 4

Crear un nuevo directorio y configurar un proyecto de Node.js:
Abre una terminal y crea un nuevo directorio para tu proyecto. Luego, inicia un nuevo proyecto de Node.js con npm:
 mkdir mi_proyecto_api
cd mi_proyecto_api
npm init -y

Instalar los módulos necesarios:
npm install express mongodb

Crear archivo server.js y escribir codigo
Ejecutar la API escribiendo en la terminal: node server.js
Abrir un navegador o utilizar una herramienta como Postman e ingresar la URL 'http://localhost:8080/documents. Esto debería devolver todos los documentos en la colección especificada.
Para docuemntos filtrados usar esta URL: http://localhost:8080/documentsFiltered. En el codigo le he indicado que la query sea gender:Female
Para poder actualziar datos usar esta URL:http://localhost:8080/updateDocument Se busca el objeto que tenga first_name: 'Brandise' y se le modifica married_status: false. 

Para eliminar su usa esta URL: http://localhost:8080/deleteDocument. Se elimina el registro que coincida con este filtro:last_name: 'Southwell'.

PUNTO 5
He creado mi archivo Dockerfile para poder dockerizar mi APi.
Despues debo cosntruir y ejecutar mi contener docker con los siguiente comandos:
docker build -t test_node_api .      //construye la imagen
docker run -p 8080:8080 -d --name test_node_api --network bootcamp test_node_api   //ejecutar contenedor

