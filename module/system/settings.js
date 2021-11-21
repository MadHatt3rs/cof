export const registerSystemSettings = function() {

    game.settings.register("cof", "useRecovery", {
        name: "Points de Récupération",
        hint: "Utiliser la règle avancée des Points de Récupération (PR) (p.77).",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("cof", "useFortune", {
        name: "Points de Chance",
        hint: "Utiliser la règle avancée des Points de Chance (PC) (p.77).",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("cof", "useMana", {
        name: "Points de Mana",
        hint: "Utiliser la règle avancée des Points de Mana (PM) (p.79).",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("cof", "useDamageResistance", {
        name: "Résistance aux dommages",
        hint: "Afficher la résistance aux dommages sur la feuille de personnage.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("cof", "displayDifficulty", {
        name: "Afficher la difficulté",
        hint: "Active l'affichage de la difficulté sur les jets de compétences/attributs et d'armes.",
        scope: "world",
        config: true,
        default: "none",
        type: String,
        choices: {
            "none" : "Ne pas utiliser ni afficher la difficulté",
            "all" : "Utiliser la difficulté et l'afficher pour tout le monde",
            "gm" : "Utiliser la difficulté et l'afficher uniquement au MJ"
        }
    });

    game.settings.register("cof", "useComboRolls", {
        name: "Activer les jets \"combo\"",
        hint: "Permet de lancer les jets d'attaque et de dommages simultanément.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("cof", "useVarInit", {
        name: "Utiliser la règle de l'initiative variable",
        hint: "Le résultat d’un d6 explosif est ajouté à l'initiative à chaque nouveau round (p.173).",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("cof", "useIncompetentPJ", {
        name: "Utiliser la règle de l'incompétence des PJ",
        hint: "Une arme ou une armure non maitrisée donne différents malus (p.62).",
        scope: "world",
        config: false,
        default: false,
        type: Boolean
    });

    game.settings.register("cof", "useOverload", {
        name: "Malus d'armue",
        hint: "Le malus d'armure octroient des malus pour les tests de DEX. (p.65)",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });   

    game.settings.register("cof", "displayChatDamageButtonsToAll", {
        name: "Afficher les boutons de dommages",
        hint: "Affiche les boutons d'application des dommages dans les messages de chat à tout le monde.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
    
    game.settings.register("cof", "moveItem", {
        name: "Mode de déplacement des items",
        hint: "Comportement du drag & drop d'un item sur une fiche de personnage (Maintenir MAJ lors du drop pour inverser).",
        scope: "world",
        type: String,
        choices: {
            "0" : "Copier l'objet (par défaut dans Foundry)",
            "1" : "Déplacer l'objet"
        },
        default: "0",
        config: true
    });    

    game.settings.register("cof", "lockItems",{
        name: "Verrouiller les objets",
        hint: "Interdire aux joueurs de modifier les objets",
        scope: "world",
        config: true,
        default: false,
        type: Boolean        
    });

    game.settings.register("cof", "checkFreeHandsBeforeEquip", {
        name: "Vérification des mains libres",
        hint: "Vérifier que le personnage a assez de mains libres pour équiper un objet (Maintenir MAJ pour ignorer le contrôle)",
        scope: "world",
        config: true,
        default: "none",
        type: String,
        choices: {
            "none" : "Ne pas vérifier",
            "all" : "Vérification (ignorable par tous)",
            "gm" : "Vérification (ignorable uniquement par le MJ)"
        }
    });
    
    game.settings.register("cof", "checkArmorSlotAvailability", {
        name: "Vérification des emplacements d'armure",
        hint: "Vérifier la disponibilité d'un emplacement avant d'équiper une armure (Maintenir MAJ pour ignorer le contrôle)",
        scope: "world",
        config: true,
        default: "none",
        type: String,
        choices: {
            "none" : "Ne pas vérifier",
            "all" : "Vérification (ignorable par tous)",
            "gm" : "Vérification (ignorable uniquement par le MJ)"
        }
    });    
};
