# Chat server

The problem is defined as:

`Write a very simple chat server that should listen on TCP port 10000 for clients. The chat protocol is very simple, clients connect with "telnet" and write single lines of text. On each new line of text, the server will broadcast that line to all other connected clients.`

## Introduction
When approaching real-time bidirectional communication tasks, I generally look at [Socket.io](https://socket.io).
Anyway, it would be impossible to test a _Socket.io-based_ service with telnet, figuring as a requirement.

So the choice is to use [https://nodejs.org/](Node.js) with the _net_ module to create stream-based TCP servers.

## Problems / Assumptions

## Versioned files
The .env file is versioned only to show every file in the project, but it should not be versioned!

## Assumptions
There is no Rate-Limit Throttling, so potentially the user can send unlimited messages at any time interval.

## Tests
I would like to always have a code coverage > 90%.
For time constraints I have tested the core functionalities of the project.
To run the tests: `npm run test`

## The idea
Basically, we create a server that listens to a specified address and port defined in the env file.
A connection listener argument is automatically set as a listener for the 'connection' event with the socket as a parameter, and we start our simple chat server logic, which takes care to keep a list of connected clients, format messages, and so on. The socket will listen for some events, mostly related to received messages and connection events.

## Installation
Requirements:
- nodejs >= v14.4.0
- git
- npm

1. Clone the repository
   `git clone https://github.com/lorenzosfarra/lorenzo-messaging-things.git` (or SSH)
2. Inside the directory, let's install the required modules with `npm install`
3. You can execute the server with `npm run start`. Please modify the `.env` file according to your needs.
3.1 Test with telnet from multiple terminals with `telnet 127.0.0.1 10000`
4. You can execute the tests with `npm run test`

