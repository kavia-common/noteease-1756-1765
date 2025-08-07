# NoteEase – Nuxt Notes Frontend

This is a modern, minimalistic notes management web app built using Nuxt.js 3.

## Features

- Add, edit, delete, and view notes seamlessly
- Search and filter notes live in the sidebar
- Responsive two-panel layout:
  - **Left:** Sidebar with searchable notes list and add/delete actions
  - **Right:** Note details and editing
- Persistent storage (localStorage for demo)
- Elegant light theme using:
  - **Accent:** `#FBBF24`
  - **Primary:** `#1E90FF`
  - **Secondary:** `#374151`
- Keyboard and mouse friendly

## Usage

### Install dependencies

```bash
# npm
npm install
```

### Start for development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project structure

- **`/components`**: UI components (Sidebar, Note details, Logo)
- **`/stores`**: State management for notes
- **`/pages`**: Nuxt routes
- **`/app.vue`**: Layout definition

## Customization

You can change the theme colors in the CSS in `app.vue`, `NotesSidebar.vue`, and `NoteDetail.vue`.

## License

MIT
