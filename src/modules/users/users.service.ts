import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { SortOrder } from 'src/shared/types/enums';
import { UserGuide } from '../user-guides/schemas/UserGuide';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserGuide.name) private userGuideModel: Model<UserGuide>,
  ) {}

  async create(data: CreateUserDto) {
    const existing = await this.userModel.findOne({ username: data.username });

    if (existing) {
      throw new BadGatewayException('Foydalanuvchi allaqachon mavjud.');
    }

    const hashedPassword = await hash(data.password, 10);

    const result = await this.userModel.create({
      ...data,
      password: hashedPassword,
    });

    return { data: result };
  }

  async findAll({
    q,
    sort = { by: '_id', order: SortOrder.DESC },
    page: { offset = 0, limit = 10 },
    filters = {},
  }: FindUsersDto) {
    if (q) {
      filters['$or'] = [
        {
          first_name: { $regex: q, $options: 'i' },
        },
        {
          last_name: { $regex: q, $options: 'i' },
        },
      ];
    }

    const dbQuery = this.userModel
      .find(filters)
      .sort({ [sort.by == 'id' ? '_' + sort.by : sort.by]: sort.order })
      .skip(offset)
      .limit(limit);

    const result = await dbQuery;
    const total = await this.userModel.find(filters).countDocuments({}).exec();

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
    const existing = await this.userModel.findById(id).lean();

    if (!existing) {
      throw new NotFoundException('Foydalanuvchi topilmadi.');
    }

    const totalGuides = await this.userGuideModel
      .find({ user_id: id })
      .countDocuments({});
    const todoGuides = await this.userGuideModel
      .find({ user_id: id, completed: false })
      .countDocuments({});
    const readGuides = await this.userGuideModel
      .find({ user_id: id, completed: true })
      .countDocuments({});

    return {
      data: {
        ...existing,
        total_guides: totalGuides,
        todo_guides: todoGuides,
        read_guides: readGuides,
      },
    };
  }

  async update(id: string, data: UpdateUserDto) {
    const existing = await this.userModel.findById(id);
    const hashedPassword: any = {};

    if (!existing) {
      throw new NotFoundException('Foydalanuvchi topilmadi.');
    }

    if (data.password) {
      hashedPassword.password = await hash(data.password, 10);
    }

    const result = await this.userModel.findByIdAndUpdate(
      id,
      { ...data, ...hashedPassword },
      { new: true },
    );

    return { data: result };
  }

  async remove(id: string) {
    const existing = await this.userModel.findById(id);

    if (!existing) {
      throw new NotFoundException('Foydalanuvchi topilmadi.');
    }

    const result = await this.userModel.findByIdAndDelete(id);

    await this.userGuideModel.deleteMany({ user_id: id });

    return { data: result };
  }
}
