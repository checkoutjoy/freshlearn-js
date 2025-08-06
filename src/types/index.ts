export interface FreshlearnConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface Member {
  id?: string;
  email: string;
  fullName: string;
  phone?: string;
  city?: string;
  source: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMemberRequest {
  email: string;
  fullName: string;
  source: string;
  phone?: string;
  city?: string;
}

export interface UpdateMemberRequest extends CreateMemberRequest {
  id?: string;
}

export interface EnrollMemberRequest {
  courseId: string;
  planId: string;
  memberEmail: string;
  transactionId: string;
  source: string;
}

export interface CreateMemberAndEnrollRequest {
  email: string;
  fullName: string;
  source: string;
  phone?: string;
  city?: string;
  courseId: string;
  planId: string;
  transactionId: string;
}

export interface UnenrollMemberRequest {
  courseId: string;
  memberEmail: string;
}

export interface EnrollProductBundleRequest {
  productBundleId: string;
  memberEmail: string;
  transactionId: string;
  source: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface CompletedCourse {
  courseId: string;
  courseName: string;
  memberEmail: string;
  memberName: string;
  completedAt: string;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}
