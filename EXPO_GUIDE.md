# Инструкция по запуску проекта через Expo (React Native)

Поскольку наш текущий код написан с использованием TailwindCSS, лучшим способом перенести его в React Native является использование **Expo** + **NativeWind** (это Tailwind для React Native).

Вот пошаговая инструкция, как развернуть этот проект у себя на компьютере и запустить на телефоне:

## Шаг 1: Создание проекта
Откройте терминал на вашем компьютере и выполните команду создания пустого проекта Expo:
```bash
npx create-expo-app yaya-mobile
cd yaya-mobile
```

## Шаг 2: Установка зависимостей
Установим инструменты для работы со стилями (Tailwind / NativeWind), иконки и менеджер состояний:
```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npm install lucide-react-native zustand
```

(Установка навигации):
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

## Шаг 3: Настройка NativeWind (Tailwind CSS)
1. Выполните команду инициализации Tailwind:
```bash
npx tailwindcss init
```
2. Откройте файл `tailwind.config.js` и замените его содержимое на:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
3. Откройте файл `babel.config.js` и добавьте плагин NativeWind:
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"], // <-- Добавьте эту строку
  };
};
```

## Шаг 4: Перенос кода из Google AI Studio
1. Скачайте код из AI Studio (кликнув на настройки ⚙️ в правом верхнем углу экрана -> **Export to ZIP**).
2. Распакуйте архив.
3. В вашем проекте `yaya-mobile` создайте папку `src`.
4. Перенесите туда наши адаптированные экраны (например, тот файл `react-native-export-Children.tsx`, который мы создали).
5. Замените ваш `App.js` на код навигатора (мы можем написать его вместе в AI Studio).

## Шаг 5: Запуск на реальном телефоне!
1. Скачайте приложение **Expo Go** на ваш iPhone из App Store или на Android из Google Play.
2. В терминале на компьютере выполните команду:
```bash
npx expo start
```
3. На экране появится QR-код. Откройте камеру на телефоне (для iOS) или само приложение Expo Go (для Android) и отсканируйте код.

Готово! Приложение откроется на вашем телефоне, и любые изменения в коде будут мгновенно отображаться на экране (Hot Reload).
