import mongoose, { Model, Schema } from 'mongoose';

export interface IUser {
  name: string;
}

interface UserModel extends Model<IUser> {
  get(id: string): any;
  list(): any;
}

const UserSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
});

/* Validations */

/* Middlewares */

/* Statics */
UserSchema.statics.get = async function (id) {
  const user = await this.findById(id).exec();
  if (!user) throw new Error('User Not Found');
  return user;
};

UserSchema.statics.list = async function () {
  return await this.find().sort({ created_at: -1 }).exec();
};

export const User = mongoose.model<IUser, UserModel>('User', UserSchema);
