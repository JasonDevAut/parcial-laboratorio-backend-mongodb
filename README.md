# MongoDB

Este directorio es el repositorio de logs. La API y los scripts de SQL Server se entregan en repositorios aparte.

`esquemas.js` crea la base `coworking` y dos colecciones con validador `$jsonSchema`. `logs` sigue el formato del ejemplo de `log_auditoria`: exige `accion`, `statusCode`, `IP`, `id_usuario` y `fecha_ejecucion`. `metodo`, `ruta`, `reservaId`, `texto`, `mensaje` y `descripcion` completan el detalle. `comentarios` exige `reservaId`, `texto` y `fecha`.

`carga-inicial.js` inserta logs con `insertOne` e `insertMany`, agrupa los de código 400 o mayor, e inserta un comentario de ejemplo.

## Docker

Desde este directorio:

```text
docker compose up -d
```

Levanta MongoDB y publica el puerto `27018` del host. No crea colecciones ni inserta documentos. El puerto no es 27017 porque ese puede estar ocupado por otro contenedor.

Con el motor en marcha, un DBA aplica el esquema y la carga. Hay que pasar los scripts por stdin: `mongosh` 2.x no ejecuta el resto del archivo si la primera línea es `use` y el archivo se pasa como argumento.

```text
mongosh --host 127.0.0.1 --port 27018 < esquemas.js
mongosh --host 127.0.0.1 --port 27018 < carga-inicial.js
```
