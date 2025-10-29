import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import FicheUser from '@/components/FicheUser';
import FormAjoutUser from '@/components/FormAjoutUser';
import { User } from '@/model/User';
import { fetchUsers, deleteUser } from '@/service/UserService';
import { Ionicons } from '@expo/vector-icons';

export default function Tab2Screen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
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
  
  const handleSuccess = () => {
    // Recharger la liste après ajout
    loadUsers();
  };

  const handleDeletePress = (user: User) => {
    setUserToDelete(user);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    const result = await deleteUser(userToDelete.id);
    
    if (result.success) {
      // Supprimer de la liste locale
      setUsers(users.filter(u => u.id !== userToDelete.id));
    } else {
      throw new Error(result.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.spacer}></Text>
        <Text style={styles.title}>Utilisateurs de l&apos;API</Text>
        {users.map((user) => (
          <TouchableOpacity 
            key={user.id} 
            onPress={() => handleUserPress(user.id)}
            activeOpacity={0.7}
          >
            <FicheUser 
              {...user} 
              onDelete={() => handleDeletePress(user)}
            />
          </TouchableOpacity>
        ))}
        <Text style={styles.copyright}>Copyright</Text>
        </ScrollView>

        <TouchableOpacity 
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        {/* Modal formulaire */}
        <FormAjoutUser
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSuccess={handleSuccess}
        />
      </View>

    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
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