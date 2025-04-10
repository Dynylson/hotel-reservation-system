import { DrizzleRoomRepository } from '../../repositories/drizzle/drizzle-room-repository';
import { RegisterRoomUseCase } from '../register-room';

export function makeRegisterRoom() {
  const drizzleRoomRepository = new DrizzleRoomRepository();
  const registerRoomUseCase = new RegisterRoomUseCase(drizzleRoomRepository);

  return registerRoomUseCase;
}
