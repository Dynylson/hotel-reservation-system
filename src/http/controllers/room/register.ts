import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterRoom } from '../../../use-cases/factories/make-register-room';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerRoomBodySchema = z.object({
    number: z.string(),
    roomType: z.enum(['single', 'double', 'suite']),
    features: z.any().optional(), // TODO: add type
  });

  const roomPayload = registerRoomBodySchema.parse(request.body);

  const registerRoomUseCase = makeRegisterRoom();

  const result = await registerRoomUseCase.execute(roomPayload);

  return reply.status(201).send(result);
}
