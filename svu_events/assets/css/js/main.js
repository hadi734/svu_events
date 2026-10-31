
/* البحث والتصفية في صفحة الفعاليات */

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");
const locationFilter = document.getElementById("locationFilter");
const resetFilters = document.getElementById("resetFilters");

const events = document.querySelectorAll(".event-item");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");

function filterEvents() {
    // قراءة قيم البحث والتصفية
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedDate = dateFilter.value;
    const selectedLocation = locationFilter.value;

    let visibleCount = 0;

    // المرور على جميع الفعاليات
    events.forEach(function (event) {
        const title = event.dataset.title.toLowerCase();
        const category = event.dataset.category;
        const date = event.dataset.date;
        const location = event.dataset.location;

        // مقارنة البيانات مع اختيارات المستخدم
        const matchesTitle = title.includes(searchText);
        const matchesCategory =
            selectedCategory === "" || category === selectedCategory;
        const matchesDate =
            selectedDate === "" || date === selectedDate;
        const matchesLocation =
            selectedLocation === "" || location === selectedLocation;

        // إظهار الفعالية إذا طابقت جميع الشروط
        if (
            matchesTitle &&
            matchesCategory &&
            matchesDate &&
            matchesLocation
        ) {
            event.classList.remove("d-none");
            visibleCount++;
        } else {
            event.classList.add("d-none");
        }
    });

    // تحديث عدد النتائج ورسالة عدم وجود نتائج
    resultsCount.textContent = "عدد الفعاليات: " + visibleCount;

    if (noResults) {
        noResults.classList.toggle("d-none", visibleCount !== 0);
    }
}

// تشغيل البحث عند تغيير أي حقل
if (searchInput) {
    searchInput.addEventListener("input", filterEvents);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterEvents);
}

if (dateFilter) {
    dateFilter.addEventListener("change", filterEvents);
}

if (locationFilter) {
    locationFilter.addEventListener("change", filterEvents);
}

// إعادة الحقول إلى حالتها الأصلية
if (resetFilters) {
    resetFilters.addEventListener("click", function () {
        searchInput.value = "";
        categoryFilter.value = "";
        dateFilter.value = "";
        locationFilter.value = "";

        filterEvents();
    });
}

/* عرض تفاصيل الفعالية المختارة */

// بيانات الفعاليات
const eventData = {
web: {
    title: "ورشة تطوير الويب",
    category: "تقنية",
    date: "15 نوفمبر 2026",
    location: "عن بُعد",
    organizer: "فريق تنظيم ورشة تطوير الويب",
    description: "ورشة تعليمية للتعرف على أساسيات HTML وCSS وكيفية بناء صفحات ويب بسيطة.",
    image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
},

    ai: {
        title: "ندوة الذكاء الاصطناعي",
        category: "ندوات",
        date: "20 نوفمبر 2026",
        location: "دمشق",
        organizer: "فريق تنظيم الندوة",
        description: "ندوة تعريفية تتناول تطبيقات الذكاء الاصطناعي ودوره في التعليم والتكنولوجيا.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80"
    },

    career: {
        title: "يوم التوظيف",
        category: "مهني",
        date: "5 ديسمبر 2026",
        location: "دمشق",
        organizer: "فريق تنظيم يوم التوظيف",
        description: "فعالية للتعرف على فرص العمل ومتطلبات سوق العمل وتطوير المهارات المهنية.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80"
    },

    security: {
        title: "أساسيات الأمن السيبراني",
        category: "تقنية",
        date: "12 ديسمبر 2026",
        location: "عن بُعد",
        organizer: "فريق تنظيم الأمن الرقمي",
        description: "فعالية تعريفية حول حماية المعلومات والأمان الرقمي وأساسيات الأمن السيبراني.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    },

    teamwork: {
        title: "مهارات العمل الجماعي",
        category: "علمي",
        date: "18 ديسمبر 2026",
        location: "دمشق",
        organizer: "فريق تنظيم الأنشطة الطلابية",
        description: "فعالية تهدف إلى تطوير مهارات التواصل والتعاون في المشاريع والعمل الجماعي.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80"
    },

    projects: {
        title: "مقدمة في إدارة المشاريع",
        category: "علمي",
        date: "25 ديسمبر 2026",
        location: "عن بُعد",
        organizer: "فريق تنظيم إدارة المشاريع",
        description: "مقدمة حول تخطيط المشاريع وتنظيم المهام ومتابعة مراحل تنفيذها.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
    }
};

// قراءة معرّف الفعالية من الرابط
const pageParameters = new URLSearchParams(window.location.search);
const eventId = pageParameters.get("id");

// جلب عناصر صفحة التفاصيل
const eventDetails = document.getElementById("eventDetails");
const eventNotFound = document.getElementById("eventNotFound");

if (eventDetails && eventNotFound) {
    const selectedEvent = eventData[eventId];

    if (selectedEvent) {
        document.getElementById("detailTitle").textContent =
            selectedEvent.title;

        document.getElementById("detailCategory").textContent =
            selectedEvent.category;

        document.getElementById("detailDate").textContent =
            selectedEvent.date;

        document.getElementById("detailLocation").textContent =
            selectedEvent.location;

        document.getElementById("detailOrganizer").textContent =
            selectedEvent.organizer;

        document.getElementById("detailDescription").textContent =
            selectedEvent.description;

        document.getElementById("detailImage").src =
            selectedEvent.image;

        document.getElementById("detailImage").alt =
            selectedEvent.title;

        document.title = selectedEvent.title + " | SVU Events";
    } else {
        eventDetails.classList.add("d-none");
        eventNotFound.classList.remove("d-none");
    }
}

// مشاركة الفعالية
const shareButton = document.getElementById("shareEvent");
const shareMessage = document.getElementById("shareMessage");

if (shareButton && shareMessage) {
    shareButton.addEventListener("click", async function () {
        const shareData = {
            title: document.title,
            text: "تعرّف على هذه الفعالية ضمن SVU Events",
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareData.url);

                shareMessage.textContent =
                    "تم نسخ رابط الفعالية. يمكنك مشاركته الآن.";

                shareMessage.classList.remove("d-none");
            } else {
                shareMessage.textContent =
                    "انسخ رابط الصفحة من شريط العنوان لمشاركته.";

                shareMessage.classList.remove("d-none");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                shareMessage.textContent =
                    "تعذرت المشاركة تلقائيًا. يمكنك نسخ رابط الصفحة يدويًا.";

                shareMessage.classList.remove("d-none");
            }
        }
    });
}
```javascript
/* التحقق من نموذج التواصل */

const contactForm = document.getElementById("contactForm");
const contactAlert = document.getElementById("contactAlert");

if (contactForm && contactAlert) {

    contactForm.addEventListener("submit", function (event) {

        // منع إرسال النموذج وإعادة تحميل الصفحة
        event.preventDefault();

        // التحقق من صحة الحقول
        if (!contactForm.checkValidity()) {

            contactForm.classList.add("was-validated");

            contactAlert.textContent =
                "يرجى التأكد من إدخال جميع المعلومات المطلوبة بشكل صحيح.";

            contactAlert.className = "alert alert-danger";

            return;
        }

        // عرض رسالة نجاح تجريبية
        contactAlert.textContent =
            "تم التحقق من بياناتك بنجاح. هذا نموذج تجريبي ولا يرسل الرسالة فعليًا.";

        contactAlert.className = "alert alert-success";

        // إعادة الحقول إلى حالتها الأولى
        contactForm.reset();
        contactForm.classList.remove("was-validated");
    });

    // مسح رسالة التنبيه عند إعادة ضبط النموذج
    contactForm.addEventListener("reset", function () {

        contactAlert.textContent = "";
        contactAlert.className = "alert d-none";

        contactForm.classList.remove("was-validated");
    });
}
```

