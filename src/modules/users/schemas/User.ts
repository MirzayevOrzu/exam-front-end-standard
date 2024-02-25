import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'src/shared/types/enums';

@Schema({
  versionKey: false,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
  })
  last_name: string;

  @Prop({
    type: Number,
    required: true,
  })
  age: number;

  @Prop({
    type: String,
    required: true,
    enum: UserRole,
  })
  role: UserRole;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
