import ServerConfig from './config';
import {createServer, Socket} from "net";
import ChatServer from "./ChatServer";

/**
 * The real chat server
 */
const chatServer = new ChatServer();
const httpServer = createServer((socket: Socket) => {
    chatServer.onClientConnected(socket);
});

/**
 * Listen on the specified host:port
 */
httpServer.listen(ServerConfig.PORT, ServerConfig.HOST, () => {
    console.info(`Listening on ${ServerConfig.HOST}:${ServerConfig.PORT}`);
});
