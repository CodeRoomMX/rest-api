const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const uuid = require('uuid/v1');
const app = express();

app.use(morgan('tiny'));
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
  if(userItems.find(item => item.id === req.params.id)){
    let item = userItems.find(item => item.id === req.params.id);
    res.json(item);
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

app.put('/:username/items/:id', (req, res) => {
  if(!users[req.params.username]){
    return res.status(401).send(`Estás tratando de acceder a una lista invalida`);
  }
  if(!req.params.id){
    return res.status(401).send(`ID inválido`);
  }
  let itemToUpdate = users[req.params.username].find(item => item.id === req.params.id);
  if(!itemToUpdate){
    return res.status(401).send(`ID inválido`);
  }
  const fields = ['name', 'checked'];
  fields.forEach(field => {
    if(req.body[field]){
      itemToUpdate[field] = req.body[field];
    }
  });
  users[req.params.username] = users[req.params.username].map(item => {
    if(item.id === itemToUpdate.id){
      return Object.assign({}, item, itemToUpdate);
    }
    return item;
  })
  res.status(201).json(itemToUpdate);
})

app.delete('/:username/items/:id', (req, res) => {
  if(!users[req.params.username]){
    return res.status(401).send(`Estás tratando de acceder a una lista invalida`);
  }
  if(!req.params.id){
    return res.status(401).send(`ID inválido`);
  }
  const item = users[req.params.username].find(item => item.id === req.params.id);
  if(!item){
    return res.status(401).send(`ID inválido`);
  }
  users[req.params.username] = users[req.params.username].filter(item => item.id !== req.params.id);
  res.status(204).send();
})

app.listen(8000, function(){
  console.log('Server is running');
})