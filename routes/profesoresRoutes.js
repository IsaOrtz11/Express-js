const express = require('express')
const router = express.Router()
const ProfesoresController = require('../controllers/profesoresController')
// reuperar estudiantes
router.get('/', ProfesoresController.consultar)



//ingresar estudiante 
router.post('/', ProfesoresController.ingresar )


// ruta dinamica para mandar el id
router.route('/:id')
    .get( ProfesoresController.consultarDetalle)
    .put( ProfesoresController.actualizar)
    .delete( ProfesoresController.borrar)



module.exports = router