
// جامعتي - نظام إدارة المحاضرات الذكي
// تم التطوير بواسطة ABDULLAH ALASAAD & ARX-Tech

// Global Variables
let lectures = [];
let currentLanguage = 'ar';
let notificationSettings = {
    dailyNotifications: true,
    dailyNotificationTime: '06:00',
    lectureReminders: true
};

// Days of the week in Arabic and English
const daysOfWeek = {
    ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

// Language translations
const translations = {
    ar: {
        'Welcome to Smart Lecture Management System': 'مرحباً بك في نظام إدارة المحاضرات الذكي',
        'Organize your academic schedule and get smart reminders for your lectures': 'نظم جدولك الأكاديمي واحصل على تذكيرات ذكية لمحاضراتك',
        'Add Lecture': 'إضافة محاضرة',
        'Add a new lecture to your schedule': 'أضف محاضرة جديدة لجدولك',
        'View Schedule': 'عرض الجدول',
        'View your weekly program': 'اعرض برنامجك الأسبوعي',
        'Export PDF': 'تصدير PDF',
        'Save your schedule as PDF': 'احفظ جدولك كملف PDF',
        'Weekly Lecture Schedule': 'برنامج المحاضرات الأسبوعي',
        'Clear All': 'مسح الكل',
        'Add New Lecture': 'إضافة محاضرة جديدة',
        'Lecture Name': 'اسم المحاضرة',
        'Lecture Type': 'نوع المحاضرة',
        'Professor Name': 'اسم الدكتور',
        'Lecture Start Time': 'وقت بداية المحاضرة',
        'Location': 'مكان الحضور',
        'Day': 'اليوم',
        'Cancel': 'إلغاء',
        'Save Lecture': 'حفظ المحاضرة',
        'Notification Settings': 'إعدادات الإشعارات',
        'Daily Notifications': 'إشعارات يومية',
        'Daily Notification Time': 'وقت الإشعار اليومي',
        'Lecture reminder 30 minutes before': 'تذكير قبل المحاضرة بـ 30 دقيقة',
        'Save Settings': 'حفظ الإعدادات',
        'Developed by': 'تم التطوير بواسطة',
        'Follow Us': 'تابعنا',
        'Facebook': 'فيسبوك',
        'Technical Support': 'الدعم الفني',
        'Contact Us': 'تواصل معنا',
        'Loading...': 'جاري التحميل...',
        'Quick search in lectures...': 'البحث السريع في المحاضرات...'
    },
    en: {
        'مرحباً بك في نظام إدارة المحاضرات الذكي': 'Welcome to Smart Lecture Management System',
        'نظم جدولك الأكاديمي واحصل على تذكيرات ذكية لمحاضراتك': 'Organize your academic schedule and get smart reminders for your lectures',
        'إضافة محاضرة': 'Add Lecture',
        'أضف محاضرة جديدة لجدولك': 'Add a new lecture to your schedule',
        'عرض الجدول': 'View Schedule',
        'اعرض برنامجك الأسبوعي': 'View your weekly program',
        'تصدير PDF': 'Export PDF',
        'احفظ جدولك كملف PDF': 'Save your schedule as PDF',
        'برنامج المحاضرات الأسبوعي': 'Weekly Lecture Schedule',
        'مسح الكل': 'Clear All',
        'إضافة محاضرة جديدة': 'Add New Lecture',
        'اسم المحاضرة': 'Lecture Name',
        'نوع المحاضرة': 'Lecture Type',
        'اسم الدكتور': 'Professor Name',
        'وقت بداية المحاضرة': 'Lecture Start Time',
        'مكان الحضور': 'Location',
        'اليوم': 'Day',
        'إلغاء': 'Cancel',
        'حفظ المحاضرة': 'Save Lecture',
        'إعدادات الإشعارات': 'Notification Settings',
        'إشعارات يومية': 'Daily Notifications',
        'وقت الإشعار اليومي': 'Daily Notification Time',
        'تذكير قبل المحاضرة بـ 30 دقيقة': 'Lecture reminder 30 minutes before',
        'حفظ الإعدادات': 'Save Settings',
        'تم التطوير بواسطة': 'Developed by',
        'تابعنا': 'Follow Us',
        'فيسبوك': 'Facebook',
        'الدعم الفني': 'Technical Support',
        'تواصل معنا': 'Contact Us',
        'جاري التحميل...': 'Loading...',
        'البحث السريع في المحاضرات...': 'Quick search in lectures...'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadDataFromStorage();
    setupEventListeners();
    displaySchedule();
    requestNotificationPermission();
    setupNotificationScheduler();
    updateLanguageDisplay();
    
    // Show welcome animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// Local Storage Functions
function saveDataToStorage() {
    try {
        localStorage.setItem('jameti_lectures', JSON.stringify(lectures));
        localStorage.setItem('jameti_settings', JSON.stringify(notificationSettings));
        localStorage.setItem('jameti_language', currentLanguage);
    } catch (error) {
        console.error('Error saving data to storage:', error);
        showNotification('خطأ في حفظ البيانات', 'error');
    }
}

function loadDataFromStorage() {
    try {
        const savedLectures = localStorage.getItem('jameti_lectures');
        const savedSettings = localStorage.getItem('jameti_settings');
        const savedLanguage = localStorage.getItem('jameti_language');
        
        if (savedLectures) {
            lectures = JSON.parse(savedLectures);
        }
        
        if (savedSettings) {
            notificationSettings = { ...notificationSettings, ...JSON.parse(savedSettings) };
        }
        
        if (savedLanguage) {
            currentLanguage = savedLanguage;
        }
    } catch (error) {
        console.error('Error loading data from storage:', error);
        lectures = [];
        notificationSettings = {
            dailyNotifications: true,
            dailyNotificationTime: '06:00',
            lectureReminders: true
        };
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Form submission
    const lectureForm = document.getElementById('lectureForm');
    if (lectureForm) {
        lectureForm.addEventListener('submit', handleLectureSubmission);
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Modal close events
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeNotificationModal();
        }
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            showAddLectureModal();
        }
    });
}

// Lecture Management Functions
function showAddLectureModal() {
    const modal = document.getElementById('addLectureModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
    }
}

function closeModal() {
    const modal = document.getElementById('addLectureModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('lectureForm');
        if (form) form.reset();
    }
}

function handleLectureSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const lectureData = {
        id: Date.now().toString(),
        name: document.getElementById('lectureName').value.trim(),
        type: document.getElementById('lectureType').value,
        professor: document.getElementById('professorName').value.trim(),
        time: document.getElementById('lectureTime').value,
        location: document.getElementById('lectureLocation').value.trim(),
        day: document.getElementById('lectureDay').value,
        createdAt: new Date().toISOString()
    };
    
    // Validation
    if (!lectureData.name || !lectureData.type || !lectureData.time || !lectureData.location || !lectureData.day) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Add lecture
    lectures.push(lectureData);
    saveDataToStorage();
    displaySchedule();
    closeModal();
    
    showNotification('تم إضافة المحاضرة بنجاح', 'success');
    
    // Schedule notification for this lecture
    scheduleNotificationForLecture(lectureData);
}

function deleteLecture(lectureId) {
    if (confirm('هل أنت متأكد من حذف هذه المحاضرة؟')) {
        lectures = lectures.filter(lecture => lecture.id !== lectureId);
        saveDataToStorage();
        displaySchedule();
        showNotification('تم حذف المحاضرة بنجاح', 'success');
    }
}

function clearAllLectures() {
    if (confirm('هل أنت متأكد من حذف جميع المحاضرات؟')) {
        lectures = [];
        saveDataToStorage();
        displaySchedule();
        showNotification('تم حذف جميع المحاضرات', 'success');
    }
}

// Display Functions
function displaySchedule() {
    const scheduleGrid = document.getElementById('scheduleGrid');
    if (!scheduleGrid) return;
    
    scheduleGrid.innerHTML = '';
    
    if (lectures.length === 0) {
        scheduleGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-plus"></i>
                <h3>لا توجد محاضرات مجدولة</h3>
                <p>ابدأ بإضافة محاضرتك الأولى</p>
                <button class="btn-primary" onclick="showAddLectureModal()">
                    <i class="fas fa-plus"></i>
                    إضافة محاضرة
                </button>
            </div>
        `;
        return;
    }
    
    // Group lectures by day
    const lecturesByDay = {};
    daysOfWeek[currentLanguage].forEach(day => {
        lecturesByDay[day] = [];
    });
    
    lectures.forEach(lecture => {
        if (lecturesByDay[lecture.day]) {
            lecturesByDay[lecture.day].push(lecture);
        }
    });
    
    // Sort lectures by time within each day
    Object.keys(lecturesByDay).forEach(day => {
        lecturesByDay[day].sort((a, b) => a.time.localeCompare(b.time));
    });
    
    // Create day columns
    Object.entries(lecturesByDay).forEach(([day, dayLectures]) => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'day-column';
        
        dayColumn.innerHTML = `
            <div class="day-header">${day}</div>
            <div class="day-lectures">
                ${dayLectures.length === 0 ? 
                    '<div class="no-lectures">لا توجد محاضرات</div>' :
                    dayLectures.map(lecture => createLectureCard(lecture)).join('')
                }
            </div>
        `;
        
        scheduleGrid.appendChild(dayColumn);
    });
    
    // Update notification badge
    updateNotificationBadge();
}

function createLectureCard(lecture) {
    const timeFormatted = formatTime(lecture.time);
    
    return `
        <div class="lecture-card" data-lecture-id="${lecture.id}">
            <div class="lecture-actions">
                <button class="delete-btn" onclick="deleteLecture('${lecture.id}')" title="حذف المحاضرة">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="lecture-header">
                <div class="lecture-name">${lecture.name}</div>
                <div class="lecture-type">${lecture.type}</div>
            </div>
            <div class="lecture-details">
                <div class="lecture-detail">
                    <i class="fas fa-clock"></i>
                    <span>${timeFormatted}</span>
                </div>
                ${lecture.professor ? `
                    <div class="lecture-detail">
                        <i class="fas fa-user-tie"></i>
                        <span>${lecture.professor}</span>
                    </div>
                ` : ''}
                <div class="lecture-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${lecture.location}</span>
                </div>
            </div>
        </div>
    `;
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'مساءً' : 'صباحاً';
    return `${hour12}:${minutes} ${ampm}`;
}

// Search Functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const lectureCards = document.querySelectorAll('.lecture-card');
    
    lectureCards.forEach(card => {
        const lectureId = card.dataset.lectureId;
        const lecture = lectures.find(l => l.id === lectureId);
        
        if (lecture) {
            const searchableText = `
                ${lecture.name} 
                ${lecture.type} 
                ${lecture.professor || ''} 
                ${lecture.location} 
                ${lecture.day}
            `.toLowerCase();
            
            if (searchableText.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        }
    });
    
    // Show/hide day columns based on search results
    const dayColumns = document.querySelectorAll('.day-column');
    dayColumns.forEach(column => {
        const visibleCards = column.querySelectorAll('.lecture-card[style*="display: block"], .lecture-card:not([style*="display: none"])');
        if (searchTerm && visibleCards.length === 0) {
            column.style.display = 'none';
        } else {
            column.style.display = 'block';
        }
    });
}

// Notification Functions
function requestNotificationPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                registerServiceWorker();
            } else {
                console.log('Notification permission denied');
            }
        });
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully');
            })
            .catch(error => {
                console.log('Service Worker registration failed');
            });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function scheduleNotificationForLecture(lecture) {
    if (!notificationSettings.lectureReminders) return;
    
    const now = new Date();
    const lectureDateTime = getNextLectureDateTime(lecture);
    
    if (lectureDateTime > now) {
        const reminderTime = new Date(lectureDateTime.getTime() - 30 * 60 * 1000); // 30 minutes before
        
        if (reminderTime > now) {
            const timeUntilReminder = reminderTime.getTime() - now.getTime();
            
            setTimeout(() => {
                sendLectureReminder(lecture);
            }, timeUntilReminder);
        }
    }
}

function getNextLectureDateTime(lecture) {
    const now = new Date();
    const dayIndex = daysOfWeek.ar.indexOf(lecture.day);
    const [hours, minutes] = lecture.time.split(':').map(Number);
    
    // Find next occurrence of this day
    let nextDate = new Date(now);
    nextDate.setHours(hours, minutes, 0, 0);
    
    const currentDayIndex = now.getDay();
    let daysUntilLecture = (dayIndex - currentDayIndex + 7) % 7;
    
    if (daysUntilLecture === 0 && nextDate <= now) {
        daysUntilLecture = 7; // Next week
    }
    
    nextDate.setDate(nextDate.getDate() + daysUntilLecture);
    return nextDate;
}

function sendLectureReminder(lecture) {
    const title = 'تذكير محاضرة - جامعتي';
    const body = `محاضرة ${lecture.name} ستبدأ خلال 30 دقيقة في ${lecture.location}`;
    
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            tag: `lecture-${lecture.id}`,
            requireInteraction: true,
            actions: [
                {
                    action: 'view',
                    title: 'عرض التفاصيل'
                }
            ]
        });
    }
    
    // Also show in-app notification
    showNotification(body, 'warning');
}

function setupNotificationScheduler() {
    // Schedule daily notifications
    if (notificationSettings.dailyNotifications) {
        scheduleDailyNotifications();
    }
    
    // Schedule lecture reminders
    lectures.forEach(lecture => {
        scheduleNotificationForLecture(lecture);
    });
}

function scheduleDailyNotifications() {
    const now = new Date();
    const [hours, minutes] = notificationSettings.dailyNotificationTime.split(':').map(Number);
    
    let nextNotification = new Date(now);
    nextNotification.setHours(hours, minutes, 0, 0);
    
    if (nextNotification <= now) {
        nextNotification.setDate(nextNotification.getDate() + 1);
    }
    
    const timeUntilNotification = nextNotification.getTime() - now.getTime();
    
    setTimeout(() => {
        sendDailyNotification();
        // Schedule next day
        setInterval(sendDailyNotification, 24 * 60 * 60 * 1000);
    }, timeUntilNotification);
}

function sendDailyNotification() {
    const today = new Date();
    const todayName = daysOfWeek.ar[today.getDay()];
    const todayLectures = lectures.filter(lecture => lecture.day === todayName);
    
    if (todayLectures.length > 0) {
        const title = 'برنامج اليوم - جامعتي';
        const body = `لديك ${todayLectures.length} محاضرة اليوم`;
        
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: '/icons/icon-192x192.png',
                badge: '/icons/badge-72x72.png',
                tag: 'daily-schedule',
                requireInteraction: false
            });
        }
    }
}

function updateNotificationBadge() {
    const badge = document.getElementById('notification-badge');
    if (badge) {
        const today = new Date();
        const todayName = daysOfWeek.ar[today.getDay()];
        const todayLectures = lectures.filter(lecture => lecture.day === todayName);
        badge.textContent = todayLectures.length;
    }
}

// Notification Settings Modal
function toggleNotifications() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load current settings
        document.getElementById('dailyNotifications').checked = notificationSettings.dailyNotifications;
        document.getElementById('dailyNotificationTime').value = notificationSettings.dailyNotificationTime;
        document.getElementById('lectureReminders').checked = notificationSettings.lectureReminders;
    }
}

function closeNotificationModal() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function saveNotificationSettings() {
    notificationSettings.dailyNotifications = document.getElementById('dailyNotifications').checked;
    notificationSettings.dailyNotificationTime = document.getElementById('dailyNotificationTime').value;
    notificationSettings.lectureReminders = document.getElementById('lectureReminders').checked;
    
    saveDataToStorage();
    closeNotificationModal();
    showNotification('تم حفظ إعدادات الإشعارات', 'success');
    
    // Restart notification scheduler
    setupNotificationScheduler();
}

// Language Functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    updateLanguageDisplay();
    saveDataToStorage();
}

function updateLanguageDisplay() {
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = currentLanguage === 'ar' ? 'EN' : 'AR';
    }
    
    // Update document direction
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-ar], [data-en]');
    translatableElements.forEach(element => {
        const translation = element.getAttribute(`data-${currentLanguage}`);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update placeholders
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const placeholder = searchInput.getAttribute(`data-${currentLanguage}-placeholder`);
        if (placeholder) {
            searchInput.placeholder = placeholder;
        }
    }
    
    // Update schedule display with new language
    displaySchedule();
}

// PDF Export Function
function exportToPDF() {
    showLoading();
    
    // Create a printable version
    const printContent = generatePrintableSchedule();
    
    // Open print dialog
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="${currentLanguage === 'ar' ? 'rtl' : 'ltr'}" lang="${currentLanguage}">
        <head>
            <meta charset="UTF-8">
            <title>برنامج المحاضرات - جامعتي</title>
            <style>
                body { font-family: 'Cairo', Arial, sans-serif; margin: 20px; direction: ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #667eea; padding-bottom: 20px; }
                .schedule-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                .day-column { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
                .day-header { background: #667eea; color: white; padding: 10px; text-align: center; font-weight: bold; }
                .lecture-card { padding: 15px; border-bottom: 1px solid #eee; }
                .lecture-card:last-child { border-bottom: none; }
                .lecture-name { font-weight: bold; margin-bottom: 5px; }
                .lecture-detail { margin: 3px 0; font-size: 14px; color: #666; }
                .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #888; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
        hideLoading();
    }, 500);
}

function generatePrintableSchedule() {
    const lecturesByDay = {};
    daysOfWeek[currentLanguage].forEach(day => {
        lecturesByDay[day] = [];
    });
    
    lectures.forEach(lecture => {
        if (lecturesByDay[lecture.day]) {
            lecturesByDay[lecture.day].push(lecture);
        }
    });
    
    Object.keys(lecturesByDay).forEach(day => {
        lecturesByDay[day].sort((a, b) => a.time.localeCompare(b.time));
    });
    
    const dayColumns = Object.entries(lecturesByDay).map(([day, dayLectures]) => `
        <div class="day-column">
            <div class="day-header">${day}</div>
            ${dayLectures.length === 0 ? 
                '<div class="lecture-card">لا توجد محاضرات</div>' :
                dayLectures.map(lecture => `
                    <div class="lecture-card">
                        <div class="lecture-name">${lecture.name} (${lecture.type})</div>
                        <div class="lecture-detail">⏰ ${formatTime(lecture.time)}</div>
                        ${lecture.professor ? `<div class="lecture-detail">👨‍🏫 ${lecture.professor}</div>` : ''}
                        <div class="lecture-detail">📍 ${lecture.location}</div>
                    </div>
                `).join('')
            }
        </div>
    `).join('');
    
    return `
        <div class="header">
            <h1>برنامج المحاضرات الأسبوعي</h1>
            <p>تم إنشاؤه بواسطة نظام جامعتي</p>
            <p>التاريخ: ${new Date().toLocaleDateString('ar-SA')}</p>
        </div>
        <div class="schedule-grid">
            ${dayColumns}
        </div>
        <div class="footer">
            <p>تم التطوير بواسطة ABDULLAH ALASAAD & ARX-Tech</p>
        </div>
    `;
}

// Utility Functions
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function showSchedule() {
    const scheduleSection = document.getElementById('scheduleSection');
    if (scheduleSection) {
        scheduleSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add some CSS for notifications
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    }
    
    .notification-success {
        border-left: 4px solid #48bb78;
    }
    
    .notification-error {
        border-left: 4px solid #f56565;
    }
    
    .notification-warning {
        border-left: 4px solid #ed8936;
    }
    
    .notification-info {
        border-left: 4px solid #667eea;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        padding: 4px;
        border-radius: 4px;
    }
    
    .notification-close:hover {
        background: #f5f5f5;
    }
    
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #666;
        grid-column: 1 / -1;
    }
    
    .empty-state i {
        font-size: 4rem;
        color: #667eea;
        margin-bottom: 20px;
    }
    
    .empty-state h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #333;
    }
    
    .empty-state p {
        margin-bottom: 20px;
    }
    
    .no-lectures {
        text-align: center;
        padding: 20px;
        color: #999;
        font-style: italic;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Service Worker for background notifications
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

