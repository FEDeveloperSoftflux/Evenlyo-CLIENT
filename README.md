# Evenlyo Client - Multi-Vendor Event Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.0-brightgreen.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-blue.svg)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple.svg)](https://redux-toolkit.js.org/)

## 🎉 Overview

Evenlyo Client is a modern, mobile-first responsive web application for a multi-vendor event management platform. Built with React and TailwindCSS, it provides a seamless experience for customers to discover, book, and manage event services from multiple vendors.

## ✨ Features

### 🎯 Core Features
- **Multi-Vendor Marketplace**: Browse services from multiple event vendors
- **Advanced Booking System**: Calendar-based booking with real-time availability
- **User Authentication**: Secure login/registration for clients and vendors
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Internationalization**: Multi-language support (English/Dutch)
- **Real-time Chat**: Communication between clients and vendors
- **Payment Integration**: Multiple payment gateways support
- **Review & Rating System**: Client feedback and vendor ratings

### 📱 Platform Modules
- **Events Management**: Plan and organize events
- **Services Booking**: Book various event services
- **Rental System**: Equipment and venue rentals
- **Classified Ads**: Event-related marketplace
- **Blog System**: Event planning articles and tips
- **Customer Support**: Help desk and complaint management

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite 5.4.0** - Build tool and dev server
- **TailwindCSS 3.4.0** - Utility-first CSS framework
- **Redux Toolkit 2.8.2** - State management
- **React Router DOM 6.20.1** - Client-side routing

### Additional Libraries
- **Axios** - HTTP client
- **i18next** - Internationalization
- **Lucide React** - Icon library
- **Swiper** - Touch slider
- **React Phone Input 2** - Phone number input

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
evenlyo-client/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and media files
│   │   ├── icons/         # SVG icons
│   │   └── images/        # Images and graphics
│   ├── auth/              # Authentication components
│   │   ├── ClientLogin.jsx
│   │   ├── VendorRegister.jsx
│   │   └── VerificationModal.jsx
│   ├── components/        # Reusable UI components
│   │   ├── booking/       # Booking-related components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── LandingPage.jsx
│   │   ├── BookingPage.jsx
│   │   └── ...
│   ├── store/             # Redux store configuration
│   │   ├── slices/        # Redux slices
│   │   └── index.js
│   ├── styles/            # CSS files
│   │   ├── design-system.css
│   │   └── global.css
│   ├── utils/             # Utility functions
│   ├── services/          # API services
│   ├── locales/           # Translation files
│   └── main.jsx           # Application entry point
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
└── DESIGN_SYSTEM.md       # Design system documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd evenlyo-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Design System

Evenlyo Client uses a comprehensive mobile-first responsive design system. Key features:

### Color Palette
- **Primary**: `#E31B95` (Brand pink)
- **Secondary**: `#FF295D` (Accent pink)
- **Gradient**: `linear-gradient(90deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)`

### Typography
- **Font Family**: Plus Jakarta Sans
- **Mobile-first responsive typography**
- **Custom breakpoints for optimal readability**

### Components
- Mobile-optimized buttons and forms
- Responsive cards and containers
- Touch-friendly navigation
- Accessibility-compliant interactions

For detailed design system documentation, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## 🌍 Internationalization

The application supports multiple languages:
- **English** (default)
- **Dutch**

Translation files are located in `src/locales/`

## 🏗️ Architecture

### State Management
- **Redux Toolkit** for global state
- **React hooks** for local component state
- **API slice** for data fetching

### Routing
- **React Router DOM** for client-side routing
- **Protected routes** for authenticated users
- **Lazy loading** for code splitting

### API Integration
- **Axios** for HTTP requests
- **Centralized API configuration**
- **Error handling** and loading states

## 📱 Responsive Design

### Custom Breakpoints
```css
w-xs: 350px    /* Extra small devices */
w-sm: 384px    /* Small devices */
w-md: 448px    /* Medium devices */
w-lg: 512px    /* Large devices */
w-xl: 576px    /* Extra large devices */
/* ... and more */
```

### Mobile-First Approach
- Touch-optimized interactions
- Responsive typography
- Adaptive layouts
- Performance optimization

## 🔐 Authentication

Supports multiple user types:
- **Clients**: End users booking services
- **Vendors**: Service providers
- **Admins**: Platform administrators

Features:
- Secure login/registration
- Email verification
- Password recovery
- Role-based access control

## 🛒 Booking System

- **Calendar Integration**: Visual availability calendar
- **Real-time Updates**: Live availability checking
- **Multi-step Process**: Streamlined booking flow
- **Payment Integration**: Secure payment processing
- **Order Management**: Track and manage bookings

## 🌟 Key Components

### Landing Page
- Hero section with call-to-action
- Featured vendors and services
- Customer testimonials
- Category showcase

### Vendor Profiles
- Service listings
- Gallery and portfolios
- Reviews and ratings
- Booking interface

### User Dashboard
- Booking history
- Profile management
- Notifications
- Support tickets

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_NAME=Evenlyo
# Add other environment variables as needed
```

### Tailwind Configuration
Custom configuration in `tailwind.config.js` includes:
- Custom color palette
- Extended spacing scale
- Custom breakpoints
- Component utilities

## 🧪 Testing

```bash
npm run test     # Run tests
npm run test:coverage  # Run tests with coverage
```

## 📦 Building for Production

```bash
npm run build    # Build for production
npm run preview  # Preview production build
```

The built files will be in the `dist/` directory.

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (Recommended for Vite projects)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Build Configuration
The project is configured for optimal production builds:
- Code splitting
- Asset optimization
- CSS minification
- Progressive Web App features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

### Development Guidelines
- Follow the existing code style
- Use mobile-first responsive design
- Ensure accessibility compliance
- Write descriptive commit messages
- Test across different devices

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v0.0.0**: Initial project setup
- Mobile-first responsive design system
- Multi-vendor platform foundation
- Authentication and booking system
- Internationalization support

---

**Built with ❤️ for the Evenlyo community**

# Evenlyo

A modern React-based directory and marketplace platform for events, services, and rentals.

## 🚀 Features

- **Multi-Vendor Marketplace**: Create independent stores similar to Etsy
- **Event Management**: Comprehensive event booking and management system
- **Service Directory**: Find and book various services
- **Rental Platform**: List and rent various items
- **Advanced Search**: Multi-criteria search functionality
- **User Authentication**: Separate login systems for clients and vendors
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Interactive UI**: Modern and intuitive user interface

## 🛠️ Technologies Used

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/FEDeveloperSoftflux/Evenlyo.git
cd Evenlyo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
Evenlyo/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── auth/               # Authentication components
│   └── styles/             # Global styles
├── assets/                 # Static assets (images, icons)
├── public/                 # Public assets
└── ...
```

## 🎯 Key Components

- **Header**: Navigation and authentication
- **Hero**: Landing page hero section with search
- **Categories**: Service/event categories
- **MultiVendor**: Vendor marketplace features
- **Authentication**: Login/register modals
- **Booking System**: Advanced booking functionality
- **Customer Showcase**: Success stories and testimonials

## 📱 Pages

- **Landing Page**: Main homepage
- **Login Page**: Dedicated client authentication
- **Pricing**: Service pricing information
- **Support**: Help and support section
- **Blog**: Blog and news section

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Features

- Clean and modern UI design
- Mobile-responsive layout
- Consistent color scheme
- Intuitive navigation
- Interactive elements
- Professional typography

## 🚀 Deployment

The project is ready for deployment on platforms like:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**FEDeveloperSoftflux**
- Email: graphicdesignerteam442@gmail.com
- GitHub: [@FEDeveloperSoftflux](https://github.com/FEDeveloperSoftflux)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email graphicdesignerteam442@gmail.com or create an issue in the GitHub repository.
