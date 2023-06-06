function validateNumber() {
  let a =document.querySelector(".height");
  let b =document.querySelector(".weight");
  let number = parseInt(a.value);
  let number2 = parseInt(b.value)

  if (isNaN(number) || number < 130 || number > 240) {
    let error = document.getElementById('errorText');
    error.textContent = 'Please click PREVIOUS and enter a valid measurement for an accurate meal plan.';
  }else if (isNaN(number2) || number2 < 35 || number2 > 140) {
    let error = document.getElementById('errorText');
    error.textContent = 'Please click PREVIOUS and enter a valid measurement for an accurate meal plan.';
  }else {
    let error = document.getElementById('errorText');
    error.textContent = '';
      }
    }

document.querySelector("#hide").addEventListener("click", validateNumber);

function hide() {
  let x = document.querySelector(".box_name");
  x.classList.add('hidden');
  let x1 = document.querySelector(".box_goals");
  x1.classList.remove('hidden');
}

document.querySelector(".box_goals").classList.add('hidden');
document.querySelector("#hide1").addEventListener("click", goals_factor);

function hide1() {
  let x = document.querySelector(".box_goals");
  //x.innerHTML="";
  x.classList.add('hidden');
  let x1 = document.querySelector(".box_active");
  x1.classList.remove('hidden');
}

document.querySelector(".box_active").classList.add('hidden');

function hide2() {
  let x = document.querySelector(".box_active");
  //x.innerHTML="";
  x.classList.add('hidden');
  let x1 = document.querySelector(".box_result");
  x1.classList.remove('hidden');
}

function back() {
  let x = document.querySelector(".box_goals");
  //x.innerHTML="";
  x.classList.add('hidden');
  let x1 = document.querySelector(".box_name");
  x1.classList.remove('hidden');
  let x2 = document.querySelector("#errorText");
  x2.innerHTLM = "";
}

function back1() {
  let x = document.querySelector(".box_active");
  //x.innerHTML="";
  x.classList.add('hidden');
  let x1 = document.querySelector(".box_goals");
  x1.classList.remove('hidden');
}

let goals_fac;

function goals_factor() {
  if (document.querySelector(".goals").value == "lose") {
    goals_fac = 0.85;
  }
  else if (document.querySelector(".goals").value == "maintain") {
    goals_fac = 1.0;
  }
  else if (document.querySelector(".goals").value == "gain") {
    goals_fac = 1.15;
  }
  console.log(goals_fac);
}

let active_fac;

function active_factor() {
  if (document.querySelector(".active").value == "not_active") {
    active_fac = 1;
  }
  else if (document.querySelector(".active").value == "slight_active") {
    active_fac = 1.1;
  }
  else if (document.querySelector(".active").value == "very_active") {
    active_fac = 1.2;
  }
  console.log(active_fac);
}

document.querySelector("#hide2").addEventListener("click", active_factor);

function calculateNutri(height, weight) {
  const calories = (height * weight * goals_fac / 6 * active_fac).toFixed(2);
  const protein = (weight * 2.25).toFixed(2);
  const carbohydrates = (calories * 0.5).toFixed(2);
  const fats = (calories * 0.3).toFixed(2);
  return {
    calories,
    protein,
    carbohydrates,
    fats,
  };
}

function saveNutri(data) {
  localStorage.setItem('nutritionPlan', JSON.stringify(data));
}

function retrieveNutri() {
  const storedData = localStorage.getItem('nutritionPlan');
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return null;
  }
}

function displayResult(data) {
  const name = document.querySelector(".name").value;
  const result = document.querySelector('.box_result');
  const mealPlan = document.querySelector('.mealplan');
  result.innerHTML = `
  <h2>Hey ${name}! These are the nutrients for you to intake each day</h2>
    <p>Calories: ${data.calories}</p>
    <p>Protein: ${data.protein} g</p>
    <p>Carbohydrates: ${data.carbohydrates} g</p>
    <p>Fats: ${data.fats} g</p>`;
  mealPlan.innerHTML = `
    <ul>
      <li>Breakfast: <br><strong>EGG FRIED RICE</strong><br>${(data.calories*2.5/10).toFixed(2)} calories meal, ${(data.protein*1/10).toFixed(2)} g of protein; ${(data.protein*1/10/6).toFixed(2)} eggs scrambled with ${(data.carbohydrates*2.5/10/41).toFixed(2)} grams of rice with an apple. </li><br>
      <span><a href = "https://healthynibblesandbits.com/easiest-egg-fried-rice/" target = "_blank"><img src= "eggfried.jpeg" height = "180"  width = "180" alt="EggFriedRice"></a></span>
      <p><em>Click image above for recipe</em></p><br><br>
      <li>Lunch: <br><strong>SPAGHETTI WITH GROUND BEEF</strong><br>${(data.calories*3/10).toFixed(2)} calories meal, ${(data.protein*2/10).toFixed(2)} g of protein; ${(data.protein*0.35*2/10).toFixed(2)} grams of grounded beef cooked with ${(data.carbohydrates*0.43*3/10).toFixed(2)} grams of spaghetti and a side of salad.</li><br>
      <span><a href = "https://www.gonnawantseconds.com/spaghetti-recipe-with-ground-beef/#wprm-recipe-container-22311" target = "_blank"><img src= "noodles.jpeg" height = "180"  width = "180" alt="SpaghettiWithGroundBeef"></a></span>
      <p><em>Click image above for recipe</em></p><br><br>
      <li>Snack: <br>${(data.calories*1/10).toFixed(2)} calories snack, ${(data.protein*1/20).toFixed(2)} g of protein; ${(data.protein*0.115*1/20).toFixed(2)} grams of edamames, a small bowl of strawberrys, and a glass of milk. </li><br>
      <img src="strawberryEdamame.jpeg" height="180" width = "180" alt="snackHealthy" /><br><br>
      <li>Dinner: <br><strong>HONEY GARLIC CHICKEN</strong><br>${data.calories*3/10} calories meal, ${(data.protein*3.5/10).toFixed(2)} g of protein; ${(data.protein*0.30*3.5/10).toFixed(2)} grams of chicken cooked with honey garlic,a set of ${(data.carbohydrates*2.5/10/41).toFixed(2)} grams of rice.</li><br>
      <span><a href = "https://healthyfitnessmeals.com/honey-garlic-chicken/#recipe" target = "_blank"><img src= "honeychick.jpeg" height = "180"  width = "180" alt="HoneyChickenRice"></a></span>
      <p><em>Click image above for recipe</em></p>
      <br><br>
      <li>Post-workout: <br>${(data.calories*1/10).toFixed(2)} calories, ${(data.protein*3/10).toFixed(2)} g of protein; ${(data.protein*3/10).toFixed(2)} grams of protein powder (check your own protein powder servings *serving might be different*) mixed with a banana and milk.</li>
      <br>
      <img src="proteinshake.jpeg" height="180" width = "180" alt="ProteinShake" />
      </ul>
      `;
  localStorage.setItem('mealPlanData', JSON.stringify(mealPlan.innerHTML));
  mealPlan.classList.add("hidden");
}

document.querySelector('#hide2').addEventListener('click', function(e) {
  e.preventDefault();
  const height = parseFloat(document.querySelector('.height').value).toFixed(2);
  const weight = parseFloat(document.querySelector('.weight').value).toFixed(2);
  console.log(height,weight)
  const nutritionPlan = calculateNutri(height, weight);
  saveNutri(nutritionPlan);

  displayResult(nutritionPlan);
  });

const storedData = retrieveNutri();

let showit = document.querySelector(".showing");
let hideit = document.querySelector(".hiding");
hideit.classList.add('hidden');
hideit.addEventListener("click", hiding);
showit.addEventListener("click", showing);
document.querySelector(".mealandresult").classList.add('hidden');
document.querySelector("#hide2").addEventListener("click", showtheshowing);
showit.classList.add("hidden");
document.querySelector(".seemeal").classList.add("hidden");

function showtheshowing(){
  showit.classList.remove("hidden");
  document.querySelector(".seemeal").classList.remove("hidden");
}

function hiding(){
  let x = document.querySelector(".mealandresult");
  //x.innerHTML="";
  x.classList.add('hidden');
  hideit.classList.add('hidden');
  showit.classList.remove('hidden');

}

function showing(){
  let x = document.querySelector(".mealandresult");
  //x.innerHTML="";
  x.classList.remove('hidden');
  showit.classList.add('hidden');
  hideit.classList.remove('hidden');
  
}

if (storedData) {
  displayResult(storedData);
  }

function restartSurvey(){
  window.location.reload();
}

const date = new Date();
const dateString = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
function updateDate() {
  const dates = document.querySelector('.date');
  if (dates) {
    dates.textContent = dateString;
  }
}
updateDate();