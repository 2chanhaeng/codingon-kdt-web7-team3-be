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

  @SubscribeMessage("create")
  handleCreate(
    @MessageBody("roomname") roomname: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.id, "create", roomname);
    // 랜덤 방 ID 생성
    const id = Math.random().toString(36).substring(2, 11);
    // 방 정보 저장 TODO: DB와 연결
    this.rooms.set(id, { id, roomname });
    // 최초 생성 유저 방에 입장
    client.join(id);
    // 방 목록 전송 DEBUG: DB 연결 후에는 삭제
    this.server.emit("rooms", [{ id, roomname }]);
    return id;
  }

  @SubscribeMessage("join")
  handleJoin(@MessageBody("id") id: string, @ConnectedSocket() client: Socket) {
    console.log(client.id, "join into", id);
    client.join(id);
    return id;
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
