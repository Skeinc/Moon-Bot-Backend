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
|   |-- database.module.ts  // Модуль подключения к базе данных, настройка ORM и подключения к PostgreSQL.

// Каждый модуль соответствует бизнес-логике приложения. Содержит контроллеры, сервисы и специфичные для модуля компоненты.
|-- /modules
|   |-- bonuses/            // Управление бонусами для пользователей
|   |   |-- bonuses.controller.ts
|   |   |-- bonuses.module.ts
|   |   |-- bonuses.service.ts
|   |-- payment-methods/    // Логика управления методами оплаты
|   |   |-- payment-methods.controller.ts
|   |   |-- payment-methods.module.ts
|   |   |-- payment-methods.service.ts
|   |-- referrals/          // Работа с реферальной программой
|   |   |-- referrals.controller.ts
|   |   |-- referrals.module.ts
|   |   |-- referrals.service.ts
|   |-- requests/           // Логика работы с раскладами пользователей
|   |   |-- requests.controller.ts
|   |   |-- requests.module.ts
|   |   |-- requests.service.ts
|   |-- roles/              // Управление ролями пользователей
|   |   |-- roles.controller.ts
|   |   |-- roles.module.ts
|   |   |-- roles.service.ts
|   |-- tariffs/            // Работа с тарифами, управление подписками и их условиями.
|   |   |-- tariffs.controller.ts
|   |   |-- tariffs.module.ts
|   |   |-- tariffs.service.ts
|   |-- transactions/       // Логика управления транзакциями
|   |   |-- transactions.controller.ts
|   |   |-- transactions.module.ts
|   |   |-- transactions.service.ts
|   |-- users/              // Управление пользователями
|   |   |-- users.controller.ts
|   |   |-- users.module.ts
|   |   |-- users.service.ts

// Содержит компоненты, используемые в разных модулях приложения.
|-- /shared
|   |-- dto/                // Data Transfer Objects (DTO) для определения входящих и исходящих данных.
|   |   |-- api.dto.ts                  // Общий ответ API с флагом успеха/ошибки, сообщением и данными.
|   |   |-- bonus.dto.ts                // Data Transfer Objects (DTO) для бонусов.
|   |   |-- payment-method.dto.ts       // Data Transfer Objects (DTO) для способов оплаты.
|   |   |-- referral.dto.ts             // Data Transfer Objects (DTO) для реферальной системы.
|   |   |-- requests.dto.ts             // Data Transfer Objects (DTO) для раскладов.
|   |   |-- role.dto.ts                 // Data Transfer Objects (DTO) для ролей.
|   |   |-- tariff.dto.ts               // Data Transfer Objects (DTO) для тарифов.
|   |   |-- transactions.dto.ts         // Data Transfer Objects (DTO) для транзакций.
|   |   |-- user.dto.ts                 // Data Transfer Objects (DTO) для пользователей.
|   |-- entities            // Сущности базы данных, используемые во всем проекте.
|   |   |-- bonus.entity.ts             // Сущность бонуса в БД.
|   |   |-- payment-method.entity.ts    // Сущность способа оплаты в БД.
|   |   |-- referral.entity.ts          // Сущность реферальной системы в БД.
|   |   |-- request.entity.ts           // Сущность расклада в БД.
|   |   |-- role.entity.ts              // Сущность роли в БД.
|   |   |-- tariff.entity.ts            // Сущность тарифа в БД.
|   |   |-- transactions.entity.ts      // Сущность транзакции в БД.
|   |   |-- user.entity.ts              // Сущность пользователя в БД.
|   |-- enums            // Перечисления, используемые во всем проекте.
|   |   |-- bonuses.enum.ts             // Перечисления для бонусов.
|   |   |-- requests.enum.ts            // Перечисления для раскладов.
|   |   |-- transactions.enum.ts        // Перечисления для транзакций.
|   |-- utils            // Утилиты, используемые во всем проекте.
|   |   |-- mapper.util.ts              // Вспомогательные функции для маппинга данных между сущностями и DTO.
|   |   |-- referral-link.util.ts              // Вспомогательная функция для генерации реферальной ссылки.

// Главный модуль приложения. Импортирует все модули, включая модули базы данных, бизнес-логики и общие модули.
|-- app.module.ts

// Точка входа в приложение.
|-- main.ts
```