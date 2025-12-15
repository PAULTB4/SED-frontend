readme2.md
Nuevo
+155
-0

# SED - Sistema de Evaluación Docente (Frontend)

SPA React 18/Vite que habilita a la comisión, docentes y estudiantes de la Universidad Nacional Agraria de la Selva (UNAS) a gestionar y realizar evaluaciones docentes. Implementa arquitectura **Feature-Sliced Design (FSD)**, consume el backend Spring y muestra formularios dinámicos, métricas y flujos diferenciados por rol.

<div align="center">

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Feature-Sliced Design](https://img.shields.io/badge/Architecture-FSD-brightgreen)](https://feature-sliced.design/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📋 Descripción

**SED (Sistema de Evaluación Docente)** permite a los estudiantes evaluar a sus docentes de forma **anónima, segura y estructurada** al finalizar cada curso mediante calificación por estrellas (1-5) y comentarios anónimos. El frontend se divide por roles:

- **Comisión:** gestiona periodos, crea instrumentos (módulos/preguntas), los asigna a secciones y revisa métricas por periodo.
- **Docente:** consulta el resumen de evaluaciones por curso/sección (gráficos y tabla anónima) y exporta reportes.
- **Estudiante:** visualiza sus cursos con estado “Evaluar/Ya evaluado”, carga el instrumento real y envía respuestas.
- **Administrador:** administra usuarios, criterios de evaluación, cursos y estadísticas globales.

### Objetivos del Proyecto

1. Mejorar la calidad educativa mediante retroalimentación continua hacia los docentes.
2. Garantizar transparencia institucional con evaluaciones anónimas.
3. Apoyar decisiones académicas basadas en datos reales.
4. Facilitar la elección de cursos con referencias de otros estudiantes.

### Beneficios Esperados

- Docentes reciben feedback constructivo para mejorar.
- Estudiantes tienen voz en el proceso educativo.
- La institución toma decisiones informadas.
- Se promueve una cultura de mejora continua.

---

## 🚀 Cómo correr

Requisitos: Node.js >= 18.x y npm >= 9.x.

1. **Configurar variables de entorno (`.env.development` o `.env.local`):**
   ```env
   VITE_API_URL=http://localhost:8080/api
   VITE_API_TIMEOUT=10000
   VITE_TOKEN_KEY=sed_token
   ```
2. **Instalar dependencias y ejecutar:**
   ```bash
   npm install
   npm run dev
   # producción
   npm run build
   ```
3. La app corre en `http://localhost:5173`.

---

## 🏗️ Arquitectura

El proyecto usa **Feature-Sliced Design (FSD)** para organizar el código por dominios de negocio.

### Capas

```
┌─────────────────────────────────┐
│  App      (Configuración)       │ 🔴
├─────────────────────────────────┤
│  Pages    (Rutas)               │ 🟠
├─────────────────────────────────┤
│  Features (Funcionalidades)     │ 🟡
├─────────────────────────────────┤
│  Entities (Modelos)             │ 🟢
├─────────────────────────────────┤
│  Shared   (Código común)        │ 🔵
└─────────────────────────────────┘
```

### Patrones de Diseño

- Singleton: cliente HTTP único (`shared/api/apiClient.js`).
- Adapter: adaptación de DTOs en hooks.
- Strategy: validaciones por rol.
- State/Observer: estado global con Redux.
- Decorator (HOC): protección de rutas.

---

## 📂 Estructura del Proyecto

```
frontend/
├─ src/
│  ├─ app/routes/AppRouter.jsx              # Rutas por rol
│  ├─ pages/comision/*                      # Periodos, creación de evaluaciones, métricas
│  ├─ pages/docente/*                       # Dashboard y evaluaciones
│  ├─ pages/estudiante/*                    # Dashboard, evaluar, perfil
│  ├─ features/evaluacion-comision/api|hooks
│  ├─ features/evaluacion-estudiante/api|hooks
│  ├─ features/evaluaciones-docente/api|hooks
│  ├─ features/cursos/api
│  └─ shared/api/apiClient.js               # Singleton Axios con interceptor JWT/redirecciones 401/403
```

### Flujos implementados (archivos clave)

- **Comisión:**
  - Crear/editar instrumento y asignar a sección: `pages/comision/ComisionCrearEvaluacion.jsx`.
  - Métricas por periodo: `features/evaluacion-comision/hooks/useComisionData.js`.
- **Docente:**
  - Resumen por sección (gráficos + tabla): `pages/docente/DocenteEvaluaciones.jsx`, consume `features/evaluaciones-docente/api/resumenDocenteApi.js`.
- **Estudiante:**
  - Listado de cursos con estado: `features/evaluacion-estudiante/hooks/useEstudianteData.js`.
  - Formulario dinámico: `pages/estudiante/EstudianteEvaluar.jsx` (carga instrumento real y envía con `features/evaluacion-estudiante/api/evaluacionesApi.js`).
  - Perfil con código/carrera/semestre: `pages/estudiante/EstudiantePerfil.jsx`.

### Endpoints consumidos

- Auth: `/api/auth/**`.
- Periodos/Secciones: `/api/periodos/**`, `/api/comision/periodos/{id}/secciones`.
- Instrumentos: `/api/instrumentos`, `/api/instrumentos/{id}`, `/api/instrumentos/asignar`.
- Cursos: `/api/estudiante/cursos`, `/api/docente/cursos`.
- Evaluaciones: `POST /api/evaluaciones`, `GET /api/docente/evaluaciones/resumen`.
- Métricas comisión: `/api/comision/periodos/{periodoId}/metricas`.

---

## 🔐 Autenticación y Seguridad

- Autenticación con JWT y protección de rutas por rol.
- Validación de permisos en cada request y redirecciones automáticas 401/403.
- Anonimato garantizado en las evaluaciones.

---

## 🧪 Testing

```bash
npm run test            # Ejecutar tests
npm run test:coverage   # Ejecutar tests con cobertura
npm run test:watch      # Ejecutar tests en modo watch
```

---

## 📝 Licencia y Contacto

Proyecto académico (MIT) para la **Universidad Nacional Agraria de la Selva (UNAS)**. Contacto institucional: informes@unas.edu.pe.

<div align="center">

**Hecho con ❤️ por Zentry Corp**

</div>
