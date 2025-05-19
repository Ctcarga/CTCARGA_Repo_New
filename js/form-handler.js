function crearOferta(tipoCliente) {
    currentTipoCliente = tipoCliente;
    
    // Configurar el formulario según el tipo de cliente
    if (tipoCliente === 'empresa') {
        document.getElementById('formTitle').textContent = 'Nueva Oferta de Carga (Empresa)';
        document.getElementById('formMainTitle').textContent = 'Nueva Oferta de Carga (Empresa)';
        
        // Forzar publicación cerrada para empresas
        document.getElementById('publicacion').value = 'cerrada';
        document.getElementById('publicacionContainer').style.display = 'none';
    } else {
        document.getElementById('formTitle').textContent = 'Nueva Oferta de Carga (Generador)';
        document.getElementById('formMainTitle').textContent = 'Nueva Oferta de Carga (Generador)';
        
        // Mostrar selector de publicación para generadores
        document.getElementById('publicacionContainer').style.display = 'block';
        document.getElementById('publicacion').value = 'publica';
    }
    
    showView('form');
}

function submitForm() {
    // Validación básica
    const form = document.getElementById('cargaForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Validar formato de tiempo de cargue
    const tiempoCargue = document.getElementById('tiempoCargue').value;
    const tiempoRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!tiempoRegex.test(tiempoCargue)) {
        alert('Por favor ingrese un tiempo de cargue válido en formato HH:MM:SS');
        document.getElementById('tiempoCargue').style.borderColor = 'red';
        isValid = false;
    }
    
    if (isValid) {
        // Calcular cantidad de vehículos requeridos
        const tonelaje = parseFloat(document.getElementById('tonelaje').value);
        const capacidad = parseFloat(document.getElementById('capacidad').value.replace(',', '.'));
        const vehiculosRequeridos = Math.ceil(tonelaje / capacidad);
        
        // Calcular distancia estimada (simulada)
        const distancia = Math.floor(Math.random() * 500) + 50;
        
        // Generar código único para la oferta (6 caracteres alfanuméricos)
        const codigoOferta = 'OF-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        // Crear objeto de oferta
        const oferta = {
            id: Date.now().toString(),
            codigo: codigoOferta,
            empresa: document.getElementById('empresa').value,
            tipoCliente: currentTipoCliente,
            origen: document.getElementById('origen').value,
            destino: document.getElementById('destino').value,
            tonelaje: document.getElementById('tonelaje').value,
            fecha: document.getElementById('fecha').value,
            tiempoCargue: document.getElementById('tiempoCargue').value,
            publicacion: document.getElementById('publicacion').value,
            tipoVehiculo: document.getElementById('tipoVehiculo').value,
            configuracion: document.getElementById('configuracion').value,
            carroceria: document.getElementById('carroceria').value,
            capacidad: document.getElementById('capacidad').value,
            valor: document.getElementById('valor').value,
            vehiculosRequeridos: vehiculosRequeridos,
            distancia: distancia,
            fechaCreacion: new Date().toISOString(),
            estado: 'activa',
            tonelajeAsignado: 0,
            tonelajeDisponible: parseFloat(document.getElementById('tonelaje').value),
            tonelajePublicadoTerceros: 0
        };
        
        // Guardar oferta
        const ofertas = JSON.parse(sessionStorage.getItem('ofertas'));
        ofertas.push(oferta);
        sessionStorage.setItem('ofertas', JSON.stringify(ofertas));
        
        alert(`Oferta de carga creada exitosamente! Código: ${codigoOferta}`);
        form.reset();
        
        // Resetear selects dependientes
        document.getElementById('configuracion').innerHTML = '<option value="">Primero seleccione Tipo de Vehículo</option>';
        document.getElementById('configuracion').disabled = true;
        document.getElementById('carroceria').innerHTML = '<option value="">Primero seleccione Configuración</option>';
        document.getElementById('carroceria').disabled = true;
        document.getElementById('capacidad').innerHTML = '<option value="">Primero seleccione Carrocería</option>';
        document.getElementById('capacidad').disabled = true;
        
        // Actualizar contadores
        actualizarContadores();
        
        // Volver a gestión de carga
        showView('gestion-carga');
    } else {
        alert('Por favor complete todos los campos requeridos');
    }
}

function actualizarContadores() {
    const ofertas = JSON.parse(sessionStorage.getItem('ofertas')) || [];
    
    // Contar ofertas totales
    const totalOfertas = ofertas.length;
    
    // Contar ofertas por tipo de cliente
    const ofertasEmpresa = ofertas.filter(o => o.tipoCliente === 'empresa').length;
    const ofertasGenerador = ofertas.filter(o => o.tipoCliente === 'generador').length;
    
    // Actualizar UI
    document.getElementById('ofertasCreadas').textContent = totalOfertas;
    document.getElementById('ofertasActivas').textContent = totalOfertas;
    document.getElementById('detalleOfertas').textContent = `${ofertasGenerador} de generadores, ${ofertasEmpresa} de empresas`;
}

function cargarOfertasActivas() {
    const ofertas = JSON.parse(sessionStorage.getItem('ofertas')) || [];
    const ofertasActivas = ofertas.filter(o => o.estado === 'activa');
    const container = document.getElementById('ofertasList');
    
    container.innerHTML = '';
    
    if (ofertasActivas.length === 0) {
        container.innerHTML = '<p>No hay ofertas activas disponibles.</p>';
        return;
    }
    
    ofertasActivas.forEach(oferta => {
        const ofertaCard = document.createElement('div');
        ofertaCard.className = 'oferta-card';
        
        // Determinar clases de badge según tipo de cliente y publicación
        const badgeCliente = oferta.tipoCliente === 'empresa' ? 'badge-empresa' : 'badge-generador';
        const badgePublicacion = oferta.publicacion === 'publica' ? 'badge-publica' : 'badge-cerrada';
        const textoCliente = oferta.tipoCliente === 'empresa' ? 'Empresa' : 'Generador';
        const textoPublicacion = oferta.publicacion === 'publica' ? 'Pública' : 'Cerrada';
        
        // Estilo diferente para cada tipo de cliente
        const headerStyle = oferta.tipoCliente === 'empresa' ? 
            'background: rgba(52, 152, 219, 0.1); padding: 15px; border-radius: 6px;' : 
            'background: rgba(26, 188, 156, 0.1); padding: 15px; border-radius: 6px;';
        
        // Crear HTML base
        let ofertaHTML = `
            <div style="${headerStyle}">
                <div class="oferta-header">
                    <h3 class="oferta-title">${oferta.codigo} - ${oferta.empresa}</h3>
                    <div>
                        <span class="oferta-badge ${badgeCliente}" style="font-size: 14px; padding: 6px 12px;">${textoCliente}</span>
                        <span class="oferta-badge ${badgePublicacion}" style="font-size: 14px; padding: 6px 12px;">${textoPublicacion}</span>
                    </div>
                </div>
                <div style="margin-top: 10px; font-weight: 500; color: var(--primary);">
                    ${oferta.origen} → ${oferta.destino}
                </div>
            </div>
            <div class="oferta-details">
                <div class="detail-group">
                    <div class="detail-label">Tonelaje</div>
                    <div class="detail-value">${oferta.tonelaje} toneladas</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Fecha de Cargue</div>
                    <div class="detail-value">${new Date(oferta.fecha).toLocaleString()}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Tiempo estimado de cargue</div>
                    <div class="detail-value">${oferta.tiempoCargue}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Vehículos Requeridos</div>
                    <div class="detail-value">${oferta.vehiculosRequeridos} vehículos</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Distancia Estimada</div>
                    <div class="detail-value">${oferta.distancia} km</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Tipo de Vehículo</div>
                    <div class="detail-value">${oferta.tipoVehiculo} - ${oferta.carroceria}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Capacidad por Vehículo</div>
                    <div class="detail-value">${oferta.capacidad} toneladas</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Valor Oferta</div>
                    <div class="detail-value">$${oferta.valor}</div>
                </div>
            </div>
            <div class="oferta-actions">
                <button class="btn btn-success" onclick="aceptarOferta('${oferta.id}')">Aceptar Oferta</button>
        `;
        
        // Solo mostrar botón de rechazo si es oferta de generador
        if (oferta.tipoCliente === 'generador') {
            ofertaHTML += `<button class="btn btn-danger" onclick="rechazarOferta('${oferta.id}')">Rechazar Oferta</button>`;
        }
        
        ofertaHTML += `</div>`;
        
        ofertaCard.innerHTML = ofertaHTML;
        container.appendChild(ofertaCard);
    });
}

function publicarATerceros() {
    const valorTercero = document.getElementById('tercerosValor').value;
    const observaciones = document.getElementById('tercerosObservaciones').value;
    
    if (!valorTercero) {
        alert('Por favor ingrese el valor a pagar por tonelada');
        return;
    }
    
    const ofertas = JSON.parse(sessionStorage.getItem('ofertas'));
    const ofertaIndex = ofertas.findIndex(o => o.id === currentOfertaId);
    
    if (ofertaIndex !== -1) {
        ofertas[ofertaIndex].valorTerceros = valorTercero;
        ofertas[ofertaIndex].observacionesTerceros = observaciones;
        ofertas[ofertaIndex].estado = 'publicada_terceros';
        ofertas[ofertaIndex].fechaPublicacionTerceros = new Date().toISOString();
        ofertas[ofertaIndex].tonelajePublicadoTerceros = ofertas[ofertaIndex].tonelajeDisponible;
        ofertas[ofertaIndex].tonelajeDisponible = 0;
        
        sessionStorage.setItem('ofertas', JSON.stringify(ofertas));
        
        alert(`Carga publicada exitosamente a terceros con valor de $${valorTercero} por tonelada`);
        
        // Volver a gestión de carga
        showView('gestion-carga');
        cargarOfertasActivas();
        actualizarContadores();
    }
}
