import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface ConfirmDeleteModalProps {
  visible: boolean;
  userName: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({ 
  visible, 
  userName, 
  onConfirm, 
  onCancel 
}: ConfirmDeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setShowSuccess(true);
      setMessage('Utilisateur supprimé avec succès');
      setTimeout(() => {
        setShowSuccess(false);
        onCancel();
      }, 1500);
    } catch (error) {
      setShowError(true);
      setMessage('Erreur lors de la suppression');
      setTimeout(() => setShowError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {showSuccess ? (
            <View style={styles.statusContainer}>
              <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
              <Text style={styles.statusText}>{message}</Text>
            </View>
          ) : showError ? (
            <View style={styles.statusContainer}>
              <Ionicons name="close-circle" size={80} color="#f44336" />
              <Text style={[styles.statusText, styles.errorText]}>{message}</Text>
            </View>
          ) : (
            <>
              <Ionicons name="warning" size={60} color="#ff9800" />
              <Text style={styles.title}>Confirmer la suppression</Text>
              <Text style={styles.message}>
                Êtes-vous sûr de vouloir supprimer {userName} ?
              </Text>
              <Text style={styles.warning}>Cette action est irréversible.</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onCancel}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, styles.deleteButton]} 
                  onPress={handleConfirm}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={[styles.buttonText, styles.deleteButtonText]}>
                      Supprimer
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
    padding: 25,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  warning: {
    fontSize: 14,
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
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
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButtonText: {
    color: 'white',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 15,
    textAlign: 'center',
  },
  errorText: {
    color: '#f44336',
  },
});