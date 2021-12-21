var MasterMind = { // variables globales pour plus de souplesse
    name: 'MasterMind',

    niveaux: { // 1 niveau disponible pour l'instant, mais il suffira de les rajouter ici
        facile: {
            nb_lignes: 12,
            nb_colonnes: 4,
            couleurs: 4,
            double: false, // possibilité de combinaison avec plusieurs pions de la même couleur
            modeVerif: true,
        }
    },

    couleurs: {
        1: '#000000', // noir
        2: '#FFFFFF', // blanc
        3: '#CC3333', // rouge
        4: '#ff9600', // orange
    },

    reglages: {
        nb_lignes: 12, // nombre de lignes (et donc de tentatives)
        nb_colonnes: 4, // colonnes pour les couleurs
        couleurs: 4, // couleurs disponibles
    },

    jeu: {
        tour: 1, // tour en cours
        column: 1, // colonne en cours
        couleurs_joueur: new Array(), // sélection de couleur du joueur
        couleurs_soluce: new Array(), // solution de la partie
    },
    /* -------------------------- Initialisation du jeu ------------------------- */
    initialise: function() {
        this.Commencejeu('facile');
    },

    Commencejeu: function(niveau) { // les 3 procédures d'initialisation
        this.reglages = this.niveaux[niveau];
        this.dessinePlateau();
        this.initialiseJeu();
        this.creationCombinaisonSecrete();
    },
    /* --------------- dessin du plateau (par )création d'un tableau) -------------- */
    dessinePlateau: function() {
        plateau = document.getElementById('plateau');
        plateau.innerHTML = '';

        for (i = this.reglages['nb_lignes']; i > 0; i--) {

            line = document.createElement('tr');
            line.id = 'tour-' + i;

            cell = document.createElement('td');
            cell.innerHTML = i;
            cell.style.width = '32px';
            line.appendChild(cell);

            for (j = 1; j <= this.reglages['nb_colonnes']; j++) {
                cell = document.createElement('td');
                cell.innerHTML = '';
                cell.id = 'tour-' + i + '-' + j;
                cell.style.width = '32px';
                cell.setAttribute('onclick', this.name + '.selectColumn(' + i + ', ' + j + ');');
                line.appendChild(cell);
            }

            for (j = 1; j <= this.reglages['nb_colonnes']; j++) {
                cell = document.createElement('td');
                cell.innerHTML = '';
                cell.id = 'result-' + i + '-' + j;
                cell.style.width = '16px';
                line.appendChild(cell);
            }

            cell = document.createElement('td');
            cell.innerHTML = 'VÉRIFIER';
            cell.id = 'valid-' + i;
            cell.className = 'valid';
            cell.style.width = '16px';
            cell.setAttribute('onclick', this.name + '.checkLine(' + i + ');');
            line.appendChild(cell);

            plateau.appendChild(line);
        }

        couleurselector = document.getElementById('couleurselector');
        couleurselector.innerHTML = '';

        line = document.createElement('tr');
        for (i = 1; i <= this.reglages['couleurs']; i++) {
            cell = document.createElement('td');
            cell.innerHTML = '';
            cell.style.width = '32px';
            line.appendChild(cell);

            pion = document.createElement('div');
            pion.className = 'pion';
            pion.style.background = this.couleurs[i];
            pion.setAttribute('onclick', this.name + '.selectColor(' + i + ');');
            cell.appendChild(pion);
        }
        couleurselector.appendChild(line);
    },
    /* -------------------------------------------------------------------------- */
    initialiseJeu: function() {
        this.jeu['tour'] = 1;
        this.jeu['column'] = 1;

        document.getElementById('tour-1').className = 'selected';
        document.getElementById('tour-1-1').className = 'selected';
    },
    /* ------------------------ Init combinaison secrète ------------------------ */
    creationCombinaisonSecrete: function() {
        this.jeu['couleurs_soluce'] = new Array();
        for (i = 1; i <= this.reglages['nb_colonnes']; i++) {
            color = parseInt(Math.random() * this.reglages['couleurs']) + 1;
            while (this.reglages['double'] == false && this.jeu['couleurs_soluce'].indexOf(color) != -1) {
                color = parseInt(Math.random() * this.reglages['couleurs']) + 1;
            }
            this.jeu['couleurs_soluce'][i] = color;
            /* ------------------------ partie test (console log) ----------------------- */
            switch (color) {
                case 1:
                    c = "noir"
                    break;
                case 2:
                    c = "blanc"
                    break;
                case 3:
                    c = "rouge"
                    break;
                case 4:
                    c = "jaune"
                    break;

                default:
                    break;
            }
            console.log('couleur secrète no: ' + i + " = " + color + "  " + c);
            /* ----------------------------- fin partie test ---------------------------- */
        }
    },
    /* ----------- Procédures de verification des combinaisons testés ----------- */
    selectColor: function(color) {
        /* Verifie si la partie est toujours active */
        if (this.jeu['tour'] == -1) {
            return;
        }

        /* Retire la precedente selection si elle existe */
        document.getElementById('tour-' + this.jeu['tour'] + '-' + this.jeu['column']).innerHTML = '';

        /* Ajoute la couleur a la selection faite par le joueur */
        this.jeu['couleurs_joueur'][this.jeu['column']] = color;

        /* Ajoute visuellement la couleur sur le plateau */
        pion = document.createElement('div');
        pion.className = 'pion';
        pion.style.background = this.couleurs[color];
        document.getElementById('tour-' + this.jeu['tour'] + '-' + this.jeu['column']).appendChild(pion);

        /* Retire le marquage visuel de la case courante */
        document.getElementById('tour-' + this.jeu['tour'] + '-' + this.jeu['column']).className = '';

        /* Verifie que le curseur n'est pas sur la derniere case */
        if (this.jeu['column'] == this.reglages['nb_colonnes']) {
            /* Place le curseur a la premiere case */
            this.jeu['column'] = 1;
        } else {
            /* Deplace le curseur du joueur sur la case suivante */
            this.jeu['column']++;
        }

        /* Ajoute le marquage visuel sur la nouvelle case courante */
        document.getElementById('tour-' + this.jeu['tour'] + '-' + this.jeu['column']).className = 'selected';
    },

    selectColumn: function(line, column) {
        /* Verifie si la ligne est bien la ligne courante, verifie en meme temps, si la partie est toujours active */
        if (line != this.jeu['tour']) {
            return;
        }

        /* Retire le marquage visuel de la case courante */
        document.getElementById('tour-' + line + '-' + this.jeu['column']).className = '';

        /* Selectionne la nouvelle colonne */
        this.jeu['column'] = column;

        /* Applique le marquage visuel sur la nouvelle case courante */
        document.getElementById('tour-' + line + '-' + this.jeu['column']).className = 'selected';
    },

    checkLine: function(line) {
        /* Verifie si la ligne est bien la ligne courante, verifie en meme temps, si la partie est toujours active */
        if (line != this.jeu['tour']) {
            return;
        }

        /* Verifie que la ligne a ete entierement remplie par le joueur */
        for (i = 1; i <= this.reglages['nb_colonnes']; i++) {
            if (!this.jeu['couleurs_joueur'][i]) {
                return;
            }
        }

        /* Duplique la solution pour pouvoir la modifier sans alterer l'originale */
        couleurs_soluce = this.jeu['couleurs_soluce'].slice(0);

        /* Verifie le mode de verification */
        if (this.reglages['modeVerif'] === false) {
            /* Initialise les variables de verification */
            correct = 0;
            malPlaces = 0;

            /* Verifie les pions bien places */
            for (i = 1; i <= this.reglages['nb_colonnes']; i++) {
                if (this.jeu['couleurs_joueur'][i] == couleurs_soluce[i]) {
                    correct++;
                    couleurs_soluce[i] = 0;
                    this.jeu['couleurs_joueur'][i] = 0;
                }
            }

            /* Verifie si tous les pions sont biens places, et auquel cas, afficher la victoire */
            if (correct == this.reglages['nb_colonnes']) {
                /* Utilise un return pour sortir de la method et ne pas continuer la verification */
                return this.afficheGagne();
            }

            /* Verifie les pions mal places, parmi les pions restant */
            for (i = 1; i <= this.reglages['nb_colonnes']; i++) {
                if (this.jeu['couleurs_joueur'][i] == 0) {
                    continue;
                }
                loc = soluce.indexOf(this.jeu['couleurs_joueur'][i]);

                if (loc != -1) {
                    this.jeu['couleurs_joueur'][i] = 0;
                    couleurs_soluce[loc] = 0;
                    malPlaces++;
                }
            }

            /* Affiche le bon nombre de pions bien places */
            for (i = 1; i <= correct; i++) {
                pion = document.createElement('div');
                pion.className = 'correct';
                document.getElementById('result-' + this.jeu['tour'] + '-' + i).appendChild(pion);
            }

            /* Affiche le bon nombre de pions mal places */
            for (j = i; j < i + malPlaces; j++) {
                pion = document.createElement('div');
                pion.className = 'malPlaces';
                document.getElementById('result-' + this.jeu['tour'] + '-' + j).appendChild(pion);
            }

        } else {
            correct = 0;

            /* Vérifie bien placés */
            for (i = 1; i <= this.reglages['nb_colonnes']; i++) {
                if (this.jeu['couleurs_joueur'][i] == this.jeu['couleurs_soluce'][i]) {
                    //console.log('correct pos '+i+' : '+couleurs_soluce[i]);
                    correct++;
                    this.jeu['couleurs_joueur'][i] = 0;
                    couleurs_soluce[i] = 0;

                    pion = document.createElement('div');
                    pion.className = 'correct';
                    document.getElementById('result-' + this.jeu['tour'] + '-' + i).appendChild(pion);
                }
            }

            /* Vérifie gagné */
            if (correct == this.reglages['nb_colonnes'])
                return this.afficheGagne();

            /* Vérifie mal placés */
            for (i = 1; i <= this.reglages['nb_colonnes']; i++) {
                if (this.jeu['couleurs_joueur'][i] == 0)
                    continue;
                loc = couleurs_soluce.indexOf(this.jeu['couleurs_joueur'][i]);

                if (loc != -1) {
                    this.jeu['couleurs_joueur'][i] = 0;
                    couleurs_soluce[loc] = 0;

                    pion = document.createElement('div');
                    pion.className = 'malPlaces';
                    document.getElementById('result-' + this.jeu['tour'] + '-' + i).appendChild(pion);
                }
            }
        }

        /* Prepare le jeu pour le tour suivant */

        /* Re-initialise la selection du joueur */
        this.jeu['couleurs_joueur'] = new Array();

        /* Retire le marquage visuel de la ligne courante  */
        document.getElementById('tour-' + this.jeu['tour']).className = '';

        /* Verifie que la ligne n'etait pas la derniere, si auquel cas, afficher la defaite */
        if (this.jeu['tour'] == this.reglages['nb_lignes']) {
            /* Utilise un return pour sortir de la method et ne pas continuer la verification */
            return this.afficheLose();
        }

        /* Deplace le curseur sur la ligne suivante */
        this.jeu['tour']++;

        /* Applique le marquage sur la nouvelle ligne courante */
        document.getElementById('tour-' + this.jeu['tour']).className = 'selected';

        /* Place le curseur sur la premiere case */
        this.jeu['column'] = 1;

        /* Applique le marquage sur la premiere case */
        document.getElementById('tour-' + this.jeu['tour'] + '-1').className = 'selected';
    },
    /* ----------------------------- AFFICHAGE FINAL ---------------------------- */
    afficheGagne: function() {
        /* Affiche le resultat dans l'espace dedie, en couleur */
        document.getElementById('result').innerHTML = 'Gagn&eacute;';
        document.getElementById('result').style.color = '#43b456';

        /* Affiche le marquage specific a la victoire sur la ligne courante */
        document.getElementById('tour-' + this.jeu['tour']).className = 'win';

        /* Marque la fin de la partie en indiquant une valeur null au tour en cours */
        this.jeu['tour'] = -1;
    },

    afficheLose: function() {
        /* Affiche le resultat dans l'espace dedie, en couleur */
        document.getElementById('result').innerHTML = 'Perdu';
        document.getElementById('result').style.color = '#CC3333';

        /* Marque la fin de la partie en indiquant une valeur null au tour en cours */
        this.jeu['tour'] = -1;
    },
};