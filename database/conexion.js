const mysql =require('mysql2')

const db =mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        port: 3306,
        database: 'cursos'
    }
)

db.connect((err) =>{
    if(err){
        throw err
    }
    console.log('base de datos conectada')
})

module.exports = db