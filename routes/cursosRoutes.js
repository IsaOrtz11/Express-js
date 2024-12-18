const express = require('express')
const router = express.Router()
const cursosController = require('../controllers/cursosController')
// reuperar estudiantes
router.get('/', cursosController.consultar)



//ingresar estudiante 
router.post('/', cursosController.ingresar )
router.post('/registraEstudiante', cursosController.asociarEstudiante )


// ruta dinamica para mandar el id
router.route('/:id')
    .get( cursosController.consultarDetalle)
    .put( cursosController.actualizar)
    .delete( cursosController.borrar)



module.exports = router