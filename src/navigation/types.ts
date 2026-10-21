import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export type MyEventsTab = 'upcoming' | 'past' | 'saved' | 'waitlist';

export type TabParamList = {
  Discover: undefined;
  Explore: undefined;
  Communities: undefined;
  Inbox: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  EventDetails: { eventId: string };
  CommunityDetails: { communityId: string };
  Chat: { conversationId: string };
  Search: undefined;
  MyEvents: { tab?: MyEventsTab } | undefined;
  SurpriseMe: undefined;
  CreateEvent: undefined;
  OrganizerDashboard: undefined;
  BusinessProfile: { businessId: string };
  Opportunities: undefined;
  MentorProfile: { mentorId: string };
  Notifications: undefined;
  Settings: undefined;
};

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

export function useAppNavigation(): AppNavigation {
  return useNavigation<AppNavigation>();
}
