  const express = require('express');
  const fs = require('fs');
  const path = require('path');
  const app = express();
  const port = 3000
  const bodyParser = require('body-parser');
  
  app.use(bodyParser.json());
  
  // For finding the Index of a particular TODO
  function findIndex(arr,requiredId) {
    for(let i = 0 ; i < arr.length ; i++){
      if(arr[i].id === requiredId){
        return i;
      }
    }
    return -1;
  }
  
  // Handler for getting all the TODOs
  app.get('/todos', (req, res) => {
    fs.readFile('../db/todos.json','utf-8', (err,data) => {
        if(err) throw err;
        else res.json(JSON.parse(data));
    })
  })
  
  // Handler for getting the TODO with specific id
  app.get('/todos/:id', (req, res) => {
    fs.readFile('../db/todos.json','utf-8', (err,data) => {
        if(err) throw err;
        else{
            let arr = JSON.parse(data);
            let ID = parseInt(req.params.id);
            let Index = findIndex(arr,ID);
            if(Index === -1){
                res.status(400).send({ message : `Todo with ${ID} do not exist!`});
            }
            else{
                let requiredTodo = {
                    title : arr[Index].title,
                    desc : arr[Index].desc
                }
                res.json(requiredTodo);
            }
        }
    })
    })
  
  // Handler for posting new TODOs
  app.post('/todos', (req, res) => {
    let obj = {
      id : Math.floor(Math.random() * 1000),
      title : req.body.title,
      desc : req.body.desc
    };
    fs.readFile('../db/todos.json', 'utf-8', (err,data) => {
      if(err) throw err;
      let arr = JSON.parse(data);
      arr.push(obj);
      fs.writeFile('../db/todos.json', JSON.stringify(arr) , (err) => {
          if (err) throw err;
        });
      res.send(obj);
    });
  })
  
  // Handler for updating the TODO with specific id
  app.put('/todos/:id', (req, res) => {
    fs.readFile('../db/todos.json','utf-8', (err,data) => {
      if(err) throw err;

      let arr = JSON.parse(data);
      let ID = parseInt(req.params.id);
      let Index = findIndex(arr,ID);
  
      if(Index === -1){
        res.status(404).send({message : `Todo with ${ID} is not present!`});
      }
      else{
        let newTitle = req.body.title; 
        let newDesc = req.body.desc;
        arr[Index].title = newTitle;
        arr[Index].desc = newDesc;
        fs.writeFile('../db/todos.json', JSON.stringify(arr) , (err) => {
          if(err) throw err;
          res.send(arr[Index]);
        });
      }
    });
  })
  
  // Handler for deleting the TODO with a specific id
  app.delete('/todos/:id', (req, res) => {
    fs.readFile('../db/todos.json','utf-8',(err,data) => {
      let arr = JSON.parse(data);
      let ID = parseInt(req.params.id);
      let indexToDelete = findIndex(arr,ID);
      if(indexToDelete === -1){
        res.status(404).send({ message : `Todo with ${ID} is not present!`});
      }
      else{
        let deletedTodo = arr[indexToDelete];
        arr.splice(indexToDelete, 1);
        fs.writeFile('../db/todos.json',JSON.stringify(arr), (err) => {
          if(err) throw err;
          res.send(deletedTodo);
        });
      }
    });
  })

  // Serving frontend file the backend to avoid CORS error.
  app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname , "../../FrontEnd/index.html"));
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  // To handle all the undefined route. we introduced custom middleware.
  app.use((req, res, next) => {
    res.status(404).send();
  });
  
  
  
  