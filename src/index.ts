import ServerConfig from './config';
import {createServer} from "net";
import ChatServer from "./ChatServer";

/**
 * The real chat server
 */
const chatServer = new ChatServer();
const httpServer = createServer(socket => {
    chatServer.onClientConnected(socket);
});

/**
 * Listen on the specified host:port
 */
httpServer.listen(ServerConfig.PORT, ServerConfig.HOST, () => {
    console.info(`Listening on ${ServerConfig.HOST}:${ServerConfig.PORT}`);
});
