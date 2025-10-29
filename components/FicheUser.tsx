import { Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { getColorEmoji } from "@/utils/colorUtils";
import { User } from "@/model/User";
import { Ionicons } from "@expo/vector-icons";

interface FicheUserProps extends User {
  onDelete?: () => void; // Nouvelle prop
}

export default function FicheUser({ 
    nom, 
    prenom, 
    image, 
    email, 
    phone,
    age, 
    adresse,
    ville,
    nomEntreprise,
    nomDepartement,
    nomPoste,
    taille,
    poids,
    couleurYeux,
    couleurCheveux,
    typeCheveux,
    role,
    onDelete
}: FicheUserProps) {
    return(
        <ImageBackground
            source={require('@/assets/images/background_gray.jpg')} // Votre image
            style={styles.card}
            imageStyle={styles.backgroundImage}
        >
            {/* Overlay semi-transparent */}
            <View style={styles.overlay} />

            {onDelete && (
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={onDelete}
                >
                    <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
            )}
            
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image 
                        source={{ uri: image }}
                        alt="Photo de profil"
                        style={styles.image}
                    />
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{prenom} {nom}</Text>
                        <Text style={styles.role}>{role}</Text>
                        <Text style={styles.age}>{age} ans</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📞 Contact</Text>
                    <Text style={styles.info}>📧 {email}</Text>
                    <Text style={styles.info}>☎️ {phone}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📍 Adresse</Text>
                    <Text style={styles.info}>{adresse}</Text>
                    <Text style={styles.info}>{ville}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🏢 Entreprise</Text>
                    <Text style={styles.info}>{nomEntreprise}</Text>
                    <Text style={styles.info}>{nomPoste} - {nomDepartement}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📏 Physique</Text>
                    <Text style={styles.info}>Taille: {taille.toFixed(0)} cm</Text>
                    <Text style={styles.info}>Poids: {poids.toFixed(1)} kg</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>👁️ Apparence</Text>
                    <Text style={styles.info}>
                        Yeux: {getColorEmoji(couleurYeux)} {couleurYeux}
                    </Text>
                    <Text style={styles.info}>
                        Cheveux: {getColorEmoji(couleurCheveux)} {couleurCheveux} ({typeCheveux})
                    </Text>
                    <Text style={styles.spacer}>

                    </Text>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
     deleteButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: '#f44336',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card: {
        borderRadius: 15,
        margin: 10,
        width: 350, // Largeur fixe en pixels
        minHeight: 500,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    content: {
        padding: 15,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        opacity: 0.6, // Opacité de l'image de fond
        // margin: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Overlay blanc semi-transparent
        borderRadius: 15,
    },
    header: {
        flexDirection: "row",
        marginBottom: 5,
        marginLeft: 15,
        marginTop: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 15,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
        marginLeft: 15,
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    role: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 5,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    age: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginTop: 12,
        marginLeft: 15,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#555',
    },
    info: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        lineHeight: 20,
    },
    spacer: {
        height: 30,
    },
});