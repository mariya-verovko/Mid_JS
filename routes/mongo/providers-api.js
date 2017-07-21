var providers = [
    {"id":1, "name":"Первый поставщик"},
	{"id":2, "name":"Вторoй поставщик"},
	{"id":3, "name":"Третий поставщик"},
	{"id":4, "name":"Четвертый поставщик"},
	{"id":5, "name":"Пятый поставщик"}
];

exports.providers = function(req, res) {
	console.log("Providers handler!");
	res.send(providers);
};

