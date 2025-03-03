const loginForm = document.getElementById("login");
const continueDiv = document.getElementById("continue_div");
const sendButton = document.getElementById("send_button");
const logText = document.getElementById("logo_and_text");
const field = document.getElementById("ask_something");
const arrowButton = document.getElementById("send_button");
let buttonIsDisabled = false;
let counter = 0;
let i = 0;
let randomValue = null;
let ai_answer = "";

// Fonction qui bannit l'utilisation des caractères <> dans tous les input
function validateInput(input) {
    input.value = input.value.replace(/[<>]/g, '');
}

// Enlève la div de disclaimer de la page
function removeDisclaimer() {
    const element = document.getElementById("disclaimer");
    element.remove();
}

// Gére le faux login
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
    }
}

// Supprime la div avec le bouton "continue" et crée l'interface de chat
function removeContinueDiv() {
    continueDiv.remove();
    logText.style.display = "block";
    field.style.display = "inline-block";
    arrowButton.style.display = "inline-block";
}

// Fonction qui gère la séléction aléatoire d'un caractère dans un tableau
// Sélection aléatoire dans un tableau
function getRandomElement(array) {
    if (!Array.isArray(array) || array.length === 0) {
        console.error("L'argument doit être un tableau non vide.");
        return;
    }

    let rand = Math.floor(Math.random() * array.length);
    randomValue = array[rand];
    return randomValue;
}

// J'ai du supprimer les caractères "<>" car, avec le texte à l'intérieur, ils étaient interprétés comme du code html...
// Regardez cette magnifique balise : <y 4a="Py?*:Y'^O6M;%&quot;CNzoM.E+n?~G+T0;0:U3#5u"><y>.
// J'en ai profité pour rajouter les lettres à, À, é et É.
// Je précise qu'à la base j'utilisais les 95 caractères ASCII et le mot-clé "end" pour définir la fin du message.
let AsciiArray = ['end', ' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '=', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', 'à', 'À', 'é', 'É'];

function printQuestion() {
    buttonIsDisabled = true;
    ai_answer = ""; // Réinitialise la réponse
    let newDiv = document.createElement("div");
    newDiv.classList.add("ai-response");
    let newContent = document.createElement("p");
    newDiv.appendChild(newContent);
    parentDiv.insertBefore(newDiv, marker);

    getRanEl(newContent); // Démarre la génération
}

let isFinished = false;

function getRanEl(contentElement) {
    getRandomElement(AsciiArray);

    if (randomValue === "end") {
        isFinished = true;
        sendButton.removeAttribute("disabled");
        document.getElementById("send_button").style.cursor = "auto";
        buttonIsDisabled = false;
    } else {
        ai_answer += randomValue;
        contentElement.innerHTML = ai_answer; // Met à jour le <p> spécifique à cette réponse
        requestAnimationFrame(() => getRanEl(contentElement)); // Continue la boucle avec cet élément
    }
}

let marker = document.getElementById("marker");
let parentDiv = document.getElementById("markDiv");

function writeAiAnswer() {
    /*let newContent = null;
    for (i = 0; i < 1; i++) {
        console.log("test");
        let newDiv = document.createElement("div");
        newContent = document.createElement("p");
        newDiv.appendChild(newContent);
        parentDiv.insertBefore(newDiv, marker);
    }

    ai_answer = ai_answer + randomValue;
    newContent.innerHTML = ai_answer;*/
    let aiAnswerField = document.getElementById("ai_answer_field"); // Suppose un élément existant
    if (!aiAnswerField) {
        // Crée l'élément une seule fois s'il n'existe pas
        let newDiv = document.createElement("div");
        aiAnswerField = document.createElement("p");
        newDiv.appendChild(aiAnswerField);
        parentDiv.insertBefore(newDiv, marker);
        aiAnswerField.id = "ai_answer_field";
    }
    ai_answer += randomValue;
    aiAnswerField.innerHTML = ai_answer; // Met à jour le même élément
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
    let marker = document.getElementById("marker");
    let markDiv = document.getElementById("markDiv");

    if (inputValue === "") {
        alert("Questions can't be empty")
    } else {
        // crée un nouvel élément div
        let newDiv = document.createElement("div");
        newDiv.classList.add('item');
        // et lui donne un peu de contenu
        let newContent = document.createElement("p");
        let newId = generateSequentialId();
        newContent.id = newId;
        // ajoute le paragraphe à la nouvelle div créée
        newDiv.appendChild(newContent);
        markDiv.insertBefore(newDiv, marker);
        // ajoute le nouvel élément créé et son contenu dans le DOM
        newContent.innerHTML = inputValue;
        inputElement.value = "";
        printQuestion();
    }
}

function buttonAnimations() {
    if (buttonIsDisabled == true) {
        sendButton.classList.remove("animate");
        document.getElementById("send_button").style.cursor = "not-allowed";
        sendButton.setAttribute("disabled", "");
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