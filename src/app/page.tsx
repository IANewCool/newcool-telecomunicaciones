'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas SUBTEL por region
const OFICINAS = [
  { id: 1, nombre: 'SUBTEL Arica y Parinacota', region: 'Arica y Parinacota', ciudad: 'Arica', direccion: '7 de Junio 226', telefono: '58 2232100', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 2, nombre: 'SUBTEL Tarapaca', region: 'Tarapaca', ciudad: 'Iquique', direccion: 'Serrano 145', telefono: '57 2411600', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 3, nombre: 'SUBTEL Antofagasta', region: 'Antofagasta', ciudad: 'Antofagasta', direccion: 'Av. Argentina 1660', telefono: '55 2268300', servicios: ['Reclamos', 'Concesiones', 'Espectro'] },
  { id: 4, nombre: 'SUBTEL Atacama', region: 'Atacama', ciudad: 'Copiapo', direccion: 'Los Carrera 691', telefono: '52 2213600', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 5, nombre: 'SUBTEL Coquimbo', region: 'Coquimbo', ciudad: 'La Serena', direccion: 'Cordovez 281', telefono: '51 2206600', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 6, nombre: 'SUBTEL Valparaiso', region: 'Valparaiso', ciudad: 'Valparaiso', direccion: 'Blanco 1623', telefono: '32 2252800', servicios: ['Reclamos', 'Concesiones', 'Espectro'] },
  { id: 7, nombre: 'SUBTEL Metropolitana', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Amunategui 139', telefono: '22 4213000', servicios: ['Reclamos', 'Concesiones', 'Nacional'] },
  { id: 8, nombre: 'SUBTEL OHiggins', region: 'OHiggins', ciudad: 'Rancagua', direccion: 'Campos 423', telefono: '72 2230400', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 9, nombre: 'SUBTEL Maule', region: 'Maule', ciudad: 'Talca', direccion: '1 Sur 898', telefono: '71 2515300', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 10, nombre: 'SUBTEL Nuble', region: 'Nuble', ciudad: 'Chillan', direccion: 'Arauco 559', telefono: '42 2433300', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 11, nombre: 'SUBTEL Biobio', region: 'Biobio', ciudad: 'Concepcion', direccion: 'Barros Arana 525', telefono: '41 2861600', servicios: ['Reclamos', 'Concesiones', 'Espectro'] },
  { id: 12, nombre: 'SUBTEL Araucania', region: 'Araucania', ciudad: 'Temuco', direccion: 'Bulnes 590', telefono: '45 2953700', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 13, nombre: 'SUBTEL Los Rios', region: 'Los Rios', ciudad: 'Valdivia', direccion: 'OHiggins 575', telefono: '63 2261600', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 14, nombre: 'SUBTEL Los Lagos', region: 'Los Lagos', ciudad: 'Puerto Montt', direccion: 'Urmeneta 509', telefono: '65 2254900', servicios: ['Reclamos', 'Concesiones', 'Fiscalizacion'] },
  { id: 15, nombre: 'SUBTEL Aysen', region: 'Aysen', ciudad: 'Coyhaique', direccion: 'Av. Ogana 1060', telefono: '67 2232500', servicios: ['Reclamos', 'Concesiones', 'Conectividad'] },
  { id: 16, nombre: 'SUBTEL Magallanes', region: 'Magallanes', ciudad: 'Punta Arenas', direccion: 'OHiggins 1048', telefono: '61 2247700', servicios: ['Reclamos', 'Concesiones', 'Conectividad'] }
];

// Tipos de servicios de telecomunicaciones
const SERVICIOS = [
  { nombre: 'Telefonia Movil', icono: '📱', descripcion: 'Servicios de voz, SMS y datos moviles', operadores: ['Entel', 'Movistar', 'Claro', 'WOM'], regulacion: 'Ley 18.168' },
  { nombre: 'Internet Fijo', icono: '🌐', descripcion: 'Conexion de banda ancha residencial y comercial', operadores: ['VTR', 'Movistar', 'Entel', 'Claro'], regulacion: 'Neutralidad de red' },
  { nombre: 'Television de Pago', icono: '📺', descripcion: 'TV por cable, satelite e IPTV', operadores: ['VTR', 'DirecTV', 'Movistar TV', 'Claro TV'], regulacion: 'Ley 18.838' },
  { nombre: 'Telefonia Fija', icono: '☎️', descripcion: 'Lineas telefonicas tradicionales y VoIP', operadores: ['Movistar', 'Entel', 'Claro', 'GTD'], regulacion: 'Tarifas reguladas' },
  { nombre: 'Internet Movil', icono: '📶', descripcion: 'Datos moviles 4G/5G y BAM', operadores: ['Entel', 'Movistar', 'Claro', 'WOM'], regulacion: 'Ley 21.046' },
  { nombre: 'Servicios Empresariales', icono: '🏢', descripcion: 'Soluciones corporativas y enlaces dedicados', operadores: ['GTD', 'Entel', 'Movistar', 'Claro'], regulacion: 'Contratos comerciales' }
];

// Operadores principales
const OPERADORES = [
  { nombre: 'Entel', icono: '🔵', tipo: 'Movil/Fijo', cobertura: '99% poblacion', tecnologia: '4G/5G', web: 'entel.cl', atencion: '103' },
  { nombre: 'Movistar', icono: '🟢', tipo: 'Movil/Fijo', cobertura: '98% poblacion', tecnologia: '4G/5G', web: 'movistar.cl', atencion: '800 200 200' },
  { nombre: 'Claro', icono: '🔴', tipo: 'Movil/Fijo', cobertura: '97% poblacion', tecnologia: '4G/5G', web: 'clarochile.cl', atencion: '800 600 600' },
  { nombre: 'WOM', icono: '🟣', tipo: 'Movil', cobertura: '95% poblacion', tecnologia: '4G/5G', web: 'wom.cl', atencion: '103' },
  { nombre: 'VTR', icono: '🟡', tipo: 'Internet/TV', cobertura: 'Zonas urbanas', tecnologia: 'HFC/Fibra', web: 'vtr.com', atencion: '600 600 8000' },
  { nombre: 'GTD', icono: '⚪', tipo: 'Fijo/Empresas', cobertura: 'Nacional', tecnologia: 'Fibra', web: 'gtd.cl', atencion: '600 700 8000' },
  { nombre: 'Mundo', icono: '🟠', tipo: 'Fibra optica', cobertura: 'Expansion', tecnologia: 'FTTH', web: 'mundopacifico.cl', atencion: '600 822 2000' },
  { nombre: 'Simple', icono: '🔷', tipo: 'Movil (OMV)', cobertura: 'Via Entel', tecnologia: '4G', web: 'simple.cl', atencion: '800 737 100' }
];

// Pasos para presentar reclamos
const PASOS = [
  { paso: 1, titulo: 'Reclamo a la empresa', descripcion: 'Primero presenta el reclamo directamente a tu operador', icono: '📞' },
  { paso: 2, titulo: 'Esperar respuesta', descripcion: 'La empresa tiene 10 dias habiles para responder', icono: '⏳' },
  { paso: 3, titulo: 'Reclamo a SUBTEL', descripcion: 'Si no hay respuesta o no es satisfactoria, reclama en SUBTEL', icono: '🏛️' },
  { paso: 4, titulo: 'Investigacion', descripcion: 'SUBTEL investiga y solicita informacion a la empresa', icono: '🔍' },
  { paso: 5, titulo: 'Resolucion', descripcion: 'SUBTEL emite resolucion obligatoria para la empresa', icono: '⚖️' },
  { paso: 6, titulo: 'Cumplimiento', descripcion: 'La empresa debe cumplir o enfrenta sanciones', icono: '✅' }
];

// Glosario de telecomunicaciones
const GLOSARIO = [
  { termino: '5G', definicion: 'Quinta generacion de redes moviles, velocidades hasta 10 Gbps' },
  { termino: 'Fibra Optica', definicion: 'Tecnologia de transmision de datos mediante luz en cables de vidrio' },
  { termino: 'FTTH', definicion: 'Fiber To The Home - fibra optica hasta el hogar del usuario' },
  { termino: 'Roaming', definicion: 'Uso del celular en redes de otros paises u operadores' },
  { termino: 'Portabilidad', definicion: 'Derecho a cambiar de operador manteniendo tu numero' },
  { termino: 'OMV', definicion: 'Operador Movil Virtual - usa infraestructura de otro operador' },
  { termino: 'Espectro', definicion: 'Frecuencias de radio asignadas para telecomunicaciones' },
  { termino: 'Banda Ancha', definicion: 'Conexion de alta velocidad, minimo 10 Mbps en Chile' },
  { termino: 'Latencia', definicion: 'Tiempo de respuesta de la conexion, medido en milisegundos' },
  { termino: 'Throttling', definicion: 'Reduccion intencional de velocidad por el operador' },
  { termino: 'Neutralidad de Red', definicion: 'Principio de trato igualitario a todo el trafico de internet' },
  { termino: 'Fair Use', definicion: 'Politica de uso razonable en planes "ilimitados"' }
];

export default function TelecomunicacionesPage() {
  const [busqueda, setBusqueda] = useState('');
  const [gigas, setGigas] = useState('');
  const [precioPlan, setPrecioPlan] = useState('');
  const [minutosIncluidos, setMinutosIncluidos] = useState('');

  const oficinasFiltradas = OFICINAS.filter(
    (o) =>
      o.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.region.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.ciudad.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calculadora de costo por GB
  const calcularCostoPorGB = () => {
    if (!gigas || !precioPlan) return null;
    const gb = parseFloat(gigas);
    const precio = parseFloat(precioPlan);
    const minutos = minutosIncluidos ? parseFloat(minutosIncluidos) : 0;

    // Valor estimado de minutos (aproximado $50 por minuto)
    const valorMinutos = minutos * 50;
    const precioSoloDatos = precio - valorMinutos;

    const costoPorGB = precioSoloDatos / gb;

    // Evaluacion del plan
    let evaluacion = '';
    let color = '';
    if (costoPorGB < 500) {
      evaluacion = 'Excelente precio';
      color = 'text-green-400';
    } else if (costoPorGB < 1000) {
      evaluacion = 'Buen precio';
      color = 'text-blue-400';
    } else if (costoPorGB < 2000) {
      evaluacion = 'Precio promedio';
      color = 'text-yellow-400';
    } else {
      evaluacion = 'Precio alto';
      color = 'text-red-400';
    }

    // Consumo tipico
    const horasStreaming = gb * 0.7; // ~1.4 GB por hora HD
    const horasMusica = gb * 7; // ~140 MB por hora
    const horasVideoconferencia = gb * 1.5; // ~700 MB por hora

    return {
      gigas: gb,
      precioPlan: precio,
      costoPorGB: Math.round(costoPorGB),
      valorMinutos: Math.round(valorMinutos),
      precioSoloDatos: Math.round(precioSoloDatos),
      evaluacion,
      color,
      horasStreaming: Math.round(horasStreaming),
      horasMusica: Math.round(horasMusica),
      horasVideoconferencia: Math.round(horasVideoconferencia)
    };
  };

  const resultado = calcularCostoPorGB();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-violet-800/50 border-b border-violet-700/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <span className="text-5xl">📡</span>
            <div>
              <h1 className="text-3xl font-bold text-white">Telecomunicaciones</h1>
              <p className="text-violet-300">SUBTEL - Subsecretaria de Telecomunicaciones</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Buscador de Oficinas */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-violet-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🔍</span> Buscador de Oficinas SUBTEL
          </h2>

          <input
            type="text"
            placeholder="Buscar por region, ciudad o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-violet-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 text-lg"
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {oficinasFiltradas.map((oficina) => (
              <motion.div
                key={oficina.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 rounded-xl p-4 border border-violet-500/20 hover:border-violet-400/50 transition-all"
              >
                <h3 className="font-bold text-white">{oficina.nombre}</h3>
                <p className="text-violet-300 text-sm">{oficina.ciudad}, {oficina.region}</p>
                <p className="text-gray-400 text-sm mt-1">{oficina.direccion}</p>
                <p className="text-violet-400 text-sm">Tel: {oficina.telefono}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {oficina.servicios.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-violet-500/20 rounded text-xs text-violet-300">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Mostrando {oficinasFiltradas.length} de {OFICINAS.length} oficinas
          </p>
        </motion.div>
      </section>

      {/* Calculadora de Costo por GB */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl p-8 border border-purple-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🧮</span> Calculadora de Costo por GB
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-violet-300 mb-2">Gigas del plan</label>
                <input
                  type="number"
                  value={gigas}
                  onChange={(e) => setGigas(e.target.value)}
                  placeholder="Ej: 50"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-violet-300 mb-2">Precio mensual ($)</label>
                <input
                  type="number"
                  value={precioPlan}
                  onChange={(e) => setPrecioPlan(e.target.value)}
                  placeholder="Ej: 15990"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-violet-300 mb-2">Minutos incluidos (opcional)</label>
                <input
                  type="number"
                  value={minutosIncluidos}
                  onChange={(e) => setMinutosIncluidos(e.target.value)}
                  placeholder="Ej: 500"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {resultado && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Analisis del Plan</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Plan:</span>
                    <span className="text-white">{resultado.gigas} GB</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Precio total:</span>
                    <span className="text-white">${resultado.precioPlan.toLocaleString('es-CL')}</span>
                  </div>
                  {resultado.valorMinutos > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Valor minutos (est.):</span>
                      <span className="text-white">-${resultado.valorMinutos.toLocaleString('es-CL')}</span>
                    </div>
                  )}

                  <div className="border-t border-purple-500/30 pt-3">
                    <div className="bg-purple-500/20 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300 font-medium">Costo por GB:</span>
                        <span className="text-2xl font-bold text-white">${resultado.costoPorGB.toLocaleString('es-CL')}</span>
                      </div>
                      <p className={`text-sm mt-2 ${resultado.color}`}>{resultado.evaluacion}</p>
                    </div>
                  </div>

                  <div className="border-t border-purple-500/30 pt-3">
                    <p className="text-gray-400 text-sm mb-2">Con {resultado.gigas} GB puedes:</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-300">📺 Streaming HD: <span className="text-white">{resultado.horasStreaming} horas</span></p>
                      <p className="text-gray-300">🎵 Musica: <span className="text-white">{resultado.horasMusica} horas</span></p>
                      <p className="text-gray-300">💻 Videollamadas: <span className="text-white">{resultado.horasVideoconferencia} horas</span></p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  * Estimacion referencial basada en consumos promedio.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Tipos de Servicios */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>📋</span> Servicios de Telecomunicaciones
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICIOS.map((servicio, i) => (
            <motion.div
              key={servicio.nombre}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 rounded-xl p-5 border border-violet-500/20 hover:border-violet-400/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{servicio.icono}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{servicio.nombre}</h3>
                  <p className="text-gray-400 text-sm mt-1">{servicio.descripcion}</p>
                  <p className="text-violet-400 text-sm mt-2">Regulacion: {servicio.regulacion}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {servicio.operadores.map((op) => (
                      <span key={op} className="px-2 py-0.5 bg-violet-500/20 rounded text-xs text-violet-300">
                        {op}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Operadores */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>📱</span> Operadores en Chile
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OPERADORES.map((operador, i) => (
              <motion.div
                key={operador.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl p-4 border border-violet-500/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{operador.icono}</span>
                  <h3 className="font-bold text-white">{operador.nombre}</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">Tipo: <span className="text-white">{operador.tipo}</span></p>
                  <p className="text-gray-300">Cobertura: <span className="text-white">{operador.cobertura}</span></p>
                  <p className="text-gray-300">Tecnologia: <span className="text-violet-400">{operador.tecnologia}</span></p>
                  <p className="text-gray-400 text-xs mt-2">Atencion: {operador.atencion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos para Reclamos */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>📝</span> Como Presentar un Reclamo
        </h2>

        <div className="grid md:grid-cols-6 gap-4">
          {PASOS.map((paso, i) => (
            <motion.div
              key={paso.paso}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                {paso.icono}
              </div>
              <div className="text-xs text-violet-400 mb-1">Paso {paso.paso}</div>
              <h3 className="font-bold text-white text-sm mb-1">{paso.titulo}</h3>
              <p className="text-gray-400 text-xs">{paso.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Glosario */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>📚</span> Glosario de Telecomunicaciones
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLOSARIO.map((item, i) => (
              <motion.div
                key={item.termino}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white/5 rounded-lg p-4 border border-violet-500/20"
              >
                <h3 className="font-bold text-violet-400 mb-1">{item.termino}</h3>
                <p className="text-gray-300 text-sm">{item.definicion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>🔗</span> Recursos Oficiales
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { nombre: 'SUBTEL', url: 'https://www.subtel.gob.cl', desc: 'Subsecretaria de Telecomunicaciones' },
            { nombre: 'Reclamos Online', url: 'https://www.subtel.gob.cl/reclamos/', desc: 'Presenta tu reclamo en linea' },
            { nombre: 'Portabilidad', url: 'https://www.portabilidad.cl', desc: 'Cambia de operador con tu numero' },
            { nombre: 'Cobertura', url: 'https://www.subtel.gob.cl/cobertura/', desc: 'Mapa de cobertura nacional' }
          ].map((recurso, i) => (
            <motion.a
              key={recurso.nombre}
              href={recurso.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-violet-500/20 transition-all"
            >
              <h3 className="font-bold text-white mb-1">{recurso.nombre}</h3>
              <p className="text-gray-400 text-sm">{recurso.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-violet-700/50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Telecomunicaciones - Un modulo de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-violet-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Conectando a Chile con informacion
          </p>
        </div>
      </footer>
    </div>
  );
}
