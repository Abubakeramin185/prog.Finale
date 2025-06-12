//script register
  
    document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      let =[fullName, email, password];


      // Esempio chiamata POST al backend (devi avere il server attivo)
      fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullName, email, password })
      })
      .then(res => {
        if (!res.ok) throw new Error("Errore durante la registrazione");
        return res.json();
      })
      .then(data => {
        alert("Registrazione completata!");
        window.location.href = "login.html"; // Redirect al login
      })
      .catch(err => {
        alert("Errore: " + err.message);
      });
    });
  

