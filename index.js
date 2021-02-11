const server = require("./api/server");

const database = require("./api/users/model");

// START YOUR SERVER HERE

//1)
server.post("/api/users", (req, res) => {
  const user = req.body;
  console.log(req.body);
  if (user === undefined || user.name === undefined || user.bio === undefined) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    database
      .insert(user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((error) => {
        res
          .status(500)
          .json({
            message: "There was an error while saving the user to the database",
          });
      });
  }
});

//2)
server.get("/api/users", (req, res) => {
  database
    .find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});
//3)
server.post("/api/users/:id", (req, res) => {
  const user = req.body;

  database.findById(user.id).then((user) => {
      if(user===null){
          res.status(404)
          .json({message:'The user with the specified ID does not exist'})
      }
  }).catch((error)=>{
res.status(500)
    .json({ message: "The user information could not be retrieved" })
  })

});

//4)
server.delete("/api/users/:id", (req, res) => {
    const user = req.body;
  
    database.remove(user.id).then((user) => {
        if(user===null){
            res.status(404)
            .json({message:'The user with the specified ID does not exist'})
        }
    }).catch((error)=>{
  res.status(500)
      .json({ message: "The user could not be removed"  })
    })
  
  });

  //5)

  server.put("/api/users/:id", (req, res) => {
    const user = req.body;
    if (user === undefined || user.name === undefined || user.bio === undefined) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      }
    database.findById(user.id).then((user) => {
        if(user===null){
            res.status(404)
            .json({message:'The user with the specified ID does not exist'})
        }else{
            database.update(user).then((newUser) =>{
                res.status(200).json(newUser)
            })
        }
    }).catch((error)=>{
  res.status(500)
      .json({ message: "The user information could not be modified"  })
    })
  
  });

