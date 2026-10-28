import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import '../../styles/Transporte.css';

const PALETA_COLORES = [
  '#0d4295', // Azul
  '#10b981', // Verde
  '#f59e0b', // Naranja
  '#8b5cf6', // Violeta
  '#ec4899', // Rosa
  '#06b6d4', // Cian
  '#e11d48', // Rojo
  '#84cc16'  // Verde Lima
];

// Ícono de Camión (Origen / Tracker GPS)
const crearIconoCamion = (color) => L.divIcon({
  className: 'custom-div-icon',
  html: `
    <div class="map-icon-container map-icon-camion" style="background-color: ${color};">
      <svg class="map-icon-svg" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Ícono de Casa / Depósito (Destino final)
const crearIconoDestino = () => L.divIcon({
  className: 'custom-div-icon',
  html: `
    <div class="map-icon-container map-icon-destino">
      <svg class="map-icon-svg" viewBox="0 0 24 24">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const posicionesIniciales = [
  { 
    id: 1, 
    nombre: 'Juan Carlos Rodríguez', 
    documento: '32.458.912', 
    licencia: 'Clase C/E', 
    vehiculo: 'Camión Iveco (Patente: AF 123 CD)', 
    lat: -37.321, 
    lng: -59.131, 
    origLat: -37.321, 
    origLng: -59.131,
    destLat: -38.035, 
    destLng: -57.537,
    color: '#0d4295',
    segmentos: [],
    indiceSegmento: 0,
    progresoSegmento: 0,
    ultimaActualizacion: new Date().toLocaleTimeString()
  },
  { 
    id: 2, 
    nombre: 'Martín Edgardo Gómez', 
    documento: '28.914.355', 
    licencia: 'Clase C', 
    vehiculo: 'Ford Cargo (Patente: AE 488 WY)', 
    lat: -36.778, 
    lng: -59.851, 
    origLat: -36.778, 
    origLng: -59.851,
    destLat: -38.718, 
    destLng: -62.266,
    color: '#10b981',
    segmentos: [],
    indiceSegmento: 0,
    progresoSegmento: 0,
    ultimaActualizacion: new Date().toLocaleTimeString()
  }
];

function calcularDistanciaMetros(lat1, lon1, lat2, lon2) {
  const R = 6371000; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function ActualizarCentro({ lat, lng, rastreoActivo }) {
  const mapa = useMap();
  useEffect(() => {
    if (lat && lng && rastreoActivo) {
      mapa.setView([lat, lng], 8); 
    }
  }, [lat, lng, rastreoActivo, mapa]);
  return null;
}

function DetectorDeInteraccion({ setRastreoActivo }) {
  useMapEvents({
    movestart: () => setRastreoActivo(false),
    zoomstart: () => setRastreoActivo(false)
  });
  return null;
}

export default function Transporte() {
  const [conductores, setConductores] = useState(posicionesIniciales);
  const [posicionActivaId, setPosicionActivaId] = useState(1);
  const [rastreoActivo, setRastreoActivo] = useState(true);

  // 1. CARGA RUTA OSRM Y REGULA VELOCIDAD SEGÚN TIPO DE VÍA
  useEffect(() => {
    conductores.forEach((chofer) => {
      const url = `https://router.project-osrm.org/route/v1/driving/${chofer.origLng},${chofer.origLat};${chofer.destLng},${chofer.destLat}?overview=full&geometries=geojson&annotations=distance,duration`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.routes && data.routes.length > 0) {
            const coords = data.routes[0].geometry.coordinates;
            const distances = data.routes[0].legs[0].annotation?.distance || [];
            const durations = data.routes[0].legs[0].annotation?.duration || [];

            const tramos = [];

            for (let i = 0; i < coords.length - 1; i++) {
              const lat1 = coords[i][1];
              const lng1 = coords[i][0];
              const lat2 = coords[i+1][1];
              const lng2 = coords[i+1][0];

              const dist = distances[i] || calcularDistanciaMetros(lat1, lng1, lat2, lng2);
              const dur = durations[i] || 1;
              
              let speedKmh = (dist / dur) * 3.6;

              if (dist < 120) {
                speedKmh = Math.min(speedKmh, 30); 
              } else {
                speedKmh = Math.min(speedKmh, 75); 
              }

              if (speedKmh < 15) speedKmh = 15;

              tramos.push({
                lat1, lng1, lat2, lng2,
                distanciaMetros: dist,
                velocidadKmh: speedKmh
              });
            }

            setConductores((prev) =>
              prev.map((c) =>
                c.id === chofer.id
                  ? {
                      ...c,
                      segmentos: tramos,
                      indiceSegmento: 0,
                      progresoSegmento: 0,
                      lat: coords[0][1],
                      lng: coords[0][0],
                      ultimaActualizacion: new Date().toLocaleTimeString()
                    }
                  : c
              )
            );
          }
        })
        .catch((err) => console.error("Error al obtener ruta OSRM:", err));
    });
  }, []);

  // 2. SIMULADOR GPS TRACKER (REPORTE CADA 15 SEGUNDOS)
  useEffect(() => {
    const segundosViajeSimulados = 120;

    const intervalo = setInterval(() => {
      setConductores((prevConductores) =>
        prevConductores.map((chofer) => {
          if (!chofer.segmentos || chofer.segmentos.length === 0) return chofer;

          let { indiceSegmento, progresoSegmento, segmentos } = chofer;
          let tiempoRestante = segundosViajeSimulados;

          while (tiempoRestante > 0 && indiceSegmento < segmentos.length) {
            const tramoActual = segmentos[indiceSegmento];
            const velocidadMS = (tramoActual.velocidadKmh * 1000) / 3600;
            const distanciaTramoRestante = tramoActual.distanciaMetros * (1 - progresoSegmento);
            const tiempoParaCompletarTramo = distanciaTramoRestante / velocidadMS;

            if (tiempoRestante < tiempoParaCompletarTramo) {
              const metrosAvanzados = velocidadMS * tiempoRestante;
              progresoSegmento += metrosAvanzados / tramoActual.distanciaMetros;
              tiempoRestante = 0;
            } else {
              tiempoRestante -= tiempoParaCompletarTramo;
              progresoSegmento = 0;
              indiceSegmento++;

              if (indiceSegmento >= segmentos.length) {
                indiceSegmento = 0;
                progresoSegmento = 0;
                break;
              }
            }
          }

          const tramoFinal = segmentos[indiceSegmento];
          const nuevaLat = tramoFinal.lat1 + (tramoFinal.lat2 - tramoFinal.lat1) * progresoSegmento;
          const nuevaLng = tramoFinal.lng1 + (tramoFinal.lng2 - tramoFinal.lng1) * progresoSegmento;

          return {
            ...chofer,
            indiceSegmento,
            progresoSegmento,
            lat: nuevaLat,
            lng: nuevaLng,
            ultimaActualizacion: new Date().toLocaleTimeString()
          };
        })
      );
    }, 15000); 

    return () => clearInterval(intervalo);
  }, []);

  const manejarVerPosicion = (chofer) => {
    setPosicionActivaId(chofer.id);
    setRastreoActivo(true);
  };

  const choferMonitoreado = conductores.find((c) => c.id === posicionActivaId) || conductores[0];

  const rutaCoordenadasMap = choferMonitoreado.segmentos.length > 0
    ? [
        [choferMonitoreado.segmentos[0].lat1, choferMonitoreado.segmentos[0].lng1],
        ...choferMonitoreado.segmentos.map(s => [s.lat2, s.lng2])
      ]
    : [];

  const agregarNuevoPedido = (nuevoPedido) => {
    setConductores((prevConductores) => {
      const colorAsignado = PALETA_COLORES[prevConductores.length % PALETA_COLORES.length];

      return [
        ...prevConductores,
        {
          id: Date.now(),
          nombre: nuevoPedido.nombre,
          documento: nuevoPedido.documento,
          licencia: nuevoPedido.licencia,
          vehiculo: nuevoPedido.vehiculo,
          color: colorAsignado,
          origLat: nuevoPedido.origLat,
          origLng: nuevoPedido.origLng,
          destLat: nuevoPedido.destLat,
          destLng: nuevoPedido.destLng,
          lat: nuevoPedido.origLat,
          lng: nuevoPedido.origLng,
          segmentos: [],
          indiceSegmento: 0,
          progresoSegmento: 0,
          ultimaActualizacion: new Date().toLocaleTimeString()
        }
      ];
    });
  };

  return (
    <div className="agroflow-screen">
      <div className="agroflow-frame">
        
        {/* MAPA INTERACTIVO */}
        <div className="agroflow-map-container">
          <MapContainer center={[-37.321, -59.131]} zoom={8} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <DetectorDeInteraccion setRastreoActivo={setRastreoActivo} />

            {/* Traza de ruta OSRM */}
            {rutaCoordenadasMap.length > 0 && (
              <Polyline 
                positions={rutaCoordenadasMap} 
                color={choferMonitoreado.color} 
                weight={5} 
                opacity={0.7} 
              />
            )}

            {/* Destino Final - Ícono de Casa */}
            <Marker 
              position={[choferMonitoreado.destLat, choferMonitoreado.destLng]} 
              icon={crearIconoDestino()}
            >
              <Popup>Destino final / Depósito: {choferMonitoreado.nombre}</Popup>
            </Marker>

            {/* Camiones / Vehículos en movimiento */}
            {conductores.map((chofer) => (
              <Marker
                key={chofer.id}
                position={[chofer.lat, chofer.lng]}
                icon={crearIconoCamion(chofer.color)}
                eventHandlers={{
                  click: () => {
                    setPosicionActivaId(chofer.id);
                    setRastreoActivo(true);
                  },
                }}
              >
                <Popup>
                  <b>{chofer.nombre}</b><br />
                  {chofer.vehiculo}<br />
                  <small>Velocidad: {Math.round(chofer.segmentos[chofer.indiceSegmento]?.velocidadKmh || 0)} km/h</small>
                </Popup>
              </Marker>
            ))}

            <ActualizarCentro 
              lat={choferMonitoreado.lat} 
              lng={choferMonitoreado.lng} 
              rastreoActivo={rastreoActivo} 
            />
          </MapContainer>
        </div>
        
        {/* TABLA DE CONDUCTORES */}
        <div className="agroflow-table-section">
          <div className="agroflow-table-wrapper">
            <table className="agroflow-table">
              <thead>
                <tr>
                  <th>Conductor</th>
                  <th>Documento</th>
                  <th>Licencia</th>
                  <th>Vehiculo/Patente</th>
                  <th className="center width-pos">Ver Mapa en vivo</th>
                </tr>
              </thead>
              <tbody>
                {conductores.map((chofer) => (
                  <tr key={chofer.id} className="agroflow-row">
                    <td className="agroflow-cell">
                      <div className="driver-status-container">
                        <span className="status-dot" style={{ backgroundColor: chofer.color }}></span>
                        {chofer.nombre}
                      </div>
                    </td>
                    <td className="agroflow-cell doc-lic">{chofer.documento}</td>
                    <td className="agroflow-cell doc-lic">{chofer.licencia}</td>
                    <td className="agroflow-cell patente">{chofer.vehiculo}</td>
                    
                    <td className="agroflow-cell center">
                      <button onClick={() => manejarVerPosicion(chofer)} className="btn-agroflow">
                        VER POSICIÓN
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}