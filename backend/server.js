require('dotenv').config(); 
const express = require ('express');
const cors = require ('cors');
const chatRoutes = require('./routes/chatRoutes');
const pptRoutes = require('./routes/pptRoutes');

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: allowedOrigin,                 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true                       
}));


app.use('/api/chat', chatRoutes);
app.use('/api/ppt', pptRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})