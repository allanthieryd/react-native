import { Personnage } from "@/model/Personnage";
import personnagesData from '@/data/personnages.json';
import { getImage } from '@/utils/imageMapper';

export default function getPersons(): Personnage[] {
    return personnagesData.map(p => ({
        id: p.id,
        nom: p.nom,
        prenom: p.prenom,
        image: getImage(p.image)
    }));
}