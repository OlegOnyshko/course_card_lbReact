import React, { useState } from 'react';
import CourseCard from './components/CourseCard';
import {
  GraduationCap,
  Sparkles,
  Filter,
  PlusCircle,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Network,
  Bot,
  Search,
  CheckCircle,
  Layers
} from 'lucide-react';
import './App.css';

// Початкові дані трьох курсів відповідно до завдання
const INITIAL_COURSES = [
  {
    id: 1,
    title: 'Сучасна веб-розробка: React & Next.js',
    instructor: 'Олександр Шевченко',
    duration: '10 тижнів (60 годин)',
    isAvailable: true,
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
    isAvailable: false,
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
    isAvailable: true,
    category: 'Data Science',
    level: 'Середній рівень',
    rating: 5.0,
    availableSeats: 8,
    accentColor: '#0ea5e9'
  }
];

// Зразок четвертого курсу для демонстрації додавання
const FOURTH_COURSE_TEMPLATE = {
  id: 4,
  title: 'Хмарні архітектури та DevOps: Docker & Kubernetes',
  instructor: 'Сергій Мельник',
  duration: '8 тижнів (48 годин)',
  isAvailable: true,
  category: 'DevOps & Cloud',
  level: 'Просунутий рівень',
  rating: 4.9,
  availableSeats: 4,
  accentColor: '#10b981'
};

function App() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [filterAvailability, setFilterAvailability] = useState('all'); // 'all', 'open', 'closed'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('scheme'); // 'scheme', 'questions', 'ai-report'

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

  // Додавання 4-го курсу (відповідь на запитання 3)
  const handleAddFourthCourse = () => {
    if (courses.some((c) => c.id === FOURTH_COURSE_TEMPLATE.id)) {
      alert('Четвертий курс уже додано до списку!');
      return;
    }
    setCourses([...courses, FOURTH_COURSE_TEMPLATE]);
  };

  // Скидання до початкових 3 карток
  const handleResetCourses = () => {
    setCourses(INITIAL_COURSES);
    setSearchQuery('');
    setFilterAvailability('all');
  };

  // Фільтрація курсів
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
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const availableCount = courses.filter((c) => c.isAvailable).length;
  const closedCount = courses.length - availableCount;

  return (
    <div className="app-container">
      {/* Шапка проєкту */}
      <header className="app-header">
        <div className="header-badge">
          <GraduationCap size={16} />
          <span>Лабораторна робота: Основи React & Props</span>
        </div>
        <h1 className="header-title">Конструктор карток навчальних курсів</h1>
        <p className="header-subtitle">
          Демонстрація перевикористання компонента <code className="code-pill">&lt;CourseCard /&gt;</code>{' '}
          із передачею властивостей через <code className="code-pill">props</code>
        </p>

        {/* Статистика */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Всього курсів</span>
            <strong className="stat-value">{courses.length}</strong>
          </div>
          <div className="stat-card stat-open">
            <span className="stat-label">Відкрито запис</span>
            <strong className="stat-value">{availableCount}</strong>
          </div>
          <div className="stat-card stat-closed">
            <span className="stat-label">Набір закрито</span>
            <strong className="stat-value">{closedCount}</strong>
          </div>
        </div>
      </header>

      {/* Панель керування та індивідуальні вимоги */}
      <section className="control-toolbar" aria-label="Панель керування та фільтрації">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Пошук за назвою, викладачем чи напрямом..."
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
            className="action-pill-btn reset-btn"
            onClick={handleResetCourses}
            title="Повернутися до початкових 3 курсів"
          >
            <RotateCcw size={16} />
            <span>Скинути</span>
          </button>
        </div>
      </section>

      {/* Основна сітка відображення карток */}
      <main className="courses-grid-section">
        <div className="section-title-wrap">
          <h2 className="section-title">
            <BookOpen size={20} className="title-icon" />
            Каталог курсів ({filteredCourses.length})
          </h2>
          <span className="section-hint">
            💡 Натисніть кнопку «Змінити статус» на картці, щоб протестувати зміну props
          </span>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <p>За вашим запитом курсів не знайдено.</p>
            <button onClick={() => { setSearchQuery(''); setFilterAvailability('all'); }} className="btn-secondary">
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
                isAvailable={course.isAvailable}
                category={course.category}
                level={course.level}
                rating={course.rating}
                availableSeats={course.availableSeats}
                accentColor={course.accentColor}
                onToggleEnroll={handleToggleEnroll}
              />
            ))}
          </div>
        )}
      </main>

      {/* Інформаційна панель для захисту лабораторної */}
      <section className="defense-panel">
        <div className="defense-header">
          <div className="defense-tabs">
            <button
              className={`tab-btn ${activeTab === 'scheme' ? 'active' : ''}`}
              onClick={() => setActiveTab('scheme')}
            >
              <Network size={18} />
              <span>1. Схема компонентів та Props</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              <HelpCircle size={18} />
              <span>5. Відповіді на запитання викладача</span>
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
          {activeTab === 'scheme' && (
            <div className="tab-pane scheme-pane">
              <h3>Схема структури застосунку та передачі Props</h3>
              <p className="tab-description">
                Застосунок побудований за принципом компонентного підходу. Головний компонент{' '}
                <code>&lt;App /&gt;</code> зберігає стан (state) масиву курсів та передає індивідуальні властивості
                до кожного дочірнього компонента <code>&lt;CourseCard /&gt;</code> через <code>props</code>.
              </p>

              <div className="diagram-container">
                <div className="diagram-node node-app">
                  <div className="node-title">Компонент App (Батьківський)</div>
                  <div className="node-desc">Зберігає стан: courses (масив об'єктів), фільтри, пошук</div>
                </div>

                <div className="diagram-arrows">
                  <span className="arrow-down">⬇️ передача через props (title, instructor, duration, isAvailable...) ⬇️</span>
                </div>

                <div className="diagram-children-grid">
                  <div className="diagram-node node-card">
                    <div className="node-title">&lt;CourseCard /&gt; (1)</div>
                    <div className="node-props">
                      props: React & Next.js<br />
                      Олександр Шевченко<br />
                      10 тижнів | Відкритий
                    </div>
                  </div>
                  <div className="diagram-node node-card">
                    <div className="node-title">&lt;CourseCard /&gt; (2)</div>
                    <div className="node-props">
                      props: UI/UX Figma<br />
                      Олена Коваленко<br />
                      6 тижнів | Набір закрито
                    </div>
                  </div>
                  <div className="diagram-node node-card">
                    <div className="node-title">&lt;CourseCard /&gt; (3)</div>
                    <div className="node-props">
                      props: Python AI<br />
                      Максим Бондаренко<br />
                      12 тижнів | Відкритий
                    </div>
                  </div>
                </div>
              </div>

              <div className="props-table-wrap">
                <h4>Таблиця Props компонента CourseCard</h4>
                <table className="props-table">
                  <thead>
                    <tr>
                      <th>Назва prop</th>
                      <th>Тип даних</th>
                      <th>Опис</th>
                      <th>Приклад значення</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>title</code></td>
                      <td>String</td>
                      <td>Назва навчального курсу</td>
                      <td>"Сучасна веб-розробка: React & Next.js"</td>
                    </tr>
                    <tr>
                      <td><code>instructor</code></td>
                      <td>String</td>
                      <td>Ім'я та прізвище викладача</td>
                      <td>"Олександр Шевченко"</td>
                    </tr>
                    <tr>
                      <td><code>duration</code></td>
                      <td>String</td>
                      <td>Тривалість курсу</td>
                      <td>"10 тижнів (60 годин)"</td>
                    </tr>
                    <tr>
                      <td><code>isAvailable</code></td>
                      <td>Boolean</td>
                      <td>Доступність для запису (true/false)</td>
                      <td>true (Запис відкритий)</td>
                    </tr>
                    <tr>
                      <td><code>onToggleEnroll</code></td>
                      <td>Function</td>
                      <td>Колбек зміни статусу (зворотний зв'язок)</td>
                      <td>handleToggleEnroll(id)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="tab-pane questions-pane">
              <h3>Відповіді на запитання для усного захисту роботи</h3>
              <div className="qa-list">
                <article className="qa-card">
                  <h4>1. Чому ви створили один компонент CourseCard, а не три окремі компоненти?</h4>
                  <p>
                    <strong>Відповідь:</strong> Створення єдиного компонента <code>CourseCard</code> базується на
                    фундаментальному принципі розробки ПЗ — <strong>DRY (Don't Repeat Yourself)</strong> та філософії
                    компонентного підходу React. Всі три картки мають <em>ідентичну візуальну структуру</em> (розмітку,
                    стилі, поведінку кнопок та бейджів) і відрізняються лише <em>даними</em>. Використання одного
                    компонента забезпечує:
                  </p>
                  <ul>
                    <li>Перевикористання коду (reusability) та значне зменшення дублювання;</li>
                    <li>Централізовану підтримку: при зміні дизайну або додаванні нового елемента достатньо відредагувати один файл;</li>
                    <li>Гнучкість масштабування: кількість карток можна легко збільшити з 3 до 1000 без написання нового JSX-коду.</li>
                  </ul>
                </article>

                <article className="qa-card">
                  <h4>2. Як дані потрапляють із компонента App до CourseCard?</h4>
                  <p>
                    <strong>Відповідь:</strong> Дані передаються через <strong>props (properties)</strong> за принципом
                    <strong>односпрямованого потоку даних (one-way data binding)</strong> від батьківського компонента до
                    дочірнього:
                  </p>
                  <ul>
                    <li>У компоненті <code>App</code> оголошено масив об'єктів <code>courses</code> (або через стан <code>useState</code>).</li>
                    <li>За допомогою методу <code>courses.map(...)</code> перебирається кожен елемент масиву.</li>
                    <li>Для кожного елемента викликається <code>&lt;CourseCard ... /&gt;</code>, де властивості об'єкта (наприклад, <code>title={'{course.title}'}</code>) передаються як атрибути JSX.</li>
                    <li>Усередині <code>CourseCard</code> ці параметри деструктуризуються з першого аргументу функції (<code>{'{ title, instructor, duration, isAvailable }'}</code>) та підставляються в JSX-розмітку.</li>
                  </ul>
                </article>

                <article className="qa-card">
                  <h4>3. Що потрібно змінити, щоб додати четвертий навчальний курс?</h4>
                  <p>
                    <strong>Відповідь:</strong> Завдяки декларативному рендерингу масиву (<code>courses.map()</code>) не потрібно створювати новий компонент чи дописувати нову розмітку! Достатньо лише:
                  </p>
                  <ul>
                    <li>
                      <strong>Додати новий об'єкт із даними</strong> четвертого курсу в масив <code>courses</code> (натисніть кнопку <em>«+ Додати 4-й курс»</em> нагорі для живої перевірки);
                    </li>
                    <li>React автоматично викличе рендер і відобразить четверту картку з відповідними props.</li>
                  </ul>
                </article>
              </div>
            </div>
          )}

          {activeTab === 'ai-report' && (
            <div className="tab-pane ai-pane">
              <h3>Опис використання штучного інтелекту (Звіт згідно з критеріями)</h3>
              <div className="ai-report-grid">
                <div className="ai-card">
                  <h4>Як саме використовувався ШІ</h4>
                  <p>
                    ШІ (Google Gemini) було використано в якості інтерактивного парного програміста (AI Pair Programmer) для:
                  </p>
                  <ul>
                    <li>Створення сучасної структури проєкту на базі Vite + React;</li>
                    <li>Генерації якісного українського контенту навчальних курсів;</li>
                    <li>Побудови естетичного UI/UX дизайну на чистих CSS-змінних із дотриманням принципів доступності;</li>
                    <li>Формування детальної схеми передачі props та відповідей на контрольні запитання.</li>
                  </ul>
                </div>

                <div className="ai-card">
                  <h4>Які рекомендації ШІ прийнято</h4>
                  <ul>
                    <li>
                      <strong>Використання деструктуризації props:</strong> Прийнято, оскільки <code>function CourseCard({'{ title, instructor... }'})</code> є сучасним стандартом чистого коду в React.
                    </li>
                    <li>
                      <strong>Динамічна зміна доступності (onToggleEnroll):</strong> Прийнято як індивідуальне завдання, оскільки це наочно демонструє, як зміна props оновлює UI.
                    </li>
                    <li>
                      <strong>Створення інтерактивної вкладки для захисту:</strong> Прийнято, що полегшує демонстрацію викладачеві безпосередньо у вікні застосунку.
                    </li>
                  </ul>
                </div>

                <div className="ai-card">
                  <h4>Які рекомендації відхилено і чому</h4>
                  <ul>
                    <li>
                      <strong>Використання важких сторонніх CSS-фреймворків (Tailwind або Bootstrap):</strong> Відхилено на користь чистого ванільного CSS, щоб краще розуміти каскадні стилі та правила оформлення компонентів React.
                    </li>
                    <li>
                      <strong>Створення трьох окремих компонентів:</strong> Відхилено, адже це суперечило б базовим принципам React (DRY, component reusability).
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
          Лабораторна робота з React | Розроблено відповідно до критеріїв оцінювання (12 балів)
        </p>
      </footer>
    </div>
  );
}

export default App;
