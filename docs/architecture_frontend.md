# Arquitectura Frontend - SED (Sistema de Evaluación Docente)

## Información General

**Nombre del Proyecto:** SED - Sistema de Evaluación Docente  
**Arquitectura:** Feature-Sliced Design (FSD)  
**Framework:** React 18+  
**Patrón de Comunicación:** API REST  
**Organización:** Por funcionalidades de negocio con separación de capas  
**Fecha de creación:** Diciembre 2024  

---

## Tabla de Contenidos

1. [Descripción de la Arquitectura](#descripción-de-la-arquitectura)
2. [Principios de FSD](#principios-de-fsd)
3. [Estructura Completa del Proyecto](#estructura-completa-del-proyecto)
4. [Descripción de Directorios](#descripción-de-directorios)
5. [Flujo de Datos](#flujo-de-datos)
6. [Reglas de Dependencias](#reglas-de-dependencias)
7. [Convenciones de Nombres](#convenciones-de-nombres)
8. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Descripción de la Arquitectura

Feature-Sliced Design (FSD) es una arquitectura frontend que organiza el código por **funcionalidades de negocio** en lugar de por tipo técnico. Cada funcionalidad (feature) es independiente y contiene todo lo necesario para su funcionamiento: UI, lógica, API calls y estado.

### ¿Por qué FSD para SED?

- ✅ **Múltiples roles diferenciados** (Administrador, Comisión, Estudiante, Docente)
- ✅ **Escalabilidad** a largo plazo
- ✅ **Trabajo en equipo** sin conflictos
- ✅ **Separación clara** de responsabilidades
- ✅ **Fácil mantenimiento** y testing

---

## Principios de FSD

### 1. **Separación por Capas (Layers)**
El proyecto se divide en 5 capas principales con responsabilidades específicas.

### 2. **Aislamiento de Features**
Cada feature es autocontenida y no debe depender de otras features.

### 3. **Flujo de Dependencias Unidireccional**
Las dependencias fluyen de arriba hacia abajo:
```
app → pages → features → entities → shared
```

### 4. **Public API**
Cada módulo expone solo lo necesario mediante index.js (barrel exports).

---

## Estructura Completa del Proyecto
```
/sed-frontend
│
├── /public                           # Archivos estáticos públicos
│   ├── index.html                    # HTML principal
│   ├── favicon.ico                   # Ícono de la aplicación
│   ├── robots.txt                    # Configuración para crawlers
│   └── /assets                       # Imágenes, logos estáticos
│       ├── logo-universidad.png
│       └── placeholder.png
│
├── /src                              # Código fuente principal
│   │
│   ├── /app                          # 🔴 CAPA 1: Configuración global de la aplicación
│   │   │
│   │   ├── /providers                # Proveedores de contexto global
│   │   │   ├── AuthProvider.jsx      # Proveedor de autenticación
│   │   │   ├── ThemeProvider.jsx     # Proveedor de tema (light/dark)
│   │   │   ├── ToastProvider.jsx     # Proveedor de notificaciones
│   │   │   └── index.js              # Exportación de todos los providers
│   │   │
│   │   ├── /routes                   # Configuración de rutas
│   │   │   ├── AppRouter.jsx         # Router principal con rutas públicas/privadas
│   │   │   ├── PrivateRoute.jsx      # HOC para rutas protegidas
│   │   │   ├── RoleRoute.jsx         # HOC para rutas por rol
│   │   │   ├── routes.config.js      # Configuración centralizada de rutas
│   │   │   └── index.js
│   │   │
│   │   ├── /store                    # Estado global (Redux/Zustand)
│   │   │   ├── store.js              # Configuración del store
│   │   │   ├── rootReducer.js        # Combinación de reducers
│   │   │   └── index.js
│   │   │
│   │   ├── App.jsx                   # Componente raíz de la aplicación
│   │   ├── App.css                   # Estilos del componente App
│   │   └── index.js                  # Punto de entrada de React
│   │
│   ├── /pages                        # 🟠 CAPA 2: Páginas completas (rutas)
│   │   │
│   │   ├── /auth                     # Páginas de autenticación
│   │   │   ├── LoginPage.jsx         # Página de inicio de sesión
│   │   │   ├── ForgotPasswordPage.jsx # Página de recuperación de contraseña
│   │   │   ├── ResetPasswordPage.jsx # Página de reseteo de contraseña
│   │   │   └── index.js
│   │   │
│   │   ├── /admin                    # Páginas del administrador
│   │   │   ├── AdminDashboardPage.jsx # Dashboard principal del admin
│   │   │   ├── GestionUsuariosPage.jsx # Gestión de usuarios
│   │   │   ├── ConfiguracionPage.jsx # Configuración del sistema
│   │   │   └── index.js
│   │   │
│   │   ├── /comision                 # Páginas de la comisión
│   │   │   ├── ComisionDashboardPage.jsx # Dashboard de la comisión
│   │   │   ├── RevisionEvaluacionesPage.jsx # Revisión de evaluaciones
│   │   │   ├── ReportesComisionPage.jsx # Reportes para comisión
│   │   │   └── index.js
│   │   │
│   │   ├── /estudiante               # Páginas del estudiante
│   │   │   ├── EstudianteDashboardPage.jsx # Dashboard del estudiante
│   │   │   ├── EvaluarDocentePage.jsx # Página para evaluar docente
│   │   │   ├── MisEvaluacionesPage.jsx # Historial de evaluaciones
│   │   │   └── index.js
│   │   │
│   │   ├── /docente                  # Páginas del docente
│   │   │   ├── DocenteDashboardPage.jsx # Dashboard del docente
│   │   │   ├── VerEvaluacionesPage.jsx # Ver sus evaluaciones
│   │   │   ├── EstadisticasPage.jsx  # Estadísticas personales
│   │   │   └── index.js
│   │   │
│   │   └── /error                    # Páginas de error
│   │       ├── NotFoundPage.jsx      # Error 404
│   │       ├── UnauthorizedPage.jsx  # Error 403
│   │       ├── ServerErrorPage.jsx   # Error 500
│   │       └── index.js
│   │
│   ├── /features                     # 🟡 CAPA 3: Funcionalidades de negocio
│   │   │
│   │   ├── /auth                     # Feature: Autenticación y autorización
│   │   │   │
│   │   │   ├── /ui                   # Componentes de UI
│   │   │   │   ├── LoginForm.jsx     # Formulario de login
│   │   │   │   ├── LogoutButton.jsx  # Botón de cerrar sesión
│   │   │   │   ├── ForgotPasswordForm.jsx # Formulario recuperar contraseña
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /api                  # Llamadas a la API
│   │   │   │   ├── authApi.js        # Endpoints de autenticación
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /hooks                # Hooks personalizados
│   │   │   │   ├── useAuth.js        # Hook para autenticación
│   │   │   │   ├── useLogin.js       # Hook para login
│   │   │   │   ├── useLogout.js      # Hook para logout
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /model                # Lógica de negocio y estado
│   │   │   │   ├── authSlice.js      # Redux slice para auth
│   │   │   │   ├── authSelectors.js  # Selectores de estado
│   │   │   │   ├── authUtils.js      # Utilidades de autenticación
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js              # Public API del feature
│   │   │
│   │   ├── /evaluacion-docente       # Feature: Evaluación de docentes
│   │   │   │
│   │   │   ├── /ui
│   │   │   │   ├── EvaluacionForm.jsx # Formulario de evaluación
│   │   │   │   ├── ListaEvaluaciones.jsx # Lista de evaluaciones
│   │   │   │   ├── DetalleEvaluacion.jsx # Detalle de evaluación
│   │   │   │   ├── CriteriosEvaluacion.jsx # Criterios de evaluación
│   │   │   │   ├── CalificacionItem.jsx # Item de calificación
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /api
│   │   │   │   ├── evaluacionApi.js  # Endpoints de evaluaciones
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /hooks
│   │   │   │   ├── useEvaluacion.js  # Hook crear/editar evaluación
│   │   │   │   ├── useEvaluaciones.js # Hook listar evaluaciones
│   │   │   │   ├── useEvaluacionForm.js # Hook manejo del formulario
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /model
│   │   │   │   ├── evaluacionSlice.js # Estado de evaluaciones
│   │   │   │   ├── validaciones.js   # Validaciones del formulario
│   │   │   │   ├── calculos.js       # Cálculos de puntajes
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── /docentes                 # Feature: Gestión de docentes
│   │   │   │
│   │   │   ├── /ui
│   │   │   │   ├── ListaDocentes.jsx # Lista de docentes
│   │   │   │   ├── PerfilDocente.jsx # Perfil del docente
│   │   │   │   ├── FormDocente.jsx   # Formulario CRUD docente
│   │   │   │   ├── FiltrosDocentes.jsx # Filtros de búsqueda
│   │   │   │   ├── DocenteCard.jsx   # Card de docente
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /api
│   │   │   │   ├── docentesApi.js    # Endpoints de docentes
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /hooks
│   │   │   │   ├── useDocentes.js    # Hook listar docentes
│   │   │   │   ├── useDocente.js     # Hook docente individual
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /model
│   │   │   │   ├── docentesSlice.js  # Estado de docentes
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── /estudiantes              # Feature: Gestión de estudiantes
│   │   │   │
│   │   │   ├── /ui
│   │   │   │   ├── ListaEstudiantes.jsx
│   │   │   │   ├── PerfilEstudiante.jsx
│   │   │   │   ├── FormEstudiante.jsx
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /api
│   │   │   │   ├── estudiantesApi.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /hooks
│   │   │   │   ├── useEstudiantes.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /model
│   │   │   │   ├── estudiantesSlice.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── /cursos                   # Feature: Gestión de cursos
│   │   │   │
│   │   │   ├── /ui
│   │   │   │   ├── ListaCursos.jsx
│   │   │   │   ├── DetalleCurso.jsx
│   │   │   │   ├── FormCurso.jsx
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /api
│   │   │   │   ├── cursosApi.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /hooks
│   │   │   │   ├── useCursos.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /model
│   │   │   │   ├── cursosSlice.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── /reportes                 # Feature: Reportes y estadísticas
│   │   │   │
│   │   │   ├── /ui
│   │   │   │   ├── ReporteGeneral.jsx # Reporte general del sistema
│   │   │   │   ├── ReporteDocente.jsx # Reporte por docente
│   │   │   │   ├── GraficosEvaluacion.jsx # Gráficos estadísticos
│   │   │   │   ├── TablaEstadisticas.jsx # Tabla de estadísticas
│   │   │   │   ├── FiltrosReporte.jsx # Filtros de reportes
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /api
│   │   │   │   ├── reportesApi.js    # Endpoints de reportes
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /hooks
│   │   │   │   ├── useReportes.js    # Hook para reportes
│   │   │   │   ├── useEstadisticas.js # Hook estadísticas
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /model
│   │   │   │   ├── reportesUtils.js  # Utilidades para reportes
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── /perfil                   # Feature: Perfil de usuario
│   │   │   │
│   │   │   ├── /ui
│   │   │   │   ├── PerfilUsuario.jsx # Vista del perfil
│   │   │   │   ├── EditarPerfil.jsx  # Editar perfil
│   │   │   │   ├── CambiarPassword.jsx # Cambiar contraseña
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /api
│   │   │   │   ├── perfilApi.js      # Endpoints de perfil
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /hooks
│   │   │   │   ├── usePerfil.js      # Hook perfil
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── /model
│   │   │   │   ├── perfilSlice.js    # Estado del perfil
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   └── /notificaciones           # Feature: Sistema de notificaciones
│   │       │
│   │       ├── /ui
│   │       │   ├── NotificacionesList.jsx
│   │       │   ├── NotificacionItem.jsx
│   │       │   └── index.js
│   │       │
│   │       ├── /api
│   │       │   ├── notificacionesApi.js
│   │       │   └── index.js
│   │       │
│   │       ├── /hooks
│   │       │   ├── useNotificaciones.js
│   │       │   └── index.js
│   │       │
│   │       ├── /model
│   │       │   ├── notificacionesSlice.js
│   │       │   └── index.js
│   │       │
│   │       └── index.js
│   │
│   ├── /entities                     # 🟢 CAPA 4: Modelos de dominio
│   │   │
│   │   ├── /usuario                  # Entidad: Usuario
│   │   │   ├── model.js              # Interface/Type de Usuario
│   │   │   ├── constants.js          # Constantes (ROLES, ESTADOS)
│   │   │   ├── types.js              # TypeScript types/interfaces
│   │   │   └── index.js
│   │   │
│   │   ├── /docente                  # Entidad: Docente
│   │   │   ├── model.js              # Interface/Type de Docente
│   │   │   ├── constants.js          # Constantes específicas
│   │   │   └── index.js
│   │   │
│   │   ├── /estudiante               # Entidad: Estudiante
│   │   │   ├── model.js
│   │   │   ├── constants.js
│   │   │   └── index.js
│   │   │
│   │   ├── /evaluacion               # Entidad: Evaluación
│   │   │   ├── model.js              # Interface/Type de Evaluación
│   │   │   ├── constants.js          # Estados, tipos de evaluación
│   │   │   └── index.js
│   │   │
│   │   ├── /curso                    # Entidad: Curso
│   │   │   ├── model.js
│   │   │   ├── constants.js
│   │   │   └── index.js
│   │   │
│   │   └── /criterio                 # Entidad: Criterio de evaluación
│   │       ├── model.js
│   │       ├── constants.js
│   │       └── index.js
│   │
│   ├── /shared                       # 🔵 CAPA 5: Código compartido
│   │   │
│   │   ├── /api                      # Cliente HTTP y configuración
│   │   │   ├── apiClient.js          # Instancia de Axios configurada
│   │   │   ├── interceptors.js       # Interceptors (auth, errors)
│   │   │   ├── endpoints.js          # URLs base de endpoints
│   │   │   ├── errorHandler.js       # Manejo centralizado de errores
│   │   │   └── index.js
│   │   │
│   │   ├── /ui                       # Componentes UI reutilizables
│   │   │   │
│   │   │   ├── /components           # Componentes genéricos
│   │   │   │   ├── Button.jsx        # Botón reutilizable
│   │   │   │   ├── Input.jsx         # Input reutilizable
│   │   │   │   ├── Select.jsx        # Select reutilizable
│   │   │   │   ├── Textarea.jsx      # Textarea reutilizable
│   │   │   │   ├── Checkbox.jsx      # Checkbox reutilizable
│   │   │   │   ├── Radio.jsx         # Radio button reutilizable
│   │   │   │   ├── Modal.jsx         # Modal genérico
│   │   │   │   ├── Table.jsx         # Tabla reutilizable
│   │   │   │   ├── Pagination.jsx    # Paginación
│   │   │   │   ├── Loader.jsx        # Spinner de carga
│   │   │   │   ├── Card.jsx          # Card genérico
│   │   │   │   ├── Badge.jsx         # Badge/etiqueta
│   │   │   │   ├── Alert.jsx         # Alerta/notificación
│   │   │   │   ├── Tooltip.jsx       # Tooltip
│   │   │   │   ├── Dropdown.jsx      # Dropdown menu
│   │   │   │   ├── Tabs.jsx          # Tabs/pestañas
│   │   │   │   ├── Breadcrumb.jsx    # Breadcrumb navigation
│   │   │   │   ├── Avatar.jsx        # Avatar de usuario
│   │   │   │   ├── EmptyState.jsx    # Estado vacío
│   │   │   │   ├── ErrorBoundary.jsx # Boundary para errores
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── /layouts              # Layouts de página
│   │   │       ├── MainLayout.jsx    # Layout principal
│   │   │       ├── AuthLayout.jsx    # Layout para auth
│   │   │       ├── AdminLayout.jsx   # Layout para admin
│   │   │       ├── DashboardLayout.jsx # Layout para dashboards
│   │   │       ├── Header.jsx        # Header global
│   │   │       ├── Sidebar.jsx       # Sidebar navigation
│   │   │       ├── Footer.jsx        # Footer global
│   │   │       └── index.js
│   │   │
│   │   ├── /hooks                    # Hooks genéricos reutilizables
│   │   │   ├── useDebounce.js        # Hook para debounce
│   │   │   ├── useLocalStorage.js    # Hook para localStorage
│   │   │   ├── useSessionStorage.js  # Hook para sessionStorage
│   │   │   ├── useToggle.js          # Hook para toggle boolean
│   │   │   ├── useMediaQuery.js      # Hook para media queries
│   │   │   ├── useClickOutside.js    # Hook para clicks fuera
│   │   │   ├── usePagination.js      # Hook para paginación
│   │   │   ├── useForm.js            # Hook para formularios
│   │   │   ├── useFetch.js           # Hook genérico para fetch
│   │   │   └── index.js
│   │   │
│   │   ├── /utils                    # Utilidades y helpers
│   │   │   ├── formatters.js         # Formateo de datos (fechas, números)
│   │   │   ├── validators.js         # Validaciones comunes
│   │   │   ├── helpers.js            # Funciones helper generales
│   │   │   ├── storage.js            # Utilidades para storage
│   │   │   ├── array.js              # Utilidades para arrays
│   │   │   ├── string.js             # Utilidades para strings
│   │   │   ├── date.js               # Utilidades para fechas
│   │   │   └── index.js
│   │   │
│   │   ├── /constants                # Constantes globales
│   │   │   ├── roles.js              # Roles del sistema
│   │   │   ├── routes.js             # Rutas de la aplicación
│   │   │   ├── apiRoutes.js          # Rutas de la API
│   │   │   ├── config.js             # Configuración general
│   │   │   ├── messages.js           # Mensajes del sistema
│   │   │   └── index.js
│   │   │
│   │   └── /lib                      # Librerías externas configuradas
│   │       ├── axios.js              # Configuración de Axios
│   │       ├── yup.js                # Configuración de Yup
│   │       ├── reactQuery.js         # Configuración de React Query
│   │       └── index.js
│   │
│   └── /styles                       # Estilos globales
│       ├── globals.css               # Estilos globales base
│       ├── variables.css             # Variables CSS (colores, espaciado)
│       ├── reset.css                 # CSS reset
│       ├── typography.css            # Tipografía global
│       ├── utilities.css             # Clases utilitarias
│       └── themes.css                # Temas (light/dark)
│
├── /.vscode                          # Configuración de VSCode
│   ├── settings.json                 # Settings del proyecto
│   ├── extensions.json               # Extensiones recomendadas
│   └── launch.json                   # Configuración de debug
│
├── .env.example                      # Ejemplo de variables de entorno
├── .env.local                        # Variables de entorno locales (no commitear)
├── .env.development                  # Variables para desarrollo
├── .env.production                   # Variables para producción
├── .gitignore                        # Archivos ignorados por Git
├── .eslintrc.json                    # Configuración de ESLint
├── .prettierrc                       # Configuración de Prettier
├── package.json                      # Dependencias y scripts
├── package-lock.json                 # Lockfile de dependencias
├── jsconfig.json                     # Configuración de JavaScript/paths
├── README.md                         # Documentación principal
└── architecture_frontend.md          # Este documento
```

---

## Descripción de Directorios

### 📁 **/public**
**Propósito:** Archivos estáticos que se sirven directamente sin procesamiento de Webpack/Vite.

**Qué hacer:**
- Colocar imágenes estáticas (logos, favicons)
- Archivos robots.txt, manifest.json
- Assets que no cambien frecuentemente

**Qué NO hacer:**
- No colocar componentes React
- No colocar código JavaScript que necesite compilación

---

### 📁 **/src/app** (Capa 1)
**Propósito:** Configuración global de la aplicación. Inicialización de providers, rutas y store.

**Qué hacer:**
- Configurar providers globales (Auth, Theme, Toast)
- Definir rutas principales de la aplicación
- Configurar el store global (Redux/Zustand)
- Inicializar librerías de terceros

**Qué NO hacer:**
- No incluir lógica de negocio específica
- No crear componentes UI aquí
- No hacer llamadas directas a la API

**Archivos clave:**
- `App.jsx`: Componente raíz que envuelve toda la app
- `index.js`: Punto de entrada de React
- `routes/AppRouter.jsx`: Configuración de React Router
- `providers/`: Context providers globales

---

### 📁 **/src/pages** (Capa 2)
**Propósito:** Páginas completas que corresponden a rutas de la aplicación. Composición de features.

**Qué hacer:**
- Crear una página por cada ruta principal
- Componer features para formar la vista completa
- Manejar la estructura/layout de la página
- Implementar lógica de routing

**Qué NO hacer:**
- No incluir lógica de negocio compleja
- No hacer llamadas directas a la API (usar features)
- No crear componentes reutilizables aquí

**Ejemplo:**
```jsx
// pages/estudiante/EstudianteDashboardPage.jsx
import { EvaluacionForm } from '@/features/evaluacion-docente';
import { ListaCursos } from '@/features/cursos';
import { MainLayout } from '@/shared/ui/layouts';

export const EstudianteDashboardPage = () => {
  return (
    <MainLayout>
      <h1>Mi Dashboard</h1>
      <ListaCursos />
      <EvaluacionForm />
    </MainLayout>
  );
};
```

---

### 📁 **/src/features** (Capa 3)
**Propósito:** Funcionalidades de negocio autocontenidas. Cada feature agrupa todo lo relacionado a una funcionalidad específica.

**Estructura interna de cada feature:**
```
/features/nombre-feature/
  ├── /ui           # Componentes visuales
  ├── /api          # Llamadas HTTP
  ├── /hooks        # Lógica reutilizable
  ├── /model        # Estado y lógica de negocio
  └── index.js      # Public API
```

**Qué hacer:**
- Crear features independientes y autocontenidas
- Agrupar UI, lógica, API y estado relacionados
- Exportar solo lo necesario en index.js
- Mantener features desacopladas entre sí

**Qué NO hacer:**
- No importar de otras features directamente (usar entities/shared)
- No mezclar responsabilidades de diferentes features
- No exponer implementación interna (usar barrel exports)

**Ejemplo de feature:**
```javascript
// features/evaluacion-docente/api/evaluacionApi.js
import apiClient from '@/shared/api/apiClient';

export const evaluacionApi = {
  crear: (data) => apiClient.post('/evaluaciones', data),
  listar: (params) => apiClient.get('/evaluaciones', { params }),
  obtenerPorId: (id) => apiClient.get(`/evaluaciones/${id}`),
  actualizar: (id, data) => apiClient.put(`/evaluaciones/${id}`, data),
  eliminar: (id) => apiClient.delete(`/evaluaciones/${id}`)
};
```

---

### 📁 **/src/entities** (Capa 4)
**Propósito:** Definiciones de modelos de dominio, tipos y constantes relacionadas con las entidades del negocio.

**Qué hacer:**
- Definir interfaces/types de las entidades
- Declarar constantes relacionadas (estados, tipos)
- Crear funciones de transformación de datos
- Definir validaciones a nivel de entidad

**Qué NO hacer:**
- No incluir lógica de UI
- No hacer llamadas a API
- No incluir hooks de React

**Ejemplo:**
```javascript
// entities/usuario/constants.js
export const ROLES = {
  ADMIN: 'ADMINISTRADOR',
  COMISION: 'COMISION',
  ESTUDIANTE: 'ESTUDIANTE',
  DOCENTE: 'DOCENTE'
};

export const ESTADOS_USUARIO = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
  BLOQUEADO: 'BLOQUEADO'
};

// entities/usuario/model.js
export class Usuario {
  constructor(data) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.email = data.email;
    this.rol = data.rol;
    this.estado = data.estado;
  }

  isAdmin() {
    return this.rol === ROLES.ADMIN;
  }

  isActivo() {
    return this.estado === ESTADOS_USUARIO.ACTIVO;
  }
}
```

---

### 📁 **/src/shared** (Capa 5)
**Propósito:** Código compartido por toda la aplicación. Componentes, hooks, utilidades y configuraciones genéricas.

#### 📂 **/shared/api**
**Qué hacer:**
- Configurar cliente HTTP (Axios/Fetch)
- Definir interceptors para auth y errores
- Centralizar manejo de errores de API
- Definir endpoints base

**Ejemplo:**
```javascript
// shared/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

#### 📂 **/shared/ui/components**
**Qué hacer:**
- Crear componentes UI genéricos y reutilizables
- Implementar variantes y estados de componentes
- Documentar props y casos de uso
- Mantener componentes sin lógica de negocio

**Ejemplo:**
```jsx
// shared/ui/components/Button.jsx
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  };
  const sizeClasses = {
    small: 'btn-sm',
    medium: 'btn-md',
    large: 'btn-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### 📂 **/shared/hooks**
**Qué hacer:**
- Crear hooks genéricos sin lógica de dominio
- Implementar hooks para comportamientos comunes
- Documentar parámetros y retorno

**Ejemplo:**
```javascript
// shared/hooks/useDebounce.js
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

#### 📂 **/shared/utils**
**Qué hacer:**
- Crear funciones utilitarias puras
- Implementar helpers para transformación de datos
- Validaciones y formateos genéricos

**Ejemplo:**
```javascript
// shared/utils/formatters.js
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  // Implementación de formateo de fecha
};

export const formatCurrency = (amount, currency = 'PEN') => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency
  }).format(amount);
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
```

---

## Flujo de Datos

### 1. **Usuario realiza una acción**
```
Usuario → Componente UI (Page/Feature)
```

### 2. **Componente usa un hook**
```
Componente → Hook personalizado → API call
```

### 3. **Hook llama a la API**
```
Hook → API module → apiClient (Axios) → Backend
```

### 4. **Respuesta del backend**
```
Backend → apiClient → API module → Hook → Update State
```

### 5. **Estado actualiza UI**
```
State change → Re-render → UI actualizada
```

### Ejemplo completo:
```
[Usuario clickea "Evaluar Docente"]
        ↓
[EvaluacionForm.jsx usa useEvaluacion hook]
        ↓
[useEvaluacion() llama a evaluacionApi.crear()]
        ↓
[evaluacionApi usa apiClient.post()]
        ↓
[apiClient (Axios) envía request a API]
        ↓
[Backend procesa y responde]
        ↓
[apiClient recibe respuesta]
        ↓
[useEvaluacion actualiza estado local]
        ↓
[Redux/Zustand actualiza estado global]
        ↓
[Componente re-renderiza con nuevos datos]
        ↓
[Usuario ve feedback de éxito]
```

---

## Reglas de Dependencias

### Regla de Oro: **Flujo Unidireccional**
```
app → pages → features → entities → shared
```

### ✅ Dependencias PERMITIDAS:

1. **App puede importar de:** pages, features, entities, shared
2. **Pages pueden importar de:** features, entities, shared
3. **Features pueden importar de:** entities, shared (NO otras features)
4. **Entities pueden importar de:** shared
5. **Shared NO importa de nadie** (es la base)

### ❌ Dependencias PROHIBIDAS:
```javascript
// ❌ MAL: Feature importando de otra feature
import { useAuth } from '@/features/auth'; // En feature "docentes"

// ✅ BIEN: Feature importando de entities o shared
import { ROLES } from '@/entities/usuario';
import { Button } from '@/shared/ui/components';

// ❌ MAL: Shared importando de features
import { useEvaluacion } from '@/features/evaluacion-docente'; // En shared/hooks

// ✅ BIEN: Shared con código genérico
import { useDebounce } from '@/shared/hooks';

// ❌ MAL: Entities importando de features
import { evaluacionApi } from '@/features/evaluacion-docente'; // En entities

// ✅ BIEN: Entities usando solo shared
import { formatDate } from '@/shared/utils/formatters';
```

### Dependencias entre Features

Si dos features necesitan comunicarse:
1. **Elevar el estado** a un nivel superior (page o app)
2. **Usar entities** para compartir modelos
3. **Usar shared** para utilidades comunes
4. **Usar el store global** para estado compartido

---

## Convenciones de Nombres

### Archivos y Carpetas

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| **Componentes React** | PascalCase | `LoginForm.jsx` |
| **Hooks** | camelCase con "use" | `useAuth.js` |
| **Utilidades** | camelCase | `formatters.js` |
| **Constantes** | camelCase | `constants.js` |
| **API modules** | camelCase con "Api" | `evaluacionApi.js` |
| **Carpetas** | kebab-case | `evaluacion-docente/` |
| **Slices/Redux** | camelCase con "Slice" | `authSlice.js` |

### Variables y Funciones
```javascript
// Constantes en UPPER_SNAKE_CASE
export const API_BASE_URL = 'https://api.sed.com';
export const MAX_FILE_SIZE = 5000000;

// Objetos constantes en UPPER_SNAKE_CASE
export const ROLES = {
  ADMIN: 'ADMINISTRADOR',
  ESTUDIANTE: 'ESTUDIANTE'
};

// Funciones en camelCase
export const formatDate = (date) => { };
export const getUserById = (id) => { };

// Componentes en PascalCase
export const LoginForm = () => { };
export const UserProfile = () => { };

// Hooks en camelCase con prefijo "use"
export const useAuth = () => { };
export const useEvaluacion = () => { };

// Variables en camelCase
const userData = {};
const isLoading = false;
const evaluacionList = [];
```

### Nombres de rutas
```javascript
// Rutas en kebab-case
/admin/gestion-usuarios
/estudiante/evaluar-docente
/docente/mis-evaluaciones
/comision/revisar-evaluaciones
```

---

## Ejemplos de Uso

### Ejemplo 1: Crear una nueva evaluación
```javascript
// 1. features/evaluacion-docente/api/evaluacionApi.js
import apiClient from '@/shared/api/apiClient';

export const evaluacionApi = {
  crear: (data) => apiClient.post('/api/evaluaciones', data)
};

// 2. features/evaluacion-docente/hooks/useEvaluacion.js
import { useState } from 'react';
import { evaluacionApi } from '../api/evaluacionApi';

export const useEvaluacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const crearEvaluacion = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await evaluacionApi.crear(data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { crearEvaluacion, loading, error };
};

// 3. features/evaluacion-docente/ui/EvaluacionForm.jsx
import { useState } from 'react';
import { useEvaluacion } from '../hooks/useEvaluacion';
import { Button, Input } from '@/shared/ui/components';

export const EvaluacionForm = ({ docenteId, cursoId }) => {
  const { crearEvaluacion, loading, error } = useEvaluacion();
  const [formData, setFormData] = useState({
    docenteId,
    cursoId,
    puntaje: 0,
    comentario: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearEvaluacion(formData);
      alert('Evaluación creada exitosamente');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Puntaje"
        type="number"
        value={formData.puntaje}
        onChange={(e) => setFormData({ ...formData, puntaje: e.target.value })}
      />
      <Input
        label="Comentario"
        type="textarea"
        value={formData.comentario}
        onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Evaluación'}
      </Button>
    </form>
  );
};

// 4. pages/estudiante/EvaluarDocentePage.jsx
import { EvaluacionForm } from '@/features/evaluacion-docente';
import { MainLayout } from '@/shared/ui/layouts';

export const EvaluarDocentePage = () => {
  const { docenteId, cursoId } = useParams(); // Desde React Router

  return (
    <MainLayout>
      <h1>Evaluar Docente</h1>
      <EvaluacionForm docenteId={docenteId} cursoId={cursoId} />
    </MainLayout>
  );
};
```

---

### Ejemplo 2: Protección de rutas por rol
```javascript
// 1. app/routes/RoleRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';

export const RoleRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// 2. app/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RoleRoute } from './RoleRoute';
import { ROLES } from '@/entities/usuario';

// Páginas
import { LoginPage } from '@/pages/auth';
import { AdminDashboardPage } from '@/pages/admin';
import { EstudianteDashboardPage } from '@/pages/estudiante';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/admin/*"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboardPage />
            </RoleRoute>
          }
        />
        
        <Route
          path="/estudiante/*"
          element={
            <RoleRoute allowedRoles={[ROLES.ESTUDIANTE]}>
              <EstudianteDashboardPage />
            </RoleRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
```

---

### Ejemplo 3: Manejo de estado global con Redux
```javascript
// 1. features/auth/model/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

// 2. app/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/model/authSlice';
import evaluacionReducer from '@/features/evaluacion-docente/model/evaluacionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    evaluacion: evaluacionReducer
  }
});

// 3. features/auth/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from '../model/authSlice';
import { authApi } from '../api/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    dispatch(loginStart());
    try {
      const response = await authApi.login(credentials);
      dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      dispatch(loginFailure(err.message));
      throw err;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
  };

  return { user, isAuthenticated, loading, error, login, logout };
};
```

---

## Variables de Entorno

### Archivo: `.env.example`
```env
# API Configuration
REACT_APP_API_URL=https://api.sed.com/v1
REACT_APP_API_TIMEOUT=10000

# Authentication
REACT_APP_TOKEN_KEY=sed_token

# Feature Flags
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_REPORTS=true

# External Services
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

### Archivo: `.env.local` (no commitear)
```env
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_API_TIMEOUT=30000
REACT_APP_TOKEN_KEY=sed_token_local
```

---

## Scripts de package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext js,jsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css,md}\"",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## Configuración de Path Aliases

### Archivo: `jsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/app/*": ["src/app/*"],
      "@/pages/*": ["src/pages/*"],
      "@/features/*": ["src/features/*"],
      "@/entities/*": ["src/entities/*"],
      "@/shared/*": ["src/shared/*"]
    }
  },
  "include": ["src"]
}
```

### Uso:
```javascript
// En lugar de: import Button from '../../../shared/ui/components/Button'
import { Button } from '@/shared/ui/components';

// En lugar de: import { useAuth } from '../../features/auth'
import { useAuth } from '@/features/auth';
```

---

## Mejores Prácticas

### 1. **Barrel Exports (index.js)**
Cada directorio debe tener un `index.js` que exporte su API pública:
```javascript
// features/evaluacion-docente/index.js
export { EvaluacionForm } from './ui/EvaluacionForm';
export { ListaEvaluaciones } from './ui/ListaEvaluaciones';
export { useEvaluacion } from './hooks/useEvaluacion';

// Uso en otro archivo:
import { EvaluacionForm, useEvaluacion } from '@/features/evaluacion-docente';
```

### 2. **Separación de Concerns**
- **UI**: Solo presentación, sin lógica de negocio
- **Hooks**: Lógica reutilizable, estado local
- **API**: Solo llamadas HTTP
- **Model**: Estado global, transformaciones

### 3. **Naming de Componentes**
```javascript
// Componentes de página: sufijo "Page"
LoginPage.jsx
AdminDashboardPage.jsx

// Componentes de feature: nombre descriptivo
EvaluacionForm.jsx
ListaDocentes.jsx

// Componentes shared: nombre genérico
Button.jsx
Modal.jsx
```

### 4. **Manejo de Errores**
```javascript
// Centralizar manejo de errores en shared/api
// Usar try-catch en hooks
// Mostrar errores en UI de forma amigable

try {
  await crearEvaluacion(data);
} catch (error) {
  toast.error(error.message || 'Error al crear evaluación');
}
```

### 5. **Loading States**
```javascript
// Siempre manejar estados de carga
const { data, loading, error } = useEvaluaciones();

if (loading) return <Loader />;
if (error) return <ErrorMessage error={error} />;
return <ListaEvaluaciones data={data} />;
```

---

## Checklist de Desarrollo

### Al crear un nuevo feature:
- [ ] Crear carpeta en `/features/nombre-feature`
- [ ] Crear subcarpetas: `/ui`, `/api`, `/hooks`, `/model`
- [ ] Implementar llamadas API en `/api`
- [ ] Crear hooks personalizados en `/hooks`
- [ ] Desarrollar componentes UI en `/ui`
- [ ] Configurar estado en `/model` (si aplica)
- [ ] Crear `index.js` con barrel exports
- [ ] Documentar el feature en README

### Al crear una nueva página:
- [ ] Crear archivo en `/pages/rol/NombrePage.jsx`
- [ ] Importar features necesarios
- [ ] Aplicar layout correspondiente
- [ ] Configurar ruta en `AppRouter.jsx`
- [ ] Aplicar protección por rol si es necesario

### Al crear un componente compartido:
- [ ] Crear en `/shared/ui/components`
- [ ] Hacerlo genérico y reutilizable
- [ ] Documentar props esperados
- [ ] Exportar en `index.js`

---

## Recursos Adicionales

### Documentación oficial:
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)

### Arquitectura:
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

## Mantenimiento de esta Documentación

**Responsable:** Equipo de Frontend  
**Frecuencia de actualización:** Cada sprint o cuando hay cambios arquitectónicos  
**Versión actual:** 1.0  
**Última actualización:** Diciembre 2024

---

## Contacto y Soporte

Para dudas o sugerencias sobre la arquitectura:
- **Slack:** #sed-frontend
- **Email:** equipo-frontend@universidad.edu

---

**Nota:** Esta arquitectura es un punto de partida. Puede evolucionar según las necesidades del proyecto. Cualquier cambio significativo debe ser discutido con el equipo y documentado aquí.