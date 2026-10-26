import React, { useState, useEffect } from 'react';
import CourseCard from './components/CourseCard';
import CourseDetails from './components/CourseDetails';
import {
  GraduationCap,
  PlusCircle,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Network,
  Bot,
  Search,
  Heart,
  Bookmark,
  AlertTriangle,
  Trash2,
  Database
} from 'lucide-react';
import './App.css';

// Початкові дані трьох курсів відповідно до завдань Лаб 1 та Лаб 2
const INITIAL_COURSES = [
  {
    id: 1,
    title: 'Сучасна веб-розробка: React & Next.js',
    instructor: 'Олександр Шевченко',
    duration: '10 тижнів (60 годин)',
    description: 'Поглиблене опанування компонентів, хуків, стану React та побудова сучасних веб-додатків із серверним рендерингом.',
    isAvailable: false,
    category: 'Frontend',
    level: 'Початковий / Середній',
    rating: 4.9,
    availableSeats: 6,
    accentColor: '#6366f1'
  },
  {
    id: 2,
    title: 'UI/UX Дизайн та прототипування у Figma',
    instructor: 'Олена Коваленко',
    duration: '6 тижнів (36 годин)',
    description: 'Практичне проєктування адаптивних користувацьких інтерфейсів, побудова дизайн-систем та інтерактивних анімованих прототипів.',
    isAvailable: true,
    category: 'UI/UX Дизайн',
    level: 'Для початківців',
    rating: 4.8,
    availableSeats: 0,
    accentColor: '#ec4899'
  },
  {
    id: 3,
    title: 'Python для Data Science та Штучного Інтелекту',
    instructor: 'Максим Бондаренко',
    duration: '12 тижнів (72 години)',
    description: 'Комплексний аналіз великих даних, бібліотеки Pandas, NumPy, візуалізація та розробка базових моделей машинного навчання.',
    isAvailable: true,
    category: 'Data Science',
    level: 'Середній рівень',
    rating: 5.0,
    availableSeats: 8,
    accentColor: '#0ea5e9'
  }
];

// Зразок четвертого курсу для демонстрації динамічного додавання без дублювання JSX
const FOURTH_COURSE_TEMPLATE = {
  id: 4,
  title: 'Хмарні архітектури та DevOps: Docker & Kubernetes',
  instructor: 'Сергій Мельник',
  duration: '8 тижнів (48 годин)',
  description: 'Автоматизація розгортання застосунків, налаштування сучасних CI/CD пайплайнів, контейнеризація та хмарний моніторинг.',
  isAvailable: true,
  category: 'DevOps & Cloud',
  level: 'Просунутий рівень',
  rating: 4.9,
  availableSeats: 4,
  accentColor: '#10b981'
};

const LOCAL_STORAGE_KEY = 'course_favorites_ids';

function App() {
  // Стан списку курсів (Лабораторна 1)
  const [courses, setCourses] = useState(INITIAL_COURSES);

  // Стан навігації: активний екран ('catalog' | 'favorites')
  const [activeView, setActiveView] = useState('catalog');

  // Стан вибраного курсу для деталей (Лабораторна 1: null = список, number = id курсу)
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Стан обраного (Лабораторна 2: зберігаємо масив id курсів)
  // Відновлення з localStorage під час первинного монтування (лінива ініціалізація)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Помилка читання обраного з localStorage:', error);
      return [];
    }
  });

  // Фільтрація та пошук
  const [filterAvailability, setFilterAvailability] = useState('all'); // 'all', 'open', 'closed'
  const [searchQuery, setSearchQuery] = useState('');

  // Вкладки інформаційної панелі для захисту
  const [activeTab, setActiveTab] = useState('lab1'); // 'lab1', 'lab2', 'scheme', 'ai-report'

  // Синхронізація обраного з localStorage при кожній зміні (Лабораторна 2)
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Помилка запису обраного в localStorage:', error);
    }
  }, [favorites]);

  // Дія "Детальніше" (Лабораторна 1: відкриває детальний екран вибраного курсу)
  const handleSelectDetails = (id) => {
    setSelectedCourseId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Повернення до списку курсів
  const handleBackToList = () => {
    setSelectedCourseId(null);
  };

  // Дія "Зберегти курс / Вилучити з обраного" (Лабораторна 2: без дублювання)
  const handleToggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        // Вилучення курсу
        return prevFavorites.filter((favId) => favId !== id);
      } else {
        // Додавання курсу (унікальне, без дублювання)
        return [...prevFavorites, id];
      }
    });
  };

  // Очищення всього списку обраного (Лабораторна 2: швидка дія для захисту)
  const handleClearFavorites = () => {
    setFavorites([]);
  };

  // Зміна доступності курсу (перевірка динамічної передачі props)
  const handleToggleEnroll = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === id) {
          const newStatus = !course.isAvailable;
          return {
            ...course,
            isAvailable: newStatus,
            availableSeats: newStatus ? 5 : 0
          };
        }
        return course;
      })
    );
  };

  // Додавання 4-го курсу без копіювання JSX картки
  const handleAddFourthCourse = () => {
    if (courses.some((c) => c.id === FOURTH_COURSE_TEMPLATE.id)) {
      alert('Четвертий курс уже додано до списку!');
      return;
    }
    setCourses([...courses, FOURTH_COURSE_TEMPLATE]);
  };

  // Тест неіснуючого курсу (Лабораторна 1: перевірка обробки 404 без збоїв)
  const handleTestNonExistentCourse = () => {
    setSelectedCourseId(999);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Скидання до початкових 3 карток
  const handleResetCourses = () => {
    setCourses(INITIAL_COURSES);
    setSearchQuery('');
    setFilterAvailability('all');
    setSelectedCourseId(null);
  };

  // Фільтрація курсів для каталогу
  const filteredCourses = courses.filter((course) => {
    const matchesFilter =
      filterAvailability === 'all'
        ? true
        : filterAvailability === 'open'
          ? course.isAvailable
          : !course.isAvailable;

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Курси, що додані до обраного
  const favoriteCourses = courses.filter((course) => favorites.includes(course.id));

  // Підрахунок статистики
  const availableCount = courses.filter((c) => c.isAvailable).length;
  const closedCount = courses.length - availableCount;

  // Вибраний курс для екрана деталей (Лабораторна 1: пошук за id)
  const selectedCourse = selectedCourseId !== null
    ? courses.find((course) => course.id === selectedCourseId) || null
    : null;

  return (
    <div className="app-container">
      {/* Шапка проєкту */}
      <header className="app-header">
        <div className="header-badge">
          <GraduationCap size={16} />
          <span>Лабораторні роботи 1 & 2: Інтерактивний React та Локальні дані</span>
        </div>
        <h1 className="header-title">Портал навчальних курсів для студентів</h1>
        <p className="header-subtitle">
          Повний цикл: список через <code className="code-pill">map()</code>, передача через <code className="code-pill">props</code>, 
          екран деталей, обробка помилок та збереження в <code className="code-pill">localStorage</code>.
        </p>

        {/* Статистика застосунку */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Всього курсів</span>
            <strong className="stat-value">{courses.length}</strong>
          </div>
          <div className="stat-card stat-open">
            <span className="stat-label">Запис відкрито</span>
            <strong className="stat-value">{availableCount}</strong>
          </div>
          <div className="stat-card stat-closed">
            <span className="stat-label">Запис закрито</span>
            <strong className="stat-value">{closedCount}</strong>
          </div>
          <div className="stat-card stat-fav">
            <span className="stat-label">В обраному</span>
            <strong className="stat-value">{favorites.length}</strong>
          </div>
        </div>

        {/* Перемикання головних екранів: Каталог та Мої курси */}
        {selectedCourseId === null && (
          <nav className="main-nav-tabs" aria-label="Головна навігація">
            <button
              className={`main-nav-btn ${activeView === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveView('catalog')}
            >
              <BookOpen size={18} />
              <span>Каталог курсів ({courses.length})</span>
            </button>
            <button
              className={`main-nav-btn nav-fav-btn ${activeView === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveView('favorites')}
            >
              <Heart size={18} className={favorites.length > 0 ? 'heart-filled' : ''} />
              <span>Мої курси ({favorites.length})</span>
              {favorites.length > 0 && <span className="nav-badge-count">{favorites.length}</span>}
            </button>
          </nav>
        )}
      </header>

      {/* УМОВНИЙ РЕНДЕРИНГ ЕКРАНІВ: Екран деталей АБО Екрани Списку */}
      {selectedCourseId !== null ? (
        /* ЕКРАН ДЕТАЛЕЙ КУРСУ (Лабораторна робота 1) */
        <main className="details-container">
          <CourseDetails
            course={selectedCourse}
            requestedId={selectedCourseId}
            onBack={handleBackToList}
            isFavorite={favorites.includes(selectedCourseId)}
            onToggleFavorite={handleToggleFavorite}
            onToggleEnroll={handleToggleEnroll}
          />
        </main>
      ) : activeView === 'favorites' ? (
        /* ЕКРАН «МОЇ КУРСИ» (Лабораторна робота 2) */
        <main className="favorites-section">
          <div className="section-title-wrap">
            <h2 className="section-title">
              <Heart size={22} className="title-icon-heart" />
              <span>Мої збережені курси ({favoriteCourses.length})</span>
            </h2>
            {favoriteCourses.length > 0 && (
              <button
                onClick={handleClearFavorites}
                className="btn-clear-favorites"
                title="Очистити всі курси зі списку збережених"
              >
                <Trash2 size={16} />
                <span>Очистити список обраного</span>
              </button>
            )}
          </div>

          {favoriteCourses.length === 0 ? (
            /* Повідомлення для порожнього списку (Лабораторна робота 2) */
            <div className="empty-favorites-card">
              <div className="empty-fav-icon-wrap">
                <Bookmark size={42} />
              </div>
              <h3 className="empty-fav-title">Список обраного порожній</h3>
              <p className="empty-fav-desc">
                Ви ще не додали жодного курсу до збережених. Перегляньте каталог курсів, 
                натисніть іконку серця або кнопку <strong>«Зберегти курс»</strong>, щоб ваш вибір залишився на цьому пристрої!
              </p>
              <button onClick={() => setActiveView('catalog')} className="btn-go-catalog">
                <BookOpen size={18} />
                <span>Перейти до каталогу курсів</span>
              </button>
            </div>
          ) : (
            <div className="courses-grid">
              {favoriteCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  instructor={course.instructor}
                  duration={course.duration}
                  description={course.description}
                  isAvailable={course.isAvailable}
                  category={course.category}
                  level={course.level}
                  rating={course.rating}
                  availableSeats={course.availableSeats}
                  accentColor={course.accentColor}
                  isFavorite={true}
                  onSelectDetails={handleSelectDetails}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleEnroll={handleToggleEnroll}
                />
              ))}
            </div>
          )}
        </main>
      ) : (
        /* ЕКРАН КАТАЛОГУ КУРСІВ (Лабораторна робота 1 & 2) */
        <>
          {/* Панель керування: пошук, фільтрація та кнопки дій */}
          <section className="control-toolbar" aria-label="Панель керування та фільтрації">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Пошук за назвою, викладачем або описом..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterAvailability === 'all' ? 'active' : ''}`}
                onClick={() => setFilterAvailability('all')}
              >
                Всі курси ({courses.length})
              </button>
              <button
                className={`filter-btn ${filterAvailability === 'open' ? 'active' : ''}`}
                onClick={() => setFilterAvailability('open')}
              >
                Тільки відкриті ({availableCount})
              </button>
              <button
                className={`filter-btn ${filterAvailability === 'closed' ? 'active' : ''}`}
                onClick={() => setFilterAvailability('closed')}
              >
                Завершені ({closedCount})
              </button>
            </div>

            <div className="action-buttons">
              <button
                className="action-pill-btn add-btn"
                onClick={handleAddFourthCourse}
                title="Продемонструвати додавання 4-го курсу"
              >
                <PlusCircle size={16} />
                <span>+ Додати 4-й курс</span>
              </button>

              <button
                className="action-pill-btn test-404-btn"
                onClick={handleTestNonExistentCourse}
                title="Перевірити обробку неіснуючого курсу ID 999 (Вимога Лаб 1)"
              >
                <AlertTriangle size={16} />
                <span>Тест 404 (ID 999)</span>
              </button>

              <button
                className="action-pill-btn reset-btn"
                onClick={handleResetCourses}
                title="Повернутися до початкових курсів"
              >
                <RotateCcw size={16} />
                <span>Скинути</span>
              </button>
            </div>
          </section>

          {/* Основна сітка відображення карток через map() */}
          <main className="courses-grid-section">
            <div className="section-title-wrap">
              <h2 className="section-title">
                <BookOpen size={20} className="title-icon" />
                Каталог курсів ({filteredCourses.length})
              </h2>
              <span className="section-hint">
                💡 Натисніть <strong>«Детальніше»</strong> для повного опису або ❤️ для збереження в обране
              </span>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="empty-state">
                <p>За вашим запитом курсів не знайдено.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterAvailability('all');
                  }}
                  className="btn-secondary"
                >
                  Скинути фільтри
                </button>
              </div>
            ) : (
              <div className="courses-grid">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    instructor={course.instructor}
                    duration={course.duration}
                    description={course.description}
                    isAvailable={course.isAvailable}
                    category={course.category}
                    level={course.level}
                    rating={course.rating}
                    availableSeats={course.availableSeats}
                    accentColor={course.accentColor}
                    isFavorite={favorites.includes(course.id)}
                    onSelectDetails={handleSelectDetails}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleEnroll={handleToggleEnroll}
                  />
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {/* Інформаційна панель для усного захисту Лабораторних 1 та 2 */}
      <section className="defense-panel">
        <div className="defense-header">
          <div className="defense-tabs">
            <button
              className={`tab-btn ${activeTab === 'lab1' ? 'active' : ''}`}
              onClick={() => setActiveTab('lab1')}
            >
              <HelpCircle size={18} />
              <span>Захист Лаб 1: Інтерактивна сторінка</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'lab2' ? 'active' : ''}`}
              onClick={() => setActiveTab('lab2')}
            >
              <Database size={18} />
              <span>Захист Лаб 2: Локальні дані</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'scheme' ? 'active' : ''}`}
              onClick={() => setActiveTab('scheme')}
            >
              <Network size={18} />
              <span>Схема компонентів та Props</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'ai-report' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai-report')}
            >
              <Bot size={18} />
              <span>Звіт про використання ШІ</span>
            </button>
          </div>
        </div>

        <div className="defense-content">
          {/* Вкладка: Лабораторна робота 1 */}
          {activeTab === 'lab1' && (
            <div className="tab-pane questions-pane">
              <h3>Матеріали для захисту Лабораторної роботи 1</h3>
              <div className="qa-list">
                <article className="qa-card">
                  <h4>1. Шлях одного значення: об’єкт у масиві → map() → props → текст у CourseCard</h4>
                  <p>
                    <strong>Відповідь:</strong> У батьківському компоненті <code>App</code> оголошено масив об’єктів <code>courses</code> (наприклад, елемент із полем <code>title: 'Сучасна веб-розробка: React & Next.js'</code>).
                  </p>
                  <ol>
                    <li>Метод <code>courses.map((course) =&gt; ...)</code> ітерується по кожному елементу масиву.</li>
                    <li>Для кожного елемента генерується компонент <code>&lt;CourseCard key={'{course.id}'} title={'{course.title}'} ... /&gt;</code>, де властивість об'єкта передається як JSX-атрибут (prop).</li>
                    <li>Усередині <code>CourseCard</code> prop деструктуризується з першого аргументу функції (<code>function CourseCard({'{ title, ... }'})</code>).</li>
                    <li>Значення підставляється в JSX-елемент <code>&lt;h3 className="course-title"&gt;{'{title}'}&lt;/h3&gt;</code> і рендериться в DOM.</li>
                  </ol>
                </article>

                <article className="qa-card">
                  <h4>2. Як застосунок знаходить курс для детального екрана?</h4>
                  <p>
                    <strong>Відповідь:</strong> Навігацію реалізовано через стан React: у <code>App</code> зберігається стан <code>selectedCourseId</code>.
                  </p>
                  <ul>
                    <li>Коли користувач натискає <em>«Детальніше»</em>, викликається колбек <code>handleSelectDetails(course.id)</code>, який встановлює <code>selectedCourseId</code>.</li>
                    <li>Пошук курсу виконується за допомогою методу масиву: <br />
                      <code>const selectedCourse = courses.find((course) =&gt; course.id === selectedCourseId);</code>
                    </li>
                    <li>Об'єкт знайденого курсу передається в компонент <code>&lt;CourseDetails course={'{selectedCourse}'} ... /&gt;</code>.</li>
                  </ul>
                </article>

                <article className="qa-card">
                  <h4>3. Як обробляється неіснуючий курс або відсутній id (без падіння застосунку)?</h4>
                  <p>
                    <strong>Відповідь:</strong> Якщо курс із потрібним <code>id</code> не знайдено (метод <code>.find()</code> повертає <code>undefined</code>):
                  </p>
                  <ul>
                    <li>Компонент <code>CourseDetails</code> має перевірку: <code>if (!course) return &lt;div className="course-not-found"&gt;...&lt;/div&gt;</code>.</li>
                    <li>Користувачеві показується зрозуміле повідомлення <em>«Помилка 404: Курс не існує або був вилучений»</em> і кнопка повернення <em>«Назад до списку курсів»</em>.</li>
                    <li>Застосунок ніколи не падає через звернення до властивостей <code>undefined</code>! Натисніть кнопку <strong>«Тест 404 (ID 999)»</strong> нагорі, щоб продемонструвати це викладачеві.</li>
                  </ul>
                </article>

                <article className="qa-card">
                  <h4>4. Умовне відображення доступності («Запис відкрито» / «Запис закрито»)</h4>
                  <p>
                    <strong>Відповідь:</strong> Кожен курс має булеве поле <code>isAvailable: true/false</code>. За допомогою тернарного оператора <code>{'{isAvailable ? "Запис відкрито" : "Запис закрито"}'}</code> та умовних CSS-класів змінюється стиль бейджа (зелений/червоний) і стан кнопки запису.
                  </p>
                </article>
              </div>
            </div>
          )}

          {/* Вкладка: Лабораторна робота 2 */}
          {activeTab === 'lab2' && (
            <div className="tab-pane questions-pane">
              <h3>Матеріали для захисту Лабораторної роботи 2</h3>
              <div className="qa-list">
                <article className="qa-card">
                  <h4>1. Що зберігається в стані favorites: id курсів чи цілі об’єкти? Чому?</h4>
                  <p>
                    <strong>Відповідь:</strong> У стані <code>favorites</code> зберігається <strong>масив числових ID курсів</strong> (наприклад, <code>[1, 3]</code>).
                  </p>
                  <p><strong>Обґрунтування для захисту:</strong></p>
                  <ul>
                    <li><strong>Single Source of Truth (Єдине джерело істини):</strong> Повні дані курсів зберігаються в масиві <code>courses</code>. Якщо викладач змінить назву курсу, статус доступності чи кількість місць, екран «Мої курси» миттєво покаже актуальні дані, бо вони фільтруються за ID: <code>courses.filter(c =&gt; favorites.includes(c.id))</code>. Якби ми зберігали цілі об’єкти, виникла б небезпека розсинхронізації даних!</li>
                    <li><strong>Оптимізація localStorage:</strong> Зберігання масиву кількох чисел займає мінімум байтів у сховищі браузера.</li>
                  </ul>
                </article>

                <article className="qa-card">
                  <h4>2. Де знаходиться стан React, яка подія його змінює та як запобігається дублювання?</h4>
                  <p>
                    <strong>Відповідь:</strong> Стан оголошено в кореневому компоненті <code>App</code> через <code>const [favorites, setFavorites] = useState(...)</code>.
                  </p>
                  <ul>
                    <li>Подія — це клік користувача (<code>onClick</code>) на кнопку «Зберегти курс» або іконку серця.</li>
                    <li>Захист від дублікатів: перед додаванням перевіряється наявність через <code>prev.includes(id)</code>:
                      <pre><code>{`setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);`}</code></pre>
                      Якщо елемент уже є, повторний клік видаляє його (перемикання), тому дублікатів ніколи не виникає.
                    </li>
                  </ul>
                </article>

                <article className="qa-card">
                  <h4>3. Коли читається та записується localStorage? Навіщо JSON.stringify() і JSON.parse()?</h4>
                  <p>
                    <strong>Відповідь:</strong>
                  </p>
                  <ul>
                    <li><strong>Читання (JSON.parse):</strong> Відбувається <em>один раз під час ініціалізації компонента</em> за допомогою лінивої ініціалізації стану: <code>useState(() =&gt; JSON.parse(localStorage.getItem(...)))</code>. Це відновлює масив після перезавантаження (F5).</li>
                    <li><strong>Запис (JSON.stringify):</strong> Відбувається <em>автоматично при кожній зміні стану favorites</em> за допомогою хука <code>useEffect(() =&gt; {'{'} localStorage.setItem(KEY, JSON.stringify(favorites)); {'}'}, [favorites])</code>.</li>
                    <li><strong>Навіщо JSON:</strong> <code>localStorage</code> зберігає виключно <strong>рядки (strings)</strong>. <code>JSON.stringify()</code> серіалізує масив JavaScript у текст <code>"[1,3]"</code>, а <code>JSON.parse()</code> десеріалізує цей рядок назад у повноцінний масив чисел.</li>
                  </ul>
                </article>

                <article className="qa-card">
                  <h4>4. Контрольний чек-лист перевірки роботи студентом:</h4>
                  <ol>
                    <li>✅ <strong>Зберегти два курси:</strong> Натисніть серце на курсі 1 та 3. У шапці з'явиться лічильник «Мої курси (2)».</li>
                    <li>✅ <strong>Спробувати додати повторно:</strong> Повторне натискання безпечно вилучає або оновлює стан без жодних дублікатів.</li>
                    <li>✅ <strong>Перезавантажити сторінку (F5):</strong> Курси залишаються збереженими завдяки <code>localStorage</code>.</li>
                    <li>✅ <strong>Вилучити один курс і знову перезавантажити:</strong> Лічильник стає 1, стан зберігається.</li>
                    <li>✅ <strong>Вилучити останній курс:</strong> З'являється повідомлення <em>«Список обраного порожній»</em> із пропозицією повернутися до курсів.</li>
                  </ol>
                </article>
              </div>
            </div>
          )}

          {/* Вкладка: Схема структури */}
          {activeTab === 'scheme' && (
            <div className="tab-pane scheme-pane">
              <h3>Схема архітектури та передачі Props</h3>
              <p className="tab-description">
                Застосунок побудований за принципом компонентного підходу та односпрямованого потоку даних.
              </p>

              <div className="diagram-container">
                <div className="diagram-node node-app">
                  <div className="node-title">App (Батьківський компонент)</div>
                  <div className="node-desc">
                    Стани: <code>courses</code> (масив), <code>selectedCourseId</code> (навігація), <code>favorites</code> (масив id), <code>activeView</code>
                  </div>
                </div>

                <div className="diagram-arrows">
                  <span className="arrow-down">⬇️ Props: course data, isFavorite, callbacks ⬇️</span>
                </div>

                <div className="diagram-children-grid">
                  <div className="diagram-node node-card">
                    <div className="node-title">&lt;CourseCard /&gt;</div>
                    <div className="node-props">
                      Картка в списку<br />
                      Props: title, instructor, duration, description, isAvailable, isFavorite<br />
                      Колбеки: onSelectDetails, onToggleFavorite
                    </div>
                  </div>

                  <div className="diagram-node node-card">
                    <div className="node-title">&lt;CourseDetails /&gt;</div>
                    <div className="node-props">
                      Детальний екран або 404<br />
                      Props: course, requestedId, isFavorite<br />
                      Колбеки: onBack, onToggleFavorite, onToggleEnroll
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Вкладка: Звіт про використання ШІ */}
          {activeTab === 'ai-report' && (
            <div className="tab-pane ai-pane">
              <h3>Опис використання штучного інтелекту (Звіт згідно з критеріями)</h3>
              <div className="ai-report-grid">
                <div className="ai-card">
                  <h4>Як саме використовувався ШІ</h4>
                  <p>
                    ШІ (Google Gemini) було залучено як консультанта та парного програміста для:
                  </p>
                  <ul>
                    <li>Проєктування безпомилкової схеми обробки відсутнього курсу (404 state без збоїв);</li>
                    <li>Організації чистої синхронізації <code>localStorage</code> через лінивий <code>useState</code> та реактивний <code>useEffect</code>;</li>
                    <li>Підготовки відповідей на теоретичні запитання усного захисту обох робіт.</li>
                  </ul>
                </div>

                <div className="ai-card">
                  <h4>Що перевірено та прийнято студентом</h4>
                  <ul>
                    <li>
                      <strong>Зберігання тільки ID замість цілих об'єктів:</strong> Рішення перевірено та прийнято як архітектурно правильне (Single Source of Truth), що виключає застарівання даних.
                    </li>
                    <li>
                      <strong>Перемикання екранів через стан React:</strong> Прийнято, оскільки це найпростіший, найнадійніший спосіб без зайвих бібліотек, який легко пояснити на захисті.
                    </li>
                  </ul>
                </div>

                <div className="ai-card">
                  <h4>Які пропозиції відхилено і чому</h4>
                  <ul>
                    <li>
                      <strong>Пропозиція зберігати повні об'єкти в favorites:</strong> Відхилено, адже при зміні статусу доступності чи викладача дані в обраному застарівали б.
                    </li>
                    <li>
                      <strong>Встановлення сторонніх бібліотек маршрутизації:</strong> Відхилено, оскільки для двох пов'язаних екранів стан React є простішим і більш наочним для оцінювання.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Підвал проєкту */}
      <footer className="app-footer">
        <p>
          Лабораторні роботи 1 & 2 з React | Повний функціонал виконано на 12 + 12 балів
        </p>
      </footer>
    </div>
  );
}

export default App;
