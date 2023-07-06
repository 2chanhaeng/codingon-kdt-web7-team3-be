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
import { RoomDto, MessageDto } from "./dto/chats.dto";

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
    console.log(client.id, "connected");
    // 방 목록 전송 TODO: DB 연결 후 수정 필요
    const rooms = Array.from(this.rooms).map(([id, { roomname }]) => {
      return { id, roomname };
    });
    client.emit("rooms", rooms);
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
  handleMessage(
    @MessageBody() message: MessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.id, "message", message, "to", message.roomId);
    // 본인에게도 메시지 전송(전송 확인용)
    client.emit("message", message);
    // 전송한 방에 메시지 전송
    client.to(message.roomId).emit("message", message);
    return message;
  }
}
