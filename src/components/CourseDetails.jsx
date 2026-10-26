import React from 'react';
import {
  ArrowLeft,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Star,
  AlertTriangle,
  BookOpen,
  Calendar,
  Award,
  Heart
} from 'lucide-react';
import './CourseDetails.css';

/**
 * Компонент CourseDetails
 * Відображає детальний екран вибраного курсу або повідомлення про помилку (якщо курс не знайдено)
 * 
 * @param {Object|null} course - Об'єкт вибраного курсу або null/undefined
 * @param {number} requestedId - ID курсу, який шукали
 * @param {Function} onBack - Функція повернення до каталогу курсів
 * @param {boolean} isFavorite - Чи додано курс до збережених (обраного)
 * @param {Function} onToggleFavorite - Колбек додавання/вилучення з обраного
 * @param {Function} onToggleEnroll - Колбек зміни статусу доступності для демонстрації
 */
function CourseDetails({
  course,
  requestedId,
  onBack,
  isFavorite,
  onToggleFavorite,
  onToggleEnroll
}) {
  // Випадок 1: Курс із запитаним ID відсутній (Лабораторна робота 1: "Якщо курс із потрібним id відсутній, покажіть повідомлення й шлях назад")
  if (!course) {
    return (
      <section className="course-not-found" aria-label="Повідомлення про відсутній курс">
        <div className="not-found-card">
          <div className="not-found-icon-wrap">
            <AlertTriangle size={48} className="not-found-icon" />
          </div>
          <span className="not-found-code">Помилка 404: Курс не знайдено</span>
          <h2 className="not-found-title">Навчальний курс не існує</h2>
          <p className="not-found-message">
            Курс з ідентифікатором <strong>#{requestedId || 'невідомий'}</strong> не знайдено в базі даних 
            або набір на нього було повністю закрито та вилучено. Застосунок стабільно обробив цей стан без збоїв.
          </p>
          <div className="not-found-actions">
            <button onClick={onBack} className="btn-back-primary">
              <ArrowLeft size={18} />
              <span>Повернутися до списку курсів</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Випадок 2: Курс успішно знайдено
  return (
    <article className="course-details-view" style={{ '--accent-color': course.accentColor || '#6366f1' }}>
      {/* Кнопка швидкого повернення */}
      <div className="details-top-bar">
        <button onClick={onBack} className="btn-back-nav" title="Повернутися до каталогу">
          <ArrowLeft size={18} />
          <span>Назад до списку курсів</span>
        </button>

        <div className="details-header-actions">
          <button
            onClick={() => onToggleFavorite(course.id)}
            className={`btn-favorite-action ${isFavorite ? 'is-fav' : ''}`}
            title={isFavorite ? 'Вилучити з обраного' : 'Зберегти в обране'}
          >
            <Heart size={18} className={isFavorite ? 'heart-filled' : ''} />
            <span>{isFavorite ? 'В обраному' : 'Зберегти курс'}</span>
          </button>
        </div>
      </div>

      {/* Головна картка подробиць */}
      <div className="details-hero-card">
        <div className="details-badge-row">
          <span className="category-pill">{course.category || 'IT & Розробка'}</span>
          <span className="level-pill">{course.level || 'Всі рівні'}</span>
          <div className="rating-pill">
            <Star size={15} className="star-icon" />
            <span>{course.rating ? course.rating.toFixed(1) : '5.0'}</span>
          </div>
          <span className="course-id-tag">ID: #{course.id}</span>
        </div>

        <h1 className="details-title">{course.title}</h1>
        <p className="details-lead-description">{course.description}</p>

        {/* Статус доступності (Вимога Лабораторної 1: "Покажіть зрозумілий текст залежно від доступності") */}
        <div className="details-availability-banner">
          <div className={`availability-badge ${course.isAvailable ? 'badge-open' : 'badge-closed'}`}>
            {course.isAvailable ? (
              <>
                <CheckCircle2 size={20} />
                <strong>Запис відкрито</strong>
              </>
            ) : (
              <>
                <XCircle size={20} />
                <strong>Запис закрито</strong>
              </>
            )}
          </div>
          <span className="seats-caption">
            {course.isAvailable
              ? `Залишилося вільних місць у групі: ${course.availableSeats || 5}`
              : 'Усі вільні місця заповнено. Слідкуйте за наступним набором.'}
          </span>
        </div>
      </div>

      {/* Сітка параметрів курсу */}
      <div className="details-grid">
        <div className="details-info-block">
          <div className="info-item">
            <div className="info-icon-box">
              <User size={22} />
            </div>
            <div>
              <span className="info-label">Викладач курсу</span>
              <strong className="info-value">{course.instructor}</strong>
              <span className="info-sub">Senior практик із 8+ роками досвіду</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon-box">
              <Clock size={22} />
            </div>
            <div>
              <span className="info-label">Тривалість навчання</span>
              <strong className="info-value">{course.duration}</strong>
              <span className="info-sub">Практичні заняття двічі на тиждень</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon-box">
              <Calendar size={22} />
            </div>
            <div>
              <span className="info-label">Формат занять</span>
              <strong className="info-value">Онлайн / Live-сесії</strong>
              <span className="info-sub">З доступом до відеозаписів та код-рев'ю</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon-box">
              <Award size={22} />
            </div>
            <div>
              <span className="info-label">Сертифікація</span>
              <strong className="info-value">Сертифікат про завершення</strong>
              <span className="info-sub">Із підтвердженням виконання курсового проєкту</span>
            </div>
          </div>
        </div>

        {/* Програма навчання / Опис */}
        <div className="details-curriculum-block">
          <h3 className="block-title">
            <BookOpen size={20} />
            <span>Що ви опануєте на курсі</span>
          </h3>
          <ul className="learning-points">
            <li>
              <strong>Поглиблена теорія та практика:</strong> Детальний розбір реальних кейсів 
              із комерційної розробки на прикладі реальних завдань.
            </li>
            <li>
              <strong>Побудова портфоліо:</strong> Створення та публікація власного завершеного 
              проєкту на GitHub.
            </li>
            <li>
              <strong>Менторська підтримка:</strong> Індивідуальні консультації, розбір помилок 
              і рекомендації від викладача ({course.instructor}).
            </li>
            <li>
              <strong>Сучасні інструменти:</strong> Робота за актуальними стандартами індустрії.
            </li>
          </ul>

          {/* Панель дій та кнопок */}
          <div className="details-action-box">
            <button
              className={`btn-enroll-large ${course.isAvailable ? 'btn-available' : 'btn-disabled'}`}
              disabled={!course.isAvailable}
              onClick={() => alert(`Заявку на курс «${course.title}» успішно зареєстровано!`)}
            >
              <span>{course.isAvailable ? 'Подати заявку на навчання' : 'Запис тимчасово призупинено'}</span>
            </button>

            {onToggleEnroll && (
              <button
                type="button"
                className="btn-toggle-demo"
                onClick={() => onToggleEnroll(course.id)}
                title="Тестування зміни props та оновлення стану"
              >
                Змінити доступність (Тест реактивності)
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CourseDetails;
