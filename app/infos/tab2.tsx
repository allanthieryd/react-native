import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import FicheUser from '@/components/FicheUser';
import { User } from '@/model/User';
import { fetchUsers } from '@/service/UserService';

export default function Tab2Screen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleUserPress = (userId: number) => {
    router.push({
        pathname: '/infos/details/[id]',
        params: { id: userId.toString() }
    } as any);
};

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.spacer}>
      
                          </Text>
      <Text style={styles.title}>Utilisateurs de l&apos;API</Text>
      {users.map((user) => (
        <TouchableOpacity 
          key={user.id} 
          onPress={() => handleUserPress(user.id)}
          activeOpacity={0.7}
        >
          <FicheUser {...user} />
        </TouchableOpacity>
      ))}
      <Text style={styles.copyright}>Copyright</Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#666',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  copyright: {
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
    color: '#b3afafff',
  },
  spacer: {
    height: 50,
  },
});