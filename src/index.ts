import { createServer } from '@config/express';
import dotenv from 'dotenv';
import http from 'http';
import * as moduleAlias from 'module-alias';
import { AddressInfo } from 'net';

const sourcePath = 'src';

moduleAlias.addAliases({
    '@server': `${sourcePath}/server`,
    '@config': `${sourcePath}/config`,
    '@tests': `${sourcePath}/__tests__`,
    '@controller': `${sourcePath}/controller`,
    '@middleware': `${sourcePath}/middleware`,
});

dotenv.config();

const startServer = async () => {
    const app = await createServer();
    const server = http.createServer(app).listen({ host: process.env.HOST, port: process.env.PORT }, () => {
        const addressInfo = server.address() as AddressInfo;
        console.log(`Server is ready at ${addressInfo.address}:${addressInfo.port}`)
    });

    const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    signals.forEach((signal) => {
        process.once(signal, async () => {
            console.log(`Process received a ${signal} signal`);

            server.close(() => {
                console.log(`Process terminated: ${signal}`);
                process.exit(0);
            });
        });
    });
}

startServer();