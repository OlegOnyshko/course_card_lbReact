import React from 'react';
import {
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Star,
  ChevronRight,
  Info,
  Heart
} from 'lucide-react';
import './CourseCard.css';

/**
 * Компонент CourseCard
 * Приймає дані про навчальний курс через props:
 * @param {number} id - Унікальний ідентифікатор курсу
 * @param {string} title - Назва курсу
 * @param {string} instructor - Ім'я викладача
 * @param {string} duration - Тривалість курсу (години/тижні)
 * @param {string} description - Короткий опис курсу
 * @param {boolean} isAvailable - Доступність для запису (true/false)
 * @param {string} [category] - Категорія/напрямок
 * @param {string} [level] - Рівень складності (Початковий/Середній/Просунутий)
 * @param {number} [rating] - Рейтинг курсу (1-5)
 * @param {number} [availableSeats] - Кількість вільних місць
 * @param {string} [accentColor] - Колір акценту
 * @param {boolean} [isFavorite] - Чи додано курс до збережених (обраного)
 * @param {Function} [onSelectDetails] - Відкрити екран деталей вибраного курсу
 * @param {Function} [onToggleFavorite] - Додати/видалити з обраного
 * @param {Function} [onToggleEnroll] - Змінити статус доступності (props тест)
 */
function CourseCard({
  id,
  title,
  instructor,
  duration,
  description,
  isAvailable,
  category = 'IT & Програмування',
  level = 'Для початківців',
  rating = 4.9,
  availableSeats = 5,
  accentColor = '#6366f1',
  isFavorite = false,
  onSelectDetails,
  onToggleFavorite,
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
        
        <div className="card-top-right">
          {/* Кнопка швидкого збереження в обране (Лабораторна 2) */}
          {onToggleFavorite && (
            <button
              type="button"
              className={`favorite-icon-btn ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Вилучити зі збереженого' : 'Зберегти курс'}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(id);
              }}
              aria-label={isFavorite ? 'Вилучити з обраного' : 'Зберегти курс'}
            >
              <Heart size={18} className={isFavorite ? 'heart-active' : ''} />
            </button>
          )}

          <div className="rating-badge">
            <Star className="icon-star" size={15} />
            <span>{typeof rating === 'number' ? rating.toFixed(1) : '5.0'}</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <h3 className="course-title" title={title}>
          {title}
        </h3>

        {/* Короткий опис курсу (Вимога Лабораторної 1) */}
        {description && (
          <p className="course-short-desc">
            {description}
          </p>
        )}

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

        {/* Статус доступності (Вимога Лабораторної 1: «Запис відкрито» або «Запис закрито») */}
        <div className="status-section">
          <div className={`status-pill ${isAvailable ? 'status-open' : 'status-full'}`}>
            {isAvailable ? (
              <>
                <CheckCircle2 className="status-icon" size={16} />
                <span>Запис відкрито</span>
              </>
            ) : (
              <>
                <XCircle className="status-icon" size={16} />
                <span>Запис закрито</span>
              </>
            )}
          </div>

          <span className="seats-info">
            {isAvailable ? `Вільних місць: ${availableSeats}` : 'Місць немає'}
          </span>
        </div>
      </div>

      <div className="card-footer">
        {/* Дія «Детальніше» (Лабораторна робота 1: відкриває детальний екран) */}
        {onSelectDetails && (
          <button
            type="button"
            className="btn-details-action"
            onClick={() => onSelectDetails(id)}
            title="Переглянути деталі саме цього курсу"
          >
            <Info size={16} />
            <span>Детальніше</span>
          </button>
        )}

        {/* Дія запису */}
        <button
          className={`action-btn ${isAvailable ? 'btn-primary' : 'btn-disabled'}`}
          disabled={!isAvailable}
          onClick={() => alert(`Ви успішно подали заявку на курс: "${title}"`)}
        >
          <span>{isAvailable ? 'Записатися' : 'Закрито'}</span>
          <ChevronRight size={16} />
        </button>

        {/* Дія перемикання статусу (для демонстрації оновлення props) */}
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
