// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ======================
// User Module
// ======================

// User Registration
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User registered successfully:', email);
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error registering user:', error);
        });
});

// User Login
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User logged in successfully:', email);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
});

// Apply for Service
document.getElementById('apply-service-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const serviceType = document.getElementById('service-type').value;
    const description = document.getElementById('description').value;
    const user = auth.currentUser;

    if (user) {
        db.collection('applications').add({
            userId: user.uid,
            serviceType: serviceType,
            description: description,
            status: 'Pending',
            createdAt: new Date()
        })
        .then(() => {
            console.log('Application submitted successfully by:', user.email);
            alert('Application submitted successfully!');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error submitting application:', error);
        });
    } else {
        console.error('User not logged in');
    }
});

// Fetch and Display Application Status (User)
function fetchApplicationStatus() {
    const user = auth.currentUser;
    if (user) {
        db.collection('applications')
            .where('userId', '==', user.uid)
            .get()
            .then((querySnapshot) => {
                const applicationsList = document.getElementById('applications-list');
                applicationsList.innerHTML = ''; // Clear previous content

                if (querySnapshot.empty) {
                    applicationsList.innerHTML = '<p>No applications found.</p>';
                } else {
                    querySnapshot.forEach((doc) => {
                        const application = doc.data();
                        const applicationItem = document.createElement('div');
                        applicationItem.className = 'application-item';
                        applicationItem.innerHTML = `
                            <p><strong>Service Type:</strong> ${application.serviceType}</p>
                            <p><strong>Description:</strong> ${application.description}</p>
                            <p><strong>Status:</strong> ${application.status}</p>
                            <p><strong>Submitted On:</strong> ${application.createdAt.toDate().toLocaleString()}</p>
                            <hr>
                        `;
                        applicationsList.appendChild(applicationItem);
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching applications:', error);
            });
    } else {
        console.error('User not logged in');
    }
}

// Update Profile
document.getElementById('profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const user = auth.currentUser;

    if (user) {
        db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            phone: phone,
            address: address
        }, { merge: true })
        .then(() => {
            console.log('Profile updated successfully');
            alert('Profile updated successfully!');
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
        });
    } else {
        console.error('User not logged in');
    }
});

// ======================
// Staff Module
// ======================

// Staff Login
document.getElementById('staff-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Staff logged in successfully:', email);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
});

// Fetch and Display Applications for Staff
function fetchApplicationsForStaff() {
    db.collection('applications')
        .get()
        .then((querySnapshot) => {
            const applicationsList = document.getElementById('applications-list');
            applicationsList.innerHTML = ''; // Clear previous content

            if (querySnapshot.empty) {
                applicationsList.innerHTML = '<p>No applications found.</p>';
            } else {
                querySnapshot.forEach((doc) => {
                    const application = doc.data();
                    const applicationItem = document.createElement('div');
                    applicationItem.className = 'application-item';
                    applicationItem.innerHTML = `
                        <p><strong>Service Type:</strong> ${application.serviceType}</p>
                        <p><strong>Description:</strong> ${application.description}</p>
                        <p><strong>Status:</strong> 
                            <select id="status-${doc.id}" class="status-select">
                                <option value="Pending" ${application.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Approved" ${application.status === 'Approved' ? 'selected' : ''}>Approved</option>
                                <option value="Rejected" ${application.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                            </select>
                        </p>
                        <p><strong>Submitted On:</strong> ${application.createdAt.toDate().toLocaleString()}</p>
                        <button onclick="updateStatus('${doc.id}')" class="btn">Update Status</button>
                        <hr>
                    `;
                    applicationsList.appendChild(applicationItem);
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching applications:', error);
        });
}

// Update Application Status (Staff)
function updateStatus(applicationId) {
    const status = document.getElementById(`status-${applicationId}`).value;
    db.collection('applications').doc(applicationId).update({
        status: status
    })
    .then(() => {
        console.log('Application status updated to:', status);
        alert('Status updated successfully!');
    })
    .catch((error) => {
        console.error('Error updating status:', error);
    });
}

// ======================
// Officer Module
// ======================

// Officer Login
document.getElementById('officer-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Officer logged in successfully:', email);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
});

// Create Service
document.getElementById('create-service-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const serviceName = document.getElementById('service-name').value;
    const serviceDescription = document.getElementById('service-description').value;
    db.collection('services').add({
        name: serviceName,
        description: serviceDescription,
        createdAt: new Date()
    })
    .then(() => {
        console.log('Service created successfully');
        alert('Service created successfully!');
    })
    .catch((error) => {
        console.error('Error creating service:', error);
    });
});

// ======================
// Common Functionality
// ======================

// Logout
document.getElementById('logout-btn')?.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            console.log('User logged out successfully');
            window.location.href = 'DigitalEGramPanchayat.html';
        })
        .catch((error) => {
            console.error('Error logging out:', error);
        });
});

// Call the function when the page loads
if (window.location.pathname.includes('application-status.html')) {
    fetchApplicationStatus();
}

if (window.location.pathname.includes('view-applications.html')) {
    fetchApplicationsForStaff();
}
