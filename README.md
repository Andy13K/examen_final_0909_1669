# 📸 Galería de Fotos - React Native + Expo

Una aplicación de galería de fotos moderna y elegante construida con React Native y Expo, que consume la API de Picsum Photos.

## 🚀 Características

- ✨ Interfaz moderna con tema oscuro
- 📱 Diseño responsive con grid de 2 columnas
- 🔄 Pull-to-refresh para actualizar fotos
- 🖼️ Modal con detalles completos de cada foto
- 📊 Muestra información como autor, dimensiones e ID
- 🔗 Enlaces directos a las fotos originales en Unsplash
- ⚡ Carga optimizada de imágenes

## 📋 Requisitos Previos

- Node.js instalado
- Expo Go app instalada en tu dispositivo móvil
- Conexión a internet

## 🛠️ Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm start
```

3. Escanea el código QR con la app Expo Go en tu celular

## 🎨 Tecnologías Utilizadas

- React Native
- Expo SDK 52
- Picsum Photos API
- React Hooks (useState, useEffect)

## 📱 Uso

1. Al abrir la app, verás una galería con 30 fotos
2. Toca cualquier foto para ver sus detalles completos
3. Desliza hacia abajo para refrescar y obtener nuevas fotos
4. En el modal de detalles, puedes ver:
   - Imagen en tamaño grande
   - Nombre del autor
   - ID de la foto
   - Dimensiones originales
   - Link para ver en Unsplash

## 🌐 API

La aplicación consume la API de Picsum Photos:
```
https://picsum.photos/v2/list
```

Esta API no requiere autenticación y proporciona fotos de alta calidad de forma gratuita.

## 📂 Estructura del Proyecto

```
photo-gallery/
├── components/
│   ├── PhotoCard.js      # Componente de tarjeta de foto
│   └── PhotoModal.js     # Modal con detalles de la foto
├── App.js                # Componente principal
├── package.json          # Dependencias del proyecto
└── README.md            # Este archivo
```

## 👨‍💻 Autor

Proyecto desarrollado como examen final de desarrollo de aplicaciones multiplataforma.
