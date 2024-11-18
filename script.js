document.addEventListener("DOMContentLoaded", () => {
  const userTable = document.getElementById("userTable");
  const userForm = document.getElementById("userForm");

  // Fetch users from API and populate table
  async function fetchUsers() {
    const response = await fetch("https://randomuser.me/api/?results=200");
    const data = await response.json();

    data.results.forEach((user) => {
      addUserToTable({
        name: `${user.name.first} ${user.name.last}`,
        gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
        country: user.location.country,
        email: user.email,
        dob: new Date(user.dob.date).toISOString().split("T")[0],
        age: user.dob.age,
      });
    });
  }

  fetchUsers();

  // Add user to table
  function addUserToTable(user) {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${user.name}</td>
              <td>${user.gender}</td>
              <td>${user.country}</td>
              <td>${user.email}</td>
              <td>${user.dob}</td>
              <td>${user.age}</td>
              <td>
                  <button class="btn btn-danger btn-sm delete-btn">Delete</button>
              </td>
          `;

    // Add delete functionality
    row
      .querySelector(".delete-btn")
      .addEventListener("click", () => row.remove());

    userTable.appendChild(row);
  }

  // Handle form submission
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const country = document.getElementById("country").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    const age = document.getElementById("age").value;

    addUserToTable({ name, gender, country, email, dob, age });

    // Reset the form
    userForm.reset();
  });
});
