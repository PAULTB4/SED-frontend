# SED - Sistema de Evaluación Docente

<div align="center">

![UNAS Logo](public/assets/logo.jpg)

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

📖 Ver documentación completa en [`/docs/design_patterns.md`](docs/design_patterns.md)

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
git clone https://github.com/team-inkietos/sed-frontend.git
cd sed-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
REACT_APP_API_URL=https://api-sed.unas.edu.pe/v1
REACT_APP_API_TIMEOUT=10000
REACT_APP_TOKEN_KEY=sed_token
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

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

### Módulo de Estudiantes
- [x] Calificar docentes con estrellas (1-5)
- [x] Dejar comentarios anónimos
- [x] Ver historial de evaluaciones propias
- [x] Consultar evaluaciones de otros
- [x] Filtrar por facultad, escuela, curso
- [x] Guardar evaluación como borrador

### Módulo de Docentes
- [x] Ver estadísticas agregadas
- [x] Gráficos de desempeño por criterio
- [x] Comparar resultados entre semestres
- [x] Exportar reportes en PDF/Excel

### Módulo de Comisión
- [x] Revisar evaluaciones pendientes
- [x] Aprobar/rechazar evaluaciones
- [x] Generar reportes institucionales
- [x] Definir periodos de evaluación

### Módulo de Administración
- [x] Gestión de usuarios (CRUD)
- [x] Configurar criterios de evaluación
- [x] Administrar cursos y docentes
- [x] Dashboard con estadísticas globales

---

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

**Team Inkietos**

- **Brennis Benjaminn Castro Cano** - Scrum Master / Developer
- **Paul Tarazona Benancio** - Product Owner / Developer
- **Dairon Said Hidalgo Robles** - Developer
- **Anayely Xiomy Masgo Villanueva** - Developer

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

- **Ing. Cristian García Villegas** - Docente del curso
- **Facultad de Ingeniería de Sistemas e Informática - UNAS**
- **Comunidad de estudiantes y docentes de la UNAS**

---

<div align="center">

**Hecho con ❤️ por Team Inkietos**

*Universidad Nacional Agraria de la Selva - 2025*

</div>