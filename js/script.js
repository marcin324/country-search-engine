'use strict';

/* Zmienne: z adresem URL; lista państw, nagłówek, górny niebieski pasek */
var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = document.getElementById('countries');
var topBlueBar = document.querySelector('.top-blue-bar');

/* Przywiązanie do buttona funkcji wyszukującej kraje */
document.getElementById('search').addEventListener('click', function(){
	topBlueBar.style.display = 'none';
	searchCountries();
});

/* Funkcja wyszukaująca państwa na podstawie informacji wprowadzonych w pole input ('country-name') */
function searchCountries(){
	var countryName = document.getElementById('country-name').value;
	if(!countryName.length){
		countryName = 'Poland';
	}
	fetch(url + countryName)
	.then(function(resp){
		return resp.json();
	})
	.then(showCountriesList);
};

/* Funkcja wyświetlająca informacje o państwach */
function showCountriesList(resp){
	countriesList.innerHTML = '';
	resp.forEach(function(item){

		var languages = item.languages.map(function(lang){
			return lang.name;
		})

		var currencies = item.currencies.map(function(cur){
			return cur.name + ' (' + cur.code + ')';
		})

		/* Flaga */
		var countryFlag = document.createElement('img');
		countryFlag.setAttribute('src', item.flag);
		countriesList.appendChild(countryFlag);
		
		/* Nazwa państwa */
		var country = document.createElement('div');
		country.innerHTML = '<p>' + item.name + '</p>';
		countriesList.appendChild(country);

		country.className = 'country';
		country.firstChild.className = 'country-name';

		/* Lewa komórka: stolica, powierzchnia...itp. */
		var dataName = document.createElement('div');
		dataName.innerHTML = '<p>' + 'Capital' + '<br></p><p>' + 'Land area' + '<br></p><p>' + 'Population' + '<br></p><p>' + 'Languages' 
		+ '<br></p><p>' + 'Currencies' + '<br></p>';
		dataName.className = 'data-name';
		country.appendChild(dataName);

		/* Prawa komórka - nazwa stolicy, powierzchnia w km kwadr...itp. */
		var data = document.createElement('div');
		data.innerHTML = '<p>' + item.capital + '<br></p><p>' + item.area + ' sq. km.<br></p><p>' + item.population + '<br></p><p>' 
		+ languages.join(', ') + '<br></p><p>' + currencies.join(', ') + '</p>';
		country.appendChild(data);
		data.className = 'data';
		
		/* Dolny niebieski pasek */
		var bottomBlueBar = document.createElement('div');
		bottomBlueBar.className = 'bottom-blue-bar';
		dataName.appendChild(bottomBlueBar);
		
		/* Dolny niebieski pasek */
		var bottomBlueBar = document.createElement('div');
		bottomBlueBar.className = 'bottom-blue-bar';
		data.appendChild(bottomBlueBar);

		/* Górny niebieski pasek */
		topBlueBar.style.display = 'inline-block';
	});
};