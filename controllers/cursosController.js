const db = require('../database/conexion')

class CursosController{
    constructor(){


    }
    consultar(req, res) {
        try {
            db.query(`SELECT * FROM cursos`, (err, rows)=>{
                        if(err){
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
            db.query(`SELECT * FROM cursos where id= ${id}`, (err, rows)=>{
                        if(err){
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
            const {nombre, descripcion, profesor_id} = req.body
            db.query(`INSERT INTO cursos (id, nombre, descripcion, profesor_id)
                    VALUES(NULL, ?, ?, ?);`, [nombre, descripcion, profesor_id], (err, rows)=>{
                        if(err){
                            res.status(400).send(err)
                        }else{
                            res.status(201).json({id: rows.insertId})

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
            const {nombre, descripcion, profesor_id} = req.body
            db.query(`UPDATE cursos
                    SET nombre=?, descripcion=?, profesor_id=?
                    WHERE id=${id};`, [nombre, descripcion, profesor_id], (err, rows)=>{
                        if(err){
                            res.status(400).send(err)
                        }
                        if(rows.affectedRows == 1){
                            res.status(201).json({respuesta: `Registro actualizado con exito`})
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
            db.query(`DELETE FROM cursos WHERE id=${id};`, (err, rows)=>{
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
    asociarEstudiante(req, res){
        try {
            const {curso_id, estudiante_id} = req.body
            db.query(`INSERT INTO cursos_estudiantes (curso_id, estudiante_id) VALUES(?, ?);`, [curso_id, estudiante_id], (err, rows)=>{
                        if(err){
                            res.status(400).send(err)
                        }else{
                            res.status(201).json({respuesta: 'Estudiante registrado a curso'})

                        }

                    } 
            )

        } catch (error) {
            
            res.status(500).send(error.message)
        }

    }

}

module.exports = new CursosController()