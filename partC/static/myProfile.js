const details = document.getElementById("details");
const searches = document.getElementById("searches");

var loggedInUserCookie = getCookie("loggedInUser");
if (loggedInUserCookie) {
    var loggedInUser = JSON.parse(loggedInUserCookie.slice(2));
    details.innerHTML = `
        <div>
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" value="${loggedInUser.userName}" readonly />
        </div>

        <div>
            <label for="fullname">Fullname:</label>
            <input type="text" name="fullname" id="fullname" value="${loggedInUser.name} ${loggedInUser.lastName}" readonly />
        </div>

        <div>
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" value="${loggedInUser.email}" readonly />
        </div>

        <div>
            <label for="gender">Gender:</label>
            <input type="text" name="gender" id="gender" value="${loggedInUser.gender}" readonly />
        </div>

        <div>
            <label for="phone">Phone:</label>
            <input type="tel" name="phone" id="phone" value="${loggedInUser.phone}" readonly />
        </div>

        <div>
            <label for="city">City:</label>
            <input type="text" name="city" id="city" value="${loggedInUser.city}" readonly />
        </div>
    `;

    fetch(`/SearchByUserPhone`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                createSearchesTable(res);
            } else if (res.error) {
                console.log(res);
                alert(res.error);
                return;
            }
        });
}

function createSearchesTable(res) {
    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>City</th>
            <th>Seniority</th>
            <th>Hourly Rate</th>
        <tr>
    `;

    for (let i = 0; i < res.length; i++) {
        const employee = res[i];
        var html = `
            <tr>
                <td>${employee.name ?? ""} ${employee.lastName ?? ""}</td>
                <td>${employee.email ?? ""}</td>
                <td>${employee.gender ?? ""}</td>
                <td>${employee.employeePhone ?? ""}</td>
                <td>${employee.city ?? ""}</td>
                <td>${employee.Seniority ?? ""}</td>
                <td>${employee.HourlyRate ?? ""}</td>
            </tr>
        `;
        table.innerHTML += html;
    }

    searches.appendChild(table);
}
