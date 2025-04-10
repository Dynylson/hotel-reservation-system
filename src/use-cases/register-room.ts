import { RoomRepository } from '../repositories/room-repository';

interface RegisterRoomUseCaseRequest {
  number: string;
  roomType: 'single' | 'double' | 'suite';
  features?: any | null; // TODO: add type
}

export class RegisterRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  execute({ number, roomType, features }: RegisterRoomUseCaseRequest) {
    return this.roomRepository.register({
      number,
      roomType,
      features,
    });
  }
}
