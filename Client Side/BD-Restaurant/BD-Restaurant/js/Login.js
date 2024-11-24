import { getCurrentCustomer, setCurrentCustomer } from "./Config.js";
import { CustomerDTO } from "./DTO.js";
import { APiUrl } from "./Config.js";

document
  .getElementById("registerButton")
  .addEventListener("click", RegisterCustomer);

document
  .getElementById("LoginButton")
  .addEventListener("click", LoginCustomerAccount);

async function RegisterCustomer() {
  event.preventDefault();

  try {
    const customer = new CustomerDTO();

    customer.Gmail = document.getElementById("Gmail").value;
    customer.FullName = document.getElementById("FullName").value;
    customer.Passaword = document.getElementById("Password").value;

    const response = await fetch(APiUrl + "Customer/NewCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (response.ok) {
      const responseData = await response.json();

      MessegeBox(
        "Successfully registered! Now log in with your email and password.",
        "login.html"
      );
    } else if (response.status === 400) {
      // Handle bad request
      console.error(`Bad Request: Not accepted Data`);
    } else if (response.status === 500) {
      // Handle not found
      console.error(`Server Side Error: .`);
      //   alert(`Not Found: Student with ID ${id} not found.`);
    } else {
      // Handle other types of errors
      console.error(`Error: ${response.status} - ${response.statusText}`);
      alert(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch {
    console.error();
  }
}

async function LoginCustomerAccount() {
  try {
    let customer = new CustomerDTO();

    const Gmail = document.getElementById("loginGmail").value;
    const Passaword = document.getElementById("loginPassword").value;

    const response = await fetch(APiUrl + `Customer/${Gmail}/${Passaword}`);

    if (response.ok) {
      const responseData = await response.json();

      customer.CustomerId = responseData.customerId;
      customer.PersonId = responseData.personId;
      customer.FullName = responseData.fullname;
      customer.Gmail = responseData.gmail;
      customer.Passaword = responseData.passaword;

      setCurrentCustomer(customer);

      MessegeBox(
        "Login successful! Enjoy discovering the delights of our restaurant.",
        "index.html"
      );
    } else if (response.status === 400) {
      // Handle bad request
      console.error(`Bad Request: Not accepted Data`);
    } else if (response.status === 500) {
      // Handle not found
      console.error(`Server Side Error: .`);
      //   alert(`Not Found: Student with ID ${id} not found.`);
    } else {
      // Handle other types of errors
      console.error(`Error: ${response.status} - ${response.statusText}`);
      alert(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch {
    console.error();
  }
}

function MessegeBox(message, landingPageLink) {
  const modal = document.getElementById("successModal");
  const okButton = document.getElementById("modalOkButton");
  const messageElement = modal.querySelector("p"); // Assuming the <p> tag is inside the modal

  // Set the message inside the <p> tag
  messageElement.textContent = message;

  // Show the modal
  modal.style.display = "block";

  // Handle the OK button click
  okButton.onclick = function () {
    modal.style.display = "none";
    window.location.href = landingPageLink; // Redirect to the login page
  };
}
