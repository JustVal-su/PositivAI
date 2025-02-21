function removeDisclaimer() {
    const element = document.getElementById("disclaimer");
    element.remove();
}


function login() {
    const queryH2 = document.getElementById("log_id");
    let usernameText = document.getElementById("UsernameInput").value;
    let passwordText = document.getElementById("PasswordInput").value;
    queryH2.innerHTML = "Nice to meet you, " + usernameText + "!";
    // remove the login form
    const loginForm = document.getElementById("login");
    loginForm.remove();
}

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

    // Retourne l'élément aléatoire
    return rValue;
}

let AsciiArray = [' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~'];
getRandomElement(AsciiArray);

function getRandomValue() {
    getRandomElement(AsciiArray);
}