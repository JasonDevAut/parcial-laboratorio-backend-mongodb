use coworking

db.logs.insertOne({
  accion: "Consulta Salas",
  statusCode: 200,
  IP: "198.26.24.124",
  id_usuario: "1",
  metodo: "GET",
  ruta: "/api/salas",
  fecha_ejecucion: new Date("2026-01-01T09:10:10Z")
})

db.logs.insertMany([
  {
    accion: "Registro Reserva",
    statusCode: 201,
    IP: "198.26.24.128",
    metodo: "POST",
    ruta: "/api/reservas",
    fecha_ejecucion: new Date("2026-01-01T09:10:12Z"),
    id_usuario: "1",
    reservaId: 1
  },
  {
    accion: "Registro Comentario",
    statusCode: 201,
    IP: "198.26.24.121",
    metodo: "POST",
    ruta: "/api/reservas/1/comentarios",
    fecha_ejecucion: new Date("2026-01-01T09:10:13Z"),
    id_usuario: "1",
    reservaId: 1,
    texto: "Llegare cinco minutos antes"
  },
  {
    accion: "Consulta Usuarios",
    statusCode: 400,
    IP: "198.26.24.121",
    id_usuario: "2",
    metodo: "POST",
    ruta: "/api/usuarios",
    fecha_ejecucion: new Date("2026-01-01T09:11:01Z")
  },
  {
    accion: "Consulta Reserva",
    statusCode: 404,
    IP: "198.26.24.201",
    id_usuario: "3",
    metodo: "GET",
    ruta: "/api/reservas/999",
    fecha_ejecucion: new Date("2026-01-01T09:11:03Z")
  }
])

db.comentarios.insertOne({
  reservaId: 1,
  texto: "Llegare cinco minutos antes",
  fecha: new Date("2026-01-01T09:10:13Z")
})

db.logs.aggregate(
  { $match: { statusCode: { $gte: 400 } } },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d %H:%M", date: "$fecha_ejecucion" } },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
)
