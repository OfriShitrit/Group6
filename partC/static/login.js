const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get("error");

if (error) {
    alert(error);
}

const myForm = document.querySelector(".my-form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

const onSubmit = (e) => {
    e.preventDefault();
    //isEmpty
    if (!usernameInput.value || !passwordInput.value) {
        console.log("fields empty");
        alert("Please fill out all fields");
        return;
    }

    //validPassword
    else if (passwordInput.value.length < 8) {
        alert("please enter a password with more than 7 characters");
        console.log("not valid password");
        return;
    } else {
        fetch(`/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                UserName: usernameInput.value,
                Password: passwordInput.value,
            }),
            redirect: "follow",
        })
            .then((res) => {
                if(res.url){
                    window.location = res.url;
                }
                else {
                    window.location = "homePage";
                }
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                return;
            });
    }
};

myForm.addEventListener("submit", onSubmit);
