import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageDto } from 'src/dto/createMessage.dto';
import MessageInterface from 'src/interfaces/message.interface';
import { MessagesService } from './messages.service';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageInterface> {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll(): Promise<MessageInterface[]> {
    return this.messagesService.findAll();
  }
}
