// Type complet pour les données de l'API
export type UserAPI = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    address: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        country: string;
        coordinates: {
                lat: number;
                lng: number;
            };
    };
    university: string;
    company: {
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
            country: string;
            coordinates: {
                lat: number;
                lng: number;
            };
        };
        department: string;
        name: string;
        title: string;
    };
    bank: {
        cardType: string;
        cardNumber: string;
        cardExpire: string;
        currency: string;
        iban: string;
    };
    crypto: {
        coin: string;
        network: string;
        wallet: string;
    };
    ip: string;
    macAddress: string;
    ein: string;
    ssn: string;
    userAgent: string;
    role: string;
}

// Type pour l'affichage
export type User = {
    id: number;
    nom: string;
    prenom: string;
    image: string;
    email: string;
    phone: string;
    age: number;
    adresse: string;
    ville: string;
    nomEntreprise: string;
    nomDepartement: string;
    nomPoste: string;
    taille: number;
    poids: number;
    couleurYeux: string;
    couleurCheveux: string;
    typeCheveux: string;
    role: string;
}