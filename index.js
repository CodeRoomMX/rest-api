const express = require('express');
const cors = require('cors');
const uuid = require('uuid/v1');
const app = express();

app.use(cors());
app.use(express.json());

const items = [
  {id: uuid(), name: "tortillas", checked: true},
  {id: uuid(), name: "plátano", checked: false},
  {id: uuid(), name: "leche", checked: false},
  {id: uuid(), name: "pasta de dientes", checked: false}
];

const users = {};

app.get('/:username/items', (req, res) => {
  if(!users[req.params.username]){
    users[req.params.username] = [...items];
  }
  res.json(users[req.params.username]); 
})

app.get('/:username/items/:id', (req, res) => {
  if(!users[req.params.username]){
    users[req.params.username] = [...items];
  }
  const userItems = users[req.params.username];
  if(userItems[req.params.id]){
    res.json(userItems[req.params.id]);
  }else{
    res.status(404).send('Not Found');
  }
})

app.post('/:username/items', (req, res) => {
  if(!users[req.params.username]){
    return res.status(401).send(`Estás tratando de acceder a una lista invalida`);
  }
  if(!req.body.name){
    return res.status(401).send(`No agregaste la propiedad name al body`);
  }
  const newItem = {id: uuid(), name: req.body.name, checked: false};
  users[req.params.username].push(newItem);
  res.json(newItem);
})

app.listen(8000, function(){
  console.log('Server is running');
})