// Datos de vehículos desde el CSV (convertido a JSON)
const vehiculosData = [
    {tipo: "Van de carga", config: "1 eje", carroceria: "Panel cerrado", capacidad: "1"},
    {tipo: "Van de carga", config: "1 eje", carroceria: "Panel refrigerado", capacidad: "1"},
    {tipo: "Camión liviano (tipo Turbo)", config: "1 eje", carroceria: "Furgón cerrado", capacidad: "3,5"},
    {tipo: "Camión liviano (tipo Turbo)", config: "1 eje", carroceria: "Estacas", capacidad: "3,5"},
    {tipo: "Camión liviano (tipo Turbo)", config: "1 eje", carroceria: "Refrigerado", capacidad: "3,5"},
    {tipo: "Camión rígido", config: "2 ejes", carroceria: "Furgón cerrado", capacidad: "7"},
    {tipo: "Camión rígido", config: "2 ejes", carroceria: "Estacas", capacidad: "7"},
    {tipo: "Camión rígido", config: "2 ejes", carroceria: "Plataforma", capacidad: "7"},
    {tipo: "Camión rígido", config: "2 ejes", carroceria: "Volco (volquete)", capacidad: "7"},
    {tipo: "Camión rígido", config: "2 ejes", carroceria: "Tanque (cisterna)", capacidad: "7"},
    {tipo: "Camión rígido", config: "2 ejes", carroceria: "Refrigerado", capacidad: "7"},
    {tipo: "Camión rígido", config: "3 ejes", carroceria: "Furgón cerrado", capacidad: "12"},
    {tipo: "Camión rígido", config: "3 ejes", carroceria: "Estacas", capacidad: "12"},
    {tipo: "Camión rígido", config: "3 ejes", carroceria: "Plataforma", capacidad: "12"},
    {tipo: "Camión rígido", config: "3 ejes", carroceria: "Volco (volquete)", capacidad: "12"},
    {tipo: "Camión rígido", config: "3 ejes", carroceria: "Tanque (cisterna)", capacidad: "12"},
    {tipo: "Camión rígido", config: "3 ejes", carroceria: "Refrigerado", capacidad: "12"},
    {tipo: "Remolque", config: "R2", carroceria: "Furgón cerrado", capacidad: "18"},
    {tipo: "Remolque", config: "R2", carroceria: "Plataforma", capacidad: "18"},
    {tipo: "Remolque", config: "R2", carroceria: "Tanque (cisterna)", capacidad: "18"},
    {tipo: "Remolque", config: "R2", carroceria: "Refrigerado", capacidad: "18"},
    {tipo: "Tractocamión", config: "2S1", carroceria: "Furgón cerrado", capacidad: "20"},
    {tipo: "Tractocamión", config: "2S1", carroceria: "Plataforma", capacidad: "20"},
    {tipo: "Tractocamión", config: "2S1", carroceria: "Tanque (cisterna)", capacidad: "20"},
    {tipo: "Tractocamión", config: "2S1", carroceria: "Refrigerado", capacidad: "20"},
    {tipo: "Semirremolque", config: "S1", carroceria: "Furgón cerrado", capacidad: "20"},
    {tipo: "Semirremolque", config: "S1", carroceria: "Plataforma", capacidad: "20"},
    {tipo: "Semirremolque", config: "S1", carroceria: "Tanque (cisterna)", capacidad: "20"},
    {tipo: "Semirremolque", config: "S1", carroceria: "Refrigerado", capacidad: "20"},
    {tipo: "Remolque", config: "R3", carroceria: "Furgón cerrado", capacidad: "24"},
    {tipo: "Remolque", config: "R3", carroceria: "Plataforma", capacidad: "24"},
    {tipo: "Remolque", config: "R3", carroceria: "Tanque (cisterna)", capacidad: "24"},
    {tipo: "Remolque", config: "R3", carroceria: "Refrigerado", capacidad: "24"},
    {tipo: "Tractocamión", config: "2S2", carroceria: "Furgón cerrado", capacidad: "25"},
    {tipo: "Tractocamión", config: "2S2", carroceria: "Plataforma", capacidad: "25"},
    {tipo: "Tractocamión", config: "2S2", carroceria: "Tanque (cisterna)", capacidad: "25"},
    {tipo: "Tractocamión", config: "2S2", carroceria: "Refrigerado", capacidad: "25"},
    {tipo: "Semirremolque", config: "S2", carroceria: "Furgón cerrado", capacidad: "25"},
    {tipo: "Semirremolque", config: "S2", carroceria: "Plataforma", capacidad: "25"},
    {tipo: "Semirremolque", config: "S2", carroceria: "Tanque (cisterna)", capacidad: "25"},
    {tipo: "Semirremolque", config: "S2", carroceria: "Refrigerado", capacidad: "25"},
    {tipo: "Tractocamión", config: "3S2", carroceria: "Furgón cerrado", capacidad: "30"},
    {tipo: "Tractocamión", config: "3S2", carroceria: "Plataforma", capacidad: "30"},
    {tipo: "Tractocamión", config: "3S2", carroceria: "Tanque (cisterna)", capacidad: "30"},
    {tipo: "Tractocamión", config: "3S2", carroceria: "Refrigerado", capacidad: "30"},
    {tipo: "Remolque", config: "R4", carroceria: "Furgón cerrado", capacidad: "30"},
    {tipo: "Remolque", config: "R4", carroceria: "Plataforma", capacidad: "30"},
    {tipo: "Remolque", config: "R4", carroceria: "Tanque (cisterna)", capacidad: "30"},
    {tipo: "Remolque", config: "R4", carroceria: "Refrigerado", capacidad: "30"},
    {tipo: "Semirremolque", config: "S3", carroceria: "Furgón cerrado", capacidad: "30"},
    {tipo: "Semirremolque", config: "S3", carroceria: "Plataforma", capacidad: "30"},
    {tipo: "Semirremolque", config: "S3", carroceria: "Tanque (cisterna)", capacidad: "30"},
    {tipo: "Semirremolque", config: "S3", carroceria: "Refrigerado", capacidad: "30"},
    {tipo: "Tractocamión", config: "3S3", carroceria: "Furgón cerrado", capacidad: "34"},
    {tipo: "Tractocamión", config: "3S3", carroceria: "Plataforma", capacidad: "34"},
    {tipo: "Tractocamión", config: "3S3", carroceria: "Tanque (cisterna)", capacidad: "34"},
    {tipo: "Tractocamión", config: "3S3", carroceria: "Refrigerado", capacidad: "34"}
];

// Funciones para los filtros agrupados
function actualizarConfiguraciones() {
    const tipoVehiculo = document.getElementById('tipoVehiculo').value;
    const configSelect = document.getElementById('configuracion');
    
    configSelect.innerHTML = '<option value="">Seleccione configuración</option>';
    configSelect.disabled = !tipoVehiculo;
    
    if (tipoVehiculo) {
        const configsUnicas = [...new Set(
            vehiculosData
                .filter(v => v.tipo === tipoVehiculo)
                .map(v => v.config)
        )];
        
        configsUnicas.forEach(config => {
            const option = document.createElement('option');
            option.value = config;
            option.textContent = config;
            configSelect.appendChild(option);
        });
    }
    
    // Resetear dependientes
    document.getElementById('carroceria').innerHTML = '<option value="">Primero seleccione Configuración</option>';
    document.getElementById('carroceria').disabled = true;
    document.getElementById('capacidad').innerHTML = '<option value="">Primero seleccione Carrocería</option>';
    document.getElementById('capacidad').disabled = true;
}

function actualizarCarrocerias() {
    const tipoVehiculo = document.getElementById('tipoVehiculo').value;
    const config = document.getElementById('configuracion').value;
    const carroceriaSelect = document.getElementById('carroceria');
    
    carroceriaSelect.innerHTML = '<option value="">Seleccione carrocería</option>';
    carroceriaSelect.disabled = !config;
    
    if (tipoVehiculo && config) {
        const carroceriasUnicas = [...new Set(
            vehiculosData
                .filter(v => v.tipo === tipoVehiculo && v.config === config)
                .map(v => v.carroceria)
        )];
        
        carroceriasUnicas.forEach(carroceria => {
            const option = document.createElement('option');
            option.value = carroceria;
            option.textContent = carroceria;
            carroceriaSelect.appendChild(option);
        });
    }
    
    // Resetear capacidad
    document.getElementById('capacidad').innerHTML = '<option value="">Primero seleccione Carrocería</option>';
    document.getElementById('capacidad').disabled = true;
}

function actualizarCapacidad() {
    const tipoVehiculo = document.getElementById('tipoVehiculo').value;
    const config = document.getElementById('configuracion').value;
    const carroceria = document.getElementById('carroceria').value;
    const capacidadSelect = document.getElementById('capacidad');
    
    capacidadSelect.innerHTML = '<option value="">Seleccione capacidad</option>';
    capacidadSelect.disabled = !carroceria;
    
    if (tipoVehiculo && config && carroceria) {
        const vehiculo = vehiculosData.find(v => 
            v.tipo === tipoVehiculo && 
            v.config === config && 
            v.carroceria === carroceria
        );
        
        if (vehiculo) {
            const option = document.createElement('option');
            option.value = vehiculo.capacidad;
            option.textContent = vehiculo.capacidad + ' toneladas';
            capacidadSelect.appendChild(option);
        }
    }
}

// Inicializar eventos de los selects
document.getElementById('tipoVehiculo').addEventListener('change', actualizarConfiguraciones);
document.getElementById('configuracion').addEventListener('change', actualizarCarrocerias);
document.getElementById('carroceria').addEventListener('change', actualizarCapacidad);
