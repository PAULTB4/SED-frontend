# 🔌 Guía de Integración Frontend-Backend

**SED - Sistema de Evaluación Docente**  
Guía completa para integrar el frontend React con el backend Java Spring Boot

---

## 📋 Tabla de Contenidos

1. [Información General](#información-general)
2. [Arquitectura del Frontend](#arquitectura-del-frontend)
3. [Estructura de Archivos](#estructura-de-archivos)
4. [Módulos Implementados](#módulos-implementados)
5. [Sistema de Datos Mock](#sistema-de-datos-mock)
6. [Cliente HTTP (Axios)](#cliente-http-axios)
7. [Endpoints Esperados](#endpoints-esperados)
8. [Formatos de Datos](#formatos-de-datos)
9. [Autenticación y Seguridad](#autenticación-y-seguridad)
10. [Proceso de Integración](#proceso-de-integración)
11. [Consideraciones Técnicas](#consideraciones-técnicas)
12. [Testing de Integración](#testing-de-integración)

---

## 📖 Información General

### Estado Actual del Proyecto

El frontend está **100% funcional** con datos mock, siguiendo la arquitectura **Feature-Sliced Design (FSD)**. Todos los módulos están listos para integrarse con el backend mediante el reemplazo de hooks mock por llamadas a API reales.

### Tecnologías Frontend

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.3+ | Librería UI principal |
| React Router | 6.x | Enrutamiento SPA |
| Axios | 1.x | Cliente HTTP |
| i18next | 23.x | Internacionalización (ES/EN) |
| Vite | 5.x | Build tool y dev server |

### Características Implementadas

✅ **Internacionalización**: Español e Inglés completos  
✅ **Modo Oscuro**: Persistente con localStorage  
✅ **Responsive Design**: Optimizado para móviles, tablets y desktop  
✅ **Menú Hamburguesa**: Navegación móvil en todos los módulos  
✅ **Componentes Reutilizables**: 15+ componentes documentados  
✅ **Protección de Rutas**: Por rol (listo para JWT)  
✅ **Manejo de Errores**: Estados de loading, error y vacío

---

## 🏗️ Arquitectura del Frontend

### Feature-Sliced Design (FSD)

```
┌─────────────────────────────────────────┐
│  App Layer (Configuración Global)      │
│  - Router, i18n, themes                │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  Pages Layer (Vistas por Rol)          │
│  - Docente, Comisión, Estudiante       │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  Features Layer (Lógica de Negocio)    │
│  - Custom hooks con datos mock         │
│  ⚠️ AQUÍ SE INTEGRA EL BACKEND         │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  Shared Layer (Componentes Comunes)    │
│  - UI components, layouts, API client  │
└─────────────────────────────────────────┘
```

### Patrones de Diseño Implementados

| Patrón | Implementación | Archivo |
|--------|----------------|---------|
| **Custom Hook Pattern** | Hooks para datos por módulo | `features/*/hooks/*.js` |
| **Container/Presentational** | Separación lógica/UI | Todas las páginas |
| **Singleton** | Cliente HTTP único | `shared/api/apiClient.js` |
| **Strategy** | Validación por rol | `shared/utils/validators.js` |
| **Layout Pattern** | Navbar compartido | `shared/ui/layouts/*Layout` |
| **Component Composition** | Componentes atómicos | `shared/ui/components/*` |

---

## 📂 Estructura de Archivos

### Vista General

```
/sed-frontend
├── /src
│   ├── /app                          # Configuración global
│   │   ├── App.jsx                   # Componente raíz
│   │   └── /routes
│   │       └── AppRouter.jsx         # Definición de rutas
│   │
│   ├── /features                     # ⚠️ LÓGICA DE NEGOCIO (MOCK → API)
│   │   ├── /auth
│   │   │   ├── /api
│   │   │   │   └── authApi.js        # Login, logout, refresh token
│   │   │   └── /hooks
│   │   │       └── useAuth.js        # Hook de autenticación
│   │   │
│   │   ├── /evaluaciones-docente
│   │   │   └── /hooks
│   │   │       └── useDocenteData.js # 🔴 Hook con datos MOCK (reemplazar)
│   │   │
│   │   ├── /evaluacion-comision
│   │   │   └── /hooks
│   │   │       └── useComisionData.js # 🔴 Hook con datos MOCK (reemplazar)
│   │   │
│   │   └── /evaluacion-estudiante
│   │       └── /hooks
│   │           └── useEstudianteData.js # 🔴 Hook con datos MOCK (reemplazar)
│   │
│   ├── /pages                        # Páginas por módulo
│   │   ├── /auth
│   │   │   └── LoginPage.jsx
│   │   │
│   │   ├── /docente
│   │   │   ├── DocenteDashboard.jsx      # Dashboard con estadísticas
│   │   │   ├── DocenteProfile.jsx        # Perfil del docente
│   │   │   ├── DocenteEvaluaciones.jsx   # Evaluaciones recibidas
│   │   │   └── DocenteRecomendaciones.jsx # Sugerencias de mejora
│   │   │
│   │   ├── /comision
│   │   │   ├── ComisionDashboard.jsx     # Dashboard administrativo
│   │   │   ├── ComisionProfile.jsx       # Perfil de comisión
│   │   │   ├── ComisionPeriodos.jsx      # Gestión de períodos
│   │   │   └── ComisionReportes.jsx      # Reportes y gráficos
│   │   │
│   │   ├── /estudiante
│   │   │   ├── EstudianteDashboard.jsx   # Dashboard de estudiante
│   │   │   ├── EstudiantePerfil.jsx      # Perfil del estudiante
│   │   │   ├── EstudianteEvaluar.jsx     # Formulario de evaluación
│   │   │   └── EstudianteExplorar.jsx    # Explorar docentes
│   │   │
│   │   └── /landing
│   │       └── LandingPage.jsx           # Página de inicio pública
│   │
│   ├── /shared                       # Código compartido
│   │   ├── /api
│   │   │   └── apiClient.js          # 🟢 Cliente HTTP configurado (listo)
│   │   │
│   │   └── /ui
│   │       ├── /components           # 15+ componentes reutilizables
│   │       │   ├── Avatar/
│   │       │   ├── Button/
│   │       │   ├── StatCard/
│   │       │   ├── CourseCard/
│   │       │   ├── BarChart/
│   │       │   ├── LineChart/
│   │       │   ├── PieChart/
│   │       │   ├── StarRating/
│   │       │   ├── Header/
│   │       │   ├── Footer/
│   │       │   └── LanguageSwitcher/
│   │       │
│   │       └── /layouts              # Layouts por rol
│   │           ├── AuthLayout/
│   │           ├── DocenteLayout/
│   │           ├── ComisionLayout/
│   │           ├── EstudianteLayout/
│   │           └── LandingLayout/
│   │
│   ├── /i18n                         # Internacionalización
│   │   ├── index.js                  # Configuración i18next
│   │   └── /locales
│   │       ├── es.json               # Español (~350 keys)
│   │       └── en.json               # Inglés (~350 keys)
│   │
│   └── /styles                       # Estilos globales
│       ├── globals.css
│       └── variables.css
│
├── .env.example                      # Variables de entorno de ejemplo
├── package.json
└── vite.config.js
```

---

## 🎯 Módulos Implementados

### 1. 👨‍🏫 Módulo Docente

**Estado**: ✅ **Completado** (v1)

**Rutas**:
- `/docente/dashboard` - Dashboard principal
- `/docente/perfil` - Perfil del docente
- `/docente/evaluaciones` - Evaluaciones recibidas
- `/docente/recomendaciones` - Sugerencias de mejora

**Componentes Principales**:
```jsx
// Dashboard
- StatCard (4 tarjetas de estadísticas)
- CourseCard (lista de cursos)
- BarChart (gráfico de evaluaciones por curso)

// Evaluaciones
- LineChart (evolución temporal)
- Tabla de evaluaciones detalladas
- StarRating (calificaciones)

// Recomendaciones
- Sistema de priorización (Alta, Media, Baja)
- 29 recomendaciones categorizadas
```

**Hook de Datos**:
```javascript
// Archivo: src/features/evaluaciones-docente/hooks/useDocenteData.js

export const useDocenteData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🔴 ACTUAL: Datos hardcodeados
    const mockData = {
      docente: {
        id: 1,
        nombre: "Dr. Carlos Méndez",
        especialidad: "Ingeniería de Software",
        facultad: "Ingeniería de Sistemas"
      },
      estadisticas: {
        cursosActivos: 4,
        evaluacionesRecibidas: 156,
        promedioGeneral: 4.7,
        estudiantesActuales: 120
      },
      // ... más datos
    };
    setData(mockData);
    setLoading(false);
  }, []);

  return { data, loading, error };
};
```

**Integración con Backend**:
```javascript
// ✅ FUTURO: Implementación con API

import { apiClient } from '@/shared/api/apiClient';

export const useDocenteData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docenteRes, estadisticasRes, cursosRes, evaluacionesRes] = 
          await Promise.all([
            apiClient.get('/docentes/me'),
            apiClient.get('/docentes/me/estadisticas'),
            apiClient.get('/docentes/me/cursos'),
            apiClient.get('/docentes/me/evaluaciones')
          ]);

        setData({
          docente: docenteRes.data,
          estadisticas: estadisticasRes.data,
          cursos: cursosRes.data,
          evaluaciones: evaluacionesRes.data
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
```

---

### 2. 📊 Módulo Comisión

**Estado**: ✅ **Completado** (v1)

**Rutas**:
- `/comision/dashboard` - Dashboard administrativo
- `/comision/perfil` - Perfil del miembro de comisión
- `/comision/periodos` - Gestión de períodos de evaluación
- `/comision/reportes` - Reportes y estadísticas

**Componentes Principales**:
```jsx
// Dashboard
- Banner informativo con CTAs
- 3 tarjetas de funciones principales
- 4 StatCards de estadísticas generales
- 3 tarjetas de acceso rápido
- Lista de períodos activos

// Períodos
- Tabs (Activos, Programados, Finalizados)
- Tarjetas con progreso y estadísticas
- Formulario de creación de períodos

// Reportes
- Selector de período
- Botones de exportación (PDF, Excel)
- 4 tipos de gráficos (Barras, Pie, Línea)
- Tabla de reportes recientes
```

**Hook de Datos**:
```javascript
// Archivo: src/features/evaluacion-comision/hooks/useComisionData.js

// 🔴 ESTRUCTURA MOCK ACTUAL
const mockData = {
  comision: { ... },
  estadisticas: {
    docentesEvaluados: 245,
    estudiantesParticipantes: 1840,
    tasaRespuesta: 78.5,
    periodosActivos: 2
  },
  periodos: [...],
  reportes: {
    graficos: {
      respuestaPorFacultad: [...],
      distribucionCalificacion: [...],
      promediosPorDimension: [...],
      tendenciaMensual: [...]
    },
    tablaReportes: [...]
  }
};
```

**Integración con Backend**:
```javascript
// ✅ IMPLEMENTACIÓN RECOMENDADA

const fetchData = async () => {
  const response = await apiClient.get('/comision/dashboard');
  // Backend retorna todo en una sola llamada optimizada
  setData(response.data);
};
```

---

### 3. 🎓 Módulo Estudiante

**Estado**: ✅ **Completado** (v3)

**Rutas**:
- `/estudiante/dashboard` - Dashboard con cursos a evaluar
- `/estudiante/perfil` - Perfil del estudiante
- `/estudiante/evaluar-docentes` - Formulario de evaluación completo
- `/estudiante/explorar` - Explorar y buscar docentes

**Componentes Principales**:
```jsx
// Dashboard
- Bienvenida personalizada con interpolación
- 2 StatCards (Pendientes, Completadas)
- Lista de cursos matriculados
- Botones de evaluar

// Evaluar
- Formulario con 4 secciones de criterios
- 8 criterios de evaluación (escala 1-5)
- Campo de comentarios adicionales
- Validación antes de enviar

// Explorar
- Barra de búsqueda
- Filtros (Departamento, Rating mínimo)
- Lista de docentes con ratings
- Vista de perfil de docentes
```

**Hook de Datos**:
```javascript
// Archivo: src/features/evaluacion-estudiante/hooks/useEstudianteData.js

// 🔴 ESTRUCTURA MOCK ACTUAL
const mockData = {
  estudiante: {
    id: 1,
    nombre: "María García",
    codigo: "2020-001234",
    carrera: "Ingeniería de Sistemas",
    semestre: 6
  },
  estadisticas: {
    evaluacionesPendientes: 3,
    evaluacionesCompletadas: 12
  },
  cursosMatriculados: [
    {
      id: 1,
      codigo: "IS-301",
      nombre: "Diseño de Software",
      docente: "Dr. Carlos Méndez",
      evaluado: false
    }
    // ...
  ]
};
```

**Integración con Backend**:
```javascript
// ✅ IMPLEMENTACIÓN RECOMENDADA

export const useEstudianteData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/estudiantes/me/dashboard');
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
```

**Envío de Evaluación**:
```javascript
// Archivo: src/pages/estudiante/EstudianteEvaluar.jsx

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await apiClient.post('/evaluaciones', {
      cursoId: curso.id,
      docenteId: docente.id,
      criterios: {
        conocimientoProfundo: evaluacion.conocimientoProfundo,
        explicacionClara: evaluacion.explicacionClara,
        // ... resto de criterios
      },
      comentarios: evaluacion.comentarios
    });
    
    navigate('/estudiante/dashboard', { 
      state: { message: 'Evaluación enviada exitosamente' } 
    });
  } catch (error) {
    setError('Error al enviar la evaluación');
  }
};
```

---

## 🗄️ Sistema de Datos Mock

### Ubicación de Archivos Mock

Todos los datos mock están centralizados en custom hooks dentro de la capa `features`:

```
/src/features
├── /evaluaciones-docente
│   └── /hooks
│       └── useDocenteData.js       # ~250 líneas de mock data
│
├── /evaluacion-comision
│   └── /hooks
│       └── useComisionData.js      # ~300 líneas de mock data
│
└── /evaluacion-estudiante
    └── /hooks
        └── useEstudianteData.js    # ~180 líneas de mock data
```

### Ventajas del Enfoque Mock

✅ **Desarrollo Independiente**: Frontend y backend trabajan en paralelo  
✅ **Testing Fácil**: Datos predecibles para pruebas  
✅ **Prototipado Rápido**: Visualización inmediata de la UI  
✅ **Documentación Implícita**: Los mocks sirven como contrato de interfaz  
✅ **Migración Simple**: Solo reemplazar el contenido de los hooks

### Ejemplo de Datos Mock (Docente)

```javascript
// src/features/evaluaciones-docente/hooks/useDocenteData.js

const mockData = {
  docente: {
    id: 1,
    nombre: "Dr. Carlos Méndez",
    email: "carlos.mendez@unas.edu.pe",
    telefono: "+51 962 345 678",
    especialidad: "Ingeniería de Software",
    facultad: "Ingeniería de Sistemas",
    grado: "Doctor",
    aniosExperiencia: 15,
    avatar: null
  },
  
  estadisticas: {
    cursosActivos: 4,
    evaluacionesRecibidas: 156,
    promedioGeneral: 4.7,
    estudiantesActuales: 120
  },
  
  cursos: [
    {
      id: 1,
      codigo: "IS-301",
      nombre: "Diseño de Software",
      semestre: "2024-II",
      numeroEstudiantes: 35,
      evaluaciones: 32,
      promedioRating: 4.8
    },
    // ... más cursos
  ],
  
  evaluaciones: [
    {
      id: 1,
      curso: "Diseño de Software",
      semestre: "2024-II",
      numeroEvaluaciones: 32,
      dominio: 4.9,
      metodologia: 4.7,
      interaccion: 4.8,
      sistemaEvaluacion: 4.6,
      promedio: 4.8
    },
    // ... más evaluaciones
  ],
  
  recomendaciones: [
    {
      id: 1,
      categoria: "Metodología de Enseñanza",
      titulo: "Incorporar más ejemplos prácticos",
      descripcion: "Los estudiantes sugieren incluir más casos de estudio...",
      prioridad: "alta",
      fecha: "2024-12-10"
    },
    // ... 28 recomendaciones más
  ]
};
```

---

## 🌐 Cliente HTTP (Axios)

### Configuración Actual

**Archivo**: `src/shared/api/apiClient.js`

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor de Request - Agregar JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Response - Manejo de errores globales
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró (401), intentar renovarlo
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refreshToken }
        );
        
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, cerrar sesión
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
```

### Variables de Entorno

**Archivo**: `.env.local` (crear basándose en `.env.example`)

```env
# Backend API
VITE_API_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000

# Opcionales
VITE_ENV=development
VITE_ENABLE_LOGS=true
```

### Uso del Cliente

```javascript
import { apiClient } from '@/shared/api/apiClient';

// GET
const response = await apiClient.get('/docentes/me');
const data = response.data;

// POST
const response = await apiClient.post('/evaluaciones', {
  cursoId: 1,
  rating: 5,
  comentario: "Excelente docente"
});

// PUT
await apiClient.put('/docentes/me/perfil', {
  telefono: "+51 999 888 777"
});

// DELETE
await apiClient.delete('/evaluaciones/123');
```

---

## 📡 Endpoints Esperados

### Autenticación

```http
POST   /api/auth/login
Request: {
  email: string,
  password: string
}
Response: {
  success: true,
  data: {
    token: string,
    refreshToken: string,
    user: {
      id: number,
      nombre: string,
      email: string,
      rol: "ESTUDIANTE" | "DOCENTE" | "COMISION" | "ADMIN"
    }
  }
}

POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/me
```

### Módulo Docente

```http
# Información del docente autenticado
GET    /api/docentes/me
Response: {
  success: true,
  data: {
    id: number,
    nombre: string,
    email: string,
    telefono: string,
    especialidad: string,
    facultad: string,
    grado: string,
    aniosExperiencia: number
  }
}

# Estadísticas generales
GET    /api/docentes/me/estadisticas
Response: {
  success: true,
  data: {
    cursosActivos: number,
    evaluacionesRecibidas: number,
    promedioGeneral: number,
    estudiantesActuales: number
  }
}

# Lista de cursos del docente
GET    /api/docentes/me/cursos
GET    /api/docentes/me/cursos?semestre=2024-II
Response: {
  success: true,
  data: [
    {
      id: number,
      codigo: string,
      nombre: string,
      semestre: string,
      numeroEstudiantes: number,
      evaluaciones: number,
      promedioRating: number
    }
  ]
}

# Evaluaciones recibidas
GET    /api/docentes/me/evaluaciones
GET    /api/docentes/me/evaluaciones?cursoId=1
GET    /api/docentes/me/evaluaciones?semestre=2024-II
Response: {
  success: true,
  data: [
    {
      id: number,
      curso: string,
      semestre: string,
      numeroEvaluaciones: number,
      dominio: number,
      metodologia: number,
      interaccion: number,
      sistemaEvaluacion: number,
      promedio: number
    }
  ]
}

# Recomendaciones generadas
GET    /api/docentes/me/recomendaciones
GET    /api/docentes/me/recomendaciones?prioridad=alta
Response: {
  success: true,
  data: [
    {
      id: number,
      categoria: string,
      titulo: string,
      descripcion: string,
      prioridad: "alta" | "media" | "baja",
      fecha: string (ISO 8601)
    }
  ]
}

# Actualizar perfil
PUT    /api/docentes/me/perfil
Request: {
  telefono?: string,
  avatar?: string (base64 o URL)
}
```

### Módulo Comisión

```http
# Dashboard completo (optimizado en una llamada)
GET    /api/comision/dashboard
Response: {
  success: true,
  data: {
    estadisticas: {
      docentesEvaluados: number,
      estudiantesParticipantes: number,
      tasaRespuesta: number,
      periodosActivos: number
    },
    periodos: [...],
    reportes: {
      graficos: {...},
      recientes: [...]
    }
  }
}

# Información del miembro de comisión
GET    /api/comision/me
Response: {
  success: true,
  data: {
    id: number,
    nombre: string,
    email: string,
    telefono: string,
    oficina: string,
    dependencia: string,
    anexo: string,
    cargo: string,
    responsabilidades: string[]
  }
}

# Gestión de períodos
GET    /api/comision/periodos
GET    /api/comision/periodos?estado=activo
Response: {
  success: true,
  data: [
    {
      id: number,
      nombre: string,
      fechaInicio: string (ISO 8601),
      fechaFin: string (ISO 8601),
      estado: "activo" | "programado" | "finalizado",
      docentes: number,
      estudiantes: number,
      tasaRespuesta: number,
      progreso: number (0-100)
    }
  ]
}

POST   /api/comision/periodos
Request: {
  nombre: string,
  fechaInicio: string,
  fechaFin: string,
  facultades: number[] (IDs)
}

PUT    /api/comision/periodos/:id
DELETE /api/comision/periodos/:id

# Reportes
GET    /api/comision/reportes
GET    /api/comision/reportes?periodoId=1
Response: {
  success: true,
  data: {
    estadisticas: {
      docentesEvaluados: number,
      estudiantesParticipantes: number,
      tasaRespuesta: number
    },
    graficos: {
      respuestaPorFacultad: [
        { facultad: string, respuestas: number }
      ],
      distribucionCalificacion: [
        { calificacion: string, cantidad: number }
      ],
      promediosPorDimension: [
        { dimension: string, promedio: number }
      ],
      tendenciaMensual: [
        { mes: string, promedio: number }
      ]
    },
    recientes: [
      {
        id: number,
        titulo: string,
        tipo: string,
        periodo: string,
        fecha: string,
        formato: "PDF" | "XLSX",
        tamanio: string
      }
    ]
  }
}

# Exportación
GET    /api/comision/reportes/:id/export/pdf
GET    /api/comision/reportes/:id/export/excel
Response: Archivo binario con headers:
  Content-Type: application/pdf | application/vnd.openxmlformats
  Content-Disposition: attachment; filename="reporte.pdf"
```

### Módulo Estudiante

```http
# Dashboard del estudiante
GET    /api/estudiantes/me/dashboard
Response: {
  success: true,
  data: {
    estudiante: {
      id: number,
      nombre: string,
      codigo: string,
      carrera: string,
      semestre: number,
      email: string
    },
    estadisticas: {
      evaluacionesPendientes: number,
      evaluacionesCompletadas: number
    },
    cursosMatriculados: [
      {
        id: number,
        codigo: string,
        nombre: string,
        docente: string,
        evaluado: boolean,
        fechaLimite: string (ISO 8601)
      }
    ]
  }
}

# Perfil del estudiante
GET    /api/estudiantes/me
Response: {
  success: true,
  data: {
    id: number,
    nombre: string,
    codigo: string,
    email: string,
    carrera: string,
    semestre: number,
    cursosMatriculados: [
      {
        codigo: string,
        nombre: string,
        docente: string
      }
    ]
  }
}

# Enviar evaluación
POST   /api/evaluaciones
Request: {
  cursoId: number,
  docenteId: number,
  criterios: {
    conocimientoProfundo: number (1-5),
    explicacionClara: number (1-5),
    metodologiaEfectiva: number (1-5),
    recursosDidacticos: number (1-5),
    disposicionAyudar: number (1-5),
    respetoEstudiantes: number (1-5),
    criteriosTransparentes: number (1-5),
    retroalimentacionOportuna: number (1-5)
  },
  comentarios: string (opcional)
}
Response: {
  success: true,
  data: {
    id: number,
    mensaje: "Evaluación enviada exitosamente"
  }
}

# Explorar docentes
GET    /api/docentes
GET    /api/docentes?departamento=sistemas
GET    /api/docentes?ratingMin=4.5
GET    /api/docentes?search=carlos
Response: {
  success: true,
  data: [
    {
      id: number,
      nombre: string,
      departamento: string,
      especialidad: string,
      rating: number,
      numeroEvaluaciones: number
    }
  ]
}

# Ver perfil de docente (público)
GET    /api/docentes/:id/perfil
Response: {
  success: true,
  data: {
    id: number,
    nombre: string,
    departamento: string,
    especialidad: string,
    rating: number,
    numeroEvaluaciones: number,
    cursos: [
      {
        codigo: string,
        nombre: string
      }
    ]
  }
}

# Historial de evaluaciones propias
GET    /api/estudiantes/me/evaluaciones
Response: {
  success: true,
  data: [
    {
      id: number,
      curso: string,
      docente: string,
      fecha: string,
      promedio: number
    }
  ]
}
```

---

## 📊 Formatos de Datos

### Formato de Respuesta Estándar

**Respuesta Exitosa**:
```json
{
  "success": true,
  "data": {
    // ... datos solicitados
  },
  "message": "Operación exitosa",
  "timestamp": "2025-12-13T10:30:00Z"
}
```

**Respuesta con Error**:
```json
{
  "success": false,
  "error": {
    "code": "ERR_VALIDATION",
    "message": "Error de validación",
    "details": {
      "field": "email",
      "error": "Formato de email inválido"
    }
  },
  "timestamp": "2025-12-13T10:30:00Z"
}
```

### Códigos de Error Comunes

| Código HTTP | Código Error | Descripción |
|-------------|--------------|-------------|
| 400 | ERR_VALIDATION | Error de validación de datos |
| 401 | ERR_UNAUTHORIZED | Token inválido o expirado |
| 403 | ERR_FORBIDDEN | Sin permisos para esta acción |
| 404 | ERR_NOT_FOUND | Recurso no encontrado |
| 409 | ERR_CONFLICT | Conflicto (ej: evaluación duplicada) |
| 500 | ERR_INTERNAL | Error interno del servidor |

### Formato de Fechas

**Usar ISO 8601**:
```
2025-12-13T10:30:00Z        // Formato completo con UTC
2025-12-13T10:30:00-05:00   // Con zona horaria (Perú: -05:00)
2025-12-13                  // Solo fecha
```

### Paginación

```http
GET /api/evaluaciones?page=1&limit=20&sortBy=fecha&order=desc

Response:
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación JWT

```
┌──────────────┐                ┌──────────────┐
│   Frontend   │                │   Backend    │
└──────┬───────┘                └──────┬───────┘
       │                               │
       │ 1. POST /auth/login          │
       │  { email, password }          │
       │──────────────────────────────>│
       │                               │
       │                        2. Validar credenciales
       │                        3. Generar JWT + RefreshToken
       │                               │
       │ 4. { token, refreshToken }    │
       │<──────────────────────────────│
       │                               │
5. Guardar en localStorage             │
       │                               │
       │ 6. GET /docentes/me           │
       │  Header: Authorization: Bearer <token>
       │──────────────────────────────>│
       │                               │
       │                        7. Validar JWT
       │                        8. Retornar datos
       │                               │
       │ 9. { success: true, data }    │
       │<──────────────────────────────│
```

### Almacenamiento de Tokens

```javascript
// Después del login exitoso
localStorage.setItem('token', response.data.token);
localStorage.setItem('refreshToken', response.data.refreshToken);
localStorage.setItem('user', JSON.stringify(response.data.user));

// En cada request (interceptor de Axios)
const token = localStorage.getItem('token');
config.headers.Authorization = `Bearer ${token}`;

// Logout
localStorage.removeItem('token');
localStorage.removeItem('refreshToken');
localStorage.removeItem('user');
navigate('/login');
```

### Protección de Rutas por Rol

```jsx
// src/app/routes/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Uso en router
<Route
  path="/docente/*"
  element={
    <ProtectedRoute requiredRole="DOCENTE">
      <DocenteLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<DocenteDashboard />} />
  {/* ... más rutas */}
</Route>
```

### Refresh Token

El cliente HTTP ya maneja automáticamente la renovación de tokens:

```javascript
// Interceptor de response en apiClient.js
if (error.response?.status === 401 && !originalRequest._retry) {
  // Intentar renovar token
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axios.post('/auth/refresh-token', { refreshToken });
  
  // Actualizar token y reintentar request original
  localStorage.setItem('token', response.data.token);
  return apiClient(originalRequest);
}
```

### Seguridad en Evaluaciones (Anonimato)

**IMPORTANTE**: Las evaluaciones deben ser **100% anónimas**.

```javascript
// ❌ NO ENVIAR: ID del estudiante, IP, datos identificables
POST /api/evaluaciones
{
  estudianteId: 123,  // ❌ NO
  ip: "192.168.1.1"   // ❌ NO
}

// ✅ CORRECTO: Solo datos de la evaluación
POST /api/evaluaciones
{
  cursoId: 1,
  docenteId: 5,
  criterios: { ... },
  comentarios: "..."
}

// Backend debe:
// 1. Extraer estudianteId del JWT (sin guardarlo en evaluación)
// 2. Validar que el estudiante esté matriculado en el curso
// 3. Validar que no haya evaluado antes
// 4. Guardar evaluación SIN vincularla al estudiante
```

---

## 🚀 Proceso de Integración

### Paso 1: Configuración Inicial

1. **Clonar el repositorio**:
```bash
git clone https://github.com/team-zentry/sed-frontend.git
cd sed-frontend
git checkout v3
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
VITE_API_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000
```

4. **Verificar que el proyecto corra con datos mock**:
```bash
npm run dev
```

Abrir `http://localhost:5173` y navegar por los módulos.

---

### Paso 2: Configurar CORS en Backend

El backend Spring Boot debe permitir peticiones desde el frontend:

```java
// SecurityConfig.java

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Permitir frontend en desarrollo
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",
            "http://localhost:3000",
            "https://sed-frontend.vercel.app" // Producción
        ));
        
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));
        
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
```

---

### Paso 3: Implementar Endpoints en Backend

#### Ejemplo: Endpoint de Dashboard Docente

```java
// DocenteController.java

@RestController
@RequestMapping("/api/docentes")
public class DocenteController {
    
    @Autowired
    private DocenteService docenteService;
    
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<DocenteDTO>> getDocenteActual(
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long docenteId = ((CustomUserDetails) userDetails).getId();
        DocenteDTO docente = docenteService.findById(docenteId);
        
        return ResponseEntity.ok(
            new ApiResponse<>(true, docente, "Docente obtenido", LocalDateTime.now())
        );
    }
    
    @GetMapping("/me/estadisticas")
    public ResponseEntity<ApiResponse<EstadisticasDTO>> getEstadisticas(
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long docenteId = ((CustomUserDetails) userDetails).getId();
        EstadisticasDTO stats = docenteService.getEstadisticas(docenteId);
        
        return ResponseEntity.ok(
            new ApiResponse<>(true, stats, "Estadísticas obtenidas", LocalDateTime.now())
        );
    }
    
    @GetMapping("/me/cursos")
    public ResponseEntity<ApiResponse<List<CursoDTO>>> getCursos(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestParam(required = false) String semestre
    ) {
        Long docenteId = ((CustomUserDetails) userDetails).getId();
        List<CursoDTO> cursos = docenteService.getCursos(docenteId, semestre);
        
        return ResponseEntity.ok(
            new ApiResponse<>(true, cursos, "Cursos obtenidos", LocalDateTime.now())
        );
    }
}

// ApiResponse.java (Clase wrapper)
@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    private LocalDateTime timestamp;
}
```

---

### Paso 4: Integrar un Hook con Backend

#### Antes (Mock):

```javascript
// src/features/evaluaciones-docente/hooks/useDocenteData.js

export const useDocenteData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Datos hardcodeados
    const mockData = { docente: {...}, estadisticas: {...} };
    setData(mockData);
    setLoading(false);
  }, []);
  
  return { data, loading, error: null };
};
```

#### Después (API Real):

```javascript
// src/features/evaluaciones-docente/hooks/useDocenteData.js

import { apiClient } from '@/shared/api/apiClient';

export const useDocenteData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Llamadas paralelas para mejor performance
        const [docenteRes, estadisticasRes, cursosRes, evaluacionesRes, recomendacionesRes] = 
          await Promise.all([
            apiClient.get('/docentes/me'),
            apiClient.get('/docentes/me/estadisticas'),
            apiClient.get('/docentes/me/cursos'),
            apiClient.get('/docentes/me/evaluaciones'),
            apiClient.get('/docentes/me/recomendaciones')
          ]);
        
        // Estructura de datos igual que mock
        setData({
          docente: docenteRes.data.data,
          estadisticas: estadisticasRes.data.data,
          cursos: cursosRes.data.data,
          evaluaciones: evaluacionesRes.data.data,
          recomendaciones: recomendacionesRes.data.data
        });
        
      } catch (err) {
        const errorMessage = err.response?.data?.error?.message || 
                            'Error al cargar datos del docente';
        setError(errorMessage);
        console.error('Error en useDocenteData:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); // Sin dependencias = se ejecuta solo al montar
  
  return { data, loading, error };
};
```

**✅ Los componentes NO necesitan cambios** porque el hook retorna la misma estructura.

---

### Paso 5: Testing de Integración

#### 5.1. Testing Manual con Backend Local

1. **Iniciar backend**:
```bash
cd sed-backend
./mvnw spring-boot:run
```

2. **Verificar que esté corriendo**:
```bash
curl http://localhost:8080/api/health
```

3. **Iniciar frontend**:
```bash
cd sed-frontend
npm run dev
```

4. **Probar flujo de login**:
   - Ir a `http://localhost:5173/login`
   - Ingresar credenciales de prueba
   - Verificar que se reciba el token
   - Verificar redirección según rol

5. **Probar carga de datos**:
   - Navegar a dashboard del rol correspondiente
   - Abrir DevTools > Network
   - Verificar llamadas a API
   - Verificar estructura de respuestas

#### 5.2. Testing con Postman/Insomnia

Crear colección con todos los endpoints y probar:

```json
// GET /api/docentes/me
Headers:
  Authorization: Bearer <token>

Expected Response:
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Dr. Carlos Méndez",
    ...
  },
  "message": "Docente obtenido",
  "timestamp": "2025-12-13T10:30:00Z"
}
```

#### 5.3. Manejo de Errores

Probar escenarios de error:

```javascript
// Error de red
try {
  const response = await apiClient.get('/docentes/me');
} catch (error) {
  if (error.code === 'ECONNREFUSED') {
    // Backend no está corriendo
    setError('No se pudo conectar con el servidor');
  } else if (error.response?.status === 401) {
    // Token inválido
    localStorage.removeItem('token');
    navigate('/login');
  } else if (error.response?.status === 403) {
    // Sin permisos
    setError('No tienes permisos para ver esta información');
  } else {
    // Error genérico
    setError(error.response?.data?.error?.message || 'Error desconocido');
  }
}
```

---

### Paso 6: Despliegue

#### Frontend (Vercel/Netlify)

1. **Configurar variables de entorno en producción**:
```env
VITE_API_URL=https://api.sed.unas.edu.pe/api
VITE_API_TIMEOUT=15000
```

2. **Build de producción**:
```bash
npm run build
```

3. **Deploy**:
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

#### Backend (AWS/Heroku/Railway)

Asegurarse de que CORS permita el dominio de producción del frontend.

---

## ⚙️ Consideraciones Técnicas

### Performance

1. **Lazy Loading de Rutas**:
```javascript
// src/app/routes/AppRouter.jsx

import { lazy, Suspense } from 'react';

const DocenteDashboard = lazy(() => 
  import('@/pages/docente/DocenteDashboard')
);

<Route 
  path="dashboard" 
  element={
    <Suspense fallback={<div>Cargando...</div>}>
      <DocenteDashboard />
    </Suspense>
  } 
/>
```

2. **Caché de Datos** (Opcional - React Query):
```bash
npm install @tanstack/react-query
```

```javascript
import { useQuery } from '@tanstack/react-query';

export const useDocenteData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['docente', 'dashboard'],
    queryFn: async () => {
      const response = await apiClient.get('/docentes/me/dashboard');
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000 // 10 minutos
  });

  return { data, loading: isLoading, error };
};
```

3. **Optimización de Imágenes**:
```javascript
// Usar lazy loading para avatares
<img 
  src={avatar} 
  alt={nombre} 
  loading="lazy"
/>
```

### Seguridad

1. **Sanitización de Inputs**:
```bash
npm install dompurify
```

```javascript
import DOMPurify from 'dompurify';

const handleSubmit = (data) => {
  const sanitizedComment = DOMPurify.sanitize(data.comentarios);
  await apiClient.post('/evaluaciones', {
    ...data,
    comentarios: sanitizedComment
  });
};
```

2. **Rate Limiting (Backend)**:
```java
// Implementar rate limiting para endpoints de evaluación
@RateLimit(maxRequests = 10, window = "1m")
@PostMapping("/evaluaciones")
public ResponseEntity<...> crearEvaluacion(...) { ... }
```

3. **Validación de Roles**:
```java
// Validar rol en backend, no confiar solo en frontend
@PreAuthorize("hasRole('ESTUDIANTE')")
@PostMapping("/evaluaciones")
public ResponseEntity<...> crearEvaluacion(...) { ... }
```

### Escalabilidad

1. **Paginación en Listas Grandes**:
```javascript
// Hook con paginación
export const useEvaluacionesList = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['evaluaciones', page, limit],
    queryFn: async () => {
      const response = await apiClient.get(
        `/docentes/me/evaluaciones?page=${page}&limit=${limit}`
      );
      return response.data;
    }
  });
};
```

2. **Búsqueda con Debounce**:
```javascript
import { debounce } from 'lodash';

const handleSearch = debounce(async (query) => {
  const response = await apiClient.get(`/docentes?search=${query}`);
  setResults(response.data.data);
}, 300); // 300ms de delay
```

### Mantenibilidad

1. **Tipado con JSDoc**:
```javascript
/**
 * Hook para obtener datos del docente
 * @returns {{
 *   data: DocenteData | null,
 *   loading: boolean,
 *   error: string | null
 * }}
 */
export const useDocenteData = () => {
  // ...
};
```

2. **Constantes Centralizadas**:
```javascript
// src/shared/constants/api.js

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token'
  },
  DOCENTE: {
    ME: '/docentes/me',
    ESTADISTICAS: '/docentes/me/estadisticas',
    CURSOS: '/docentes/me/cursos'
  }
  // ...
};

// Uso
const response = await apiClient.get(API_ENDPOINTS.DOCENTE.ME);
```

---

## 🧪 Testing de Integración

### Testing Manual - Checklist

#### Autenticación
- [ ] Login con credenciales válidas
- [ ] Login con credenciales inválidas
- [ ] Logout y limpieza de localStorage
- [ ] Refresh de token automático
- [ ] Redirección a login cuando token expira

#### Módulo Docente
- [ ] Dashboard carga estadísticas correctas
- [ ] Lista de cursos se muestra completa
- [ ] Evaluaciones se cargan con gráficos
- [ ] Recomendaciones se filtran por prioridad
- [ ] Modo oscuro persiste entre sesiones
- [ ] Menú hamburguesa funciona en móvil
- [ ] Cambio de idioma (ES/EN) funciona

#### Módulo Comisión
- [ ] Dashboard muestra banner y estadísticas
- [ ] Períodos se listan con filtros (activos/programados/finalizados)
- [ ] Crear nuevo período funciona
- [ ] Reportes cargan 4 gráficos correctamente
- [ ] Exportar PDF/Excel descarga archivos
- [ ] Navegación entre vistas es fluida

#### Módulo Estudiante
- [ ] Dashboard muestra cursos matriculados
- [ ] Explorar docentes con búsqueda funciona
- [ ] Filtros (departamento, rating) funcionan
- [ ] Formulario de evaluación valida campos
- [ ] Envío de evaluación es exitoso
- [ ] No se puede evaluar dos veces el mismo curso
- [ ] Comentarios se envían correctamente

### Testing Automatizado (Opcional)

#### Unit Tests para Hooks

```bash
npm install --save-dev @testing-library/react @testing-library/hooks vitest
```

```javascript
// src/features/evaluaciones-docente/hooks/useDocenteData.test.js

import { renderHook, waitFor } from '@testing-library/react';
import { useDocenteData } from './useDocenteData';
import { apiClient } from '@/shared/api/apiClient';

vi.mock('@/shared/api/apiClient');

describe('useDocenteData', () => {
  it('should fetch docente data successfully', async () => {
    const mockData = {
      data: {
        data: {
          docente: { id: 1, nombre: 'Dr. Test' },
          estadisticas: { cursosActivos: 4 }
        }
      }
    };

    apiClient.get.mockResolvedValue(mockData);

    const { result } = renderHook(() => useDocenteData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeDefined();
      expect(result.current.data.docente.nombre).toBe('Dr. Test');
    });
  });

  it('should handle errors', async () => {
    apiClient.get.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useDocenteData());

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
```

---

## 📚 Recursos Adicionales

### Documentación del Proyecto

- [README.md](README.md) - Información general del proyecto
- [docs/architecture_frontend.md](docs/architecture_frontend.md) - Arquitectura detallada
- [docs/design_patterns.md](docs/design_patterns.md) - Patrones de diseño
- [docs/component_library.md](docs/component_library.md) - Catálogo de componentes

### Herramientas Recomendadas

- **Backend Testing**: Postman, Insomnia, ThunderClient
- **Frontend DevTools**: React DevTools, Redux DevTools
- **API Mocking**: MSW (Mock Service Worker)
- **Performance**: Lighthouse, Web Vitals
- **Logging**: Sentry, LogRocket

### Contacto del Equipo Frontend

Para consultas sobre integración:

- **Josué Sebastián Oriundo Tafur** - Frontend Lead
  - GitHub: [@josue-oriundo](https://github.com/josue-oriundo)
  - Email: josue.oriundo@unas.edu.pe

- **Sergio Andres Henriquez Moya** - Frontend Developer
  - GitHub: [@sergio-henriquez](https://github.com/sergio-henriquez)
  - Email: sergio.henriquez@unas.edu.pe

---

## ✅ Checklist Final de Integración

### Backend
- [ ] Endpoints implementados según especificación
- [ ] JWT configurado correctamente
- [ ] CORS permite dominio del frontend
- [ ] Formato de respuestas es consistente
- [ ] Manejo de errores con códigos apropiados
- [ ] Validación de datos en cada endpoint
- [ ] Anonimato garantizado en evaluaciones
- [ ] Rate limiting implementado
- [ ] Logs de auditoría configurados

### Frontend
- [ ] Variables de entorno configuradas
- [ ] Hooks mock reemplazados por llamadas API
- [ ] Manejo de estados de loading
- [ ] Manejo de errores con mensajes claros
- [ ] Protección de rutas por rol
- [ ] Refresh token automático funciona
- [ ] Logout limpia localStorage
- [ ] Testing manual completado
- [ ] Build de producción exitoso
- [ ] Deploy en ambiente de pruebas

### Testing Integrado
- [ ] Login/Logout funciona correctamente
- [ ] Todos los módulos cargan datos reales
- [ ] Formularios envían datos correctamente
- [ ] Manejo de errores funciona (network, 401, 403, etc.)
- [ ] Performance es aceptable (<3s carga inicial)
- [ ] Responsive funciona en móvil/tablet/desktop
- [ ] Modo oscuro persiste
- [ ] Cambio de idioma persiste
- [ ] Navegación entre vistas es fluida

---

<div align="center">

**¡Todo listo para la integración!** 🚀

*Si tienes dudas, consulta la documentación o contacta al equipo frontend*

**Universidad Nacional Agraria de la Selva - 2025**

</div>
