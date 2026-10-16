# 🛒 Add to Cart Microinteraction Pro

Una microinteracción premium de **Agregar al Carrito** con animaciones físicas realistas, efectos de sonido sintetizados y diseño moderno Dark UI. Perfecta para proyectos de e-commerce de alta gama.

## ✨ Características

- **Animaciones con física realista:** implementa principios de animación con anticipación, impacto y rebote.
- **Efectos de audio sintetizados:** utiliza Web Audio API para crear sonidos dinámicos sin archivos externos.
- **Diseño dark premium:** UI moderna con glassmorphism y efectos de resplandor.
- **100% Vanilla JavaScript:** sin dependencias de frameworks o librerías externas.
- **Completamente responsivo:** optimizado para formato vertical 9:16, ideal para Shorts y Reels.
- **Producto animado 3D estilizado:** caja de regalo con listones y efectos visuales.
- **Contador persistente:** badge que muestra la cantidad de productos agregados durante la interacción.
- **Múltiples fases de animación:** 7 fases coreografiadas para una experiencia fluida.

## 🚀 Clonar el repositorio

Clona este repositorio para explorar el código, ejecutar la animación y personalizar la microinteracción para tus propios proyectos.

```bash
git clone https://github.com/horacio-yon/add-to-cart-microinteraction-v1.git
cd add-to-cart-microinteraction-v1
```

### Ejecutar el proyecto

Si `index.html` está en la raíz del proyecto, puedes abrirlo directamente en tu navegador.

También puedes iniciar un servidor local con Python:

```bash
python -m http.server 8000
```

Después, visita [http://localhost:8000](http://localhost:8000) en tu navegador.

Si los archivos están dentro de la carpeta `src/`, entra primero en ella:

```bash
cd src
python -m http.server 8000
```

## 🎯 Demo de animación

La interacción incluye las siguientes fases:

1. **Anticipación:** el botón se comprime y el producto se prepara para volar.
2. **Vuelo parabólico:** el producto viaja en un arco hacia el carrito con rotación.
3. **Preparación del impacto:** el carrito anticipa la llegada del producto.
4. **Impacto físico:** compresión, overshoot y estabilización realista.
5. **Contador y confirmación:** aparece el `+1` flotante y se actualiza el badge.
6. **Círculo con aura:** transformación a círculo con checkmark y aura rotante de 360°.
7. **Estado de éxito:** confirmación `Added to Cart` antes del reinicio automático.

## 📁 Estructura del proyecto

```text
src/
├── index.html      # Estructura HTML
├── styles.css      # Estilos y animaciones CSS
├── script.js       # Lógica de animación y síntesis de audio
└── README.md       # Documentación del proyecto
```

## 🎨 Personalización

### Colores

Los colores se definen mediante variables CSS en `styles.css`:

```css
:root {
  --bg-dark: #07050e;
  --btn-purple: #8b5cf6;
  --btn-purple-dark: #6d28d9;
  --accent-cyan: #38bdf8;
  --accent-green: #10b981;
  --text-white: #ffffff;
  --text-muted: #94a3b8;
}
```

### Duración de las animaciones

Puedes ajustar los tiempos de animación en `script.js`:

```javascript
const flightDuration = 420; // Duración del vuelo en ms

await wait(120);  // Duración de la anticipación
await wait(1100); // Duración del estado de éxito
```

Estos valores son ejemplos basados en la implementación descrita y deben coincidir con los nombres y las funciones existentes en tu código.

### Efectos de sonido

Los efectos de audio se generan dinámicamente en `script.js`. Puedes personalizar funciones como:

- `playClickSound()`: clic inicial del botón.
- `playWhooshSound()`: sonido del vuelo del producto.
- `playImpactSound()`: sonido del impacto en el carrito.
- `playConfirmationChime()`: arpegio de confirmación en E mayor.
- `playStackSound()`: campanita al apilar paquetes.

Los nombres corresponden a las funciones descritas para el proyecto; comprueba que coincidan con tu implementación.

## 🎵 Audio sintetizado

El proyecto utiliza **Web Audio API** para generar sonidos en tiempo real:

- **Sin archivos de audio externos:** los sonidos se generan mediante osciladores.
- **Ligero:** no necesita descargar archivos de sonido adicionales.
- **Personalizable:** permite ajustar frecuencias, envolventes y duración de los efectos.

## 🔧 Tecnologías

- **HTML5:** estructura de la interfaz.
- **CSS3:** variables CSS, animaciones y transformaciones 3D.
- **JavaScript ES6+:** lógica de interacción, funciones asíncronas y animaciones.
- **Web Audio API:** síntesis de audio en tiempo real.
- **SVG:** gráficos vectoriales escalables para iconos.

## 🎓 Conceptos de animación

Este proyecto implementa principios de animación utilizados en interfaces modernas:

- **Anticipación:** movimiento preparatorio antes de la acción principal.
- **Squash and Stretch:** compresión y estiramiento para transmitir peso y movimiento.
- **Overshoot:** exceso de movimiento seguido de una corrección.
- **Easing:** curvas de aceleración naturales mediante funciones como `cubic-bezier`.
- **Staging:** dirección de la atención del usuario a través del movimiento.

## 🌟 Características avanzadas

- Paquetes de colores que se apilan en el carrito, con un máximo de 5 visibles.
- Partículas de impacto con física personalizada.
- Ruedas del carrito que giran durante eventos clave.
- Bloqueo temporal del botón durante la animación para evitar interacciones repetidas.
- Reinicio automático suave para permitir nuevas interacciones.
- Transformación morfológica del botón: rectángulo → círculo → rectángulo.

## 👨‍💻 Autor

**Codea con Horacio**

Microinteracción UI • Vanilla JavaScript

Contenido educativo sobre animaciones web, interfaces modernas y detalles técnicos de frontend.

GitHub: [horacio-yon](https://github.com/horacio-yon)

## 📝 Licencia

Proyecto educativo y demostrativo. Puedes explorar, utilizar y modificar el código según tus necesidades. Si vas a redistribuirlo, considera incluir la atribución correspondiente al autor.

## ❤️ Apoya el proyecto

Si este proyecto te resulta útil, puedes:

- ⭐ Darle una estrella al repositorio en GitHub.
- 💬 Compartir tus comentarios o sugerencias.
- 📺 Seguir **Codea con Horacio** para descubrir más proyectos y tutoriales de programación.

**¡Disfruta creando experiencias de usuario excepcionales!** ✨🛒