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

window.onload = function () {
  GetAllChefs();
  console.log("after func");
};
