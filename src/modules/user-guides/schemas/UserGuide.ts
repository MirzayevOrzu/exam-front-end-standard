import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  versionKey: false,
})
export class UserGuide {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Guide',
    required: true,
  })
  guide_id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({
    type: Boolean,
    default: false,
  })
  completed: boolean;
}

export const UserGuideSchema = SchemaFactory.createForClass(UserGuide);

UserGuideSchema.virtual('guide', {
  ref: 'Guide',
  localField: 'guide_id',
  foreignField: '_id',
  justOne: true,
});
