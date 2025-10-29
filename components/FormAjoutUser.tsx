import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addUser } from '@/service/UserService';

interface FormAjoutUserProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormAjoutUser({ visible, onClose, onSuccess }: FormAjoutUserProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    // Validation
    if (!firstName || !lastName || !age) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 150) {
      Alert.alert('Erreur', 'Veuillez entrer un âge valide.');
      return;
    }

    setLoading(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const result = await addUser({
        firstName,
        lastName,
        age: ageNumber
      });

      setMessage(result.message);

      if (result.success) {
        // Succès - Croix verte
        setShowSuccess(true);
        console.log('Utilisateur ajouté:', result.data);
        
        setTimeout(() => {
          setShowSuccess(false);
          resetForm();
          onSuccess();
          onClose();
        }, 2000);
      } else {
        // Erreur - Croix rouge
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setShowError(true);
      setMessage('Une erreur est survenue');
      setTimeout(() => setShowError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setAge('');
    setMessage('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Ajouter un utilisateur</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Icône de succès */}
          {showSuccess && (
            <View style={styles.statusContainer}>
              <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
              <Text style={styles.statusText}>{message}</Text>
            </View>
          )}

          {/* Icône d'erreur */}
          {showError && (
            <View style={styles.statusContainer}>
              <Ionicons name="close-circle" size={100} color="#f44336" />
              <Text style={[styles.statusText, styles.errorText]}>{message}</Text>
            </View>
          )}

          {/* Formulaire */}
          {!showSuccess && !showError && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={firstName}
                onChangeText={setFirstName}
                editable={!loading}
              />

              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={lastName}
                onChangeText={setLastName}
                editable={!loading}
              />

              <TextInput
                style={styles.input}
                placeholder="Âge"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                editable={!loading}
              />

              {/* Boutons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onClose}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]} 
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={[styles.buttonText, styles.submitButtonText]}>
                      Ajouter
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButtonText: {
    color: 'white',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    color: '#f44336',
  },
});