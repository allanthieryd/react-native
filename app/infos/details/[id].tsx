import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { fetchUserById } from '@/service/UserService';
import { UserAPI } from '@/model/User';
import { getColorEmoji } from '@/utils/colorUtils';

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<UserAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await fetchUserById(id);
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erreur : {error || 'Utilisateur non trouvé'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header avec photo */}
      <View style={styles.header}>
        <Image 
          source={{ uri: user.image }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <View style={styles.roleContainer}>
          <Text style={styles.role}>{user.role}</Text>
        </View>
      </View>

      {/* Informations personnelles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Informations personnelles</Text>
        <InfoRow label="Nom de jeune fille" value={user.maidenName} />
        <InfoRow label="Âge" value={`${user.age} ans`} />
        <InfoRow label="Genre" value={user.gender} />
        <InfoRow label="Date de naissance" value={user.birthDate} />
        <InfoRow label="Groupe sanguin" value={user.bloodGroup} />
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 Contact</Text>
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Téléphone" value={user.phone} />
      </View>

      {/* Adresse */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Adresse</Text>
        <InfoRow label="Rue" value={user.address.address} />
        <InfoRow label="Ville" value={user.address.city} />
        <InfoRow label="État" value={`${user.address.state} (${user.address.stateCode})`} />
        <InfoRow label="Code postal" value={user.address.postalCode} />
        <InfoRow label="Pays" value={user.address.country} />
        <InfoRow label="Coordonnées" value={`${user.address.coordinates.lat}, ${user.address.coordinates.lng}`} />
      </View>

      {/* Physique */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📏 Caractéristiques physiques</Text>
        <InfoRow label="Taille" value={`${user.height.toFixed(2)} cm`} />
        <InfoRow label="Poids" value={`${user.weight.toFixed(2)} kg`} />
        <InfoRow label="Couleur des yeux" value={`${getColorEmoji(user.eyeColor)} ${user.eyeColor}`} />
        <InfoRow label="Couleur des cheveux" value={`${getColorEmoji(user.hair.color)} ${user.hair.color}`} />
        <InfoRow label="Type de cheveux" value={user.hair.type} />
      </View>

      {/* Entreprise */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏢 Entreprise</Text>
        <InfoRow label="Entreprise" value={user.company.name} />
        <InfoRow label="Département" value={user.company.department} />
        <InfoRow label="Poste" value={user.company.title} />
        <InfoRow label="Adresse bureau" value={user.company.address.address} />
        <InfoRow label="Ville bureau" value={`${user.company.address.city}, ${user.company.address.state}`} />
      </View>

      {/* Éducation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎓 Éducation</Text>
        <InfoRow label="Université" value={user.university} />
      </View>

      {/* Informations bancaires */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Informations bancaires</Text>
        <InfoRow label="Type de carte" value={user.bank.cardType} />
        <InfoRow label="Numéro de carte" value={`**** **** **** ${user.bank.cardNumber.slice(-4)}`} />
        <InfoRow label="Expiration" value={user.bank.cardExpire} />
        <InfoRow label="Devise" value={user.bank.currency} />
        <InfoRow label="IBAN" value={user.bank.iban} />
      </View>

      {/* Crypto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>₿ Crypto</Text>
        <InfoRow label="Coin" value={user.crypto.coin} />
        <InfoRow label="Réseau" value={user.crypto.network} />
        <InfoRow label="Wallet" value={user.crypto.wallet} />
      </View>

      {/* Informations techniques */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔧 Informations techniques</Text>
        <InfoRow label="IP" value={user.ip} />
        <InfoRow label="Adresse MAC" value={user.macAddress} />
        <InfoRow label="EIN" value={user.ein} />
        <InfoRow label="SSN" value={user.ssn} />
        <InfoRow label="User Agent" value={user.userAgent} />
      </View>
    </ScrollView>
  );
}

// Composant helper pour afficher une ligne d'info
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  roleContainer: {
    marginTop: 10,
  },
  role: {
    fontSize: 14,
    color: 'white',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 140,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});