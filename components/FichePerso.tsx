import { Image, StyleSheet, Text, View, ImageSourcePropType } from "react-native";

interface FichePersoProps {
    nom: string;
    prenom: string;
    image: ImageSourcePropType;
}

export default function FichePerso({ nom, prenom, image }: FichePersoProps) {
    return(
        <View style={styles.card}>
            <View style={styles.txtInCard}>
                <Text style={styles.text}>Nom: {nom}</Text>
                <Text style={styles.text}>Prénom: {prenom}</Text>
            </View>
            <Image 
                source={image}
                alt="Photo de profil"
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderColor: "green",
        borderWidth: 2,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        width: '90%',
    },
    txtInCard: {
        gap: 5,
    },
    text: {
        fontSize: 16,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    }
});