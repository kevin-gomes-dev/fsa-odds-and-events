// === state ===
const numbers = [];
const odds = [];
const evens = [];

// Functionality is LIFO (stack)! Can only get and add onto top :O
// Using shift and unshift instead of pop and push

/**
 * Adds a number to an array
 * @param {number} n Number to add into numbers state var
 * @param {number[]} arr The array to put values into
 */
function addNumber(n, arr) {
  if (n && arr) {
    arr.unshift(n);
    render();
  }
}

/**
 * Adds a random number to array between -1,000,000 (incl) and 1,000,000 (ex)
 * @param {number[]} arr
 */
function addRandomNumber(arr) {
  addNumber(Math.floor(Math.random() * (1000000 - -1000000) + -1000000), arr);
}

/**
 * Sorts a number from given array, unshifting into resspective odd/even array
 * Possibly calls a render
 * @param {number[]} arr
 */
function sortOne(arr) {
  if (arr.length > 0) {
    const elem = arr.shift();
    elem % 2 === 0 ? evens.unshift(elem) : odds.unshift(elem);
    render();
  }
}

/**
 * Sorts all numbers from given array, unshifting into respective odd/even array
 * Possibly calls a render
 * @param {number[]} arr
 */
function sortAll(arr) {
  if (arr.length === 0) return;
  while (arr.length > 0) {
    sortOne(arr);
  }
  render();
}

/**
 * Sorts n numbers from array into odds or evens
 * @param {number} n
 * @param {number[]} arr
 */
function sortNTimes(n, arr) {
  if (arr.length === 0) return;
  // Either go to n or the arr length depending on what's smaller
  n = Math.min(n, arr.length);
  for (let i = 0; i < n; i++) {
    sortOne(arr);
  }
  render();
}

/**
 * Create and return an HTML form with buttons Add number, Sort 1 and Sort all
 * Also adds event listeners to the form buttons
 * @returns {HTMLFormElement} The form
 */
function bankForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add any number to the number bank -->
      <input name="addNumber" type="number" />
    </label>
    <button>Add number</button>
    <button id = "sortOne">Sort 1</button>
    <button id = "sortAll">Sort All</button>
    <button id = "randomNum">Add Random</button>
  `;

  const sortOneButton = $form.querySelector("#sortOne");
  const sortAllButton = $form.querySelector("#sortAll");
  const addRandomButton = $form.querySelector("#randomNum");

  // Add number
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData($form);
    addNumber(data.get("addNumber"), numbers);
  });

  sortOneButton.addEventListener("click", () => sortOne(numbers));
  sortAllButton.addEventListener("click", () => sortAll(numbers));
  addRandomButton.addEventListener("click", () => addRandomNumber(numbers));
  return $form;
}

/**
 * Create and return an HTML form for sorting n amount of times
 */
function sortNTimesForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
  <label> Amount of times to sort -->
  <input name="sortN" type="number" />
  </label>
  <button>Execute Sort</button>
  `;
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const numSort = Number(new FormData($form).get("sortN"));
    sortNTimes(numSort, numbers);
  });
  return $form;
}

/**
 * Create and return a div whose sole p tag is space seperated elements of given array
 * @param {string} title The h2 text
 * @param {string} id The id of this particular div
 * @param {any[]} arr The array to fill the div with
 * @returns {HTMLDivElement} The div created
 */
function createArrayDiv(title, id, arr) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const h2 = document.createElement("h2");

  div.className = "box";
  div.id = id;

  arr.forEach((item) => (p.textContent += item + " "));
  h2.textContent = title;
  div.append(h2, p);
  return div;
}

/**
 * Renders the whole page.
 */
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Even(t)s</h1>
    <form></form>
    <form></form>
    <div id = "bank"></div>
    <div id = "odds"></div>
    <div id = "evens"></div>
    `;

  // Replace app html with elements
  const $forms = $app.querySelectorAll("form");
  $forms[0].replaceWith(bankForm());
  $forms[1].replaceWith(sortNTimesForm());
  $app.querySelector("#bank").replaceWith(createArrayDiv("Bank", "bank", numbers));
  $app.querySelector("#odds").replaceWith(createArrayDiv("Odds", "odds", odds));
  $app.querySelector("#evens").replaceWith(createArrayDiv("Evens", "evens", evens));
}
render();
