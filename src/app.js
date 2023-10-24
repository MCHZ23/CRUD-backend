import express from "express";
 import db from './utils/database.js';
 import User from './models/users.model.js';
import 'dotenv/config';
 User;

 console.log(process); 

 const PORT = process.env.PORT ?? 8000;

 db.authenticate()
 .then(() => {
    console.log('coneccion correcta')})
 .catch(error => console.log(error))

 db.sync()
   .then(() => console.log('base de datos sincronizada'))
   .catch(error => console.log(error))

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('OK')
});

//Create user

app.post('/users', async (req, res) => {
    try {
      const { body } = req;
      const user = await User.create (body);
     res.status(201).json(user);
    }catch (error) {
     res.status(400).json(error)
    }
})

//READuser
//GET/users

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    }catch (error){
        res.status(400).json(error)

    }
})


//SELECT * FROM users WHERE id=4;
//GET/users
//?como mandamos el id en este get
//path params
///pokemon/:id

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
})

//UPDATE .....WHERE id = 5
//put '/users' => path params
//la inofrmacion a actualizar  por el body
app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {body} = req;
        //primer objeto es la info
        //segundo objeto es el where 
        const user = await User.update(body, {
            where: {id: id}
        })
        res.json(user);
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

     await User.destroy({
        where: {id}
     });
     res.status(204).end()
    } catch (error) {
        res.status(400).json(error);

  }
})
