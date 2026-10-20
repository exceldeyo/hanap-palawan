# 🌴 Hanap Palawan — Trabaho Para sa Palaweño

**Hanap Palawan** is the official localized career, direct hiring, and anti-scam employer verification platform built specifically for **Palawan, Philippines** (*Puerto Princesa City, El Nido, Coron, San Vicente, Taytay, Narra, Brooke's Point, Bataraza, Roxas, Balabac, Cuyo, and Remote WFH*).

---

## 🏗️ How We Built the App (Architecture & Complete Feature Changelog)

### 1. Frontend & Universal Responsive Design System
- **React 19 + TypeScript + Vite:** Modular Single-Page Application (SPA) with strict TypeScript interfaces (`Job`, `Applicant`, `Interview`, `CandidateProfile`, `UserProfile`).
- **Tailwind CSS v4 + Universal Responsive CSS (`src/index.css`):**
  - Fluid typography (`clamp(...)`) and responsive grid layouts that adapt to **any screen device** (320px compact mobile phones, iOS/Android screens with `safe-area-inset`, tablets, laptops, and ultra-wide monitors) with zero horizontal overflow.
  - **Light Mode by Default & Smooth Dark Mode Transition:** Starts in crisp **Light Mode** by default (`hanap_palawan_theme_v6`) and uses synchronized `320ms cubic-bezier(0.22, 1, 0.36, 1)` surface/text transitions plus Circular Reveal View Transitions when toggling Dark Mode.

### 2. Visible Logo, Favicon & iOS / Android Home Screen Installation (PWA Ready)
- **Dedicated High-DPI PNG Icons (`/public`):**
  - `/apple-touch-icon.png` (`180x180` PNG required by iOS Safari when using **Share → Add to Home Screen** so the Hanap Palawan emerald palm emblem is always visible on iPhone and iPad home screens).
  - `/favicon-32x32.png` (`32x32` PNG) & SVG vector favicon for desktop/mobile browser tabs.
  - `/icon-192.png` (`192x192` PNG) & `/icon-512.png` (`512x512` PNG) linked in `/public/manifest.json` for Android and Desktop PWA installation.

### 3. Interactive Landing Page & Accurate Seeker vs. Employer Authentication
- **Working Landing Page Navigation:** Every menu tab in the top navigation bar and every feature card on the Landing Page (*Lokal at Direktang Trabaho*, *Smart Resume & Profile Builder*, *BIR & DTI Verified Employers*) is interactive and immediately navigates to the selected section.
- **Accurate Role Selection on Login & Sign Up (Email & Google Auth):**
  - Dedicated **Seeker** and **Employer** sign-in buttons are displayed in the Header and on the Landing Page.
  - Inside the Auth Modal, an explicit **Active Portal Indicator** (*Job Seeker Portal* vs. *Employer Portal*) locks in the user's chosen role before authenticating via Email/Password or **Google Sign-In**.
  - **Locked Session Role (No Mid-Session Profile Switching):** Once signed in (including with Google Authentication), in-menu role switching is disabled so users stay accurately in their chosen account type. To switch between Job Seeker and Employer, the user signs out and logs back in using the **Job Seeker** or **Employer** button.
  - **Auto-Clearing Form Fields:** Switching between *Mag-sign In* and *Gumawa ng Account*, toggling between *Job Seeker* and *Employer*, or closing/reopening the modal automatically clears all input fields.

### 4. Mobile-Revamped Seeker & Employer Profile Sections
- **Job Seeker Profile (`ProfileResumeView.tsx`):**
  - Compact mobile-first header card and a **2×2 grid sub-navigation bar on mobile** (*Profile & CV*, *Saved Jobs*, *Interviews*, *Resume Builder*) that fits 100% within mobile screens without horizontal scrolling.
- **Employer Profile & Anti-Scam Verification (`EmployerProfileView.tsx`):**
  - Mobile-stacked company header card so long company names, badges, and action buttons fit cleanly on phones.
  - Strict Philippine **BIR TIN** (`XXX-XXX-XXX-000` / `00000` with anti-fake sequence checks) and **DTI/SEC Permit** (`BN-XXXXXXXX` / `CS20XXXXXXX`) validation.
  - Mandatory **BIR Form 2303** and **DTI/SEC Certificate photo upload** with a **1–2 Business Days Approval SLA** status tracker.

### 5. 100% Private & Hidden Admin Verification Hub (`AdminVerificationView.tsx`)
- Completely removed from public headers, footers, and dropdown menus so Job Seekers and Employers never see any Admin or Staff button.
- Accessible **only** via the dynamic Exclusive Admin Link (`/?portal=hanap-admin` or `/#hanap-admin`) or secret keyboard shortcut (`Ctrl + Shift + A` / `Cmd + Shift + A`).

---

## 🔐 Complete Admin Side Guidelines (Keys, Recovery & Public Deployment Link)

### 1. Default Admin Credentials & Recovery Keys
Keep these credentials confidential for authorized Hanap Palawan personnel only:

| Credential Type | Value | Purpose |
| :--- | :--- | :--- |
| **Default Admin Security Key** | `PALAWAN-ADMIN-2026` | Used to unlock and sign in to the Exclusive Admin Console |
| **Master Recovery Code** | `PALAWAN-MASTER-RECOVERY-2026` | Option 2 for resetting a forgotten Admin Security Key |
| **Authorized Admin Emails (Easy Recovery)** | `exceldeousman@gmail.com` or `admin@hanappalawan.ph` | Option 1 (Alternative & Easy Way) to recover/reset a forgotten Admin Key without needing the recovery code |

---

### 2. How the Exclusive Admin Link Automatically Changes on Public Deployment
The Exclusive Admin Link is **100% dynamic** and automatically adapts to whatever domain or public server you deploy the app to (`window.location.origin`):

- **Local Development:** `http://localhost:3000/?portal=hanap-admin`
- **Cloud Run / Public Preview Deployment:** `https://<your-deployed-app-url>.run.app/?portal=hanap-admin`
- **Custom Production Domain:** `https://your-custom-domain.com/?portal=hanap-admin` (or `/#hanap-admin`)
- **Inside the Admin Dashboard:** The **Exclusive Admin Link** bar at the top of the Admin Console automatically detects your live public domain (`window.location.origin + '/?portal=hanap-admin'`) so clicking **Copy Exclusive Link** always copies the exact live public URL.

---

### 3. Step-by-Step Tutorial: How to Access & Use the Admin Side

#### Step 1: Open the Hidden Admin Login Modal
Choose either private entry method:
1. **Exclusive Admin Link:** Append `/?portal=hanap-admin` or `/#hanap-admin` to your app's URL in the browser address bar.
2. **Secret Keyboard Shortcut:** Press **`Ctrl + Shift + A`** (Windows/Linux) or **`Cmd + Shift + A`** (Mac) anywhere in the app.

#### Step 2: Sign In with the Admin Security Key
1. In the **Trusted Personnel Only** modal, enter the Admin Security Key:
   - Default Key: **`PALAWAN-ADMIN-2026`** *(or your custom key if you changed it)*.
2. Click **Buksan ang Admin Console**.

#### Step 3: Review & Inspect Employer BIR and DTI Submissions
1. Use the interactive **KPI Cards** at the top of the Admin Console (*Pending Review*, *Verified Employers*, *Rejected / Returned*, *Total Submissions*) to filter requests.
2. On any employer card, verify the automated format badges (**BIR Format Valid** and **DTI Format Valid**) and click **Suriin ang Photo** on the uploaded **BIR Certificate (Form 2303)** and **DTI / SEC Registration** thumbnails.
3. This opens the **Side-by-Side Document Inspector Lightbox**, showing the employer's typed BIR/DTI numbers right next to the high-resolution document image.
4. Click **Approve & Verify** if valid (instantly granting the employer a *Verified Employer* badge and unlocking job posting), or click **Reject / Return**, select a preset reason (e.g., *Malabo o hindi mabasa ang in-upload na larawan*), and confirm.

#### Step 4: How to Change the Admin Security Key
1. Inside the Admin Console header, click **Security Key & Recovery**.
2. Under the **Change Key** tab, enter your **Current Admin Key** (`Kasalukuyang Admin Key`), type your **New Admin Security Key** (minimum 8 characters), and click **I-save ang Bagong Admin Key**.

#### Step 5: How to Recover a Forgotten Admin Key (Admin Email Alternative OR Recovery Code)
If an admin forgets the custom Admin Security Key, there are **two easy ways** to recover and reset it:
1. Open the Admin Login Modal (`/?portal=hanap-admin` or `Ctrl + Shift + A`) and click **"Nakalimutan ang Code? (Recover)"** *(or open **Security Key & Recovery → Forgot / Recover Key** inside the dashboard)*.
2. Provide **EITHER**:
   - **Easy Way (Option 1 — Admin Email):** Enter an authorized Admin Email (`exceldeousman@gmail.com` or `admin@hanappalawan.ph`), **OR**
   - **Code Way (Option 2 — Master Recovery Code):** Enter `PALAWAN-MASTER-RECOVERY-2026`.
3. Enter your **New Admin Security Key** (minimum 8 characters) and click **I-reset at Buksan ang Admin**.

---

## 🏢 Step-by-Step Tutorial: Employer Verification & Real-Time Job Management
1. Clicking **"BIR & DTI Verified Employers"** on the Landing Page (or any Employer Portal tab while logged out) automatically redirects to the **Sign Up / Sign In** modal with a clear notice that an Employer account is required (no placeholder company profile is shown).
2. Sign up or sign in as an **Employer** (via Email or Google Authentication).
3. Open **Company Profile** in the navigation bar.
4. Scroll to **BIR & DTI Requirements Verification Status** and enter a valid Philippine **BIR TIN** (e.g., `123-456-789-000`) and **DTI/SEC Permit Number** (e.g., `DTI-2026-882910` or `BN-12345678`).
5. Upload clear photos of both your **BIR Certificate (Form 2303)** and **DTI / SEC Registration**.
6. Click **I-submit ang BIR at DTI Requirements**. Your status updates to **Pending Admin Review (1–2 Business Days Approval)** until approved by the Admin.
7. **Real-Time Job Deletion & Sync:** When an employer deletes any posted job (from either **Job Postings** or **Company Profile**), it is immediately deleted from Cloud Firestore and removed in **real-time** from all Job Seekers' job feeds, saved jobs, and active modals—even when the last remaining job is deleted.

---

## 🎬 Official Video App Advertisement & Interactive Tutorial Player
An interactive **6-Scene HD Video Advertisement & Step-by-Step How-To-Use Player** (`src/components/common/AppVideoAdPlayer.tsx` + `src/utils/soundEngine.ts`) is embedded directly on the **Landing Page** and accessible anytime from the footer (**"Watch Video Ad & App Guide"**):
1. **Tropical Palawan Background Music (BGM):** Synthesized in real time via the Web Audio API using warm island marimba/kalimba arpeggios and ambient chords aligned with the Palawan theme (with one-click Mute/Unmute).
2. **Synchronized UI Sound Effects (SFX):** Interactive sound cues (clicks, chimes, notification bells, document upload chimes, and fanfare) play automatically as each tutorial step animates.
3. **Animated Step-by-Step How-To-Use Scenes:**
   - **Scene 01:** Welcome to Hanap Palawan (Island coverage & anti-scam mission)
   - **Scene 02:** Accurate Role Selection & Sign-Up (Job Seeker vs. Employer account locking)
   - **Scene 03:** How Job Seekers Search Jobs, Build a Smart Resume & Apply in 1 Click
   - **Scene 04:** How Employers Register & Submit BIR Form 2303 + DTI/SEC Requirements (1–2 Business Days Approval)
   - **Scene 05:** Real-Time Cloud Sync (Instant job posting & real-time job deletion across all Seeker feeds)
   - **Scene 06:** Call-to-Action with direct buttons to Sign Up or Browse Jobs
4. **Responsive Mobile Header Bar:** The mobile header top bar (`src/components/common/Header.tsx`) keeps the **Seeker**, **Employer**, and **Dark/Light Mode** buttons comfortably spaced with dedicated right-hand breathing room so the theme toggle is never pushed into the screen corner on mobile devices.

---

## 💻 Local Development & Production Build

```bash
# 1. Install dependencies
npm install

# 2. Start development server on port 3000
npm run dev

# 3. Build for production deployment
npm run build
```

