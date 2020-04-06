const cookieParser = require('cookie-parser');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');
const cors = require('cors');

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        // put the userId onto the req for future requests to access
        req.userId = userId;
    }
    next();
});

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