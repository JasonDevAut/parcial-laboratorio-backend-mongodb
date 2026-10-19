use coworking

db.createCollection("logs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["accion", "statusCode", "IP", "id_usuario", "fecha_ejecucion"],
      properties: {
        accion: {
          bsonType: "string",
          description: "Nombre de la accion"
        },
        statusCode: {
          bsonType: "int",
          minimum: 100,
          maximum: 599,
          description: "Codigo de estado de salida"
        },
        IP: {
          bsonType: "string",
          description: "IP de la ejecucion"
        },
        id_usuario: {
          bsonType: "string",
          description: "Identificador del usuario que ejecuta la accion"
        },
        metodo: {
          bsonType: "string",
          description: "Verbo HTTP de la peticion"
        },
        ruta: {
          bsonType: "string",
          description: "Ruta solicitada"
        },
        fecha_ejecucion: {
          bsonType: "date",
          description: "Fecha de ejecucion de la accion"
        },
        reservaId: {
          bsonType: "int",
          description: "Reserva relacionada cuando la accion lo tiene"
        },
        texto: {
          bsonType: "string",
          description: "Comentario asociado cuando la accion es un comentario"
        },
        mensaje: {
          bsonType: "string",
          description: "Resultado de la peticion o mensaje original de un error interno"
        },
        descripcion: {
          bsonType: "string",
          description: "Detalle de la peticion o traza original de un error interno"
        }
      }
    }
  }
})

db.createCollection("comentarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["reservaId", "texto", "fecha"],
      properties: {
        reservaId: {
          bsonType: "int",
          minimum: 1,
          description: "Reserva a la que pertenece el comentario"
        },
        texto: {
          bsonType: "string",
          description: "Texto del comentario"
        },
        fecha: {
          bsonType: "date",
          description: "Fecha en la que se registro el comentario"
        }
      }
    }
  }
})
