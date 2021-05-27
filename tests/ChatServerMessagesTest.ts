import {expect} from 'chai';

import ChatServer from "../src/ChatServer";
import {createServer, Socket} from "net";
import {Done} from "mocha";

const checkMessage = (val: string, message: string) => val.endsWith(message) || val.includes("left.");

const TEST_HOST = "127.0.0.1";
const TEST_PORT = 10001;

describe("Chat Messages", () => {
    let chatServer: any;
    let client: Socket, client_two: Socket, client_three: Socket;
    chatServer = undefined;
    before(function(done: Done) {
        chatServer = new ChatServer();
        const httpServer = createServer(socket => chatServer.onClientConnected(socket));
        httpServer.listen(TEST_PORT, TEST_HOST);
        done();
    });
    beforeEach(function(done: Done) {
        client = new Socket();
        client.connect(TEST_PORT, TEST_HOST);
        client_two = new Socket();
        client_two.connect(TEST_PORT, TEST_HOST);
        client_three = new Socket();
        client_three.connect(TEST_PORT, TEST_HOST)
        done();
    });
    after(function(done: Done) {
        if (client) {
            client.end();
        }
        if (client_two) {
            client_two.end();
        }
        if (client_three) {
            client_three.end();
        }
        done();
    });

    it("message received", function (done: Done) {
        const message = "hi from me";
        client_two.on("data", (buffer: string) => {
            expect(buffer.toString()).to.satisfy((val: string) => checkMessage(val, message));
        });
        client_three.on("data", (buffer: string) => {
            expect(buffer.toString()).to.satisfy((val: string) => checkMessage(val, message));
        });
        client.write(message);
        done();
    });
});
