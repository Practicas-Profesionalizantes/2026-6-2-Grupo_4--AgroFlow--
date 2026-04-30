function Sidebar() {
  return (
    <>
      <header className="bg-[#ECEFF1] border-b border-[#CFD8DC] fixed top-0 w-full z-50 flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="text-lg md:text-xl font-black text-[#2E7D32] uppercase tracking-widest font-['Work_Sans']">
            AgroFlow
          </span>
        </div>
        
        {/* Nav adaptado: sin 'hidden' para que se vea en móvil */}
        <nav className="flex gap-4 md:gap-8">
          <a className="text-xs md:text-sm bg-[#2E7D32] text-white px-3 py-1 rounded-none font-semibold shadow-sm" href="#">
            Iniciar Sesión
          </a>
          <a className="text-xs md:text-sm bg-[#2E7D32] text-white px-3 py-1 rounded-none font-semibold shadow-sm" href="#">
            Registro
            </a>

        </nav>
      </header>
    </>
  )
}

export default Sidebar
