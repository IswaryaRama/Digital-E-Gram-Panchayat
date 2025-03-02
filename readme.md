# Digital E-Gram Panchayat

## Overview
The **Digital E-Gram Panchayat** project is a web-based platform designed to improve the delivery of citizen services in villages. It allows users to apply for gram panchayat services, track their applications, and receive real-time updates. Staff and officers can manage applications and services efficiently through the platform.

## Features
- **User Module**:
  - Register, login, apply for services, and track application status.
  - Update profile information.
- **Staff Module**:
  - Login, view applications, and update application status.
- **Officer Module**:
  - Login, create/update/delete services, and manage applications.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript.
- **Backend**: Firebase (Authentication, Firestore Database).
- **Hosting**: Firebase Hosting.

---

## Workflow

### 1. User Workflow
1. **Register**: Create a new account.
2. **Login**: Log in with registered credentials.
3. **Apply for Service**: Submit an application for a service (e.g., Water Connection).
4. **Track Application Status**: View the status of submitted applications.
5. **Update Profile**: Update personal information.

### 2. Staff Workflow
1. **Login**: Log in with staff credentials.
2. **View Applications**: View all submitted applications.
3. **Update Application Status**: Approve or reject applications.

### 3. Officer Workflow
1. **Login**: Log in with officer credentials.
2. **Create Service**: Add new services (e.g., Housing Scheme).
3. **Manage Services**: Update or delete existing services.
4. **Manage Applications**: View and manage all applications.

---

## Setup and Execution

### 1. Prerequisites
- A modern web browser (e.g., Chrome, Firefox).
- A Firebase project (for backend and hosting).

### 2. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable **Authentication** (Email/Password).
4. Enable **Firestore Database**.
5. Enable **Firebase Hosting**.

### 3. Clone the Repository
```bash
git clone https://github.com/your-username/digital-gram-panchayat.git
cd digital-gram-panchayat
