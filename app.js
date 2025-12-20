const foodList = document.getElementById("foodList");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

const topBtn = document.getElementById("topBtn");

/* ---------------------------
   PAGE LOAD
---------------------------- */
window.addEventListener("DOMContentLoaded", loadAllMeals);

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function loadAllMeals() {
  showLoading();
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((res) => res.json())
    .then((data) => {
      displayMeals(data.meals);
      hideLoading();
    });
}

/* ---------------------------
   SEARCH
---------------------------- */
searchBtn.addEventListener("click", () => {
  const value = searchInput.value.trim();

  showLoading();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    .then((res) => res.json())
    .then((data) => {
      displayMeals(data.meals);
      hideLoading();
    });
});

/* ---------------------------
   DISPLAY MEALS
---------------------------- */
function displayMeals(meals) {
  foodList.innerHTML = "";

  if (!meals) {
    foodList.innerHTML = `
      <p class="col-span-full text-center text-red-500">
        No recipe found
      </p>`;
    return;
  }

  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow hover:shadow-lg transition";

    card.innerHTML = `
      <img src="${meal.strMealThumb}"
        class="rounded-t-lg h-40 w-full object-cover">

      <div class="p-4">
        <h3 class="font-semibold text-lg">${meal.strMeal}</h3>
        <p class="text-sm text-gray-500 mb-3">
          ${meal.strInstructions.slice(0, 60)}...
        </p>
        <button
          class="bg-orange-500 text-white px-4 py-2 rounded text-sm"
          onclick="loadDetails('${meal.idMeal}')">
          View Details
        </button>
      </div>
    `;

    foodList.appendChild(card);
  });
}

/* ---------------------------
   DETAILS (FIXED)
---------------------------- */
function loadDetails(id) {
  showLoading();
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      showDetails(data.meals[0]);
      hideLoading();
    });
}

function showDetails(meal) {
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  modalContent.innerHTML = `
    <h2 class="text-2xl font-bold mb-3">${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" class="rounded mb-4">
    <p class="text-gray-700 text-sm">${meal.strInstructions}</p>
  `;
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
// ENTER KEY SEARCH
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

/* ---------------------------
   BACK TO TOP
---------------------------- */
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.classList.remove("hidden");
  } else {
    topBtn.classList.add("hidden");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
