# MM Admin Frontend

Modern Angular-based admin dashboard for MagicMirror management.

## Features

- 🎨 **Modern UI** - Built with Angular Material Design
- 📱 **Responsive** - Works on all device sizes
- 🌍 **Multi-language** - German and English support
- ⚡ **Fast** - Standalone components with lazy loading
- 🔌 **Plugin System** - Manage various MagicMirror plugins
- 🎯 **TypeScript** - Fully typed for better development experience

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- Angular CLI (v18 or higher)

## Installation

1. Clone the repository and navigate to the frontend directory

2. Install dependencies:
```bash
npm install
```

3. Install Angular CLI globally (if not already installed):
```bash
npm install -g @angular/cli
```

## Development

Start the development server:
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you make changes to the source files.

## Build

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run linter
- `npm run extract-i18n` - Extract translation strings

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── layout/          # Header, Sidebar components
│   ├── features/
│   │   ├── dashboard/       # Dashboard page
│   │   └── plugins/         # Plugin pages
│   ├── app.component.ts     # Root component
│   ├── app.config.ts        # App configuration
│   └── app.routes.ts        # Routing configuration
├── assets/
│   └── i18n/                # Translation files (de.json, en.json)
├── styles.scss              # Global styles
└── main.ts                  # Application entry point
```

## Technologies

- **Angular 18** - Framework
- **Angular Material** - UI Component library
- **ngx-translate** - Internationalization
- **RxJS** - Reactive programming
- **TypeScript** - Programming language
- **SCSS** - Styling

## Plugins

The frontend provides management interfaces for:

- **Modules** - MagicMirror module management
- **MagicMirror Config** - Configuration editor
- **MagicMirror Update** - Update functionality
- **Docker Update** - Container updates
- **System Update** - System updates
- **WLAN** - Network management

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details

