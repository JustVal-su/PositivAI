const loginForm = document.getElementById("login");
const continueDiv = document.getElementById("continue_div");
const sendButton = document.getElementById("send_button");
let buttonIsDisabled = false;


function removeDisclaimer() {
    const element = document.getElementById("disclaimer");
    element.remove();
}

function login() {
    let usernameText = document.getElementById("UsernameInput").value;
    let passwordText = document.getElementById("PasswordInput").value;

    if (usernameText == "" || passwordText == "") {
        alert("Username and password are required!")
    } else {
        const queryH2 = document.getElementById("log_id");
        queryH2.innerHTML = "Nice to meet you, " + usernameText + "!";
        // Supprime le formulaire de connexion
        loginForm.remove();
        // Rend visible la div où il est inscrit de continuer
        continueDiv.style.display = "inline-block";
        console.log("a");
    }
}

// Fonction qui bannit l'utilisation des caractères <>
function validateInput(input) {
    input.value = input.value.replace(/[<>]/g, '');
}

let randomValue = null;

function getRandomElement(array) {
    // Vérifie si l'argument est un tableau et n'est pas vide
    if (!Array.isArray(array) || array.length === 0) {
        console.error("L'argument doit être un tableau non vide.");
        return;
    }

    // Sélectionne un index aléatoire
    let rand = Math.floor(Math.random() * array.length);

    // Récupère l'élément à l'index aléatoire
    let rValue = array[rand];

    // Affiche l'élément aléatoire
    console.log(rValue);

    randomValue = rValue

    // Retourne l'élément aléatoire
    return rValue;
}

// J'ai du supprimer les caractères "<>" car, avec le texte à l'intérieur, ils étaient interprétés comme du code html...
// Regardez cette magnifique balise : <y 4a="Py?*:Y'^O6M;%&quot;CNzoM.E+n?~G+T0;0:U3#5u"><y>.
// J'en ai profité pour rajouter les lettres à, À, é et É.
// Je précise qu'à la base j'utilisais les 95 caractères ASCII et le mot-clé "end" pour définir la fin du message.
let AsciiArray = ['end', ' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '=', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', 'à', 'À', 'é', 'É'];

function removeContinueDiv() {
    continueDiv.remove();
}

function printQuestion() {
    document.getElementById("send_button").style.cursor = "not-allowed";
    sendButton.setAttribute("disabled", "");
    buttonIsDisabled = true;
    getRanEl();
}

let isFinished = true;
let ai_answer = "";
let aiAnswerField = document.getElementById("ai_answer_field");

function getRanEl() {
    isFinished = false;
    getRandomElement(AsciiArray);

    if (randomValue == "end") {
	    isFinished = true;
        sendButton.removeAttribute("disabled");
        document.getElementById("send_button").style.cursor = "auto";
        buttonIsDisabled = false;
    } else {
        writeAiAnswer();
    }
    
    if (isFinished != true) {
        requestAnimationFrame(getRanEl);
    }
}

function writeAiAnswer() {
    ai_answer = ai_answer + randomValue;
    aiAnswerField.innerHTML = ai_answer;
}

let idCounter = 0;
// Fonction pour générer un ID unique basé sur le compteur
function generateSequentialId() {
    idCounter++;
    return 'ID' + idCounter;
}

function addElement() {
    let inputElement = document.getElementById("ask_something");
    let inputValue = inputElement.value;

    if (inputValue === "") {
        alert("Questions can't be blank")
    } else {
    // crée un nouvel élément div
    let newDiv = document.createElement("div");
    // et lui donne un peu de contenu
    let newContent = document.createElement("p");
    newContent.id = generateSequentialId();
    // ajoute le paragraphe à la nouvelle div créée
    newDiv.appendChild(newContent);
    // ajoute le nouvel élément créé et son contenu dans le DOM
    document.body.insertBefore(newDiv, aiAnswerField);
    let paragraph = document.getElementById("ID" + idCounter);
    paragraph.innerHTML = inputValue;
    inputElement.value = "";
    printQuestion();
    }
}

let counter = 0;

function buttonAnimations() {
    if (buttonIsDisabled == true) {
        sendButton.classList.remove("animate");
    } else if (counter == 0) {
            sendButton.addEventListener("mouseenter", function() {
                sendButton.classList.add("animate");
            });
            
            sendButton.addEventListener("mouseleave", function() {
                sendButton.classList.remove("animate");
            });

            counter = 1;
    }
    requestAnimationFrame(buttonAnimations);
}

requestAnimationFrame(buttonAnimations);