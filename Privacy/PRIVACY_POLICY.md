# Privacy Policy for CutBook POS

**Last Updated: June 29, 2026**

Welcome to **CutBook POS** (referred to as "CutBook", "we", "us", or "our"). We are committed to protecting your privacy and safeguarding the operational data of your salon, stylists, and clients. 

This Privacy Policy explains how we collect, use, disclose, and secure your information when you use the CutBook mobile application (available on Android and iOS), our web application, and our website (collectively, the "Service"). 

Please read this policy carefully. By accessing or using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Service.

---

## 1. Introduction & Scope

CutBook POS is a salon management and Point of Sale (POS) system designed to help salon owners and independent stylists track work entries, calculate commissions, and manage transactions. The Service is operated by the CutBook Project Team.

To comply with the developer policies of the Google Play Store and Apple App Store, we provide clear disclosures regarding the categories of data we collect, our sync mechanism, and how you can manage or delete your data.

---

## 2. Information We Collect

To provide a fully functioning POS and salon analytics experience, we collect several categories of information. 

### A. Personal Data
When you create an account, register your salon, or communicate with us, we collect information that can identify you, including:
*   **Authentication Details:** Email address and phone number (collected and processed securely via Google Firebase Authentication).
*   **Profile Information:** Display name, profile picture (optional), and login credentials.
*   **Business Details:** Salon name, physical business address (optional), local currency, and timezone settings.

### B. Transactional & Salon Operational Data (Offline-First Sync)
CutBook is built on an offline-first architecture. All transaction logs, commission structures, and stylist profiles are stored locally in a secure SQLite database on your device. 
When an active internet connection is detected, CutBook automatically synchronizes your local data with our secure cloud database (Google Cloud Firestore) to ensure backups and support multi-device access. The synchronized data includes:
*   **Stylist & Employee Profiles:** Names, roles, custom commission percentages, and payout histories.
*   **Work Entries & Service Logs:** Details of services rendered (e.g., haircuts, styling, coloring), price tags, timestamps, client display names (optional), and payment methods.
*   **Financial Metrics:** Commission calculations, tips collected, sales performance indicators, and historical checkout logs.

### C. Device & Technical Data
We automatically collect certain information from your device when you access our app or website:
*   **Device Identifiers:** Device model, operating system name and version, and unique device IDs.
*   **Push Notification Tokens:** Unique tokens required to deliver synchronization updates, reminders, and system alerts.
*   **Usage Logs:** IP address, access dates and times, and interactions within the application.
*   **Diagnostic Data:** Application performance reports, crash metrics, and error logs.

---

## 3. How We Use Your Information

We process and use the collected data strictly for business and operational purposes, including:
1.  **Core App Functionality:** Creating and managing user accounts, running offline-first databases, and synchronizing data across multiple devices.
2.  **Business Operations:** Calculating accurate stylist commissions, tracking client appointments, and providing real-time financial reporting.
3.  **Customer Support:** Diagnosing app synchronization errors, troubleshooting crash logs, and responding to support tickets.
4.  **Transaction Processing:** Managing subscription billing and processing payments via integrated services.
5.  **Service Communications:** Sending push notifications regarding sync status, business updates, and security announcements.
6.  **Security & Maintenance:** Protecting against fraud, unauthorized database access, and verifying identity during account operations.

*We do not sell, trade, rent, or distribute your salon data or customer lists to third-party advertisers or data brokers.*

---

## 4. Data Security

We implement industry-standard physical, technical, and administrative security measures to protect your personal and operational data:
*   **Data in Transit:** All communications between your local device and our synchronization backend are encrypted using secure Transport Layer Security (TLS/HTTPS) protocols.
*   **Data at Rest:** Customer data synced to Cloud Firestore is encrypted using enterprise-grade server-side encryption. Local SQLite databases rely on standard iOS/Android operating system sandboxing to prevent unauthorized cross-app access.
*   **Access Control:** Access to cloud databases is restricted strictly through Firebase Security Rules, ensuring users can only read and write data associated with their verified organization ID.

While we take rigorous steps to protect your data, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.

---

## 5. Data Retention & Account Deletion (CRITICAL)

In accordance with Google Play Store and Apple App Store Developer Policies, we provide users with full control over their data, including the right to delete their accounts and operational records.

### A. Retention Period
We retain your personal and operational data only for as long as your CutBook account is active, or as necessary to provide you with the Service, comply with legal obligations, or resolve disputes.

### B. Account and Data Deletion Flow
You can initiate a permanent deletion of your account and all associated operational data at any time:
1.  **In-App Deletion:** Navigate to **Settings** > **Account Settings** > **Delete Account** inside the CutBook application. Confirming this action will trigger an automatic cleanup script.
2.  **Manual Deletion Request:** You can request account deletion by emailing our support team at [support@cutbook.app](mailto:support@cutbook.app) with the subject line "Account Deletion Request." Please provide your registered email address or organization ID.

### C. Scope of Deletion
Upon receiving a deletion request (either in-app or via email), the following processes occur:
*   Your authenticated credentials will be deleted from Firebase Authentication.
*   All synchronized stylist profiles, transaction histories, service logs, and analytics associated with your salon will be permanently purged from Cloud Firestore within **30 days**.
*   *Note:* Any local database files stored on your physical device (SQLite) will remain until you manually uninstall the CutBook application.

---

## 6. Third-Party Services & SDKs

We use standard, industry-recognized Software Development Kits (SDKs) and integration partners strictly to maintain, improve, and secure the Service. These third parties handle your data in accordance with their respective privacy policies:

*   **Google Firebase (Auth, Firestore, Analytics, Crashlytics):** Used for cloud synchronization, user authentication, general app usage metrics, and crash reporting. 
    *   [Google Privacy & Security in Firebase](https://firebase.google.com/support/privacy)
*   **Sentry:** Used to monitor application performance, track software bugs, and catch crashes in real-time.
    *   [Sentry Privacy Policy](https://sentry.io/privacy/)
*   **Stripe / bKash:** Used to process subscription payments and in-app premium invoices. We do not collect or store full credit card numbers or financial credentials on our servers; these are handled directly by the payment processors.
    *   [Stripe Privacy Policy](https://stripe.com/privacy)
    *   [bKash Privacy Policy](https://www.bkash.com/privacy-policy)

---

## 7. Children's Privacy

Our Service is not intended for or directed to children under the age of 13. We do not knowingly collect personal identifiable information from children under 13. If we discover that a child under 13 has provided us with personal data, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.

---

## 8. Changes to This Privacy Policy

We may update our Privacy Policy from time to time to reflect changes in our practices or regulatory requirements. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this page periodically for any updates.

---

## 9. Contact Information

If you have any questions, comments, or concerns about this Privacy Policy, or if you need assistance with account deletion or data portability, please contact us at:

*   **Email:** [support@cutbook.app](mailto:support@cutbook.app)
*   **Mailing Address:** CutBook Project Team, [Insert Physical Address (Optional)]
