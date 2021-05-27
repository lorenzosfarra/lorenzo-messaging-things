import {assert, expect} from 'chai';

import ChatServer from "../src/ChatServer";
import {createServer, Socket} from "net";

const TEST_HOST = "127.0.0.1";
const TEST_PORT = 10002;

describe("Chat Server Connections", () => {
    let chatServer: any;
    let client: Socket, client_two: Socket, client_three: Socket;
    chatServer = undefined;
    before(done => {
        chatServer = new ChatServer();
        const httpServer = createServer(socket => chatServer.onClientConnected(socket));
        httpServer.listen(TEST_PORT, TEST_HOST);
        // CONNECT CLENTS
        client = new Socket();
        client.connect(TEST_PORT, TEST_HOST);
        client_two = new Socket();
        client_two.connect(TEST_PORT, TEST_HOST);
        client_three = new Socket();
        client_three.connect(TEST_PORT, TEST_HOST);
        done();
    });
    after((done) => {
        if (client) {
            client.end();
        }
        client.end();
        if (client_two) {
            client_two.end();
        }
        if (client_three) {
            client_three.end();
        }
        done();
    });

    it("all clients are connected", function (done) {
        assert.equal(chatServer.clientsNumber(), 3);
        done();
    });

    it("one client is disconnected, number of clients updated", function (done) {
        client_two.on("end", () => {
            expect(chatServer.clientsNumber()).to.equal(2);
            expect(client_two.destroyed).to.be.true;
            done();
        });
        client_two.end();
    });
});
