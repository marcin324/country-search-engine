'use strict';

/* Zmienne: z adresem URL; lista państw, nagłówek, górny niebieski pasek */
var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = document.getElementById('countries');
var header = document.querySelector('.header');
var topBlueBar = document.querySelector('.top-blue-bar');

/* Przywiązanie do buttona funkcji wyszukującej kraje */
document.getElementById('search').addEventListener('click', function(){
	header.className = 'header';
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
	header.className = 'header-active';
	resp.forEach(function(item){

		/* Flaga */
		var countryFlag = document.createElement('img');
		countryFlag.setAttribute('src', item.flag);
		countriesList.appendChild(countryFlag);
		
		/* Nazwa państwa */
		var liEl1 = document.createElement('div');
		liEl1.innerHTML = '<p>' + item.name + '</p>';
		countriesList.appendChild(liEl1);

		liEl1.className = 'country';
		liEl1.firstChild.className = 'country-name';

		/* Lewa komórka: stolica, powierzchnia...itp. */
		var liEl2 = document.createElement('div');
		liEl2.innerHTML = '<p>' + 'Capital' + '<br>' + '<p>' + 'Land area' + '<br>' + '<p>' + 'Population' + '<br>';
		liEl2.className = 'data-name';
		liEl1.appendChild(liEl2);

		/* Prawa komórka - nazwa stolicy, powierzchnia w km kwadr...itp. */
		var liEl3 = document.createElement('div');
		liEl3.innerHTML = '<p>' + item.capital + '<br>' + '<p>' + item.area + ' sq. km.' + '<br>' + '<p>' + item.population + '<br>';
		liEl1.appendChild(liEl3);
		liEl3.className = 'data';
		/*var liEl4 = liEl1.lastChild;*/
		
		/* Dolny niebieski pasek */
		var bottomBlueBar = document.createElement('div');
		bottomBlueBar.className = 'bottom-blue-bar';
		liEl2.appendChild(bottomBlueBar);
		
		/* Dolny niebieski pasek */
		var bottomBlueBar = document.createElement('div');
		bottomBlueBar.className = 'bottom-blue-bar';
		liEl3.appendChild(bottomBlueBar);

		/* Górny niebieski pasek */
		topBlueBar.style.display = 'inline-block';
	});
};