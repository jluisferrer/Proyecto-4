import express, { Application } from "express";
import "dotenv/config";
import { createRole, deleteRole, getRoles, updateRole } from "./controllers/roleController";
import { AppDataSource } from "./database/db";
import { login, register } from "./controllers/authController";
import { deleteUserById, getUserById, getUsers, updateUserById } from "./controllers/userController";
import { auth } from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";


const app: Application = express();

app.use(express.json())

const PORT = process.env.PORT || 4001;
app.get('/healthy', (req, res) => {
  res.status(200).json(
    {
      success: true,
      message: "Server is healthy"
    }
  );
})

// roles routes
app.get('/roles', getRoles)
app.post('/roles', createRole)
app.put('/roles', updateRole)
app.delete('/roles', deleteRole)
app.put('/roles/:id', updateRole)
app.delete('/roles/:id', deleteRole)

//Auth routes
app.post('/api/auth/register', register)
app.post('/api/auth/login', login)

//User routes
app.get('/api/users', auth, isSuperAdmin, getUsers)
app.get('/api/users/:id', getUserById)
app.put('/api/users/:id', updateUserById)
app.delete('/api/users/:id', deleteUserById)


AppDataSource.initialize()
.then(()=>{
    console.log('Database conected');
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })
})
.catch(error =>{
    console.log(error);
})





