// Datos de ejemplo para los días del mes
const infoDias = {
    1: "Evento especial el 1 de septiembre.",
    2: "Reunión importante el 2 de septiembre.",
    3: "Día libre el 3 de septiembre.",
    4: "Clase de yoga el 4 de septiembre.",
    21: "dia del amor y la amistad.",
    14: "antioqueñidad.",
    // Añade más información para otros días según sea necesario
  };
  
  // Modal
  const modal = document.getElementById("modal");
  const modalDia = document.getElementById("modal-dia");
  const modalInfo = document.getElementById("modal-info");
  
  let modalVisible = false;
  
  // Agrega un event listener a cada día
  document.querySelectorAll(".dia").forEach(dia => {
    dia.addEventListener("click", function() {
      const diaNumero = this.getAttribute("data-dia");
      
      if (modalVisible) {
        // Si el modal ya está visible, lo ocultamos
        modal.style.display = "none";
        modalVisible = false;
      } else {
        // Si el modal no está visible, lo mostramos con la información correspondiente
        modalDia.textContent = `Día ${diaNumero}`;
        modalInfo.textContent = infoDias[diaNumero] || "No hay eventos programados para este día.";
        modal.style.display = "flex";  // Mostrar el modal
        modalVisible = true;
      }
    });
  });
  
  // Cerrar el modal si haces clic fuera de él
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalVisible = false;
    }
  };

  
  