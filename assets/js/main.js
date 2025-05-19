// Variables globales
let currentTipoCliente = '';
let currentOfertaId = '';
let currentOfertaData = null;

// Inicializar ofertas si no existen
if (!sessionStorage.getItem('ofertas')) {
    sessionStorage.setItem('ofertas', JSON.stringify([]));
}

// Actualizar contadores al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la vista de inicio por defecto
    showView('inicio');
    actualizarContadores();
    generarGraficos();
});

// Control del sidebar en móviles
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('visible');
}

function hideSidebar() {
    document.getElementById('sidebar').classList.remove('visible');
}

// Navegación entre vistas
function showView(view) {
    // Ocultar todas las vistas primero
    document.getElementById('inicioView').style.display = 'none';
    document.getElementById('gestionCargaView').style.display = 'none';
    document.getElementById('formView').style.display = 'none';
    document.getElementById('ofertasActivasView').style.display = 'none';
    document.getElementById('formTercerosView').style.display = 'none';
    
    // Mostrar la vista seleccionada
    if (view === 'inicio') {
        document.getElementById('inicioView').style.display = 'block';
        // Quitar activo de todos los items del menú
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        // Generar gráficos cada vez que se muestra la vista de inicio
        generarGraficos();
    } 
    else if (view === 'gestion-carga') {
        document.getElementById('gestionCargaView').style.display = 'block';
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.menu-item')[0].classList.add('active');
        actualizarContadores();
    } 
    else if (view === 'form') {
        document.getElementById('formView').style.display = 'block';
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.menu-item')[0].classList.add('active');
    } 
    else if (view === 'ofertas-activas') {
        document.getElementById('ofertasActivasView').style.display = 'block';
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.menu-item')[0].classList.add('active');
        cargarOfertasActivas();
    }
    else if (view === 'form-terceros') {
        document.getElementById('formTercerosView').style.display = 'block';
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.menu-item')[0].classList.add('active');
    }
    
    // Ocultar sidebar en móviles después de seleccionar
    if (window.innerWidth <= 992) {
        hideSidebar();
    }
}

// Cerrar sidebar al hacer clic fuera en móviles
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 992 && 
        !sidebar.contains(event.target) && 
        event.target !== menuBtn) {
        hideSidebar();
    }
});
