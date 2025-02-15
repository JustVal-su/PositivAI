function removeDisclaimer() {
    const element = document.getElementById("disclaimer");
    element.remove();
}


function login() {
    const queryH2 = document.getElementById("log_id");
    let usernameText = document.getElementById("UsernameInput").value;
    let passwordText = document.getElementById("PasswordInput").value;
    queryH2.innerHTML = "Nice to meet you, " + usernameText + "!"
}