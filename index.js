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
  `;

  const sortOneButton = $form.querySelector("#sortOne");
  const sortAllButton = $form.querySelector("#sortAll");

  // Add number
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData($form);
    addNumber(data.get("addNumber"), numbers);
  });

  // Sort 1
  sortOneButton.addEventListener("click", () => sortOne(numbers));

  // Sort all
  sortAllButton.addEventListener("click", () => sortAll(numbers));
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
    <div id = "bank"></div>
    <div id = "odds"></div>
    <div id = "evens"></div>
    `;

  // Replace app html with elements
  $app.querySelector("form").replaceWith(bankForm());
  $app.querySelector("#bank").replaceWith(createArrayDiv("Bank", "bank", numbers));
  $app.querySelector("#odds").replaceWith(createArrayDiv("Odds", "odds", odds));
  $app.querySelector("#evens").replaceWith(createArrayDiv("Evens", "evens", evens));
}
render();
