const myForm = document.querySelector(".my-form");
const nameInput = document.querySelector("#name");
const lastNameInput = document.querySelector("#last_name");
const emailInput = document.querySelector("#email");
const genderInput = document.querySelector("#gender");
const userNameInput = document.querySelector("#user_name");
const passwordInput = document.querySelector("#password");
const cityInput = document.querySelector("#city");
const phoneInput = document.querySelector("#phone");
const nameError = document.querySelector("#name-error");

const onSubmit = (e) => {
    e.preventDefault();
    //isEmpty
    if (
        !nameInput.value ||
        !lastNameInput.value ||
        !emailInput.value ||
        !userNameInput.value ||
        !passwordInput.value ||
        !cityInput.value ||
        !phoneInput.value ||
        !genderInput.value
    ) {
        console.log("fields empty");
        alert("Please fill out all fields");
        return;
    }

    //isString
    else if (
        !/^[a-zA-Z\s]*$/i.test(nameInput.value) ||
        !/^[a-zA-Z\s]*$/i.test(lastNameInput.value) ||
        !(/^[a-zA-Z'\s]*$/i.test(cityInput.value))
    ) {
        alert("Only English letters are allowed");
        console.log("not letters");
        return;
    }

    //validemail
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        alert("please enter a valid email");
        console.log("not valid email");
        return;
    }

    //validPassword
    else if (passwordInput.value.length < 8) {
        alert("please enter a password with more than 7 characters");
        console.log("not valid password");
        return;
    }

    //validPhone
    else if (!/^\d{10}$/.test(phoneInput.value)) {
        alert("please enter a valid phone number");
        console.log("not valid phone");
    } else if (myForm.classList.contains("employee")) {
        const seniorityInput = document.querySelector("#seniority");
        const hourlyRateInput = document.querySelector("#hourly-rate");

        if (!seniorityInput.value || !hourlyRateInput.value) {
            console.log("fields empty");
            alert("Please fill out all fields");
            return;
        }

        fetch(`/formHandler1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ["First-Name"]: nameInput.value,
                ["Last-Name"]: lastNameInput.value,
                Email: emailInput.value,
                UserName: userNameInput.value,
                Password: passwordInput.value,
                City: cityInput.value,
                gender: genderInput.value,
                phone: phoneInput.value,
                Seniority: seniorityInput.value,
                ["Hourly-Rate"]: hourlyRateInput.value,
            }),
        })
            .then((res) => {
                window.location = "login";
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                return;
            });
    } else if (myForm.classList.contains("user")) {
        fetch(`/formHandler`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ["First-Name"]: nameInput.value,
                ["Last-Name"]: lastNameInput.value,
                Email: emailInput.value,
                UserName: userNameInput.value,
                Password: passwordInput.value,
                City: cityInput.value,
                gender: genderInput.value,
                phone: phoneInput.value,
            }),
        })
            .then((res) => {
                window.location = "login";
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                return;
            });
    }
};

myForm.addEventListener("submit", onSubmit);
