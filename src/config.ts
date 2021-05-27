import dotenv from 'dotenv';
dotenv.config();

export default {
    HOST: process.env.SERVER_HOST || '127.0.0.1',
    PORT: process.env.SERVER_PORT ? (+process.env.SERVER_PORT) : 10000,

    USER_PROMPT: '>>>: '
};
