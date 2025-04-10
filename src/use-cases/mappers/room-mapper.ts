interface Room {
    id: string;
    number: string;
    roomType: 'single' | 'double' | 'suite' | null;
    features: any | null;
    createdAt: Date;
    updatedAt: Date;
}

interface DBRoom {
    id: string;
    number: string;
    room_type: 'single' | 'double' | 'suite' | null;
    features: any | null;
    created_at: Date;
    updated_at: Date;
}

export class RoomMapper {
  static toPersistence(room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>): Omit<DBRoom, 'id' | 'created_at' | 'updated_at'> {
    return {
      number: room.number,
      room_type: room.roomType,
      features: room.features,
    };
  }

  static toDomain(dbRoom: DBRoom): Room {
    return {
      id: dbRoom.id,
      number: dbRoom.number,
      roomType: dbRoom.room_type,
      features: dbRoom.features,
      createdAt: dbRoom.created_at,
      updatedAt: dbRoom.updated_at,
    };
  }
}
