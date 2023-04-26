import MessageRepository from './repository/MessageRepository.js'
const messageRepository = new MessageRepository()
import { normalize, denormalize, schema } from 'normalizr'

function getAllMessages() {
  return messageRepository.getAll()
}

function addMessage(obj) {
  return messageRepository.save(obj)
}

async function getAllMessagesNormalized() {
  try {
    const authorSchema = new schema.Entity('authors')
    const messageSchema = new schema.Entity('messages', {
      author: authorSchema,
    })
    const chat = new schema.Entity('chat', {
      messages: [messageSchema],
    })
    const messages = await messageRepository.getAll()
    console.log("normalized", messages)
    const data = { id: 'general', messages }
    const dataNormalized = await normalize(data, chat)
    return dataNormalized
  } catch (error) {
    throw new Error('Error al normalizar mensajes: ' + error.message)
  }
}

async function denormalizeMessages() {
  try {
    const schemaAuthor = new schema.Entity("author");
    const message = new schema.Entity("message", {
      author: schemaAuthor,
    });
    const chat = new schema.Entity("chat", {
      messages: [message],
    });
    const dataDenormalized = await denormalize(
      data.result,
      chat,
      data.entities
    );
    return dataDenormalized;
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  getAllMessages,
  addMessage,
  getAllMessagesNormalized,
  denormalizeMessages
}