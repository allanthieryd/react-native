import { ImageSourcePropType } from 'react-native';

export type Personnage = {
    nom: string;
    prenom: string;
    image: ImageSourcePropType;
}

// export type Personnage = {
//     nom: string;
//     prenom: string;
//     image: string; // Gardez string dans le JSON
// }

// export type PersonnageWithImage = {
//     nom: string;
//     prenom: string;
//     image: ImageSourcePropType; // Pour l'affichage
// }