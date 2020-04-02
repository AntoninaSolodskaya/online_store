require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');
const cors = require('cors');

const server = createServer();

// TODO Use express middlware to handle cookies (JWT)
// TODO Use express middlware to populate current user
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
};

server.use(cors(corsOptions));

server.start(
    {
        cors: corsOptions
    },
    deets => {
        console.log(`Server is now running on port http:/localhost:${deets.port}`);
    }
)