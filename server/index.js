import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import {register} from './controllers/auth.js';
import {createPost} from './controllers/posts.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import {fileURLToPath} from 'url';
import { verifyToken } from './middleware/auth.js';
import http from 'http';
import { Server } from 'socket.io';

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


const server = http.createServer(app);
// Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
 
io.on("connection", (socket) => {
   console.log(socket.id);

   socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User joined room: " + data);
   });

   socket.on("send_message", (data) => {
    console.log(data);
         socket.to(data.cluster).emit("receive_message", data);

   })

   socket.on("disconnect", () => {
         console.log("User disconnected");

   })
});



// File Storage 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});


// Routes with files
app.post('/auth/register',upload.single("picture"), register);
app.post('/posts', verifyToken, upload.single("picture"), createPost);

// Routes 
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

// MONGOOSE SETUP  
const port = process.env.PORT;
if(port) {
mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => server.listen(port, () => console.log(`Server running on port: ${port}`)
    ))
    .catch((error) => console.log(error.message));

}

