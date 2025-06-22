# SvelteKit Development Context

## Official Documentation

- **SvelteKit Docs**: https://kit.svelte.dev/docs
- **LLM-Friendly Docs**: https://svelte.dev/llms-full.txt
- **Svelte Tutorial**: https://learn.svelte.dev/

## Key SvelteKit Concepts

### Project Structure

```
src/
├── lib/
│   └── index.js          # Library code
├── routes/
│   ├── +layout.svelte    # Layout component
│   ├── +page.svelte      # Page component
│   ├── +page.server.js   # Server-side code
│   └── api/
│       └── +server.js    # API endpoints
├── app.d.ts              # Type definitions
└── app.html              # HTML template
```

### Routing

- File-based routing in `src/routes/`
- `+page.svelte` = page component
- `+layout.svelte` = layout component
- `+page.server.js` = server-side logic
- `+server.js` = API endpoints

### Data Loading

```js
// +page.server.js
export async function load() {
  return {
    data: await fetchData(),
  };
}
```

### Forms & Actions

```js
// +page.server.js
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    // Handle form submission
  },
};
```

### Stores

```js
// src/lib/stores.js
import { writable } from "svelte/store";
export const count = writable(0);
```

## Best Practices

- Use TypeScript for better development experience
- Leverage SvelteKit's built-in features (forms, stores, etc.)
- Follow the file naming conventions (+page, +layout, etc.)
- Use `$lib` for internal imports
- Implement proper error handling with `+error.svelte`

## Common Patterns for Games

- Use stores for game state management
- Leverage SvelteKit's reactivity for UI updates
- Use `+page.server.js` for game logic/API calls
- WebSocket connections in `+layout.svelte` or stores
- Real-time updates with Svelte's reactive statements
