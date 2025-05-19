// Generar gráficos estadísticos
function generarGraficos() {
    // Gráfico de estados (simulado)
    const estadosData = [
        { label: 'Finalizadas', value: 24, color: 'var(--success)' },
        { label: 'En Proceso', value: 5, color: 'var(--accent)' },
        { label: 'Activas', value: 8, color: 'var(--warning)' }
    ];
    
    const graficoEstados = document.getElementById('graficoEstados');
    graficoEstados.innerHTML = '';
    
    const maxEstado = Math.max(...estadosData.map(item => item.value));
    
    estadosData.forEach(item => {
        const barra = document.createElement('div');
        barra.className = 'barra';
        barra.style.height = `${(item.value / maxEstado) * 100}%`;
        barra.style.background = item.color;
        
        const barraLabel = document.createElement('div');
        barraLabel.className = 'barra-label';
        barraLabel.textContent = item.label.substring(0, 3);
        
        const barraValue = document.createElement('div');
        barraValue.className = 'barra-value';
        barraValue.textContent = item.value;
        
        barra.appendChild(barraValue);
        barra.appendChild(barraLabel);
        graficoEstados.appendChild(barra);
    });
    
    // Gráfico de evolución mensual (simulado)
    const semanas = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
    const mesActual = [12, 18, 22, 24];
    const mesAnterior = [10, 15, 18, 20];
    
    const graficoEvolucion = document.getElementById('graficoEvolucion');
    graficoEvolucion.innerHTML = '';
    
    const maxEvolucion = Math.max(...mesActual, ...mesAnterior);
    
    semanas.forEach((semana, index) => {
        // Barra mes actual
        const barraActual = document.createElement('div');
        barraActual.className = 'barra';
        barraActual.style.height = `${(mesActual[index] / maxEvolucion) * 100}%`;
        barraActual.style.background = 'var(--accent)';
        barraActual.style.marginRight = '2px';
        
        const barraActualValue = document.createElement('div');
        barraActualValue.className = 'barra-value';
        barraActualValue.textContent = mesActual[index];
        
        const barraActualLabel = document.createElement('div');
        barraActualLabel.className = 'barra-label';
        barraActualLabel.textContent = semana;
        
        barraActual.appendChild(barraActualValue);
        barraActual.appendChild(barraActualLabel);
        
        // Barra mes anterior
        const barraAnterior = document.createElement('div');
        barraAnterior.className = 'barra';
        barraAnterior.style.height = `${(mesAnterior[index] / maxEvolucion) * 100}%`;
        barraAnterior.style.background = '#ddd';
        barraAnterior.style.width = '20px';
        
        const barraAnteriorValue = document.createElement('div');
        barraAnteriorValue.className = 'barra-value';
        barraAnteriorValue.textContent = mesAnterior[index];
        
        barraAnterior.appendChild(barraAnteriorValue);
        
        // Contenedor de barras para esta semana
        const semanaContainer = document.createElement('div');
        semanaContainer.style.display = 'flex';
        semanaContainer.style.alignItems = 'flex-end';
        semanaContainer.style.height = '100%';
        
        semanaContainer.appendChild(barraAnterior);
        semanaContainer.appendChild(barraActual);
        graficoEvolucion.appendChild(semanaContainer);
    });
}
