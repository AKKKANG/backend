import mongoose, { Model, PopulatedDoc, Schema, Types } from 'mongoose';
import { GenderType, MatchPurposeType, MatchType } from '../models/room.types';
import { IUser, User } from './user.schema';

export interface IRoom {
  users: PopulatedDoc<IUser>[];
  appointment: Date;
  matchtype: MatchType;
  gendertype: GenderType;
  purposetype: MatchPurposeType;
}

interface RoomModel extends Model<IRoom> {}

const RoomSchema = new Schema<IRoom, RoomModel>({
  users: [
    {
      type: Types.ObjectId,
      ref: User.name,
      required: true,
    },
  ],
  appointment: {
    type: Date,
    required: true,
    default: Date.now,
  },
  matchtype: {
    type: String,
    enum: MatchType,
    default: MatchType.OneToOne,
    required: true,
  },
  gendertype: {
    type: String,
    enum: GenderType,
    default: GenderType.MALE,
    required: true,
  },
  purposetype: {
    type: String,
    enum: MatchPurposeType,
    default: MatchPurposeType.COFFEE,
    required: true,
  },
});

/* Validations */

/* Middlewares */

/* Statics */

export const Room = mongoose.model<IRoom, RoomModel>('Room', RoomSchema);
