import {Socket} from "net";
import {ClientUtils, TimeUtils} from "./Utils";

/**
 * The real chat server.
 * It keeps an updated list of connected clients, broadcasts the messages.
 */
export default class ChatServer {

    /**
     * Connected clients
     */
    clients: Set<Socket>;

    constructor() {
        this.clients = new Set();
    }

    addClient(client: Socket) {
        this.clients.add(client);
    }

    removeClient(client: Socket) {
        this.clients.delete(client);
    }

    /**
     * The main loop - that's where the chat begins!
     * @param socket Socket
     */
    onClientConnected(socket: Socket) {
        this.addClient(socket); // Add the client to the connected clients list
        // Handle incoming messages from clients.
        socket.on('data', data => this.messageReceived(socket, data));
        // Remove the client from the list when it leaves
        socket.on('end', () => this.disconnect(socket));
    }

    /**
     * Send a message in the chat, except for myself!
     * @param messageRaw
     * @param sender
     */
    sendMessage(messageRaw: string, sender: Socket | null) {
        const message = `[${TimeUtils.nowForChat()}] ${messageRaw}`;
        for (let client of Array.from(this.clients)) {
            // Skip myself!
            if (client !== sender) {
                client.write(message);
            }
        }
    }

    /**
     * Message received, let's write a formatted message.
     *
     * @param socket
     * @param message
     * @private
     */
    private messageReceived(socket: Socket, message: any) {
        this.sendMessage(`${ClientUtils.nameFromSocket(socket)}: ${message}`, socket);
    }

    /**
     * Disconnecting! We send a message to inform other users and we update the connected clients list.
     *
     * @param socket
     * @private
     */
    private disconnect(socket: Socket) {
        this.removeClient(socket);
        const clientsNumber = this.clients.size;
        const leftMessage = (clientsNumber === 1) ? 'You are alone :(' : `We are still ${clientsNumber} to party! :)`;
        this.sendMessage(`${ClientUtils.nameFromSocket(socket)} left. ${leftMessage}`, null);
        socket.destroy();
    }

    /**
     * Disconnect everyone
     */
    destroy() {
        for (let client of Array.from(this.clients)) {
            // Skip myself!
            client.end();
        }
    }

    clientsNumber(): number {
        return this.clients.size;
    }
}
