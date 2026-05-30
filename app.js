/* ==========================================================================
   LEGEND OF MIR 2 UZ SECRET - MULTI-PAGE APPLICATION ENGINE
   Featuring: Google Firebase (Auth & Real-time Cloud Firestore) + Local Fallback
   ========================================================================== */

// ==========================================================================
// 0. FIREBASE GLOBAL CONFIGURATION & INTEGRATION ENGINE
// ==========================================================================
// [IMPORTANT] Paste your free Firebase Web App config keys below!
const firebaseConfig = {
    apiKey: "AIzaSyDLy0MoIvsY5QxdOre5jI9kJRMjslSd7Mg",
    authDomain: "legendofmir2uzsecret.firebaseapp.com",
    projectId: "legendofmir2uzsecret",
    storageBucket: "legendofmir2uzsecret.firebasestorage.app",
    messagingSenderId: "148193196937",
    appId: "1:148193196937:web:a90cbdbe5dac5cd1497f58",
    measurementId: "G-9HQTY0HHRY"
};

const isFirebaseConfigured = firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("YOUR_");
let firebaseMode = false;
let auth = null;
let db = null;

// Firebase Modular SDK Imports (Initialized dynamically if configured)
let initializeApp, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged;
let getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc, updateDoc, query, orderBy, limit, onSnapshot, where, deleteDoc, serverTimestamp;

// Firebase will be initialized inside DOMContentLoaded dynamically to prevent top-level await syntax errors in some browsers.

// ==========================================================================
// 1. DYNAMIC TRANSLATION DICTIONARY
// ==========================================================================
const dictionary = {
    uz: {
        welcome_title: "MAXFIY AFSONAGA XUSH KELIBSIZ",
        server: "Server:",
        online: "FAOL",
        offline: "OFLAYN",
        online_players: "Tizimdagi o'yinchilar:",
        ping: "Ping:",
        guest_title: "Mehmon",
        guest_desc: "Ro'yxatdan o'tmagan",
        login_register: "Kirish / Ro'yxatdan o'tish",
        my_profile: "Mening profilim",
        logout: "Chiqish",
        navigation: "NAVIGATSIYA",
        nav_home: "Bosh sahifa & Yangiliklar",
        nav_forum: "Sayt Forumi",
        nav_chat: "Global Shoutbox Chat",
        nav_admin: "Admin Panel",
        server_info: "SERVER MA'LUMOTLARI",
        server_version: "Versiya:",
        server_exp: "Tajriba (EXP):",
        server_drop: "Drop darajasi:",
        server_uptime: "Uptime:",
        latest_news: "SO'NGGI YANGILIKLAR & PATCHLAR",
        add_news: "Yangilik qo'shish",
        forum_title: "LEGEND OF MIR 2 MUHOKAMALARI",
        new_topic: "Yangi mavzu ochish",
        cat_all: "Barcha mavzular",
        cat_general: "Umumiy suhbat",
        cat_guides: "Qo'llanmalar",
        cat_news: "Server Yangiliklari",
        cat_guilds: "Gildiyalar",
        cat_trade: "Savdo-sotiq",
        new_topic_header: "YANGI FORUM MAVZUSI YARATISH",
        back_to_forum: "Orqaga qaytish",
        topic_title_label: "Mavzu Sarlavhasi",
        topic_category_label: "Kategoriya",
        topic_content_label: "Mavzu mazmuni (Matni)",
        publish_topic: "Mavzuni e'lon qilish",
        back_to_topics: "Mavzular ro'yxatiga qaytish",
        comments_title: "Muhokamalar & Javoblar",
        comment_login_prompt: "Mavzuga javob yozish va muhokamada ishtirok etish uchun tizimga kiring.",
        login: "KIRISH",
        write_reply_label: "Fikr yoki javob yozing",
        send_reply: "Javobni yuborish",
        chat_login_prompt: "Chatda xabar yozish uchun ro'yxatdan o'tgan bo'lishingiz kerak.",
        admin_news_title: "RASMIY YANGILIK/PATCH KABLARI",
        news_title_label: "Yangilik sarlavhasi",
        news_image_label: "Tasvir URL (Ixtiyoriy)",
        news_content_label: "Yangilik matni (HTML ruxsat etiladi)",
        publish_news: "Yangilikni e'lon qilish",
        admin_user_manager: "FOYDALANUVCHILARNI BOSHQARISH",
        tbl_username: "Foydalanuvchi",
        tbl_role: "Rol / Daraja",
        tbl_likes: "Ballar",
        tbl_action: "Amal",
        top_players: "TOP O'YINCHILAR (FORUM)",
        shoutbox_preview: "SHOUTBOX MINI-CHAT",
        go_to_full_chat: "To'liq chatga o'tish",
        partner_links: "HAMKOR SAYTLAR",
        footer_credits: "Ushbu veb-portal o'yin ishqibozlari uchun yaratilgan jamoat portalidir. Mir 2 o'yini mualliflik huquqlari Wemade kompaniyasiga tegishlidir.",
        tab_login: "Kirish",
        tab_register: "Ro'yxatdan o'tish",
        lbl_username: "Foydalanuvchi nomi",
        lbl_password: "Parol",
        lbl_email: "Elektron pochta",
        lbl_avatar: "Avatar tanlang",
        btn_login: "TIZIMGA KIRISH",
        btn_register: "RO'YXATDAN O'TISH",
        user_profile_details: "FOYDALANUVCHI PROFILI",
        posts: "Postlar",
        likes: "Layklar",
        points: "Ballar",
        alert_login_success: "Tizimga muvaffaqiyatli kirdingiz!",
        alert_login_failed: "Foydalanuvchi nomi yoki parol xato!",
        alert_register_success: "Muvaffaqiyatli ro'yxatdan o'tdingiz! Endi tizimga kirishingiz mumkin.",
        alert_username_taken: "Bu foydalanuvchi nomi band!",
        alert_require_login: "Iltimos, avval tizimga kiring!",
        alert_fill_fields: "Barcha maydonlarni to'ldiring!",
        alert_unauthorized: "Ushbu sahifaga kirishga ruxsatingiz yo'q!"
    },
    ru: {
        welcome_title: "ДОБРО ПОЖАЛОВАТЬ В ТАИНСТВЕННУЮ ЛЕГЕНДУ",
        server: "Сервер:",
        online: "ОНЛАЙН",
        offline: "ОФФЛАЙН",
        online_players: "Игроков онлайн:",
        ping: "Пинг:",
        guest_title: "Гость",
        guest_desc: "Не зарегистрирован",
        login_register: "Войти / Регистрация",
        my_profile: "Мой профиль",
        logout: "Выйти",
        navigation: "НАВИГАЦИЯ",
        nav_home: "Главная & Новости",
        nav_forum: "Форум сайта",
        nav_chat: "Глобальный чат (Shoutbox)",
        nav_admin: "Админ Панель",
        server_info: "ИНФОРМАЦИЯ О СЕРВЕРЕ",
        server_version: "Версия:",
        server_exp: "Опыт (EXP):",
        server_drop: "Рейт дропа:",
        server_uptime: "Аптайм:",
        latest_news: "ПОСЛЕДНИЕ НОВОСТИ И ПАТЧИ",
        add_news: "Добавить новость",
        forum_title: "ОБСУЖДЕНИЯ LEGEND OF MIR 2",
        new_topic: "Создать тему",
        cat_all: "Все темы",
        cat_general: "Общий чат",
        cat_guides: "Гайды & Советы",
        cat_news: "Новости сервера",
        cat_guilds: "Гильдии",
        cat_trade: "Торговля",
        new_topic_header: "СОЗДАНИЕ НОВОЙ ТЕМЫ ФОРУМА",
        back_to_forum: "Назад к списку",
        topic_title_label: "Заголовок темы",
        topic_category_label: "Категория",
        topic_content_label: "Содержание темы (Текст)",
        publish_topic: "Опубликовать тему",
        back_to_topics: "Назад к списку тем",
        comments_title: "Обсуждения и Ответы",
        comment_login_prompt: "Пожалуйста, войдите в систему, чтобы оставить ответ в теме.",
        login: "ВОЙТИ",
        write_reply_label: "Напишите ответ или отзыв",
        send_reply: "Отправить ответ",
        chat_login_prompt: "Для отправки сообщений в чат вы должны быть авторизованы.",
        admin_news_title: "ОФИЦИАЛЬНЫЙ НОВОСТНОЙ КАНАЛ / ПАТЧИ",
        news_title_label: "Заголовок новости",
        news_image_label: "Изображение (Опционально)",
        news_content_label: "Текст новости (HTML разрешен)",
        publish_news: "Опубликовать новость",
        admin_user_manager: "УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ",
        tbl_username: "Пользователь",
        tbl_role: "Роль / Звание",
        tbl_likes: "Очки",
        tbl_action: "Действие",
        top_players: "ТОП ИГРОКОВ (ФОРУМ)",
        shoutbox_preview: "МИНИ-ЧАТ SHOUTBOX",
        go_to_full_chat: "Перейти в полный чат",
        partner_links: "ПАРТНЕРСКИЕ САЙТЫ",
        footer_credits: "Данный веб-портал создан фанатами игры для фанатов. Права на игру Legend of Mir 2 принадлежат компании Wemade.",
        tab_login: "Вход",
        tab_register: "Регистрация",
        lbl_username: "Имя пользователя",
        lbl_password: "Пароль",
        lbl_email: "Электронная почта",
        lbl_avatar: "Выберите аватар",
        btn_login: "ВОЙТИ В СИСТЕМУ",
        btn_register: "ЗАРЕГИСТРИРОВАТЬСЯ",
        user_profile_details: "ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ",
        posts: "Посты",
        likes: "Лайки",
        points: "Очки",
        alert_login_success: "Вы успешно вошли в систему!",
        alert_login_failed: "Неверное имя пользователя или пароль!",
        alert_register_success: "Регистрация прошла успешно! Теперь вы можете войти.",
        alert_username_taken: "Это имя пользователя уже занято!",
        alert_require_login: "Пожалуйста, войдите в систему сначала!",
        alert_fill_fields: "Заполните все поля!",
        alert_unauthorized: "У вас нет доступа к этой странице!"
    },
    en: {
        welcome_title: "WELCOME TO THE SECRET LEGEND",
        server: "Server:",
        online: "ONLINE",
        offline: "OFFLINE",
        online_players: "Online Players:",
        ping: "Ping:",
        guest_title: "Guest",
        guest_desc: "Not registered",
        login_register: "Login / Register",
        my_profile: "My Profile",
        logout: "Logout",
        navigation: "NAVIGATION",
        nav_home: "Home & News",
        nav_forum: "Site Forum",
        nav_chat: "Global Shoutbox Chat",
        nav_admin: "Admin Panel",
        server_info: "SERVER STATISTICS",
        server_version: "Version:",
        server_exp: "Experience (EXP):",
        server_drop: "Drop Rate:",
        server_uptime: "Uptime:",
        latest_news: "LATEST NEWS & PATCH NOTES",
        add_news: "Add News",
        forum_title: "LEGEND OF MIR 2 DISCUSSIONS",
        new_topic: "Create Topic",
        cat_all: "All Topics",
        cat_general: "General Chat",
        cat_guides: "Guides & Tutorials",
        cat_news: "Server News",
        cat_guilds: "Guilds",
        cat_trade: "Trade Marketplace",
        new_topic_header: "CREATE NEW FORUM TOPIC",
        back_to_forum: "Back to List",
        topic_title_label: "Topic Title",
        topic_category_label: "Category",
        topic_content_label: "Topic Content (Body Text)",
        publish_topic: "Publish Topic",
        back_to_topics: "Back to Topics List",
        comments_title: "Discussions & Replies",
        comment_login_prompt: "Please login to write a reply and join the discussion.",
        login: "LOGIN",
        write_reply_label: "Write your reply or feedback",
        send_reply: "Send Reply",
        chat_login_prompt: "You must be registered and logged in to post in shoutbox.",
        admin_news_title: "OFFICIAL SERVER NEWS & ANNOUNCEMENTS",
        news_title_label: "News Title",
        news_image_label: "Image URL (Optional)",
        news_content_label: "News Content (HTML Allowed)",
        publish_news: "Publish News Update",
        admin_user_manager: "USER ACCOUNT MANAGER",
        tbl_username: "User",
        tbl_role: "Role / Rank",
        tbl_likes: "Points",
        tbl_action: "Action",
        top_players: "TOP PLAYERS (FORUM)",
        shoutbox_preview: "MINI SHOUTBOX CHAT",
        go_to_full_chat: "Go to Full Chat",
        partner_links: "PARTNER WEBSITES",
        footer_credits: "This community web portal was built by fans for fans. All copyrights to Legend of Mir 2 belong to Wemade.",
        tab_login: "Login",
        tab_register: "Register",
        lbl_username: "Username",
        lbl_password: "Password",
        lbl_email: "Email Address",
        lbl_avatar: "Select Avatar",
        btn_login: "SIGN IN",
        btn_register: "CREATE ACCOUNT",
        user_profile_details: "USER PROFILE DETAILS",
        posts: "Posts",
        likes: "Likes",
        points: "Points",
        alert_login_success: "Successfully logged in!",
        alert_login_failed: "Invalid username or password!",
        alert_register_success: "Successfully registered! You can now log in.",
        alert_username_taken: "This username is already taken!",
        alert_require_login: "Please log in first!",
        alert_fill_fields: "Please fill all required fields!",
        alert_unauthorized: "You are not authorized to view this page!"
    }
};

// Global Active Language & User
let currentLang = 'uz';
let activeUser = null;

// ==========================================================================
// 2. SAFE STORAGE ENGINE (LOCAL STORAGE WITH IN-MEMORY FALLBACK)
// ==========================================================================
const memoryStorage = {};
const safeStorage = {
    getItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn("Storage restricted. Using memory fallback for key: " + key);
            return memoryStorage[key] || null;
        }
    },
    setItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn("Storage restricted. Using memory fallback for key: " + key);
            memoryStorage[key] = value;
        }
    },
    removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn("Storage restricted. Using memory fallback for key: " + key);
            delete memoryStorage[key];
        }
    }
};

// ==========================================================================
// 3. DATABASE CONTROLLER (LOCAL & FIREBASE INTEGRATED)
// ==========================================================================
class Database {
    static async init() {
        if (firebaseMode) {
            try {
                const usersRef = collection(db, "users");
                const snapshot = await getDocs(query(usersRef, limit(1)));
                if (snapshot.empty) {
                    await this.seedFirebase();
                }
            } catch (e) {
                console.error("Firestore seeding verification failed.", e);
            }
        } else {
            const users = this.getData('mir2_users');
            const hasOptimus = users.some(u => u.email === "optimusbrr@gmail.com");
            if (!hasOptimus) {
                try { localStorage.clear(); } catch (e) {}
                this.seedLocal();
            }
        }
    }

    static seedLocal() {
        const users = [
            {
                username: "optimusbrr",
                email: "optimusbrr@gmail.com",
                password: "Rambler2911aa",
                role: "SuperAdmin",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
                posts: 152,
                likes: 384,
                points: 920,
                regDate: "2026-05-30"
            },
            {
                username: "AdminUzSecret",
                email: "admin@mir2.uz",
                password: "adminsecret",
                role: "SuperAdmin",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
                posts: 124,
                likes: 312,
                points: 870,
                regDate: "2026-02-15"
            },
            {
                username: "DragonKnight",
                email: "dragon@gmail.com",
                password: "dragonsecret",
                role: "Moderator",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
                posts: 48,
                likes: 92,
                points: 330,
                regDate: "2026-03-01"
            },
            {
                username: "WarriorUz",
                email: "warrioruz@mail.ru",
                password: "password123",
                role: "Legendary Player",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo",
                posts: 26,
                likes: 45,
                points: 175,
                regDate: "2026-04-10"
            },
            {
                username: "TaoistSecrets",
                email: "taoist@yandex.ru",
                password: "password123",
                role: "Active Explorer",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
                posts: 14,
                likes: 21,
                points: 85,
                regDate: "2026-04-20"
            },
            {
                username: "WizardFanatic",
                email: "wizard@mir2.uz",
                password: "password123",
                role: "Newbie",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bella",
                posts: 3,
                likes: 2,
                points: 15,
                regDate: "2026-05-18"
            }
        ];

        const news = [
            {
                id: 1,
                title: "Legend of Mir 2 UZ SECRET - Serverning Rasmiy O'yin Boshlanishi!",
                content: `Salom, aziz jangchilar! Biz sizga mamnuniyat bilan <strong>Legend of Mir 2 UZ SECRET</strong> serverining rasmiy ochilishini e'lon qilamiz. Server o'zbek o'yinchilari uchun maxsus va eng yuqori darajada sozlangan bo'lib, mukammal barqarorlikka ega. Saytimiz orqali siz o'z fikrlaringizni o'rtoqlashishingiz, savdo-sotiq qilishingiz va yangi do'stlar topishingiz mumkin. Serverimizga qo'shiling va haqiqiy jang afsonasiga aylaning!`,
                image: "banner.png",
                date: "2026-05-28",
                author: "AdminUzSecret",
                category: "news"
            },
            {
                id: 2,
                title: "Patch 1.2: Gildiyalar Urushi va Maxsus Item Drop Tizimi!",
                content: `Yangi yangilanishda biz bir qator ajoyib o'zgarishlarni kiritdik:
                <ul>
                    <li>Gildiya urushlari (Guild Sabuk Wall War) tizimi to'liq optimallashtirildi va mukofotlar ko'paytirildi.</li>
                    <li>Sabuk qal'asini bosib olgan gildiyaga maxsus oltin sovrinlar beriladi.</li>
                    <li>Bosslardan tushadigan noyob asbob-uskunalar (items) drop foizlari biroz ko'tarildi!</li>
                    <li>O'yindagi mayda xatoliklar (bugs) bartaraf etildi va server pongi yanada yaxshilandi.</li>
                </ul>
                Barcha jangchilarga jang maydonida omad tilaymiz!`,
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
                date: "2026-05-29",
                author: "AdminUzSecret",
                category: "patch"
            }
        ];

        const topics = [
            {
                id: 101,
                title: "Mir2uzSecret Serverining Asosiy O'yin Qoidalari!",
                category: "news",
                content: `Assalomu alaykum Legend of Mir 2 UZ SECRET hamjamiyati!
                O'yinimiz barcha foydalanuvchilar uchun qulay va yoqimli bo'lishi maqsadida quyidagi qoidalarga amal qilishingizni so'raymiz:
                
                1. O'yinda boshqa o'yinchilarni haqorat qilish, kamsitish taqiqlanadi (Ban xavfi!).
                2. Noqonuniy dasturlardan (cheats/hacks) foydalanish butunlay taqiqlanadi va account o'chirilishiga olib keladi.
                3. Har qanday xatolik (bug) topsangiz, uni o'z manfaatingiz uchun ishlatmasdan, darhol Adminlarga xabar bering.
                4. O'yin ichidagi savdolarni faqat xavfsiz zonada amalga oshiring.
                
                Qoidalarni buzgan o'yinchilarga nisbatan moderatorlar tarafidan jazo choralari (mute/ban) qo'llaniladi. E'tiboringiz uchun rahmat!`,
                author: "AdminUzSecret",
                date: "2026-05-27 14:32",
                likes: 12,
                likedBy: [],
                comments: [
                    {
                        id: 201,
                        author: "DragonKnight",
                        content: "Qoidalar juda to'g'ri shakllantirilgan. Serverda tartib birinchi o'rinda!",
                        date: "2026-05-27 15:10"
                    },
                    {
                        id: 202,
                        author: "WarriorUz",
                        content: "Tushunarli, barcha qoidalarga amal qilamiz. Loyihaga omad!",
                        date: "2026-05-27 16:45"
                    }
                ]
            },
            {
                id: 102,
                title: "Yangi boshlovchilar uchun leveling (1-40 Level) qo'llanmasi!",
                category: "guides",
                content: `Salom hammaga! Ko'pchilik yangi kelganlar qanday qilib tez darajani (Level) oshirish haqida so'rashmoqda. Quyida sizga kichik qo'llanma taqdim etaman:
                
                * Level 1-7: Bichon shahrining atrofida joylagan yovvoyi mushuklar (Cats) va kiyiklarni (Deers) o'ldiring.
                * Level 7-15: Bichon g'origa (Bichon Cave) yo'l oling va Skeletlarni ovlang.
                * Level 15-22: Natural Cave yoki Wooma Temple birinchi qavatlarida zombilar bilan jang qiling.
                * Level 22-35: Stone Tomb (Cho'l g'ori) eng mukammal joy hisoblanadi. Guruh (Party) bo'lib kirsangiz ko'p EXP olasiz.
                
                Qandaydir savollar bo'lsa, pastda yozib qoldiring! Omad!`,
                author: "DragonKnight",
                date: "2026-05-28 09:15",
                likes: 8,
                likedBy: [],
                comments: [
                    {
                        id: 203,
                        author: "WizardFanatic",
                        content: "Katta rahmat! 22 levelda tiqilib qolgandim, Stone Tombga borib ko'raman.",
                        date: "2026-05-28 11:20"
                    }
                ]
            }
        ];

        const chat = [
            {
                username: "WarriorUz",
                role: "Legendary Player",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo",
                message: "Salom hammaga! Serverda kimdir savdo qilyaptimi?",
                time: "20:30",
                timestamp: Date.now() - 300000
            },
            {
                username: "TaoistSecrets",
                role: "Active Explorer",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
                message: "Salom! Men yangi qilich sotmoqchiman, level 25 dagi.",
                time: "20:32",
                timestamp: Date.now() - 150000
            },
            {
                username: "DragonKnight",
                role: "Moderator",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
                message: "Hamma gaplar savdo-sotiq bo'limida muhokama qilinsin. Qoidalarga rioya qilamiz do'stlar.",
                time: "20:35",
                timestamp: Date.now() - 5000
            }
        ];

        safeStorage.setItem('mir2_users', JSON.stringify(users));
        safeStorage.setItem('mir2_news', JSON.stringify(news));
        safeStorage.setItem('mir2_topics', JSON.stringify(topics));
        safeStorage.setItem('mir2_chat', JSON.stringify(chat));
    }

    static async seedFirebase() {
        console.log("🔥 Seeding Cloud Firestore with default premium data...");
        // Re-use seed lists
        const users = [
            {
                username: "optimusbrr",
                email: "optimusbrr@gmail.com",
                password: "Rambler2911aa",
                role: "SuperAdmin",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
                posts: 152,
                likes: 384,
                points: 920,
                regDate: "2026-05-30"
            },
            {
                username: "AdminUzSecret",
                email: "admin@mir2.uz",
                password: "adminsecret",
                role: "SuperAdmin",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
                posts: 124,
                likes: 312,
                points: 870,
                regDate: "2026-02-15"
            },
            {
                username: "DragonKnight",
                email: "dragon@gmail.com",
                password: "dragonsecret",
                role: "Moderator",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
                posts: 48,
                likes: 92,
                points: 330,
                regDate: "2026-03-01"
            },
            {
                username: "WarriorUz",
                email: "warrioruz@mail.ru",
                password: "password123",
                role: "Legendary Player",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo",
                posts: 26,
                likes: 45,
                points: 175,
                regDate: "2026-04-10"
            }
        ];

        const news = [
            {
                title: "Legend of Mir 2 UZ SECRET - Serverning Rasmiy O'yin Boshlanishi!",
                content: `Salom, aziz jangchilar! Biz sizga mamnuniyat bilan <strong>Legend of Mir 2 UZ SECRET</strong> serverining rasmiy ochilishini e'lon qilamiz. Server o'zbek o'yinchilari uchun maxsus va eng yuqori darajada sozlangan bo'lib, mukammal barqarorlikka ega. Saytimiz orqali siz o'z fikrlaringizni o'rtoqlashishingiz, savdo-sotiq qilishingiz va yangi do'stlar topishingiz mumkin. Serverimizga qo'shiling va haqiqiy jang afsonasiga aylaning!`,
                image: "banner.png",
                date: "2026-05-28",
                author: "AdminUzSecret",
                category: "news",
                timestamp: Date.now() - 86400000
            },
            {
                title: "Patch 1.2: Gildiyalar Urushi va Maxsus Item Drop Tizimi!",
                content: `Yangi yangilanishda biz bir qator ajoyib o'zgarishlarni kiritdik:
                <ul>
                    <li>Gildiya urushlari (Guild Sabuk Wall War) tizimi to'liq optimallashtirildi va mukofotlar ko'paytirildi.</li>
                    <li>Sabuk qal'asini bosib olgan gildiyaga maxsus oltin sovrinlar beriladi.</li>
                    <li>Bosslardan tushadigan noyob asbob-uskunalar (items) drop foizlari biroz ko'tarildi!</li>
                    <li>O'yindagi mayda xatoliklar (bugs) bartaraf etildi va server pongi yanada yaxshilandi.</li>
                </ul>
                Barcha jangchilarga jang maydonida omad tilaymiz!`,
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
                date: "2026-05-29",
                author: "AdminUzSecret",
                category: "patch",
                timestamp: Date.now()
            }
        ];

        const topics = [
            {
                title: "Mir2uzSecret Serverining Asosiy O'yin Qoidalari!",
                category: "news",
                content: `Assalomu alaykum Legend of Mir 2 UZ SECRET hamjamiyati!
                O'yinimiz barcha foydalanuvchilar uchun qulay va yoqimli bo'lishi maqsadida quyidagi qoidalarga amal qilishingizni so'raymiz:
                
                1. O'yinda boshqa o'yinchilarni haqorat qilish, kamsitish taqiqlanadi (Ban xavfi!).
                2. Noqonuniy dasturlardan (cheats/hacks) foydalanish va account o'chirilishiga olib keladi.
                3. Har qanday xatolik (bug) topsangiz, uni o'z manfaatingiz uchun ishlatmasdan, darhol Adminlarga xabar bering.
                4. O'yin ichidagi savdolarni faqat xavfsiz zonada amalga oshiring.
                
                Qoidalarni buzgan o'yinchilarga nisbatan moderatorlar tarafidan jazo choralari qo'llaniladi. E'tiboringiz uchun rahmat!`,
                author: "AdminUzSecret",
                date: "2026-05-27 14:32",
                timestamp: Date.now() - 172800000,
                likes: 12,
                likedBy: [],
                comments: [
                    {
                        author: "DragonKnight",
                        content: "Qoidalar juda to'g'ri shakllantirilgan. Serverda tartib birinchi o'rinda!",
                        date: "2026-05-27 15:10"
                    },
                    {
                        author: "WarriorUz",
                        content: "Tushunarli, barcha qoidalarga amal qilamiz. Loyihaga omad!",
                        date: "2026-05-27 16:45"
                    }
                ]
            }
        ];

        const chat = [
            {
                username: "WarriorUz",
                role: "Legendary Player",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo",
                message: "Salom hammaga! Serverda kimdir savdo qilyaptimi?",
                time: "20:30",
                timestamp: Date.now() - 100000
            },
            {
                username: "TaoistSecrets",
                role: "Active Explorer",
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
                message: "Salom! Men yangi qilich sotmoqchiman, level 25 dagi.",
                time: "20:32",
                timestamp: Date.now() - 50000
            }
        ];

        // Seed to Firestore
        for (const user of users) {
            await setDoc(doc(db, "users", "seed_" + user.username), user);
        }
        for (const item of news) {
            await addDoc(collection(db, "news"), item);
        }
        for (const topic of topics) {
            await addDoc(collection(db, "forum_topics"), topic);
        }
        for (const msg of chat) {
            await addDoc(collection(db, "chat_messages"), msg);
        }
        console.log("🔥 Firestore database seeding complete!");
    }

    static getData(key) {
        return JSON.parse(safeStorage.getItem(key)) || [];
    }

    static setData(key, data) {
        safeStorage.setItem(key, JSON.stringify(data));
    }
}

// ==========================================================================
// 4. MAIN APPLICATION ORCHESTRATOR
// ==========================================================================
document.addEventListener("DOMContentLoaded", async () => {
    
    // Dynamic Route/Page Checking
    const activePage = document.body.getAttribute("data-page");

    // Initialize Firebase dynamically to avoid top-level await syntax issues
    if (isFirebaseConfigured) {
        try {
            const firebaseAppModule = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
            const firebaseAuthModule = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
            const firebaseFirestoreModule = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');

            initializeApp = firebaseAppModule.initializeApp;
            
            getAuth = firebaseAuthModule.getAuth;
            signInWithEmailAndPassword = firebaseAuthModule.signInWithEmailAndPassword;
            createUserWithEmailAndPassword = firebaseAuthModule.createUserWithEmailAndPassword;
            signOut = firebaseAuthModule.signOut;
            onAuthStateChanged = firebaseAuthModule.onAuthStateChanged;
            
            getFirestore = firebaseFirestoreModule.getFirestore;
            collection = firebaseFirestoreModule.collection;
            addDoc = firebaseFirestoreModule.addDoc;
            getDoc = firebaseFirestoreModule.getDoc;
            getDocs = firebaseFirestoreModule.getDocs;
            doc = firebaseFirestoreModule.doc;
            setDoc = firebaseFirestoreModule.setDoc;
            updateDoc = firebaseFirestoreModule.updateDoc;
            query = firebaseFirestoreModule.query;
            orderBy = firebaseFirestoreModule.orderBy;
            limit = firebaseFirestoreModule.limit;
            onSnapshot = firebaseFirestoreModule.onSnapshot;
            where = firebaseFirestoreModule.where;
            deleteDoc = firebaseFirestoreModule.deleteDoc;
            serverTimestamp = firebaseFirestoreModule.serverTimestamp;

            const app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
            firebaseMode = true;
            console.log("🔥 Google Firebase connected successfully in Global Real-time Mode!");
        } catch (e) {
            console.error("Firebase connection failed. Falling back to Local Mode.", e);
            firebaseMode = false;
        }
    } else {
        console.log("🔔 Running in Local Mode. Paste your configuration keys in app.js to enable global database syncing!");
    }

    // Initialize Database (Seeds collections if needed)
    await Database.init();

    // Render Gold-Crimson banner if in Local Storage Mode
    if (!firebaseMode) {
        showLocalModeBanner();
    }

    // RESTORE ACTIVE SESSION (Local Mode only; Firebase uses Auth state hooks)
    if (firebaseMode) {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Fetch profile
                const userDocRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userDocRef);
                if (userSnap.exists()) {
                    activeUser = userSnap.data();
                    activeUser.uid = user.uid; // store referenced UID
                } else {
                    // Check if it was a seeded username login conversion
                    activeUser = null;
                }
            } else {
                activeUser = null;
            }
            updateUserUI();
            renderRatings();
            
            // Execute route triggers
            if (activePage === 'admin') {
                if (!activeUser || (activeUser.role !== 'SuperAdmin' && activeUser.role !== 'Admin')) {
                    alert(getLocaleWord('alert_unauthorized'));
                    window.location.href = "index.html";
                } else {
                    renderAdminUsers();
                }
            }
        });
    } else {
        const savedUser = safeStorage.getItem('mir2_active_user');
        if (savedUser) {
            try {
                activeUser = JSON.parse(savedUser);
            } catch (e) {
                safeStorage.removeItem('mir2_active_user');
            }
        }
        updateUserUI();
        renderRatings();
        
        // Admin security check
        if (activePage === 'admin') {
            if (!activeUser || (activeUser.role !== 'SuperAdmin' && activeUser.role !== 'Admin')) {
                alert(getLocaleWord('alert_unauthorized'));
                window.location.href = "index.html";
                return;
            }
            renderAdminUsers();
        }
    }

    // RESTORE ACTIVE LANGUAGE
    const savedLang = safeStorage.getItem('mir2_lang');
    if (savedLang) {
        currentLang = savedLang;
    }
    
    // Set language switcher button state active
    const activeLangBtn = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
    if (activeLangBtn) {
        document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
        activeLangBtn.classList.add("active");
    }
    
    translatePage(currentLang);

    // ==========================================================================
    // SERVER REAL-TIME STATUS SYNC (Firestore / Local Fallback)
    // ==========================================================================
    const updateServerStatusUI = (statusData) => {
        const topPlayerCountEl = document.getElementById("top-player-count");
        const statusDotEl = document.querySelector(".status-dot");
        const onlineTextEl = document.querySelector(".online-text");
        
        if (statusData) {
            const isOnline = statusData.online;
            const players = statusData.playersOnline !== undefined ? statusData.playersOnline : 0;
            const maxPlayers = statusData.playersMax !== undefined ? statusData.playersMax : 1000;
            
            if (topPlayerCountEl) {
                topPlayerCountEl.textContent = `${players} / ${maxPlayers}`;
            }
            
            if (statusDotEl) {
                if (isOnline) {
                    statusDotEl.className = "status-dot online animate-pulse";
                } else {
                    statusDotEl.className = "status-dot offline";
                }
            }
            
            if (onlineTextEl) {
                onlineTextEl.setAttribute("data-i18n", isOnline ? "online" : "offline");
                onlineTextEl.textContent = getLocaleWord(isOnline ? 'online' : 'offline');
                if (isOnline) {
                    onlineTextEl.classList.remove("text-danger");
                    onlineTextEl.classList.add("text-success");
                } else {
                    onlineTextEl.classList.remove("text-success");
                    onlineTextEl.classList.add("text-danger");
                }
            }
        }
    };

    if (firebaseMode) {
        try {
            onSnapshot(doc(db, "server_status", "status"), (docSnap) => {
                if (docSnap.exists()) {
                    updateServerStatusUI(docSnap.data());
                } else {
                    // Seed initial offline status in Firestore if not exists
                    setDoc(doc(db, "server_status", "status"), {
                        online: false,
                        playersOnline: 0,
                        playersMax: 1000,
                        lastUpdated: serverTimestamp()
                    });
                }
            });
        } catch (e) {
            console.error("Failed to set up server status real-time sync:", e);
        }
    } else {
        // Local fallback (Simulated live update / periodic toggle)
        setInterval(() => {
            const simulatedPlayers = Math.floor(Math.random() * 20) + 150; // simulated
            updateServerStatusUI({
                online: true,
                playersOnline: simulatedPlayers,
                playersMax: 1000
            });
        }, 5000);
        // Instant trigger on page load
        updateServerStatusUI({
            online: true,
            playersOnline: 174,
            playersMax: 1000
        });
    }

    // INITIAL RENDER PAGE SPECIFIC PANELS & SIDEBARS
    renderSidebarShoutbox();

    if (activePage === 'home') {
        renderNews();
    } else if (activePage === 'forum') {
        renderForumTopics();
    } else if (activePage === 'chat') {
        renderShoutbox();
        scrollChatToBottom();
    }

    // ==========================================================================
    // 5. COMMON DOM EVENT BINDINGS (WITH NULL PROTECTION)
    // ==========================================================================
    
    // Language selection
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            langBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentLang = btn.getAttribute("data-lang");
            safeStorage.setItem('mir2_lang', currentLang);
            translatePage(currentLang);
            
            // Re-render
            renderRatings();
            renderSidebarShoutbox();
            if (activePage === 'home') renderNews();
            if (activePage === 'forum') renderForumTopics();
            if (activePage === 'chat') renderShoutbox();
        });
    });

    // Auth modal toggles
    const authModal = document.getElementById("auth-modal");
    const openLoginBtn = document.getElementById("open-login-btn");
    const closeAuthBtn = document.getElementById("close-auth-modal-btn");
    
    if (openLoginBtn && authModal) {
        openLoginBtn.addEventListener("click", () => authModal.classList.remove("hidden"));
    }
    if (closeAuthBtn && authModal) {
        closeAuthBtn.addEventListener("click", () => authModal.classList.add("hidden"));
    }
    if (authModal) {
        authModal.addEventListener("click", (e) => {
            if (e.target === authModal) authModal.classList.add("hidden");
        });
    }

    // Dynamic triggers in guest prompt boxes
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("open-login-trigger") && authModal) {
            authModal.classList.remove("hidden");
        }
    });

    const tabLogin = document.getElementById("modal-tab-login");
    const tabRegister = document.getElementById("modal-tab-register");
    const loginFormBox = document.getElementById("modal-login-form-box");
    const registerFormBox = document.getElementById("modal-register-form-box");

    if (tabLogin && tabRegister && loginFormBox && registerFormBox) {
        tabLogin.addEventListener("click", () => {
            tabLogin.classList.add("active");
            tabRegister.classList.remove("active");
            loginFormBox.classList.remove("hidden");
            registerFormBox.classList.add("hidden");
        });
        tabRegister.addEventListener("click", () => {
            tabRegister.classList.add("active");
            tabLogin.classList.remove("active");
            registerFormBox.classList.remove("hidden");
            loginFormBox.classList.add("hidden");
        });
    }

    // Login logic (Firebase Auth / Local Fallback)
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("login-username").value.trim();
            const passwordInput = document.getElementById("login-password").value;

            if (firebaseMode) {
                try {
                    const usersRef = collection(db, "users");
                    let email = usernameInput;
                    let foundUser = null;
                    let targetDocId = null;

                    // Query Firestore by username or email
                    if (!usernameInput.includes("@")) {
                        const q = query(usersRef, where("username", "==", usernameInput));
                        const qs = await getDocs(q);
                        if (!qs.empty) {
                            foundUser = qs.docs[0].data();
                            targetDocId = qs.docs[0].id;
                            email = foundUser.email;
                        }
                    } else {
                        const q = query(usersRef, where("email", "==", usernameInput));
                        const qs = await getDocs(q);
                        if (!qs.empty) {
                            foundUser = qs.docs[0].data();
                            targetDocId = qs.docs[0].id;
                        }
                    }

                    if (!foundUser) {
                        alert(getLocaleWord('alert_login_failed'));
                        return;
                    }

                    let userCredential;
                    try {
                        userCredential = await signInWithEmailAndPassword(auth, email, passwordInput);
                    } catch (authError) {
                        // Handle pre-seeded user login on the fly!
                        if ((authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential') && foundUser.password === passwordInput) {
                            // Register on Auth programmatically
                            userCredential = await createUserWithEmailAndPassword(auth, email, passwordInput);
                            // Link profile to the real UID doc
                            await setDoc(doc(db, "users", userCredential.user.uid), foundUser);
                        } else {
                            throw authError;
                        }
                    }

                    alert(getLocaleWord('alert_login_success'));
                    if (authModal) authModal.classList.add("hidden");
                    loginForm.reset();
                    if (activePage === 'admin') window.location.reload();
                } catch (error) {
                    console.error("Login failed.", error);
                    let errMsg = getLocaleWord('alert_login_failed');
                    if (error.code === 'auth/api-key-not-valid' || (error.message && error.message.includes('api-key-not-valid'))) {
                        errMsg = "Firebase API Kaliti (apiKey) noto'g'ri yoki yaroqsiz! Iltimos, Firebase Console -> Project Settings bo'limidan to'g'ri 'Web API Key'ni olib, app.js faylidagi firebaseConfig-ga joylashtiring.";
                    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                        errMsg = "Elektron pochta yoki parol noto'g'ri!";
                    }
                    alert(errMsg);
                }
            } else {
                const users = Database.getData('mir2_users');
                const user = users.find(u => (u.username.toLowerCase() === usernameInput.toLowerCase() || u.email.toLowerCase() === usernameInput.toLowerCase()) && u.password === passwordInput);

                if (user) {
                    activeUser = user;
                    safeStorage.setItem('mir2_active_user', JSON.stringify(activeUser));
                    alert(getLocaleWord('alert_login_success'));
                    updateUserUI();
                    if (authModal) authModal.classList.add("hidden");
                    loginForm.reset();
                    if (activePage === 'admin') window.location.reload();
                } else {
                    alert(getLocaleWord('alert_login_failed'));
                }
            }
        });
    }

    // Register logic (Firebase / Local Fallback)
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("register-username").value.trim();
            const emailInput = document.getElementById("register-email").value.trim();
            const passwordInput = document.getElementById("register-password").value;
            const avatarInput = document.getElementById("register-avatar").value;

            if (usernameInput.length < 3 || passwordInput.length < 6) {
                alert(getLocaleWord('alert_fill_fields'));
                return;
            }

            if (firebaseMode) {
                try {
                    const usersRef = collection(db, "users");
                    const q = query(usersRef, where("username", "==", usernameInput));
                    const qs = await getDocs(q);
                    if (!qs.empty) {
                        alert(getLocaleWord('alert_username_taken'));
                        return;
                    }

                    const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
                    const uid = userCredential.user.uid;

                    const newUser = {
                        username: usernameInput,
                        email: emailInput,
                        password: passwordInput, // stored for backward compatibility
                        role: "Newbie",
                        avatar: avatarInput,
                        posts: 0,
                        likes: 0,
                        points: 0,
                        regDate: new Date().toISOString().split('T')[0]
                    };

                    await setDoc(doc(db, "users", uid), newUser);
                    alert(getLocaleWord('alert_register_success'));
                    if (tabLogin) tabLogin.click();
                    registerForm.reset();
                } catch (error) {
                    console.error("Firebase Registration failed.", error);
                    let errMsg = error.message || getLocaleWord('alert_fill_fields');
                    if (error.code === 'auth/api-key-not-valid' || (error.message && error.message.includes('api-key-not-valid'))) {
                        errMsg = "Firebase API Kaliti (apiKey) noto'g'ri yoki yaroqsiz! Iltimos, Firebase Console -> Project Settings bo'limidan to'g'ri 'Web API Key'ni olib, app.js faylidagi firebaseConfig-ga joylashtiring.";
                    } else if (error.code === 'auth/email-already-in-use') {
                        errMsg = "Ushbu elektron pochta manzili allaqachon ro'yxatdan o'tkazilgan!";
                    } else if (error.code === 'auth/weak-password') {
                        errMsg = "Parol juda kuchsiz! Parol kamida 6 ta belgidan iborat bo'lishi kerak.";
                    } else if (error.code === 'auth/invalid-email') {
                        errMsg = "Elektron pochta manzili noto'g'ri formatda kiritildi!";
                    }
                    alert(errMsg);
                }
            } else {
                const users = Database.getData('mir2_users');
                const isTaken = users.some(u => u.username.toLowerCase() === usernameInput.toLowerCase());

                if (isTaken) {
                    alert(getLocaleWord('alert_username_taken'));
                    return;
                }

                const newUser = {
                    username: usernameInput,
                    email: emailInput,
                    password: passwordInput,
                    role: "Newbie",
                    avatar: avatarInput,
                    posts: 0,
                    likes: 0,
                    points: 0,
                    regDate: new Date().toISOString().split('T')[0]
                };

                users.push(newUser);
                Database.setData('mir2_users', users);

                alert(getLocaleWord('alert_register_success'));
                if (tabLogin) tabLogin.click();
                registerForm.reset();
            }
        });
    }

    // Logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            if (firebaseMode) {
                await signOut(auth);
            } else {
                activeUser = null;
                safeStorage.removeItem('mir2_active_user');
                updateUserUI();
            }
            if (activePage === 'admin') {
                window.location.href = "index.html";
            }
        });
    }

    // Sidebar profiles modal trigger
    const openMyProfileBtn = document.getElementById("open-my-profile-btn");
    if (openMyProfileBtn) {
        openMyProfileBtn.addEventListener("click", () => {
            if (activeUser) showUserProfileModal(activeUser.username);
        });
    }

    // Profile modal closures
    const profileModal = document.getElementById("profile-modal");
    const closeProfileBtn = document.getElementById("close-profile-modal-btn");
    if (closeProfileBtn && profileModal) {
        closeProfileBtn.addEventListener("click", () => profileModal.classList.add("hidden"));
    }
    if (profileModal) {
        profileModal.addEventListener("click", (e) => {
            if (e.target === profileModal) profileModal.classList.add("hidden");
        });
    }

    // ==========================================================================
    // 6. PAGE-SPECIFIC CONTROLLERS (FORUM)
    // ==========================================================================
    if (activePage === 'forum') {
        const createTopicBtn = document.getElementById("create-topic-btn");
        const cancelCreateTopicBtn = document.getElementById("cancel-create-topic-btn");
        const createTopicForm = document.getElementById("create-topic-form");
        const backToTopicsBtn = document.getElementById("back-to-topics-btn");
        const commentReplyForm = document.getElementById("comment-reply-form");

        // Topic creation view switch
        if (createTopicBtn) {
            createTopicBtn.addEventListener("click", () => {
                if (!activeUser) {
                    alert(getLocaleWord('alert_require_login'));
                    if (authModal) authModal.classList.remove("hidden");
                    return;
                }
                document.getElementById("forum-list-view").classList.add("hidden");
                document.getElementById("forum-create-view").classList.remove("hidden");
                document.getElementById("forum-detail-view").classList.add("hidden");
            });
        }

        if (cancelCreateTopicBtn) {
            cancelCreateTopicBtn.addEventListener("click", () => {
                document.getElementById("forum-list-view").classList.remove("hidden");
                document.getElementById("forum-create-view").classList.add("hidden");
            });
        }

        // Save Topic Form (Firebase / Local Fallback)
        if (createTopicForm) {
            createTopicForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                if (!activeUser) return;

                const title = document.getElementById("topic-title").value.trim();
                const category = document.getElementById("topic-category").value;
                const content = document.getElementById("topic-content").value.trim();

                if (firebaseMode) {
                    await addDoc(collection(db, "forum_topics"), {
                        title: title,
                        category: category,
                        content: content,
                        author: activeUser.username,
                        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                        timestamp: Date.now(),
                        likes: 0,
                        likedBy: [],
                        comments: []
                    });
                    await recalculateUserPoints(activeUser.username);
                } else {
                    const topics = Database.getData('mir2_topics');
                    const newTopic = {
                        id: Date.now(),
                        title: title,
                        category: category,
                        content: content,
                        author: activeUser.username,
                        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                        likes: 0,
                        likedBy: [],
                        comments: []
                    };
                    topics.push(newTopic);
                    Database.setData('mir2_topics', topics);
                    recalculateUserPoints(activeUser.username);
                }

                createTopicForm.reset();
                document.getElementById("forum-create-view").classList.add("hidden");
                document.getElementById("forum-list-view").classList.remove("hidden");
                
                if (!firebaseMode) {
                    renderForumTopics();
                    renderRatings();
                }
            });
        }

        // Go Back Detail view button
        if (backToTopicsBtn) {
            backToTopicsBtn.addEventListener("click", () => {
                document.getElementById("forum-detail-view").classList.add("hidden");
                document.getElementById("forum-list-view").classList.remove("hidden");
                if (!firebaseMode) renderForumTopics();
            });
        }

        // Forum Category Filters
        const categoryFilters = document.querySelectorAll(".filter-btn");
        categoryFilters.forEach(btn => {
            btn.addEventListener("click", () => {
                categoryFilters.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentCategoryFilter = btn.getAttribute("data-category");
                renderForumTopics();
            });
        });

        // Forum comment submission
        if (commentReplyForm) {
            commentReplyForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                if (!activeUser || !activeTopicId) return;

                const text = document.getElementById("comment-text").value.trim();

                if (firebaseMode) {
                    const docRef = doc(db, "forum_topics", activeTopicId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const topic = docSnap.data();
                        const newComments = [...topic.comments];
                        
                        const newComment = {
                            id: Date.now(),
                            author: activeUser.username,
                            content: text,
                            date: new Date().toISOString().replace('T', ' ').substring(0, 16)
                        };
                        
                        newComments.push(newComment);
                        await updateDoc(docRef, {
                            comments: newComments
                        });

                        await recalculateUserPoints(activeUser.username);
                        commentReplyForm.reset();
                        openTopicDetail(activeTopicId);
                    }
                } else {
                    const topicList = Database.getData('mir2_topics');
                    const t = topicList.find(x => x.id === activeTopicId);

                    const newComment = {
                        id: Date.now(),
                        author: activeUser.username,
                        content: text,
                        date: new Date().toISOString().replace('T', ' ').substring(0, 16)
                    };

                    t.comments.push(newComment);
                    Database.setData('mir2_topics', topicList);

                    recalculateUserPoints(activeUser.username);
                    commentReplyForm.reset();
                    openTopicDetail(activeTopicId);
                    renderRatings();
                }
            });
        }
    }

    // ==========================================================================
    // 7. PAGE-SPECIFIC CONTROLLERS (CHAT)
    // ==========================================================================
    if (activePage === 'chat') {
        const chatSendForm = document.getElementById("chat-send-form");
        if (chatSendForm) {
            chatSendForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                if (!activeUser) return;

                const input = document.getElementById("chat-message-input");
                const msgText = input.value.trim();
                if (!msgText) return;

                const timeNow = new Date().toTimeString().split(' ')[0].substring(0, 5);

                if (firebaseMode) {
                    await addDoc(collection(db, "chat_messages"), {
                        username: activeUser.username,
                        role: activeUser.role,
                        avatar: activeUser.avatar,
                        message: msgText,
                        time: timeNow,
                        timestamp: Date.now()
                    });
                } else {
                    const chat = Database.getData('mir2_chat');
                    const newMsg = {
                        username: activeUser.username,
                        role: activeUser.role,
                        avatar: activeUser.avatar,
                        message: msgText,
                        time: timeNow,
                        timestamp: Date.now()
                    };
                    chat.push(newMsg);
                    if (chat.length > 50) chat.shift();
                    Database.setData('mir2_chat', chat);
                    
                    renderShoutbox();
                    renderSidebarShoutbox();
                    scrollChatToBottom();
                }
                input.value = "";
            });
        }
    }

    // ==========================================================================
    // 8. PAGE-SPECIFIC CONTROLLERS (ADMIN)
    // ==========================================================================
    if (activePage === 'admin') {
        const adminNewsForm = document.getElementById("admin-news-form");
        if (adminNewsForm) {
            adminNewsForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                if (!activeUser || (activeUser.role !== 'SuperAdmin' && activeUser.role !== 'Admin')) return;

                const title = document.getElementById("news-title").value.trim();
                const imageUrl = document.getElementById("news-image").value;
                const content = document.getElementById("news-content").value.trim();

                if (firebaseMode) {
                    await addDoc(collection(db, "news"), {
                        title: title,
                        content: content,
                        image: imageUrl,
                        date: new Date().toISOString().split('T')[0],
                        author: activeUser.username,
                        category: "news",
                        timestamp: Date.now()
                    });
                } else {
                    const news = Database.getData('mir2_news');
                    const newPost = {
                        id: Date.now(),
                        title: title,
                        content: content,
                        image: imageUrl,
                        date: new Date().toISOString().split('T')[0],
                        author: activeUser.username,
                        category: "news"
                    };
                    news.push(newPost);
                    Database.setData('mir2_news', news);
                }

                adminNewsForm.reset();
                alert("Yangilik muvaffaqiyatli e'lon qilindi!");
                window.location.href = "index.html";
            });
        }
    }
});

// ==========================================================================
// 9. DYNAMIC RENDER PROCEDURES & FUNCTIONS
// ==========================================================================
function updateUserUI() {
    const guestView = document.getElementById("guest-view");
    const userView = document.getElementById("user-view");
    const navAdmin = document.getElementById("nav-item-admin");

    if (activeUser) {
        if (guestView) guestView.classList.add("hidden");
        if (userView) userView.classList.remove("hidden");

        const displayNameEl = document.getElementById("user-display-name");
        const avatarEl = document.getElementById("user-avatar");
        const roleEl = document.getElementById("user-display-role");

        if (displayNameEl) displayNameEl.textContent = activeUser.username;
        if (avatarEl) avatarEl.src = activeUser.avatar;
        if (roleEl) {
            roleEl.textContent = activeUser.role;
            roleEl.className = "role-badge " + activeUser.role.toLowerCase().replace(" ", "-");
        }

        const statPostsEl = document.getElementById("stat-posts");
        const statLikesEl = document.getElementById("stat-likes");
        const statPointsEl = document.getElementById("stat-points");

        if (statPostsEl) statPostsEl.textContent = activeUser.posts || 0;
        if (statLikesEl) statLikesEl.textContent = activeUser.likes || 0;
        if (statPointsEl) statPointsEl.textContent = activeUser.points || 0;

        // Admin panel visibility
        if (navAdmin) {
            if (activeUser.role === 'SuperAdmin' || activeUser.role === 'Admin') {
                navAdmin.classList.remove("hidden");
            } else {
                navAdmin.classList.add("hidden");
            }
        }

        // News creation button
        const addNewsBtn = document.getElementById("admin-create-news-btn");
        if (addNewsBtn) {
            if (activeUser.role === 'SuperAdmin' || activeUser.role === 'Admin') {
                addNewsBtn.classList.remove("hidden");
            } else {
                addNewsBtn.classList.add("hidden");
            }
        }

        // Comments & Shoutbox forms
        const commentForm = document.getElementById("comment-reply-form");
        const commentPrompt = document.getElementById("comment-form-guest-prompt");
        if (commentForm) commentForm.classList.remove("hidden");
        if (commentPrompt) commentPrompt.classList.add("hidden");

        const chatForm = document.getElementById("chat-send-form");
        const chatPrompt = document.getElementById("chat-guest-prompt");
        if (chatForm) chatForm.classList.remove("hidden");
        if (chatPrompt) chatPrompt.classList.add("hidden");

    } else {
        if (guestView) guestView.classList.remove("hidden");
        if (userView) userView.classList.add("hidden");
        if (navAdmin) navAdmin.classList.add("hidden");
        
        const addNewsBtn = document.getElementById("admin-create-news-btn");
        if (addNewsBtn) addNewsBtn.classList.add("hidden");

        const commentForm = document.getElementById("comment-reply-form");
        const commentPrompt = document.getElementById("comment-form-guest-prompt");
        if (commentForm) commentForm.classList.add("hidden");
        if (commentPrompt) commentPrompt.classList.remove("hidden");

        const chatForm = document.getElementById("chat-send-form");
        const chatPrompt = document.getElementById("chat-guest-prompt");
        if (chatForm) chatForm.classList.add("hidden");
        if (chatPrompt) chatPrompt.classList.remove("hidden");
    }
}

async function recalculateUserPoints(username) {
    if (firebaseMode) {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username));
            const qs = await getDocs(q);
            if (!qs.empty) {
                const userDocSnap = qs.docs[0];
                const user = userDocSnap.data();
                const userDocRef = doc(db, "users", userDocSnap.id);

                const topicsQ = query(collection(db, "forum_topics"));
                const topicsSnap = await getDocs(topicsQ);

                let topicsCreated = 0;
                let commentsWritten = 0;
                let likesReceived = user.likes || 0;

                topicsSnap.forEach(docSnap => {
                    const topic = docSnap.data();
                    if (topic.author === username) topicsCreated++;
                    if (topic.comments) {
                        topic.comments.forEach(c => {
                            if (c.author === username) commentsWritten++;
                        });
                    }
                });

                const posts = topicsCreated + commentsWritten;
                const points = (likesReceived * 5) + (posts * 5) + (topicsCreated * 10);

                let newRole = user.role;
                const staffRoles = ['SuperAdmin', 'Admin', 'Moderator'];
                if (!staffRoles.includes(user.role)) {
                    if (points >= 300) {
                        newRole = "Legendary Player";
                    } else if (points >= 60) {
                        newRole = "Active Explorer";
                    } else {
                        newRole = "Newbie";
                    }
                }

                await updateDoc(userDocRef, {
                    posts: posts,
                    points: points,
                    role: newRole
                });

                if (activeUser && activeUser.username === username) {
                    activeUser.posts = posts;
                    activeUser.points = points;
                    activeUser.role = newRole;
                    updateUserUI();
                }
            }
        } catch (e) {
            console.error("Firebase recalculate points error.", e);
        }
    } else {
        const users = Database.getData('mir2_users');
        const user = users.find(u => u.username === username);
        if (!user) return;

        const topics = Database.getData('mir2_topics');
        let topicsCreated = topics.filter(t => t.author === username).length;
        let commentsWritten = 0;
        let likesReceived = user.likes || 0;

        topics.forEach(t => {
            t.comments.forEach(c => {
                if (c.author === username) commentsWritten++;
            });
        });

        user.posts = topicsCreated + commentsWritten;
        user.points = (likesReceived * 5) + (user.posts * 5) + (topicsCreated * 10);

        const staffRoles = ['SuperAdmin', 'Admin', 'Moderator'];
        if (!staffRoles.includes(user.role)) {
            if (user.points >= 300) {
                user.role = "Legendary Player";
            } else if (user.points >= 60) {
                user.role = "Active Explorer";
            } else {
                user.role = "Newbie";
            }
        }

        Database.setData('mir2_users', users);
        
        if (activeUser && activeUser.username === username) {
            activeUser = user;
            safeStorage.setItem('mir2_active_user', JSON.stringify(activeUser));
            updateUserUI();
        }
    }
}

// ==========================================================================
// 10. HOMEPAGE & NEWS LOADER
// ==========================================================================
function renderNews() {
    const container = document.getElementById("news-container");
    if (!container) return;

    if (firebaseMode) {
        const newsQuery = query(collection(db, "news"), orderBy("timestamp", "desc"));
        onSnapshot(newsQuery, (snapshot) => {
            container.innerHTML = "";
            const newsList = [];
            snapshot.forEach(docSnap => {
                const data = docSnap.data();
                data.id = docSnap.id;
                newsList.push(data);
            });
            displayNewsItems(newsList, container);
        });
    } else {
        const newsList = Database.getData('mir2_news');
        container.innerHTML = "";
        const sortedNews = [...newsList].reverse();
        displayNewsItems(sortedNews, container);
    }
}

function displayNewsItems(newsList, container) {
    if (newsList.length === 0) {
        container.innerHTML = `<div class="news-card" style="padding:20px; text-align:center;">Hozircha yangiliklar yo'q.</div>`;
        return;
    }

    newsList.forEach(item => {
        const card = document.createElement("article");
        card.className = "news-card";

        const imageUrl = item.image.startsWith("http") || item.image.endsWith(".png") ? item.image : "banner.png";

        card.innerHTML = `
            <div class="news-image" style="background-image: url('${imageUrl}')">
                <div class="news-image-overlay"></div>
                <span class="news-meta-category">${item.category.toUpperCase()}</span>
            </div>
            <div class="news-body">
                <div class="news-date"><i class="fa-regular fa-clock"></i> ${item.date}</div>
                <h3>${item.title}</h3>
                <div class="news-text">${item.content}</div>
                <div class="news-footer">
                    <div class="news-author">
                        <i class="fa-solid fa-crown text-gold"></i>
                        <span class="news-author-name"><strong>${item.author}</strong></span>
                    </div>
                    ${activeUser && (activeUser.role === 'SuperAdmin' || activeUser.role === 'Admin') ? 
                        `<button class="btn btn-sm btn-danger btn-crimson delete-news-btn" data-id="${item.id}">
                            <i class="fa-solid fa-trash"></i> O'chirish
                         </button>` : ''
                    }
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    const delBtns = container.querySelectorAll(".delete-news-btn");
    delBtns.forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");
            if (confirm("Ushbu yangilikni o'chirib tashlamoqchimisiz?")) {
                if (firebaseMode) {
                    await deleteDoc(doc(db, "news", id));
                } else {
                    const intId = parseInt(id);
                    let list = Database.getData('mir2_news');
                    list = list.filter(n => n.id !== intId);
                    Database.setData('mir2_news', list);
                    renderNews();
                }
            }
        });
    });
}

// ==========================================================================
// 11. FORUM RENDERS & ACTIONS
// ==========================================================================
let currentCategoryFilter = 'all';
let activeTopicId = null;

function renderForumTopics() {
    const container = document.getElementById("topics-list-container");
    if (!container) return;

    if (firebaseMode) {
        const q = query(collection(db, "forum_topics"), orderBy("timestamp", "desc"));
        onSnapshot(q, (snapshot) => {
            const topics = [];
            snapshot.forEach(docSnap => {
                const data = docSnap.data();
                data.id = docSnap.id;
                topics.push(data);
            });
            displayForumTopics(topics, container);
        });
    } else {
        const topics = Database.getData('mir2_topics');
        const sorted = [...topics].reverse();
        displayForumTopics(sorted, container);
    }
}

async function displayForumTopics(topics, container) {
    container.innerHTML = "";

    let filteredTopics = topics;
    if (currentCategoryFilter !== 'all') {
        filteredTopics = topics.filter(t => t.category === currentCategoryFilter);
    }

    if (filteredTopics.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-muted);">
            <i class="fa-solid fa-box-open" style="font-size: 2rem; margin-bottom: 10px; display:block;"></i>
            Hech qanday muhokama mavzusi topilmadi.
        </div>`;
        return;
    }

    // Resolve user avatars for forum threads dynamically
    let localUsers = [];
    if (!firebaseMode) {
        localUsers = Database.getData('mir2_users');
    }

    for (const topic of filteredTopics) {
        let avatar = "https://api.dicebear.com/7.x/adventurer/svg?seed=guest";
        if (firebaseMode) {
            try {
                // Find author profile in Firestore
                const q = query(collection(db, "users"), where("username", "==", topic.author));
                const qs = await getDocs(q);
                if (!qs.empty) avatar = qs.docs[0].data().avatar;
            } catch (e) {}
        } else {
            const authorData = localUsers.find(u => u.username === topic.author);
            if (authorData) avatar = authorData.avatar;
        }

        const row = document.createElement("div");
        row.className = "topic-row";
        row.innerHTML = `
            <img src="${avatar}" class="topic-avatar" alt="Avatar">
            <div class="topic-info">
                <h4>${topic.title}</h4>
                <div class="topic-meta">
                    <span class="topic-category-tag">${topic.category}</span>
                    <span class="topic-author-name">${topic.author}</span>
                    <span><i class="fa-regular fa-clock"></i> ${topic.date}</span>
                </div>
            </div>
            <div class="topic-stats">
                <div class="topic-stat-item">
                    <span class="topic-stat-num">${topic.comments ? topic.comments.length : 0}</span>
                    <span class="topic-stat-label">${getLocaleWord('posts')}</span>
                </div>
                <div class="topic-stat-item">
                    <span class="topic-stat-num text-gold">${topic.likes}</span>
                    <span class="topic-stat-label">${getLocaleWord('likes')}</span>
                </div>
            </div>
        `;

        row.addEventListener("click", () => {
            openTopicDetail(topic.id);
        });

        container.appendChild(row);
    }
}

window.openTopicDetail = async function(id) {
    activeTopicId = id;
    let topic = null;
    let authorData = { role: "Newbie", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=guest" };

    if (firebaseMode) {
        const docRef = doc(db, "forum_topics", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return;
        topic = docSnap.data();
        topic.id = id;

        try {
            const q = query(collection(db, "users"), where("username", "==", topic.author));
            const qs = await getDocs(q);
            if (!qs.empty) authorData = qs.docs[0].data();
        } catch (e) {}
    } else {
        const topics = Database.getData('mir2_topics');
        topic = topics.find(t => t.id === id);
        if (!topic) return;

        const users = Database.getData('mir2_users');
        authorData = users.find(u => u.username === topic.author) || authorData;
    }

    document.getElementById("forum-list-view").classList.add("hidden");
    document.getElementById("forum-create-view").classList.add("hidden");
    document.getElementById("forum-detail-view").classList.remove("hidden");

    // Detail Admin Actions
    const adminActionsBox = document.getElementById("detail-admin-actions");
    adminActionsBox.innerHTML = "";

    if (activeUser && (activeUser.role === 'SuperAdmin' || activeUser.role === 'Admin' || activeUser.role === 'Moderator')) {
        adminActionsBox.innerHTML = `
            <button class="btn btn-sm btn-danger btn-crimson" id="admin-delete-topic-btn">
                <i class="fa-solid fa-trash-can"></i> Mavzuni o'chirish
            </button>
        `;
        document.getElementById("admin-delete-topic-btn").addEventListener("click", async () => {
            if (confirm("Haqiqatan ham ushbu muhokama mavzusini o'chirmoqchimisiz?")) {
                if (firebaseMode) {
                    await deleteDoc(doc(db, "forum_topics", id));
                } else {
                    let list = Database.getData('mir2_topics');
                    list = list.filter(t => t.id !== id);
                    Database.setData('mir2_topics', list);
                }
                document.getElementById("back-to-topics-btn").click();
            }
        });
    }

    const detailCard = document.getElementById("detail-topic-card");
    const hasLiked = activeUser ? topic.likedBy.includes(activeUser.username) : false;

    detailCard.innerHTML = `
        <div class="post-header">
            <div class="post-author-info">
                <img src="${authorData.avatar}" class="topic-avatar pointer" onclick="showUserProfileModal('${topic.author}')" alt="Avatar">
                <div class="post-author-details">
                    <div class="post-author-name-wrapper">
                        <h4 class="pointer" onclick="showUserProfileModal('${topic.author}')">${topic.author}</h4>
                        <span class="role-badge ${authorData.role.toLowerCase().replace(" ", "-")}">${authorData.role}</span>
                    </div>
                    <span class="post-date"><i class="fa-regular fa-clock"></i> ${topic.date}</span>
                </div>
            </div>
            <span class="topic-category-tag">${topic.category}</span>
        </div>
        <h2 class="post-title text-gold" style="font-family: var(--font-body); font-size:1.4rem; margin-bottom:15px;">${topic.title}</h2>
        <div class="post-body">${escapeHTML(topic.content)}</div>
        <div class="post-footer">
            <button class="post-like-btn ${hasLiked ? 'liked' : ''}" id="like-topic-btn">
                <i class="fa-solid fa-heart"></i> 
                <span id="topic-likes-label">${topic.likes}</span>
            </button>
        </div>
    `;

    // Like bindings
    document.getElementById("like-topic-btn").addEventListener("click", async () => {
        if (!activeUser) {
            alert(getLocaleWord('alert_require_login'));
            const authModal = document.getElementById("auth-modal");
            if (authModal) authModal.classList.remove("hidden");
            return;
        }

        if (firebaseMode) {
            const docRef = doc(db, "forum_topics", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const t = docSnap.data();
                const userIndex = t.likedBy.indexOf(activeUser.username);
                let newLikedBy = [...t.likedBy];
                let newLikes = t.likes;

                if (userIndex === -1) {
                    newLikedBy.push(activeUser.username);
                    newLikes += 1;
                    await incrementUserLikes(t.author, 1);
                } else {
                    newLikedBy.splice(userIndex, 1);
                    newLikes -= 1;
                    await incrementUserLikes(t.author, -1);
                }

                await updateDoc(docRef, {
                    likedBy: newLikedBy,
                    likes: newLikes
                });

                await recalculateUserPoints(t.author);
                openTopicDetail(id);
            }
        } else {
            let topicList = Database.getData('mir2_topics');
            let t = topicList.find(x => x.id === id);
            const userIndex = t.likedBy.indexOf(activeUser.username);
            
            const dbUsers = Database.getData('mir2_users');
            const targetAuthor = dbUsers.find(u => u.username === t.author);

            if (userIndex === -1) {
                t.likedBy.push(activeUser.username);
                t.likes += 1;
                if (targetAuthor) targetAuthor.likes = (targetAuthor.likes || 0) + 1;
            } else {
                t.likedBy.splice(userIndex, 1);
                t.likes -= 1;
                if (targetAuthor) targetAuthor.likes = Math.max(0, (targetAuthor.likes || 0) - 1);
            }

            Database.setData('mir2_topics', topicList);
            Database.setData('mir2_users', dbUsers);

            recalculateUserPoints(t.author);
            openTopicDetail(id);
            renderRatings();
        }
    });

    renderComments(topic.comments || [], topic.id);
};

async function incrementUserLikes(username, val) {
    try {
        const q = query(collection(db, "users"), where("username", "==", username));
        const qs = await getDocs(q);
        if (!qs.empty) {
            const userDocRef = doc(db, "users", qs.docs[0].id);
            const currentLikes = qs.docs[0].data().likes || 0;
            await updateDoc(userDocRef, {
                likes: Math.max(0, currentLikes + val)
            });
        }
    } catch (e) {
        console.error("Firestore increment likes failed.", e);
    }
}

async function renderComments(comments, topicId) {
    const container = document.getElementById("comments-list-container");
    const countEl = document.getElementById("comments-count");
    if (!container || !countEl) return;

    countEl.textContent = comments.length;
    container.innerHTML = "";

    if (comments.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted); font-size: 0.88rem;">
            Ushbu mavzuda fikrlar yo'q. Birinchilardan bo'lib javob yozing!
        </div>`;
        return;
    }

    let localUsers = [];
    if (!firebaseMode) {
        localUsers = Database.getData('mir2_users');
    }

    for (const [index, comment] of comments.entries()) {
        let commentAuthorData = { role: "Newbie", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=guest" };
        if (firebaseMode) {
            try {
                const q = query(collection(db, "users"), where("username", "==", comment.author));
                const qs = await getDocs(q);
                if (!qs.empty) commentAuthorData = qs.docs[0].data();
            } catch (e) {}
        } else {
            commentAuthorData = localUsers.find(u => u.username === comment.author) || commentAuthorData;
        }

        const cCard = document.createElement("div");
        cCard.className = "comment-card";
        cCard.innerHTML = `
            <div class="comment-header">
                <div class="post-author-info">
                    <img src="${commentAuthorData.avatar}" class="topic-avatar pointer" onclick="showUserProfileModal('${comment.author}')" style="width:34px; height:34px;" alt="Avatar">
                    <div class="post-author-details">
                        <div class="post-author-name-wrapper">
                            <h5 class="pointer" style="color:#ffffff; font-weight:600;" onclick="showUserProfileModal('${comment.author}')">${comment.author}</h5>
                            <span class="role-badge ${commentAuthorData.role.toLowerCase().replace(" ", "-")}" style="font-size:0.6rem; padding: 1px 6px; margin: 0;">${commentAuthorData.role}</span>
                        </div>
                        <span class="post-date" style="font-size:0.7rem;"><i class="fa-regular fa-clock"></i> ${comment.date}</span>
                    </div>
                </div>
                ${activeUser && (activeUser.role === 'SuperAdmin' || activeUser.role === 'Admin' || activeUser.role === 'Moderator') ?
                    `<button class="btn btn-sm btn-danger btn-crimson delete-comment-btn" style="padding: 3px 8px; font-size:0.65rem;" data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>
                     </button>` : ''
                }
            </div>
            <div class="comment-body">${escapeHTML(comment.content)}</div>
        `;
        container.appendChild(cCard);
    }

    const delCommentBtns = container.querySelectorAll(".delete-comment-btn");
    delCommentBtns.forEach(btn => {
        btn.addEventListener("click", async () => {
            const commentIndex = parseInt(btn.getAttribute("data-index"));
            if (confirm("Ushbu fikrni o'chirib yubormoqchimisiz?")) {
                if (firebaseMode) {
                    const docRef = doc(db, "forum_topics", topicId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const t = docSnap.data();
                        const newComments = [...t.comments];
                        const deletedAuthor = newComments[commentIndex].author;
                        
                        newComments.splice(commentIndex, 1);
                        await updateDoc(docRef, {
                            comments: newComments
                        });

                        await recalculateUserPoints(deletedAuthor);
                        openTopicDetail(topicId);
                    }
                } else {
                    const topicList = Database.getData('mir2_topics');
                    const t = topicList.find(x => x.id === topicId);
                    
                    const deletedAuthor = t.comments[commentIndex].author;
                    t.comments.splice(commentIndex, 1);
                    
                    Database.setData('mir2_topics', topicList);
                    
                    recalculateUserPoints(deletedAuthor);
                    openTopicDetail(topicId);
                }
            }
        });
    });
}

// ==========================================================================
// 12. SHOUTBOX LIVE CHAT LOADS (REALTIME / LOCAL FALLBACK)
// ==========================================================================
function renderShoutbox() {
    const fullChatLog = document.getElementById("chat-messages-log");
    if (!fullChatLog) return;

    if (firebaseMode) {
        const chatQuery = query(collection(db, "chat_messages"), orderBy("timestamp", "asc"));
        onSnapshot(chatQuery, (snapshot) => {
            fullChatLog.innerHTML = "";
            snapshot.forEach(docSnap => {
                const msg = docSnap.data();
                const row = document.createElement("div");
                row.className = "chat-msg-row";
                const badgeClass = msg.role.toLowerCase().replace(" ", "-");
                row.innerHTML = `
                    <img src="${msg.avatar}" class="chat-msg-avatar pointer" onclick="showUserProfileModal('${msg.username}')" alt="Avatar">
                    <div class="chat-msg-content">
                        <div class="chat-msg-header">
                            <span class="chat-msg-user pointer" onclick="showUserProfileModal('${msg.username}')">${msg.username}</span>
                            <span class="role-badge ${badgeClass}" style="font-size:0.6rem; padding: 1px 6px; margin:0;">${msg.role}</span>
                            <span class="chat-msg-time">${msg.time}</span>
                        </div>
                        <div class="chat-msg-text">${escapeHTML(msg.message)}</div>
                    </div>
                `;
                fullChatLog.appendChild(row);
            });
            scrollChatToBottom();
        });
    } else {
        const chatLogs = Database.getData('mir2_chat');
        fullChatLog.innerHTML = "";
        chatLogs.forEach(msg => {
            const row = document.createElement("div");
            row.className = "chat-msg-row";
            const badgeClass = msg.role.toLowerCase().replace(" ", "-");
            row.innerHTML = `
                <img src="${msg.avatar}" class="chat-msg-avatar pointer" onclick="showUserProfileModal('${msg.username}')" alt="Avatar">
                <div class="chat-msg-content">
                    <div class="chat-msg-header">
                        <span class="chat-msg-user pointer" onclick="showUserProfileModal('${msg.username}')">${msg.username}</span>
                        <span class="role-badge ${badgeClass}" style="font-size:0.6rem; padding: 1px 6px; margin:0;">${msg.role}</span>
                        <span class="chat-msg-time">${msg.time}</span>
                    </div>
                    <div class="chat-msg-text">${escapeHTML(msg.message)}</div>
                </div>
            `;
            fullChatLog.appendChild(row);
        });
    }
}

function renderSidebarShoutbox() {
    const sidebarChatList = document.getElementById("mini-chat-list");
    if (!sidebarChatList) return;

    if (firebaseMode) {
        const chatQuery = query(collection(db, "chat_messages"), orderBy("timestamp", "asc"));
        onSnapshot(chatQuery, (snapshot) => {
            sidebarChatList.innerHTML = "";
            const chatLogs = [];
            snapshot.forEach(docSnap => {
                chatLogs.push(docSnap.data());
            });
            const recent = chatLogs.slice(-8);
            recent.forEach(msg => {
                const mRow = document.createElement("div");
                mRow.className = "mini-chat-msg";
                mRow.innerHTML = `
                    <span class="mini-chat-user pointer" onclick="showUserProfileModal('${msg.username}')">${msg.username}:</span> 
                    <span class="mini-chat-text">${escapeHTML(msg.message)}</span>
                `;
                sidebarChatList.appendChild(mRow);
            });
            sidebarChatList.scrollTop = sidebarChatList.scrollHeight;
        });
    } else {
        const chatLogs = Database.getData('mir2_chat');
        sidebarChatList.innerHTML = "";
        const recent = chatLogs.slice(-8);
        recent.forEach(msg => {
            const mRow = document.createElement("div");
            mRow.className = "mini-chat-msg";
            mRow.innerHTML = `
                <span class="mini-chat-user pointer" onclick="showUserProfileModal('${msg.username}')">${msg.username}:</span> 
                <span class="mini-chat-text">${escapeHTML(msg.message)}</span>
            `;
            sidebarChatList.appendChild(mRow);
        });
        sidebarChatList.scrollTop = sidebarChatList.scrollHeight;
    }
}

function scrollChatToBottom() {
    const fullChatLog = document.getElementById("chat-messages-log");
    if (fullChatLog) fullChatLog.scrollTop = fullChatLog.scrollHeight;
}

// ==========================================================================
// 13. SIDEBAR TOP FORUM USERS RATINGS
// ==========================================================================
function renderRatings() {
    const ratingList = document.getElementById("top-users-rating-list");
    if (!ratingList) return;

    if (firebaseMode) {
        const q = query(collection(db, "users"), orderBy("points", "desc"), limit(5));
        onSnapshot(q, (snapshot) => {
            ratingList.innerHTML = "";
            let index = 0;
            snapshot.forEach(docSnap => {
                const user = docSnap.data();
                const item = document.createElement("li");
                item.className = "rating-item";
                const rankNum = index + 1;
                const badgeClass = user.role.toLowerCase().replace(" ", "-");

                item.innerHTML = `
                    <span class="rating-num rank-${rankNum}">${rankNum}</span>
                    <img src="${user.avatar}" class="rating-item-avatar pointer" onclick="showUserProfileModal('${user.username}')" alt="Avatar">
                    <div class="rating-item-info">
                        <span class="rating-name" onclick="showUserProfileModal('${user.username}')">${user.username}</span>
                        <span class="rating-badge role-badge ${badgeClass}" style="font-size:0.55rem; padding: 0px 5px; margin: 0; display: inline-block;">${user.role}</span>
                    </div>
                    <div class="rating-points">${user.points}</div>
                `;
                ratingList.appendChild(item);
                index++;
            });
        });
    } else {
        const users = Database.getData('mir2_users');
        const sorted = [...users].sort((a, b) => b.points - a.points);
        const top5 = sorted.slice(0, 5);

        ratingList.innerHTML = "";
        top5.forEach((user, index) => {
            const item = document.createElement("li");
            item.className = "rating-item";
            const rankNum = index + 1;
            const badgeClass = user.role.toLowerCase().replace(" ", "-");

            item.innerHTML = `
                <span class="rating-num rank-${rankNum}">${rankNum}</span>
                <img src="${user.avatar}" class="rating-item-avatar pointer" onclick="showUserProfileModal('${user.username}')" alt="Avatar">
                <div class="rating-item-info">
                    <span class="rating-name" onclick="showUserProfileModal('${user.username}')">${user.username}</span>
                    <span class="rating-badge role-badge ${badgeClass}" style="font-size:0.55rem; padding: 0px 5px; margin: 0; display: inline-block;">${user.role}</span>
                </div>
                <div class="rating-points">${user.points}</div>
            `;
            ratingList.appendChild(item);
        });
    }
}

// ==========================================================================
// 14. ADMINISTRATIVE DASHBOARD
// ==========================================================================
function renderAdminUsers() {
    const tableBody = document.getElementById("admin-users-table-body");
    if (!tableBody) return;

    if (firebaseMode) {
        const q = query(collection(db, "users"));
        onSnapshot(q, (snapshot) => {
            tableBody.innerHTML = "";
            snapshot.forEach(docSnap => {
                const user = docSnap.data();
                user.id = docSnap.id; // bind firestore document ID
                const tr = document.createElement("tr");
                const isSuperAdmin = user.role === 'SuperAdmin';
                const disableSelector = isSuperAdmin || (activeUser.role === 'Admin' && user.role === 'Admin') || (activeUser.username === user.username);

                const dropdown = `
                    <select class="admin-role-select" data-docid="${user.id}" data-username="${user.username}" ${disableSelector ? 'disabled' : ''}>
                        <option value="Newbie" ${user.role === 'Newbie' ? 'selected' : ''}>Newbie</option>
                        <option value="Active Explorer" ${user.role === 'Active Explorer' ? 'selected' : ''}>Active Explorer</option>
                        <option value="Legendary Player" ${user.role === 'Legendary Player' ? 'selected' : ''}>Legendary Player</option>
                        <option value="Moderator" ${user.role === 'Moderator' ? 'selected' : ''}>Moderator</option>
                        <option value="Admin" ${user.role === 'Admin' ? 'selected' : ''}>Admin</option>
                        ${activeUser.role === 'SuperAdmin' ? `<option value="SuperAdmin" ${user.role === 'SuperAdmin' ? 'selected' : ''}>SuperAdmin</option>` : ''}
                    </select>
                `;

                tr.innerHTML = `
                    <td>
                        <div class="admin-user-info-row">
                            <img src="${user.avatar}" class="admin-user-avatar" alt="Avatar">
                            <span><strong>${user.username}</strong></span>
                        </div>
                    </td>
                    <td>${dropdown}</td>
                    <td><strong class="text-gold">${user.points}</strong></td>
                    <td>
                        ${disableSelector ? `<span class="text-muted">Disabled</span>` : 
                            `<button class="btn btn-sm btn-danger btn-crimson admin-delete-user-btn" style="padding: 2px 6px; font-size:0.7rem;" data-docid="${user.id}" data-username="${user.username}">
                                <i class="fa-solid fa-user-minus"></i> Block
                             </button>`
                        }
                    </td>
                `;
                tableBody.appendChild(tr);
            });

            // Bind selectors
            const selects = tableBody.querySelectorAll(".admin-role-select");
            selects.forEach(select => {
                select.addEventListener("change", async () => {
                    const docId = select.getAttribute("data-docid");
                    const targetUsername = select.getAttribute("data-username");
                    const newRole = select.value;
                    
                    const userDocRef = doc(db, "users", docId);
                    await updateDoc(userDocRef, { role: newRole });
                    alert(`${targetUsername} zvania/roli muvaffaqiyatli ${newRole} darajasiga o'zgartirildi!`);
                });
            });

            const blockBtns = tableBody.querySelectorAll(".admin-delete-user-btn");
            blockBtns.forEach(btn => {
                btn.addEventListener("click", async () => {
                    const docId = btn.getAttribute("data-docid");
                    const targetUsername = btn.getAttribute("data-username");
                    if (confirm(`Haqiqatdan ham ${targetUsername} foydalanuvchisini bloklab, o'chirmoqchimisiz?`)) {
                        await deleteDoc(doc(db, "users", docId));
                        alert(`${targetUsername} muvaffaqiyatli bloklandi!`);
                    }
                });
            });
        });
    } else {
        const users = Database.getData('mir2_users');
        tableBody.innerHTML = "";

        users.forEach(user => {
            const tr = document.createElement("tr");
            const isSuperAdmin = user.role === 'SuperAdmin';
            const disableSelector = isSuperAdmin || (activeUser.role === 'Admin' && user.role === 'Admin') || (activeUser.username === user.username);

            const dropdown = `
                <select class="admin-role-select" data-user="${user.username}" ${disableSelector ? 'disabled' : ''}>
                    <option value="Newbie" ${user.role === 'Newbie' ? 'selected' : ''}>Newbie</option>
                    <option value="Active Explorer" ${user.role === 'Active Explorer' ? 'selected' : ''}>Active Explorer</option>
                    <option value="Legendary Player" ${user.role === 'Legendary Player' ? 'selected' : ''}>Legendary Player</option>
                    <option value="Moderator" ${user.role === 'Moderator' ? 'selected' : ''}>Moderator</option>
                    <option value="Admin" ${user.role === 'Admin' ? 'selected' : ''}>Admin</option>
                    ${activeUser.role === 'SuperAdmin' ? `<option value="SuperAdmin" ${user.role === 'SuperAdmin' ? 'selected' : ''}>SuperAdmin</option>` : ''}
                </select>
            `;

            tr.innerHTML = `
                <td>
                    <div class="admin-user-info-row">
                        <img src="${user.avatar}" class="admin-user-avatar" alt="Avatar">
                        <span><strong>${user.username}</strong></span>
                    </div>
                </td>
                <td>${dropdown}</td>
                <td><strong class="text-gold">${user.points}</strong></td>
                <td>
                    ${disableSelector ? `<span class="text-muted">Disabled</span>` : 
                        `<button class="btn btn-sm btn-danger btn-crimson admin-delete-user-btn" style="padding: 2px 6px; font-size:0.7rem;" data-user="${user.username}">
                            <i class="fa-solid fa-user-minus"></i> Block
                         </button>`
                    }
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Dropdown listeners
        const selects = tableBody.querySelectorAll(".admin-role-select");
        selects.forEach(select => {
            select.addEventListener("change", () => {
                const targetUsername = select.getAttribute("data-user");
                const newRole = select.value;

                let list = Database.getData('mir2_users');
                const u = list.find(x => x.username === targetUsername);
                if (u) {
                    u.role = newRole;
                    Database.setData('mir2_users', list);
                    alert(`${targetUsername} zvania/roli muvaffaqiyatli ${newRole} darajasiga o'zgartirildi!`);
                    
                    if (activeUser && activeUser.username === targetUsername) {
                        activeUser = u;
                        safeStorage.setItem('mir2_active_user', JSON.stringify(activeUser));
                        updateUserUI();
                    }
                    renderAdminUsers();
                    renderRatings();
                }
            });
        });

        // Block accounts
        const blockBtns = tableBody.querySelectorAll(".admin-delete-user-btn");
        blockBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetUsername = btn.getAttribute("data-user");
                if (confirm(`Haqiqatdan ham ${targetUsername} foydalanuvchisini bloklab, o'chirmoqchimisiz?`)) {
                    let list = Database.getData('mir2_users');
                    list = list.filter(u => u.username !== targetUsername);
                    Database.setData('mir2_users', list);
                    renderAdminUsers();
                    renderRatings();
                }
            });
        });
    }
}

// ==========================================================================
// 15. DETAILED PROFILES MODAL
// ==========================================================================
window.showUserProfileModal = async function(username) {
    let user = null;
    if (firebaseMode) {
        try {
            const q = query(collection(db, "users"), where("username", "==", username));
            const qs = await getDocs(q);
            if (!qs.empty) user = qs.docs[0].data();
        } catch (e) {}
    } else {
        const users = Database.getData('mir2_users');
        user = users.find(u => u.username === username);
    }

    if (!user) return;

    const profileModalEl = document.getElementById("profile-modal");
    const contentBox = document.getElementById("profile-modal-content");
    if (!profileModalEl || !contentBox) return;

    const badgeClass = user.role.toLowerCase().replace(" ", "-");

    contentBox.innerHTML = `
        <div class="profile-modal-top">
            <img src="${user.avatar}" class="profile-modal-avatar" alt="Avatar">
            <h3>${user.username}</h3>
            <span class="role-badge ${badgeClass}">${user.role}</span>
        </div>
        
        <div class="profile-modal-fields">
            <div class="profile-field-box">
                <span class="profile-field-label">Ro'yxatdan o'tgan</span>
                <span class="profile-field-value">${user.regDate}</span>
            </div>
            <div class="profile-field-box">
                <span class="profile-field-label">Foydalanuvchi ballari</span>
                <span class="profile-field-value text-gold">${user.points} ball</span>
            </div>
            <div class="profile-field-box">
                <span class="profile-field-label">Forum postlari</span>
                <span class="profile-field-value">${user.posts || 0} ta</span>
            </div>
            <div class="profile-field-box">
                <span class="profile-field-label">Olingan baholar (likes)</span>
                <span class="profile-field-value text-success">${user.likes || 0} ta</span>
            </div>
        </div>
    `;
    profileModalEl.classList.remove("hidden");
};

// ==========================================================================
// 16. STATIC HELPER UTILITIES
// ==========================================================================
function translatePage(lang) {
    const i18nElements = document.querySelectorAll("[data-i18n]");
    i18nElements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dictionary[lang] && dictionary[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dictionary[lang][key];
            } else {
                const icon = el.querySelector("i");
                if (icon) {
                    const text = dictionary[lang][key];
                    el.innerHTML = "";
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(" " + text));
                } else {
                    el.innerHTML = dictionary[lang][key];
                }
            }
        }
    });
}

function getLocaleWord(key) {
    return dictionary[currentLang][key] || key;
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showLocalModeBanner() {
    const banner = document.createElement("div");
    banner.style.cssText = "background: linear-gradient(90deg, #b8860b, #8b0000); color: #ffffff; text-align: center; padding: 8px 15px; font-family: var(--font-body); font-size: 0.82rem; font-weight: 500; letter-spacing: 0.5px; border-bottom: 2px solid var(--border-gold); text-shadow: 1px 1px 2px #000000; display: flex; align-items: center; justify-content: center; gap: 8px; z-index: 9999; position: relative;";
    banner.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-gold animate-pulse"></i> <span>Saytingiz hozircha <strong>Lokal Rejimda</strong> ishlayapti. Uni global tarmoqqa ulash uchun <code>app.js</code> faylining eng tepasiga o'zingizning bepul Firebase kalitlaringizni joylashtiring!</span>`;
    document.body.prepend(banner);
}
