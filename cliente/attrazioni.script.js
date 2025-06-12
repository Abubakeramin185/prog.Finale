//Questo è per script attrizioni
document.addEventListener("DOMContentLoaded", () => {
  // Crea elementi input per i filtri
  const container = document.querySelector(".container");
  const filtersDiv = document.createElement("div");
  filtersDiv.classList.add("mb-4");

  const inputCitta = document.createElement("input");
  inputCitta.type = "text";
  inputCitta.placeholder = "Filtra per città (es. Roma)";
  inputCitta.classList.add("form-control", "mb-2");

  const inputPrezzo = document.createElement("input");
  inputPrezzo.type = "number";
  inputPrezzo.placeholder = "Prezzo massimo (€)";
  inputPrezzo.classList.add("form-control", "mb-2");

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.classList.add("btn", "btn-secondary", "mb-3");

  filtersDiv.appendChild(inputCitta);
  filtersDiv.appendChild(inputPrezzo);
  filtersDiv.appendChild(resetBtn);

  container.insertBefore(filtersDiv, container.children[1]);

  const cards = document.querySelectorAll(".card");

  function filtra() {
    const cittaFiltro = inputCitta.value.trim().toLowerCase();
    const prezzoFiltro = parseFloat(inputPrezzo.value);

    cards.forEach(card => {
      const citta = card.dataset.citta?.toLowerCase() || "";
      const prezzo = parseFloat(card.dataset.prezzo || "0");

      const matchCitta = !cittaFiltro || citta.includes(cittaFiltro);
      const matchPrezzo = isNaN(prezzoFiltro) || prezzo <= prezzoFiltro;

      card.parentElement.style.display = matchCitta && matchPrezzo ? "block" : "none";
    });
  }

  inputCitta.addEventListener("input", filtra);
  inputPrezzo.addEventListener("input", filtra);
  resetBtn.addEventListener("click", () => {
    inputCitta.value = "";
    inputPrezzo.value = "";
    filtra();
  });

  filtra(); // Avvio iniziale
});
