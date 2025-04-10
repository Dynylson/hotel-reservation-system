import { database } from '../../db';
import { rooms } from '../../db/schema';
import { RoomRepository } from '../room-repository';
import { RegisterRequest, RoomFromDatabase } from '../room-repository.types';

export class DrizzleRoomRepository implements RoomRepository {
  async register(props: RegisterRequest): Promise<RoomFromDatabase> {
    const result = await database.insert(rooms).values(props).returning();

    return result[0];
  }
}
