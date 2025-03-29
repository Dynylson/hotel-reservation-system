import Fastify from 'fastify';

const app = Fastify();

app.get('/', async () => ({ message: 'Hello, World!' }));

app.listen({ port: 3333 }, () => {
  console.log('Server is running!');
});
