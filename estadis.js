// Datos de asistencia semanal (ejemplo para 350 estudiantes)
const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]; // Días de la semana
const asistencias = [320, 300, 350, 280, 310, 200, 150]; // Número de estudiantes que asistieron cada día

// Configuración del gráfico
const data = {
    labels: labels,
    datasets: [{
        label: 'Número de Estudiantes Asistentes',
        data: asistencias,
        fill: false, // No llenar debajo de la línea
        borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fondo del punto
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color de los puntos
        pointBorderColor: '#fff', // Color del borde del punto
        pointHoverBackgroundColor: '#fff', // Color del punto al hacer hover
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)' // Borde al hacer hover
    }]
};

// Opciones del gráfico
const options = {
    scales: {
        y: {
            beginAtZero: true, // Comenzar el eje Y en 0
            max: 350, // El número máximo de estudiantes
            title: {
                display: true,
                text: 'Estudiantes'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Días de la Semana'
            }
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    return `Asistieron: ${tooltipItem.raw} estudiantes`;
                }
            }
        }
    }
};

// Crear el gráfico lineal
const ctx = document.getElementById('asistenciaSemanaChart').getContext('2d');
const asistenciaSemanaChart = new Chart(ctx, {
    type: 'line', // Tipo de gráfico: línea
    data: data,
    options: options
});
