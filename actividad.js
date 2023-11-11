const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const hostname = '0.0.0.0';
const port = 8080;

const url = 'mongodb://localhost:27017'; // URL de tu servidor de MongoDB

let client; // Inicializa la variable client fuera de los endpoints

app.get('/documents', async (req, res) => {
    try {
        client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db('bootcamp');
        const collection = database.collection('bootcamp');

        const documents = await collection.find({}).toArray();

        // Convertir cada objeto a JSON y almacenarlos en un array
        const jsonDocuments = documents.map(doc => JSON.stringify(doc));
        if(jsonDocuments.length >0){
            // Devolver el array con todos los documentos como JSON
            res.status(200).send('Todos los documentos en una coleccion:'+jsonDocuments);
        }else{
            res.status(200).send('La coleccion esta vacia')
        }  
    } catch (err) {
        console.error("ERROR:"+err);
        res.status(500).json({ message: 'Error al obtener los documentos.' });
    } finally {
        if (client) {
            await client.close(); // Asegurarse de cerrar la conexión si se ha abierto
        }
    }
});

app.get('/documentsFiltered', async (req, res) => {
    try {
        client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db('bootcamp');
        const collection = database.collection('bootcamp');

        // Definir el query para buscar documentos con el campo 'gender' igual a 'Female'
        const query = { gender: 'Female' };

        // Ejecutar el query en la colección
        const filteredDocuments = await collection.find(query).toArray();

        // Convertir cada objeto a JSON y almacenarlos en un array
        const jsonDocuments = filteredDocuments.map(doc => JSON.stringify(doc));

        if(jsonDocuments.length >0){
            // Devolver los documentos que cumplen la condición en base al query
            res.status(200).json("Documentos filtrados segun query: "+jsonDocuments);
        }else{
            res.status(200).send('La coleccion esta vacia')
        }  
    } catch (err) {
        console.error("ERROR:" + err);
        res.status(500).json({ message: 'Error al obtener los documentos filtrados.' });
    } finally {
        if (client) {
            await client.close(); // Asegurarse de cerrar la conexión si se ha abierto
        }
    }
});

app.put('/updateDocument', async (req, res) => {
    try {
        client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db('bootcamp');
        const collection = database.collection('bootcamp');
    
        // Definir el filtro para buscar documentos con el campo 'first_name' igual a 'Brandise'
        //const filter = {  first_name: 'Brandise' }; //este existe y lo modifica
        const filter = {  first_name: 'Julio' }; //este no existe debe crearlo 

        // Definir los campos que deseas actualizar
        const updateDocument = { $set: { married_status: true } };

        // Opciones para la operación de actualización
        const options = { upsert: true }; // Si el documento no existe, crea uno nuevo

        // Realizar la operación de actualización
        const result = await collection.updateOne(filter, updateDocument, options);

        if (result.upsertedCount > 0) {
            // Documento creado (return 201 Created)
            res.status(201).json({ message: 'Documento creado.' });
        } else if (result.modifiedCount > 0) {
            // Documento encontrado y modificado (200 OK)
            res.status(200).json({ message: 'Documento modificado.' });
        } else {
            // Documento no encontrado
            res.status(200).json({ message: 'Documento no encontrado.' });
        }
    } catch (err) {
        console.error("ERROR:" + err);
        res.status(500).json({ message: 'Error al actualizar el documento.' });
    } finally {
        if (client) {
            await client.close(); // Asegurarse de cerrar la conexión si se ha abierto
        }
    }
});

app.delete('/deleteDocument', async (req, res) => {     //cuando ya se a elimiando PETA
    try {
        client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db('bootcamp');
        const collection = database.collection('bootcamp');

        // Definir el filtro para buscar documentos que cumplen una condición (por ejemplo, last_name: 'Southwell')
        const filter = { last_name: 'Southwell' };

        // Realizar la operación de eliminación de documentos que coincidan con el filtro
        const result = await collection.deleteMany(filter);

        if (result.deletedCount > 0) {
            // Documentos encontrados y eliminados (200 OK)
            res.status(200).json({ message: 'Documentos eliminados.' });
        } else if (result.deletedCount === 0) {
            // No se encontraron documentos para eliminar (204 No Content)
            res.status(204).send();
        } 
    } catch (err) {
        console.error("ERROR:" + err);
        res.status(500).json({ message: 'Error al eliminar documentos.' });
    } finally {
        if (client) {
            await client.close(); // Asegurarse de cerrar la conexión si se ha abierto
        }
    }
});

app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);