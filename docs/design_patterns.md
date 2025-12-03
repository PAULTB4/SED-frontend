# Patrones de Diseño - SED (Sistema de Evaluación Docente)

## Información General

**Proyecto:** SED - Sistema de Evaluación Docente  
**Universidad:** Universidad Nacional Agraria de la Selva (UNAS)  
**Curso:** Diseño Detallado de Software  
**Equipo:** Team Inkietos  
**Fecha:** Abril 2025

---

## Introducción

Este documento describe los **patrones de diseño** implementados en el proyecto SED. Los patrones se aplican **dentro** de la arquitectura Feature-Sliced Design (FSD) para resolver problemas específicos de diseño detallado y mejorar la calidad del código.

### ¿Por qué usar patrones de diseño?

- ✅ **Reutilización** de soluciones probadas
- ✅ **Mantenibilidad** del código a largo plazo
- ✅ **Escalabilidad** para futuras funcionalidades
- ✅ **Comunicación** clara entre desarrolladores
- ✅ **Calidad** en el diseño del software

---

## Relación Arquitectura - Patrones
```
┌─────────────────────────────────────────────┐
│   Arquitectura FSD (Nivel Macro)            │
│   ┌─────────────────────────────────────┐   │
│   │  app/     (Singleton, Observer)     │   │
│   ├─────────────────────────────────────┤   │
│   │  pages/   (Composite)               │   │
│   ├─────────────────────────────────────┤   │
│   │  features/ (Strategy, State, Facade)│   │
│   ├─────────────────────────────────────┤   │
│   │  entities/ (Factory)                │   │
│   ├─────────────────────────────────────┤   │
│   │  shared/   (Adapter, Decorator)     │   │
│   └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## Patrones Implementados

### 1. Singleton Pattern
**📍 Ubicación:** `/src/shared/api/apiClient.js`

**Propósito:** Garantizar una única instancia del cliente HTTP en toda la aplicación.

**Por qué lo usamos:**
- Evitar múltiples instancias de Axios con configuraciones diferentes
- Centralizar interceptors de autenticación
- Gestionar tokens de forma unificada

**Ejemplo:**
```javascript
// shared/api/apiClient.js
class ApiClient {
  static instance = null;
  
  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
}

export default ApiClient.getInstance();
```

---

### 2. Factory Pattern
**📍 Ubicación:** `/src/entities/evaluacion/factory.js`

**Propósito:** Crear diferentes tipos de evaluaciones (parcial, final, recuperación).

**Por qué lo usamos:**
- El sistema maneja múltiples tipos de evaluaciones con comportamientos diferentes
- Centraliza la lógica de creación
- Facilita agregar nuevos tipos de evaluación

**Ejemplo:**
```javascript
// entities/evaluacion/factory.js
export class EvaluacionFactory {
  static crear(tipo, data) {
    switch(tipo) {
      case 'PARCIAL':
        return new EvaluacionParcial(data);
      case 'FINAL':
        return new EvaluacionFinal(data);
      case 'RECUPERACION':
        return new EvaluacionRecuperacion(data);
      default:
        throw new Error(`Tipo no válido: ${tipo}`);
    }
  }
}
```

---

### 3. Adapter Pattern
**📍 Ubicación:** `/src/features/*/api/*Adapter.js`

**Propósito:** Adaptar datos entre la API (snake_case) y el frontend (camelCase).

**Por qué lo usamos:**
- El backend usa convenciones de Python (snake_case)
- El frontend usa convenciones de JavaScript (camelCase)
- Mantiene consistencia en cada capa

**Ejemplo:**
```javascript
// features/evaluacion-docente/api/evaluacionAdapter.js
export class EvaluacionAdapter {
  static toEntity(apiResponse) {
    return {
      id: apiResponse.id,
      docenteId: apiResponse.docente_id,
      cursoNombre: apiResponse.curso_nombre,
      puntaje: apiResponse.calificacion,
      // ... más campos
    };
  }
  
  static toApi(entity) {
    return {
      docente_id: entity.docenteId,
      curso_nombre: entity.cursoNombre,
      calificacion: entity.puntaje,
      // ... más campos
    };
  }
}
```

---

### 4. Strategy Pattern
**📍 Ubicación:** `/src/features/evaluacion-docente/model/validacionStrategies.js`

**Propósito:** Validar evaluaciones según reglas específicas por rol.

**Por qué lo usamos:**
- Estudiantes, comisión y administradores tienen reglas de validación diferentes
- Permite cambiar el comportamiento sin modificar el código cliente
- Facilita testing de cada estrategia

**Ejemplo:**
```javascript
// Estrategia para estudiantes
class ValidacionEstudiante {
  validar(evaluacion) {
    const errores = [];
    
    if (evaluacion.puntaje < 0 || evaluacion.puntaje > 20) {
      errores.push('Puntaje debe estar entre 0 y 20');
    }
    
    if (evaluacion.comentario.length < 10) {
      errores.push('Comentario muy corto');
    }
    
    return { valido: errores.length === 0, errores };
  }
}

// Estrategia para comisión (más estricta)
class ValidacionComision {
  validar(evaluacion) {
    const errores = [];
    
    if (evaluacion.comentario.length < 50) {
      errores.push('Comentario debe tener mínimo 50 caracteres');
    }
    
    if (evaluacion.puntaje < 11 && !evaluacion.justificacion) {
      errores.push('Calificaciones bajas requieren justificación');
    }
    
    return { valido: errores.length === 0, errores };
  }
}
```

---

### 5. State Pattern
**📍 Ubicación:** `/src/features/evaluacion-docente/model/evaluacionStates.js`

**Propósito:** Manejar diferentes estados de una evaluación (borrador, enviada, aprobada, rechazada).

**Por qué lo usamos:**
- Una evaluación cambia de comportamiento según su estado
- Evita condicionales complejos en el código
- Facilita agregar nuevos estados

**Ejemplo:**
```javascript
// Estado: Borrador
class BorradorState {
  puedeEditar() { return true; }
  puedeEnviar() { return true; }
  puedeAprobar() { return false; }
}

// Estado: Enviada
class EnviadaState {
  puedeEditar() { return false; }
  puedeEnviar() { return false; }
  puedeAprobar() { return true; }
}

// Contexto
class EvaluacionConEstado {
  constructor() {
    this.state = new BorradorState();
  }
  
  enviar() {
    if (this.state.puedeEnviar()) {
      this.state = new EnviadaState();
    }
  }
}
```

---

### 6. Observer Pattern (Redux)
**📍 Ubicación:** `/src/app/store/`

**Propósito:** Notificar a múltiples componentes cuando cambia el estado.

**Por qué lo usamos:**
- Múltiples componentes necesitan reaccionar al cambio de autenticación
- Header, sidebar y páginas necesitan actualizarse cuando cambia el usuario
- Redux implementa este patrón nativamente

**Ejemplo:**
```javascript
// Redux Slice (Subject)
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Todos los observers son notificados automáticamente
    }
  }
});

// Componentes (Observers)
const Header = () => {
  const user = useSelector(state => state.auth.user);
  return <div>Hola, {user?.nombre}</div>;
};

const Sidebar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? <Nav /> : null;
};
```

---

### 7. Decorator Pattern (HOC)
**📍 Ubicación:** `/src/shared/ui/hoc/`

**Propósito:** Agregar funcionalidad a componentes sin modificar su código.

**Por qué lo usamos:**
- Necesitamos proteger rutas por autenticación
- Necesitamos proteger rutas por rol
- Evita duplicación de código de seguridad

**Ejemplo:**
```javascript
// HOC para autenticación
export const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <Component {...props} />;
  };
};

// HOC para rol
export const withRole = (Component, allowedRoles) => {
  return (props) => {
    const { user } = useAuth();
    
    if (!allowedRoles.includes(user?.rol)) {
      return <Navigate to="/unauthorized" />;
    }
    
    return <Component {...props} />;
  };
};

// Uso combinado
export const AdminDashboardPage = withAuth(
  withRole(AdminDashboard, [ROLES.ADMIN])
);
```

---

### 8. Builder Pattern
**📍 Ubicación:** `/src/features/reportes/model/ReporteBuilder.js`

**Propósito:** Construir reportes complejos paso a paso.

**Por qué lo usamos:**
- Los reportes tienen muchas opciones (filtros, formato, gráficos)
- Evita constructores con muchos parámetros
- Permite crear reportes de forma fluida

**Ejemplo:**
```javascript
// Builder
class ReporteBuilder {
  constructor() {
    this.reporte = {};
  }
  
  setTitulo(titulo) {
    this.reporte.titulo = titulo;
    return this;
  }
  
  setFiltros(filtros) {
    this.reporte.filtros = filtros;
    return this;
  }
  
  conGraficos() {
    this.reporte.incluirGraficos = true;
    return this;
  }
  
  build() {
    return this.reporte;
  }
}

// Uso
const reporte = new ReporteBuilder()
  .setTitulo('Reporte Mensual')
  .setFiltros({ mes: 'abril', anio: 2025 })
  .conGraficos()
  .build();
```

---

## Mapa de Patrones en SED

| Patrón | Ubicación | Propósito en SED |
|--------|-----------|------------------|
| **Singleton** | `/shared/api/apiClient.js` | Cliente HTTP único |
| **Factory** | `/entities/evaluacion/factory.js` | Crear tipos de evaluaciones |
| **Adapter** | `/features/*/api/*Adapter.js` | Adaptar API ↔ Frontend |
| **Strategy** | `/features/*/model/*Strategies.js` | Validaciones por rol |
| **State** | `/features/*/model/*States.js` | Estados de evaluación |
| **Observer** | Redux Store | Notificaciones globales |
| **Decorator (HOC)** | `/shared/ui/hoc/` | Protección de rutas |
| **Builder** | `/features/reportes/model/` | Construcción de reportes |

---

## Beneficios Obtenidos

✅ **Flexibilidad:** Fácil agregar nuevos tipos, roles o estados  
✅ **Mantenibilidad:** Código organizado y comprensible  
✅ **Escalabilidad:** Preparado para crecer  
✅ **Testabilidad:** Componentes desacoplados  
✅ **Reutilización:** Menos código duplicado  

---

## Conclusión

Los patrones de diseño implementados en SED no son solo "buenas prácticas teóricas", sino soluciones concretas a problemas reales del proyecto:

- **Factory** resuelve la creación de múltiples tipos de evaluaciones
- **Strategy** maneja las diferentes reglas de validación por rol
- **State** simplifica el manejo de estados complejos
- **Adapter** mantiene consistencia entre backend y frontend
- **Singleton** asegura una gestión centralizada de la API

---

**Versión:** 1.0  
**Equipo:** Team Inkietos  
**Universidad:** UNAS - Tingo María  
**Fecha:** Abril 2025