type RoomType = 'single' | 'double' | 'suite' | null; // TODO: set room_type column as not null in database

export type RegisterRequest = {
    number: string;
    roomType: RoomType;
    features: any | null; // TODO: add type
}

export type RoomFromDatabase = {
    id: string;
    number: string;
    room_type: RoomType;
    features: any | null; // TODO: add type
    created_at: Date;
    updated_at: Date;
}
