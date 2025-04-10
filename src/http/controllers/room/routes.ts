import { FastifyInstance } from 'fastify';
import { register } from './register';

export async function roomsRoutes(app: FastifyInstance) {
  app.post('/rooms', register);
}
