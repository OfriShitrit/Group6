function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var loggedInUserCookie = getCookie("loggedInUser");
if (loggedInUserCookie) {
    var loggedInUser = JSON.parse(loggedInUserCookie.slice(2));

    const loginLink = document.querySelector("header ul li.login");
    loginLink.remove();

    const signupLink = document.querySelector("header ul li.preSignIn");
    signupLink.remove();

    const logoutItem = document.createElement("li");
    const logoutLink = document.createElement("a");
    logoutLink.setAttribute("href", "logout");
    logoutLink.innerText = "logout";
    logoutItem.appendChild(logoutLink);
    document.querySelector("header ul").prepend(logoutItem);

    const welcomeItem = document.createElement("li");
    welcomeItem.classList.add("welcome");
    welcomeItem.innerText = `hey ${loggedInUser.name} ${loggedInUser.lastName}`;
    document.querySelector("header ul").prepend(welcomeItem);
} else {
    const myProfileLink = document.querySelector("header ul li.myProfile");
    myProfileLink.remove();
}
