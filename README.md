# antifraud_and_limits

Proyecto TypeScript para la lógica de detección de fraude y límites de gasto.

## Requisitos

- Node.js 24
- npm

## Inicializar el entorno con Node 24

Si usas `nvm`, ejecuta estos comandos en la raíz del proyecto:

```bash
nvm install 24
nvm use 24
npm install
```

Si ya tienes `nvm` instalado y Node 24 configurado globalmente, puedes simplemente ejecutar:

```bash
node -v
npm install
```

> Verifica que la versión de Node sea 24.x antes de continuar.

## Ejecutar los tests

Para correr la suite de pruebas:

```bash
npm test
```

También puedes ejecutar Vitest directamente:

```bash
npx vitest run
```

Modo observador durante desarrollo:

```bash
npx vitest
```

## Estructura principal

```txt
antifraud_and_limits/
├── fraudDetectorSystem.ts
├── fraudDetectorSystemInterface.ts
├── specs/
│   └── fraudDetectorSystem.test.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Notas

- El proyecto usa TypeScript + Vitest.
- La prueba principal se ejecuta con `npm test`.
- Si aparece un error de dependencias, vuelve a ejecutar `npm install` dentro del proyecto.
