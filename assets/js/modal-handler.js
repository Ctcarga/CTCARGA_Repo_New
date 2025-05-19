function aceptarOferta(id) {
    const ofertas = JSON.parse(sessionStorage.getItem('ofertas'));
    const ofertaIndex = ofertas.findIndex(o => o.id === id);
    
    if (ofertaIndex !== -1) {
        currentOfertaId = id;
        currentOfertaData = ofertas[ofertaIndex];
        
        // Mostrar información de la oferta en el modal
        document.getElementById('infoOfertaAsignacion').innerHTML = `
            <p><strong>Código:</strong> ${currentOfertaData.codigo}</p>
            <p><strong>Origen:</strong> ${currentOfertaData.origen}</p>
            <p><strong>Destino:</strong> ${currentOfertaData.destino}</p>
            <p><strong>Tonelaje:</strong> ${currentOfertaData.tonelaje} toneladas</p>
            <p><strong>Vehículos requeridos:</strong> ${currentOfertaData.vehiculosRequeridos}</p>
            <p><strong>Tipo de vehículo:</strong> ${currentOfertaData.tipoVehiculo}</p>
            <p><strong>Configuración:</strong> ${currentOfertaData.configuracion}</p>
            <p><strong>Carrocería:</strong> ${currentOfertaData.carroceria}</p>
            <p><strong>Capacidad:</strong> ${currentOfertaData.capacidad}</p>
        `;
        
        // Simular búsqueda de flota disponible (filtrada por configuración solicitada)
        setTimeout(() => {
            const flotaDisponible = generarFlotaDisponible(currentOfertaData);
            mostrarFlotaDisponible(flotaDisponible, currentOfertaData);
            
            // Si la opción es asignar toda la flota automáticamente, marcamos todos los checkboxes
            if (document.querySelector('input[name="asignacionOption"][value="total"]').checked) {
                document.querySelectorAll('.asignar-vehiculo').forEach(checkbox => {
                    checkbox.checked = true;
                });
            }
        }, 500);
        
        // Mostrar modal de asignación
        document.getElementById('asignacionModal').style.display = 'flex';
    }
}

// Función para generar flota disponible simulada (FILTRADA por configuración de oferta)
function generarFlotaDisponible(oferta) {
    // En una implementación real, esto vendría de una API con filtro por GPS y configuración
    const flota = [];
    
    // Generar entre 3 y 8 vehículos disponibles que coincidan con la oferta
    const cantidad = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < cantidad; i++) {
        const distancia = (Math.random() * 10).toFixed(2); // Menos de 10 km
        
        flota.push({
            id: `VH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            tipo: oferta.tipoVehiculo,
            configuracion: oferta.configuracion,
            carroceria: oferta.carroceria,
            capacidad: oferta.capacidad.replace(',', '.'),
            distancia: distancia,
            conductor: `Conductor ${i+1}`,
            telefono: `+57 3${Math.floor(Math.random() * 100000000)}`,
            asignado: false,
            ubicacionActual: `Ubicación simulada ${i+1}`,
            estado: 'Disponible'
        });
    }
    
    return flota;
}

// Función para mostrar flota disponible en el modal (CON SCROLL)
function mostrarFlotaDisponible(flota, oferta) {
    const container = document.getElementById('flotaDisponibleContainer');
    container.innerHTML = '';
    
    if (flota.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p>No hay vehículos disponibles que coincidan con los requerimientos:</p>
                <p><strong>Tipo:</strong> ${oferta.tipoVehiculo}</p>
                <p><strong>Configuración:</strong> ${oferta.configuracion}</p>
                <p><strong>Carrocería:</strong> ${oferta.carroceria}</p>
                <p><strong>Capacidad:</strong> ${oferta.capacidad}</p>
            </div>
        `;
        return;
    }
    
    const table = document.createElement('table');
    table.style.width = '100%';
    
    // Cabecera de la tabla
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Configuración</th>
            <th>Carrocería</th>
            <th>Capacidad (ton)</th>
            <th>Distancia (km)</th>
            <th>Conductor</th>
            <th>Asignar</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // Cuerpo de la tabla
    const tbody = document.createElement('tbody');
    
    flota.forEach(vehiculo => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid var(--border)';
        
        row.innerHTML = `
            <td style="padding: 10px;">${vehiculo.id}</td>
            <td style="padding: 10px;">${vehiculo.tipo}</td>
            <td style="padding: 10px;">${vehiculo.configuracion}</td>
            <td style="padding: 10px;">${vehiculo.carroceria}</td>
            <td style="padding: 10px;">${vehiculo.capacidad}</td>
            <td style="padding: 10px;">${vehiculo.distancia}</td>
            <td style="padding: 10px;">${vehiculo.conductor}</td>
            <td style="padding: 10px;">
                <input type="checkbox" class="asignar-vehiculo" data-id="${vehiculo.id}" 
                    ${vehiculo.asignado ? 'checked' : ''}>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    container.appendChild(table);
}

// Función para confirmar asignación
function confirmarAsignacion() {
    const ofertas = JSON.parse(sessionStorage.getItem('ofertas'));
    const ofertaIndex = ofertas.findIndex(o => o.id === currentOfertaId);
    
    if (ofertaIndex !== -1) {
        const asignacionOption = document.querySelector('input[name="asignacionOption"]:checked').value;
        const publicarTerceros = document.getElementById('publicarTerceros').checked;
        
        // Calcular tonelaje asignado a flota propia
        const vehiculosAsignados = asignacionOption === 'ninguna' ? 0 : 
            asignacionOption === 'total' ? 
                document.querySelectorAll('.asignar-vehiculo').length : 
                Array.from(document.querySelectorAll('.asignar-vehiculo:checked')).length;
        
        const capacidadVehiculo = parseFloat(currentOfertaData.capacidad.replace(',', '.'));
        const tonelajeAsignado = vehiculosAsignados * capacidadVehiculo;
        const tonelajePendiente = parseFloat(currentOfertaData.tonelaje) - tonelajeAsignado;
        
        // Actualizar estado de la oferta
        ofertas[ofertaIndex].estado = 'asignacion_parcial';
        ofertas[ofertaIndex].tonelajeAsignado = tonelajeAsignado;
        ofertas[ofertaIndex].tonelajeDisponible = tonelajePendiente;
        ofertas[ofertaIndex].vehiculosAsignados = vehiculosAsignados;
        ofertas[ofertaIndex].publicarTerceros = publicarTerceros;
        
        sessionStorage.setItem('ofertas', JSON.stringify(ofertas));
        
        // Mostrar mensaje de confirmación mejorado
        const tipoAsignacion = asignacionOption === 'total' ? 
            `Completa (${vehiculosAsignados}/${vehiculosAsignados} vehículos propios asignados)` : 
            asignacionOption === 'parcial' ? 
                `Parcial (${vehiculosAsignados} vehículos propios asignados)` :
                `Sin asignación de flota propia`;
        
        const mensaje = `
            <div class="confirmacion-item">
                <strong>Tipo de asignación:</strong> 
                <span>${tipoAsignacion}</span>
            </div>
            <div class="confirmacion-item">
                <strong>Tonelaje asignado a flota propia:</strong> 
                <span>${tonelajeAsignado} ton</span>
            </div>
            <div class="confirmacion-item">
                <strong>Tonelaje pendiente por asignar:</strong> 
                <span>${tonelajePendiente} ton</span>
            </div>
            <div class="confirmacion-item">
                <strong>Publicación a terceros:</strong> 
                <span>${publicarTerceros ? 'Activada' : 'Desactivada'}</span>
            </div>
            ${publicarTerceros ? `
            <div style="margin-top: 20px; padding: 15px; background: rgba(26, 188, 156, 0.1); border-radius: 6px;">
                <p>El sistema continuará monitoreando nuevos vehículos propios que entren al área de cobertura para asignarlos automáticamente.</p>
                ${tonelajePendiente > 0 ? `<p>La carga restante (${tonelajePendiente} ton) será publicada a terceros.</p>` : ''}
            </div>
            ` : ''}
        `;
        
        document.getElementById('confirmacionBody').innerHTML = mensaje;
        document.getElementById('confirmacionModal').style.display = 'flex';
        
        // Ocultar modal de asignación
        cancelarAsignacion();
    }
}

function continuarPublicacionTerceros() {
    const ofertas = JSON.parse(sessionStorage.getItem('ofertas'));
    const ofertaIndex = ofertas.findIndex(o => o.id === currentOfertaId);
    
    if (ofertaIndex !== -1 && ofertas[ofertaIndex].publicarTerceros && ofertas[ofertaIndex].tonelajeDisponible > 0) {
        // Llenar formulario para terceros con datos de la oferta
        document.getElementById('tercerosCodigo').value = currentOfertaData.codigo;
        document.getElementById('tercerosEmpresa').value = currentOfertaData.empresa;
        document.getElementById('tercerosRuta').value = `${currentOfertaData.origen} → ${currentOfertaData.destino}`;
        document.getElementById('tercerosTonelaje').value = `${currentOfertaData.tonelajeDisponible} toneladas`;
        document.getElementById('tercerosVehiculo').value = `${currentOfertaData.tipoVehiculo} - ${currentOfertaData.carroceria}`;
        document.getElementById('tercerosFecha').value = new Date(currentOfertaData.fecha).toLocaleString();
        
        // Mostrar vista de formulario para terceros
        document.getElementById('confirmacionModal').style.display = 'none';
        showView('form-terceros');
    } else {
        cerrarConfirmacion();
        cargarOfertasActivas();
        actualizarContadores();
    }
}

function cerrarConfirmacion() {
    document.getElementById('confirmacionModal').style.display = 'none';
    cargarOfertasActivas();
    actualizarContadores();
}

function cancelarAsignacion() {
    document.getElementById('asignacionModal').style.display = 'none';
    currentOfertaId = '';
    currentOfertaData = null;
}

function rechazarOferta(id) {
    currentOfertaId = id;
    const ofertas = JSON.parse(sessionStorage.getItem('ofertas'));
    const oferta = ofertas.find(o => o.id === id);
    
    if (oferta && oferta.publicacion === 'cerrada') {
        // Mostrar modal para ingresar motivo de rechazo
        document.getElementById('rechazoModal').style.display = 'flex';
    } else {
        // Rechazo simple para ofertas públicas
        const ofertaIndex = ofertas.findIndex(o => o.id === id);
        
        if (ofertaIndex !== -1) {
            ofertas[ofertaIndex].estado = 'rechazada';
            sessionStorage.setItem('ofertas', JSON.stringify(ofertas));
            alert('Oferta rechazada');
            cargarOfertasActivas();
            actualizarContadores();
        }
    }
}

function confirmarRechazo() {
    const motivo = document.getElementById('motivoRechazo').value;
    
    if (!motivo) {
        alert('Por favor ingrese el motivo del rechazo');
        return;
    }
    
    const ofertas = JSON.parse(sessionStorage.getItem('ofertas'));
    const ofertaIndex = ofertas.findIndex(o => o.id === currentOfertaId);
    
    if (ofertaIndex !== -1) {
        ofertas[ofertaIndex].estado = 'rechazada';
        ofertas[ofertaIndex].motivoRechazo = motivo;
        sessionStorage.setItem('ofertas', JSON.stringify(ofertas));
        
        // Simular envío de notificación y correo con más detalle
        const oferta = ofertas[ofertaIndex];
        const mensajeNotificacion = `
            Oferta ${oferta.codigo} rechazada:
            - Empresa: ${oferta.empresa}
            - Ruta: ${oferta.origen} → ${oferta.destino}
            - Tonelaje: ${oferta.tonelaje} ton
            - Motivo: ${motivo}
        `;
        
        console.log(`Notificación enviada a generador:\n${mensajeNotificacion}`);
        console.log(`Correo enviado a ${oferta.empresa} con motivo de rechazo`);
        
        alert('Oferta rechazada. Se ha notificado al generador por la aplicación y por correo electrónico.');
        
        // Cerrar modal y actualizar vista
        cancelarRechazo();
        cargarOfertasActivas();
        actualizarContadores();
    }
}

function cancelarRechazo() {
    document.getElementById('rechazoModal').style.display = 'none';
    document.getElementById('motivoRechazo').value = '';
    currentOfertaId = '';
}
