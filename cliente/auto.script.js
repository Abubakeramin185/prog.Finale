//Questo script è per l'auto noleggio
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("main .container");

  // Crea gli elementi filtro
  const brandInput = creaInput("text", "Cerca marca...", "form-control mb-2");
  const priceInput = creaInput("number", "Prezzo max (€)", "form-control mb-2");
  const cambioSelect = creaSelect(["Tutti", "Manuale", "Automatico"], "Tipo di cambio");
  const sortSelect = creaSelect(["Nessuno", "Prezzo crescente", "Prezzo decrescente"], "Ordina per");
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset filtri";
  resetBtn.className = "btn btn-secondary mb-4";

  // Inserisci filtri nella pagina
  [brandInput, priceInput, cambioSelect, sortSelect, resetBtn].reverse().forEach(el => {
    container.insertBefore(el, container.children[1]);
  });

  function creaInput(type, placeholder, className) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.className = className;
    return input;
  }

  function creaSelect(options, labelText) {
    const label = document.createElement("label");
    label.className = "form-label mt-2";
    label.textContent = labelText;
    const select = document.createElement("select");
    select.className = "form-select mb-2";
    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.toLowerCase();
      option.textContent = opt;
      select.appendChild(option);
    });
    label.appendChild(select);
    return label;
  }

  function filtra() {
    const brand = brandInput.value.toLowerCase();
    const maxPrezzo = parseFloat(priceInput.value);
    const cambio = cambioSelect.querySelector("select").value;
    const ordinamento = sortSelect.querySelector("select").value;

    const cards = Array.from(document.querySelectorAll(".card")).map(card => {
      const nome = card.querySelector(".card-title").textContent.toLowerCase();
      const prezzoMatch = card.querySelector(".card-text").textContent.match(/€(\d+)/);
      const prezzo = prezzoMatch ? parseFloat(prezzoMatch[1]) : 0;
      const tipoCambio = (card.getAttribute("data-cambio") || "").toLowerCase();

      const mostra =
        (!brand || nome.includes(brand)) &&
        (!maxPrezzo || prezzo <= maxPrezzo) &&
        (cambio === "tutti" || tipoCambio === cambio);

      return { card, prezzo, mostra };
    });

    // Ordinamento
    if (ordinamento.includes("prezzo")) {
      cards.sort((a, b) =>
        ordinamento === "prezzo crescente" ? a.prezzo - b.prezzo : b.prezzo - a.prezzo
      );
    }

    const row = container.querySelector(".row");
    row.innerHTML = "";

    cards.forEach(({ card, mostra }) => {
      card.parentElement.style.display = mostra ? "block" : "none";
      row.appendChild(card.parentElement);
    });
  }

  [brandInput, priceInput,
   cambioSelect.querySelector("select"),
   sortSelect.querySelector("select")
  ].forEach(el => el.addEventListener("input", filtra));

  resetBtn.addEventListener("click", () => {
    brandInput.value = "";
    priceInput.value = "";
    cambioSelect.querySelector("select").value = "tutti";
    sortSelect.querySelector("select").value = "nessuno";
    filtra();
  });

  filtra();
});

