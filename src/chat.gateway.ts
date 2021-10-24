import { UseGuards } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { JwtAuthGuard, WsGuard } from "./auth/jwt-auth.guard";

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server;
  
  @UseGuards(WsGuard)
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}