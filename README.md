# DOSIFICADOR - HMI

Interface HMI (Human-Machine Interface) industrial para el sistema **DoseMaster** — permite operar y monitorear un dosificador de componentes de ensamblaje en tiempo real.

## Screenshots

| Portal de Pedidos | Dashboard Operador |
|---|---|
| Formulario de nuevo pedido con cola en tiempo real | Pipeline de producción con métricas live |

## Descripción

El sistema consta de dos vistas principales:

## Stack

| Capa | Tecnología |
|---|---|
| UI Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Estilos | Tailwind CSS (Material Design 3) |
| Tipografía | Inter + Material Symbols |
| Linting | ESLint 9 (flat config) |

## Estructura

```
.
├── index.html              # Portal de pedidos (Purchase Portal)
└── Dosificador-HMI/        # App React — Dashboard del operador
    ├── src/
    │   ├── App.tsx
    │   └── main.tsx
    ├── vite.config.ts
    └── package.json
```

## Setup

```bash
cd Dosificador-HMI
bun install
bun run dev
```

El portal estático (`index.html`) puede abrirse directamente en el navegador sin servidor.

## Scripts

| Comando | Acción |
|---|---|
| `bun run dev` | Servidor de desarrollo |
| `bun run build` | Build de producción (`tsc -b && vite build`) |
| `bun run lint` | Verificar estilo con ESLint |
| `bun run preview` | Preview del build |
