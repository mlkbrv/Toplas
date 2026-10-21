import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import { EventDetailsScreen } from '../screens/EventDetailsScreen';
import { CommunityDetailsScreen } from '../screens/CommunityDetailsScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { MyEventsScreen } from '../screens/MyEventsScreen';
import { SurpriseMeScreen } from '../screens/SurpriseMeScreen';
import { CreateEventScreen } from '../screens/CreateEventScreen';
import { OrganizerDashboardScreen } from '../screens/OrganizerDashboardScreen';
import { BusinessProfileScreen } from '../screens/BusinessProfileScreen';
import { OpportunitiesScreen } from '../screens/OpportunitiesScreen';
import { MentorProfileScreen } from '../screens/MentorProfileScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetailsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
      <Stack.Screen name="Opportunities" component={OpportunitiesScreen} />
      <Stack.Screen name="MentorProfile" component={MentorProfileScreen} />
      <Stack.Screen name="OrganizerDashboard" component={OrganizerDashboardScreen} />
      <Stack.Screen name="MyEvents" component={MyEventsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom' }}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SurpriseMe" component={SurpriseMeScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
