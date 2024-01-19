window.onload = function () {

    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var word;
    var guess;
    var guesses = [];
    var lives;
    var counter;
    var space;

    //obtener elemenentos
    var showLives = document.getElementById("mylives");

    //funcion para el alphabet 
    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }

    //para colocar las palabras
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "—";
            }

            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    //VIDAS
    comments = function () {
        showLives.innerHTML = "Tienes " + lives + " intentos";
        if (lives < 1) {
            showLives.innerHTML = "Perdiste, presiona el boton para volver a jugar";
        }
        for (var i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                showLives.innerHTML = "GANASTE!, presiona el boton para volver a jugar";
            }
        }
    }
    var animate = function () {
        var drawMe = lives;
        drawArray[drawMe]();
    }

    //CUERPO COMPLETO
    canvas = function () {

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    base1 = function () {
        draw(0, 150, 150, 150);
    };

    base2 = function () {
        draw(10, 0, 10, 600);
    };

    base3 = function () {
        draw(0, 5, 70, 5);
    };

    base4 = function () {
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    brazoDerecho = function () {
        draw(60, 46, 100, 50);
    };

    brazoIzquierdo = function () {
        draw(60, 46, 20, 50);
    };

    piernaDerecha = function () {
        draw(60, 70, 100, 100);
    };

    piernaIzquierda = function () {
        draw(60, 70, 20, 100);
    };

    drawArray = [piernaDerecha, piernaIzquierda, brazoDerecho, brazoIzquierdo, torso, head, base4, base3, base2, base1];

    //funcion de los botones
    check = function () {
        list.onclick = function () {
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === geuss) {
                    guesses[i].innerHTML = geuss;
                    counter += 1;
                }
            }
            var j = (word.indexOf(geuss));
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            } else {
                comments();
            }
        }
    }


    //palabras que estan en el juego
    jugar = function () {
        words = ['JAVA', 'MYSQL', 'AHORCADO', 'CANVAS', 'ELSE', 'HTML', 'JAVASCRIPT', 'JAVASERVER PAGES','CSS','JAVA EE','VAR','BODY','DIV','ONLOAD']
        word = words[Math.floor(Math.random() * words.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        guesses = [];
        lives = 7;
        counter = 0;
        space = 0;
        result();
        comments();
        canvas();
    }

    jugar();

    var hints = {
        'JAVA': 'Un lenguaje de programación popular',
        'AHORCADO': 'El nombre de este juego',
        'CANVAS': 'Una tecnología de HTML5 para dibujar gráficos en el navegador',
        'HTML': 'Es un lenguaje de etiqueta',
        'JAVASCRIPT': 'Creado para agregar interactividad a las páginas web en el navegador del usuario',
    };

    var hintButton = document.getElementById('hint');
    hintButton.addEventListener('click', function () {
        var currentWord = word.toUpperCase();
        if (hints.hasOwnProperty(currentWord)) {
            alert('Pista: ' + hints[currentWord]);
        } else {
            alert('Lo siento, no hay pista disponible para esta palabra.');
        }
    });

    //resetear el juego 
    document.getElementById('reset').onclick = function () {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        context.clearRect(0, 0, 400, 400);
        jugar();
    }
}