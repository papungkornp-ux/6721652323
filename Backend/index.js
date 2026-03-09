const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')

const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(cors())

let conn = null

// เชื่อมต่อ MySQL
const iniMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    })
}

// validate ข้อมูล
const validateData = (user) => {
    let errors = []

    if (!user.firstname) errors.push('กรุณากรอกชื่อ')
    if (!user.lastname) errors.push('กรุณากรอกนามสกุล')
    if (!user.age) errors.push('กรุณากรอกอายุ')
    if (!user.gender) errors.push('กรุณาเลือกเพศ')
    if (!user.interests || user.interests.length === 0)
        errors.push('กรุณาเลือกความสนใจ')
    if (!user.description)
        errors.push('กรุณากรอกคำอธิบาย')

    return errors
}

// ======================
// GET USERS ทั้งหมด
// ======================
app.get('/users', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM users')
        res.json(results[0])
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        })
    }
})

// ======================
// GET USER BY ID
// ======================
app.get('/users/:id', async (req, res) => {
    try {

        const id = req.params.id
        const results = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        )

        if (results[0].length === 0) {
            throw { statusCode: 404, message: 'User not found' }
        }

        res.json(results[0][0])

    } catch (error) {

        const statusCode = error.statusCode || 500

        res.status(statusCode).json({
            message: error.message
        })
    }
})

// ======================
// CREATE USER
// ======================
app.post('/user', async (req, res) => {

    try {

        const user = req.body

        const errors = validateData(user)

        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }

        const results = await conn.query(
            'INSERT INTO users SET ?',
            user
        )

        res.json({
            message: 'User created successfully',
            data: results[0]
        })

    } catch (error) {

        const errorMessage = error.message || 'Error creating user'
        const errors = error.errors || []

        res.status(500).json({
            message: errorMessage,
            error: errors
        })
    }
})

// ======================
// UPDATE USER
// ======================
app.put('/users/:id', async (req, res) => {

    try {

        const id = req.params.id
        const user = req.body

        const results = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [user, id]
        )

        res.json({
            message: 'User updated successfully'
        })

    } catch (error) {

        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        })
    }
})

// ======================
// DELETE USER
// ======================
app.delete('/user/:id', async (req, res) => {

    try {

        const id = req.params.id

        await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        )

        res.json({
            message: 'User deleted successfully'
        })

    } catch (error) {

        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        })
    }
})

// start server
app.listen(port, async () => {

    await iniMySQL()

    console.log(`Server running on port ${port}`)
})