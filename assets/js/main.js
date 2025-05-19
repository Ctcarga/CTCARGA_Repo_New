function generarGraficos() {
    // Gráfico de estados
    const estadosData = [
        { label: 'Finalizadas', value: 24, color: '#2ecc71' },
        { label: 'En Proceso', value: 5, color: '#3498db' }
    ];

    const graficoEstados = document.getElementById('graficoEstados');
    graficoEstados.innerHTML = '';

    estadosData.forEach(item => {
        const barra = document.createElement('div');
        barra.className = 'barra';
        barra.style.height = `${item.value * 5}px`;
        barra.style.background = item.color;
        graficoEstados.appendChild(barra);
    });
}

// Mostrar vista inicial
function showView(view) {
    document.getElementById('inicioView').style.display = view === 'inicio' ? 'block' : 'none';
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    generarGraficos();
});
