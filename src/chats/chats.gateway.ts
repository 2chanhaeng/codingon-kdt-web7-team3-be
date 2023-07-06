import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(81, { transports: ["websocket"] })
export class ChatsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.count("Init");
    console.log(server.sockets.adapter.rooms);
  }

  handleConnection(client: Socket) {
    console.log("connect");
    console.log(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(client.id);
    console.log("disconnect");
  }

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any): string {
    return "Hello world!";
  }
}
