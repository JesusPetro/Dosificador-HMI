const TEAM = [
  { name: 'Jesús Petro',  role: 'Desarrollador Full-Stack', src: '/avatars/JesusPetro.svg' },
  { name: 'María López',  role: 'Ingeniería de Procesos',   src: undefined },
  { name: 'Carlos Ramos', role: 'Automatización & PLC',     src: undefined },
  { name: 'Andrea Soto',  role: 'Diseño UX/UI',             src: undefined },
  { name: 'Luis Mendoza', role: 'QA & Pruebas',             src: undefined },
]

interface MemberCardProps {
  name: string
  role: string
  src?: string
}

function MemberCard({ name, role, src }: MemberCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div style={{ borderRadius: '50%' }} className="w-36 h-36 bg-surface-container border-4 border-outline-variant/30 shadow-md overflow-hidden">
        {src && <img src={src} alt={name} className="w-full h-full object-cover" />}
      </div>

      <div className="text-center">
        <p className="font-semibold text-on-surface text-sm">{name}</p>
        <p className="text-xs text-on-surface-variant mt-0.5">{role}</p>
      </div>
    </div>
  )
}

export default function TeamView() {
  const row1 = TEAM.slice(0, 3)
  const row2 = TEAM.slice(3)

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-on-surface">Quiénes somos</h2>
        <p className="text-sm text-on-surface-variant mt-1">El equipo detrás del sistema</p>
      </div>

      <div className="flex flex-col items-center gap-12">
        <div className="flex gap-12 flex-wrap justify-center">
          {row1.map((m) => (
            <MemberCard key={m.name} name={m.name} role={m.role} src={m.src} />
          ))}
        </div>
        <div className="flex gap-12 flex-wrap justify-center">
          {row2.map((m) => (
            <MemberCard key={m.name} name={m.name} role={m.role} src={m.src} />
          ))}
        </div>
      </div>
    </div>
  )
}
