/** Shared domain types for Toplaş mock data (frontend-only, no backend). */

/** A string available in both supported languages. */
export type Localized = { en: string; az: string };

/** Category keys — mirror i18n `categories.*` (except `all`). */
export type CategoryKey =
  | 'technology'
  | 'networking'
  | 'music'
  | 'education'
  | 'sports'
  | 'startups'
  | 'art'
  | 'volunteering'
  | 'languageExchange'
  | 'wellness'
  | 'business'
  | 'books'
  | 'food'
  | 'entrepreneurship'
  | 'personalDev'
  | 'studentClubs'
  | 'peerSupport';

export type EventFormat = 'in_person' | 'online' | 'hybrid';

export type Speaker = {
  id: string;
  name: string;
  role: Localized;
  avatar: string;
};

export type AgendaItem = {
  time: string;
  title: Localized;
};

export type Organizer = {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  followers: number;
  category: CategoryKey;
  bio: Localized;
  isBusiness?: boolean;
};

export type EventItem = {
  id: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  experience: Localized;
  whoShould: Localized;
  requirements: Localized;
  category: CategoryKey;
  tags: string[];
  cover: string;
  /** ISO date-time of start. */
  start: string;
  end?: string;
  venueName: Localized;
  address: string;
  city: Localized;
  /** Normalized position on the stylized 2D map (0..1). Not real GPS. */
  mapX: number;
  mapY: number;
  format: EventFormat;
  /** Lowest ticket price in AZN; 0 means free. */
  priceFrom: number;
  capacity: number;
  seatsLeft: number;
  /** Event language label key: 'en' | 'az' | 'both'. */
  eventLanguage: 'en' | 'az' | 'both';
  organizerId: string;
  featured?: boolean;
  distanceKm: number;
  goingCount: number;
  /** Opt-in attendee avatars (only shown when showAttendees is true). */
  attendeeIds: string[];
  showAttendees: boolean;
  rating?: number;
  agenda: AgendaItem[];
  speakerIds: string[];
  /** Sensitive events (e.g. peer support) never expose attendees. */
  sensitive?: boolean;
};

export type Announcement = {
  id: string;
  author: string;
  text: Localized;
  date: string;
};

export type Post = {
  id: string;
  author: string;
  avatar: string;
  text: Localized;
  date: string;
  likes: number;
};

export type Community = {
  id: string;
  name: Localized;
  description: Localized;
  category: CategoryKey;
  image: string;
  cover: string;
  memberCount: number;
  membership: 'public' | 'private' | 'application';
  joined: boolean;
  upcomingEventIds: string[];
  announcements: Announcement[];
  posts: Post[];
  moderators: string[];
  rules: Localized;
  sensitive?: boolean;
};

export type UserProfile = {
  id: string;
  name: string;
  avatar: string;
  city: Localized;
  bio: Localized;
  interests: CategoryKey[];
  skills: string[];
  languages: string[];
  connections: number;
  isOrganizer: boolean;
};

export type AttendeePreview = {
  id: string;
  name: string;
  avatar: string;
  mutualInterests: number;
};

export type ChatMessage = {
  id: string;
  fromMe: boolean;
  author?: string;
  text: Localized;
  time: string;
};

export type Conversation = {
  id: string;
  kind: 'dm' | 'event' | 'request';
  title: Localized | string;
  avatar: string;
  lastMessage: Localized;
  timestamp: string;
  unread: number;
  eventId?: string;
  isOrganizerAnnouncement?: boolean;
  messages: ChatMessage[];
};

export type NotificationCategory =
  | 'events'
  | 'communities'
  | 'messages'
  | 'opportunities'
  | 'bookings';

export type AppNotification = {
  id: string;
  category: NotificationCategory;
  icon: string;
  title: Localized;
  body: Localized;
  time: string;
  read: boolean;
};

export type Reward = {
  id: string;
  title: Localized;
  detail: Localized;
  eligibility: Localized;
  expires: string;
  terms: Localized;
  code: string;
  points?: number;
};

export type Business = {
  id: string;
  name: string;
  logo: string;
  cover: string;
  description: Localized;
  category: CategoryKey;
  address: string;
  hours: Localized;
  followers: number;
  following: boolean;
  verified: boolean;
  rating: number;
  reviewCount: number;
  upcomingEventIds: string[];
  rewards: Reward[];
};

export type OpportunityType =
  | 'mentorship'
  | 'hackathon'
  | 'pitch'
  | 'skill_exchange'
  | 'co_founder'
  | 'networking';

export type Opportunity = {
  id: string;
  type: OpportunityType;
  title: Localized;
  org: string;
  category: CategoryKey;
  cover: string;
  requiredSkills: string[];
  availability: Localized;
  price?: number;
  deadline?: string;
};

export type Mentor = {
  id: string;
  name: string;
  avatar: string;
  expertise: Localized;
  bio: Localized;
  languages: string[];
  sessionFormats: Localized[];
  availability: Localized;
  pricePerSession: number;
  rating: number;
  reviewCount: number;
};

export type BookingStatus =
  | 'confirmed'
  | 'pending'
  | 'waitlisted'
  | 'attended'
  | 'cancelled';

export type Booking = {
  id: string;
  eventId: string;
  status: BookingStatus;
  ticketType: Localized;
  price: number;
  qr: string;
  purchasedAt: string;
};

export type Review = {
  id: string;
  eventTitle: Localized;
  rating: number;
  text: Localized;
  date: string;
};

/** Organizer dashboard metric series (demo values, clearly sample data). */
export type MetricPoint = { label: string; value: number };
