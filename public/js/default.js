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
