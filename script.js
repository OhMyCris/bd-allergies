const express = require("express")
const fs = require('fs');
const cors = require('cors')
const back = require('./src/utils/db/back.json')
const bodyParser = require('body-parser')

const PORT = 5000;

const app = express();
app.use(cors());
const routerUsers = express.Router();

app.use(
    bodyParser.urlencoded({
      limit: '20mb',
      extended: true
    })
  ) 
  app.use(
    bodyParser.json({
      limit: '20mb'
    })
  )


app.use("/users", routerUsers)
routerUsers.get("/", (req, res) =>{
    res.json(back.users);
})

routerUsers.get("/emergency_contact", (req, res) =>{
    res.json(back.emergency_contact);
})

routerUsers.post("/emergency_contact", (req, res) => {
    console.log(req.body);
    try {
        const { fullname, email, mobile, company } = req.body;
        const nuevoContacto = { fullname, email, mobile, company };
        back.emergency_contact.push(nuevoContacto);

        // fs.writeFileSync('./src/utils/db/back.json', JSON.stringify(back, null, 2));
        res.status(200).json({ message: 'Datos de contacto de emergencia guardados correctamente' });
    } catch (error) {
        console.error('Error al guardar los datos de contacto de emergencia:', error);
        res.status(500).json({ error: 'Error interno del servidor'});
    }
})

app.get("/alergies", (req, res) =>{
    res.json(back.alergies);
})

app.get("/food", (req, res) =>{
    res.json(back.food);
})

app.get("/", (req, res) =>{
    res.json(back);
})

app.listen(PORT, () => console.log(`escuchando en el puerto http://localhost:${PORT}`));