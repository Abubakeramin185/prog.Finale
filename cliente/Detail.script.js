   const params = new URLSearchParams(window.location.search);
    const hotelId = params.get("id");

    if (!hotelId) {
      alert("ID hotel mancante.");
    } else {
      fetch(`http://localhost:3001/api/hotels/${hotelId}`)
        .then(res => {
          if (!res.ok) throw new Error("Hotel non trovato");
          return res.json();
        })
        .then(hotel => {
          document.getElementById("hotelName").textContent = hotel.name;
          document.getElementById("hotelCity").textContent = hotel.city;
          document.getElementById("hotelPrice").textContent = hotel.price;
          document.getElementById("hotelImage").src = `http://localhost:3001/images/${hotel.image[0]}`;
          document.getElementById("hotelImage").alt = hotel.name;

          const servizi = [];
          if (hotel.wifi) servizi.push("Wi-Fi");
          if (hotel.parking) servizi.push("Parcheggio");
          if (hotel.pool) servizi.push("Piscina");
          document.getElementById("hotelServices").textContent = servizi.join(", ") || "Nessuno";
        })
        .catch(err => {
          alert("Errore nel caricamento dell'hotel.");
          console.error(err);
        });
    }
