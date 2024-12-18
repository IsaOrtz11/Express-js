const db = require('../database/conexion')

class ProfesoresController {
    constructor() {


    }
    consultar(req, res) {
        try {
            db.query(`SELECT * FROM profesores`, (err, rows) => {
                if (err) {
                    res.status(400).send(err)
                }else{
                    res.status(201).json(rows)

                }
            }
            )

        } catch (error) {

            res.status(500).send(error.message)
        }

    }
    consultarDetalle(req, res) {
        const { id } = req.params
        try {
            db.query(`SELECT * FROM profesores where id= ${id}`, (err, rows) => {
                if (err) {
                    res.status(400).send(err)
                }else{
                    res.status(201).json(rows)

                }
            }
            )

        } catch (error) {

            res.status(500).send(error.message)
        }
    }
    ingresar(req, res) {
        try {
            const { dni, nombre, apellido, email, profesion, telefono } = req.body
            db.query(`INSERT INTO profesores
                    (id, dni, nombre, apellido, email, profesion, telefono)
                    VALUES(NULL, ?, ?, ?, ?, ?, ?);`, [dni, nombre, apellido, email, profesion, telefono], (err, rows) => {
                if (err) {
                    res.status(400).send(err)
                }else{
                    res.status(201).json(rows)

                }

            }
            )

        } catch (error) {

            res.status(500).send(error.message)
        }

    }
    actualizar(req, res) {
        const { id } = req.params
        try {
            const { dni, nombre, apellido, email, profesion, telefono } = req.body
            db.query(`UPDATE profesores
                    SET dni=?, nombre=?, apellido=?, email=?, profesion=?, telefono=?
                    WHERE id=${id};`, [dni, nombre, apellido, email, profesion, telefono], (err, rows) => {
                if (err) {
                    res.status(400).send(err)
                }
                if (rows.affectedRows == 1) {
                    res.status(200).json({ respuesta: `Registro actualizado con exito` })
                }

            }
            )

        } catch (error) {

            res.status(500).send(error.message)
        }

    }
    borrar(req, res) {
        const { id } = req.params
        try {
            db.query(`DELETE FROM profesores WHERE id=${id};`, (err, rows) => {
                if (err) {
                    res.status(400).send(err)
                }
                if (rows.affectedRows == 1) {
                    res.status(200).json({ respuesta: `Registro eliminado con exito` })
                }

            }
            )

        } catch (error) {

            res.status(500).send(error.message)
        }
    }

}

module.exports = new ProfesoresController()