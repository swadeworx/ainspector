
//
// OpenAjax Alliance WCAG 2.0 Ruleset National Language Support (NLS): Français
//

OpenAjax.a11y.addNLSForRuleset('WCAG_2_0', 'fr-fr', 
  {
    name        : 'WCAG 2.0',
    description : 'Règles pour l\'accessibilité des contenus Web v2.0',	  
    version     : 'beta',
    date        : '2011-04-01',

    //
    // Level of important of a requirement
    //
    levels : {
        'LEVEL_A'   : 'A',     // Most important requirements
        'LEVEL_AA'  : 'AA',    // Important requirements
        'LEVEL_AAA' : 'AAA',   // Lower importance requirements
    },
    
    //
    // Severity of not meeting a requirement  
    //
    severities : {
        'SEVERITY_PASS'                     : 'Conforme',
        'SEVERITY_NA'                       : 'N/A',
        'SEVERITY_VIOLATION'                : 'Non conforme',
        'SEVERITY_POTENTIAL_VIOLATION'      : 'Potentiellement non conforme',
        'SEVERITY_RECOMMENDATION'           : 'Recommandation',
        'SEVERITY_POTENTIAL_RECOMMENDATION' : 'Potentiellement recommandé'
    },
    
    //
    // Relative implementation priorities of complying to rule requirements  
    //
    priorities : {
        'PRIORITY_P1' : 'Première priorité',
        'PRIORITY_P2' : 'Seconde priorité',
        'PRIORITY_P3' : 'Troisième priorité',
    },		

    //
    // Status of a rule for evaluating a requirement  
    //
    status : {
        'STATUS_ACCEPTED'   : 'Acceptée',
        'STATUS_PROPOSED'   : 'Proposée',
        'STATUS_DEPRECATED' : 'Dépréciée',
    },

    //
    // Types of rule references to a requirement  
    //
    references : {
        'RR_TYPE_REQUIREMENT' : 'Exigence',
        'RR_TYPE_TECHNIQUE'   : 'Technique',
        'RR_TYPE_BEST_PRACT'  : 'Bonne pratique',
        'RR_TYPE_MANUAL'      : 'Test manuel',
        'RR_TYPE_OTHER'       : 'Autre',
    },

    //
    // Abbreviation for the types of rule references to a requirement  
    //
    reference_abbreviations : {
        'RR_TYPE_REQUIREMENT' : 'E',
        'RR_TYPE_TECHNIQUE'   : 'T',
        'RR_TYPE_BEST_PRACT'  : 'BP',
        'RR_TYPE_MANUAL'      : 'TM',
        'RR_TYPE_OTHER'       : 'A',
    },
    


    //
    //  WCAG 2.0 Success Criteria (i.e. requirements) National Language Support (NLS)
    //
    requirements : {
                //
                // Requirement 1.1.1 Non-text Content
                //
     '1.1.1' : {
                 label       : '1.1.1 Contenu non textuel',
                 description : 'tout contenu non-textuel présenté à l\'utilisateur a un équivalent textuel qui remplit une fonction équivalente sauf dans les situations énumérées ci-dessous. \n Composant d\'interface ou de saisie : si le contenu non textuel est un composant d\'interface ou s\'il permet la saisie d\'informations par l\'utilisateur, alors il a un nom qui décrit sa fonction. (Se référer à la Règle 4.1 pour des exigences supplémentaires à propos des composants d\'interfaces utilisateur ou des contenus qui permettent la saisie d\'informations par l\'utilisateur.) \n Média temporel : si le contenu non textuel est un média temporel, alors l\'équivalent textuel fournit au moins une identification descriptive du contenu non textuel. (Se référer à la Règle 1.2 pour des exigences supplémentaires concernant les médias temporels.) \n Test : si le contenu non textuel est un test ou un exercice qui serait invalide s\'il était présenté en texte, alors l\'équivalent textuel fournit au moins une identification descriptive du contenu non textuel. \n Contenu sensoriel : si le contenu non textuel vise d\'abord à créer une expérience sensorielle spécifique, l\'équivalent textuel fournit au moins une identification descriptive de ce contenu non textuel. \n CAPTCHA : si ce contenu non textuel vise à confirmer que le contenu est consulté par une personne plutôt que par un ordinateur, alors un équivalent textuel est fourni pour identifier et décrire la fonction du contenu non textuel, et des formes alternatives du CAPTCHA sont proposées pour différents types de perception sensorielle afin d\'accommoder différents types de limitations fonctionnelles. \n Décoration, formatage, invisibilité : si le contenu non textuel est purement décoratif, s\'il est utilisé seulement pour un formatage visuel ou s\'il n\'est pas présenté à l\'utilisateur, alors il est implémenté de manière à être ignoré par les technologies d\'assistance.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#text-equiv',
                 references  : [
                                 { type: 'RR_TYPE_BEST_PRACT', title: 'Test 3', url: 'http://test3.org'},
                                 { type: 'RR_TYPE_MANUAL', title: 'Test 4', url: 'http://test4.org'},
                                 { type: 'RR_TYPE_OTHER', title: 'Test 5', url: 'http://test5.org'},
                                 { type: 'RR_TYPE_REQUIREMENT', title: 'Test 1', url: 'http://test1.org'},
                                 { type: 'RR_TYPE_TECHNIQUE', title: 'Test 2', url: 'http://test2.org'},
                               ],
               }, 
                //
                // Requirement 1.2.1 Audio-only and Video-only (Prerecorded)
                //
     '1.2.1' : {
                 label       : '1.2.1 Contenu seulement audio ou vidéo (pré-enregistré)',
                 description : 'pour des médias pré-enregistrés seulement audio et pré-enregistrés seulement vidéo, sauf si l\'audio ou la vidéo sont un média de remplacement pour un texte et qu\'ils sont clairement identifiés comme tels : \n Contenu pré-enregistré seulement audio : fournir une version de remplacement pour un média temporel, présentant une information équivalente au contenu seulement audio. \n Contenu pré-enregistré seulement vidéo : fournir, soit une version de remplacement pour un média temporel, soit une piste audio (présentant une information équivalente) pour un contenu pré-enregistré seulement vidéo.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-av-only-alt',
                 references  : [],
               }, 
                //
                // Requirement 1.2.2 Captions (Prerecorded)
                //
     '1.2.2' : {
                 label       : '1.2.2 Sous-titres (pré-enregistrés)',
                 description : 'fournir des sous-titres pour tout contenu audio pré-enregistré dans un média synchronisé, excepté lorsque le média est un média de remplacement pour un texte et qu\'il est clairement identifié comme tel.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-captions',
                 references  : [],
               }, 
                //
                // Requirement 1.2.3 Audio Description or Media Alternative (Prerecorded)
                //
     '1.2.3' : {
                 label       : '1.2.3 Audio-description ou version de remplacement pour un média temporel (pré-enregistré)',
                 description : 'fournir une version de remplacement pour un média temporel ou une audio-description du contenu vidéo pré-enregistré pour un média synchronisé, excepté quand le média est un média de remplacement pour un texte et qu\'il est clairement identifié comme tel.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-audio-desc',
                 references  : [],
               }, 
                //
                // Requirement 1.2.4 Captions (Live)
                //
     '1.2.4' : {
                 label       : '1.2.4 Sous-titres (en direct)',
                 description : 'fournir des sous-titres pour tout contenu audio en direct, sous forme de média synchronisé.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-real-time-captions',
                 references  : [],
               }, 
                //
                // Requirement 1.2.5 Audio Description (Prerecorded)
                //
     '1.2.5' : {
                 label       : '1.2.5 Audio-description (pré-enregistrée)',
                 description : 'fournir une audio-description pour tout contenu vidéo pré-enregistré, sous forme de média synchronisé.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-audio-desc-only',
                 references  : [],
               }, 
                //
                // Requirement 1.2.6 Sign Language (Prerecorded)
                //
     '1.2.6' : {
                 label       : '1.2.6 Langue des signes (pré-enregistrée)',
                 description : 'fournir une interprétation en langue des signes pour tout contenu audio pré-enregistré, sous forme de média synchronisé.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-sign',
                 references  : [],
               }, 
                //
                // Requirement 1.2.7 Extended Audio Description (Prerecorded)
                //
     '1.2.7' : {
                 label       : '1.2.7 Audio-description étendue (pré-enregistrée)',
                 description : 'lorsque les blancs présents dans le fond sonore ne sont pas suffisants pour permettre à l\'audio-description de transmettre le sens de la vidéo, fournir une audio-description étendue pour tout contenu vidéo pré-enregistré sous la forme de média synchronisé.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-extended-ad',
                 references  : [],
               }, 
                //
                // Requirement 1.2.8 Media Alternative (Prerecorded)
                //
     '1.2.8' : {
                 label       : '1.2.8 Version de remplacement pour un média temporel (pré-enregistrée)',
                 description : 'fournir une version de remplacement pour un média temporel, pour tout contenu de type média synchronisé pré-enregistré et pour tout média pré-enregistré seulement vidéo.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-text-doc',
                 references  : [],
               }, 
                //
                // Requirement 1.2.9 Audio-only (Live)
                //
     '1.2.9' : {
                 label       : '1.2.9 Seulement audio (en direct)',
                 description : 'fournir une version de remplacement pour un média temporel, donnant une information équivalente pour un contenu seulement audio en direct.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#media-equiv-live-audio-only',
                 references  : [],
               }, 
                //
                // Requirement 1.3.1 Info and Relationships
                //
     '1.3.1' : {
                 label       : '1.3.1 Information et relations',
                 description : 'l\'information, la structure et les relations véhiculées par la présentation peuvent être déterminées par un programme informatique ou sont disponibles sous forme de texte.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#content-structure-separation-programmatic',
                 references  : [],
               }, 
                //
                // Requirement 1.3.2 Meaningful Sequence
                //
     '1.3.2' : {
                 label       : '1.3.2 Ordre séquentiel logique',
                 description : 'lorsque l\'ordre de présentation du contenu affecte sa signification, un ordre de lecture correct peut être déterminé par un programme informatique.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#content-structure-separation-sequenc',
                 references  : [],
               }, 
                //
                // Requirement 1.3.3 Sensory Characteristics
                //
     '1.3.3' : {
                 label       : '1.3.3 Caractéristiques sensorielles',
                 description : 'les instructions données pour la compréhension et l\'utilisation du contenu ne doivent pas reposer uniquement sur les caractéristiques sensorielles des éléments comme la forme, la taille, l\'emplacement visuel, l\'orientation ou le son.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#content-structure-separation-understanding',
                 references  : [],
               }, 
                //
                // Requirement 1.4.1 Use of Color
                //
     '1.4.1' : {
                 label       : '1.4.1 Utilisation de la couleur',
                 description : 'la couleur n\'est pas utilisée comme la seule façon de véhiculer de l\'information, d\'indiquer une action, de solliciter une réponse ou de distinguer un élément visuel.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast-without-color',
                 references  : [],
               }, 
                //
                // Requirement 1.4.2 Audio Control
                //
     '1.4.2' : {
                 label       : '1.4.2 Contrôle du son',
                 description : 'si du son sur une page Web est audible automatiquement pendant plus de 3 secondes, un mécanisme est disponible pour le mettre en pause, l\'arrêter ou pour en contrôler le volume de façon indépendante du niveau de volume du système général.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast-dis-audio',
                 references  : [],
               }, 
                //
                // Requirement 1.4.3 Contrast (Minimum)
                //
     '1.4.3' : {
                 label       : '1.4.3 Contraste (minimum)',
                 description : 'la présentation visuelle du texte et du texte sous forme d\'image a un rapport de contraste d\'au moins 4,5:1, sauf dans les cas suivants: \n(1) Texte agrandi : le texte agrandi et le texte agrandi sous forme d\'image ont un rapport de contraste d\'au moins 3:1;\n(2) Texte décoratif : aucune exigence de contraste pour le texte ou le texte sous forme d\'image qui fait partie d\'un composant d\'interface utilisateur inactif, qui est purement décoratif, qui est invisible pour tous ou qui est une partie d\'une image contenant un autre contenu significatif.\n(3) Logotypes : aucune exigence de contraste pour le texte faisant partie d\'un logo ou d\'un nom de marque.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast-contrast',
                 references  : [],
               }, 
                //
                // Requirement 1.4.4 Resize text
                //
     '1.4.4' : {
                 label       : '1.4.4 Redimensionnement du texte',
                 description : 'à l\'exception des sous-titres et du texte sous forme d\'image, le texte peut être redimensionné jusqu\'à 200 pour cent sans l\'aide d\'une technologie d\'assistance et sans perte de contenu ou de fonctionnalité.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast-scale',
                 references  : [],
               }, 
                //
                // Requirement 1.4.5 Images of Text
                //
     '1.4.5' : {
                 label       : '1.4.5 Texte sous forme d\'image',
                 description : 'si les technologies utilisées peuvent réaliser la présentation visuelle, du texte est utilisé pour véhiculer l\'information plutôt que du texte sous forme d\'image sauf dans les cas suivants : (1) Personnalisable : le texte sous forme d\'image peut être personnalisé visuellement selon les exigences de l\'utilisateur; (2) Essentielle : une présentation spécifique du texte est essentielle à l\'information véhiculée.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast-text-presentation',
                 references  : [],
               }, 
                //
                // Requirement 1.4.6 Contrast (Enhanced)
                //
     '1.4.6' : {
                 label       : '1.4.6 Contraste (amélioré)',
                 description : 'la présentation visuelle du texte et du texte sous forme d\'image a un rapport de contraste d\'au moins 7:1, sauf dans les cas suivants: \n(1) Texte agrandi : le texte agrandi et le texte agrandi sous forme d\'image ont un rapport de contraste d\'au moins 4,5:1;\n(2) Texte décoratif : aucune exigence de contraste pour le texte ou le texte sous forme d\'image qui fait partie d\'un composant d\'interface utilisateur inactif, qui est purement décoratif, qui est invisible pour tous ou qui est une partie d\'une image contenant un autre contenu significatif.\n(3) Logotypes : aucune exigence de contraste pour le texte faisant partie d\'un logo ou d\'un nom de marque.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast7',
                 references  : [],
               }, 
                //
                // Requirement 1.4.7 Low or No Background Audio
                //
     '1.4.7' : {
                 label       : '1.4.7 Arrière-plan sonore de faible volume ou absent',
                 description : 'pour un contenu seulement audio pré-enregistré qui (1) contient principalement de la parole au premier plan, (2) n\'est pas un CAPTCHA ou un logo sonore et (3) qui n\'est pas une vocalisation dont l\'intention est principalement d\'être musicale comme une chanson ou un rap, au moins l\'une des conditions suivantes est vraie : \n (4a) Sans arrière-plan : le contenu audio ne contient pas d\'arrière-plan sonore. \n(4b) Désactivation : l\'arrière-plan sonore peut être désactivé. \n(4c) 20 dB : l\'arrière-plan sonore est au moins 20 décibels plus faible que le contenu parlé au premier plan sauf pour certains effets sonores occasionnels durant seulement une ou deux secondes.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#isual-audio-contrast-noaudio',
                 references  : [],
               }, 
                //
                // Requirement 1.4.8 Visual Presentation
                //
     '1.4.8' : {
                 label       : '1.4.8 Présentation visuelle',
                 description : 'pour la présentation visuelle des blocs de texte, un mécanisme est disponible permettant de réaliser ce qui suit : \n (1) Les couleurs de premier plan et d\'arrière-plan peuvent être choisies par l\'utilisateur. \n(2) La largeur n\'excède pas 80 caractères ou glyphes (40 si CJK). \n (3) Le texte n\'est pas justifié (aligné simultanément à droite et à gauche). \n (4) L\'espacement entre les lignes (interlignage) est d\'une valeur d\'au moins 1,5 dans les paragraphes et l\'espacement entre les paragraphes est au moins 1,5 fois plus grand que la valeur de l\'interligne. \n (5) La taille du texte peut être redimensionnée jusqu\'à 200 pour cent sans l\'aide d\'une technologie d\'assistance et sans que l\'utilisateur soit obligé de faire défiler le texte horizontalement pour lire une ligne complète dans une fenêtre plein écran.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast-visual-presentation',
                 references  : [],
               }, 
                //
                // Requirement 1.4.9 Images of Text (No Exception)
                //
     '1.4.9' : {
                 label       : '1.4.9 Texte sour forme d\'image (sans exception)',
                 description : 'le texte sous forme d\'image est utilisé seulement pour du texte purement décoratif ou lorsqu\'une présentation spécifique du texte est essentielle à l\'information véhiculée.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast-text-images',
                 references  : [],
               }, 
                //
                // Requirement 2.1.1 Keyboard
                //
     '2.1.1' : {
                 label       : '2.1.1 Clavier',
                 description : 'toutes les fonctionnalités du contenu sont utilisables à l\'aide d\'une interface clavier sans exiger un rythme de frappe propre à l\'utilisateur, sauf lorsque la fonction sous-jacente nécessite une saisie qui dépend du tracé du mouvement effectué par l\'utilisateur et pas seulement des points de départ et d\'arrivée de ce tracé.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-keyboard-operation-keyboard-operable',
                 references  : [],
               }, 
                //
                // Requirement 2.1.2 No Keyboard Trap
                //
     '2.1.2' : {
                 label       : '2.1.2 Pas de piège au clavier',
                 description : 'si le focus du clavier peut être positionné sur un élément de la page à l\'aide d\'une interface clavier, réciproquement, il peut être déplacé hors de ce même composant simplement à l\'aide d\'une interface clavier et, si ce déplacement exige plus que l\'utilisation d\'une simple touche flèche ou tabulation ou toute autre méthode standard de sortie, l\'utilisateur est informé de la méthode permettant de déplacer le focus hors de ce composant.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-keyboard-operation-trapping',
                 references  : [],
               }, 
                //
                // Requirement 2.1.3 Keyboard (No Exception)
                //
     '2.1.3' : {
                 label       : '2.1.3 Clavier (pas d\'exception)',
                 description : 'toutes les fonctionnalités du contenu sont utilisables à l\'aide d\'une interface clavier sans exiger un rythme de frappe propre à l\'utilisateur.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-keyboard-operation-all-funcs',
                 references  : [],
               }, 
                //
                // Requirement 2.2.1 Timing Adjustable
                //
     '2.2.1' : {
                 label       : '2.2.1 Réglage du délai',
                 description : 'pour chaque limite de temps fixée par le contenu, au moins l\'un des points suivants est vrai : (1) Suppression : l\'utilisateur a la possibilité de supprimer la limite de temps avant de la rencontrer ; ou (2) Ajustement : l\'utilisateur a la possibilité d\'ajuster la limite de temps avant de la rencontrer dans un intervalle d\'au moins dix fois la durée paramétrée par défaut ; ou (3) Extension : l\'utilisateur est averti avant que la limite de temps n\'expire et il lui est accordé au moins 20 secondes pour étendre cette limite par une action simple (par exemple, « appuyer sur la barre d\'espace ») et l\'utilisateur a la possibilité d\'étendre la limite de temps au moins dix fois ; ou (4) L\'exception du temps réel : la limite de temps est une partie constitutive d\'un événement en temps réel (par exemple, une enchère) et aucune alternative n\'est possible ; ou (5) l\'exception de la limite essentielle : la limite de temps est essentielle et l\'étendre invaliderait alors l\'activité ; ou (6) L\'exception des 20 heures : la limite de temps est supérieure à 20 heures.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-time-limits-required-behaviors',
                 references  : [],
               }, 
                //
                // Requirement 2.2.2 Pause, Stop, Hide
                //
     '2.2.2' : {
                 label       : '2.2.2 Mettre en pause, arrêter, masquer',
                 description : 'pour toute information en mouvement, clignotante, défilante ou mise à jour automatiquement, tous les points suivants sont vrais :\n Déplacement, clignotement, défilement : pour toute information en mouvement, clignotante ou défilante qui (1) démarre automatiquement, (2) dure plus de cinq secondes et (3) est présentée conjointement avec un autre contenu, il y a un mécanisme à la disposition de l\'utilisateur pour la mettre en pause, l\'arrêter ou la masquer, à moins que le mouvement, le clignotement ou le défilement s\'avère un élément essentiel au bon déroulement de l\'activité; et \n Mise à jour automatique : pour toute information mise à jour automatiquement qui (1) démarre automatiquement (2) et est présentée conjointement avec un autre contenu, il y a un mécanisme à la disposition de l\'utilisateur pour la mettre en pause, l\'arrêter ou pour en contrôler la fréquence des mises à jour à moins que la mise à jour automatique s\'avère essentielle au bon déroulement de l\'activité.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-time-limits-pause',
                 references  : [],
               }, 
                //
                // Requirement 2.2.3 No Timing
                //
     '2.2.3' : {
                 label       : '2.2.3 Pas de délai d\'exécution',
                 description : 'le temps n\'est pas un facteur essentiel dans le déroulement de l\'événement ou de l\'activité, à l\'exception des médias synchronisés non interactifs et des événements en temps réel. ',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-time-limits-no-exceptions',
                 references  : [],
               }, 
                //
                // Requirement 2.2.4 Interruptions
                //
     '2.2.4' : {
                 label       : '2.2.4 Interruptions',
                 description : 'les interruptions peuvent être reportées ou supprimées par l\'utilisateur, à l\'exception des interruptions impliquant une urgence.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-time-limits-postponed',
                 references  : [],
               }, 
                //
                // Requirement 2.2.5 Re-authenticating
                //
     '2.2.5' : {
                 label       : '2.2.5 Nouvelle authentification',
                 description : 'quand une session authentifiée expire, l\'utilisateur peut poursuivre son activité sans perte de données après une nouvelle authentification.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-time-limits-server-timeout',
                 references  : [],
               }, 
                //
                // Requirement 2.3.1 Three Flashes or Below Threshold
                //
     '2.3.1' : {
                 label       : '2.3.1 Pas plus de trois flashs ou sous le seuil critique',
                 description : 'une page Web doit être exempte de tout élément qui flashe plus de trois fois dans n\'importe quel intervalle d\'une seconde ou ce flash doit se situer sous le seuil de flash générique et le seuil de flash rouge. ',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-seizure-does-not-violate',
                 references  : [],
               }, 
                //
                // Requirement 2.3.2 Three Flashes
                //
     '2.3.2' : {
                 label       : '2.3.2 Trois flashs',
                 description : 'une page Web doit être exempte de tout élément qui flashe plus de trois fois dans n\'importe quel intervalle d\'une seconde.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-seizure-three-times',
                 references  : [],
               }, 
                //
                // Requirement 2.4.1 Bypass Blocks
                //
     '2.4.1' : {
                 label       : '2.4.1 Contourner des blocs',
                 description : 'un mécanisme permet de contourner les blocs de contenu qui sont répétés sur plusieurs pages Web.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-skip',
                 references  : [],
               }, 
                //
                // Requirement 2.4.2 Page Titled
                //
     '2.4.2' : {
                 label       : '2.4.2 Titre de page',
                 description : 'les pages Web présentent un titre qui décrit leur sujet ou leur but. ',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-title',
                 references  : [],
               }, 
                //
                // Requirement 2.4.3 Focus Order
                //
     '2.4.3' : {
                 label       : '2.4.3 Parcours du focus',
                 description : 'si une page Web peut être parcourue de façon séquentielle et que les séquences de navigation affectent la signification ou l\'action, les éléments reçoivent le focus dans un ordre qui préserve la signification et l\'opérabilité.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-focus-order',
                 references  : [],
               }, 
                //
                // Requirement 2.4.4 Link Purpose (In Context)
                //
     '2.4.4' : {
                 label       : '2.4.4 Fonction du lien (selon le contexte)',
                 description : 'la fonction de chaque lien est déterminée par le texte du lien seul ou par le texte du lien associé à un contexte du lien déterminé par un programme informatique, sauf si la fonction du lien est ambiguë pour tout utilisateur. ',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-refs',
                 references  : [],
               }, 
                //
                // Requirement 2.4.5 Multiple Ways
                //
     '2.4.5' : {
                 label       : '2.4.5 Accès multiples',
                 description : 'une page Web peut être située par plus d\'un moyen dans un ensemble de pages Web sauf si cette page est le résultat ou une étape d\'un processus.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-mult-loc',
                 references  : [],
               }, 
                //
                // Requirement 2.4.6 Headings and Labels
                //
     '2.4.6' : {
                 label       : '2.4.6 En-têtes et étiquettes',
                 description : 'les en-têtes et les étiquettes décrivent le sujet ou le but.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-descriptive',
                 references  : [],
               }, 
                //
                // Requirement 2.4.7 Focus Visible
                //
     '2.4.7' : {
                 label       : '2.4.7 Visibilité du focus',
                 description : 'toute interface utilisable au clavier comporte un mode de fonctionnement où le focus est visible.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#navigation-mechanisms-focus-visible',
                 references  : [],
               }, 
                //
                // Requirement 2.4.8 Location
                //
     '2.4.8' : {
                 label       : '2.4.8 Localisation',
                 description : 'l\'utilisateur dispose d\'informations pour se situer dans un ensemble de pages Web.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-location',
                 references  : [],
               }, 
                //
                // Requirement 2.4.9 Link Purpose (Link Only)
                //
     '2.4.9' : {
                 label       : '2.4.9 Fonction du lien (lien uniquement)',
                 description : 'un mécanisme permet de déterminer la fonction de chaque lien par le texte du lien uniquement, sauf si la fonction du lien est ambiguë pour tout utilisateur.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-link',
                 references  : [],
               }, 
                //
                // Requirement 2.4.10 Section Headings
                //
     '2.4.10' : {
                 label       : '2.4.10 En-tête de section',
                 description : 'les en-têtes de section sont utilisés pour organiser le contenu.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-navigation-mechanisms-headings',
                 references  : [],
               }, 
                //
                // Requirement 3.1.1 Language of Page
                //
     '3.1.1' : {
                 label       : '3.1.1 Langue de la page',
                 description : 'la langue par défaut de chaque page Web peut être déterminée par un programme informatique.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-meaning-doc-lang-id',
                 references  : [],
               }, 
                //
                // Requirement 3.1.2 Language of Parts
                //
     '3.1.2' : {
                 label       : '3.1.2 Langue d\'un passage',
                 description : 'la langue de chaque passage ou expression du contenu peut être déterminée par un programme informatique sauf pour un nom propre, pour un terme technique, pour un mot dont la langue est indéterminée ou pour un mot ou une expression faisant partie du langage courant de la langue utilisée dans le contexte immédiat.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-meaning-other-lang-id',
                 references  : [],
               }, 
                //
                // Requirement 3.1.3 Unusual Words
                //
     '3.1.3' : {
                 label       : '3.1.3 Mots rares',
                 description : 'un mécanisme est disponible pour identifier la définition spécifique des mots ou expressions utilisés de manière inhabituelle ou de façon limitée, y compris les expressions idiomatiques et le jargon.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-meaning-idioms',
                 references  : [],
               }, 
                //
                // Requirement 3.1.4 Abbreviations
                //
     '3.1.4' : {
                 label       : '3.1.4 Abréviations',
                 description : 'un mécanisme est disponible pour identifier la forme complète ou la signification d\'une abréviation.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-meaning-located',
                 references  : [],
               }, 
                //
                // Requirement 3.1.5 Reading Level
                //
     '3.1.5' : {
                 label       : '3.1.5 Niveau de lecture',
                 description : 'lorsqu\'un texte nécessite une capacité de lecture plus avancée que le premier cycle de l\'enseignement secondaire, après la suppression des noms propres et des titres, un contenu additionnel ou une version qui ne requiert pas de capacité de lecture supérieure au premier cycle de l\'enseignement secondaire est disponible.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-meaning-supplements',
                 references  : [],
               }, 
                //
                // Requirement 3.1.6 Pronunciation
                //
     '3.1.6' : {
                 label       : '3.1.6 Prononciation',
                 description : 'un mécanisme permet d\'identifier la prononciation spécifique des mots dont la signification est ambiguë dans le contexte si leur prononciation n\'est pas connue.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-meaning-pronunciation',
                 references  : [],
               }, 
                //
                // Requirement 3.2.1 On Focus
                //
     '3.2.1' : {
                 label       : '3.2.1 Au focus',
                 description : 'quand un composant reçoit le focus, il ne doit pas initier de changement de contexte.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-consistent-behavior-receive-focus',
                 references  : [],
               }, 
                //
                // Requirement 3.2.2 On Input
                //
     '3.2.2' : {
                 label       : '3.2.2 À la saisie',
                 description : 'le changement de paramètre d\'un composant d\'interface utilisateur ne doit pas initier de changement de contexte à moins que l\'utilisateur n\'ait été avisé de ce comportement avant d\'utiliser le composant.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-consistent-behavior-unpredictable-change',
                 references  : [],
               }, 
                //
                // Requirement 3.2.3 Consistent Navigation
                //
     '3.2.3' : {
                 label       : '3.2.3 Navigation cohérente',
                 description : 'dans un ensemble de pages, les mécanismes de navigation qui se répètent sur plusieurs pages Web se présentent dans le même ordre relatif chaque fois qu\'ils sont répétés, à moins qu\'un changement soit initié par l\'utilisateur.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-consistent-behavior-consistent-locations',
                 references  : [],
               }, 
                //
                // Requirement 3.2.4 Consistent Identification
                //
     '3.2.4' : {
                 label       : '3.2.4 Identification cohérente',
                 description : 'dans un ensemble de pages Web les composants qui ont la même fonctionnalité sont identifiés de la même façon.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-consistent-behavior-consistent-functionality',
                 references  : [],
               }, 
                //
                // Requirement 3.2.5 Change on Request
                //
     '3.2.5' : {
                 label       : '3.2.5 Changement à la demande',
                 description : 'un changement de contexte est initié uniquement sur demande de l\'utilisateur ou un mécanisme est disponible pour désactiver un tel changement.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-consistent-behavior-no-extreme-changes-context',
                 references  : [],
               }, 
                //
                // Requirement 3.3.1 Error Identification
                //
     '3.3.1' : {
                 label       : '3.3.1 Identification des erreurs',
                 description : 'si une erreur de saisie est détectée automatiquement, l\'élément en erreur est identifié et l\'erreur est décrite à l\'utilisateur sous forme de texte. ',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-minimize-error-identified',
                 references  : [],
               }, 
                //
                // Requirement 3.3.2 Labels or Instructions
                //
     '3.3.2' : {
                 label       : '3.3.2 Étiquettes ou instructions',
                 description : 'des étiquettes sont présentées ou des instructions sont fournies quand un contenu requiert une saisie utilisateur.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-minimize-error-cues',
                 references  : [],
               }, 
                //
                // Requirement 3.3.3 Error Suggestion
                //
     '3.3.3' : {
                 label       : '3.3.3 Suggestion après une erreur',
                 description : 'si une erreur de saisie est automatiquement détectée et que des suggestions de corrections sont connues, ces suggestions sont alors proposées à l\'utilisateur à moins que cela puisse compromettre la sécurité ou la finalité du contenu. ',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-minimize-error-suggestions',
                 references  : [],
               }, 
                //
                // Requirement 3.3.4 Error Prevention (Legal, Financial, Data)
                //
     '3.3.4' : {
                 label       : '3.3.4 Prévention des erreurs (juridiques, financières, de données)',
                 description : 'pour les pages Web qui entraînent des engagements juridiques ou des transactions financières de la part de l\'utilisateur, qui modifient ou effacent des données contrôlables par l\'utilisateur dans des systèmes de stockages de données, qui enregistrent les réponses de l\'utilisateur à un test ou un examen, au moins l\'une des conditions suivantes est vraie :\n (1) Réversible : les actions d\'envoi sont réversibles. \n (2) Vérifiée : les données saisies par l\'utilisateur sont vérifiées au niveau des erreurs de saisie et la possibilité est donnée à l\'utilisateur de les corriger. \n (3) Confirmée : un mécanisme est disponible pour revoir, confirmer et corriger les informations avant leur soumission finale.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-minimize-error-reversible',
                 references  : [],
               }, 
                //
                // Requirement 3.3.5 Help
                //
     '3.3.5' : {
                 label       : '3.3.5 Aide',
                 description : 'une aide contextuelle est disponible.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-minimize-error-context-help',
                 references  : [],
               }, 
                //
                // Requirement 3.3.6 Error Prevention (All)
                //
     '3.3.6' : {
                 label       : '3.3.6 Prévention des erreurs (toutes)',
                 description : 'pour des pages Web demandant à l\'utilisateur de soumettre des informations, au moins l\'une des conditions suivantes est vraie : \n (1) Réversible : les actions d\'envoi sont réversibles. \n (2) Vérifiée : les données saisies par l\'utilisateur sont vérifiées au niveau des erreurs de saisie et la possibilité est donnée à l\'utilisateur de les corriger. \n (3) Confirmée : un mécanisme est disponible pour revoir, confirmer et corriger les informations avant leur soumission finale.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-minimize-error-reversible-all',
                 references  : [],
               }, 
                //
                // Requirement 4.1.1 Parsing Content
                //
     '4.1.1' : {
                 label       : '4.1.1 Analyse syntaxique',
                 description : 'à moins que les spécifications ne le permettent, dans un contenu implémenté via un langage de balisage, les éléments ont des balises de début et de fin complètes, ils sont imbriqués conformément à leurs spécifications, ils ne contiennent pas d\'attributs dupliqués et chaque ID est unique.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-ensure-compat-parses',
                 references  : [],
               }, 
                //
                // Requirement 4.1.2 Name, Role, Value
                //
     '4.1.2' : {
                 label       : '4.1.2 Nom, rôle et valeur',
                 description : 'pour tout composant d\'interface utilisateur (comprenant mais n\'étant pas limité aux éléments de formulaire, liens et composants générés par des scripts), le nom et le rôle peuvent être déterminés par un programme informatique ; les états, les propriétés et les valeurs qui peuvent être paramétrés par l\'utilisateur peuvent être définis par programmation ; et la notification des changements de ces éléments est disponible aux agents utilisateurs, incluant les technologies d\'assistance.',
                 url         : 'http://www.w3.org/Translations/WCAG20-fr/#qr-ensure-compat-rsv',
                 references  : [],
               }, 
     },  // end requirements


    //
    //  OAA Rules title and mesage string National Language Support (NLS)
    //
    rules : {
      'MESSAGE_1' : {
                       message: 'Règle 1 Les images doivent posséder un attribut (alt).' ,
                       title:   'Règle 1 Les images doivent posséder un attribut (alt).' ,
		     },  
      'MESSAGE_2' : {
                       message: 'Règle 2 Le nom du fichier ne doit pas être utilisé comme alternative à l\'image.' ,
                       title:   'Règle 2 Le nom du fichier image n\'est pas une alternative pertinente.' ,
		     },  
      'MESSAGE_3' : {
                       message: 'Règle 3 Les alternatives (alt) contenant les mots image, graphique ou photo ne sont pas des alternatives perninentes.' ,
                       title:   'Règle 3 Certains mots ne doivent pas être employés pour constituer une alternative pertinente' ,
		     },  
      'MESSAGE_4' : {
                       message: 'Règle 4 Assurez vous que le nombre de caractères de l\'alternative (alt) est >= alt_min_length et <= alt_max_length.' ,
                       title:   'Règle 4 Longueur de l\'alternative (alt).' ,
		     },  
      'MESSAGE_5' : {
                       message: 'Règle 5 La déclaration de la description longue (longdesc) doit pointer vers une ressource correcte (ex: un fichier .html).' ,
                       title:   'Règle 5 Le longdesc doit pointer vers une URI valide.' ,
		     },  
      'MESSAGE_6' : {
                       message: 'Règle 6 Si une image a un attribut alt ou title, elle ne doit pas avoir d\'attribut role="presentation".' ,
                       title:   'Règle 6 Si une image a un attribut alt ou title, elle ne doit pas avoir d\'attribut role="presentation".' ,
		     },  
      'MESSAGE_7' : {
                       message: 'Règle 7 Les tableaux de données doivent avoir un résumé (summary) pour décrire leur contenu ou donner les conclusions que l\'auteur voudrait que le lecteur fasse de la lecture du tableau de données.' ,
                       title:   'Règle 7 Les tableaux de données doivent avoir un résumé (summary).' ,
		     },  
      'MESSAGE_8' : {
                       message: 'Règle 8 Les tableaux de données doivent utiliser la balise th pour indiquer la première cellule d\'en-tête de chaque ligne ou colonne.' ,
                       title:   'Règle 8 Les tableaux de données doivent avoir des en-têtes (th)' ,
		     },  
      'MESSAGE_9' : {
                       message: 'Règle 9 Pour chaque tableau de données dans la page, le résumé (summary) doit être unique.' ,
                       title:   'Règle 9 Le résumé (summary) doit être unique.' ,
		     },  
      'MESSAGE_10' : {
                       message: 'Règle 10 Pour les tableaux de données complexes, les en-têtes (th) doivent être identifiés (id).' ,
                       title:   'Règle 10 Les tableaux de données complexes doivent avoir des id sur les th.' ,
		     },  
      'MESSAGE_11' : {
                       message: 'Règle 11 Pour les tableaux de données complexes, l\'identité (id) des en-têtes (th) doit être unique. ID (%1$S) n\'est pas unique.' ,
                       title:   'Règle 11 Pour les tableaux de données complexes l\'identité (id) des en-têtes (th) doit être unique.' ,
		     },  
      'MESSAGE_12' : {
                       message: 'Règle 12 Pour les tableaux de données complexes, les cellules (td) doivent être associées aux en-têtes (th) qui s\'y rapportent par le biais de l\'attribut headers. Le contenu de cet attribut correspond au contenu des attributs id des en-têtes associées.' ,
                       title:   'Règle 12 Les cellules (td) des tableaux de données complexes doivent avoir un attribut headers.' ,
		     },  
      'MESSAGE_13' : {
                       message: 'Règle 13 Pour les tableaux de données complexes, les attribut id (%1$S), referencés par les attribut headers des cellules (td), doivent exister dans la page.' ,
                       title:   'Règle 13 Les attribut id référencés pour les attributs headers doivent exister dans la page.' ,
		     },  
      'MESSAGE_14' : {
                       message: 'Règle 14 Les tableaux imbriqués ne doivent pas être utilisés pour mettre en forme le contenu, utilisez plutôt les styles (css)' ,
                       title:   'Règle 14 N\'utilisez pas de tableaux imbriqués pour la mise en forme.' ,
		     },  
      'MESSAGE_15' : {
                       message: 'Règle 15 Le rapport de contraste de couleur entre l\'avant et l\'arrière plan doit être >= 3 pour le grand texte.' ,
                       title:   'Règle 15 Le rapport de contraste de couleur doit être  >= 3 pour le grand texte.' ,
		     },  
      'MESSAGE_16' : {
                       message: 'Règle 16 Le rapport de contraste de couleur entre l\'avant et l\'arrière plan doit être >= 4,5 pour le texte.' ,
                       title:   'Règle 16 Le rapport de contraste de couleur doit être >= 4,5 pour le texte.' ,
		     },  
      'MESSAGE_17' : {
                       message: 'Règle 17 N\'utilisez pas l\'élément font pour mettre en forme le texte.' ,
                       title:   'Règle 17 N\'utilisez pas l\'élément font pour mettre en forme le texte.' ,
		     },  
      'MESSAGE_18' : {
                       message: 'Règle 18 Chaque élément déclenchant une action par un attribut onmouseoever et pouvant recevoir le focus clavier doit également avoir un attribut onfocus déclenchant une action similaire.' ,
                       title:   'Règle 18 Les éléments pouvant recevoir le focus clavier avec un attribut onmouseover doivent également avoir un attribut onfocus.' ,
		     },  
      'MESSAGE_19' : {
                       message: 'Règle 19 Chaque élément déclenchant une action par un attribut onmouseout et pouvant recevoir le focus clavier doit également avoir un attribut onblur déclenchant une action similaire.' ,
                       title:   'Règle 19 Les éléments pouvant recevoir le focus clavier avec un attribut onmouseout doivent également avoir un attribut onblur.' ,
		     },  
      'MESSAGE_20' : {
                       message: 'Règle 20 Les gestionnaires d\'événement onclick doivent être utilisés sur des éléments pouvant recevoir le focus clavier.' ,
                       title:   'Règle 20 Les gestionnaires d\'événement onclick doivent être utilisés sur des éléments pouvant recevoir le focus clavier.' ,
		     },  
      'MESSAGE_21' : {
                       message: 'Règle 21 Le gestionnaire d\'événement onchange ne doit pas être utilisé avec un élément select pour déclencher un rechargement de page ou un déplacement du focus clavier.' ,
                       title:   'Règle 21 Le gestionnaire d\'événement onchange ne doit pas être utilisé avec un élément select.' ,
		     },  
      'MESSAGE_22' : {
                       message: 'Règle 22 Les fonctionnalités mises à disposition par le biais des gestionnaires d\'événement onmousedown, onmouseup et onmousemove doivent également être activables au clavier.' ,
                       title:   'Règle 22 Les gestionnaires d\'événement onmousedown, onmouseup et onmousemove doivent avoir leur équivalent clavier.' ,
		     },  
      'MESSAGE_23' : {
                       message: 'Règle 23 La valeur des attributs accesskey doit être unique.' ,
                       title:   'Règle 23 La valeur des attributs accesskey doit être unique.' ,
		     },  
      'MESSAGE_24' : {
                       message: 'Règle 24 La valeurs des attribut accesskey ne doit pas interférer avec les raccourcis clavier de Microsoft Internet Explorer. Les raccourcis clavier pour la version anglaise d\'Internet Explorer 7 sont: A, E, F, H, T et V.' ,
                       title:   'Règle 24 La valeurs des attribut accesskey ne doit pas interférer avec les raccourcis clavier de Microsoft Internet Explorer. ' ,
		     },  
      'MESSAGE_25' : {
                       message: 'Règle 25 Les éléments blink et marquee ne doivent pas être utilisés. Le texte clignotant et mouvant peut être problématique pour les personnes ayant un handicap visuel,cognitif ou susceptible d\'avoir des crises d\'epilepsie.' ,
                       title:   'Règle 25 Les éléments blink et marquee ne doivent pas être utilisés. ' ,
		     },  
      'MESSAGE_26' : {
                       message: 'Règle 26 Tous les éléments frame doivent avoir un attribut title dont le contenu permet de décrire le contenu du cadre.' ,
                       title:   'Règle 26 Les éléments frame doivent avoir un attribut title.' ,
		     },  
      'MESSAGE_27' : {
                       message: 'Règle 27 Le contenu de l\'attribut title de chaque frame dans un frameset doit être unique.' ,
                       title:   'Règle 27 Le contenu de l\'attribut title de chaque frame doit être unique.' ,
		     },  
      'MESSAGE_28' : {
                       message: 'Règle 28 Les frames cachées ou vides ne doivent pas être utilisées.' ,
                       title:   'Règle 28 Les frames cachées ou vides ne doivent pas être utilisées.' ,
		     },  
      'MESSAGE_29' : {
                       message: 'Règle 29 La page doit contenir un élément title et celui-ci ne doit pas être vide.' ,
                       title:   'Règle 29 L\'élément title ne doit pas être vide.' ,
		     },  
      'MESSAGE_30' : {
                       message: 'Règle 30 L\'élément h1 est manquant ou vide.' ,
                       title:   'Règle 30 L\'élément h1 est manquant ou vide.' ,
		     },  
      'MESSAGE_31' : {
                       message: 'Règle 31 Le contenu textuel d\'un élément h1 ne devrait pas provenir uniquement du contenu de l\'attribut alt d\'une image.' ,
                       title:   'Règle 31 Le contenu d\'un élément h1 ne devrait pas provenir uniquement l\'attribut alt d\'une image.' ,
		     },  
      'MESSAGE_32' : {
                       message: 'Règle 32 Une partie des mots utilisés dans les éléments h1 devraient figurer également dans l\'élément title. Les mots (%1$S) dans les éléments h1 devraient aussi être dans l\'élément title.' ,
                       title:   'Règle 32 Le h1 devrait contenir un sous ensemble des mots présents dans l\'élément title.' ,
		     },  
      'MESSAGE_33' : {
                       message: 'Règle 33 La page ne devrait pas contenir plus de deux éléments h1.' ,
                       title:   'Règle 33 Pas plus de deux h1.' ,
		     },  
      'MESSAGE_34' : {
                       message: 'Règle 34 Evitez d\'utiliser des liens textuels faisant moins de quatre caractères.' ,
                       title:   'Règle 34 Les liens textuels devraient contenir au moins quatre caractères.' ,
		     },  
      'MESSAGE_35' : {
                       message: 'Règle 35 Assurez vous que les liens qui mènent à la même page utilisent le même intitulé.' ,
                       title:   'Règle 35 Les liens avec la même destination devraient avoir le même intitulé.' ,
		     },  
      'MESSAGE_36' : {
                       message: 'Règle 36 Assurez vous que les liens qui mènent à des pages différentes ont un intitulé différent.' ,
                       title:   'Règle 36 Les liens avec une destination différente devraient avoir un intitulé différent.' ,
		     },  
      'MESSAGE_37' : {
                       message: 'Règle 37 Évitez d\'utiliser des images de moins de 16 pixels par 16 pixels comme lien.' ,
                       title:   'Règle 37 Les images liens devraient faire au moins 16 pixels par 16 pixels.' ,
		     },  
      'MESSAGE_38' : {
                       message: 'Règle 38 Si un lien contient un élément img et du texte et que le contenu de l\'attribut alt de l\'image est identique au texte, alors le contenu de l\'attribut alt devrait être vide.' ,
                       title:   'Règle 38 Pour les liens composites (image+texte), l\'attribut alt doit être vide ou différent du texte.' ,
		     },  
      'MESSAGE_39' : {
                       message: 'Règle 39 Chaque élément d\'en-tête (h1,...,h6) doit contenir du texte.' ,
                       title:   'Règle 39 Les en-têtes doivent contenir du texte.' ,
		     },  
      'MESSAGE_40' : {
                       message: 'Règle 40 Chaque en-tête (h2,...,h6) devrait avoir un contenu textuel autre que le contenu textuel provenant de l\'attribut alt d\'image éventuellement contenu dans les en-têtes.' ,
                       title:   'Règle 40 Le contenu textuel d\'une en-tête ne doit pas provenir uniquement du contenu de l\'attribut alt d\'une image.' ,
		     },  
      'MESSAGE_41' : {
                       message: 'Règle 41 Le contenu des en-têtes devrait être concis (généralement 65 caractères ou moins).' ,
                       title:   'Règle 41 Le contenu des en-têtes devrait être concis.' ,
		     },  
      'MESSAGE_42' : {
                       message: 'Règle 42 Les en-têtes qui suivent le dernier h1 doivent être correctement hiérarchisées.' ,
                       title:   'Règle 42 Les en-têtes doivent être correctement hiérarchisées.' ,
		     },  
      'MESSAGE_43' : {
                       message: 'Règle 43 Le contenu des en-têtes d\'un même niveau dans une même section doit être différent.' ,
                       title:   'Règle 43 Le contenu des en-têtes d\'un même niveau dans une même section doit être différent.' ,
		     },  
      'MESSAGE_44' : {
                       message: 'Règle 44 Les éléments d\'entêtes (h1,...,h6) doivent être utilisés pour structurer l\'information sur la page.' ,
                       title:   'Règle 44 Les éléments d\'entêtes (h1,...,h6) doivent être utilisés pour structurer l\'information sur la page.' ,
		     },  
      'MESSAGE_45' : {
                       message: 'Règle 45 Chaque page doit avoir un attribut lang déclaré sur l\'élément html.' ,
                       title:   'Règle 45 Chaque page doit avoir un attribut lang déclaré sur l\'élément html.' ,
		     },  
      'MESSAGE_46' : {
                       message: 'Règle 46 L\'attribut lang sur l\'élément html doit contenir un code de langue valide d\'au moins deux caractères.' ,
                       title:   'Règle 46 L\'attribut lang sur l\'élément html doit contenir un code de langue valide d\'au moins deux caractères.' ,
		     },  
      'MESSAGE_47' : {
                       message: 'Règle 47 Chaque élément fieldset doit contenir un élément legend.' ,
                       title:   'Règle 47 Chaque élément fieldset doit contenir un élément legend.' ,
		     },  
      'MESSAGE_48' : {
                       message: 'Règle 48 L\'élément label ne doit pas encapsuler les éléments select et textarea.' ,
                       title:   'Règle 48 L\'élément label ne doit pas encapsuler les éléments select et textarea.' ,
		     },  
      'MESSAGE_49' : {
                       message: 'Règle 49 Chaque élément input de type-text | password | checkbox | radio | file et chaque élément select et textarea doit être associé à un élément label dont l\'attribut for fait référence à l\'attribut id du champ ou avoir un attribut title.' ,
                       title:   'Règle 49 Chaque élément input de type=text | password | checkbox | radio | file et chaque élément select et textarea doit être associé à un élément label dont l\'attribut for fait référence à l\'attribut id du champ ou avoir un attribut title.' ,
		     },  
      'MESSAGE_50' : {
                       message: 'Règle 50 L\'élément input de type=[image] doit avoir un attribut alt ou un attribut title.' ,
                       title:   'Règle 50 L\'élément input de type=[image] doit avoir un attribut alt ou un attribut title.' ,
		     },  
      'MESSAGE_51' : {
                       message: 'Règle 51 Les éléments input de type=[button|submit|reset] doivent avoir un attribut title ou value renseigné.' ,
                       title:   'Règle 51 Les éléments input de type=[button|submit|reset] doivent avoir un attribut title ou value renseigné.' ,
		     },  
      'MESSAGE_52' : {
                       message: 'Règle 52 Chaque élément button doit avoir du contenu.' ,
                       title:   'Règle 52 Chaque élément button doit avoir du contenu.' ,
		     },  
      'MESSAGE_53' : {
                       message: 'Règle 53 Chaque label effectif devrait être unique.' ,
                       title:   'Règle 53 Chaque label effectif devrait être unique.' ,
		     },  
      'MESSAGE_54' : {
                       message: 'Règle 54 Chaque élément label doit contenir du texte.' ,
                       title:   'Règle 54 Chaque élément label doit contenir du texte.' ,
		     },  
      'MESSAGE_55' : {
                       message: 'Règle 55 Chaque élément legend doit contenir du texte.' ,
                       title:   'Règle 55 Chaque élément legend doit contenir du texte.' ,
		     },  
      'MESSAGE_56' : {
                       message: 'Règle 56 Si un attribut title est utilisé sur les éléments input, select, textarea ou button, celui-ci ne doit pas être vide car son contenu est restitué par les aides techniques comme étiquettes des éléments de formulaire.' ,
                       title:   'Règle 56 L\'attribut title utilisé sur les éléments de formulaire ne doit pas être vide.' ,
		     },  
      'MESSAGE_57' : {
                       message: 'Règle 57 L\'ID (%1$S) n\'est pas unique. Lorsque un élément de formulaire a un attribut id, sa valeur doit être unique dans la page.' ,
                       title:   'Règle 57 Les éléments de formulaire doivent avoir des id uniques.' ,
		     },  
      'MESSAGE_58' : {
                       message: 'Règle 58 N\'utilisez pas l\'élément B pour mettre en forme du texte.' ,
                       title:   'Règle 58 N\'utilisez pas l\'élément B.' ,
		     },  
      'MESSAGE_59' : {
                       message: 'Règle 59 N\'utilisez pas l\'élément I pour mettre en forme du texte.' ,
                       title:   'Règle 59 N\'utilisez pas l\'élément I.' ,
		     },  
      'MESSAGE_60' : {
                       message: 'Règle 60 N\'utilisez pas l\'élément U pour mettre en forme du texte.' ,
                       title:   'Règle 60 N\'utilisez pas l\'élément U.' ,
		     },  
      'MESSAGE_61' : {
                       message: 'Règle 61 Le contenu de l\'attribut title devrait être court (généralement 60 caractères ou moins).' ,
                       title:   'Règle 61 Le contenu de l\'attribut title devrait être court.' ,
		     },  
      'MESSAGE_62' : {
                       message: 'Règle 62 L\'élément title doit contenir plus d\'un mot.' ,
                       title:   'Règle 62 L\'élément title doit contenir plus d\'un mot.' ,
		     },  
      'MESSAGE_63' : {
                       message: 'Règle 63 La propriété ARIA %1$S ne peut pas être utilisée avec l\'attribut role=%2$S.' ,
                       title:   'Règle 63 Vérifiez que pour les rôles ARIA que vous utilisez, les propriétés et états ARIA sont valides' ,
		     },  
      'MESSAGE_64' : {
                       message: 'Règle 64 L\'attribut %1$S doit utiliser la valeur prédéterminée %2$S.' ,
                       title:   'Règle 64 Les attributs ARIA doivent avoir des valeurs valides.' ,
		     },  
      'MESSAGE_65' : {
                       message: 'Règle 65 L\'attribut %1$S doit utiliser la valeur prédéterminée %2$S.' ,
                       title:   'Règle 65 Les attributs ARIA faisant référence à des attributs ID doivent utiliser des références valides.' ,
		     },  
      'MESSAGE_66' : {
                       message: 'Règle 66 %1$S n\'est pas un état ou une propriété globale, elle ne peut être utilisée qu\'avec certains rôles.' ,
                       title:   'Règle 66 Les attributs ARIA ne peuvent être utilisés qu\'avec certains rôles.' ,
		     },  
      'MESSAGE_67' : {
                       message: 'Règle 67 Le rôle %1$S doit contenir le rôle %2$S.' ,
                       title:   'Règle 67 Les rôles doivent contenir leurs rôles enfants respectifs.' ,
		     },  
      'MESSAGE_68' : {
                       message: 'Règle 68 Le rôle %1$S doit être contenu dans un élément avec le rôle %2$S.' ,
                       title:   'Règle 68 Les rôles enfants doivent être contenus dans un rôle parent correct.' ,
		     },  
      'MESSAGE_69' : {
                       message: 'Règle 69 Le rôle %1$S doit avoir la propriété %2$S.' ,
                       title:   'Règle 69 Les propriétés et états obligatoires doivent être définis.' ,
		     },  
      'MESSAGE_70' : {
                       message: 'Règle 70 Le rôle %1$S doit avoir la propriété %2$S.' ,
                       title:   'Règle 70 Les propriétés et états obligatoires ne doivent pas être vide.' ,
		     },  
      'MESSAGE_71' : {
                       message: 'Règle 71 La valeur %1$S n\'est pas une valeur de rôle correct.' ,
                       title:   'Règle 71 Les valeurs de rôles doivent être correctes.' ,
		     },  
      'MESSAGE_72' : {
                       message: 'Règle 72 L\'attribut %1$S n\'est pas un attribut ARIA valide.' ,
                       title:   'Règle 72 Vérifiez que les attributs ARIA sont des propriétés ou des états valides.' ,
		     },  
      'MESSAGE_73' : {
                       message: 'Règle 73 Un élément qui n\'est ni un élément de formulaire (ex: input, button, select et textarea) ni un élément de lien (a) possède un gestionnaire d\'événement onKeyXXX, onMouseXXX ou onClick sans avoir de rôle ARIA ou de rôle ARIA valide.' ,
                       title:   'Règle 73 Vérifiez que les éléments avec des gestionnaires d\'événement qui ne sont ni des éléments de formulaire (ex: input, button, select et textarea) ni des élément de lien (a) ont des rôles ARIA correct.' ,
		     },  
      'MESSAGE_74' : {
                       message: 'Règle 74 Un élément qui possède un gestionnaire d\'événement onMouseXXX event et un attribut ACTIVE-DESCENDANT, doit avoir un gestionnaire d\'événement onKeyDown ou onKeyPress.' ,
                       title:   'Règle 74 Vérifiez que les éléments avec des gestionnaires d\'événement souris ont également des gestionnaires d\'événement clavier.' ,
		     },  
      'MESSAGE_75' : {
                       message: 'Règle 75 Un élément qui possède un attribut ACTIVE-DESCENDANT et qui n\'est pas désactivé (ex: aria-disabled=false) doit avoir une valeur de l\'attribut tabindex supérieure ou égale à 0.' ,
                       title:   'Règle 75 Vérifiez que les éléments actifs avec un attribut ACTIVE-DESCENDANT ont un attribut tabindex valide.' ,
		     },  
      'MESSAGE_76' : {
                       message: 'Règle 76 Un élément avec un attribut role de type conteneur qui n\'est pas désactivé (ex: aria-disabled=false) et qui n\'a aucun attribut ACTIVE-DESCENDANT défini doit avoir au minimum un élément enfant avec un attribut tabindex dont la valeur est supérieure ou égale à 0.' ,
                       title:   'Règle 76 Vérifiez que les éléments avec un role de type conteneur, sans \'aria-activedescendant\' ont un enfant pouvant recevoir le focus clavier ' ,
		     },  
      'MESSAGE_77' : {
                       message: 'Règle 77 Les widgets qui ne sont pas désactivés et qui n\'ont pas d\'attribut \'aria-activedescendant\', doivent avoir au minimum un gestionnaire d\'événement clavier ou contenir un élément avec un rôle d\'enfant.' ,
                       title:   'Règle 77 Vérifiez que les éléments sans \'aria-activedescendant\' qui ont un rôle nécessistant un conteneur ont un gestionnaire d\'événement clavier.' ,
		     },  
      'MESSAGE_78' : {
                       message: 'Règle 78 Les images porteuses d\'informations doivent avoir une alternative pertinente restituant cette information.' ,
                       title:   'Règle 78 L\'alternative (alt) doit donner le contenu ou la fonction de l\'image.' ,
		     },  
      'MESSAGE_79' : {
                       message: 'Règle 79 Si un élément object, embed, applet ou audio est utilisé pour restituer un son pré-enregistré, vérifiez qu\'une retranscription textuelle du son est présente ou accessible depuis la page.' ,
                       title:   'Règle 79 Les sons pré-enregistrés sans vidéo ou image nécessitent une retranscription textuelle restituant l\'ensemble des informations contenus dans les sons.' ,
		     },  
      'MESSAGE_80' : {
                       message: 'Règle 80 Si un élément object, embed, applet ou audio est utilisé pour restituer une vidéo pré-enregistrée (sans son), vérifiez qu\'une retranscription textuelle ou une audiodescription de la vidéo est présente ou accessible depuis la page.' ,
                       title:   'Règle 80 Les vidéos pré-enregistrées sans son nécessitent une retranscription textuelle ou une audiodescription restituant l\'ensemble des informations contenus dans les vidéos.' ,
		     },  
      'MESSAGE_81' : {
                       message: 'Règle 81 Si un élément object, embed, applet ou audio est utilisé pour restituer une vidéo pré-enregistrée, vérifiez que des sous-titres synchronisés sont disponibles pour la vidéo.' ,
                       title:   'Règle 81 Les vidéos pré-enregistrées nécessitent des sous-titres synchronisés.' ,
		     },  
      'MESSAGE_82' : {
                       message: 'Règle 82 Si un élément object, embed, applet ou audio est utilisé pour restituer une vidéo pré-enregistrée, vérifiez qu\'une retranscription textuelle ou une audiodescription de la vidéo est présente ou accessible depuis la page.' ,
                       title:   'Règle 82 Les vidéos pré-enregistrées nécessitent une retranscription textuelle ou une audiodescription restituant l\'ensemble des informations contenus dans les vidéos.' ,
		     },  
      'MESSAGE_83' : {
                       message: 'Règle 83 Si un élément object, embed, applet ou audio est utilisé pour restituer du son en direct, des sous-titres synchronisés doivent être présents.' ,
                       title:   'Règle 83 Les sons en direct nécessitent du sous-titrage en direct.' ,
		     },  
      'MESSAGE_84' : {
                       message: 'Règle 84 Si un élément object, embed, applet ou audio est utilisé pour restituer une vidéo pré-enregistrée, une audiodescription de la vidéo doit être présente ou accessible depuis la page.' ,
                       title:   'Règle 84 Audiodescription synchronisée des vidéos.' ,
		     },  
      'MESSAGE_85' : {
                       message: 'Règle 85 Si un élément object, embed, applet ou audio est utilisé pour restituer des sons, une version du contenu en langue des signes doit être présente ou accessible depuis la page.' ,
                       title:   'Règle 85 Version en langue des signes pour les sons.' ,
		     },  
      'MESSAGE_86' : {
                       message: 'Règle 86 Si un élément object, embed, applet ou audio est utilisé pour restituer une vidéo dont la bande sonore ne présente pas suffisamment de blancs sonores pour que la vidéo soit audiodécrite, une version avec audiodescription étendue doit être présente ou accessible depuis la page.' ,
                       title:   'Règle 86 Audiodescription étendue si la bande sonore ne présente pas suffisamment de blancs sonores pour décrire la vidéo.' ,
		     },  
      'MESSAGE_87' : {
                       message: 'Règle 87 Si un élément object, embed, applet ou audio est utilisé pour restituer une vidéo ou un son, une alternative textuelle doit être présente ou accessible depuis la page.' ,
                       title:   'Règle 87 Alternative textuelle pour les contenus videos ou sonores.' ,
		     },  
      'MESSAGE_88' : {
                       message: 'Règle 88 Si un élément object, embed, applet ou audio est utilisé pour restituer un son en direct, une alternative textuelle doit être présente ou accessible depuis la page.' ,
                       title:   'Règle 88 Alternative textuelle pour les contenus sonores en direct.' ,
		     },  
      'MESSAGE_89' : {
                       message: 'Règle 89 Vérifiez que la couleur n\'est pas utilisée comme seul moyen pour transmettre de l\'information, indiquer une action, provoquer une réponse, ou pour différencier un élément visuel.' ,
                       title:   'Règle 89 Vérifiez que la couleur n\'est pas utilisé comme seul moyen pour transmettre de l\'information, indiquer une action, provoquer une réponse, ou pour différencier un élément visuel.' ,
		     },  
      'MESSAGE_90' : {
                       message: 'Règle 90 Les instructions fournies pour comprendre et manipuler le contenu ne repose pas uniquement sur la forme, la taille, la position, l\'orientation ou le son.' ,
                       title:   'Règle 90 Les instructions et les manipulations doivent être possibles indépendamment de la forme, la taille, la position, l\'orientation ou le son .' ,
		     },  
      'MESSAGE_91' : {
                       message: 'Règle 91 Vérifiez qu\'aucun son n\'est déclenché automatiquement lorsque la page se charge.' ,
                       title:   'Règle 91 Vérifiez qu\'aucun son n\'est déclenché automatiquement lorsque la page se charge.' ,
		     },  
      'MESSAGE_92' : {
                       message: 'Règle 92 Vérifiez que les tailles de caractères (propriétés \'font-size\' et \'font\') définies dans les styles internes et les fichiers CSS externes sont exprimées dans des unités relatives (n\'utilisez pas l\'unité pt).' ,
                       title:   'Règle 92 Vérifiez que les tailles de caractères sont exprimées dans des unités relatives.' ,
		     },  
      'MESSAGE_93' : {
                       message: 'Règle 93 Vérifiez que les images ne sont pas utilisées pour la mise en forme du texte.' ,
                       title:   'Règle 93 Vérifiez que les images ne sont pas utilisées pour la mise en forme du texte.' ,
		     },  

    },  // end rules
    
    //
    //  OAA Rule Groups title and message string National Language Support (NLS)
    //
    groups: {
      'GROUP_1' : {
                     title:       'Règle non assignée' ,
                     description: '' ,
                  },
      'GROUP_2' : {
                     title:       'Règle en-tête et landmark' ,
                     description: '' ,
                  },
      'GROUP_3' : {
                     title:       'Règle tableau de données' ,
                     description: '' ,
                  },
      'GROUP_4' : {
                     title:       'Règle image et zone cliquable' ,
                     description: '' ,
                  },
      'GROUP_5' : {
                     title:       'Règle Audio et Video ' ,
                     description: '' ,
                  },
      'GROUP_6' : {
                     title:       'Règle formulaire/widget' ,
                     description: '' ,
                  },
      'GROUP_7' : {
                     title:       'Règle style' ,
                     description: '' ,
                  },
      'GROUP_8' : {
                     title:       'Règle frame' ,
                     description: '' ,
                  },
      'GROUP_9' : {
                     title:       'Règle script' ,
                     description: '' ,
                  },
      'GROUP_10' : {
                     title:       'Règle layout' ,
                     description: '' ,
                  },
      'GROUP_11' : {
                     title:       'Règle lien' ,
                     description: '' ,
                  },
      'GROUP_12' : {
                     title:       'Règle langue' ,
                     description: '' ,
                  },
      'GROUP_13' : {
                     title:       'Règle raccourci clavier' ,
                     description: '' ,
                  },

    },  // end groups

  }  // end ruleset
);


        

