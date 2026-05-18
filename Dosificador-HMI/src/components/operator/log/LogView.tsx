import { useEffect, useRef } from 'react'
import { ALL_LEVELS, LEVEL_CFG } from './logData'
import { useLogStream } from './useLogStream'
import type { LogEntry } from './logData'
import type { LevelFilter } from './useLogStream'

// ─── LogLine ────────────────────────────────────────────────────────────────

function LogLine({ entry }: { entry: LogEntry }) {
  const cfg = LEVEL_CFG[entry.level]
  return (
    <div className="flex items-start gap-3 px-4 py-2 hover:bg-surface-container/60 group transition-colors">
      <span className="font-mono text-[11px] text-on-surface-variant/50 shrink-0 mt-0.5 tabular-nums w-[7ch]">
        {entry.timestamp}
      </span>

      <span
        className={`inline-flex items-center gap-1 shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${cfg.text} ${cfg.bg}`}
        style={{ minWidth: '4.5rem', justifyContent: 'center' }}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        {cfg.label}
      </span>

      <span className="font-mono text-[11px] font-bold text-on-surface-variant/60 shrink-0 mt-0.5 uppercase tracking-wider w-[5ch]">
        {entry.source}
      </span>

      <span className="text-xs text-on-surface leading-relaxed min-w-0 break-words">
        {entry.message}
      </span>
    </div>
  )
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

interface ToolbarProps {
  levelFilter: LevelFilter
  setLevelFilter: (l: LevelFilter) => void
  counts: Record<string, number>
  search: string
  setSearch: (s: string) => void
  streaming: boolean
  setStreaming: (v: boolean) => void
  autoScroll: boolean
  setAutoScroll: (v: boolean) => void
  clearLogs: () => void
}

function Toolbar({
  levelFilter, setLevelFilter, counts,
  search, setSearch,
  streaming, setStreaming,
  autoScroll, setAutoScroll,
  clearLogs,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-outline-variant/15 bg-surface-container/40">
      {/* Chips de nivel */}
      <div className="flex items-center gap-1 flex-wrap">
        <button
          onClick={() => setLevelFilter('all')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
            levelFilter === 'all'
              ? 'bg-primary text-white'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Todo
        </button>
        {ALL_LEVELS.map(level => {
          const cfg = LEVEL_CFG[level]
          const active = levelFilter === level
          return (
            <button
              key={level}
              onClick={() => setLevelFilter(active ? 'all' : level)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                active
                  ? `${cfg.bg} ${cfg.text} ring-1 ring-current`
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cfg.label}
              {counts[level] > 0 && (
                <span className="font-mono">{counts[level]}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Buscador */}
      <div className="flex items-center gap-1.5 bg-surface-container rounded-lg px-2.5 py-1.5 flex-1 min-w-[140px] max-w-xs border border-outline-variant/20">
        <span className="material-symbols-outlined text-on-surface-variant/50 text-base">search</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filtrar mensajes..."
          className="bg-transparent text-xs text-on-surface placeholder:text-on-surface-variant/40 outline-none w-full"
        />
        {search && (
          <button onClick={() => setSearch('')}>
            <span className="material-symbols-outlined text-on-surface-variant/50 text-base hover:text-on-surface">close</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        {/* Auto-scroll */}
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          title={autoScroll ? 'Desactivar auto-scroll' : 'Activar auto-scroll'}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
            autoScroll
              ? 'bg-primary/10 text-primary'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-base">vertical_align_bottom</span>
        </button>

        {/* Stream toggle */}
        <button
          onClick={() => setStreaming(!streaming)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
            streaming
              ? 'bg-green-100 text-green-700'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${streaming ? 'bg-green-500 animate-pulse' : 'bg-neutral-400'}`}
          />
          {streaming ? 'Live' : 'Pausado'}
        </button>

        {/* Clear */}
        <button
          onClick={clearLogs}
          title="Limpiar registros"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:bg-red-50 hover:text-red-600 transition-colors text-[10px] font-bold uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-base">delete_sweep</span>
        </button>
      </div>
    </div>
  )
}

// ─── StatusBar ───────────────────────────────────────────────────────────────

function StatusBar({
  totalCount,
  visibleCount,
  streaming,
}: {
  totalCount: number
  visibleCount: number
  streaming: boolean
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-outline-variant/15 bg-surface-container/30 text-[10px] font-mono text-on-surface-variant/60">
      <div className="flex items-center gap-3">
        <span>
          {visibleCount === totalCount
            ? `${totalCount} entradas`
            : `${visibleCount} / ${totalCount} entradas`}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${streaming ? 'bg-green-500' : 'bg-neutral-400'}`} />
        <span>{streaming ? 'Transmisión activa' : 'Transmisión pausada'}</span>
      </div>
    </div>
  )
}

// ─── LogView ─────────────────────────────────────────────────────────────────

export default function LogView() {
  const {
    logs, totalCount, counts,
    levelFilter, setLevelFilter,
    search, setSearch,
    streaming, setStreaming,
    autoScroll, setAutoScroll,
    clearLogs,
  } = useLogStream()

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, autoScroll])

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden font-mono">
      {/* Cabecera */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/15 bg-surface-container/30">
        <span
          className="material-symbols-outlined text-on-surface-variant text-lg"
          style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
        >
          terminal
        </span>
        <span className="text-xs font-bold text-on-surface uppercase tracking-wider font-sans">
          Registros del sistema
        </span>
      </div>

      <Toolbar
        levelFilter={levelFilter}
        setLevelFilter={setLevelFilter}
        counts={counts}
        search={search}
        setSearch={setSearch}
        streaming={streaming}
        setStreaming={setStreaming}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        clearLogs={clearLogs}
      />

      {/* Lista de logs */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto divide-y divide-outline-variant/10"
        onWheel={() => {
          if (autoScroll) setAutoScroll(false)
        }}
      >
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 h-40 text-on-surface-variant/40">
            <span className="material-symbols-outlined text-3xl">inbox</span>
            <span className="text-xs font-sans">Sin entradas para mostrar</span>
          </div>
        ) : (
          logs.map(entry => <LogLine key={entry.id} entry={entry} />)
        )}
      </div>

      <StatusBar
        totalCount={totalCount}
        visibleCount={logs.length}
        streaming={streaming}
      />
    </div>
  )
}
