import type {
  FreshlearnConfig,
  Member,
  CreateMemberRequest,
  UpdateMemberRequest,
  EnrollMemberRequest,
  CreateMemberAndEnrollRequest,
  UnenrollMemberRequest,
  EnrollProductBundleRequest,
  ApiResponse,
  CompletedCourse,
  RequestOptions,
} from './types';

export class FreshlearnClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: FreshlearnConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.freshlearn.com/v1';
    this.defaultHeaders = {
      'api-key': this.apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      ...this.defaultHeaders,
      ...options?.headers,
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      fetchOptions.body = JSON.stringify(body);
    }

    if (options?.timeout) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeout);
      fetchOptions.signal = controller.signal;

      try {
        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);
        return this.handleResponse<T>(response);
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    }

    const response = await fetch(url, fetchOptions);
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: unknown = null;
    if (isJson) {
      try {
        data = await response.json();
      } catch {
        data = null;
      }
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error =
        typeof data === 'object' && data !== null && 'message' in data
          ? (data as { message: string }).message
          : `Request failed with status ${response.status}`;

      return {
        success: false,
        error,
        data: data as T,
      };
    }

    return {
      success: true,
      data: data as T,
    };
  }

  async getMembers(options?: RequestOptions): Promise<ApiResponse<Member[]>> {
    return this.request<Member[]>('GET', '/integration/member', undefined, options);
  }

  async createMember(
    member: CreateMemberRequest,
    options?: RequestOptions,
  ): Promise<ApiResponse<Member>> {
    return this.request<Member>('POST', '/integration/member', member, options);
  }

  async updateMember(
    member: UpdateMemberRequest,
    options?: RequestOptions,
  ): Promise<ApiResponse<Member>> {
    return this.request<Member>('PUT', '/integration/member/update', member, options);
  }

  async enrollMember(
    enrollment: EnrollMemberRequest,
    options?: RequestOptions,
  ): Promise<ApiResponse<unknown>> {
    return this.request<unknown>('POST', '/integration/member/enroll', enrollment, options);
  }

  async getCompletedCourses(options?: RequestOptions): Promise<ApiResponse<CompletedCourse[]>> {
    return this.request<CompletedCourse[]>(
      'GET',
      '/integration/member/completed-courses',
      undefined,
      options,
    );
  }

  async createMemberAndEnroll(
    data: CreateMemberAndEnrollRequest,
    options?: RequestOptions,
  ): Promise<ApiResponse<unknown>> {
    return this.request<unknown>(
      'POST',
      '/integration/member/createMemberAndEnroll',
      data,
      options,
    );
  }

  async unenrollMember(
    data: UnenrollMemberRequest,
    options?: RequestOptions,
  ): Promise<ApiResponse<unknown>> {
    return this.request<unknown>('POST', '/integration/member/unenroll/course', data, options);
  }

  async enrollProductBundle(
    data: EnrollProductBundleRequest,
    options?: RequestOptions,
  ): Promise<ApiResponse<unknown>> {
    return this.request<unknown>('POST', '/integration/member/enroll/productBundle', data, options);
  }
}
