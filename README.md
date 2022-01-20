# ScrappingJavascipt
Prueba técnica para la empresa Roshka

# REST API application

API RESTful que provee la informacion apificada de la pagina https://www.abc.com.py/buscar/ solicitada como Prueba Tecnica por la empresa Roshka.

## Deploy en Heroku
    Puede realizar las Peticiones directamente en:
    https://dcolman-api-roshka.herokuapp.com/consulta?q={Texto_Filtro}
    
    Documentacion Swagger
    https://dcolman-api-roshka.herokuapp.com/api-docs

## Probado con las siguientes versiones
    node --version = v16.13.2
    npm --version = 8.3.1

## Install

    npm install

## Run the app

    npm start

## Documentacion Swagger

    http://localhost:3001/api-docs


# REST API

La API RESTful es descripta abajo.

## Get

### Request

`GET /consulta`

    curl -i -H 'Accept: application/json' http://localhost:3001/consulta?q={TEXTO_FILTRO}

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 6657
    ETag: W/"1a01-mlVrgPDxUvmkEUVRx7hro+yerqo"
    Date: Thu, 20 Jan 2022 04:17:38 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5


    []


## Get a non-existent Consulta

### Request

`GET /consulta`

    curl -i -H 'Accept: application/json' http://localhost:3001/consulta?q=A00X000B

### Response

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 77
    ETag: W/"4d-C0n25hLiHLJsjtulC02KPRuzaUE"
    Date: Thu, 20 Jan 2022 04:21:03 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"codigo":"g267","error":"No se encuentran noticias para el texto: A00X000B"}


## Get Parametro Invalido Consulta

### Request

`GET /consulta`

    curl -i -H 'Accept: application/json' http://localhost:3001/consulta?

### Response

    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 50
    ETag: W/"32-J2VrK4DfCo3g1upfJtwfZgj2DPQ"
    Date: Thu, 20 Jan 2022 04:23:53 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"codigo":"g268","error":"Parámetros inválidos"}


## Get Error de Servidor Consulta

### Request

`GET /consulta`

    curl -i -H 'Accept: application/json' http://localhost:3001/consulta?q={TEXTO_FILTRO}

### Response

    HTTP/1.1 500 Internal Server Error
    Server: Cowboy
    Connection: keep-alive
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 54
    Etag: W/"36-8+XqNq0ySulHTLpA/E2+iI4oUM0"
    Date: Thu, 20 Jan 2022 04:27:21 GMT
    
    {"codigo":"g100","error":"Error interno del servidor"}