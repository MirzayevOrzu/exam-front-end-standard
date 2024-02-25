import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBulk } from './dto/create-bulk.dto';
import { UserGuide } from './schemas/UserGuide';
import { FindUserGuidesDto } from './dto/find-user-guides.dto';

@Injectable()
export class UserGuidesService {
  constructor(
    @InjectModel(UserGuide.name) private userGuideModel: Model<UserGuide>,
  ) {}

  async read(id, user_id) {
    const result = await this.userGuideModel.findOneAndUpdate(
      {
        _id: id,
        user_id,
      },
      { completed: true },
    );

    if (!result) {
      throw new NotFoundException('User Guide topilmadi.');
    }

    return { data: result };
  }

  async createBulk({ guide_id, user_ids }: CreateBulk) {
    await this.userGuideModel.create(
      user_ids.map((user_id) => ({
        guide_id,
        user_id,
      })),
    );

    return true;
  }

  async findAll({
    page: { offset, limit } = { offset: 0, limit: 10 },
    filters = {},
  }: FindUserGuidesDto) {
    const dbQuery = this.userGuideModel
      .find(filters)
      .skip(offset)
      .limit(limit)
      .populate({ path: 'guide', select: 'id title content' })
      .lean({ virtuals: true })
      .select('-user_id')
      .exec();

    const result = await dbQuery;
    const total = await this.userGuideModel
      .find(filters)
      .countDocuments({})
      .exec();

    return {
      data: result,
      pageInfo: {
        total: total,
        limit,
        offset,
      },
    };
  }
}
