const URL_APP = "https://script.google.com/macros/s/AKfycbwELU_28OZEAGuzCTmhJDDk6Jjd2RJb5PpealiESEJYfVIwWunQZY61ZeN9Py3Ev1DB/exec";

// находим форму в документе
const form = document.querySelector("#form");
// указываем адрес отправки формы (нужно только в начале примера)
form.action = URL_APP;

// вспомогательная функция проверки заполненности формы
function isFilled(details) {
	const { name, email, about, theme } = details;
	if (!name) return false;
	if (!email) return false;
	if (!about) return false;
	if (!theme) return false;
	return true;
}

// навешиваем обработчик на отправку формы
form.addEventListener("submit", async (ev) => {
	// отменяем действие по умолчанию
	ev.preventDefault();

	// получаем ссылки на элементы формы
	const name = document.querySelector("[name=name]");
	const email = document.querySelector("[name=email]");
	const message = document.querySelector("[name=message]");
	const theme = document.querySelector("[name=theme]");
	// собираем данные из элементов формы
	let details = {
		name: name.value.trim(),
		email: email.value.trim(),
		message: message.value.trim(),
		theme: theme.value.trim(),
	};

	// если поля не заполнены - прекращаем обработку

	// подготавливаем данные для отправки
	let formBody = [];
	for (let property in details) {
		// кодируем названия и значения параметров
		let encodedKey = encodeURIComponent(property);
		let encodedValue = encodeURIComponent(details[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	// склеиваем параметры в одну строку
	formBody = formBody.join("&");

	// выполняем отправку данных в Google Apps
	const result = await fetch(URL_APP, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		cors: "no-cors",
		body: formBody,
	})
		.then((res) => res.json())
		.catch((err) => alert("Ошибка!"));
	// .then((res) => console.log(res));

	if (result.type === "success") {
		name.value = "";
		email.value = "";
		theme.value = "";
		message.value = "";
		alert("Спасибо за заявку!");
	}
	if (result.type === "error") {
		alert(`Ошибка( ${result.errors}`);
	}
});
