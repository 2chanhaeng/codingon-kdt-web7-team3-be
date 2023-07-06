import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
@WebSocketGateway(81, { transports: ["websocket"] })

export class ChatsGateway {
  @SubscribeMessage("message")
  handleMessage(client: any, payload: any): string {
    return "Hello world!";
  }
}
