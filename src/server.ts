import Fastify from 'fastify';
import { roomsRoutes } from './http/controllers/room/routes';

const app = Fastify();

app.register(roomsRoutes);

app.listen({ port: 3333 }, () => {
  console.log('Server is running!');
});
