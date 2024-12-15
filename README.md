# Moonbot Backend

## Архитектура проекта

```
// Конфигурационные файлы для разных окружений.
/environments
|-- development.ts          // Настройки для разработки.
|-- environment.config.ts   // Конфигурационный файл для переменных окружения;
|-- production.ts           // Настройки для боевого окружения.
|-- testing.ts              // Настройки для тестирования.

// Основной исходный код приложения.
/src

// Содержит настройки и конфигурацию для всего приложения.
|-- /config

// Содержит код, связанный с подключением к базе данных.
|-- /database
|   |-- database.module.ts

// Каждый модуль соответствует бизнес-логике приложения. Содержит контроллеры, сервисы и специфичные для модуля компоненты.
|-- /modules
|   |-- bonuses/            // Управление бонусами для пользователей
|   |   |-- bonuses.controller.ts
|   |   |-- bonuses.module.ts
|   |   |-- bonuses.service.ts
|   |-- cards/              // Логика работы с картами
|   |-- payment-methods/    // Логика управления методами оплаты
|   |   |-- payment-methods.controller.ts
|   |   |-- payment-methods.module.ts
|   |   |-- payment-methods.service.ts
|   |-- referrals/          // Работа с реферальной программой
|   |   |-- referrals.controller.ts
|   |   |-- referrals.module.ts
|   |   |-- referrals.service.ts
|   |-- requests/           // Логика работы с раскладами пользователей
|   |-- roles/              // Управление ролями пользователей
|   |   |-- roles.controller.ts
|   |   |-- roles.module.ts
|   |   |-- roles.service.ts
|   |-- tariffs/            // Работа с тарифами, управление подписками и их условиями.
|   |-- transactions/       // Логика управления транзакциями
|   |-- users/              // Управление пользователями
|   |   |-- users.controller.ts
|   |   |-- users.module.ts
|   |   |-- users.service.ts

// Содержит компоненты, используемые в разных модулях приложения.
|-- /shared
|   |-- dto/                // Data Transfer Objects (DTO) для определения входящих и исходящих данных.
|   |   |-- api.dto.ts
|   |   |-- bonus.dto.ts
|   |   |-- payment-method.dto.ts
|   |   |-- referral.dto.ts
|   |   |-- role.dto.ts
|   |   |-- user.dto.ts
|   |-- entities            // Сущности базы данных, используемые во всем проекте.
|   |   |-- bonus.entity.ts             // Сущность бонуса в БД.
|   |   |-- card.entity.ts              // Сущность карты таро в БД.
|   |   |-- payment-method.entity.ts    // Сущность способа оплаты в БД.
|   |   |-- referral.entity.ts          // Сущность реферальной системы в БД.
|   |   |-- request.entity.ts           // Сущность расклада в БД.
|   |   |-- role.entity.ts              // Сущность роли в БД.
|   |   |-- tariff.entity.ts            // Сущность тарифа в БД.
|   |   |-- transactions.entity.ts      // Сущность транзакции в БД.
|   |   |-- user.entity.ts              // Сущность пользователя в БД.
|   |-- enums            // Перечисления, используемые во всем проекте.
|   |   |-- bonuses.enum.ts
|   |-- utils            // Утилиты, используемые во всем проекте.
|   |   |-- mapper.util.ts

// Главный модуль приложения. Импортирует все модули, включая модули базы данных, бизнес-логики и общие модули.
|-- app.module.ts

// Точка входа в приложение.
|-- main.ts
```