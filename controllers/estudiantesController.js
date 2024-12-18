const db = require('../database/conexion')

class EstudiantesController {
    constructor() {


    }
    consultar(req, res) {
        try {
            db.query(`SELECT * FROM estudiantes`, (err, rows)=>{
                        if(err){
                            res.status(400).send(err)
                        }

                        res.status(201).json(rows)
                    } 
            )

        } catch (error) {
            
            res.status(500).send(error.message)
        }

    }
    consultarDetalle(req, res) {
        const { id } = req.params
        try {
            db.query(`SELECT * FROM estudiantes where id= ${id}`, (err, rows)=>{
                        if(err){
                            res.status(400).send(err)
                        }

                        res.status(201).json(rows)
                    } 
            )

        } catch (error) {
            
            res.status(500).send(error.message)
        }
    }
    ingresar(req, res) {
        try {
            const {dni, nombre, apellido, email} = req.body
            db.query(`INSERT INTO estudiantes
                    (id, dni, nombre, apellido, email)
                    VALUES(NULL, ?, ?, ?, ?);`, [dni, nombre, apellido,email], (err, rows)=>{
                        if(err){
                            res.status(400).send(err)
                        }

                        res.status(201).json({id: rows.insertId})
                    } 
            )

        } catch (error) {
            
            res.status(500).send(error.message)
        }

    }
    actualizar(req, res) {
        const { id } = req.params
        try {
            const {dni, nombre, apellido, email} = req.body
            db.query(`UPDATE estudiantes
                    SET dni=?, nombre=?, apellido=?, email=?
                    WHERE id=${id};`, [dni, nombre, apellido,email], (err, rows)=>{
                        if(err){
                            res.status(400).send(err)
                        }
                        if(rows.affectedRows == 1){
                            res.status(200).json({respuesta: `Registro actualizado con exito`})
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
            db.query(`DELETE FROM estudiantes WHERE id=${id};`, (err, rows)=>{
                        if(err){
                            res.status(400).send(err)
                        }
                        if(rows.affectedRows == 1){
                            res.status(200).json({respuesta: `Registro eliminado con exito`})
                        }

                    } 
            )

        } catch (error) {
            
            res.status(500).send(error.message)
        }
    }

}

module.exports = new EstudiantesController()