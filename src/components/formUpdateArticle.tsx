import React from 'react'
import { ModalBody, ModalFooter, Button, Input, SelectItem, Select, Textarea } from "@nextui-org/react";
import { updateArticle } from '@/app/action/adminAction';

const taille = [
    { key: 'S', label: 'S' },
    { key: 'M', label: 'M' },
    { key: 'L', label: 'L' },
    { key: 'XL', label: 'XL' },
    { key: 'XXL', label: 'XXL' },
    { key: 'U', label: 'U' },
];

const etat = [
    { key: 'Neuf', label: 'Neuf' },
    { key: 'Bon état', label: 'Bon état' },
    { key: 'Très bon état', label: 'Très bon état' },
    { key: 'Moyen', label: 'Moyen' },
    { key: 'Mauvais', label: 'Mauvais' },
];

const couleur = [
    { key: '#FF0000', label: 'Rouge' },
    { key: '#0000FF', label: 'Bleu' },
    { key: '#00FF00', label: 'Vert' },
    { key: '#000000', label: 'Noir' },
    { key: '#FFFFFF', label: 'Blanc' },
    { key: '#FFFF00', label: 'Jaune' },
    { key: '#FF00FF', label: 'Magenta' },
    { key: '#00FFFF', label: 'Cyan' },
    { key: '#FFA500', label: 'Orange' },
    { key: '#800080', label: 'Violet' },
    { key: '#FFC0CB', label: 'Rose' },
];

interface FormUpdateProps {
    article: any;
    onClose: () => void;
    categories?: any;
    sousCategories?: any;
}


export default function FormUpdateArticle({ article, onClose, categories, sousCategories }: FormUpdateProps) {
    const [formState, setFormState] = React.useState({
        nomProduit: article.nomProduit,
        taille: article.taille,
        couleur: article.couleur,
        etat: article.etat,
        prix: article.prix,
        description: article.description,
        idSousCategorie: article.idSousCategorie,
        idCategorie: article.idCategorie,
    });


    const updateArticleAction = updateArticle.bind(null, article.id, formState)
    return (
        <form action={updateArticleAction}>
            <ModalBody>
                <Input
                    autoFocus
                    label="Nom de l'article"
                    name="nomProduit"
                    labelPlacement="outside"
                    placeholder={article.nomProduit}
                    variant="bordered"
                    type="text"
                    onChange={(e) => setFormState({ ...formState, nomProduit: e.target.value })}
                />
                <div className="flex flex-col w-full">
                    <Select
                        name='taille'
                        labelPlacement='outside'
                        label="Sélectionner une taille"
                        placeholder={article.taille}
                        onChange={(e) => setFormState({ ...formState, taille: e.target.value })}
                    >
                        {taille.map((tailleItem) => (
                            <SelectItem key={tailleItem.key} value={tailleItem.label}>{tailleItem.label}</SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col w-full">
                    <Select
                        name='couleur'
                        labelPlacement='outside'
                        label="Sélectionner une couleur"
                        placeholder={article.couleur}
                        onChange={(e) => setFormState({ ...formState, couleur: e.target.value })}
                    >
                        {couleur.map((couleurItem) => (
                            <SelectItem key={couleurItem.key} value={couleurItem.label}>{couleurItem.label}</SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col w-full">
                    <Select
                        name='etat'
                        labelPlacement='outside'
                        label="Sélectionner un état"
                        placeholder={article.etat}
                        onChange={(e) => setFormState({ ...formState, etat: e.target.value })}
                    >
                        {etat.map((etatItem) => (
                            <SelectItem key={etatItem.key} value={etatItem.label}>{etatItem.label}</SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col w-full">
                    <Select
                        name='idCategorie'
                        labelPlacement='outside'
                        label="Sélectionner une categorie"
                        placeholder={article.categorie.nomCategorie}
                        onChange={(e) => setFormState({ ...formState, idCategorie: e.target.value })}
                    >
                        {categories.map((cat: any) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.nomCategorie}</SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col w-full">
                    <Select
                        name='idSousCategorie'
                        labelPlacement='outside'
                        label="Sélectionner une sous categorie"
                        placeholder={article.sousCategorie.nomSousCategorie}
                        onChange={(e) => setFormState({ ...formState, idSousCategorie: e.target.value })}
                    >
                        {sousCategories.map((sousCat: any) => (
                            <SelectItem key={sousCat.id} value={sousCat.id}>{sousCat.nomSousCategorie}</SelectItem>
                        ))}
                    </Select>
                </div>
                <Input
                    type="number"
                    label="Prix"
                    name='prix'
                    placeholder="0.00"
                    labelPlacement="outside"
                    onChange={(e) => setFormState({ ...formState, prix: e.target.value })}
                    startContent={
                        <div className="pointer-events-none">
                            <span className="text-default-400 text-small">$</span>
                        </div>
                    }
                />
                <Textarea
                    labelPlacement='outside'
                    label="Ajoutez une description"
                    id="description"
                    name="description"
                    placeholder={article.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    type="text"
                />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                    Fermer
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                    Modifiez
                </Button>
            </ModalFooter>
        </form>
    )
}
