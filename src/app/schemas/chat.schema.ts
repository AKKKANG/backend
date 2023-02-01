import mongoose, { Model, PopulatedDoc, Schema, Types } from 'mongoose';
import { ChatType } from '../models/chat.type';
import { IRoom, Room } from './room.schema';
import { IUser, User } from './user.schema';

export interface IChat {
  sender: PopulatedDoc<IUser>;
  content: string;
  room: PopulatedDoc<IRoom>;
  created_at: Date;
  type: string;
}

interface ChatModel extends Model<IChat> {}

const ChatSchema = new Schema<IChat, ChatModel>({
  sender: {
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  room: {
    type: Types.ObjectId,
    ref: Room.name,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    enum: ChatType,
    default: ChatType.TEXT,
  },
});

/* Validations */

/* Middlewares */

/* Statics */

export const Chat = mongoose.model<IChat, ChatModel>('Chat', ChatSchema);
