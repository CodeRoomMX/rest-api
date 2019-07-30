# Shopping List API

Set de endpoints de prueba para comenzar a familizarse con una RESTful API.

## URL actual
https://shopping-api-lsvctkqwuc.now.sh 

## Endpoints

`GET /:username/items`

Obtener la lista de todos los items del usuario.

`GET /:username/items/:id`

Obtener los datos del item especificado por el parámetro id.

`POST /:username/items`

Crear un item en el bucket del usuario especificado.

_Body_
```json
{ name: sandía } 
```

## Local Development
### Requisitos
- NodeJS
- MongoDB

### Primeros pasos
1. Clona este repo
2. Corre `npm install`
3. Corre `npm start` para iniciar el servidor