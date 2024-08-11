require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/document');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors())

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('document-update', (data)=>{
        socket.broadcast.emit('document-update', data);
    })

    socket.on('disconnect', ()=>{
        console.log('User disconnected', socket.id);
    })
})

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('MongoDB connected'))
.catch((err)=> console.error('Mongodb connection error:',err));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

app.get('/', (req, res) => {
    res.send("Hello, Data");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})