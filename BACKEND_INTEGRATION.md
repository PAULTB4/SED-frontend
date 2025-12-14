# 🔗 Guía de Integración Backend - Sistema de Evaluación Docente

## 📋 Información General

Este documento proporciona toda la información necesaria para que el equipo de **Backend (Java Spring Boot)** integre sus APIs con el frontend de React.

### Estado del Proyecto Frontend
- ✅ **100% funcional** con datos mock
- ✅ **3 módulos completos**: Docente, Comisión, Estudiante
- ✅ **i18n**: Español/Inglés
- ✅ **Dark Mode**: Persistente
- ✅ **Responsive**: Desktop + Mobile (menú hamburguesa)
- ✅ **Autenticación**: JWT preparado
- ✅ **Cliente HTTP**: Axios configurado con interceptores

### Stack Tecnológico Frontend
- **React 18.3.1**
- **React Router DOM 7.1.1**
- **Axios 1.7.9** (HTTP client)
- **i18next** (internacionalización)
- **Vite 6.0.5** (bundler)

---

## 🏗️ Arquitectura del Frontend

### Feature-Sliced Design (FSD)

```
src/
├── app/              # Configuración de la app
├── pages/            # Páginas por ruta
├── widgets/          # Secciones complejas (hero, features)
├── features/         # Lógica de negocio por funcionalidad
│   ├── auth/
│   ├── evaluaciones-docente/
│   ├── evaluacion-comision/
│   └── evaluacion-estudiante/
├── shared/           # Código compartido
│   ├── api/          # Cliente HTTP (Axios)
│   └── ui/           # Componentes reutilizables
└── styles/           # Estilos globales
```

### Patrones Implementados

| Patrón | Uso | Ubicación |
|--------|-----|-----------|
| **Custom Hooks** | Lógica de estado y datos | `features/*/hooks/` |
| **Barrel Exports** | Exportaciones centralizadas | `*/index.js` |
| **Composition** | Componentes reutilizables | `shared/ui/components/` |
| **Layout Pattern** | Estructuras de página | `shared/ui/layouts/` |
| **API Client** | Cliente HTTP centralizado | `shared/api/apiClient.js` |

---

## 📁 Estructura de Archivos Importante

### 🔴 Archivos con Datos Mock (Requieren migración)

```
src/features/
├── auth/
│   └── api/
│       └── authApi.js                    # 🔴 Mock login/logout
├── evaluaciones-docente/
│   └── hooks/
│       └── useDocenteData.js             # 🔴 Mock cursos, evaluaciones
├── evaluacion-comision/
│   └── hooks/
│       └── useComisionData.js            # 🔴 Mock dashboard, reportes
└── evaluacion-estudiante/
    └── hooks/
        └── useEstudianteData.js          # 🔴 Mock perfil, docentes
```

### 🟢 Archivos Listos para Usar

```
src/
├── shared/
│   └── api/
│       └── apiClient.js                  # 🟢 Cliente Axios configurado
├── app/
│   └── routes/
│       └── AppRouter.jsx                 # 🟢 Rutas protegidas
└── features/
    └── auth/
        └── hooks/
            └── useAuth.js                # 🟢 Hook de autenticación
```

---

## 🎯 Módulos Implementados

### 1. Módulo Docente 👨‍🏫

**Rutas:**
- `/docente/dashboard` - Vista general de cursos y evaluaciones
- `/docente/mis-evaluaciones` - Resultados de evaluaciones
- `/docente/reportes` - Gráficos y análisis
- `/docente/perfil` - Información personal

**Hook Principal:** `src/features/evaluaciones-docente/hooks/useDocenteData.js`

**Datos Mock Actuales:**
```javascript
const cursosDocente = [
  {
    id: 1,
    codigo: "IS301",
    nombre: "Diseño Detallado de Software",
    ciclo: "VI",
    creditos: 4,
    facultad: "FISI",
    estudiantes: 35,
    evaluaciones: 28
  }
  // ...
];
```

**Migración a API:**
```javascript
// ANTES (Mock)
export const useDocenteData = () => {
  const [cursos, setCursos] = useState(cursosDocente);
  // ...
};

// DESPUÉS (API)
import apiClient from '@/shared/api/apiClient';

export const useDocenteData = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/api/docente/cursos');
        setCursos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, []);

  return { cursos, loading, error };
};
```

---

### 2. Módulo Comisión 📊

**Rutas:**
- `/comision/dashboard` - Métricas generales
- `/comision/evaluaciones` - Lista de todas las evaluaciones
- `/comision/reportes` - Reportes detallados
- `/comision/docentes` - Gestión de docentes

**Hook Principal:** `src/features/evaluacion-comision/hooks/useComisionData.js`

**Datos Mock Actuales:**
```javascript
const dashboardData = {
  totalEvaluaciones: 456,
  evaluacionesPendientes: 89,
  docentesEvaluados: 42,
  promedioGeneral: 4.2,
  // ...
};
```

**Endpoints Necesarios:**
- `GET /api/comision/dashboard` - Métricas generales
- `GET /api/comision/evaluaciones?page=1&limit=10` - Lista paginada
- `GET /api/comision/evaluaciones/:id` - Detalle de evaluación
- `GET /api/comision/reportes` - Datos para gráficos
- `GET /api/comision/docentes` - Lista de docentes
- `PUT /api/comision/evaluaciones/:id/validar` - Validar evaluación

---

### 3. Módulo Estudiante 🎓

**Rutas:**
- `/estudiante/dashboard` - Cursos y evaluaciones pendientes
- `/estudiante/perfil` - Información personal
- `/estudiante/evaluar-docentes` - Formulario de evaluación
- `/estudiante/explorar` - Búsqueda de docentes

**Hook Principal:** `src/features/evaluacion-estudiante/hooks/useEstudianteData.js`

**Formulario de Evaluación:**

El formulario tiene **4 secciones** con **8 criterios** en total:

```javascript
const criteriosEvaluacion = [
  {
    id: 1,
    titulo: "Dominio del Curso",
    criterios: [
      "Conocimiento de la materia",
      "Preparación de clases"
    ]
  },
  {
    id: 2,
    titulo: "Metodología de Enseñanza",
    criterios: [
      "Claridad en las explicaciones",
      "Uso de ejemplos prácticos"
    ]
  },
  {
    id: 3,
    titulo: "Relación con Estudiantes",
    criterios: [
      "Disponibilidad para consultas",
      "Trato respetuoso"
    ]
  },
  {
    id: 4,
    titulo: "Evaluación y Retroalimentación",
    criterios: [
      "Justicia en calificaciones",
      "Retroalimentación oportuna"
    ]
  }
];
```

**Envío de Evaluación:**
```javascript
const handleSubmitEvaluacion = async (evaluacionData) => {
  try {
    const response = await apiClient.post('/api/estudiante/evaluaciones', {
      docenteId: evaluacionData.docenteId,
      cursoId: evaluacionData.cursoId,
      calificaciones: evaluacionData.calificaciones, // Array con 8 ratings
      comentarioAdicional: evaluacionData.comentario,
      esAnonima: true
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar evaluación:', error);
    throw error;
  }
};
```

---

## 🗄️ Sistema de Datos Mock

### Ubicación de Hooks con Datos Mock

| Módulo | Hook | Archivo |
|--------|------|---------|
| **Auth** | authApi | `src/features/auth/api/authApi.js` |
| **Docente** | useDocenteData | `src/features/evaluaciones-docente/hooks/useDocenteData.js` |
| **Comisión** | useComisionData | `src/features/evaluacion-comision/hooks/useComisionData.js` |
| **Estudiante** | useEstudianteData | `src/features/evaluacion-estudiante/hooks/useEstudianteData.js` |

### Ventajas del Sistema Mock

✅ **Desarrollo independiente**: Frontend no bloquea a backend  
✅ **Testing fácil**: Datos predecibles para pruebas  
✅ **Migración simple**: Solo cambiar el hook, no los componentes  
✅ **Tipado claro**: Estructura de datos bien definida  

### Ejemplo de Datos Mock (Docente)

```javascript
// src/features/evaluaciones-docente/hooks/useDocenteData.js
const cursosDocente = [
  {
    id: 1,
    codigo: "IS301",
    nombre: "Diseño Detallado de Software",
    ciclo: "VI",
    creditos: 4,
    facultad: "FISI",
    estudiantes: 35,
    evaluaciones: 28,
    promedioRating: 4.5
  }
];

const evaluacionesRecientes = [
  {
    id: 1,
    curso: "Diseño Detallado de Software",
    fecha: "2025-01-15",
    rating: 5,
    comentario: "Excelente docente, muy claro en sus explicaciones",
    estudiante: "Anónimo"
  }
];
```

---

## 🌐 Cliente HTTP (Axios)

### Configuración Actual

**Archivo:** `src/shared/api/apiClient.js`

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir token JWT
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
  async (error) => {
    const originalRequest = error.config;

    // Si es 401 y no se ha reintentado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${apiClient.defaults.baseURL}/api/auth/refresh`,
          { refreshToken }
        );

        const { token } = response.data;
        localStorage.setItem('token', token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### Variables de Entorno

**Archivo:** `.env.local` (crear en la raíz del proyecto)

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=SED - Sistema de Evaluación Docente
VITE_ENV=development
```

### Uso en Componentes

```javascript
import apiClient from '@/shared/api/apiClient';

// GET request
const response = await apiClient.get('/api/docente/cursos');

// POST request
const response = await apiClient.post('/api/auth/login', {
  usuario: 'docente1',
  password: 'password123'
});

// PUT request
const response = await apiClient.put(`/api/docente/cursos/${cursoId}`, {
  nombre: 'Nuevo nombre'
});

// DELETE request
const response = await apiClient.delete(`/api/comision/evaluaciones/${evalId}`);
```

---

## 🔌 Endpoints Esperados

### 1. Autenticación

#### `POST /api/auth/login`
**Request:**
```json
{
  "usuario": "docente1",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": 1,
      "nombre": "Juan Pérez",
      "usuario": "docente1",
      "rol": "docente",
      "email": "juan.perez@unas.edu.pe",
      "facultad": "FISI",
      "avatar": "https://..."
    }
  }
}
```

#### `POST /api/auth/logout`
**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

#### `POST /api/auth/refresh`
**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

#### `GET /api/auth/me`
**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "rol": "docente",
    "email": "juan.perez@unas.edu.pe",
    "facultad": "FISI"
  }
}
```

---

### 2. Módulo Docente

#### `GET /api/docente/cursos`
**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "codigo": "IS301",
      "nombre": "Diseño Detallado de Software",
      "ciclo": "VI",
      "creditos": 4,
      "facultad": "FISI",
      "estudiantes": 35,
      "evaluaciones": 28,
      "promedioRating": 4.5
    }
  ]
}
```

#### `GET /api/docente/evaluaciones?cursoId=1&page=1&limit=10`
**Query Params:**
- `cursoId` (opcional): Filtrar por curso
- `page` (default: 1): Número de página
- `limit` (default: 10): Resultados por página

**Response (200):**
```json
{
  "success": true,
  "data": {
    "evaluaciones": [
      {
        "id": 1,
        "curso": "Diseño Detallado de Software",
        "cursoId": 1,
        "fecha": "2025-01-15T10:30:00Z",
        "rating": 5,
        "comentario": "Excelente docente",
        "estudiante": "Anónimo",
        "calificaciones": {
          "dominoCurso": 5,
          "metodologia": 5,
          "relacionEstudiantes": 4,
          "evaluacion": 5
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 28,
      "totalPages": 3
    }
  }
}
```

#### `GET /api/docente/estadisticas`
**Response (200):**
```json
{
  "success": true,
  "data": {
    "promedioGeneral": 4.5,
    "totalEvaluaciones": 156,
    "evaluacionesPorMes": [
      { "mes": "Enero", "cantidad": 45 },
      { "mes": "Febrero", "cantidad": 38 }
    ],
    "distribucionRatings": {
      "5": 80,
      "4": 50,
      "3": 20,
      "2": 5,
      "1": 1
    }
  }
}
```

#### `GET /api/docente/perfil`
**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez García",
    "email": "juan.perez@unas.edu.pe",
    "telefono": "+51 987 654 321",
    "facultad": "FISI",
    "departamento": "Ingeniería de Software",
    "especialidad": "Arquitectura de Software",
    "gradoAcademico": "Doctor en Ciencias de la Computación",
    "añosExperiencia": 15,
    "cursosActuales": 3,
    "avatar": "https://..."
  }
}
```

#### `PUT /api/docente/perfil`
**Request:**
```json
{
  "telefono": "+51 999 888 777",
  "especialidad": "Nueva especialidad"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Perfil actualizado exitosamente",
  "data": { /* perfil actualizado */ }
}
```

---

### 3. Módulo Comisión

#### `GET /api/comision/dashboard`
**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalEvaluaciones": 456,
    "evaluacionesPendientes": 89,
    "docentesEvaluados": 42,
    "promedioGeneral": 4.2,
    "evaluacionesPorFacultad": [
      { "facultad": "FISI", "total": 120 },
      { "facultad": "FIA", "total": 98 }
    ],
    "tendenciaMensual": [
      { "mes": "Enero", "promedio": 4.3 },
      { "mes": "Febrero", "promedio": 4.1 }
    ]
  }
}
```

#### `GET /api/comision/evaluaciones?estado=pendiente&page=1&limit=10`
**Query Params:**
- `estado`: `todas` | `pendiente` | `validada` | `rechazada`
- `docenteId` (opcional): Filtrar por docente
- `facultadId` (opcional): Filtrar por facultad
- `fechaInicio` (opcional): Fecha inicio (ISO 8601)
- `fechaFin` (opcional): Fecha fin (ISO 8601)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "evaluaciones": [
      {
        "id": 1,
        "docente": "Juan Pérez García",
        "docenteId": 1,
        "curso": "Diseño Detallado de Software",
        "cursoId": 1,
        "estudiante": "Anónimo",
        "fecha": "2025-01-15T10:30:00Z",
        "rating": 5,
        "estado": "pendiente",
        "comentario": "Excelente clase",
        "calificaciones": { /* ... */ }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 89,
      "totalPages": 9
    }
  }
}
```

#### `GET /api/comision/evaluaciones/:id`
**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "docente": {
      "id": 1,
      "nombre": "Juan Pérez García",
      "facultad": "FISI",
      "departamento": "Ingeniería de Software"
    },
    "curso": {
      "id": 1,
      "codigo": "IS301",
      "nombre": "Diseño Detallado de Software"
    },
    "fecha": "2025-01-15T10:30:00Z",
    "ratingGeneral": 5,
    "calificaciones": {
      "conocimientoMateria": 5,
      "preparacionClases": 5,
      "claridadExplicaciones": 4,
      "usoEjemplos": 5,
      "disponibilidadConsultas": 5,
      "tratoRespetuoso": 5,
      "justiciaCalificaciones": 4,
      "retroalimentacionOportuna": 5
    },
    "comentarioAdicional": "Excelente docente, muy preparado",
    "estado": "pendiente",
    "validadaPor": null,
    "fechaValidacion": null
  }
}
```

#### `PUT /api/comision/evaluaciones/:id/validar`
**Request:**
```json
{
  "estado": "validada",
  "comentarioComision": "Evaluación verificada y aprobada"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Evaluación validada exitosamente",
  "data": { /* evaluación actualizada */ }
}
```

#### `GET /api/comision/reportes/docentes?facultadId=1`
**Query Params:**
- `facultadId` (opcional): Filtrar por facultad
- `departamentoId` (opcional): Filtrar por departamento

**Response (200):**
```json
{
  "success": true,
  "data": {
    "docentes": [
      {
        "id": 1,
        "nombre": "Juan Pérez García",
        "facultad": "FISI",
        "totalEvaluaciones": 156,
        "promedioGeneral": 4.5,
        "tendencia": "estable",
        "mejorRating": "conocimientoMateria",
        "peorRating": "retroalimentacionOportuna"
      }
    ],
    "promedioFacultad": 4.3,
    "totalEvaluacionesFacultad": 520
  }
}
```

#### `GET /api/comision/docentes?search=Juan&page=1&limit=10`
**Query Params:**
- `search` (opcional): Búsqueda por nombre
- `facultadId` (opcional): Filtrar por facultad

**Response (200):**
```json
{
  "success": true,
  "data": {
    "docentes": [
      {
        "id": 1,
        "nombre": "Juan Pérez García",
        "email": "juan.perez@unas.edu.pe",
        "facultad": "FISI",
        "departamento": "Ingeniería de Software",
        "especialidad": "Arquitectura de Software",
        "totalEvaluaciones": 156,
        "promedioGeneral": 4.5,
        "estado": "activo"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "totalPages": 5
    }
  }
}
```

---

### 4. Módulo Estudiante

#### `GET /api/estudiante/dashboard`
**Response (200):**
```json
{
  "success": true,
  "data": {
    "cursosMatriculados": [
      {
        "id": 1,
        "codigo": "IS301",
        "nombre": "Diseño Detallado de Software",
        "docente": "Juan Pérez García",
        "docenteId": 1,
        "ciclo": "2025-1",
        "creditos": 4,
        "evaluado": false
      }
    ],
    "evaluacionesPendientes": 3,
    "evaluacionesCompletadas": 5,
    "ultimaEvaluacion": "2025-01-15T10:30:00Z"
  }
}
```

#### `GET /api/estudiante/perfil`
**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "María González López",
    "codigo": "2021100456",
    "email": "maria.gonzalez@unas.edu.pe",
    "facultad": "FISI",
    "escuela": "Ingeniería de Sistemas",
    "ciclo": "VI",
    "creditosAcumulados": 120,
    "promedioGeneral": 15.8,
    "cursosActuales": 6,
    "avatar": "https://..."
  }
}
```

#### `GET /api/estudiante/docentes?search=&departamento=&minRating=0`
**Query Params:**
- `search` (opcional): Búsqueda por nombre
- `departamento` (opcional): Filtrar por departamento
- `minRating` (opcional): Rating mínimo (0-5)
- `page` (default: 1)
- `limit` (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "docentes": [
      {
        "id": 1,
        "nombre": "Juan Pérez García",
        "email": "juan.perez@unas.edu.pe",
        "departamento": "Ingeniería de Software",
        "especialidad": "Arquitectura de Software",
        "cursosActivos": [
          {
            "codigo": "IS301",
            "nombre": "Diseño Detallado de Software"
          }
        ],
        "totalEvaluaciones": 156,
        "promedioRating": 4.5,
        "avatar": "https://...",
        "yaEvaluado": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "totalPages": 5
    }
  }
}
```

#### `GET /api/estudiante/docentes/:id`
**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez García",
    "email": "juan.perez@unas.edu.pe",
    "departamento": "Ingeniería de Software",
    "especialidad": "Arquitectura de Software",
    "gradoAcademico": "Doctor en Ciencias de la Computación",
    "añosExperiencia": 15,
    "cursosActivos": [
      {
        "id": 1,
        "codigo": "IS301",
        "nombre": "Diseño Detallado de Software",
        "ciclo": "VI"
      }
    ],
    "estadisticas": {
      "totalEvaluaciones": 156,
      "promedioGeneral": 4.5,
      "distribucionRatings": {
        "5": 80,
        "4": 50,
        "3": 20,
        "2": 5,
        "1": 1
      },
      "comentariosDestacados": [
        "Excelente docente, muy claro en sus explicaciones",
        "Muy preparado y organizado"
      ]
    },
    "yaEvaluado": false
  }
}
```

#### `POST /api/estudiante/evaluaciones`
**Request:**
```json
{
  "docenteId": 1,
  "cursoId": 1,
  "calificaciones": {
    "conocimientoMateria": 5,
    "preparacionClases": 5,
    "claridadExplicaciones": 4,
    "usoEjemplos": 5,
    "disponibilidadConsultas": 5,
    "tratoRespetuoso": 5,
    "justiciaCalificaciones": 4,
    "retroalimentacionOportuna": 5
  },
  "comentarioAdicional": "Excelente docente, muy preparado",
  "esAnonima": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Evaluación enviada exitosamente",
  "data": {
    "id": 123,
    "fechaEnvio": "2025-01-20T15:45:00Z",
    "estado": "pendiente"
  }
}
```

#### `GET /api/estudiante/mis-evaluaciones?page=1&limit=10`
**Response (200):**
```json
{
  "success": true,
  "data": {
    "evaluaciones": [
      {
        "id": 123,
        "docente": "Juan Pérez García",
        "curso": "Diseño Detallado de Software",
        "fecha": "2025-01-20T15:45:00Z",
        "ratingGeneral": 4.625,
        "estado": "validada"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

## 📊 Formatos de Datos

### Respuesta Estándar de Éxito

```json
{
  "success": true,
  "data": { /* datos solicitados */ },
  "message": "Operación exitosa" // opcional
}
```

### Respuesta Estándar de Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos enviados no son válidos",
    "details": {
      "field": "email",
      "reason": "Formato de email inválido"
    }
  }
}
```

### Códigos de Error Comunes

| Código HTTP | Tipo | Descripción |
|-------------|------|-------------|
| 400 | Bad Request | Datos inválidos |
| 401 | Unauthorized | Token no válido o expirado |
| 403 | Forbidden | Sin permisos para la acción |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej: ya evaluó) |
| 422 | Unprocessable Entity | Validación fallida |
| 500 | Internal Server Error | Error del servidor |

### Formato de Fechas

**ISO 8601:** `2025-01-20T15:45:00Z`

```javascript
// En frontend
const fecha = new Date(fechaISO);
const fechaFormateada = fecha.toLocaleDateString('es-PE');
```

### Paginación

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 156,
    "totalPages": 16
  }
}
```

---

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación

```
1. Usuario ingresa credenciales
   ↓
2. POST /api/auth/login
   ↓
3. Backend valida y retorna JWT + RefreshToken
   ↓
4. Frontend guarda en localStorage
   ↓
5. Todas las peticiones incluyen: Authorization: Bearer {token}
   ↓
6. Si token expira (401), usar refreshToken
   ↓
7. Si refresh falla, redirect a /login
```

### Tokens

**JWT (Access Token):**
- Tiempo de vida: **15 minutos**
- Guardado en: `localStorage.getItem('token')`
- Enviado en: `Authorization: Bearer {token}`

**Refresh Token:**
- Tiempo de vida: **7 días**
- Guardado en: `localStorage.getItem('refreshToken')`
- Usado para: Renovar access token

### Protección de Rutas

**Archivo:** `src/app/routes/AppRouter.jsx`

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

// Uso
<Route path="/docente/*" element={
  <ProtectedRoute requiredRole="docente">
    <DocenteLayout />
  </ProtectedRoute>
} />
```

### Renovación Automática de Token

El interceptor de Axios maneja automáticamente la renovación:

```javascript
// Si recibe 401
if (error.response?.status === 401) {
  // Intenta renovar con refreshToken
  const response = await axios.post('/api/auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken')
  });
  
  // Actualiza token y reinicia petición
  localStorage.setItem('token', response.data.token);
  return apiClient(originalRequest);
}
```

### Seguridad en Evaluaciones

**⚠️ IMPORTANTE: Anonimato**

Las evaluaciones de estudiantes deben ser **completamente anónimas**:

```javascript
// ❌ NUNCA enviar esto
{
  "estudianteId": 123,
  "estudianteNombre": "María González"
}

// ✅ Correcto
{
  "docenteId": 1,
  "cursoId": 1,
  "calificaciones": { /* ... */ },
  "comentarioAdicional": "...",
  "esAnonima": true
}
```

**Backend debe:**
- Registrar `estudianteId` internamente (desde el token JWT)
- **NUNCA** exponer `estudianteId` en respuestas
- Validar que el estudiante esté matriculado en el curso
- Prevenir evaluaciones duplicadas (1 evaluación por docente/curso)

---

## 🚀 Proceso de Integración

### Paso 1: Configuración Inicial

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/sed-frontend.git
cd sed-frontend

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local

# Editar .env.local
VITE_API_BASE_URL=http://localhost:8080
```

### Paso 2: Configurar CORS en Backend

**Java Spring Boot:**

```java
// src/main/java/com/unas/sed/config/CorsConfig.java
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173"); // Frontend dev
        config.addAllowedOrigin("https://tu-dominio.vercel.app"); // Frontend prod
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

### Paso 3: Implementar Endpoints

**Ejemplo: DocenteController.java**

```java
@RestController
@RequestMapping("/api/docente")
public class DocenteController {
    
    @Autowired
    private DocenteService docenteService;
    
    @GetMapping("/cursos")
    public ResponseEntity<ApiResponse> getCursos(
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            Long docenteId = getUserIdFromUserDetails(userDetails);
            List<Curso> cursos = docenteService.getCursosByDocenteId(docenteId);
            
            return ResponseEntity.ok(new ApiResponse(true, cursos));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                new ApiResponse(false, "Error al obtener cursos")
            );
        }
    }
    
    @GetMapping("/evaluaciones")
    public ResponseEntity<ApiResponse> getEvaluaciones(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestParam(required = false) Long cursoId,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit
    ) {
        try {
            Long docenteId = getUserIdFromUserDetails(userDetails);
            Page<Evaluacion> evaluaciones = docenteService.getEvaluaciones(
                docenteId, cursoId, page, limit
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("evaluaciones", evaluaciones.getContent());
            response.put("pagination", Map.of(
                "page", page,
                "limit", limit,
                "total", evaluaciones.getTotalElements(),
                "totalPages", evaluaciones.getTotalPages()
            ));
            
            return ResponseEntity.ok(new ApiResponse(true, response));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                new ApiResponse(false, "Error al obtener evaluaciones")
            );
        }
    }
}
```

### Paso 4: Migrar Hooks de Mock a API

**ANTES (Mock):**

```javascript
// src/features/evaluaciones-docente/hooks/useDocenteData.js
export const useDocenteData = () => {
  const [cursos, setCursos] = useState(cursosDocente);
  return { cursos };
};
```

**DESPUÉS (API):**

```javascript
// src/features/evaluaciones-docente/hooks/useDocenteData.js
import { useState, useEffect } from 'react';
import apiClient from '@/shared/api/apiClient';

export const useDocenteData = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiClient.get('/api/docente/cursos');
        
        if (response.data.success) {
          setCursos(response.data.data);
        } else {
          throw new Error(response.data.error.message);
        }
      } catch (err) {
        console.error('Error al cargar cursos:', err);
        setError(err.message || 'Error al cargar cursos');
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return { cursos, loading, error };
};
```

### Paso 5: Testing

**Checklist de Testing Manual:**

- [ ] Login con credenciales correctas
- [ ] Login con credenciales incorrectas (debe mostrar error)
- [ ] Logout (debe borrar token y redirigir)
- [ ] Acceso a rutas protegidas sin autenticación (debe redirigir a login)
- [ ] Cambio de idioma (debe persistir)
- [ ] Cambio de modo oscuro (debe persistir)
- [ ] Navegación en mobile (menú hamburguesa)
- [ ] Carga de datos en cada módulo
- [ ] Paginación (si aplica)
- [ ] Búsqueda y filtros
- [ ] Envío de formularios (evaluación)
- [ ] Manejo de errores (mostrar mensajes)
- [ ] Renovación automática de token (esperar 15 min)

**Testing con Postman:**

```json
// Collection: SED API
// Request: Login
POST http://localhost:8080/api/auth/login
{
  "usuario": "docente1",
  "password": "password123"
}

// Guardar token de respuesta como variable

// Request: Get Cursos
GET http://localhost:8080/api/docente/cursos
Headers:
  Authorization: Bearer {{token}}
```

### Paso 6: Deployment

**Frontend (Vercel):**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables de entorno en Vercel Dashboard
VITE_API_BASE_URL=https://tu-backend.herokuapp.com
```

**Backend (Heroku/AWS/etc.):**

```bash
# Configurar variables de entorno en producción
JWT_SECRET=tu_secret_muy_seguro
DB_URL=jdbc:postgresql://...
FRONTEND_URL=https://tu-frontend.vercel.app
```

---

## 🧪 Consideraciones Técnicas

### Performance

**1. Lazy Loading de Rutas:**
```javascript
const DocenteDashboard = lazy(() => import('@/pages/docente/DocenteDashboard'));
```

**2. React Query (Opcional pero Recomendado):**
```javascript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['cursos'],
  queryFn: () => apiClient.get('/api/docente/cursos'),
  staleTime: 5 * 60 * 1000, // 5 minutos
  cacheTime: 10 * 60 * 1000 // 10 minutos
});
```

**3. Imágenes Optimizadas:**
- Usar WebP cuando sea posible
- Implementar lazy loading: `<img loading="lazy" />`
- Considerar CDN para avatares

### Seguridad

**1. Sanitización de Inputs:**
```javascript
import DOMPurify from 'dompurify';

const comentarioLimpio = DOMPurify.sanitize(comentario);
```

**2. Rate Limiting (Backend):**
```java
// Limitar intentos de login
@RateLimit(key = "login", limit = 5, duration = 1, unit = TimeUnit.MINUTES)
```

**3. Validación de Roles:**
```java
// Verificar que el docente solo acceda a sus propios datos
if (!curso.getDocenteId().equals(docenteId)) {
    throw new ForbiddenException();
}
```

### Escalabilidad

**1. Paginación:**
- Siempre usar paginación en listas grandes
- Límite recomendado: 10-20 items por página

**2. Búsqueda con Debounce:**
```javascript
import { debounce } from 'lodash';

const handleSearch = debounce((query) => {
  apiClient.get(`/api/estudiante/docentes?search=${query}`);
}, 500);
```

**3. Caché de Respuestas:**
- Implementar caché en el cliente (React Query)
- Implementar caché en el servidor (Redis)

### Mantenibilidad

**1. Tipado con JSDoc:**
```javascript
/**
 * @typedef {Object} Curso
 * @property {number} id
 * @property {string} codigo
 * @property {string} nombre
 * @property {number} estudiantes
 */

/**
 * Obtiene los cursos del docente
 * @returns {Promise<Curso[]>}
 */
export const getCursos = async () => {
  const response = await apiClient.get('/api/docente/cursos');
  return response.data.data;
};
```

**2. Constantes Centralizadas:**
```javascript
// src/shared/constants/apiEndpoints.js
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  DOCENTE: {
    CURSOS: '/api/docente/cursos',
    EVALUACIONES: '/api/docente/evaluaciones'
  }
};
```

---

## 🧪 Testing de Integración

### Testing Manual

**Checklist por Módulo:**

**Autenticación:**
- [ ] Login exitoso con docente
- [ ] Login exitoso con comisión
- [ ] Login exitoso con estudiante
- [ ] Login fallido (credenciales incorrectas)
- [ ] Logout
- [ ] Persistencia de sesión (recargar página)
- [ ] Renovación automática de token

**Módulo Docente:**
- [ ] Ver lista de cursos
- [ ] Ver evaluaciones de un curso específico
- [ ] Ver estadísticas generales
- [ ] Ver gráficos de tendencia
- [ ] Editar perfil
- [ ] Cambiar idioma
- [ ] Cambiar tema (claro/oscuro)

**Módulo Comisión:**
- [ ] Ver dashboard con métricas
- [ ] Filtrar evaluaciones por estado
- [ ] Ver detalle de evaluación
- [ ] Validar evaluación
- [ ] Rechazar evaluación
- [ ] Ver lista de docentes
- [ ] Generar reportes

**Módulo Estudiante:**
- [ ] Ver dashboard con cursos
- [ ] Ver perfil personal
- [ ] Buscar docentes
- [ ] Filtrar docentes por departamento
- [ ] Ver perfil de docente
- [ ] Enviar evaluación
- [ ] Ver historial de evaluaciones

### Testing Automatizado

**Ejemplo con Vitest + React Testing Library:**

```javascript
// src/features/evaluaciones-docente/hooks/__tests__/useDocenteData.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDocenteData } from '../useDocenteData';
import apiClient from '@/shared/api/apiClient';

// Mock del cliente API
vi.mock('@/shared/api/apiClient');

describe('useDocenteData', () => {
  it('debe cargar cursos exitosamente', async () => {
    const mockCursos = [
      {
        id: 1,
        codigo: 'IS301',
        nombre: 'Diseño Detallado de Software'
      }
    ];

    apiClient.get.mockResolvedValue({
      data: {
        success: true,
        data: mockCursos
      }
    });

    const { result } = renderHook(() => useDocenteData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cursos).toEqual(mockCursos);
    expect(result.current.error).toBe(null);
  });

  it('debe manejar errores correctamente', async () => {
    const mockError = new Error('Error de red');
    apiClient.get.mockRejectedValue(mockError);

    const { result } = renderHook(() => useDocenteData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cursos).toEqual([]);
    expect(result.current.error).toBe('Error de red');
  });
});
```

---

## 📚 Recursos Adicionales

### Documentación del Proyecto

- **Arquitectura:** `docs/architecture_frontend.md`
- **Patrones de Diseño:** `docs/design_patterns.md`
- **Biblioteca de Componentes:** `docs/component_library.md`
- **Endpoints Backend:** Este documento

### Herramientas Recomendadas

**Para Backend:**
- **Postman** - Testing de APIs
- **Swagger/OpenAPI** - Documentación interactiva
- **DBeaver** - Gestión de base de datos

**Para Frontend:**
- **React DevTools** - Debugging de componentes
- **Redux DevTools** - Estado global (si se implementa)
- **Lighthouse** - Auditoría de performance

**Para Ambos:**
- **Git** - Control de versiones
- **Sentry** - Monitoreo de errores
- **LogRocket** - Session replay

### Contacto

**Frontend Team:**
- **Josué Sebastián Oriundo Tafur** - Frontend Lead
  - Email: josue.oriundo@unas.edu.pe
  - GitHub: @josue-oriundo

- **Sergio Andres Henriquez Moya** - Frontend Developer (Módulo Estudiante)
  - Email: sergio.henriquez@unas.edu.pe
  - GitHub: @sergio-henriquez

**Para consultas:**
- Crear un issue en el repositorio
- Enviar email al equipo frontend
- Slack: #sed-integracion

---

## ✅ Checklist Final de Integración

### Backend

- [ ] Endpoints de autenticación implementados
- [ ] Endpoints de módulo Docente implementados
- [ ] Endpoints de módulo Comisión implementados
- [ ] Endpoints de módulo Estudiante implementados
- [ ] CORS configurado correctamente
- [ ] JWT con tiempo de expiración configurado
- [ ] Refresh token implementado
- [ ] Validaciones de entrada implementadas
- [ ] Manejo de errores estandarizado

### Frontend

- [ ] Variables de entorno configuradas
- [ ] Cliente HTTP apuntando al backend
- [ ] Hooks migrados de mock a API
- [ ] Manejo de loading states
- [ ] Manejo de errores (UI feedback)
- [ ] Validación de formularios
- [ ] Protección de rutas funcional
- [ ] Renovación automática de token funcional
- [ ] Logout limpia localStorage
- [ ] Testing manual completado

### Testing Integrado

- [ ] Login funciona con usuarios reales
- [ ] Todas las rutas cargan datos del backend
- [ ] Paginación funciona correctamente
- [ ] Búsqueda y filtros funcionan
- [ ] Formularios envían y reciben respuestas
- [ ] Errores se muestran correctamente al usuario
- [ ] Token se renueva automáticamente
- [ ] Logout funciona y redirige a login
- [ ] Evaluaciones mantienen anonimato
- [ ] Roles se validan correctamente (docente no accede a comisión, etc.)
- [ ] Performance es aceptable (<3s carga inicial)
- [ ] No hay errores en consola del navegador

---

<div align="center">

**¡Listo para la integración! 🚀**

*Si tienes dudas, revisa este documento o contacta al equipo frontend.*

</div>
