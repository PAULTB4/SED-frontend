# 🏗️ Diseño Detallado de Software - SED Frontend

## 📑 Tabla de Contenidos
1. [Arquitectura General](#arquitectura-general)
2. [Patrones de Diseño Implementados](#patrones-de-diseño-implementados)
3. [Componentes Principales](#componentes-principales)
4. [Flujo de Datos](#flujo-de-datos)
5. [Gestión de Estado](#gestión-de-estado)
6. [Estructura de Archivos](#estructura-de-archivos)

---

## 🎯 Arquitectura General

### Feature-Sliced Design (FSD)

El proyecto implementa FSD, una arquitectura modular que organiza el código en capas y slices:

```
┌─────────────────────────────────────────┐
│         APP (Capa de Aplicación)        │  ← Configuración, rutas, providers
├─────────────────────────────────────────┤
│        PAGES (Capa de Páginas)          │  ← Composición de vistas
├─────────────────────────────────────────┤
│      FEATURES (Capa de Características) │  ← Lógica de negocio
├─────────────────────────────────────────┤
│       ENTITIES (Capa de Entidades)      │  ← Modelos de dominio
├─────────────────────────────────────────┤
│       SHARED (Capa Compartida)          │  ← Utilidades, UI, API
└─────────────────────────────────────────┘
```

**Principios Clave:**
- ✅ **Aislamiento**: Cada capa solo puede importar de capas inferiores
- ✅ **Cohesión**: Código relacionado permanece junto
- ✅ **Reutilización**: Componentes shared usables en todo el proyecto
- ✅ **Escalabilidad**: Fácil agregar nuevas features sin afectar existentes

---

## 🎨 Patrones de Diseño Implementados

### 1. **Custom Hooks Pattern**

Encapsula lógica de negocio y llamadas a API en hooks reutilizables.

**Ejemplo: useDocenteData**
```javascript
// src/features/evaluaciones-docente/hooks/useDocenteData.js
export const useDocenteData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocenteData();
  }, []);

  return { data, loading, error };
};
```

**Beneficios:**
- ✅ Separación de lógica y presentación
- ✅ Fácil testing
- ✅ Reutilización en múltiples componentes
- ✅ Fácil migración de mock a API real

### 2. **Container/Presentation Pattern**

Separación entre componentes que manejan lógica (containers) y componentes que solo renderizan (presentational).

**Ejemplo:**
```
DocenteDashboard (Container)
  ├── useDocenteData() hook
  ├── Maneja estados
  └── Renderiza:
      ├── StatCard (Presentational)
      ├── CourseCard (Presentational)
      └── BarChart (Presentational)
```

### 3. **Compound Components Pattern**

Componentes que trabajan juntos compartiendo estado implícito.

**Ejemplo: ComisionPeriodos con Tabs**
```javascript
<Tabs activeTab={activeTab}>
  <Tab label="Activos" />
  <Tab label="Programados" />
  <Tab label="Finalizados" />
</Tabs>
```

### 4. **Higher-Order Components (HOC)**

Para protección de rutas y inyección de props.

**Ejemplo: withAuth (Futuro)**
```javascript
const ProtectedRoute = withAuth(DocenteDashboard, ['ROLE_DOCENTE']);
```

### 5. **Factory Pattern**

Para crear diferentes tipos de componentes de gráficos.

**Implementado en:**
- BarChart
- LineChart
- PieChart

### 6. **Observer Pattern**

Para modo oscuro persistente y sincronizado en toda la app.

**Implementación:**
```javascript
// Se observa cambio en darkMode
useEffect(() => {
  document.documentElement.classList.toggle('dark-mode', darkMode);
  localStorage.setItem('darkMode', darkMode);
}, [darkMode]);
```

---

## 🧩 Componentes Principales

### Shared Components (Reutilizables)

#### 1. **StatCard**
Tarjeta de estadística con borde coloreado e ícono.

**Props:**
```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  borderColor: string;
  icon?: ReactNode;
}
```

**Usado en:**
- DocenteDashboard
- DocenteProfile
- ComisionDashboard
- ComisionProfile
- ComisionReportes

#### 2. **Avatar**
Imagen de perfil circular con fallback a iniciales.

**Props:**
```typescript
interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback: string; // Iniciales
}
```

#### 3. **CourseCard**
Tarjeta de curso con información y acciones.

**Props:**
```typescript
interface CourseCardProps {
  codigo: string;
  nombre: string;
  estudiantes: number;
  evaluaciones: number;
  promedio: number;
  onVerEvaluaciones: () => void;
}
```

#### 4. **BarChart**
Gráfico de barras SVG personalizado.

**Props:**
```typescript
interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  color?: string;
  maxValue?: number;
  showPercentage?: boolean;
}
```

#### 5. **LineChart**
Gráfico de líneas SVG para tendencias.

**Props:**
```typescript
interface LineChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  color?: string;
}
```

#### 6. **PieChart** (Nuevo en v1)
Gráfico circular SVG con leyenda.

**Props:**
```typescript
interface PieChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  size?: number;
}
```

### Layout Components

#### DocenteLayout
Layout principal para módulo docente.

**Características:**
- Navbar con 4 links de navegación
- Toggle de modo oscuro
- Notificaciones (badge)
- Dropdown de usuario
- Outlet para rutas anidadas

#### ComisionLayout
Layout principal para módulo comisión.

**Características:**
- Navbar con 4 links de navegación (sin Encuestas)
- Toggle de modo oscuro
- Notificaciones (badge)
- Dropdown de usuario
- Outlet para rutas anidadas

---

## 🔄 Flujo de Datos

### Flujo de Autenticación (Futuro)
```
1. Usuario → LoginForm
2. LoginForm → authApi.login()
3. authApi → Backend (POST /auth/login)
4. Backend → Token JWT
5. Token → localStorage
6. Redirect → Dashboard según rol
7. Cada request → Interceptor agrega token
```

### Flujo de Datos Mock (Actual v1)
```
1. Componente monta → useDocenteData()
2. Hook simula delay 800ms
3. Hook retorna datos mock
4. Componente renderiza con datos
5. Usuario interactúa → Navegación entre páginas
6. Cada página usa mismo hook → Mismo estado mock
```

### Flujo con API Real (Futuro)
```
1. Componente monta → useDocenteData()
2. Hook → apiClient.get('/docentes/me')
3. Backend procesa → Retorna JSON
4. Hook actualiza estado → { data, loading, error }
5. Componente re-renderiza
6. Usuario actualiza → Hook refetch
```

---

## 🗂️ Gestión de Estado

### Estado Local (useState)
Para estado de UI temporal:
- Modales abiertos/cerrados
- Tabs activos
- Dropdowns expandidos
- Inputs de formularios

### Estado Compartido (localStorage)
Para persistencia entre sesiones:
- `darkMode`: boolean
- `token`: string (JWT)
- `user`: object (datos básicos)

### Estado Global (Futuro con Redux)
Para estado compartido entre componentes:
- Información de usuario autenticado
- Notificaciones
- Configuración de app

---

## 📁 Estructura de Archivos Detallada

```
src/
├── app/
│   ├── App.jsx                          # Componente raíz
│   └── routes/
│       └── AppRouter.jsx                # Configuración de rutas
│
├── pages/
│   ├── auth/
│   │   ├── LoginPage.jsx                # Página de login
│   │   └── index.js
│   ├── landing/
│   │   ├── LandingPage.jsx              # Página de inicio
│   │   └── index.js
│   ├── docente/                         # ✅ Completado v1
│   │   ├── DocenteDashboard.jsx
│   │   ├── DocenteDashboard.css
│   │   ├── DocenteProfile.jsx
│   │   ├── DocenteProfile.css
│   │   ├── DocenteEvaluaciones.jsx
│   │   ├── DocenteEvaluaciones.css
│   │   ├── DocenteRecomendaciones.jsx
│   │   ├── DocenteRecomendaciones.css
│   │   └── index.js
│   └── comision/                        # ✅ Completado v1
│       ├── ComisionDashboard.jsx
│       ├── ComisionDashboard.css
│       ├── ComisionProfile.jsx
│       ├── ComisionProfile.css
│       ├── ComisionPeriodos.jsx
│       ├── ComisionPeriodos.css
│       ├── ComisionReportes.jsx
│       ├── ComisionReportes.css
│       └── index.js
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   └── authApi.js               # API de autenticación
│   │   └── hooks/
│   │       └── useAuth.js               # Hook de auth
│   ├── evaluaciones-docente/            # ✅ Completado v1
│   │   ├── hooks/
│   │   │   ├── useDocenteData.js        # 🔄 Mock data - Migrar a API
│   │   │   └── index.js
│   │   └── index.js
│   └── evaluacion-comision/             # ✅ Completado v1
│       ├── hooks/
│       │   ├── useComisionData.js       # 🔄 Mock data - Migrar a API
│       │   └── index.js
│       └── index.js
│
├── shared/
│   ├── api/
│   │   ├── apiClient.js                 # Cliente HTTP configurado
│   │   └── index.js
│   └── ui/
│       ├── components/                  # Componentes reutilizables
│       │   ├── Avatar/
│       │   │   ├── Avatar.jsx
│       │   │   ├── Avatar.css
│       │   │   └── index.js
│       │   ├── StatCard/
│       │   │   ├── StatCard.jsx
│       │   │   ├── StatCard.css
│       │   │   └── index.js
│       │   ├── CourseCard/
│       │   │   ├── CourseCard.jsx
│       │   │   ├── CourseCard.css
│       │   │   └── index.js
│       │   ├── BarChart/
│       │   │   ├── BarChart.jsx
│       │   │   ├── BarChart.css
│       │   │   └── index.js
│       │   ├── LineChart/
│       │   │   ├── LineChart.jsx
│       │   │   ├── LineChart.css
│       │   │   └── index.js
│       │   ├── PieChart/               # ✅ Nuevo en v1
│       │   │   ├── PieChart.jsx
│       │   │   ├── PieChart.css
│       │   │   └── index.js
│       │   └── index.js                # Barrel export
│       └── layouts/
│           ├── DocenteLayout/           # ✅ Completado v1
│           │   ├── DocenteLayout.jsx
│           │   ├── DocenteLayout.css
│           │   └── index.js
│           ├── ComisionLayout/          # ✅ Completado v1
│           │   ├── ComisionLayout.jsx
│           │   ├── ComisionLayout.css
│           │   └── index.js
│           ├── AuthLayout/
│           │   ├── AuthLayout.jsx
│           │   ├── AuthLayout.css
│           │   └── index.js
│           ├── LandingLayout/
│           │   ├── LandingLayout.jsx
│           │   ├── LandingLayout.css
│           │   └── index.js
│           └── index.js
│
├── styles/
│   ├── globals.css                      # Estilos globales
│   └── variables.css                    # Variables CSS (colores, modo oscuro)
│
├── main.jsx                             # Punto de entrada
└── index.css                            # Estilos base
```

---

## 🎨 Sistema de Diseño

### Variables CSS

**Archivo**: `src/styles/variables.css`

```css
:root {
  /* Colores principales */
  --color-primary: #10B981;
  --color-primary-dark: #059669;
  
  /* Colores de fondo */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: rgba(255, 255, 255, 0.95);
  
  /* Colores de texto */
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  
  /* Bordes */
  --color-border: #e5e7eb;
}

.dark-mode {
  /* Colores para modo oscuro */
  --color-bg-primary: #111827;
  --color-bg-secondary: #1f2937;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-border: #374151;
}
```

### Paleta de Colores

- **Verde Primario**: `#10B981` - Color principal del sistema
- **Azul**: `#3B82F6` - Información y secundario
- **Naranja**: `#F59E0B` - Advertencias y métricas
- **Rojo**: `#EF4444` - Errores y alertas
- **Morado**: `#8B5CF6` - Alternativo

### Tipografía

- **Font Family**: System fonts (sin dependencias externas)
- **Tamaños**:
  - H1: 2rem (32px)
  - H2: 1.5rem (24px)
  - H3: 1.25rem (20px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Espaciado

Sistema basado en 8px:
- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 3rem (48px)

---

## 🔐 Seguridad

### Almacenamiento de Token
```javascript
// Guardar token después de login
localStorage.setItem('token', jwtToken);

// Recuperar token para requests
const token = localStorage.getItem('token');

// Limpiar al logout
localStorage.removeItem('token');
```

### Interceptor HTTP
```javascript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Protección de Rutas (Futuro)
```javascript
<Route 
  path="/docente/*" 
  element={
    <ProtectedRoute roles={['ROLE_DOCENTE']}>
      <DocenteLayout />
    </ProtectedRoute>
  } 
/>
```

---

## 📊 Métricas y Rendimiento

### Optimizaciones Implementadas

1. **Lazy Loading de Rutas** (Futuro)
```javascript
const DocenteDashboard = lazy(() => import('@/pages/docente/DocenteDashboard'));
```

2. **Memoización de Componentes**
```javascript
export const StatCard = memo(({ title, value, icon }) => {
  // ...
});
```

3. **Debouncing en Búsquedas** (Futuro)
```javascript
const debouncedSearch = useDebounce(searchTerm, 500);
```

4. **CSS Variables** para tema dinámico sin re-renders

---

## 🧪 Testing (Futuro)

### Estructura de Tests
```
src/
├── __tests__/
│   ├── components/
│   │   ├── StatCard.test.jsx
│   │   └── Avatar.test.jsx
│   ├── hooks/
│   │   ├── useDocenteData.test.js
│   │   └── useAuth.test.js
│   └── pages/
│       └── DocenteDashboard.test.jsx
```

### Herramientas Sugeridas
- **Vitest** - Test runner
- **React Testing Library** - Testing de componentes
- **MSW** - Mock Service Worker para API mocking

---

## 🚀 Roadmap Técnico

### Fase 1: MVP ✅ (v1 - Actual)
- [x] Arquitectura FSD
- [x] Componentes base reutilizables
- [x] Layouts con navegación
- [x] Módulo Docente completo con datos mock
- [x] Módulo Comisión completo con datos mock
- [x] Modo oscuro persistente
- [x] Gráficos SVG personalizados

### Fase 2: Integración Backend ⏳
- [ ] Migrar hooks a API calls reales
- [ ] Implementar autenticación JWT
- [ ] Protección de rutas por rol
- [ ] Manejo de errores global
- [ ] Loading states optimizados
- [ ] Refresh de datos automático

### Fase 3: Optimización 📋
- [ ] Implementar Redux para estado global
- [ ] Lazy loading de rutas
- [ ] Code splitting avanzado
- [ ] Optimización de bundle size
- [ ] PWA (Service Workers)
- [ ] Notificaciones push

### Fase 4: Testing 📋
- [ ] Unit tests para componentes
- [ ] Integration tests para páginas
- [ ] E2E tests con Playwright
- [ ] Cobertura > 80%

---

## 📝 Convenciones de Código

### Naming Conventions

**Componentes**: PascalCase
```javascript
export const DocenteDashboard = () => { }
```

**Hooks**: camelCase con prefijo `use`
```javascript
export const useDocenteData = () => { }
```

**Constantes**: UPPER_SNAKE_CASE
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

**CSS Classes**: BEM (Block Element Modifier)
```css
.docente-layout { }
.docente-layout__navbar { }
.docente-layout__nav-link--active { }
```

### Estructura de Componentes

```javascript
// 1. Imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Types/Interfaces (si usa TypeScript)

// 3. Component
export const ComponentName = ({ prop1, prop2 }) => {
  // 4. Hooks
  const [state, setState] = useState(null);
  const navigate = useNavigate();
  
  // 5. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 6. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### Commits

Seguir Conventional Commits:
```
feat: agregar componente PieChart
fix: corregir modo oscuro en ComisionReportes
docs: actualizar README con integración backend
style: mejorar espaciado en StatCard
refactor: optimizar useDocenteData hook
```

---

## 🤝 Contribución

### Para el Equipo Backend

1. **Revisar estructura de datos mock** en:
   - `src/features/evaluaciones-docente/hooks/useDocenteData.js`
   - `src/features/evaluacion-comision/hooks/useComisionData.js`

2. **Implementar endpoints** siguiendo la estructura JSON esperada

3. **Configurar CORS** para permitir requests desde `http://localhost:5173`

4. **Usar mismo formato** de respuestas:
```json
{
  "success": true,
  "data": { },
  "message": "string",
  "timestamp": "ISO8601"
}
```

### Para el Equipo Frontend

1. **Seguir arquitectura FSD** al agregar nuevos módulos
2. **Reutilizar componentes shared** antes de crear nuevos
3. **Mantener consistencia** en estilos y convenciones
4. **Documentar cambios** en README cuando afecten integración

---

## 📚 Referencias

- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Docs](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

---

**Última actualización**: 13 de diciembre de 2025  
**Versión**: v1.0.0  
**Equipo**: Zentry Corp - UNAS
