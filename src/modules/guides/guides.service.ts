import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SortOrder } from 'src/shared/types/enums';
import { CreateGuideDto } from './dto/create-guide.dto';
import { FindGuidesDto } from './dto/find-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { User } from '../users/schemas/User';
import { Guide } from './schemas/Guide';
import { UserGuide } from '../user-guides/schemas/UserGuide';

@Injectable()
export class GuidesService {
  constructor(
    @InjectModel(Guide.name) private guideModel: Model<Guide>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserGuide.name) private userGuideModel: Model<UserGuide>,
  ) {}

  async create({ notify, ...data }: CreateGuideDto) {
    const result = await this.guideModel.create(data);
    let notified = false;

    if (notify) {
      const usersList = await this.userModel.find();

      await this.userGuideModel.create(
        usersList.map((user) => ({
          user_id: user.id,
          guide_id: result.id,
        })),
      );

      notified = true;
    }

    return { data: { ...result, notified } };
  }

  async findAll({
    q,
    sort = { by: 'id', order: SortOrder.DESC },
    page: { offset = 0, limit = 10 },
  }: FindGuidesDto) {
    const search: any = {};
    if (q) {
      search.title = { $regex: q, $options: 'i' };
    }

    const dbQuery = this.guideModel
      .find(search)
      .sort({ ['_' + sort.by]: sort.order })
      .skip(offset)
      .limit(limit);

    const result = await dbQuery;
    const total = await this.guideModel.find(search).countDocuments({}).exec();

    return {
      data: result,
      pageInfo: {
        total: total,
        limit,
        offset,
      },
    };
  }

  async findOne(id: string) {
    const existing = await this.guideModel
      .findOne({ _id: id, deleted: false })
      .lean();

    const revisions = await this.userGuideModel
      .find({ guide_id: existing._id })
      .countDocuments({})
      .exec();

    if (!existing) {
      throw new NotFoundException('Guide topilmadi.');
    }

    return { data: { ...existing, revisions } };
  }

  async update(id: string, { notify, ...data }: UpdateGuideDto) {
    const existing = await this.guideModel.findOne({ _id: id, deleted: false });
    let notified = false;

    if (!existing) {
      throw new NotFoundException('Guide topilmadi.');
    }

    if (notify) {
      const usersList = await this.userModel.find();

      await this.userGuideModel.create(
        usersList.map((user) => ({
          user_id: user.id,
          guide_id: result.id,
        })),
      );

      notified = true;
    }

    const result = await this.guideModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return { data: { ...result, notified } };
  }

  async remove(id: string) {
    const result = await this.guideModel.findByIdAndRemove(id);

    await this.userGuideModel.deleteMany({ guide_id: id });

    if (!result) {
      throw new NotFoundException('Guide topilmadi.');
    }

    return { data: result };
  }
}
