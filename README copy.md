# 🔬 [Micro](https://microscope.vercel.app)

**The Ultimate In-Browser Toolkit for Devs & Makers**
Edit, convert, calculate, redact, preview — all locally and securely in your browser.

---

## 📚 Table of Contents

- [🔬 Micro](#-micro)
  - [📚 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
    - [🔧 1. Clone the Repository](#-1-clone-the-repository)
    - [📦 2. Install Dependencies](#-2-install-dependencies)
    - [⚙️ 3. Install Tauri CLI (Optional)](#️-3-install-tauri-cli-optional)
    - [💻 4. Start the Development Server](#-4-start-the-development-server)
  - [🧰 Tech Stack](#-tech-stack)
  - [🚀 Available Tools](#-available-tools)
    - [🔄 Converters](#-converters)
    - [📝 Editors](#-editors)
    - [♟️ Chess Tools](#️-chess-tools)
    - [🧮 Calculators](#-calculators)
    - [⏰ Time \& Utility Tools](#-time--utility-tools)
    - [🔧 Generators](#-generators)
    - [🐙 GitHub Tools](#-github-tools)
    - [🧪 Other](#-other)
  - [📦 Build for Production](#-build-for-production)
  - [🛠️ Build Desktop App with Tauri](#️-build-desktop-app-with-tauri)
  - [📄 License](#-license)
  - [🙌 Acknowledgements](#-acknowledgements)

---

## ✨ Features

- 🧾 Convert between CSV, JSON, and YAML formats
- 📄 Redact PDFs visually or permanently — all offline
- 🧮 Convert values (length, weight, numeral systems, currencies)
- 🧠 Analyze GitHub repos, generate Open Graph images
- 🔁 Convert OpenAPI specs to Postman collections
- ♟️ Render chess boards, generate Chess960, convert PGNs to GIFs
- 🔤 Encode/decode strings, Braille, Morse
- 📝 Markdown & manifest.json editors
- 🔒 100% client-side. No uploads. No sign-ups.

---

### 🔧 1. Clone the Repository

```shell
git clone git@github.com:hieudoanm/openapi-to-postmanv2.git
cd openapi-to-postmanv2
```

### 📦 2. Install Dependencies

```shell
pnpm install
```

### ⚙️ 3. Install Tauri CLI (Optional)

```shell
cargo install tauri-cli
```

> You’ll also need [Rust](https://www.rust-lang.org/tools/install)

### 💻 4. Start the Development Server

```shell
pnpm run dev
```

> Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tauri](https://tauri.app/)
- [`js-yaml`](https://github.com/nodeca/js-yaml), [`papaparse`](https://www.papaparse.com/), `uuid`, and more

---

## 🚀 Available Tools

### 🔄 Converters

- [📂 CSV Tools](/converter/csv)
- [🧾 JSON Tools](/converter/json)
- [📄 YAML Tools](/converter/yaml)
- [💬 Braille & Morse Converter](/converter/code)
- [🎨 Color Converter](/converter/colors)
- [🔤 String Utilities](/converter/strings)
- [🔁 OpenAPI to Postman V2](/converter/openapi2postmanv2)

### 📝 Editors

- [📝 Markdown Editor](/editor/markup)
- [📘 Manifest Editor (PWA/Extensions)](/editor/manifest)
- [🛡️ PDF Redaction](/editor/redact)

### ♟️ Chess Tools

- [🧩 FEN to PNG](/chess/converter/fen2png)
- [🎞️ PGN to GIF](/chess/converter/pgn2gif)
- [🔀 Chess960 Generator](/chess/theory/chess960)
- [📚 Opening Explorer](/chess/theory/openings)
- [📈 ELO Calculator](/chess/tools/elo)
- [⏱️ Chess Clock](/chess/tools/clock)

### 🧮 Calculators

- [🧮 Base Converter](/calc/base)
- [💱 Forex Calculator](/calc/forex)
- [🪙 Crypto Calculator](/calc/crypto)
- [📏 Length Converter](/calc/length)
- [⚖️ Weight Converter](/calc/weight)
- [🏛️ Roman Numeral Converter](/calc/roman)

### ⏰ Time & Utility Tools

- [⏳ Pomodoro Timer](/clock/pomodoro)
- [🌍 Timezone Viewer](/clock/timezones)

### 🔧 Generators

- [🆔 UUID Generator](/generator/uuid)
- [📷 QR Code Generator](/generator/qrcode)

### 🐙 GitHub Tools

- [📊 GitHub Language Stats](/github/languages)
- [🖼️ Social Preview Generator](/github/preview)

### 🧪 Other

- [🧪 Periodic Table Explorer](/other/periodic-table)
- [📊 Status Monitor](/other/status)
- [💬 AI Chat](/other/chat)
- [🖼️ Image Tools](/other/images)

---

## 📦 Build for Production

```shell
pnpm run build
pnpm run start
```

---

## 🛠️ Build Desktop App with Tauri

After installing the Tauri CLI:

```shell
pnpm tauri build
```

To run in desktop development mode:

```shell
pnpm tauri dev
```

---

## 📄 License

Licensed under **GNU General Public License v3.0**
See [LICENSE](./LICENSE) or visit:
[https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)

---

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tauri](https://tauri.app/)
- [js-yaml](https://github.com/nodeca/js-yaml)
- [papaparse](https://www.papaparse.com/)
- [uuid](https://github.com/uuidjs/uuid)
