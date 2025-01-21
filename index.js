require('dotenv').config();

const express = require('express')
const cors = require('cors')
const app = express()
const estudiantesRoutes = require('./routes/estudiantesRoutes')
const profesoresRoutes = require('./routes/profesoresRoutes')
const cursosRoutes = require('./routes/cursosRoutes')
const authRoutes = require('./routes/authRoutes');


app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes);

app.use('/api/estudiantes', estudiantesRoutes)
app.use('/api/profesores', profesoresRoutes)
app.use('/api/cursos', cursosRoutes)

app.get('/', ( res) =>{
    res.send('Hola mundo')
})

app.listen(3000, () =>{
    console.log('servidor activo')
})