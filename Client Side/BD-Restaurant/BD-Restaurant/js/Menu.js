import { APiUrl, CurrentCustomer, getCurrentCustomer } from "./Config.js";
import { OrderDTO } from "./DTO.js";
import { ReservatonDTO } from "./DTO.js";

//        Calling all menu

window.onload = function () {
  GetAllMenu();
  GetAllChefs();
};

async function GetAllMenu() {
  try {
    const response = await fetch(APiUrl + "Menu/AllMenu");

    if (response.ok) {
      const responseData = await response.json();
      if (window.location.href.includes("order.html")) {
        displayMenuItemsForOrder(responseData);
      } else {
        displayMenuItems(responseData);
      }

      // displayMenuItems(responseData);
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

// Dynamically create and insert menu items into the HTML with unique IDs
function displayMenuItems(menuItems) {
  const menuContainer = document.querySelector("#food-menu .row"); // This selects the container for the menu items
  console.log("why why");

  let imageCounter = 1;
  // Clear any existing items in the container
  menuContainer.innerHTML = "";

  // Loop through the menu items and add them to the container
  menuItems.forEach((item) => {
    if (item.menuId > 8) {
      return;
    }
    const menuItemHTML = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="single-menu" id="${item.menuId}">
            <img class="img-fluid" src="Images/${imageCounter}.webp"  />
            <h4>${item.menuName}</h4>
            <span>$${item.menuPrice} / Person</span>
            <p>${item.menuDescription}                                                                        
            
            
            </p>
            <a href="order.html">Order Now</a>
          </div>
        </div>
      `;
    imageCounter = imageCounter + 1;
    menuContainer.innerHTML += menuItemHTML;
  });
}

function displayMenuItemsForOrder(menuItems) {
  const menuContainer = document.querySelector(".row");
  let imageCounter = 1;
  // Clear any existing items in the container
  menuContainer.innerHTML = "";

  // Loop through the menu items and add them to the container
  menuItems.forEach((item) => {
    if (item.menuId > 8) {
      return;
    }

    const menuItemHTML = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="single-menu" id="${item.menuId}">
            <img class="img-fluid" src="Images/${imageCounter}.webp"  />
            <h4>${item.menuName}</h4>
            <span>$${item.menuPrice} / Person</span>
            <p>${item.menuDescription}</p>
            <button class="add-to-cart">
              <img src="Images/shopping-cart.png" alt="Order Icon" class="order-icon" />
              Add to Cart
            </button>
          </div>
        </div>
      `;
    imageCounter++;

    menuContainer.innerHTML += menuItemHTML;
  });

  // Attach the event listeners to the add-to-cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Find the menu item associated with this button
      const menuItem = button.closest(".single-menu");
      const menuId = menuItem.id; // Get the ID of the menu item
      const menuName = menuItem.querySelector("h4").innerText;
      const menuPriceText = menuItem.querySelector("span").innerText; // e.g., "$17.99 / Person"
      const menuPrice = parseFloat(menuPriceText.replace(/[^\d.-]/g, "")); // Remove everything except digits, dots, and negative sign

      // Call the addToCart function and pass the menuId, menuName, and menuPrice
      addToCart(menuId, menuName, menuPrice);
    });
  });
}

function validateInput(input) {
  const existingError = input.nextElementSibling;
  if (existingError && existingError.classList.contains("invalid-feedback")) {
    existingError.remove();
  }

  if (input.value.trim() === "") {
    showError(input, `${input.placeholder} is required`);
    return false;
  }

  // Specific validation rules
  switch (input.placeholder.toLowerCase()) {
    case "address":
      if (input.value.length < 5) {
        showError(input, "Please enter a valid address");
        return false;
      }
      break;

    case "city":
      if (input.value.length < 2) {
        showError(input, "Please enter a valid city name");
        return false;
      }
      break;

    case "state":
      if (input.value.length < 2) {
        showError(input, "Please enter a valid state");
        return false;
      }
      break;

    case "zip":
      const zipPattern = /^\d{5}(-\d{4})?$/;
      if (!zipPattern.test(input.value)) {
        showError(input, "Please enter a valid ZIP code");
        return false;
      }
      break;

    case "name on card":
      if (input.value.length < 3) {
        showError(input, "Please enter the full name on card");
        return false;
      }
      break;

    case "credit card number":
      const ccPattern = /^\d{16}$/;
      if (!ccPattern.test(input.value.replace(/\s/g, ""))) {
        showError(input, "Please enter a valid 16-digit card number");
        return false;
      }
      break;

    case "exp month":
      const month = parseInt(input.value);
      if (isNaN(month) || month < 1 || month > 12) {
        showError(input, "Please enter a valid month (1-12)");
        return false;
      }
      break;

    case "exp year":
      const year = parseInt(input.value);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < currentYear || year > currentYear + 10) {
        showError(input, "Please enter a valid expiration year");
        return false;
      }
      break;

    case "cvv":
      const cvvPattern = /^\d{3,4}$/;
      if (!cvvPattern.test(input.value)) {
        showError(input, "Please enter a valid CVV");
        return false;
      }
      break;
  }

  input.classList.remove("is-invalid");
  return true;
}

function showError(input, message) {
  input.classList.add("is-invalid");
  const errorDiv = document.createElement("div");
  errorDiv.className = "invalid-feedback";
  errorDiv.textContent = message;
  input.parentNode.appendChild(errorDiv);
}

function PlaceOrder() {
  const formContainers = document.querySelectorAll(".col-md-6");
  let formIsValid = true;

  formContainers.forEach((container) => {
    const inputs = container.querySelectorAll(".form-control");
    inputs.forEach((input) => {
      if (input.style.visibility !== "hidden" && !validateInput(input)) {
        formIsValid = false;
      }
    });
  });

  if (formIsValid) {
    for (let i = 0; i < orders.length; i++) {
      // console.log(orders[i]);
      AddNewOrder(orders[i]);
    }

    console.log("Order placed successfully!");
    // console.log(orders);
  }

  return formIsValid;
}

// New Order
async function AddNewOrder(order) {
  try {
    const response = await fetch(APiUrl + "Order/NewOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const responseData = await response.json();

      MessegeBox(
        "Your order has been received and is being prepared. It will arrive at your place in just a few minutes. Thank you for choosing us!",
        "order.html"
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

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".form-control");

  inputs.forEach((input) => {
    if (input.style.visibility !== "hidden") {
      input.addEventListener("input", () => validateInput(input));
    }
  });

  const orderBtn = document.getElementById("placeOrderBtn");
  if (orderBtn) {
    if (getCurrentCustomer() === null) {
      MessegeBox(
        "To proceed, please log in or register if you are a new user.",
        "login.html"
      );
    } else {
      orderBtn.addEventListener("click", PlaceOrder);
    }
  }
});

// window.onload = function () {
//   GetAllMenu();
// };

// async function GetAllMenu() {
//   try {
//     const response = await fetch(APiUrl + "Menu/AllMenu");

//     if (response.ok) {
//       const responseData = await response.json();
//       if (window.location.pathname === "/BD-Restaurant/order.html") {
//         displayMenuItemsForOrder(responseData);
//       } else {
//         displayMenuItems(responseData);
//       }

//       // displayMenuItems(responseData);
//     } else if (response.status === 400) {
//       // Handle bad request
//       console.error(`Bad Request: Not accepted Data`);
//     } else if (response.status === 500) {
//       // Handle not found
//       console.error(`Server Side Error: .`);
//       //   alert(`Not Found: Student with ID ${id} not found.`);
//     } else {
//       // Handle other types of errors
//       console.error(`Error: ${response.status} - ${response.statusText}`);
//       alert(`Error: ${response.status} - ${response.statusText}`);
//     }
//   } catch {
//     console.error();
//   }
// }

// Dynamically create and insert menu items into the HTML with unique IDs
// function displayMenuItems(menuItems) {
//   const menuContainer = document.querySelector("#food-menu .row"); // This selects the container for the menu items
//   let imageCounter = 1;
//   // Clear any existing items in the container
//   menuContainer.innerHTML = "";

//   // Loop through the menu items and add them to the container
//   menuItems.forEach((item) => {
//     if (item.menuId > 8) {
//       return;
//     }
//     const menuItemHTML = `
//         <div class="col-sm-6 col-md-4 col-lg-3">
//           <div class="single-menu" id="${item.menuId}">
//             <img class="img-fluid" src="Images/${imageCounter}.webp"  />
//             <h4>${item.menuName}</h4>
//             <span>$${item.menuPrice} / Person</span>
//             <p>${item.menuDescription}

//             </p>
//             <a href="order.html">Order Now</a>
//           </div>
//         </div>
//       `;
//     imageCounter = imageCounter + 1;
//     menuContainer.innerHTML += menuItemHTML;
//   });
// }

// function displayMenuItemsForOrder(menuItems) {
//   const menuContainer = document.querySelector(".row");
//   let imageCounter = 1;
//   // Clear any existing items in the container
//   menuContainer.innerHTML = "";

//   // Loop through the menu items and add them to the container
//   menuItems.forEach((item) => {
//     if (item.menuId > 8) {
//       return;
//     }

//     const menuItemHTML = `
//         <div class="col-sm-6 col-md-4 col-lg-3">
//           <div class="single-menu" id="${item.menuId}">
//             <img class="img-fluid" src="Images/${imageCounter}.webp"  />
//             <h4>${item.menuName}</h4>
//             <span>$${item.menuPrice} / Person</span>
//             <p>${item.menuDescription}</p>
//             <button class="add-to-cart">
//               <img src="Images/shopping-cart.png" alt="Order Icon" class="order-icon" />
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       `;
//     imageCounter++;

//     menuContainer.innerHTML += menuItemHTML;
//   });

//   // Attach the event listeners to the add-to-cart buttons
//   const addToCartButtons = document.querySelectorAll(".add-to-cart");

//   addToCartButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       // Find the menu item associated with this button
//       const menuItem = button.closest(".single-menu");
//       const menuId = menuItem.id; // Get the ID of the menu item
//       const menuName = menuItem.querySelector("h4").innerText;
//       const menuPriceText = menuItem.querySelector("span").innerText; // e.g., "$17.99 / Person"
//       const menuPrice = parseFloat(menuPriceText.replace(/[^\d.-]/g, "")); // Remove everything except digits, dots, and negative sign

//       // Call the addToCart function and pass the menuId, menuName, and menuPrice
//       addToCart(menuId, menuName, menuPrice);
//     });
//   });
// }
// let orders = [];
// let LastTotalPrice;

// function addToCart(menuId, menuName, menuPrice) {
//   let quantity = 1;
//   let totalPrice = menuPrice * quantity;
//   let lastQuantity = totalPrice;

//   const tableBody = document.querySelector("table tbody");

//   // Create a new row
//   const newRow = document.createElement("tr");

//   // Add table cells with data
//   newRow.innerHTML = `
//     <th scope="row">${menuName}</th>
//     <td>$${menuPrice}</td>
//     <td>
//       <div class="quantity">
//         <input type="number" value="${quantity}" min="1" />
//       </div>
//     </td>
//     <td class="total-price">$${totalPrice}</td>
//     <td>
//       <button id="deleteButton">
//         <i class="fa fa-trash-o"></i>
//       </button>
//     </td>
//   `;

//   // Attach event listener to the quantity input field
//   const quantityInput = newRow.querySelector("input[type='number']");
//   quantityInput.addEventListener("input", function (lastQuantity) {
//     // Get the updated quantity
//     const updatedQuantity = parseInt(quantityInput.value) || 1; // Default to 1 if invalid input
//     lastQuantity = updatedQuantity;
//     const updatedTotalPrice = updatedQuantity * menuPrice;
//     totalPrice = parseInt(quantityInput.value) || 1;

//     // Update the total price cell
//     newRow.querySelector(".total-price").innerText = `$${updatedTotalPrice}`;
//   });
//   let order = new OrderDTO(
//     0,
//     menuId,
//     CurrentCustomer.CustomerId,
//     lastQuantity,
//     menuPrice,
//     "Active"
//   );
//   // console.log("Before push:", orders); // Log orders array before pushing
//   orders.push(order);
//   // console.log("After push:", orders);

//   // Attach event listener to the delete button
//   const deleteButton = newRow.querySelector("#deleteButton");
//   deleteButton.addEventListener("click", function () {
//     const row = deleteButton.closest("tr");
//     row.remove(); // Remove the entire row
//   });

//   // Append the new row to the table body

//   console.log(orders);

//   tableBody.appendChild(newRow);
// }

let orders = []; // Array to store order details

function addToCart(menuId, menuName, menuPrice) {
  let quantity = 1;
  let totalPrice = menuPrice * quantity;

  const tableBody = document.querySelector("table tbody");

  // Create a new row
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <th scope="row">${menuName}</th>
    <td>$${menuPrice}</td>
    <td>
      <div class="quantity">
        <input type="number" value="${quantity}" min="1" />
      </div>
    </td>
    <td class="total-price">$${totalPrice}</td>
    <td>
      <button class="deleteButton">
        <i class="fa fa-trash-o"></i>
      </button>
    </td>
  `;

  // Create the order object and push it to the orders array
  const order = new OrderDTO(
    0,
    menuId,
    CurrentCustomer.CustomerId,
    quantity,
    menuPrice,
    "Active"
  );
  orders.push(order);
  console.log("Order added:", orders);

  // Attach event listener to the quantity input field
  const quantityInput = newRow.querySelector("input[type='number']");
  quantityInput.addEventListener("input", function () {
    const updatedQuantity = parseInt(quantityInput.value) || 1; // Default to 1 if invalid input
    order.Quantity = updatedQuantity; // Update the quantity in the order object
    order.TotalPrice = updatedQuantity * menuPrice; // Update the total price
    newRow.querySelector(".total-price").innerText = `$${order.TotalPrice}`; // Update the UI

    console.log("Updated orders:", orders); // Log the updated orders array
  });

  // Attach event listener to the delete button
  const deleteButton = newRow.querySelector(".deleteButton");
  deleteButton.addEventListener("click", function () {
    const rowIndex = Array.from(tableBody.children).indexOf(newRow); // Get the index of the row
    if (rowIndex > -1) {
      orders.splice(rowIndex, 1); // Remove the corresponding order from the array
    }
    newRow.remove(); // Remove the row from the table
    console.log("Order removed:", orders); // Log the updated orders array
  });

  // Append the new row to the table body
  tableBody.appendChild(newRow);
}

// Get the checkout button
const checkoutButton = document.querySelector("#checkout-button");

// Add a click event listener to navigate to the next section
checkoutButton.addEventListener("click", function () {
  // Find the target section by its ID
  const targetSection = document.querySelector("#checkout"); // Replace with your section's ID

  // Scroll to the section
  targetSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll effect
});

//          calling All  Chefs

async function GetAllChefs() {
  try {
    //   const response = await fetch(APiUrl + "Chef/AllChefs");
    const response = await fetch("http://localhost:5127/api/Chef/AllChefs");

    console.log("inside try");

    if (response.ok) {
      const responseData = await response.json();

      // displayMenuItems(responseData);
      displayAllChefs(responseData);
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

// Dynamically create and insert menu items into the HTML with unique IDs
function displayAllChefs(Chefs) {
  const menuContainer = document.querySelector("#team .row"); // This selects the container for the menu items
  let imageCounter = 1;

  // Clear any existing items in the container
  menuContainer.innerHTML = "";
  console.log("inside okay");

  // Loop through the menu items and add them to the container
  Chefs.forEach((chef) => {
    if (chef.chefId === 5) {
      return;
    }

    const menuItemHTML = `
           <div class="col-sm-6 col-md-3">
              <div class="single-team">
                <img src="img/team-${imageCounter}.jpg" alt="" />
                <h4>${chef.fullName}</h4>
                <p>${chef.possotion}</p>
                <ul class="icon">
                  <li><a href="mailto:${chef.gmail}" class="fa fa-google-plus"></a></li>
                </ul>
              </div>
            </div>
        `;

    imageCounter = imageCounter + 1;
    menuContainer.innerHTML += menuItemHTML;
  });
}

// window.onload = function () {
//   GetAllChefs();
//   console.log("after func");
// };
