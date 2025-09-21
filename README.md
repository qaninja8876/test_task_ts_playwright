# Discogs API Test Project

Проект для демонстрации паттернов **Page Object Model (POM)** и **Service Object Model (SOM)** на примере тестирования API магазина винила Discogs.

## Описание

Тестовый фреймворк демонстрирует современные подходы к автоматизации тестирования API с использованием:

- **Page Object Model** - для структурирования UI тестов
- **Service Object Model** - для организации API тестов
- **TypeScript** - для типизации и лучшей поддержки IDE
- **Playwright** - как основной инструмент тестирования
- **Allure** - для генерации подробных отчетов

## Структура проекта

```
src/
├── fixtures           # Основные фикстуры
├── api/tests          # API сервисы (SOM паттерн)
├── ui/tests           # UI тесты (POM паттерн)
└── utils/             # Вспомогательные утилиты
```

## Установка

```bash
# Клонирование репозитория
git clone https://github.com/qaninja8876/test_task_ts_playwright.git
cd test_task_ts_playwright

# Установка зависимостей
npm install

# Установка браузеров Playwright
npx playwright install
```

## Настройка

1. Создайте файл `.env` в корне проекта
2. Добавьте необходимые переменные окружения:

```env
API_BASE_URL=https://api.discogs.com
USER_TOKEN=your_discogs_token
```

## Запуск тестов

### Основные команды

```bash
# Запуск всех тестов
npm test

# Запуск тестов в headed режиме
npm run test:headed

# Запуск тестов в debug режиме
npm run test:debug

# Запуск тестов с UI
npm run test:ui
```

### Allure отчеты

```bash
# Генерация и открытие Allure отчета
npm run test:allure

# Только генерация отчета
npm run allure:generate

# Открытие готового отчета
npm run allure:open

# Запуск Allure сервера
npm run allure:serve
```

### Дополнительные команды

```bash
# Просмотр HTML отчета Playwright
npm run test:report

# Очистка отчетов Allure
npm run allure:clean
```

## CI/CD

Проект настроен для автоматического запуска тестов в GitHub Actions с публикацией Allure отчетов на GitHub Pages.

## Технологический стек

- **TypeScript** - язык разработки
- **Playwright** - фреймворк для тестирования
- **Allure** - отчетность
- **Node.js** - среда выполнения
- **GitHub Actions** - CI/CD

## Паттерны проектирования

### Page Object Model (POM)

Используется для UI тестов, где каждая страница представлена отдельным классом с методами взаимодействия с элементами.

### Service Object Model (SOM)

Применяется для API тестов, где каждый сервис инкапсулирует логику работы с определенными эндпоинтами.

## Структура тестов

- **API тесты** - проверка функциональности REST API
- **UI тесты** - тестирование пользовательского интерфейса
