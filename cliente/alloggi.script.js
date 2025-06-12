// Questo scripr per gli alloggi
// document.addEventListener("DOMContentLoaded", () => {
//   const searchInput = document.createElement("input");
//   const priceInput = document.createElement("input");
//   const resetBtn = document.createElement("button");

//   // Stili e attributi
//   searchInput.placeholder = "Cerca per nome...";
//   searchInput.className = "form-control mb-2";
//   priceInput.type = "number";
//   priceInput.placeholder = "Prezzo max (€)";
//   priceInput.className = "form-control mb-2";
//   priceInput.value = "";
//   resetBtn.textContent = "Reset filtri";
//   resetBtn.className = "btn btn-secondary mb-4";

//   const container = document.querySelector("main .container");
//   container.insertBefore(resetBtn, container.children[1]);
//   container.insertBefore(priceInput, container.children[1]);
//   container.insertBefore(searchInput, container.children[1]);

//   function filtra() {
//     const testo = searchInput.value.toLowerCase();
//     const maxPrezzo = parseFloat(priceInput.value);

//     document.querySelectorAll(".card").forEach(card => {
//       const nome = card.querySelector(".card-title").textContent.toLowerCase();
//       const testoPrezzo = card.querySelector(".card-text").textContent;
//       const prezzoMatch = testoPrezzo.match(/€(\d+)/);
//       const prezzo = prezzoMatch ? parseFloat(prezzoMatch[1]) : 0;

//       const mostra = (!testo || nome.includes(testo)) &&
//                      (!maxPrezzo || prezzo <= maxPrezzo);

//       card.parentElement.style.display = mostra ? "block" : "none";
//     });
//   }

//   searchInput.addEventListener("input", filtra);
//   priceInput.addEventListener("input", filtra);
//   resetBtn.addEventListener("click", () => {
//     searchInput.value = "";
//     priceInput.value = "";
//     filtra();
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("main .container");

  // Crea elementi di filtro dinamicamente
  const searchInput = creaInput("text", "Cerca per nome...", "form-control mb-2");
  const priceInput = creaInput("number", "Prezzo max (€)", "form-control mb-2");
  const starSelect = creaSelect(["Tutte", "1", "2", "3", "4", "5"], "Numero di stelle");
  const serviceSelect = creaSelect(["Tutti", "Wi-Fi", "Parcheggio", "Piscina"], "Servizi");
  const sortSelect = creaSelect(["Nessuno", "Prezzo crescente", "Prezzo decrescente"], "Ordina per");
  const resetBtn = document.createElement("button");

  resetBtn.textContent = "Reset filtri";
  resetBtn.className = "btn btn-secondary mb-4";

  // Inserisci filtri nella pagina
  [searchInput, priceInput, starSelect, serviceSelect, sortSelect, resetBtn].reverse().forEach(el => {
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
    const testo = searchInput.value.toLowerCase();
    const maxPrezzo = parseFloat(priceInput.value);
    const stelle = starSelect.querySelector("select").value;
    const servizio = serviceSelect.querySelector("select").value;
    const ordinamento = sortSelect.querySelector("select").value;

    const cards = Array.from(document.querySelectorAll(".card")).map(card => {
      const nome = card.querySelector(".card-title").textContent.toLowerCase();
      const testoPrezzo = card.querySelector(".card-text").textContent;
      const prezzoMatch = testoPrezzo.match(/€(\d+)/);
      const prezzo = prezzoMatch ? parseFloat(prezzoMatch[1]) : 0;
      const stelleMatch = card.getAttribute("data-stelle") || "0";
      const servizi = (card.getAttribute("data-servizi") || "").toLowerCase();

      const mostra =
        (!testo || nome.includes(testo)) &&
        (!maxPrezzo || prezzo <= maxPrezzo) &&
        (stelle === "tutte" || stelle === stelleMatch) &&
        (servizio === "tutti" || servizi.includes(servizio));

      return { card, prezzo, mostra };
    });

    // Ordina le card se richiesto
    if (ordinamento.includes("prezzo")) {
      cards.sort((a, b) =>
        ordinamento === "prezzo crescente" ? a.prezzo - b.prezzo : b.prezzo - a.prezzo
      );
    }

    // Rendi visibili/nascoste e riordina
    const row = container.querySelector(".row");
    row.innerHTML = ""; // pulisce tutto

    cards.forEach(({ card, mostra }) => {
      card.parentElement.style.display = mostra ? "block" : "none";
      row.appendChild(card.parentElement);
    });
  }

  // Event listeners
  [searchInput, priceInput,
   starSelect.querySelector("select"),
   serviceSelect.querySelector("select"),
   sortSelect.querySelector("select")
  ].forEach(el => el.addEventListener("input", filtra));

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    priceInput.value = "";
    starSelect.querySelector("select").value = "tutte";
    serviceSelect.querySelector("select").value = "tutti";
    sortSelect.querySelector("select").value = "nessuno";
    filtra();
    // reindirizza alla home o salva il token se usi auth
        window.location.href = "index.html";
  });

  filtra(); // filtro iniziale
});


