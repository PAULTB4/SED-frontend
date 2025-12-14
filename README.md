# SED - Sistema de Evaluación Docente

<div align="center">

**Universidad Nacional Agraria de la Selva (UNAS)**  
*Facultad de Ingeniería de Sistemas e Informática*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Feature-Sliced Design](https://img.shields.io/badge/Architecture-FSD-brightgreen)](https://feature-sliced.design/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📋 Descripción

**SED (Sistema de Evaluación Docente)** es una plataforma web diseñada para permitir a los estudiantes de la UNAS evaluar a sus docentes de forma **anónima, segura y estructurada** al finalizar cada curso.

Mediante un sistema de **calificación por estrellas** (1-5) y **comentarios anónimos**, los estudiantes pueden valorar aspectos como:

- 🎯 Claridad en la explicación
- 📚 Dominio del tema
- ⏰ Puntualidad
- 🤝 Disposición para ayudar
- 📖 Cumplimiento del syllabus
- 📊 Uso de materiales didácticos

---

## 🎯 Objetivos del Proyecto

### Objetivos Principales

1. **Mejorar la calidad educativa** mediante retroalimentación continua hacia los docentes
2. **Garantizar transparencia** institucional con evaluaciones anónimas
3. **Apoyar decisiones académicas** basadas en datos reales
4. **Facilitar la elección de cursos** con referencias de otros estudiantes

### Beneficios Esperados

- ✅ Docentes reciben feedback constructivo para mejorar
- ✅ Estudiantes tienen voz en el proceso educativo
- ✅ La institución toma decisiones informadas
- ✅ Se promueve una cultura de mejora continua

---

## 🏗️ Arquitectura

El proyecto utiliza **Feature-Sliced Design (FSD)**, una arquitectura moderna que organiza el código por funcionalidades de negocio.

### Estructura de Capas
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

- ✅ **Singleton** - Cliente HTTP único
- ✅ **Factory** - Crear tipos de evaluaciones
- ✅ **Adapter** - Adaptar datos API ↔ Frontend
- ✅ **Strategy** - Validaciones por rol
- ✅ **State** - Estados de evaluación
- ✅ **Observer** - Notificaciones globales (Redux)
- ✅ **Decorator (HOC)** - Protección de rutas

📖 Ver documentación completa:
- [Patrones de Diseño](docs/design_patterns.md)
- [**Diseño Detallado de Software**](docs/DISEÑO_DETALLADO.md) ⭐ NUEVO v1

---

## 👥 Roles del Sistema

### 1. 🎓 Estudiante
**Funcionalidades:**
- Evaluar docentes con estrellas y comentarios
- Ver historial de evaluaciones propias
- Consultar evaluaciones de otros estudiantes
- Recibir notificaciones de periodos de evaluación

### 2. 👨‍🏫 Docente
**Funcionalidades:**
- Ver resultados agregados de sus evaluaciones
- Consultar gráficos y estadísticas de desempeño
- Ver evolución histórica por semestre
- Exportar reportes personales

### 3. 📊 Comisión de Evaluación
**Funcionalidades:**
- Revisar evaluaciones por facultad/escuela
- Generar reportes institucionales
- Aprobar/rechazar evaluaciones
- Definir periodos de evaluación

### 4. 🛠️ Administrador
**Funcionalidades:**
- Gestionar usuarios (CRUD)
- Configurar criterios de evaluación
- Administrar cursos y docentes
- Ver estadísticas globales del sistema

---

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18+** - Librería UI
- **React Router** - Enrutamiento
- **Redux Toolkit** - Gestión de estado
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios
- **Yup** - Validación de esquemas

### Herramientas de Desarrollo
- **Vite** - Build tool
- **ESLint** - Linter
- **Prettier** - Formateador de código

### Diseño
- **CSS Modules** / **Styled Components**
- **Material-UI** / **Tailwind CSS** (según decisión del equipo)

---

## 📦 Instalación y Configuración

### Requisitos Previos
- Node.js >= 18.x
- npm >= 9.x

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/team-inkietos/sed-frontend.git](https://github.com/PAULTB4/SED-frontend.git
cd sed-frontend
```

2. **Cambiar a la rama de desarrollo**
```bash
git checkout v3
```

3. **Instalar dependencias**
```bash
npm install
```

4. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
VITE_API_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 🎯 URLs de Acceso a las Vistas Desarrolladas

#### 📘 Módulo Docente (Completado)
- **Dashboard**: `http://localhost:5173/docente/dashboard`
- **Mi Perfil**: `http://localhost:5173/docente/perfil`
- **Mis Evaluaciones**: `http://localhost:5173/docente/evaluaciones`
- **Recomendaciones**: `http://localhost:5173/docente/recomendaciones`

#### 📊 Módulo Comisión (Completado)
- **Dashboard**: `http://localhost:5173/comision/dashboard`
- **Mi Perfil**: `http://localhost:5173/comision/perfil`
- **Períodos**: `http://localhost:5173/comision/periodos`
- **Reportes**: `http://localhost:5173/comision/reportes`

#### 🎓 Módulo Estudiante (Completado - v3)
- **Dashboard**: `http://localhost:5173/estudiante/dashboard`
- **Mi Perfil**: `http://localhost:5173/estudiante/perfil`
- **Evaluar Docentes**: `http://localhost:5173/estudiante/evaluar-docentes`
- **Explorar Docentes**: `http://localhost:5173/estudiante/explorar`

> **Nota**: Actualmente todas las vistas funcionan con datos mock. Ver sección de **Integración con Backend** para más detalles.

---

## 📂 Estructura del Proyecto
```
/sed-frontend
├── /docs                    # 📚 Documentación
│   ├── architecture_frontend.md
│   ├── design_patterns.md
│   └── README.md
├── /public                  # Archivos estáticos
├── /src
│   ├── /app                 # Configuración global
│   ├── /pages               # Páginas por rol
│   ├── /features            # Funcionalidades
│   ├── /entities            # Modelos de dominio
│   ├── /shared              # Código compartido
│   └── /styles              # Estilos globales
├── .env.example
├── package.json
└── README.md
```

📖 Ver estructura detallada en [`/docs/architecture_frontend.md`](docs/architecture_frontend.md)

---

## 🔐 Autenticación y Seguridad

- ✅ Autenticación con **JWT**
- ✅ Protección de rutas por rol
- ✅ Cifrado de datos sensibles
- ✅ Anonimato garantizado en evaluaciones
- ✅ Validación de permisos en cada request

---

## 📊 Funcionalidades Principales

### ✅ Módulo de Docentes (Completado - v1)
- [x] **Dashboard**: Estadísticas generales, lista de cursos
- [x] **Mi Perfil**: Información personal, datos académicos, estadísticas de gestión
- [x] **Mis Evaluaciones**: Gráficos de evolución, tabla detallada de evaluaciones por curso
- [x] **Recomendaciones**: Sistema de sugerencias priorizadas por categoría
- [x] **Modo Oscuro**: Toggle persistente en todas las vistas
- [x] **Componentes reutilizables**: StatCard, CourseCard, BarChart, LineChart, StarRating

**Archivos importantes:**
- `src/pages/docente/` - Todas las páginas del módulo
- `src/features/evaluaciones-docente/hooks/useDocenteData.js` - Hook con datos mock
- `src/shared/ui/layouts/DocenteLayout/` - Layout con navbar y navegación

### ✅ Módulo de Comisión (Completado - v1)
- [x] **Dashboard**: Banner informativo, funciones principales, estadísticas generales, accesos rápidos, períodos activos
- [x] **Mi Perfil**: Avatar, información de contacto (6 items), responsabilidades del cargo, estadísticas de gestión
- [x] **Períodos**: Tabs (Activos/Programados/Finalizados), tarjetas con progreso, botón crear período
- [x] **Reportes**: Selector de período, botones exportar PDF/Excel, 3 stat cards, 4 gráficos (barras, pie, línea), tabla de reportes recientes
- [x] **Modo Oscuro**: Toggle persistente en todas las vistas
- [x] **Componentes reutilizables**: PieChart (nuevo), aprovecha StatCard, BarChart, LineChart

**Archivos importantes:**
- `src/pages/comision/` - Todas las páginas del módulo
- `src/features/evaluacion-comision/hooks/useComisionData.js` - Hook con datos mock
- `src/shared/ui/layouts/ComisionLayout/` - Layout con navbar y navegación
- `src/shared/ui/components/PieChart/` - Nuevo componente para gráficos circulares

### ✅ Módulo de Estudiantes (Completado - v3)
- [x] **Dashboard**: Cursos matriculados, evaluaciones pendientes/completadas
- [x] **Mi Perfil**: Información personal, cursos actuales, historial académico
- [x] **Evaluar Docentes**: Formulario con 4 secciones (8 criterios), comentarios adicionales
- [x] **Explorar Docentes**: Búsqueda, filtros (departamento, rating), vista de perfiles
- [x] **Sistema de Evaluación**: Calificación por estrellas (1-5), comentarios anónimos
- [x] **Modo Oscuro**: Toggle persistente en todas las vistas
- [x] **Componentes reutilizables**: Aprovecha StatCard, CourseCard, StarRating

**Archivos importantes:**
- `src/pages/estudiante/` - Todas las páginas del módulo
- `src/features/evaluacion-estudiante/hooks/useEstudianteData.js` - Hook con datos mock
- `src/shared/ui/layouts/EstudianteLayout/` - Layout con navbar y menú hamburguesa

---

## 🔌 Integración con Backend (Java Spring Boot)

### 📋 Datos Mock vs API Real

**Estado Actual (v1):**
Todos los módulos funcionan con datos mock almacenados en custom hooks. Esto permite desarrollar el frontend de manera independiente mientras el backend está en desarrollo.

### 🎯 Archivos Mock a Reemplazar

#### Para Módulo Docente:
**Archivo**: `src/features/evaluaciones-docente/hooks/useDocenteData.js`

```javascript
// ❌ MOCK ACTUAL (Temporal)
export const useDocenteData = () => {
  const [data, setData] = useState(null);
  // ... datos hardcodeados
  return { data, loading, error };
};

// ✅ IMPLEMENTACIÓN CON API (Futuro)
export const useDocenteData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/docentes/me');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
```

#### Para Módulo Comisión:
**Archivo**: `src/features/evaluacion-comision/hooks/useComisionData.js`

Similar estructura, reemplazar datos mock con llamadas a:
- `GET /comision/estadisticas` - Estadísticas generales
- `GET /comision/periodos` - Lista de períodos
- `GET /comision/reportes` - Reportes y gráficos

### 🔧 Cliente HTTP Configurado

El proyecto ya tiene un cliente HTTP base en:
**Archivo**: `src/shared/api/apiClient.js`

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

// Interceptor para agregar token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiClient };
```

### 📡 Endpoints Esperados del Backend

#### Autenticación
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
```

#### Docentes
```
GET  /api/docentes/me                    - Información del docente autenticado
GET  /api/docentes/me/estadisticas       - Estadísticas generales
GET  /api/docentes/me/cursos             - Lista de cursos
GET  /api/docentes/me/evaluaciones       - Evaluaciones recibidas
GET  /api/docentes/me/recomendaciones    - Recomendaciones generadas
```

#### Comisión
```
GET  /api/comision/estadisticas          - Estadísticas globales
GET  /api/comision/periodos              - Lista de períodos de evaluación
POST /api/comision/periodos              - Crear nuevo período
GET  /api/comision/reportes              - Datos para reportes y gráficos
GET  /api/comision/reportes/export/pdf   - Exportar reporte en PDF
GET  /api/comision/reportes/export/excel - Exportar reporte en Excel
```

### 🔐 Formato de Respuestas Esperado

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

### ⚠️ Manejo de Errores

```json
{
  "success": false,
  "error": {
    "code": "ERR_UNAUTHORIZED",
    "message": "Token inválido o expirado"
  },
  "timestamp": "2025-12-13T10:30:00Z"
}
```

### 📝 Consideraciones para Integración

1. **Autenticación JWT**: El token debe almacenarse en `localStorage` con key `'token'`
2. **CORS**: El backend debe permitir peticiones desde `http://localhost:5173` en desarrollo
3. **Formato de Fechas**: Usar formato ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`)
4. **Paginación**: Implementar para listas grandes (cursos, evaluaciones, etc.)
5. **Validación**: El frontend ya valida datos, pero el backend debe revalidar por seguridad

### 🚀 Pasos para Migrar de Mock a API

1. Configurar `VITE_API_URL` en `.env.local` apuntando al backend
2. Reemplazar contenido de hooks `useDocenteData` y `useComisionData`
3. Agregar manejo de estados de carga y error en componentes
4. Implementar refresh de datos cuando sea necesario
5. Probar con diferentes escenarios (éxito, error, timeout)

### 📦 Estructura de Datos Mock (Referencia para Backend)

Los datos mock actuales sirven como **contrato de interfaz** entre frontend y backend. El backend debe retornar estructuras similares para mantener compatibilidad.

Ver archivos mock completos en:
- `src/features/evaluaciones-docente/hooks/useDocenteData.js`
- `src/features/evaluacion-comision/hooks/useComisionData.js`

## 🧪 Testing
```bash
# Ejecutar tests
npm run test

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

---

## 📈 Roadmap

### Fase 1: MVP (Actual) ✅
- [x] Autenticación y autorización
- [x] Evaluación docente básica
- [x] Dashboard por rol
- [x] Reportes básicos

### Fase 2: Mejoras (Próxima)
- [ ] Notificaciones en tiempo real
- [ ] Sistema de reportes avanzado
- [ ] Integración con sistema académico
- [ ] App móvil (React Native)

### Fase 3: Expansión (Futura)
- [ ] IA para análisis de comentarios
- [ ] Recomendaciones personalizadas
- [ ] Sistema de badges para docentes
- [ ] API pública para integraciones

---

## 👨‍💻 Equipo de Desarrollo

**Team Zentry**

- **Tarazona Benancio Paul Marco** - Project Manager / Developer
- **Josué Sebastián Oriundo Tafur** - Frontend Lead / Developer
- **Sergio Andres Henriquez Moya** - Frontend Developer (Módulo Estudiante)
- **-** - Backend Developer
- **-** - Backend Developer

---

## 📝 Licencia

Este proyecto es parte del curso **Diseño Detallado de Software** de la **Universidad Nacional Agraria de la Selva (UNAS)**.

---

## 📞 Contacto

**Universidad Nacional Agraria de la Selva**  
📍 Av. Universitaria Km 1.5 - Tingo María, Perú  
📧 informes@unas.edu.pe  
🌐 [www.unas.edu.pe](https://www.unas.edu.pe)

---

## 🙏 Agradecimientos

- **YANAC MONTESINO, RANNOVERNG** - Docente del curso
- **Facultad de Ingeniería de Sistemas e Informática - UNAS**
- **Comunidad de estudiantes y docentes de la UNAS**

---

<div align="center">

**Hecho con ❤️ por Zentry Corp**

*Universidad Nacional Agraria de la Selva - 2025*

</div>
