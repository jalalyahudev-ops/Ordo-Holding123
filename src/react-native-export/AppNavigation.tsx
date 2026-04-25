import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, CreditCard, Baby, UserCircle2 } from 'lucide-react-native';

import { HomeScreen } from './HomeScreen';
import { SearchScreen } from './SearchScreen';
import { ChildrenScreen } from './ChildrenScreen';
import { ProfileScreen } from './ProfileScreen';
// import { TicketsScreen } from './TicketsScreen'; // Placeholder

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#A2BC3C',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
            height: 90,
            paddingBottom: 30,
            paddingTop: 10,
            backgroundColor: 'white',
            elevation: 10,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 10,
          },
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') return <Home color={color} size={24} />;
            if (route.name === 'Search') return <Search color={color} size={24} />;
            if (route.name === 'Tickets') return <CreditCard color={color} size={24} />;
            if (route.name === 'Children') return <Baby color={color} size={24} />;
            if (route.name === 'Profile') return <UserCircle2 color={color} size={24} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Поиск' }} />
        {/* Placeholder component for Tickets before it's converted */}
        <Tab.Screen name="Tickets" component={HomeScreen} options={{ title: 'Абонемент' }} />
        <Tab.Screen name="Children" component={ChildrenScreen} options={{ title: 'Дети' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
