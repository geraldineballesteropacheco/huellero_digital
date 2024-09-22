<?php
// Conectar a la base de datos
$servername = "localhost"; // Cambia esto si tu servidor es diferente
$username = "root"; // Cambia esto si tu usuario es diferente
$password = ""; // Cambia esto si tu contraseña es diferente
$dbname = "comentarios_db"; // Nombre de la base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

if (isset($_POST['submit'])) {
  $nombre = $_POST['nombre'];
  $comentario = $_POST['comentario'];
  $imagen = NULL;

  // Manejar la subida de imagen
  if (!empty($_FILES['imagen']['name'])) {
    $directorio = "imagenes/";
    $imagen = $directorio . basename($_FILES["imagen"]["name"]);
    $tipo_imagen = strtolower(pathinfo($imagen, PATHINFO_EXTENSION));

    // Validar si es una imagen
    $check = getimagesize($_FILES["imagen"]["tmp_name"]);
    if ($check !== false) {
      if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $imagen)) {
        echo "La imagen " . htmlspecialchars(basename($_FILES["imagen"]["name"])) . " ha sido subida.";
      } else {
        echo "Hubo un error al subir tu imagen.";
        $imagen = NULL;
      }
    } else {
      echo "El archivo no es una imagen válida.";
      $imagen = NULL;
    }
  }

  // Insertar comentario en la base de datos
  $stmt = $conn->prepare("INSERT INTO comentarios (nombre, comentario, imagen) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $nombre, $comentario, $imagen);

  if ($stmt->execute()) {
    echo "Comentario enviado con éxito.";
  } else {
    echo "Error: " . $stmt->error;
  }

  $stmt->close();
}

$conn->close();
?>

<?php
// Conectar a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "comentarios_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

// Obtener los comentarios
$sql = "SELECT nombre, comentario, imagen, fecha FROM comentarios ORDER BY fecha DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Comentarios</title>
  <style>
    .comentarios-lista {
      width: 100%;
      max-width: 600px;
      margin: auto;
    }
    .comentario {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
    }
    .comentario img {
      max-width: 200px;
      height: auto;
    }
    .comentario h4 {
      margin: 0 0 5px;
    }
  </style>
</head>
<body>

  <div class="comentarios-lista">
    <h2>Comentarios recientes</h2>

    <?php
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        echo "<div class='comentario'>";
        echo "<h4>" . htmlspecialchars($row["nombre"]) . " - " . $row["fecha"] . "</h4>";
        echo "<p>" . htmlspecialchars($row["comentario"]) . "</p>";
        if ($row["imagen"]) {
          echo "<img src='" . htmlspecialchars($row["imagen"]) . "' alt='Imagen del comentario'>";
        }
        echo "</div>";
      }
    } else {
      echo "No hay comentarios.";
    }
    ?>

  </div>

</body>
</html>

<?php
$conn->close();
?>
