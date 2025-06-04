# ♻️ EcoSnap – Citizen-Led Plastic Waste Reporting App

**EcoSnap** is a Flutter-based mobile app that empowers citizens to report plastic waste spotted in public areas. Users can capture photos, tag the location automatically, and add optional notes. The data is stored in Supabase (or Firebase) and visualized on a real-time admin dashboard for action by municipal teams or environmental NGOs.

---

## 📸 What It Does

1. **Capture** a photo of plastic waste.
2. **Auto-detect** the user's current location.
3. **Add a note** describing the waste or location.
4. **Submit** the report to the cloud.
5. View reports on an **admin dashboard** with real-time map markers.

---

## 🌟 Features

### User App
- 📷 Take a photo or upload from gallery.
- 📍 Automatically tag location using GPS.
- 📝 Add an optional note (e.g., “Plastic bottles near the garden gate”).
- ☁️ Submit to cloud (Supabase or Firebase).
- ✅ Get a confirmation + thank you screen.
- 📤 Optional: Share the report on social media.

### Admin Dashboard
- 🗺️ View real-time map of all reports.
- 🧾 Filter by time, region, or keywords.
- 📦 Export reports as CSV (optional).
- 🚨 Future: Assign cleanup tasks or send alerts.

---

## 🔧 Tech Stack

| Component                | Tool / Library               |
|--------------------------|------------------------------|
| Frontend (Mobile)        | Flutter                      |
| Maps Integration         | `google_maps_flutter`        |
| Location Services        | `geolocator`, `geocoding`    |
| Image Capture            | `camera`, `image_picker`     |
| Backend Database         | Supabase (`supabase_flutter`) or Firebase (`cloud_firestore`) |
| Image Upload             | Supabase Storage / Firebase Storage |
| Auth (optional)          | `supabase_auth` / `firebase_auth` |
| Notifications / Toasts   | `fluttertoast`, `snackbar`   |
| Admin Dashboard (optional) | Streamlit / Flutter Web / React |

---

## 🧠 Firestore / Supabase Schema

   /reports/
   └── reportID (doc/row)
   ├── imageUrl: string
   ├── lat: double
   ├── lng: double
   ├── note: string
   ├── timestamp: DateTime
   └── userId: string (optional)


---

## 🛠️ Setup Instructions

### 📦 Prerequisites
- Flutter SDK installed
- Dart installed
- Supabase project setup (or Firebase if preferred)
- Google Maps API key enabled

### 🔌 Backend Setup (Supabase)
1. Create a `reports` table with:
   - `id`: UUID (primary key)
   - `image_url`: text
   - `lat`: float8
   - `lng`: float8
   - `note`: text
   - `timestamp`: timestamptz (default: now())
   - `user_id`: text (optional)
2. Create a Supabase Storage bucket for images.
3. Set public read permissions for the bucket (optional).
4. Get your Supabase URL and public key.

### 🧱 Flutter Setup

1. Clone the repo:
```bash
git clone https://github.com/your-username/ecosnap.git
cd ecosnap
flutter pub get
final supabase = SupabaseClient('SUPABASE_URL', 'SUPABASE_ANON_KEY');
flutter run

lib/
├── main.dart
├── pages/
│   ├── home_page.dart
│   ├── capture_page.dart
│   ├── location_note_page.dart
│   └── success_page.dart
├── services/
│   └── supabase_service.dart
└── widgets/
    └── custom_buttons.dart
