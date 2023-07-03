window.onload = async () => {
    const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
        };
    };

    const coords = await getCoords();

    fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=AIzaSyBeKOo9vfkozO_V--JHcnRpWealUVxAG3I&region=IL&language=en`
    )
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            let city = res.plus_code.compound_code
                .replace(",", "")
                .split(" ");
            
                let cityName = '';
                for (let i=1; i<city.length-1; i++) {
                    cityName += city[i] + ' ';
                }

                console.log(decodeURI(cityName?.trim().toLowerCase()));

            fetch(`/SearchEmployeesByLocation?city=${decodeURI(cityName?.trim().toLowerCase())}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        createEmployeesTable(res);
                    } else if (res.error) {
                        console.log(res);
                        alert(res.error);
                    }
                });
        });
};

function createEmployeesTable(res) {
    const cardSearch = document.querySelector(".card-search");
    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Gender</th>
            <th>City</th>
            <th>Seniority</th>
            <th>Hourly Rate</th>
        <tr>
    `;

    var isLoggedIn = !!getCookie("loggedInUser");
    for (let i = 0; i < res.length; i++) {
        const employee = res[i];
        var html = `
            <tr>
                <td>${employee.name ?? ""} ${employee.lastName ?? ""}</td>
                <td>${employee.email ?? ""}</td>
                <td>${employee.gender ?? ""}</td>
                <td>${employee.city ?? ""}</td>
                <td>${employee.Seniority ?? ""}</td>
                <td>${employee.HourlyRate ?? ""}</td>
                <td>`;

        if (isLoggedIn) {
            html += `<button class="show-phone" onclick="showPhone(this, '${employee.phone}')">Show phone</button>`;
        } else {
            html += `<button class="show-phone disabled" disabled>To show the Phone number, Please login first</button>`;
        }

        html += `</td>
            </tr>
        `;
        table.innerHTML += html;
    }

    cardSearch.appendChild(table);
}

function showPhone(elem, phone) {
    elem.outerHTML = `<span>${phone}</span>`;

    fetch(`/addUserSearch`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            employeePhone: phone,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.err) {
                console.log(res);
                alert(res.err);
                return;
            } else {
                console.log("created new Search");
            }
        });
}
