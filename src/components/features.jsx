function Features() {
  const data = [
    {
      title: "Logística Inteligente",
      desc: "Implementamos rutas optimizadas y monitoreo GPS en tiempo real para reducir el estrés animal y las pérdidas económicas.",
      icon: "🚛"
    },
    {
      title: "Administración por Roles",
      desc: "Paneles diferenciados para Administrador, Supervisor y Operario. Garantizamos seguridad de datos y eficiencia operativa.",
      icon: "👥"
    },
    {
      title: "Salud y Bienestar",
      desc: "Digitalización de historiales clínicos y alertas automáticas de vacunación integradas con sensores de monitoreo.",
      icon: "🏥"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-sm font-bold text-[#2E7D32] uppercase tracking-widest mb-2">Soluciones</h2>
        <h3 className="text-center text-3xl font-bold text-slate-800 mb-16">Problemáticas que resolvemos</h3>
        
        {data.map((item, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center gap-12 mb-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-64 h-64 bg-slate-100 rounded-2xl flex items-center justify-center text-7xl shadow-inner">
                {item.icon}
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h4 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h4>
              <p className="text-lg text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Features;
