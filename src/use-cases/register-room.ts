import { RoomRepository } from '../repositories/room-repository';
import { RoomMapper } from './mappers/room-mapper';

interface RegisterRoomUseCaseRequest {
  number: string;
  roomType: 'single' | 'double' | 'suite';
  features?: any | null; // TODO: add type
}

export class RegisterRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async execute({ number, roomType, features }: RegisterRoomUseCaseRequest) {
    const roomToPersistence = RoomMapper.toPersistence({
      number,
      roomType,
      features,
    });

    const roomFromDatabase = await this.roomRepository.register(roomToPersistence);

    return RoomMapper.toDomain(roomFromDatabase);
  }
}
