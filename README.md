# Sui Generis Store

A modern, production-ready e-commerce platform built with Next.js 15, NestJS, and PostgreSQL. Specialized for electronics retail with comprehensive inventory management, multi-warehouse support, and advanced stock tracking.

## 🚀 Features

### Core E-commerce
- **Product Catalog**: Laptops, phones, printers, and accessories
- **Variant Management**: SKU-based variants with attributes (RAM, storage, color, etc.)
- **Advanced Search**: Meilisearch integration with faceted search and filters
- **Shopping Cart**: Redis-based cart with automatic stock reservation
- **Checkout**: Multi-provider payments (Stripe, PayPal, Mobile Money)
- **Order Management**: Complete order lifecycle with fulfillment tracking

### Inventory & Stock Management
- **Multi-warehouse Support**: Manage inventory across multiple locations
- **Stock Movements**: Comprehensive audit trail for all inventory changes
- **Automatic Reservations**: Cart items auto-reserve stock with expiration
- **Low Stock Alerts**: Configurable thresholds with email notifications
- **Stock Transfers**: Move inventory between warehouses
- **Serial Number Tracking**: Full traceability for serialized products

### Admin & Back-office
- **Role-based Access Control**: Admin, Inventory Manager, Sales, Support, Finance, Viewer
- **Purchase Orders**: Create and receive POs with automatic stock updates
- **RMA Management**: Returns, exchanges, and warranty processing
- **Reporting**: Stock valuation, turnover analysis, profitability reports
- **User Management**: Customer accounts and staff administration

### Technical Features
- **Modern Stack**: Next.js 15 (App Router), NestJS, TypeScript, Prisma ORM
- **Real-time Updates**: WebSocket support for inventory changes
- **Caching**: Redis for sessions, cart data, and performance optimization
- **Queue System**: BullMQ for background jobs and notifications
- **File Storage**: S3-compatible storage (MinIO) for product images
- **API Documentation**: OpenAPI/Swagger with full endpoint documentation
- **Testing**: Unit tests, integration tests, and E2E testing setup

## 🏗️ Architecture

```
sui-generis-store/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── api/          # NestJS backend API
├── packages/
│   ├── ui/           # Shared UI components
│   ├── types/        # Shared TypeScript types
│   ├── config/       # Shared configuration
│   └── sdk/          # API client SDK
├── infra/
│   └── docker-compose.yaml  # Development infrastructure
└── docs/             # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router and React Server Components
- **TypeScript** for type safety
- **TailwindCSS** + **shadcn/ui** for styling
- **TanStack Query** for data fetching
- **Zustand** for client state management
- **React Hook Form** + **Zod** for form validation

### Backend
- **NestJS** with TypeScript
- **Prisma ORM** with PostgreSQL
- **Redis** for caching and sessions
- **BullMQ** for job queues
- **Meilisearch** for product search
- **MinIO** for file storage
- **JWT** authentication with refresh tokens

### Infrastructure
- **Docker Compose** for local development
- **PostgreSQL 16** database
- **Redis 7** for caching
- **Meilisearch** for search
- **MinIO** for S3-compatible storage

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- Docker & Docker Compose

### Installation

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd sui-generis-store
pnpm install
```

2. **Start infrastructure services**
```bash
pnpm docker:up
```

3. **Set up environment variables**
```bash
# Backend
cp apps/api/.env.example apps/api/.env

# Frontend  
cp apps/web/.env.example apps/web/.env
```

4. **Initialize database**
```bash
pnpm db:migrate
pnpm db:seed
```

5. **Start development servers**
```bash
pnpm dev
```

### Access Points
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/docs
- **Database Studio**: `pnpm db:studio`

### Default Admin Account
- **Email**: admin@suigeneris.store
- **Password**: admin123 (change in production!)

## 📊 Database Schema

### Core Entities
- **Products & Variants**: Flexible product catalog with variant support
- **Inventory Levels**: Stock tracking per variant per warehouse
- **Stock Movements**: Complete audit trail of all inventory changes
- **Orders & Order Items**: Full order lifecycle management
- **Users & Customers**: Authentication and customer management
- **Warehouses**: Multi-location inventory support

### Key Relationships
- Products have many Variants
- Variants have InventoryLevels per Warehouse
- All stock changes create StockMovements
- Orders contain OrderItems linked to Variants
- Users can have multiple Roles with different permissions

## 🔧 Development

### Available Scripts
```bash
# Development
pnpm dev              # Start all services
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm test             # Run tests

# Database
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
pnpm db:reset         # Reset database

# Docker
pnpm docker:up        # Start infrastructure
pnpm docker:down      # Stop infrastructure
pnpm docker:reset     # Reset all data
```

### Code Organization
- **Modular Architecture**: Each feature is a self-contained module
- **Shared Packages**: Common code shared between apps
- **Type Safety**: Full TypeScript coverage with strict mode
- **API-First**: OpenAPI documentation for all endpoints

## 🔒 Security

### Authentication & Authorization
- JWT tokens with refresh token rotation
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Session management with Redis

### Data Protection
- Input validation on all endpoints
- SQL injection prevention with Prisma
- XSS protection with helmet
- Rate limiting on sensitive endpoints
- CORS configuration

### Inventory Security
- Stock reservation prevents overselling
- All inventory changes require authentication
- Audit trail for all stock movements
- Role-based warehouse access control

## 📈 Performance

### Caching Strategy
- Redis caching for frequently accessed data
- Stock reservations cached with TTL
- Session data cached for fast authentication
- API response caching where appropriate

### Database Optimization
- Proper indexing on frequently queried fields
- Efficient queries with Prisma
- Connection pooling
- Read replicas support (configurable)

### Frontend Optimization
- Server-side rendering with Next.js
- Image optimization and lazy loading
- Code splitting and tree shaking
- CDN-ready static assets

## 🧪 Testing

### Backend Testing
```bash
cd apps/api
pnpm test              # Unit tests
pnpm test:e2e          # Integration tests
pnpm test:cov          # Coverage report
```

### Frontend Testing
```bash
cd apps/web
pnpm test              # Component tests
pnpm test:e2e          # E2E tests with Playwright
```

### Key Test Areas
- Stock movement logic and constraints
- Authentication and authorization
- Order processing workflow
- Payment integration
- Inventory calculations

## 🚀 Deployment

### Quick Deploy to Vercel + Supabase (Recommended)

**Complete deployment in 30 minutes!**

1. **Read the deployment guide**: See `VERCEL_DEPLOYMENT.md`
2. **Follow the checklist**: Use `VERCEL_CHECKLIST.md`
3. **Quick start**: See `QUICK_START.md` for fastest setup

**What you'll get:**
- ✅ Frontend on Vercel (with custom domain support)
- ✅ Backend API on Vercel (serverless functions)
- ✅ Database on Supabase (PostgreSQL)
- ✅ Automatic deployments on git push
- ✅ Free tier available for both services

### Deployment Files

- **VERCEL_DEPLOYMENT.md** - Complete step-by-step guide
- **VERCEL_CHECKLIST.md** - Interactive deployment checklist
- **QUICK_START.md** - Deploy in 15 minutes
- **generate-secrets.js** - Generate secure JWT secrets

### Your Live URLs (After Deployment)

- **Website**: `https://your-project.vercel.app`
- **Admin Dashboard**: `https://your-project.vercel.app/admin`
- **API**: `https://your-api.vercel.app`

### Environment Variables

See `.env.example` files for required configuration.

**Frontend (.env.local)**:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_API_URL=your_api_url
```

**Backend (.env)**:
```bash
DATABASE_URL=your_supabase_connection_string
DIRECT_URL=your_supabase_direct_url
JWT_SECRET=generate_with_script
JWT_REFRESH_SECRET=generate_with_script
NODE_ENV=production
```

### Production Considerations
- Use strong JWT secrets (run `node generate-secrets.js`)
- Enable HTTPS everywhere (automatic on Vercel)
- Set up proper CORS policies
- Configure rate limiting
- Set up monitoring and alerting
- Regular database backups (Supabase handles this)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier formatting
- Conventional commit messages
- Test coverage for new features

## 📝 API Documentation

Full API documentation is available at `/api/docs` when running the development server. The API follows OpenAPI 3.0 specification with:

- Complete endpoint documentation
- Request/response schemas
- Authentication requirements
- Example requests and responses

## 🆘 Support

### Common Issues
- **Database connection**: Ensure PostgreSQL is running
- **Redis connection**: Check Redis service status
- **Port conflicts**: Ensure ports 3000, 3001, 5432, 6379, 7700, 9000 are available
- **Permission errors**: Check file permissions and user roles

### Getting Help
- Check the documentation in `/docs`
- Review API documentation at `/api/docs`
- Check existing issues and discussions
- Create detailed bug reports with reproduction steps

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

Built with modern tools and best practices:
- Next.js team for the amazing React framework
- NestJS team for the powerful Node.js framework
- Prisma team for the excellent ORM
- The open-source community for all the amazing packages

---

**Sui Generis Store** - *Unique by design, powerful by nature* 🚀
