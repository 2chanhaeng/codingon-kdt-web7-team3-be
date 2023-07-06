import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomDto } from "./dto/chats.dto";

@WebSocketGateway(81, { transports: ["websocket"] })
export class ChatsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  rooms: Map<string, RoomDto> = new Map(); // TODO: DB와 연결

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
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log("chat message");
    console.log(data);
    console.log(client.id);
    console.log(client.rooms);
    return data;
  }
}
