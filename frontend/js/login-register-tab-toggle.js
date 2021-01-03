enableTabButton = buttonId => {
    $(`#${buttonId}`)
        .removeClass("btn-outline-primary")
        .removeClass("border-0")
        .addClass("btn-primary")
        .prop("disabled",false);
};

disableTabButton = buttonId => {
    $(`#${buttonId}`)
        .removeClass("btn-primary")
        .addClass("btn-outline-primary")
        .addClass("border-0")
        .prop("disabled",true);
};

showTab = tabId => {
    $(`#${tabId}`).show("slow");
};

hideTab = tabId => {
    $(`#${tabId}`).hide("fast");
};

toggleText = (hide, show) => {
    $(`#${hide}-text`).hide("fast");
    $(`#${show}-text`).slideDown("slow");
}

$("#login-tab-btn").click(() => {
    enableTabButton("register-tab-btn");
    disableTabButton("login-tab-btn");
    hideTab("register-tab");
    showTab("login-tab");
    toggleText("register", "login");
});

$("#register-tab-btn").click(() => {
    enableTabButton("login-tab-btn");
    disableTabButton("register-tab-btn");
    hideTab("login-tab");
    showTab("register-tab");
    toggleText("login", "register");
});