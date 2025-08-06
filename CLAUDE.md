# freshlearn-js

TypeScript SDK for the Freshlearn API - A comprehensive client library for integrating with the Freshlearn learning management platform.

## Overview

This project provides a fully-typed TypeScript SDK for interacting with the Freshlearn API. It offers a clean, modern interface for managing members, course enrollments, and learning analytics. The SDK supports both CommonJS and ESM modules with complete TypeScript definitions.

**Key Features:**
- Full TypeScript support with comprehensive type definitions
- Modern fetch-based HTTP client with timeout support
- Dual package format (CommonJS + ESM) for maximum compatibility
- Production-ready CI/CD pipeline with automated testing and publishing
- Comprehensive error handling and response normalization
- Zero external dependencies (uses native fetch API)

## Architecture

The SDK follows a clean, modular architecture:

```
src/
├── client.ts          # Main FreshlearnClient class with API methods
├── types/index.ts     # TypeScript interfaces and type definitions
├── index.ts           # Public API exports
└── client.test.ts     # Comprehensive test suite
```

### Core Components

- **FreshlearnClient**: Main client class that handles authentication and HTTP requests
- **Type System**: Complete TypeScript interfaces for all API requests and responses
- **HTTP Layer**: Custom fetch-based implementation with timeout, error handling, and response normalization

### API Client Design

The client uses a private `request()` method that:
- Handles authentication via API key headers
- Manages request/response serialization
- Implements configurable timeouts with AbortController
- Normalizes all responses to a consistent `ApiResponse<T>` format
- Provides comprehensive error handling

## Setup & Installation

### Prerequisites
- Node.js >= 18.0.0
- pnpm 8.x (preferred) or npm/yarn

### Development Setup

```bash
# Clone and install dependencies
pnpm install

# Run in development mode with watch
pnpm run dev

# Run tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage
```

### Build Process

```bash
# Build for production
pnpm run build

# Type checking
pnpm run typecheck

# Linting
pnpm run lint
pnpm run lint:fix

# Code formatting
pnpm run format
pnpm run format:check
```

## Development Workflow

### Quality Assurance Pipeline

The project uses a comprehensive QA setup:

1. **TypeScript**: Strict mode enabled with all recommended checks
2. **ESLint**: TypeScript-aware linting with Prettier integration
3. **Prettier**: Consistent code formatting
4. **Vitest**: Modern testing framework with coverage reporting
5. **TSUP**: Fast TypeScript bundler for dual-format output

### CI/CD Pipeline

Automated GitHub Actions workflow that:
- Runs on push to `main`/`develop` and all PRs
- Executes full test suite with coverage reporting
- Performs type checking, linting, and format validation
- Builds production bundle
- Publishes to npm on release

### Scripts Reference

- `pnpm run dev` - Development mode with watch
- `pnpm run build` - Production build
- `pnpm run test` - Run tests in watch mode
- `pnpm run test:run` - Run tests once
- `pnpm run test:coverage` - Run tests with coverage
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier
- `pnpm run typecheck` - TypeScript type checking

## API Documentation

### Client Initialization

```typescript
import { FreshlearnClient } from 'freshlearn-js';

const client = new FreshlearnClient({
  apiKey: 'your-api-key-here',
  baseUrl: 'https://api.freshlearn.com/v1' // optional
});
```

### Available Methods

#### Member Management
- `getMembers(options?)` - Retrieve all members
- `createMember(member, options?)` - Create a new member
- `updateMember(member, options?)` - Update existing member

#### Course Enrollment
- `enrollMember(enrollment, options?)` - Enroll member in a course
- `createMemberAndEnroll(data, options?)` - Create member and enroll in one operation
- `unenrollMember(data, options?)` - Remove member from course

#### Product Bundles
- `enrollProductBundle(data, options?)` - Enroll member in product bundle

#### Analytics
- `getCompletedCourses(options?)` - Get course completion data

### Request/Response Format

All methods return a normalized `ApiResponse<T>` structure:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### Error Handling Strategy

The SDK implements multi-layered error handling:
1. Network-level errors (timeouts, connectivity issues)
2. HTTP-level errors (4xx, 5xx status codes)
3. API-level errors (application-specific error messages)
4. Type-safe error responses

## File Structure

```
├── .github/workflows/ci.yml    # CI/CD pipeline configuration
├── src/
│   ├── client.ts              # Main client implementation
│   ├── client.test.ts         # Test suite (312 lines)
│   ├── types/index.ts         # Type definitions
│   └── index.ts               # Public exports
├── dist/                      # Build output (generated)
├── coverage/                  # Test coverage reports
├── package.json               # Package configuration
├── tsconfig.json              # TypeScript configuration
├── tsup.config.ts             # Build tool configuration
├── vitest.config.ts           # Test configuration
├── .eslintrc.json             # Linting rules
├── .prettierrc                # Code formatting rules
└── pnpm-lock.yaml             # Dependency lock file
```

## Testing Strategy

Comprehensive test suite covers:
- All API method functionality
- Error handling scenarios
- Response format validation
- Authentication flows
- Timeout behavior
- Edge cases and error conditions

Test coverage excludes configuration files and type definitions to focus on business logic.

## Recent Updates (Updated: 2025-08-06)

### Initial Release (v1.0.0)
- Complete SDK implementation with all Freshlearn API endpoints
- Production-ready TypeScript client with full type safety
- Comprehensive test suite with 100% API method coverage
- Modern build pipeline with dual-format output (CommonJS + ESM)
- CI/CD automation with GitHub Actions
- Zero-dependency implementation using native Web APIs

### Key Implementation Details
- **HTTP Client**: Custom fetch-based implementation with timeout support
- **Authentication**: API key-based authentication via headers
- **Response Handling**: Unified error handling with normalized response format
- **Type Safety**: Complete TypeScript coverage for all API interactions
- **Testing**: Vitest-based test suite with coverage reporting
- **Build System**: TSUP for fast, optimized builds

## Important Notes

### For Developers

1. **API Key Security**: Never commit API keys to version control. Use environment variables in production.

2. **Error Handling**: Always check the `success` field in API responses before accessing `data`.

3. **Timeout Configuration**: The client supports configurable timeouts via the `RequestOptions.timeout` parameter.

4. **Type Safety**: All API methods are fully typed. Use TypeScript for the best development experience.

5. **Testing**: Run tests before committing: `pnpm run test:run && pnpm run typecheck && pnpm run lint`

6. **Publishing**: The package is automatically published to npm when releases are created on GitHub.

### Production Considerations

- The SDK requires Node.js >= 18.0.0 for native fetch support
- Uses modern JavaScript features (ES2020 target)
- Zero runtime dependencies for minimal bundle size
- Supports both CommonJS and ESM for maximum compatibility