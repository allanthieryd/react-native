import { User, UserAPI } from "@/model/User";

const API_URL = 'https://dummyjson.com/users';

export async function fetchUsers(): Promise<User[]> {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des utilisateurs');
        }
        
        const data = await response.json();
        
        // Transformer les données de l'API
        return data.users.map((user: UserAPI) => ({
            id: user.id,
            nom: user.lastName,
            prenom: user.firstName,
            image: user.image,
            email: user.email,
            phone: user.phone,
            age: user.age,
            adresse: user.address.address,
            ville: user.address.city,
            nomEntreprise: user.company.name,
            nomDepartement: user.company.department,
            nomPoste : user.company.title,
            taille: user.height,
            poids: user.weight,
            couleurYeux: user.eyeColor,
            couleurCheveux: user.hair.color,
            typeCheveux: user.hair.type,
            role: user.role
        }));
    } catch (error) {
        console.error('Erreur fetch:', error);
        throw error;
    }
}

export async function fetchUserById(id: string): Promise<UserAPI> {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Utilisateur non trouvé');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur fetch user:', error);
        throw error;
    }
}
