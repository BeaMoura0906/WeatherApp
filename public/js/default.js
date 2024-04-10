import "bootstrap";
import "chart.js";

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('addCityButton');
    button.addEventListener('click', function () {
        const addCityForm = document.getElementById('addCityForm');
        addCityForm.style.display = 'block';
        this.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.delete-city-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();

            const cityId = this.getAttribute('data-city-id');
            const isConfirmed = confirm('Êtes-vous sûr de vouloir supprimer cette ville ?');

            if (isConfirmed) {
                window.location.href = `/delete-city/${cityId}`;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('tempChart').getContext('2d');
    
    const labels = weatherData.map(data => new Date(data.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    const temperatures = weatherData.map(data => data.temperature);

    const maxTemperature = Math.max(...temperatures) < 35 ? 35 : Math.max(...temperatures);

    const tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Température (°C)',
                data: temperatures,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 2,
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: maxTemperature,
                    ticks: {
                        callback: function(value) {
                            return value + '°C';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('precipChart').getContext('2d');

    const labels = weatherData.map(data => new Date(data.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    const precipitations = weatherData.map(data => data.precipitation);

    const maxPrecipitation = Math.max(...precipitations) < 50 ? 50 : Math.max(...precipitations);

    const precipChart = new Chart(ctx, {
        type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Précipitations (mm)',
                    data: precipitations,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: maxPrecipitation
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
            }
    });
});