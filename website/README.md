# TITANBAR PRO — Cinematic Product Launch Website

A complete, award-winning-style animated product-launch experience inspired by the 30-frame reference video sequence and tailored specifically to the **TitanBar Pro** (Adjustable Doorway Pull-Up Bar with Integrated Spirit Level and Safety Locking Rings).

---

## 🎬 Reference Frame Sequence Mapping

| Phase | Reference Frames | Animation & Visual Concept | Implementation in TitanBar Pro |
| :--- | :--- | :--- | :--- |
| **0. Perspective Preview** | `01.png` – `03.png` | 3D angled multi-screen perspective cards floating in space | Interactive 3D cards stage with camera zoom towards initialization |
| **1. System Initialization** | `04.png` – `05.png` | Minimal light canvas, brand title, 8-pointed starburst cog, percentage counter `( 0% )` -> `( 100% )` | Mechanical starburst counter calibrating balance and pressure sensors |
| **2. Organic Mask Wipe** | `06.png` | Starburst expands exponentially (`scale(45)`), acting as an organic reveal mask into dark mode | Dynamic SVG clip-path/transform expanding smoothly into the dark hero world |
| **3. Cinematic Hero Entrance** | `07.png` – `11.png` | Product enters with 3D perspective, large editorial serif headline fades in from blur to razor sharp, floating bottom dock | 3D floating pull-up bar, blur-to-sharp title *"Because you demand absolute stability"*, floating dock with live status indicators & `Order now` |
| **4. Technical Breakdown** | `12.png` – `17.png` | Product glides to the right, pill tags appear, editorial statement, feature card with pointer line targeting product | Dual-axis lock analysis, connected SVG pointer line targeting the integrated level & safety lock collar |
| **5. Light Studio Transition** | `18.png` – `19.png` | Dark container smoothly shrinks into a card, page turns into elegant platinum light mode | Viewport card container with adaptive light navigation bar |
| **6. Interactive Feature Studio** | `20.png` – `25.png` | `Features (specs) (00.03)`, interactive calibration card with live buttons & graphs, bottom timeline cards | Live bar extension HUD (`- 5cm` / `+ 5cm`), interactive spirit level bubble tilt simulator, and 8 clickable timeline tabs |
| **7. Diagonal Card Cascade** | `26.png` – `27.png` | Bottom timeline cards cascade diagonally upward with staggered delays and smooth fade | Synchronized scroll cascade effect pushing into the shop section |
| **8. E-Commerce & Macro Focus** | `28.png` – `30.png` | Interactive multi-angle gallery, camera focus shifts, size/color selectors, price, CTA & collapsible accordions | Macro focus on level & lock clamp, size selector, color swatches, favorite heart toggle, animated accordions, and Checkout Modal |

---

## 🚀 How to Run

1. Open [`index.html`](file:///c:/Users/Instrutor/Desktop/practing/website/index.html) directly in any modern browser (Chrome, Edge, Firefox, Safari).
2. Or run a local server:
   ```bash
   node server.js
   ```
   and visit `http://localhost:3000/`.

---

## 🛠 Key Features & Technologies

- **GSAP & Scroll-Synchronized Motion**: Smooth, hardware-accelerated transitions.
- **Client-Side Chroma-Key Transparency**: Automatically renders the product bar on dark backgrounds with zero white box or artifacts.
- **Interactive Spirit Level Simulator**: The green bubble tilts in real-time with cursor movement, locking into `0.0° LEVEL` when balanced.
- **Live Calibration HUD**: Interactive `[ + 5 cm ]` and `[ - 5 cm ]` controls dynamically change extension length and load capacity.
- **Self-Contained Web Audio SFX**: High-tech mechanical clicks and locking sounds (toggleable anytime in the navbar).
- **Interactive Checkout Modal**: Complete with customer details, order summary, and order confirmation toast.
