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
profundidad a los fondos. El logotipo es el wordmark *MARGARITAS* en Playfair Display
itálica con `letter-spacing` amplio (clase `.wordmark`).

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
