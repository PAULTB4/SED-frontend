# 🚀 Guía para Subir Cambios a la Rama v1

## 📋 Checklist Antes de Subir

- [x] README.md actualizado con URLs de acceso
- [x] README.md con sección de Integración Backend
- [x] Documentación de Diseño Detallado creada
- [x] Todos los mocks funcionando correctamente
- [x] Modo oscuro implementado y funcionando
- [x] Componentes reutilizables documentados

---

## 🌿 Comandos Git para Crear y Subir la Rama v1

### 1. Verificar estado actual
```bash
git status
```

### 2. Agregar todos los cambios
```bash
git add .
```

### 3. Hacer commit con mensaje descriptivo
```bash
git commit -m "feat: implementar módulos docente y comisión completos (v1)

- ✅ Módulo Docente: Dashboard, Perfil, Evaluaciones, Recomendaciones
- ✅ Módulo Comisión: Dashboard, Perfil, Períodos, Reportes
- ✅ Componentes reutilizables: StatCard, Avatar, CourseCard, Charts
- ✅ Nuevo componente PieChart para gráficos circulares
- ✅ Modo oscuro persistente en todos los módulos
- ✅ Layouts con navegación completa y responsive
- ✅ Hooks con datos mock para desarrollo independiente
- ✅ Documentación completa de integración con backend
- ✅ Diseño detallado de software documentado

Archivos importantes:
- src/pages/docente/* - Todas las páginas del módulo docente
- src/pages/comision/* - Todas las páginas del módulo comisión
- src/features/evaluaciones-docente/hooks/useDocenteData.js
- src/features/evaluacion-comision/hooks/useComisionData.js
- docs/DISEÑO_DETALLADO.md

Pendiente para backend:
- Implementar endpoints según estructura mock
- Migrar hooks de mock a API calls reales
- Ver README sección 'Integración con Backend'"
```

### 4. Crear la rama v1 (desde tu rama actual)
```bash
git checkout -b v1
```

### 5. Subir la rama al repositorio remoto
```bash
git push -u origin v1
```

---

## 🔄 Si Ya Estás en la Rama v1

Si ya trabajaste en una rama llamada v1 localmente:

```bash
# Asegurarte de estar en v1
git checkout v1

# Agregar cambios
git add .

# Commit
git commit -m "feat: implementar módulos docente y comisión completos (v1)"

# Subir
git push origin v1
```

---

## 🧪 Para Probar (Simulando ser tu Compañero)

### En otra ubicación/computadora:

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/sed-frontend.git
cd sed-frontend

# 2. Ver ramas disponibles
git branch -a

# 3. Cambiar a la rama v1
git checkout v1

# 4. Instalar dependencias
npm install

# 5. Crear archivo .env.local (si no existe)
cp .env.example .env.local

# 6. Editar .env.local con los valores correctos
# VITE_API_URL=http://localhost:8080/api
# VITE_API_TIMEOUT=10000

# 7. Iniciar servidor de desarrollo
npm run dev

# 8. Acceder a las vistas:
# http://localhost:5173/docente/dashboard
# http://localhost:5173/comision/dashboard
```

---

## ✅ Verificación de Éxito

Después de clonar y ejecutar, tu compañero debería poder:

1. ✅ Ver la rama v1 en el repositorio
2. ✅ Clonar y hacer checkout a v1 sin problemas
3. ✅ Ejecutar `npm install` sin errores
4. ✅ Ejecutar `npm run dev` y ver la app en el navegador
5. ✅ Navegar a `/docente/dashboard` y ver el dashboard con datos
6. ✅ Navegar a `/comision/dashboard` y ver el dashboard con datos
7. ✅ Cambiar entre modo claro y oscuro sin problemas
8. ✅ Ver todos los componentes funcionando correctamente
9. ✅ Leer el README y entender cómo integrar con backend
10. ✅ Revisar la documentación de diseño detallado

---

## 🐛 Solución de Problemas

### Error: "Permission denied"
```bash
# Configurar credenciales Git
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# O usar token de acceso personal
```

### Error: "Branch already exists"
```bash
# Si la rama ya existe localmente, solo súbela
git checkout v1
git push origin v1
```

### Error: "npm install failed"
```bash
# Limpiar caché e intentar de nuevo
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 5173 already in use"
```bash
# Matar proceso en el puerto
npx kill-port 5173

# O usar otro puerto
npm run dev -- --port 3000
```

---

## 📝 Notas Importantes para tu Compañero

1. **Datos Mock**: Todos los datos son temporales. Ver archivos:
   - `src/features/evaluaciones-docente/hooks/useDocenteData.js`
   - `src/features/evaluacion-comision/hooks/useComisionData.js`

2. **Integración Backend**: Leer sección "Integración con Backend" en README.md

3. **Estructura de Respuestas**: El backend debe seguir el formato esperado en los mocks

4. **Endpoints Esperados**: Documentados en README.md

5. **Variables de Entorno**: 
   - `VITE_API_URL` debe apuntar al backend cuando esté listo
   - Por ahora los mocks no necesitan backend funcionando

6. **Modo Oscuro**: Se persiste en localStorage automáticamente

7. **Rutas Disponibles**:
   - Docente: `/docente/dashboard`, `/docente/perfil`, `/docente/evaluaciones`, `/docente/recomendaciones`
   - Comisión: `/comision/dashboard`, `/comision/perfil`, `/comision/periodos`, `/comision/reportes`

8. **Componentes Reutilizables**: Están en `src/shared/ui/components/` y pueden usarse en cualquier módulo

---

## 📞 Contacto

Si hay problemas después de clonar, contactar al equipo frontend.

**Última actualización**: 13 de diciembre de 2025  
**Versión**: v1.0.0
