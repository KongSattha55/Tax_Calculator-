# Cambodian Tax Calculator

A responsive React application for estimating common Cambodian taxes in Khmer. The project provides focused calculators, tax references, light and dark themes, and a mobile-friendly navigation layout.

> This application is intended for learning and preliminary estimates. Confirm final calculations with the General Department of Taxation or a qualified tax professional before filing.

## Features

- Khmer-language interface
- Dark-blue visual system with light and dark themes
- Responsive desktop, tablet, and mobile layouts
- Eleven tax and penalty calculators
- Result summaries with copy and print actions
- Supporting PDF references available inside the application
- Client-side routing for fast page navigation

## Included Calculators

| Calculator | Route | Purpose |
| --- | --- | --- |
| Salary Tax | `/salary-tax` | Monthly resident and non-resident salary tax |
| Prepayment Tax | `/prepayment-tax` | Monthly prepayment tax based on turnover |
| VAT | `/vat` | VAT-exclusive and VAT-inclusive calculations |
| Fringe Benefit Tax | `/fringe-benefit` | Tax on employee fringe benefits |
| Withholding Tax | `/withholding-tax` | Withholding by payment and recipient type |
| Income Tax | `/income-tax` | Annual income tax estimates |
| Minimum Tax | `/minimum-tax` | Comparison of income tax and minimum tax |
| Penalties | `/penalty` | Penalty and monthly interest estimates |
| Specific Tax | `/specific-tax` | Specific tax on selected goods and services |
| Property Tax | `/property-tax` | Annual tax on immovable property |
| Capital Gains Tax | `/capital-gains` | Tax on gains from selected asset disposals |

## Technology

- React 18
- React Router 6
- Vite 5
- CSS custom properties and responsive CSS
- ESLint 8

## Requirements

Install these tools before running the project:

- Node.js 18 or newer
- npm 9 or newer

Check the installed versions:

```bash
node --version
npm --version
```

## Run Locally

1. Open a terminal in the project directory.
2. Install the locked dependency versions:

```bash
npm ci
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

To make the development server available to other devices on the same network:

```bash
npm run dev -- --host 0.0.0.0
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check JavaScript and JSX with ESLint |

## Production Build

Create the build:

```bash
npm run build
```

Preview it:

```bash
npm run preview
```

The generated files are written to `dist/`. That directory is generated and should not be committed.

## Project Structure

```text
.
├── public/
│   ├── docs/                 # Tax reference PDFs
│   ├── default1-ico.png      # GDT logo
│   ├── default2.png          # ITC logo
│   └── favicon.png
├── src/
│   ├── calculators/          # Pure tax calculation functions
│   ├── components/
│   │   ├── layout/           # Header, navigation, and footer
│   │   ├── shared/           # Shared tax reference content
│   │   └── ui/               # Reusable result and theme controls
│   ├── constants/            # Rates and explanatory tax data
│   ├── hooks/                # Theme state and persistence
│   ├── pages/                # Route-level calculator screens
│   ├── utils/                # Currency formatting and validation
│   ├── App.jsx               # Application layout and routes
│   ├── index.css             # Global design tokens and base styles
│   └── main.jsx              # React entry point
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## Theme Customization

Global colors, spacing, typography, shadows, and responsive values are defined in:

```text
src/index.css
```

The main brand variables are:

```css
--primary: #2563eb;
--primary-dark: #1d4ed8;
--bg: #edf3fb;
--text-bright: #0b1f3a;
--grad-brand: linear-gradient(135deg, #1d4ed8, #2563eb, #38bdf8);
```

Dark-theme values are under the `[data-theme="dark"]` selector. New visitors start in dark mode, and their selection is stored in browser `localStorage`.

## Adding a Calculator

1. Add a pure calculation module to `src/calculators/`.
2. Add rates or constants to `src/constants/`.
3. Create the page in `src/pages/`.
4. Register the route in `src/App.jsx`.
5. Add navigation metadata in `src/components/layout/Navbar.jsx`.
6. Add the home-page card in `src/pages/Home.jsx`.
7. Add focused tests if a test framework is introduced.

Keep calculation logic outside React components where possible. This makes formulas easier to verify and reuse.

## Reference Documents

The `public/docs/` directory contains the source PDFs used by the interface:

- Tax overview
- Salary tax
- Prepayment tax
- Withholding tax
- Income tax
- VAT

Files under `public/` are served from the site root. For example:

```text
public/docs/Tax_02_Salary.pdf
```

is available at:

```text
/docs/Tax_02_Salary.pdf
```

## Deployment

The project includes `vercel.json` for single-page application routing on Vercel.

For another static host:

1. Run `npm run build`.
2. Deploy the `dist/` directory.
3. Configure unknown routes to fall back to `index.html`.

## Data and Legal Notice

Tax laws, rates, thresholds, and effective dates may change. The formulas and documents in this repository must be reviewed before use in production or for official filing. This software does not replace professional tax advice.
