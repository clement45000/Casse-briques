const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const affichageScore = document.querySelector('.score');

const rayonBalle = 10, barreHeight = 10, barreWidth = 200, nbCol = 8, nbRow = 5, largeurBrique = 75,
hauteurBrique = 20;

// x et y => position  de la balle
// barreWidth => largeur de la barre
//barreX => position de la barre de X
//vitesseX = 5 et vitesseY = 5 => vitesse de la balle
let x = canvas.width/2, y = canvas.height -30, barreX = (canvas.width - barreWidth)/2, fin = false,
vitesseX = 5, vitesseY = -5, score = 0;


//On dessine la balle
function dessineBalle(){
    ctx.beginPath();
    ctx.arc(x,y, rayonBalle, 0, Math.PI*2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

//On dessine la balle
function dessineBarre(){
    ctx.beginPath();
    ctx.rect(barreX, canvas.height - barreHeight - 2,
    barreWidth, barreHeight)
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

//dessineBarre();

//Tableau avec toute les briques sans positionnement
//nbrow => nombres de ligne de briques (5lignes)
//nbCol = 8
const briques = [];
for( let i = 0; i < nbRow; i++){

    briques[i] = [];
  
    for(let j = 0; j < nbCol; j++){
        briques[i][j] = {x: 0, y: 0, statut: 1};

    }
}

//console.log(briques);

function dessineBriques(){
    for(let i = 0; i <nbRow ; i ++){
        for(let j = 0; j < nbCol; j++){
        
            if(briques[i][j].statut === 1){
                 console.log("toto");
                // 75 * 8 + 10 * 8 + 35 = 750 
                // 750 est la largeur de ntore canvas
                let briquesX = (j*(largeurBrique + 10) + 35);
                let briquesY = (i*(hauteurBrique + 10) + 30);

                briques[i][j].x = briquesX;
                briques[i][j].y = briquesY;

                //dessine les briques
                ctx.beginPath();
                ctx.rect(briquesX, briquesY, largeurBrique, hauteurBrique);
                ctx.fillStyle = "#333";
                ctx.fill();
                ctx.closePath();
              
            }
        }
    }
}

//dessineBriques();

function dessine(){
    //tant que le jeux n'est pas terminé
    if(fin === false){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dessineBriques();
        dessineBalle();
        dessineBarre();
        collisionDetection();

        if(x + vitesseX > canvas.width - rayonBalle || x + vitesseX < rayonBalle){
            vitesseX = -vitesseX;
        }
        
        if(y + vitesseY < rayonBalle){
            vitesseY =  - vitesseY;
        }

        if(y + vitesseY  > canvas.height - rayonBalle){
            //intervalle en fonction de la taille de la barre de 0 à 75 taille de la barre
                if(x > barreX && x < barreX + barreWidth){
                    vitesseX = vitesseX + 0.1;
                    vitesseY = vitesseY + 0.1;
                    vitesseY = -vitesseY;
              
        } else {
            fin = true; // on arrete d'appeler l'animation
            affichageScore.innerHTML = `Perdu ! <br> Clique sur casse-briques pour recommencer`;
        }
    }    
        x += vitesseX;
        y += vitesseY;
        requestAnimationFrame(dessine);

    }

}

 dessine();

function collisionDetection(){
    for(let i = 0; i < nbRow; i ++){
        for(let j = 0; j < nbCol; j++){

            let b = briques[i][j];
            if(b.statut === 1){
                if(x > b.x && x < b.x + largeurBrique && y > b.y && y < b.y + hauteurBrique){
                        vitesseY = -vitesseY;
                        b.statut = 0;

                        score ++;
                        affichageScore.innerHTML = `Score : ${score}`;
                        if(score === nbCol * nbRow){
                        affichageScore.innerHTML = `Bravo ! <br> Clique sur le casse briques pour recommencer. : ${score}`;        
                        fin = true;     
                    }
                }
            }
        }
    }
}

 //mouvement de la barre avec la souris
document.addEventListener('mousemove', mouvementSouris);

function mouvementSouris(e){
    let posXBarreCanvas = e.clientX - canvas.offsetLeft;
    // e.clientX = de la gauche jusqu'à la souris
    //canvas.offsetLeft = decalage par rapport à la gauche
    if(posXBarreCanvas > 35 && posXBarreCanvas < canvas.width - 35){
        barreX = posXBarreCanvas - barreWidth/2;
    }
}

 // recommencer la partie
 canvas.addEventListener('click', () =>{
     if(fin === true){
         fin = false;
         document.location.reload();
     }
 })