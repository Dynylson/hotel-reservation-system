# Sistema de Reservas de Hotel - API

## Visão Geral

Este projeto implementa uma API completa para um sistema de reservas de hotel, permitindo o gerenciamento de quartos e suítes, reservas, hóspedes, serviços adicionais e integrações com sistemas de pagamento. O sistema é projetado para atender hotéis de pequeno a médio porte, com capacidade de escala para operações maiores.

## Requisitos Funcionais

### 1. Gestão de Quartos e Propriedades
- [] Cadastro de diferentes tipos de quartos (single, duplo, suíte, etc.)
- [] Definição de características (camas, amenidades, vista, andar)
- [] Gerenciamento de preços base e dinâmicos (por temporada, dia da semana)
- [] Upload e gerenciamento de fotos dos quartos
- [] Bloqueio de disponibilidade para manutenção
- [] Tags e categorização de quartos (premium, econômico, etc.)

### 2. Sistema de Reservas
- [] Criação de reservas com check-in e check-out
- [] Validação de disponibilidade em tempo real
- [] Gerenciamento de tarifas e preços dinâmicos
- [] Solicitações especiais (cama extra, berço, etc.)
- [] Modificação e cancelamento com políticas configuráveis
- [] Visualização de histórico de reservas
- [] Early check-in e late check-out
- [] Reservas para grupos (múltiplos quartos)

### 3. Gestão de Hóspedes
- [] Cadastro e autenticação de hóspedes
- [] Perfis diferentes (hóspede, funcionário, gerente, admin)
- [] Armazenamento seguro de documentos e dados pessoais
- [] Programa de fidelidade e pontos
- [] Histórico de estadias e preferências
- [] Gestão de perfis de empresas para reservas corporativas

### 4. Serviços e Extras
- [] Cadastro de serviços adicionais (spa, restaurante, etc.)
- [] Reserva de serviços complementares
- [] Pacotes promocionais (romântico, familiar, etc.)
- [] Adição de consumos e serviços à conta do quarto
- [] Gestão de frigobar e consumíveis

### 5. Pagamentos e Faturamento
- [] Integração com gateways de pagamento
- [] Pré-autorizações e confirmações
- [] Políticas de cancelamento e reembolso
- [] Geração de faturas e recibos
- [] Múltiplas formas de pagamento por reserva
- [] Split de pagamentos para grupos

### 6. Notificações e Comunicações
- [] Confirmações automáticas de reservas
- [] Lembretes de check-in próximo
- [] Pesquisas de satisfação pós-estadia
- [] Notificações de ofertas especiais
- [] Comunicações personalizadas durante a estadia

## Requisitos Não-Funcionais

### 1. Performance
- [] Consultas de disponibilidade otimizadas (< 200ms)
- [] Capacidade de processar até 1000 reservas simultâneas
- [] Cache inteligente para calendários de disponibilidade
- [] Otimização para picos de temporada

### 2. Segurança
- [] Conformidade com LGPD/GDPR para dados de hóspedes
- [] Autenticação segura com JWT e refresh tokens
- [] Proteção de dados de pagamento (conformidade PCI DSS)
- [] Auditoria completa de operações críticas
- [] Permissões granulares baseadas em funções

### 3. Integrações
- [] API para integração com OTAs (Booking.com, Expedia, etc.)
- [] Conexão com Channel Managers
- [] Integração com sistemas PMS (Property Management Systems)
- [] Webhooks para sistemas externos
- [] Exportação de dados para sistemas contábeis

### 4. Disponibilidade e Confiabilidade
- [] Alta disponibilidade (99.9% uptime)
- [] Estratégia de backup e recuperação
- [] Tratamento adequado de falhas nas integrações
- [] Modo offline para operações essenciais

### 5. Usabilidade e Documentação
- [] Documentação completa da API com Swagger/OpenAPI
- [] Respostas claras e informativas
- [] Suporte a múltiplos idiomas
- [] Versionamento da API para compatibilidade

## Stack Tecnológica Sugerida

### Backend
- Linguagem: Node.js (Express/Nest.js) ou Java (Spring Boot)
- Banco de Dados Principal: PostgreSQL
- Cache: Redis para disponibilidade e sessões
- Fila de Mensagens: RabbitMQ para processamento assíncrono
- Pesquisa: Elasticsearch para busca avançada de quartos

### Infraestrutura
- Containerização: Docker e Docker Compose
- Orquestração: Kubernetes para ambientes de produção
- CI/CD: GitHub Actions ou Jenkins
- Hospedagem: AWS (sugestão: ECS, RDS, ElastiCache)
- Monitoramento: Prometheus, Grafana e ELK Stack

## Estrutura do Projeto

```
/
├── src/
│   ├── api/                # Endpoints e rotas da API
│   ├── controllers/        # Controladores de domínio
│   ├── services/           # Lógica de negócios
│   ├── models/             # Definições de entidades
│   ├── repositories/       # Acesso a dados
│   ├── middleware/         # Middlewares (auth, validação)
│   ├── integrations/       # Integrações com sistemas externos
│   ├── utils/              # Funções utilitárias
│   ├── config/             # Configurações
│   └── tests/              # Testes automatizados
├── docs/                   # Documentação
├── migrations/             # Migrações de banco de dados
├── scripts/                # Scripts de implantação
├── .env.example            # Exemplo de variáveis de ambiente
├── docker-compose.yml      # Configuração Docker
└── README.md               # Este arquivo
```

## Modelo de Dados (Simplificado)

```
Hotel (id, name, address, stars, amenities)
 │
 ├── RoomType (id, hotel_id, name, description, capacity, base_price)
 │    │
 │    ├── Room (id, room_type_id, room_number, floor, status)
 │    │
 │    └── RoomImage (id, room_type_id, image_url)
 │
 ├── PricingRule (id, room_type_id, season_id, day_of_week, price_modifier)
 │
 ├── Guest (id, name, email, phone, document, address, loyalty_points)
 │    │
 │    └── GuestPreference (id, guest_id, preference_type, preference_value)
 │
 ├── Reservation (id, guest_id, status, booking_date, total_price)
 │    │
 │    ├── ReservationRoom (id, reservation_id, room_id, check_in, check_out, adults, children, price)
 │    │
 │    ├── ReservationService (id, reservation_id, service_id, date, quantity, price)
 │    │
 │    └── Payment (id, reservation_id, method, amount, status, transaction_id)
 │
 └── Service (id, hotel_id, name, description, price, availability)
```

## Endpoints Principais da API

### Quartos e Disponibilidade
- `GET /api/hotels/:hotelId/room-types` - Listar tipos de quartos
- `GET /api/hotels/:hotelId/room-types/:id` - Detalhes de um tipo de quarto
- `GET /api/hotels/:hotelId/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD&guests=2` - Verificar disponibilidade
- `POST /api/admin/room-types` - Criar novo tipo de quarto (Admin)
- `PUT /api/admin/rooms/:id/block` - Bloquear quarto para manutenção (Admin)

### Reservas
- `POST /api/reservations` - Criar nova reserva
- `GET /api/reservations` - Listar reservas do usuário atual
- `GET /api/reservations/:id` - Obter detalhes de uma reserva
- `PUT /api/reservations/:id` - Modificar reserva existente
- `DELETE /api/reservations/:id` - Cancelar reserva
- `POST /api/reservations/:id/services` - Adicionar serviço à reserva
- `GET /api/admin/reservations` - Listar todas as reservas (Admin)

### Hóspedes
- `POST /api/auth/register` - Registrar novo hóspede
- `POST /api/auth/login` - Login de hóspede
- `GET /api/guests/me` - Perfil do hóspede atual
- `PUT /api/guests/me` - Atualizar perfil
- `GET /api/guests/me/loyalty` - Verificar pontos de fidelidade
- `GET /api/admin/guests` - Listar todos os hóspedes (Admin)

### Pagamentos
- `POST /api/reservations/:id/payments` - Registrar pagamento
- `GET /api/reservations/:id/invoice` - Gerar fatura
- `POST /api/reservations/:id/checkout` - Finalizar estadia e fechar conta

### Administração
- `GET /api/admin/dashboard` - Estatísticas e ocupação
- `GET /api/admin/reports/revenue?start=YYYY-MM-DD&end=YYYY-MM-DD` - Relatório de receita
- `GET /api/admin/reports/occupancy?start=YYYY-MM-DD&end=YYYY-MM-DD` - Relatório de ocupação

## Próximos Passos para Implementação

1. **Fase 1: Fundação**
   - Configuração do ambiente de desenvolvimento
   - Implementação da estrutura do banco de dados
   - Desenvolvimento do sistema básico de quartos e disponibilidade

2. **Fase 2: Core de Reservas**
   - Sistema de reservas com validação de disponibilidade
   - Gestão de hóspedes e autenticação
   - Precificação dinâmica básica

3. **Fase 3: Pagamentos e Serviços**
   - Integração com gateway de pagamento
   - Implementação de serviços adicionais
   - Faturamento e recibos

4. **Fase 4: Administração e Relatórios**
   - Painel administrativo
   - Relatórios de ocupação e receita
   - Gestão de funcionários e permissões

5. **Fase 5: Integrações e Escalabilidade**
   - Integrações com OTAs e Channel Managers
   - Otimizações de performance
   - Implementação de cache e filas

## Considerações Adicionais

- **Sazonalidade**: O sistema deve lidar eficientemente com temporadas altas e baixas, tanto em termos de precificação quanto de performance.
- **Conformidade Legal**: Considerar requisitos legais para registro de hóspedes e armazenamento de dados pessoais.
- **Multi-propriedade**: Projetar o sistema pensando em possível expansão para redes de hotéis.
