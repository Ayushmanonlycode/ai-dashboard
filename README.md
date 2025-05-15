# AI Avatar Dashboard

A clean, responsive dashboard UI built with Next.js and Tailwind CSS for managing AI-generated avatars.

![AI Avatar Dashboard](https://i.imgur.com/YOUR_SCREENSHOT_HERE.jpg)

## Features

- 🎨 Modern, clean UI with responsive design
- 🌓 Dark/light mode (based on system preferences)
- 👤 Display of avatar cards with user information
- ✨ Interactive elements with hover and transition effects
- 📱 Mobile-friendly layout with a floating action button
- 🔄 Real data fetching from the Reqres API

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Reqres API](https://reqres.in/) - REST API with dummy data

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-avatar-dashboard.git
   ```

2. Navigate to the project directory:
   ```
   cd ai-avatar-dashboard
   ```

3. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
ai-avatar-dashboard/
├── public/
├── src/
│   ├── app/
│   │   ├── page.tsx      # Main dashboard page
│   │   ├── layout.tsx    # Root layout
│   │   ├── providers.tsx # Client-side providers
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   ├── Avatar.tsx    # Avatar card component
│   │   ├── CreateAvatarModal.tsx  # Modal for creating new avatars
│   │   └── ui/           # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Modal.tsx
│   └── lib/
│       └── api.ts        # API service for fetching data
├── package.json
└── README.md
```

## Features

- **Avatar Cards**: Displays user information and avatar images fetched from the API
- **Create New Avatar**: Modal interface for adding new avatars (UI only)
- **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
- **Theme Support**: Supports both light and dark modes based on system preferences

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Reqres API](https://reqres.in/) for providing the dummy user data
- [Heroicons](https://heroicons.com/) for the SVG icons
