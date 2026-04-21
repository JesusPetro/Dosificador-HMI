const TEAM = [
  { name: 'Victor Chamorro',  role: 'Electrónica',             src: '/avatars/Victor.png' },
  { name: 'Yhonatan Quiñonez',  role: 'Diseño',   src: '/avatars/Yhonatan.png' },
  { name: 'Alivettee Zambrano', role: 'Marketing',     src: '/avatars/Aly.png' },
  { name: 'Jesús Petro',  role: 'Prototipado', src: '/avatars/Jesus.png' },
  { name: 'Willian Navarro', role: 'Lider',             src: '/avatars/Willian.png' },
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
    <div className="flex flex-col items-center justify-center gap-12 px-6 h-full grow">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-on-surface">Quiénes somos</h2>
        <p className="text-sm text-on-surface-variant mt-1">El equipo detrás del sistema</p>
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className="flex gap-10 flex-wrap justify-center">
          {row1.map((m) => (
            <MemberCard key={m.name} name={m.name} role={m.role} src={m.src} />
          ))}
        </div>
        <div className="flex gap-10 flex-wrap justify-center">
          {row2.map((m) => (
            <MemberCard key={m.name} name={m.name} role={m.role} src={m.src} />
          ))}
        </div>
      </div>
    </div>
  )
}
