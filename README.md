# Margaritas

> Un instante para volver a ti.

Landing de la marca colombiana de pijamas **Margaritas**, construida con React, Vite,
Tailwind CSS y Framer Motion.

## Requisitos

- Node.js 20 o superior

## Comandos

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run preview` sirve localmente el contenido de `dist/`.

## Páginas

- `/` — landing (`index.html` → `src/main.jsx` → `src/App.jsx`).
- `/tienda/` — tienda con el catálogo completo, filtros, preguntas frecuentes y pedido
  por WhatsApp (`tienda/index.html` → `src/shop.jsx` → `src/ShopApp.jsx`).
  `tienda/?p=<id>` abre directamente un producto y `tienda/#accesorios` filtra los
  accesorios.

## Estructura

```
src/
├── assets/            Fotografías de las referencias
├── components/        Secciones y piezas de UI
├── data/products.js   Catálogo, precios base y datos de contacto
├── hooks/             Utilidades de React
├── lib/
│   ├── motion.js      Variantes compartidas de Framer Motion
│   ├── pricing.js     Cálculo de precio por tipo y talla
│   └── whatsapp.js    Armado del mensaje de pedido
└── index.css          Tokens de diseño (paleta, tipografías, animaciones)
```

`legacy/index.html` conserva la versión estática original como referencia. Sus imágenes
apuntaban a URLs `raw.githubusercontent` de la raíz del repositorio, que ya no existen: las
fotos viven ahora en `pijamas/`.

## Identidad

La paleta y las tipografías originales se mantienen sin cambios. Están definidas como
tokens en `src/index.css`:

| Token          | Valor     | Uso                              |
| -------------- | --------- | -------------------------------- |
| `--color-nude` | `#E0CBB9` | Acentos, texto sobre vino        |
| `--color-wine` | `#461B14` | Color principal, texto, botones  |
| `--color-rose` | `#7D5255` | Estado hover, detalles           |
| `--color-cream`| `#FCFAFA` | Fondo                            |

Los tonos `blush`, `sand` y `mist` son interpolaciones de los anteriores para dar
profundidad a los fondos.
`petal` (`#F1D9D6`) y `pearl` (`#FBF6F1`) añaden el acento *coquette* (moños, perlas,
encaje) y `Pinyon Script` se usa sólo para detalles caligráficos.

## Logotipo

El isotipo es una margarita de doce pétalos (alternando largos y cortos) con un anillo
de polen en el centro, junto al wordmark *MARGARITAS*. En la web se usa el componente
`src/components/Logo.jsx` (`<Logo />` y `<LogoMark />`, que puede florecer y girar).

Los archivos para imprimir, redes o empaques están en `public/brand/`, con el texto ya
convertido a trazos para que se vea igual sin tener la tipografía instalada:

| Archivo                            | Uso                              |
| ---------------------------------- | -------------------------------- |
| `margaritas-horizontal.svg`        | Cabeceras, documentos            |
| `margaritas-horizontal-claro.svg`  | Sobre fondo vino                 |
| `margaritas-apilado.svg`           | Etiquetas, tarjetas              |
| `margaritas-sello.svg`             | Foto de perfil, stickers         |
| `margaritas-isotipo(-claro).svg`   | Sólo la flor                     |
| `favicon.svg`                      | Icono de la pestaña              |

Con el sitio en marcha, `/brand/` muestra todas las versiones y la paleta.

## Carrito y pedido por WhatsApp

El carrito (`src/cart/`) funciona en la landing y en la tienda y se guarda en el navegador,
así que se conserva al cambiar de página o recargar. Las fichas tienen «Agregar al carrito» y
«Comprar ahora» (agrega y abre el carrito). En el carrito se cambian cantidades, se quitan
productos y se pueden dejar nombre, ciudad y una nota.

No hay pasarela de pagos: «Enviar pedido por WhatsApp» redacta un mensaje con cada producto
(diseño, tipo, talla o color), cantidad, precio unitario, subtotal y total, y lo abre en el
WhatsApp configurado en `WHATSAPP_NUMBER`. El carrito guarda sólo las referencias y siempre
recalcula los precios desde `src/data/products.js`, así que un cambio de precio se refleja
de inmediato también en los mensajes.

## Accesorios y despacho

Los accesorios (`accessories` en `src/data/products.js`) no tienen tipo ni talla: se piden
por cantidad. `price` es por unidad. Si `colorChoice` es `true`, el pedido incluye el color
que escriba la clienta.

La foto del gorro se añade guardándola como `pijamas/Gorro (1).jpg` y ejecutando
`npm run optimize:images`; mientras falte, la tienda muestra un marcador.

El aviso de tiempos de despacho está en `SHIPPING_NOTICE` (mismo archivo) y aparece en la
cinta superior, junto a los botones de pedido y en las preguntas frecuentes.

## Landing

Landing de marca; la compra vive en `/tienda`, a la que llevan el botón «Ir a la tienda», el
menú y la guía de telas. Todas las secciones usan el mismo encabezado (`src/components/home/SectionHeader.jsx`)
y fondos alternados:

1. **Inicio**: el titular y la margarita del logo animada
   (`src/components/home/HeroBloom.jsx`). En celular va pequeña junto al titular.
   Debajo, las cintas de la marca y el botón «Ir a la tienda».
2. **Nuestra esencia** (`#historia`): «Cuando el día termina…», el manifiesto y la cita.
3. **Por qué Margaritas** (`#por-que`): beneficios, la guía «¿Qué tela es para ti?» y el
   aviso de color a elección.
4. **Cómo pedir** (`#como-pedir`): los cuatro pasos y «Lista para consentirte».
5. **Preguntas frecuentes** y pie de página (`#contacto`).

### Color a elección

Las pijamas se pueden pedir en cualquier color por WhatsApp (`COLOR_NOTICE` en
`src/data/products.js`). El aviso (`src/components/ColorRequest.jsx`) aparece en la cinta
superior, en la ficha de cada pijama, en la cabecera de la tienda, en la landing y en las
preguntas frecuentes, y abre WhatsApp con un mensaje listo.

## Catálogo

Para añadir o editar referencias basta con modificar `src/data/products.js`. Cada entrada
define sus precios base por tipo (`short` / `pantalon`); el recargo de las tallas XL y XXL
se aplica automáticamente desde `OVERSIZE_SURCHARGE`.

`images` es una lista de diseños de tela, cada uno con su foto y su nombre:

```js
images: [
  { src: samanthaSatinAzul, label: 'Azul marino' },
  { src: samanthaSatinAnimal, label: 'Animal print' },
]
```

La primera foto es la que se ve en la tarjeta y en el hero. Si hay más de una, la tarjeta
muestra un distintivo con el número de diseños y la vista rápida permite alternarlos; el
diseño elegido viaja en el mensaje de WhatsApp.

Las fotos originales sin procesar están en `pijamas/`.

## Despliegue

El sitio requiere compilación, así que **no puede servirse directamente desde la raíz del
repositorio**: hay que publicar el contenido de `dist/`, que no se versiona.

### Vercel

`vercel.json` ya fija la configuración, así que basta con importar el repositorio en
*Add New → Project*. Vercel compila y publica en cada push a `main`.

| Ajuste            | Valor           |
| ----------------- | --------------- |
| Framework Preset  | Vite            |
| Build Command     | `npm run build` |
| Output Directory  | `dist`          |

Para revisar el resultado compilado antes de subirlo:

```bash
npm run build
```

```bash
npm run preview
```

`base` está en `'./'` (ver `vite.config.js`), así que las rutas de los assets funcionan tanto
en la raíz de un dominio como en un subdirectorio, por si alguna vez se publica en
GitHub Pages.
