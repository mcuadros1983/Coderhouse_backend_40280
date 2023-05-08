import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/dto/createMessage.dto';
import MessageInterface from 'src/interfaces/message.interface';

@Injectable()
export class MessagesService {
  private readonly messages: MessageInterface[] = [];
  private cont = 1;

  create(data: CreateMessageDto): MessageInterface {
    const message = new MessageInterface();
    message.id = this.cont++;
    message.email = data.email;
    message.name = data.name;
    message.lastName = data.lastName;
    message.nick = data.nick;
    message.avatar = data.avatar;
    message.text = data.text;
    message.age = data.age;
    this.messages.push(message);
    return message;
  }

  findAll(): MessageInterface[] {
    return this.messages;
  }
}
