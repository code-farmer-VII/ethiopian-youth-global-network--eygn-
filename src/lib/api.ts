import { ApiRequestError, type ApiErrorBody } from './api-error';

/**
 * Typed client for the eygn-api backend (`/home/francis/Documents/eygn/backend/eygn-api`).
 * See that repo's `.claude/skills/eygn-api/references/api-contract.md` for the source of truth
 * on request/response shapes — keep this file in sync with it when the API changes.
 */

// "localhost" only ever means "this device" -- fine when you're on the same machine as the
// backend, but it silently breaks when a phone or another computer on the LAN opens the dev
// server at e.g. http://192.168.1.23:3000, since that device's own localhost:8080 has nothing
// running. Default to whatever host the page itself was loaded from instead, so it keeps working
// unmodified across localhost, 127.0.0.1, and any LAN IP. VITE_API_BASE_URL still wins when set
// (needed for a real deployment where the API lives on a different host than the frontend).
const DEFAULT_BASE_URL = `http://${window.location.hostname}:8080/api/v1`;

// `||`, not `??` -- an empty string (e.g. from a literally-copied but unfilled .env.example
// line) must also fall through to the dynamic default, not be used as-is.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '');

// ---------------------------------------------------------------------------
// Enums shared with the backend (eygn-api prisma/schema.prisma)
// ---------------------------------------------------------------------------

export type ApplicantCategory = 'diaspora' | 'local' | 'student' | 'professional' | 'partner';

export type InterestArea =
  | 'tech_innovation'
  | 'climate_action'
  | 'higher_education'
  | 'public_policy_diplomacy'
  | 'healthcare_repatriation'
  | 'fintech_business_incubation'
  | 'pan_african_heritage';

export type ContactDepartment =
  | 'general'
  | 'media_communication'
  | 'partnerships_outreach'
  | 'operations_coordination'
  | 'research_policy'
  | 'youth_mobilization_chapters'
  | 'events_program_coordination';

export type EventType = 'in_person' | 'hybrid' | 'virtual';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';
export type EventStatus = 'Open' | 'Past';
export type EventWhen = 'upcoming' | 'past';

// ---------------------------------------------------------------------------
// Request / response shapes
// ---------------------------------------------------------------------------

export interface MembershipApplicationInput {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  city?: string;
  profession: string;
  applicantCategory?: ApplicantCategory;
  organizationOrUni?: string;
  interestAreas: InterestArea[];
  statementOfPurpose?: string;
  newsletterOptIn?: boolean;
}

export interface MembershipApplicationResult {
  id: number;
  status: ApplicationStatus;
  createdAt: string;
}

export interface PartnershipInquiryInput {
  organizationName: string;
  representativeName: string;
  email: string;
  collaborationDomain?: string;
  message: string;
}

export interface PartnershipInquiryResult {
  id: number;
  createdAt: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  department?: ContactDepartment;
  message: string;
}

export interface ContactMessageResult {
  id: number;
  createdAt: string;
}

export interface EventDto {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
  location: string | null;
  type: EventType;
  category: string | null;
  featuredSpeakers: string[];
  capacity: number | null;
  imageUrl: string | null;
  registeredCount: number;
  status: EventStatus;
}

export interface EventRegistrationInput {
  fullName: string;
  email: string;
}

export interface EventRegistrationResult {
  id: number;
  eventSlug: string;
  createdAt: string;
}

export interface NewsletterSubscriptionResult {
  email: string;
  subscribedAt: string;
  /** Null until the subscriber clicks the confirmation link emailed to them (double opt-in, B6). */
  confirmedAt: string | null;
  /** Signed token (B11) required to unsubscribe this email — keep it if you want to offer an unsubscribe action. */
  unsubscribeToken: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  publishedAt: string;
  categories: string[];
  excerpt: string;
  author: string | null;
  readingTime: string | null;
  imageUrl: string | null;
}

export interface PostList {
  content: PostSummary[];
  page: number;
  size: number;
  totalElements: number;
}

export interface PostDetail {
  slug: string;
  title: string;
  publishedAt: string;
  categories: string[];
  body: string[];
  author: string | null;
  location: string | null;
  featuredQuote: string | null;
  readingTime: string | null;
  imageUrl: string | null;
}

export interface ProgramStat {
  label: string;
  value: string;
}

export type ProgramStatus = 'Active' | 'Upcoming' | 'Flagship';

export interface ProgramDto {
  slug: string;
  acronym: string | null;
  title: string;
  subtitle: string | null;
  description: string;
  activities: string[];
  targetAudience: string | null;
  howToJoin: string | null;
  stats: ProgramStat[] | null;
  status: ProgramStatus;
  pillar: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

export interface TeamMemberDto {
  fullName: string;
  role: string;
  roleAm: string | null;
  department: string | null;
  bio: string | null;
  highlights: string[];
  email: string | null;
  linkedin: string | null;
  photoUrl: string | null;
}

// ---------------------------------------------------------------------------
// Core request helper
// ---------------------------------------------------------------------------

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init.headers },
    });
  } catch {
    throw new ApiRequestError(0, {
      error: 'NETWORK_ERROR',
      message: 'Could not reach the EYGN API. Check your connection and try again.',
    });
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();
  const body = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    throw new ApiRequestError(res.status, (body as ApiErrorBody) ?? { error: 'UNKNOWN_ERROR' });
  }

  return body as T;
}

function get<T>(path: string): Promise<T> {
  return request<T>(path);
}

function post<T>(path: string, data: unknown): Promise<T> {
  return request<T>(path, { method: 'POST', body: JSON.stringify(data) });
}

function del<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'DELETE' });
}

// ---------------------------------------------------------------------------
// Members / partnership
// ---------------------------------------------------------------------------

export function submitMembershipApplication(input: MembershipApplicationInput): Promise<MembershipApplicationResult> {
  return post('/members', input);
}

export function submitPartnershipInquiry(input: PartnershipInquiryInput): Promise<PartnershipInquiryResult> {
  return post('/partnership-inquiries', input);
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export function listEvents(when: EventWhen = 'upcoming'): Promise<EventDto[]> {
  return get(`/events?when=${when}`);
}

export function getEvent(slug: string): Promise<EventDto> {
  return get(`/events/${encodeURIComponent(slug)}`);
}

export function registerForEvent(slug: string, input: EventRegistrationInput): Promise<EventRegistrationResult> {
  return post(`/events/${encodeURIComponent(slug)}/registrations`, input);
}

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------

export function subscribeToNewsletter(email: string): Promise<NewsletterSubscriptionResult> {
  return post('/newsletter/subscribers', { email });
}

export function unsubscribeFromNewsletter(email: string, unsubscribeToken: string): Promise<void> {
  return del(`/newsletter/subscribers/${encodeURIComponent(email)}?token=${encodeURIComponent(unsubscribeToken)}`);
}

export interface NewsletterConfirmResult {
  email: string;
  confirmedAt: string;
}

export function confirmNewsletterSubscription(email: string, token: string): Promise<NewsletterConfirmResult> {
  return get(`/newsletter/confirm?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export function submitContactMessage(input: ContactMessageInput): Promise<ContactMessageResult> {
  return post('/contact-messages', input);
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export function listPosts(params: { category?: string; page?: number; size?: number } = {}): Promise<PostList> {
  const search = new URLSearchParams();
  if (params.category) search.set('category', params.category);
  if (params.page !== undefined) search.set('page', String(params.page));
  if (params.size !== undefined) search.set('size', String(params.size));
  const query = search.toString();
  return get(`/posts${query ? `?${query}` : ''}`);
}

export function getPost(slug: string): Promise<PostDetail> {
  return get(`/posts/${encodeURIComponent(slug)}`);
}

// ---------------------------------------------------------------------------
// Reference data
// ---------------------------------------------------------------------------

export function listCategories(): Promise<string[]> {
  return get('/categories');
}

export interface CoreValueDto {
  name: string;
  nameAm: string | null;
  description: string;
  iconName: string;
}

export function listCoreValues(): Promise<CoreValueDto[]> {
  return get('/core-values');
}

export function listPrograms(): Promise<ProgramDto[]> {
  return get('/programs');
}

export function listTeamMembers(leadershipOnly = false): Promise<TeamMemberDto[]> {
  return get(`/team-members${leadershipOnly ? '?leadership=true' : ''}`);
}

// ---------------------------------------------------------------------------
// Media center: chapters, gallery, statistics, press (B9)
// ---------------------------------------------------------------------------

export interface ChapterDto {
  id: number;
  city: string;
  country: string;
  /** Already the display label (e.g. "Africa"), not the enum slug -- see reference.ts. */
  region: string;
  leads: string;
  membersCount: number;
  established: string;
  focus: string;
  imageUrl: string | null;
  coordinates: { x: number; y: number };
}

export interface StatisticDto {
  label: string;
  value: number;
  suffix: string | null;
  quarterlyNote: string | null;
}

export interface MediaItemDto {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  /** Already the display label (e.g. "Heritage"), not the enum slug. */
  category: string;
  type: 'photo' | 'video';
  description: string;
  location: string | null;
  aspectRatio: string;
  duration: string | null;
  mediaUrl: string | null;
}

export interface PressItemDto {
  title: string;
  format: string;
  description: string;
  downloadUrl: string | null;
}

export function listChapters(): Promise<ChapterDto[]> {
  return get('/chapters');
}

export function listStatistics(): Promise<StatisticDto[]> {
  return get('/statistics');
}

export function listMediaItems(): Promise<MediaItemDto[]> {
  return get('/media-items');
}

export function listPressItems(): Promise<PressItemDto[]> {
  return get('/press-items');
}

export { ApiRequestError };
