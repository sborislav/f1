-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Апр 02 2018 г., 18:06
-- Версия сервера: 5.7.21
-- Версия PHP: 7.1.13-1+0~20180105151623.14+stretch~1.gbp1086fa

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dfsdfe34qtera`
--

-- --------------------------------------------------------

--
-- Структура таблицы `block`
--

CREATE TABLE `block` (
  `id` int(11) NOT NULL,
  `link` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `template` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `style` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `block`
--

INSERT INTO `block` (`id`, `link`, `template`, `style`) VALUES
(1, '#one', 'one', 'one'),
(2, '#two', 'two', 'two'),
(3, '#three', 'three', 'three'),
(4, '#four', 'four', 'four'),
(5, '#five', 'five', 'five');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `block`
--
ALTER TABLE `block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
