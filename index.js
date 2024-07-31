// Асинхронная функция для получения и отображения данных
async function fetchAndDisplayItems() {
	try {
			// Выполняем запрос к серверу
			let response = await fetch('https://3a0ba68e28f2d83a.mokky.dev/zzii');

			// Проверяем успешность запроса
			if (!response.ok) {
					throw new Error('Failed to fetch data');
			}

			// Преобразуем ответ в JSON
			let data = await response.json();

			// Фильтруем данные
			let filteredData = data.filter(item => item.id && item.title && item.description && item['date-add'] && item.price && item.imageUrl);

			// Отображаем карточки
			displayCards(filteredData);
	} catch (err) {
			// Обрабатываем ошибку
			console.log(err);

			// Ниже можно отображать сообщение об ошибке

			document.getElementById('root').innerHTML = `<p style="color: red;">Ошибка: ${err.message}</p>`;
	}
}

// Функция для отображения карточек
function displayCards(data) {
	const root = document.getElementById('root');
	root.innerHTML = data.map(item => createCard(item)).join('');
}

// Функция для создания карточки
function createCard(item) {
	return `
			<div class="card">
					<img src="${item.imageUrl}" alt="${item.title}">
					<h2>${item.title}</h2>
					<p>Описание: ${item.description}</p>
					<p>Цена: ${item.price}</p>
					<p>Дата добавления: ${item['date-add']}</p>
			</div>
	`;
}

// Вызов функции для получения данных
fetchAndDisplayItems();
