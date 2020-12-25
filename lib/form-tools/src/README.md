
# Добавление своего поля

> Оставлю заметки, какие файлы посмотреть

1. **[fields/index.ts](./fields/index.ts)** - Регистрация файла (встроенный в TypeScript мини-бандлер)

2. **[fields/createField.tsx](./fields/createField.tsx)** - Регистрация файла (в процессе исполнения)

3. **[utils/initialValue.ts](./utils/initialValue.ts)** - Значение по-умолчанию для поля

4. **[utils/isManaged.ts](./utils/isManaged.ts)** - Я рекомендую каждое поле оборачивать в [makeManaged](./components/makeManaged.tsx)

5. **[common/TypedField.ts](./common/TypedField.ts)** - Объявление строгой типизации для пользователя
