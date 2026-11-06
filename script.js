const productForm = document.querySelector("#product-form");
const productNameInput = document.querySelector("#product-name");
const productQuantityInput = document.querySelector("#product-quantity");
const productList = document.querySelector("#product-list");
const productCount = document.querySelector("#product-count");
const unitCount = document.querySelector("#unit-count");
const listCount = document.querySelector("#list-count");
const formMessage = document.querySelector("#form-message");

function updateSummary() {
  const rows = [...productList.querySelectorAll("tr")];
  const totalUnits = rows.reduce((total, row) => {
    const quantity = Number(row.dataset.quantity);
    return total + quantity;
  }, 0);

  productCount.textContent = rows.length;
  unitCount.textContent = totalUnits;
  listCount.textContent = `${rows.length} ${rows.length === 1 ? "producto" : "productos"}`;
}

productList.querySelectorAll("tr").forEach((row) => {
  const quantityText = row.querySelector(".quantity-pill").textContent;
  row.dataset.quantity = Number.parseInt(quantityText, 10);
});

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = productNameInput.value.trim();
  const quantity = Number(productQuantityInput.value);

  if (!name || !Number.isInteger(quantity) || quantity < 1) {
    formMessage.textContent = "Escribe un nombre y una cantidad entera mayor que cero.";
    return;
  }

  const row = document.createElement("tr");
  row.dataset.quantity = quantity;

  const nameCell = document.createElement("td");
  nameCell.className = "product-cell";
  const dot = document.createElement("span");
  dot.className = "product-dot product-dot--blue";
  dot.setAttribute("aria-hidden", "true");
  nameCell.append(dot, document.createTextNode(name));

  const quantityCell = document.createElement("td");
  const quantityPill = document.createElement("span");
  quantityPill.className = "quantity-pill";
  quantityPill.textContent = `${quantity} ${quantity === 1 ? "unidad" : "unidades"}`;
  quantityCell.append(quantityPill);

  row.append(nameCell, quantityCell);
  productList.append(row);
  updateSummary();
  formMessage.textContent = `Se registró "${name}" correctamente.`;
  productForm.reset();
  productNameInput.focus();
});

updateSummary();
