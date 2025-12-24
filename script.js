const mealList = document.getElementById("mealList");
const modal = document.getElementById("mealModal");
const mealDetails = document.getElementById("mealDetails");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

async function fetchMeals(foodName = "") {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    mealList.innerHTML = "";

    if (!data.meals) {
        mealList.innerHTML = `<p class="text-center col-span-full">No meals found</p>`;
        return;
    }

    data.meals.forEach(meal => {
        const mealCard = document.createElement("div");
        mealCard.className = "rounded-2xl shadow-lg bg-white mx-2 flex flex-col";

        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" class="w-full h-48 object-cover rounded-t-2xl">
            <h6 class="ml-2 text-xl font-bold">${meal.strMeal}</h6>
            <p class="ml-2 text-sm font-thin">
                ${meal.strInstructions.substring(0, 100)}...
            </p>
            <div class="flex justify-end mb-3 mr-3">
                <button class="view-recipe bg-orange-500 text-white px-4 py-2 mt-2 rounded">
                    View Recipe
                </button>
            </div>
        `;

        mealList.appendChild(mealCard);

        // popup open
        mealCard.querySelector(".view-recipe").addEventListener("click", () => {
            mealDetails.innerHTML = `
                <img src="${meal.strMealThumb}" class="w-full h-56 object-cover rounded-t-xl">
                <h2 class="text-2xl font-bold m-3">${meal.strMeal}</h2>
                <p class="text-sm m-3">${meal.strInstructions}</p>
                <div class="text-right p-3">
                    <button id="closeModal"
                        class="bg-green-500 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </div>
            `;

            modal.classList.remove("invisible", "opacity-0");

            document.getElementById("closeModal").addEventListener("click", () => {
                modal.classList.add("invisible", "opacity-0");
            });
        });
    });
}

searchBtn.addEventListener("click", () => {
    const searchValue = searchInput.value.trim();
    fetchMeals(searchValue);
});

fetchMeals(); // loads all meals initially

const scrlBtn = document.querySelector("#scrlBtn");

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 100) {
        scrlBtn.style.opacity = "1";
        scrlBtn.style.visibility = "visible";
    } else {
        scrlBtn.style.opacity = "0";
        scrlBtn.style.visibility = "hidden";
    }
});

scrlBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


