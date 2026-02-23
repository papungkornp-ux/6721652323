const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1;
let conn = null
const iniMySQL =async () =>{
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    });
}


app.get('/testdb-new',async (req, res)=>{
    try {
        const resulys = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    }catch(error){
        console.error('Database query error: ',error.message);
        res.status(500).json({error: 'Database query error'});
    }
});

/*
Get / users สำหรับ get ข้อมูล users ทั้งหมด 
POST / users
GET / users
*/



//ดึงข้อมูล users ทั้งหมด
app.get('/users',async (req, res)=>{
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0]);
})

//path = /users 
app.get('/users',(req,res)=>{
    let user = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
    };
    res.json(user);
});

//path = POST / user
app.post('/user',(req, res)=>{
    let user = req.body;
    user.id = counter++
    users.push(user);
    console.log('user',user);
    res.json({
        message: 'User added successfully',
        user: user
    });
})

//path GET /users/id:
app.get('/users/:id',async (req,res)=>{
    try{
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?',id)
        if(results[0].length == 0){
            throw{statusCode: 404,message: 'User not found'};
        }


        res.json(results[0][0]);
    }
    catch(error){
        console.error('Error fetching user:',error.message)
        let statusCode = error.statusCode || 500;
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
})



app.post('/users', async (req, res)=>{
    try{
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?',user)
        console.log('results',results);
        res.json({
            message: 'User created succeddfully',
            data: results[0]
        }) 
    }catch(error){
        res.status(500).json({
        message: 'Error creating user',
        error: error.message
        });
    }
    
});

app.put('/users/:id',async (req, res)=>{
    //ส่ง response กลับไปว่า update สำเร็จ
    try{
        let id = req.params.id
        const results = await conn.query('UPDATA * FROM users WHERE id = ?',id)
        if(results[0].length == 0){
            throw{statusCode: 404,message: 'User not found'};
        }


        res.json(results[0][0]);
    }
    catch(error){
        console.error('Error fetching user:',error.message)
        let statusCode = error.statusCode || 500;
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
        
})

app.delete('/user/:id',(req, res)=>{
    let id = req.params.id
    let selectedIndex = users.findIndex(user=>user.id==id)
    if(selectedIndex!==-1){
        users.splice(selectedIndex,1)
        res.json({
            message: 'User deleted successfully',
            data:{
                indexDeleted: selectedIndex
            }
        })
    } else (
        res.status(404).json({
            message: 'User not found'
        })
    )
})

app.listen(port, async ()=>{
    await iniMySQL();
    console.log(`Server is runnig on port ${port}`);
});