const express = require('express')
const router = express.Router()
const estudiantesController = require('../controllers/estudiantesController')
const authMiddleware = require('../middlewares/authMiddleware'); 

// reuperar estudiantes
router.get('/', authMiddleware, estudiantesController.consultar)



//ingresar estudiante 
router.post('/', estudiantesController.ingresar )


// ruta dinamica para mandar el id
router.route('/:id')
    .get( estudiantesController.consultarDetalle)
    .put( estudiantesController.actualizar)
    .delete( estudiantesController.borrar)



module.exports = router