# Sui Generis Store - Development Guide

## Quick Start

### Prerequisites
- Node.js 18+
- Docker Desktop
- Git

### Setup
1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd suigeneris_project
   ```

2. **Run setup script:**
   ```bash
   # On Windows (PowerShell)
   .\scripts\setup.ps1
   
   # On macOS/Linux
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. **Start development:**
   ```bash
   pnpm dev
   ```

## Development Workflow

### Starting Services
```bash
# Start all services
pnpm dev

# Start individual services
pnpm dev:api    # API only
pnpm dev:web    # Frontend only
pnpm dev:db     # Database services only
```

### Database Operations
```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Reset database
pnpm db:reset

# Seed database
pnpm db:seed

# Open Prisma Studio
pnpm db:studio
```

### Code Quality
```bash
# Lint all projects
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check

# Run tests
pnpm test
```

## Project Structure

```
suigeneris_project/
├── apps/
│   ├── api/                 # NestJS Backend API
│   │   ├── src/
│   │   │   ├── modules/     # Feature modules
│   │   │   ├── common/      # Shared utilities
│   │   │   └── main.ts      # Application entry
│   │   ├── prisma/          # Database schema & migrations
│   │   └── package.json
│   └── web/                 # Next.js Frontend
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── components/  # React components
│       │   ├── lib/         # Utilities & API client
│       │   ├── store/       # Zustand stores
│       │   └── types/       # TypeScript types
│       └── package.json
├── infra/                   # Infrastructure configs
├── scripts/                 # Development scripts
└── package.json             # Workspace root
```

## API Development

### Adding New Endpoints
1. Create module in `apps/api/src/modules/`
2. Define DTOs with validation
3. Implement service logic
4. Create controller with guards
5. Add to `app.module.ts`
6. Update API client in frontend

### Database Changes
1. Modify `apps/api/prisma/schema.prisma`
2. Generate migration: `pnpm db:migrate`
3. Update seed data if needed
4. Regenerate Prisma client: `pnpm db:generate`

## Frontend Development

### Adding New Pages
1. Create page in `apps/web/src/app/`
2. Add components in `apps/web/src/components/`
3. Update navigation if needed
4. Add to TypeScript types

### State Management
- Use Zustand for global state
- Store files in `apps/web/src/store/`
- Follow existing patterns for auth/cart

### Styling
- Use TailwindCSS utility classes
- Custom components in `apps/web/src/components/ui/`
- Brand colors defined in `tailwind.config.ts`

## Environment Variables

### API (.env)
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret
STRIPE_SECRET_KEY=sk_test_...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Docker Services

### Available Services
- **PostgreSQL**: Database (port 5432)
- **Redis**: Cache & sessions (port 6379)
- **Meilisearch**: Search engine (port 7700)
- **MinIO**: File storage (port 9000, console 9001)

### Docker Commands
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# Stop services
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Reset volumes
docker-compose -f docker-compose.dev.yml down -v
```

## Testing

### Backend Tests
```bash
cd apps/api
pnpm test          # Unit tests
pnpm test:e2e      # End-to-end tests
pnpm test:cov      # Coverage report
```

### Frontend Tests
```bash
cd apps/web
pnpm test          # Jest tests
pnpm test:watch    # Watch mode
```

## Debugging

### API Debugging
- Use VS Code debugger with launch config
- Check logs: `docker-compose logs api`
- Database queries: Enable Prisma logging

### Frontend Debugging
- Use React DevTools
- Check Network tab for API calls
- Use Zustand DevTools

## Common Issues

### Port Conflicts
- Change ports in docker-compose.dev.yml
- Update environment variables accordingly

### Database Connection
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Verify network connectivity

### Dependencies
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Clear Docker volumes: `docker-compose down -v`

## Production Deployment

### Build Process
```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:api
pnpm build:web
```

### Environment Setup
- Copy production environment files
- Update database URLs
- Configure external services (Redis, S3, etc.)
- Set up monitoring and logging

## Contributing

1. Create feature branch from `main`
2. Make changes following code style
3. Add tests for new features
4. Update documentation
5. Submit pull request

## Support

- Check existing issues in repository
- Review logs for error details
- Consult API documentation at `/api`
- Join development Discord/Slack
