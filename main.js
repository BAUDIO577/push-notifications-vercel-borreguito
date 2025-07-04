const BACKEND_URL = "https://6345-186-109-226-170.ngrok-free.app";

async function contarTokens() {
  try {
    const res = await fetch(`${BACKEND_URL}/contar-tokens`);
    const data = await res.json();
    document.getElementById("cantidadTokens").innerText = data.total;
  } catch (error) {
    console.error("Error al contar tokens:", error);
    document.getElementById("cantidadTokens").innerText = "⚠️ Error";
  }
}

async function borrarTokens() {
  if (!confirm("¿Seguro que querés borrar todos los tokens?")) return;
  try {
    const res = await fetch(`${BACKEND_URL}/borrar-tokens`, { method: "POST" });
    const data = await res.json();
    alert(data.mensaje || "Tokens borrados");
    contarTokens();
  } catch (error) {
    console.error("Error al borrar tokens:", error);
    alert("❌ No se pudieron borrar los tokens.");
  }
}

async function enviarNotificacion() {
  const titulo = document.getElementById("titulo").value;
  const mensaje = document.getElementById("mensaje").value;

  if (!titulo || !mensaje) {
    alert("Completá título y mensaje.");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/enviar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titulo, body: mensaje }),
    });
    const data = await res.json();
    alert(data.mensaje || "Notificación enviada");
  } catch (error) {
    console.error("Error al enviar notificación:", error);
    alert("❌ No se pudo enviar la notificación.");
  }
}

document.addEventListener("DOMContentLoaded", contarTokens);
