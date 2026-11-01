# GOTA PATTI — ARCHIVE & ATELIER

An editorial craft archive and luxury atelier platform celebrating the heritage art of Rajasthani **Gota Patti** (hand-folded metallic ribbon appliqué and zardozi embroidery).

## Pages
1. **Home (`index.html`)** — 240-frame interactive hero scroll experience, craft origins, regional map, featured revivalist designers, and curated masterworks.
2. **Designers (`designers.html`)** — Verified directory of Indian couture and textile designers championing Gota Patti (`Sanjay Garg / Raw Mango`, `Anamika Khanna`, `Anavila Misra`, `Abraham & Thakore`, `Anita Dongre`, `Sabyasachi Mukherjee`).
3. **Process & Materials (`process.html`)** — 292-frame scroll-controlled craft transformation detailing the five stages of Gota Patti creation (*Khaka & Aari Framing*, *Cutting the Patti Ribbon*, *Folding into Phool & Bijia*, *Zari Tanka Appliqué*, and *Completed Archival Medallion*).
4. **Products (`products.html`)** — Clean, minimal product catalog with live filtering (Category, Colour, Price Range, Search), sorting (*Featured*, *Newest*, *Price: Low to High*, *Price: High to Low*), Product Detail modal with quantity selector, persistent Shopping Bag drawer, and Checkout form.
5. **About (`about.html`)** — Archival mission, artisan guild ethics, and patronage philosophy.

## Local Development

```bash
npm start
# Serves the website at http://localhost:8080
```

## Production Build Check

```bash
npm run build
```

## Remaining Backend & Payment Gateway Setup for Live Checkout
The frontend shopping and checkout journey (`auth.js`) is fully wired with persistent `localStorage` state, quantity selectors, automatic order summary calculations, and customer/address validation. To process live payments:
1. Open `auth.js` and configure `window.GOTA_PATTI_CHECKOUT_CONFIG`:
   - `apiEndpoint`: Your backend order creation endpoint (e.g., `POST https://your-api.example.com/v1/orders`).
   - `paymentProvider`: `'razorpay'` or `'stripe'`.
   - `paymentPublicKey`: Your live or test publishable key (`rzp_...` or `pk_...`).
2. Until those credentials are provided, submitting the checkout form validates and saves the customer's delivery details locally and displays a transparent configuration notice without faking payment success or order confirmation.

