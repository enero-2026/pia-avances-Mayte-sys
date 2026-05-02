import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#59b2ab', headerShown: false }}>
      <Tabs.Screen
        name="notas"
        options={{ title: 'Notas', tabBarIcon: ({ color }) => <Ionicons name="document-text-outline" size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="tareas"
        options={{ title: 'Tareas', tabBarIcon: ({ color }) => <Ionicons name="checkmark-circle-outline" size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="archivos"
        options={{ title: 'Archivos', tabBarIcon: ({ color }) => <Ionicons name="folder-outline" size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="cuenta"
        options={{ title: 'Cuenta', tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} /> }}
      />
    </Tabs>
  );
}