# freshlearn-js

TypeScript SDK for the Freshlearn API used by [checkoutjoy.com](https://checkoutjoy.com). Used to manage members, enrollments, and courses in Freshlearn. See [Freshlearn API Documentation](https://freshlearn.com/support/api) for more details.


[![CI/CD](https://github.com/checkoutjoy/freshlearn-js/actions/workflows/ci.yml/badge.svg)](https://github.com/checkoutjoy/freshlearn-js/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/freshlearn-js.svg)](https://badge.fury.io/js/freshlearn-js)

## Installation

```bash
npm install freshlearn-js
# or
yarn add freshlearn-js
# or
pnpm add freshlearn-js
```

## Quick Start

```typescript
import { FreshlearnClient } from 'freshlearn-js';

const client = new FreshlearnClient({
  apiKey: 'your-api-key-here'
});

// Get all members
const members = await client.getMembers();

// Create a new member
const newMember = await client.createMember({
  email: 'user@example.com',
  fullName: 'John Doe',
  source: 'api',
  phone: '+1234567890',
  city: 'New York'
});

// Enroll member in a course
await client.enrollMember({
  courseId: 'course-123',
  planId: 'plan-456',
  memberEmail: 'user@example.com',
  transactionId: 'txn-789',
  source: 'api'
});
```

## API Reference

### Configuration

```typescript
const client = new FreshlearnClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.freshlearn.com/v1' // optional, defaults to official API
});
```

### Methods

#### `getMembers(options?)`
Get all members

```typescript
const result = await client.getMembers();
```

#### `createMember(member, options?)`
Create a new member

```typescript
const result = await client.createMember({
  email: 'user@example.com',
  fullName: 'John Doe',
  source: 'api',
  phone: '+1234567890', // optional
  city: 'New York' // optional
});
```

#### `updateMember(member, options?)`
Update an existing member

```typescript
const result = await client.updateMember({
  id: 'member-123',
  email: 'updated@example.com',
  fullName: 'Updated Name',
  source: 'api'
});
```

#### `enrollMember(enrollment, options?)`
Enroll a member in a course

```typescript
const result = await client.enrollMember({
  courseId: 'course-123',
  planId: 'plan-456',
  memberEmail: 'user@example.com',
  transactionId: 'txn-789',
  source: 'api'
});
```

#### `getCompletedCourses(options?)`
Get courses completed by members

```typescript
const result = await client.getCompletedCourses();
```

#### `createMemberAndEnroll(data, options?)`
Create a member and enroll them in a course in one operation

```typescript
const result = await client.createMemberAndEnroll({
  email: 'user@example.com',
  fullName: 'John Doe',
  source: 'api',
  courseId: 'course-123',
  planId: 'plan-456',
  transactionId: 'txn-789'
});
```

#### `unenrollMember(data, options?)`
Unenroll a member from a course

```typescript
const result = await client.unenrollMember({
  courseId: 'course-123',
  memberEmail: 'user@example.com'
});
```

#### `enrollProductBundle(data, options?)`
Enroll a member in a product bundle

```typescript
const result = await client.enrollProductBundle({
  productBundleId: 'bundle-123',
  memberEmail: 'user@example.com',
  transactionId: 'txn-789',
  source: 'api'
});
```

### Request Options

All methods accept an optional `options` parameter:

```typescript
const options = {
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Custom-Header': 'value'
  }
};

const result = await client.getMembers(options);
```

### Response Format

All methods return a response in this format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### Error Handling

```typescript
const result = await client.createMember({
  email: 'user@example.com',
  fullName: 'John Doe',
  source: 'api'
});

if (result.success) {
  console.log('Member created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

## TypeScript Support

This SDK is written in TypeScript and provides full type definitions for all API methods and responses.

## License

MIT
