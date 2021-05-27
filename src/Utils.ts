import {Socket} from "net";
import moment from "moment";

/**
 * Utils to manage time and related operations
 */
export class TimeUtils {
    /**
     * Create a date string, format "Y-m-d H:i:s" with padding 0s if needed.
     * We can use moment() or similar libraries, too.
     *
     * @return string
     */
    static nowForChat() {
        const now = moment();
        return now.format('YYYY-MM-DD HH:mm:ss');
    }
}

export class ClientUtils {
    static nameFromSocket(socket: Socket): string {
        return `${socket.remoteAddress}:${socket.remotePort}`;
    }
}
