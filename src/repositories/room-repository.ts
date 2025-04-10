import { RegisterRequest, RoomFromDatabase } from './room-repository.types';

export interface RoomRepository {
    register(props: RegisterRequest): Promise<RoomFromDatabase>;
}
