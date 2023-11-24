import express from 'express';
import cors from 'cors';

const createServer = (): express.Application => {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.json());

    app.disable('x-powered-by');

    //* Routes
    app.get('/health', (req, res) => {
        res.send('UP');
    });

    return app;
}

export { createServer };