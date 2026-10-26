import React from 'react';
import { Clock, User, CheckCircle2, XCircle, Star, BookOpen, ChevronRight } from 'lucide-react';
import './CourseCard.css';

/**
 * Компонент CourseCard
 * Приймає дані про навчальний курс через props:
 * @param {string} title - Назва курсу
 * @param {string} instructor - Ім'я викладача
 * @param {string} duration - Тривалість курсу (години/тижні)
 * @param {boolean} isAvailable - Доступність для запису (true/false)
 * @param {string} [category] - Категорія/напрямок
 * @param {string} [level] - Рівень складності (Початковий/Середній/Просунутий)
 * @param {number} [rating] - Рейтинг курсу (1-5)
 * @param {number} [availableSeats] - Кількість вільних місць
 * @param {Function} [onToggleEnroll] - Функція зміни статусу запису
 */
function CourseCard({
  id,
  title,
  instructor,
  duration,
  isAvailable,
  category = 'IT & Програмування',
  level = 'Для початківців',
  rating = 4.9,
  availableSeats = 5,
  accentColor = '#6366f1',
  onToggleEnroll
}) {
  return (
    <article
      className={`course-card ${isAvailable ? 'is-available' : 'is-closed'}`}
      style={{ '--accent-color': accentColor }}
      id={`course-card-${id}`}
    >
      <div className="card-header">
        <div className="card-tags">
          <span className="category-tag">{category}</span>
          <span className="level-tag">{level}</span>
        </div>
        <div className="rating-badge">
          <Star className="icon-star" size={15} />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="course-title" title={title}>
          {title}
        </h3>

        <div className="course-meta">
          <div className="meta-item instructor-info">
            <User className="meta-icon" size={17} />
            <div>
              <span className="meta-label">Викладач:</span>
              <strong className="meta-value">{instructor}</strong>
            </div>
          </div>

          <div className="meta-item duration-info">
            <Clock className="meta-icon" size={17} />
            <div>
              <span className="meta-label">Тривалість:</span>
              <strong className="meta-value">{duration}</strong>
            </div>
          </div>
        </div>

        <div className="status-section">
          <div className={`status-pill ${isAvailable ? 'status-open' : 'status-full'}`}>
            {isAvailable ? (
              <>
                <CheckCircle2 className="status-icon" size={16} />
                <span>Запис відкритий</span>
              </>
            ) : (
              <>
                <XCircle className="status-icon" size={16} />
                <span>Група набрана</span>
              </>
            )}
          </div>

          <span className="seats-info">
            {isAvailable ? `Вільних місць: ${availableSeats}` : 'Місць немає'}
          </span>
        </div>
      </div>

      <div className="card-footer">
        <button
          className={`action-btn ${isAvailable ? 'btn-primary' : 'btn-disabled'}`}
          disabled={!isAvailable}
          onClick={() => alert(`Ви успішно подали заявку на курс: "${title}"`)}
        >
          <span>{isAvailable ? 'Записатися на курс' : 'Очікувати набору'}</span>
          <ChevronRight size={16} />
        </button>

        {onToggleEnroll && (
          <button
            type="button"
            className="toggle-status-btn"
            title="Змінити статус доступності (props тест)"
            onClick={() => onToggleEnroll(id)}
          >
            Змінити статус
          </button>
        )}
      </div>
    </article>
  );
}

export default CourseCard;
