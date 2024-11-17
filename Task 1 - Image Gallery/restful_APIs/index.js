const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const path = require('path')

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(express.json())

server.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
server.use(bodyParser.json({ limit: '10mb' }));



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'image_gallery',
    waitForConnections: true,
    connectionLimit: 10
})

server.post('/api/signup', (req, res) => {
    const formData = req.body
    const sql1 = 'INSERT INTO signup(FullName,EmailAddress,Password) VALUES (?,?,?);';
    const data1 = [formData.fullName, formData.emailAddress, formData.password];
    console.log(data1)
    pool.query(sql1, data1, (err, result) => {
        if (err) {
            res.json({ status: false, message: 'Internal Serveeeer Error' })
            return
        }
        bcrypt.hash(formData.password, 10, (err, hashedPassword) => {
            if (err) {
                res.json({ status: false, message: 'Error While Encrypting Password' })
                return
            }
            const sql2 = 'INSERT INTO login(Username,Password) VALUES (?,?);';
            const data2 = [formData.emailAddress, hashedPassword];
            pool.query(sql2, data2, (err, result) => {
                if (err) {
                    res.json({ status: false, message: 'Internal Server Error' })
                    return
                }
                res.json({ status: true, message: 'User Created Successfully!!!' })
            })
        })
    })
})

server.post('/api/login', (req, res) => {
    const formData = req.body;
    const sql = 'SELECT Password FROM login WHERE Username=?;';
    const data = [formData.username]
    pool.query(sql, data, (err, result) => {
        if (err) {
            res.json({ status: false, message: 'Internal Server Error' })
            return
        }
        if (result.length == 0) {
            res.json({ status: false, message: 'User Not Found !!' })
            return
        }
        const dbPassword = result[0].Password
        bcrypt.compare(formData.password, dbPassword, (err, result) => {
            if (result) {
                res.json({ status: true, message: 'Login Successfull !!' })
            } else {
                res.json({ status: false, message: 'Login Failed !!' })
            }
        })
    })
})


const storage = multer.diskStorage({
    destination: './uploads/', // Set upload directory
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});


server.post('/add', upload.single('img'), (req, res) => {
    const { title, category, description } = req.body;
    const imgPath = req.file ? req.file.filename : null; // Check if file is uploaded

    if (!title || !category || !description || !imgPath) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO imagedetails (Title, Category, Description, Image) VALUES (?, ?, ?, ?)';
    pool.query(sql, [title, category, description, imgPath], (err, result) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Data inserted successfully', data: result });
    });
});

server.use('/uploads', express.static('uploads'));

server.get('/images', (req, res) => {
    const sql = 'SELECT * FROM imagedetails';
    pool.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.status(200).json(results);
    });
});

server.get('/api/getImageWithCategory/:category', (req, res)=>{
    const category=req.params.category
    const sql='SELECT * FROM imagedetails WHERE Category=?';
    const data=[category]
    pool.query(sql,data, (err, result)=>{
        if(err){
            res.json({status:false, message:'Internal Server Error'})
            return
        }
        res.json({status:true, message:result})
    })    
})

server.get('/api/getImages', (req, res)=>{
    const sql='SELECT * FROM imagedetails;';
    pool.query(sql, (err, result)=>{
        if(err){
            res.json({status:false, message:'Internal Server Error'})
            return
        }
        res.json({status:true, message:result})
    })    
})


const port = 3200
server.listen(port, () => {
    console.log('Server is started listening on port ' + port)
})