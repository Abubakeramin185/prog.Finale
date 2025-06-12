//script
document.addEventListener("DOMContentLoaded", () => {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const guestsInput = document.getElementById("guests");
  const pricePerNight = document.getElementById("pricePerNight");
  const totalPrice = document.getElementById("totalPrice");
  const bookNowBtn = document.getElementById("bookNow");

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

  // Simula fetch offerte popolari
  fetch('offerte.json')
    .then(res => res.json())
    .then(data => {
      const cardsContainer = document.querySelector(".cards");
      cardsContainer.innerHTML = ""; // svuota prima
      data.forEach(offer => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <img src="${offer.img}" alt="${offer.city}" />
          <h3>${offer.city}</h3>
          <p>${offer.strutture} strutture</p>
        `;
        cardsContainer.appendChild(div);
      });
    })
    .catch(err => console.error("Errore caricamento offerte:", err));
});






//   document.addEventListener("DOMContentLoaded", function () {
//     const checkinInput = document.getElementById("checkin");
//     const checkoutInput = document.getElementById("checkout");
//     const guestsInput = document.getElementById("guests");
//     const pricePerNight = parseFloat(document.getElementById("pricePerNight").textContent);
//     const totalPriceDisplay = document.getElementById("totalPrice");
//     const bookNowButton = document.getElementById("bookNow");

//     let  fullName =[];
//     let userName = [];
//     let email = [];
//     let password = [];

//     function calculateNights() {
//       const checkin = new Date(checkinInput.value);
//       const checkout = new Date(checkoutInput.value);
//       const timeDiff = checkout - checkin;
//       const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//       return nights > 0 ? nights : 0;
//     }
// //La funzione fetch

//  fetch('http://localhost:3001/api/auth/register', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     fullname: fullName,
//                     username: userName,
//                     email: email,
//                     password: password
//                 }),
//                 headers: {
//                     'Content-type': 'application/json; charset=UTF-8',
//                 },
//                 })
//                 .then((response) => response.json())
//                 .then((json) => console.log(json));
//         })





//     function updateTotalPrice() {
//       const nights = calculateNights();
//       const guests = parseInt(guestsInput.value, 10);
//       const total = nights * pricePerNight * guests;
//       totalPriceDisplay.textContent = total.toFixed(2);
//     }

//     checkinInput.addEventListener("change", updateTotalPrice);
//     checkoutInput.addEventListener("change", updateTotalPrice);
//     guestsInput.addEventListener("input", updateTotalPrice);

//     bookNowButton.addEventListener("click", function (e) {
//       e.preventDefault(); // Evita l'invio del form

//       const nights = calculateNights();
//       const guests = parseInt(guestsInput.value, 10);

//       if (!checkinInput.value || !checkoutInput.value || nights <= 0) {
//         alert("Per favore inserisci date valide.");
//         return;
//       }

//       if (guests < 1 || isNaN(guests)) {
//         alert("Inserisci almeno 1 ospite.");
//         return;
//       }

//       alert("Prenotazione completata!\nPrezzo totale: " + totalPriceDisplay.textContent + "€");
//     });
  

