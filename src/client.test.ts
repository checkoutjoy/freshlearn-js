import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { FreshlearnClient } from './client';
import type {
  CreateMemberRequest,
  UpdateMemberRequest,
  EnrollMemberRequest,
  CreateMemberAndEnrollRequest,
  UnenrollMemberRequest,
  EnrollProductBundleRequest,
} from './types';

global.fetch = vi.fn() as MockedFunction<typeof fetch>;

describe('FreshlearnClient', () => {
  let client: FreshlearnClient;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    client = new FreshlearnClient({ apiKey: mockApiKey });
    vi.clearAllMocks();
  });

  it('should throw error if no API key provided', () => {
    expect(() => new FreshlearnClient({ apiKey: '' })).toThrow('API key is required');
  });

  it('should use default base URL', () => {
    const testClient = new FreshlearnClient({ apiKey: mockApiKey });
    expect(testClient).toBeInstanceOf(FreshlearnClient);
  });

  it('should use custom base URL', () => {
    const customUrl = 'https://custom-api.example.com';
    const testClient = new FreshlearnClient({
      apiKey: mockApiKey,
      baseUrl: customUrl,
    });
    expect(testClient).toBeInstanceOf(FreshlearnClient);
  });

  describe('getMembers', () => {
    it('should get members successfully', async () => {
      const mockMembers = [
        { id: '1', email: 'test@example.com', fullName: 'Test User', source: 'api' },
      ];

      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockMembers),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.getMembers();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockMembers);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.freshlearn.com/v1/integration/member',
        expect.objectContaining({
          method: 'GET',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          headers: expect.objectContaining({
            'api-key': mockApiKey,
            Accept: 'application/json',
          }),
        }),
      );
    });
  });

  describe('createMember', () => {
    it('should create member successfully', async () => {
      const memberRequest: CreateMemberRequest = {
        email: 'new@example.com',
        fullName: 'New User',
        source: 'api',
        phone: '+1234567890',
        city: 'New York',
      };

      const mockResponse = { id: '123', ...memberRequest };

      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.createMember(memberRequest);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.freshlearn.com/v1/integration/member',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(memberRequest),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          headers: expect.objectContaining({
            'api-key': mockApiKey,
            'Content-Type': 'application/json',
          }),
        }),
      );
    });
  });

  describe('updateMember', () => {
    it('should update member successfully', async () => {
      const updateRequest: UpdateMemberRequest = {
        id: '123',
        email: 'updated@example.com',
        fullName: 'Updated User',
        source: 'api',
      };

      const mockResponse = { ...updateRequest };

      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.updateMember(updateRequest);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.freshlearn.com/v1/integration/member/update',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateRequest),
        }),
      );
    });
  });

  describe('enrollMember', () => {
    it('should enroll member successfully', async () => {
      const enrollRequest: EnrollMemberRequest = {
        courseId: 'course-123',
        planId: 'plan-456',
        memberEmail: 'member@example.com',
        transactionId: 'txn-789',
        source: 'api',
      };

      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.enrollMember(enrollRequest);

      expect(result.success).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.freshlearn.com/v1/integration/member/enroll',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(enrollRequest),
        }),
      );
    });
  });

  describe('getCompletedCourses', () => {
    it('should get completed courses successfully', async () => {
      const mockCompletedCourses = [
        {
          courseId: 'course-123',
          courseName: 'Test Course',
          memberEmail: 'student@example.com',
          memberName: 'Student Name',
          completedAt: '2024-01-01T00:00:00Z',
        },
      ];

      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockCompletedCourses),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.getCompletedCourses();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockCompletedCourses);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.freshlearn.com/v1/integration/member/completed-courses',
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });
  });

  describe('createMemberAndEnroll', () => {
    it('should create member and enroll successfully', async () => {
      const request: CreateMemberAndEnrollRequest = {
        email: 'new@example.com',
        fullName: 'New Student',
        source: 'api',
        courseId: 'course-123',
        planId: 'plan-456',
        transactionId: 'txn-789',
      };

      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.createMemberAndEnroll(request);

      expect(result.success).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.freshlearn.com/v1/integration/member/createMemberAndEnroll',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(request),
        }),
      );
    });
  });

  describe('unenrollMember', () => {
    it('should unenroll member successfully', async () => {
      const request: UnenrollMemberRequest = {
        courseId: 'course-123',
        memberEmail: 'member@example.com',
      };

      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.unenrollMember(request);

      expect(result.success).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.freshlearn.com/v1/integration/member/unenroll/course',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(request),
        }),
      );
    });
  });

  describe('enrollProductBundle', () => {
    it('should enroll product bundle successfully', async () => {
      const request: EnrollProductBundleRequest = {
        productBundleId: 'bundle-123',
        memberEmail: 'member@example.com',
        transactionId: 'txn-789',
        source: 'api',
      };

      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.enrollProductBundle(request);

      expect(result.success).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.freshlearn.com/v1/integration/member/enroll/productBundle',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(request),
        }),
      );
    });
  });

  describe('error handling', () => {
    it('should handle API errors', async () => {
      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: vi.fn().mockResolvedValue({ message: 'Bad Request' }),
        headers: new Headers({ 'content-type': 'application/json' }),
      } as unknown as Response);

      const result = await client.getMembers();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Bad Request');
    });

    it('should handle non-JSON error responses', async () => {
      (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: vi.fn().mockResolvedValue('Internal Server Error'),
        headers: new Headers({ 'content-type': 'text/plain' }),
      } as unknown as Response);

      const result = await client.getMembers();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Request failed with status 500');
    });
  });
});
