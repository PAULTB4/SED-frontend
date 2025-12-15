# Frontend – SED (Sistema de Evaluación Docente)

SPA React/Vite para comisión, docentes y estudiantes. Consume el backend Spring y muestra formularios dinámicos, métricas y flujos por rol.

---

## 📋 Descripción
- Comisión: gestiona periodos, crea instrumentos (módulos/preguntas) y los asigna a secciones; ve métricas por periodo.
- Docente: ve resumen de evaluaciones por curso/sección (gráficos y tabla anónima).
- Estudiante: ve cursos con estado “Evaluar/Ya evaluado”, carga el instrumento real y envía sus respuestas.

---

## 🚀 Cómo correr
Requisitos: Node 18+, npm 9+.

1) Variables (`.env.development`):
```
VITE_API_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000
VITE_TOKEN_KEY=sed_token
```
2) Instalar y ejecutar:
```bash
npm install
npm run dev
# producción
npm run build
```
3) La app corre en `http://localhost:5173`.

---

## 🏗️ Arquitectura (FSD simplificada)
`src/`
- `app/routes/AppRouter.jsx` – Rutas por rol.
- `shared/api/apiClient.js` – Singleton Axios con interceptor JWT/redirecciones 401/403.
- `shared/ui/layouts/` – Layouts por rol (ComisionLayout, DocenteLayout, EstudianteLayout).
- `features/` – APIs/hooks por dominio:
  - `evaluacion-comision/api/instrumentosApi.js` (CRUD + asignar), `hooks/useComisionData.js`, `hooks/useSeccionesPeriodo.js`.
  - `evaluacion-estudiante/api/cursosEstudianteApi.js`, `api/evaluacionesApi.js` (enviar POST /evaluaciones), `hooks/useEstudianteData.js`.
  - `evaluaciones-docente/api/resumenDocenteApi.js`, `hooks/useDocenteData.js`.
  - `cursos/api/seccionesApi.js`, `cursos/api/cursosApi.js`.
- `pages/` – Vistas:
  - Comisión: `ComisionPeriodos.jsx`, `ComisionCrearEvaluacion.jsx` (crea/edita instrumento y asigna a secciones libres), `ComisionEvaluaciones.jsx`, etc.
  - Docente: `DocenteEvaluaciones.jsx` (gráficos barras/líneas + tabla).
  - Estudiante: `EstudianteDashboard.jsx` (estado Evaluar/Ya evaluado), `EstudianteEvaluar.jsx` (render dinámico de módulos/preguntas), `EstudiantePerfil.jsx` (código, carrera, semestre).

---

## 🔗 Endpoints consumidos
- Auth: `/api/auth/**`
- Periodos/Secciones: `/api/periodos/**`, `/api/comision/periodos/{id}/secciones`
- Instrumentos: `/api/instrumentos`, `/api/instrumentos/{id}`, `/api/instrumentos/asignar`
- Cursos: `/api/estudiante/cursos`, `/api/docente/cursos`
- Evaluaciones: `POST /api/evaluaciones`, `GET /api/docente/evaluaciones/resumen`
- Métricas comisión: `/api/comision/periodos/{periodoId}/metricas`

---

## 🌟 Flujos implementados (archivos clave)
- Comisión:
  - Crear/editar instrumento y asignar a sección: `pages/comision/ComisionCrearEvaluacion.jsx`
  - Métricas por periodo: `features/evaluacion-comision/hooks/useComisionData.js`
- Docente:
  - Resumen por sección (gráficos + tabla): `pages/docente/DocenteEvaluaciones.jsx`, consume `evaluaciones-docente/api/resumenDocenteApi.js`
- Estudiante:
  - Listado de cursos con estado: `features/evaluacion-estudiante/hooks/useEstudianteData.js`
  - Formulario dinámico: `pages/estudiante/EstudianteEvaluar.jsx` (carga instrumento real y envía con `evaluacionesApi.enviar`)
  - Perfil con código/carrera/semestre: `pages/estudiante/EstudiantePerfil.jsx`

---

## 📂 Estructura rápida
```
frontend/
├─ src/
│  ├─ app/routes/AppRouter.jsx
│  ├─ pages/comision/* (periodos, crear evaluación, métricas)
│  ├─ pages/docente/* (dashboard, evaluaciones)
│  ├─ pages/estudiante/* (dashboard, evaluar, perfil)
│  ├─ features/evaluacion-comision/api|hooks
│  ├─ features/evaluacion-estudiante/api|hooks
│  ├─ features/evaluaciones-docente/api|hooks
│  ├─ features/cursos/api
│  └─ shared/api/apiClient.js
```

---

## 📊 Relación con el curso (contenidos)
- UI/UX dinámica: formularios construidos desde el instrumento (Gestalt/Nielsen, responsividad).
- Diseño de datos: consumo de estructuras relacionales (periodos, secciones, instrumentos, evaluaciones).
- Patrones: singleton (apiClient), separación por feature (FSD), adaptación de DTOs en hooks.

---
