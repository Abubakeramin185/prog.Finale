//script
document.addEventListener("DOMContentLoaded", () => {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const guestsInput = document.getElementById("guests");
  const pricePerNight = document.getElementById("pricePerNight");
  const totalPrice = document.getElementById("totalPrice");
  const bookNowBtn = document.getElementById("bookNow");
  const click = document.getElementById("clicck")

  // Calcolo del prezzo totale
  function calculateTotal() {
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);
    const nights = (checkout - checkin) / (1000 * 60 * 60 * 24);
    const guests = parseInt(guestsInput.value) || 1;
    const price = parseInt(pricePerNight.textContent);

    if (nights > 0) {
      totalPrice.textContent = nights * price * guests;
    } else {
      totalPrice.textContent = 0;
    }
  }

  checkinInput.addEventListener("change", calculateTotal);
  checkoutInput.addEventListener("change", calculateTotal);
  guestsInput.addEventListener("input", calculateTotal);

  // Intercetta click su "Prenota"
  bookNowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Prenotazione effettuata con successo!");
    // Qui potresti inviare una fetch POST
    /*
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        checkin: checkinInput.value,
        checkout: checkoutInput.value,
        guests: guestsInput.value,
        price: totalPrice.textContent
      })
    })
    .then(res => res.json())
    .then(data => console.log("Prenotazione:", data))
    .catch(err => console.error("Errore:", err));
    */
  });
fetch('http://localhost:3001/api/hotels')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.cards');
    container.innerHTML = ''; // svuota

    data.forEach(hotel => {
      const div = document.createElement("div");
      div.classList.add("card");

      // crea blocco immagini
      const imgBlock = hotel.image.map(imgUrl => 
        `<img src="${imgUrl}" alt="${hotel.name}" style="width: 100%; max-width: 300px; margin: 5px;">`
      ).join('');

      div.innerHTML = `
        ${imgBlock}
        <h3>${hotel.name}</h3>
        <p>${hotel.city} · ${hotel.price}€</p>
      `;

      // div.addEventListener("click", () => {
      //   window.location.href = `/hotel.html?id=${hotel._id}`;
      // });
      div.addEventListener("click", (e) => {
  // Solo se clicco su img o sulla card
  const isImage = e.target.tagName.toLowerCase() === 'img';
  const isCard = e.currentTarget === e.target || isImage;

  if (isCard) {
    window.location.href = `/hotel.html?id=${hotel._id}`;
  }
});


      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Errore nel recupero hotel:", err);
  });
 });

