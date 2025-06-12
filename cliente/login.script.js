//login script
document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Invia i dati al backend (devi avere il server attivo con questa route)
      fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      .then(res => {
        if (!res.ok) throw new Error("Credenziali errate");
        return res.json();
      })
      .then(data => {
        alert("Login effettuato!");
        // reindirizza alla home o salva il token se usi auth
        window.location.href = "index.html";
      })
      .catch(err => {
        alert("Errore di login: " + err.message);
      });
    });