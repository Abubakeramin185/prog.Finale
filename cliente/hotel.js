// const params = new URLSearchParams(window.location.search);
// const id = params.get('id');

// fetch(`http://localhost:3001/api/hotels/${id}`)
//   .then(res => res.json())
//   .then(hotel => {
//     document.getElementById("hotelDetail").innerHTML = `
//       <h2>${hotel.name}</h2>
//       <p>${hotel.city} · ${hotel.price}€</p>
//       ${hotel.image.map(img => `<img src="${img}" style="max-width:300px;">`).join('')}
//     `;
//   })
//   .catch(err => {
//     console.error("Errore nel caricamento hotel:", err);
//   });

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("hotelDetail").innerText = "ID hotel non trovato.";
    return;
  }

  fetch(`http://localhost:3001/api/hotels/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Hotel non trovato");
      }
      return res.json();
    
    })
    .then(hotel => {
      const container = document.getElementById("hotelDetail");

      const html = `
        <h2>${hotel.name}</h2>
        <p><strong>Città:</strong> ${hotel.city}</p>
        <p><strong>Prezzo:</strong> ${hotel.price}€</p>
        <div class="hotel-images">
          ${hotel.image.map(img => `<img src="${img}" alt="${hotel.name}" style="max-width:300px; margin:5px;">`).join('')}
        </div>
      `;

      container.innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("hotelDetail").innerText = "Errore nel caricamento dell’hotel.";
    });
});
