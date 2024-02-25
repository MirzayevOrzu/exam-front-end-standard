import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Guide {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: Boolean,
    default: false,
    select: false,
  })
  deleted: boolean;
}

export const GuideSchema = SchemaFactory.createForClass(Guide);
