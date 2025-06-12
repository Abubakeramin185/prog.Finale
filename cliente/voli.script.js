//Questo script è per voli
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const partenzaInput = form.querySelector('input[placeholder="Partenza"]');
  const destinazioneInput = form.querySelector('input[placeholder="Destinazione"]');
  const dataInput = form.querySelector('input[type="date"]');
  const resultsDiv = document.querySelector(".results");

  // Dati statici dei voli
  const voliDisponibili = [
    {
      partenza: "Roma",
      destinazione: "Milano",
      data: "2025-06-10",
      prezzo: 89,
    },
    {
      partenza: "Napoli",
      destinazione: "Parigi",
      data: "2025-06-12",
      prezzo: 120,
    },
    {
      partenza: "Milano",
      destinazione: "Londra",
      data: "2025-06-10",
      prezzo: 95,
    },
    {
      partenza: "Roma",
      destinazione: "Londra",
      data: "2025-06-15",
      prezzo: 140,
    },
  ];

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // blocca il comportamento di default del form

    const partenza = partenzaInput.value.trim().toLowerCase();
    const destinazione = destinazioneInput.value.trim().toLowerCase();
    const data = dataInput.value;

    // Filtra voli
    const risultati = voliDisponibili.filter(v =>
      v.partenza.toLowerCase().includes(partenza) &&
      v.destinazione.toLowerCase().includes(destinazione) &&
      v.data === data
    );

    // Mostra risultati
    resultsDiv.innerHTML = "";
    if (risultati.length === 0) {
      resultsDiv.innerHTML = "<p>Nessun volo trovato.</p>";
    } else {
      risultati.forEach(v => {
        const p = document.createElement("p");
        p.textContent = `Volo ${v.partenza} - ${v.destinazione} (${v.data}): €${v.prezzo}`;
        resultsDiv.appendChild(p);
      });
    }
  });
});

