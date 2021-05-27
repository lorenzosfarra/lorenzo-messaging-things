"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var config_1 = __importDefault(require("../src/config"));
var ChatServer_1 = __importDefault(require("../src/ChatServer"));
var net_1 = require("net");
var TEST_PORT = 10002;
describe("Chat Multiple Disconnect Clients", function () {
    var chatServer;
    var client, client_two, client_three;
    chatServer = undefined;
    before(function (done) {
        chatServer = new ChatServer_1.default();
        var httpServer = net_1.createServer(function (socket) { return chatServer.startLoop(socket); });
        httpServer.listen(TEST_PORT, config_1.default.HOST);
        client = new net_1.Socket();
        client.connect(TEST_PORT, config_1.default.HOST);
        client_two = new net_1.Socket();
        client_two.connect(TEST_PORT, config_1.default.HOST);
        client_three = new net_1.Socket();
        client_three.connect(TEST_PORT, config_1.default.HOST);
        done();
    });
    after(function (done) {
        chatServer.destroy();
        client.destroy();
        if (client_two) {
            client_two.destroy();
        }
        if (client_three) {
            client_three.destroy();
        }
        done();
    });
    it("count clients before disconnect", function (done) {
        chai_1.assert.equal(chatServer.clientsNumber(), 3);
        done();
    });
    it("count clients", function (done) {
        client_two.on("close", function () {
            chai_1.assert.equal(chatServer.clientsNumber(), 2);
            done();
        });
        client_two.destroy();
        /*;*/
        /*client_two.on("close", () => {
            assert.equal(chatServer.clientsNumber(), 2);
        });*/
    });
});
