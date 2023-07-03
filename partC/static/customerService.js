const myForm = document.querySelector(".my-form");
const nameInput = document.querySelector("#name");
const lastNameInput = document.querySelector("#last_name");
const phoneInput = document.querySelector("#phone");
const textInput = document.querySelector("#text");
const reportInput = document.querySelector("#report");

const onSubmit = (e) => {
    e.preventDefault();
    //isEmpty
    if (
        !nameInput.value ||
        !lastNameInput.value ||
        !phoneInput.value ||
        !textInput.value ||
        !reportInput.value
    ) {
        console.log("fields empty");
        alert("Please fill out all fields");
        return;
    }

    //isString
    else if (
        !/^[a-zA-Z\s]*$/i.test(nameInput.value) ||
        !/^[a-zA-Z\s]*$/i.test(lastNameInput.value)
    ) {
        alert("Only English letters are allowed");
        console.log("not letters");
        return;
    }

    //validPhone
    else if (!/^\d{10}$/.test(phoneInput.value)) {
        alert("please enter a valid phone number");
        console.log("not valid phone");
    } else {
        fetch(`/formHandler2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameInput.value,
                lastName: lastNameInput.value,
                phone: phoneInput.value,
                text: textInput.value,
                report: reportInput.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.err) {
                    console.log(res);
                    alert(res.err);
                    return;
                } else {
                    alert("created new Request");
                    window.location.reload();
                }
            });
    }
};

myForm.addEventListener("submit", onSubmit);
