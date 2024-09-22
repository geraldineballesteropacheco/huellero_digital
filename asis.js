document.getElementById('inputExcel').addEventListener('change', handleFile, false);

function handleFile(event) {
    const file = event.target.files[0]; // Obtener el archivo subido
    const reader = new FileReader(); // Crear lector de archivos
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result); // Leer datos en formato binario
        const workbook = XLSX.read(data, { type: 'array' }); // Leer archivo Excel

        // Leer la primera hoja del archivo
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convertir los datos de la hoja a un formato JSON
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Renderizar la tabla en la página
        renderTable(excelData);
    };
    reader.readAsArrayBuffer(file); // Leer archivo como un ArrayBuffer
}

function renderTable(data) {
    const tableHead = document.querySelector("#excelDataTable thead");
    const tableBody = document.querySelector("#excelDataTable tbody");

    // Limpiar la tabla antes de añadir nuevos datos
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    // Añadir encabezado
    const headers = data[0]; // Primera fila del Excel es el encabezado
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
        const headerElement = document.createElement("th");
        headerElement.textContent = headerText;
        headerRow.appendChild(headerElement);
    });
    tableHead.appendChild(headerRow);

    // Añadir datos del Excel
    data.slice(1).forEach(rowData => { // Tomar todas las filas menos la primera (encabezado)
        const row = document.createElement("tr");
        rowData.forEach(cellData => {
            const cell = document.createElement("td");
            cell.textContent = cellData; // Añadir dato de cada celda
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}
