# Shopping List API

Set de endpoints de prueba para comenzar a familizarse con una RESTful API.

## URL actual
https://shopping-api-nkeapfkcbv.now.sh

## Endpoints

`GET /:username/items`

Obtener la lista de todos los items del usuario.

`GET /:username/items/:id`

Obtener los datos del item especificado por el parámetro id.

`POST /:username/items`

Crear un item en el bucket del usuario especificado.

_Parámetros del body_

**name**. Nombre del item a insertar.
```json
{ "name": "sandía" } 
```
`PUT /:username/items/:id`

Actualizar el item seleccionado en el bucket del usuario especificado.

_Parámetros del body_

**name**. Nombre del item a insertar.

**checked**. Especifica si el item ya ha sido seleccionado o no.
```json
{ 
  "name": "sandía",
  "checked": "true"
} 
```

`DELETE /:username/items/:id`

Borrar el item seleccionado del bucket del usuario especificado.

## Local Development
### Requisitos
- NodeJS
- MongoDB

### Primeros pasos
1. Clona este repo
2. Corre `npm install`
3. Corre `npm start` para iniciar el servidor