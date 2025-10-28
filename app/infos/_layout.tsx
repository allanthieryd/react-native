import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function InfosLayout() {
  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
      >
        <Tabs.Screen 
          name="tab1"
          options={{ 
            title: 'Tab 1',
            tabBarLabel: 'Tab 1',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="tab2"
          options={{ 
            title: 'Tab 2',
            tabBarLabel: 'Tab 2',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
      />
       <Tabs.Screen 
          name="details/[id]"
          options={{ 
            href: null,
          }}
        />
      </Tabs>
      
  );
}