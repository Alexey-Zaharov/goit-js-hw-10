const debounce = require('lodash.debounce');
import { fetchCountries } from '../js-components/api-service';
import Notiflix from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputData = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function renderCountreisListMurkup(evt) {
  const data = evt.target.value.trim();
  if (evt.target.value === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(data)
    .then(countreis => {
      if (countreis.length >= 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        if (countreis.length >= 2 && countreis.length <= 10) {
          countryInfo.innerHTML = '';
          const markupListMurkup = countreis
            .map(country => {
              return `<li class = "country-list_item">
        <img class = "country-flag" src = "${country.flags.svg}" alt = "${country.flags.alt} " height = "50px">
        </img> <p><b>${country.name.official} </b></p>
        </li>`;
            })
            .join('');
          countryList.innerHTML = markupListMurkup;
        }

        if (countreis.length === 1) {
          countryList.innerHTML = '';
          const markupInfoMurkup = countreis
            .map(country => {
              return `
        <img class = "country-flag" src = "${country.flags.svg}" alt = "${
                country.flags.alt
              } " height = "160px">
        </img> 
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Language</b>: ${Object.values(country.languages)}</p>`;
            })
            .join('');
          countryInfo.innerHTML = markupInfoMurkup;
        }
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

inputData.addEventListener(
  'input',
  debounce(renderCountreisListMurkup, DEBOUNCE_DELAY)
);

// function renderCountreisListMurkup(countreis = []) {
//   if (countreis.length >= 2 && countreis.length <= 10) {
//     countryInfo.innerHTML = '';
//     const markupListMurkup = countreis
//       .map(country => {
//         return `<li class = "country-list_item">
//         <img class = "country-flag" src = "${country.flags.svg}" alt = "${country.flags.alt} " height = "50px">
//         </img> <p><b>${country.name.official} </b></p>
//         </li>`;
//       })
//       .join('');
//     countryList.innerHTML = markupListMurkup;
//   }

//   if (countreis.length === 1) {
//     countryList.innerHTML = '';
//     const markupInfoMurkup = countreis
//       .map(country => {
//         return `<div class = "country-info_item">
//         <img class = "country-flag" src = "${country.flags.svg}" alt = "${
//           country.flags.alt
//         } " height = "50px">
//         </img> <p><b>${country.name.official} </b></p>
//         </div>
//           <p><b>Capital</b>: ${country.capital}</p>
//           <p><b>Population</b>: ${country.population}</p>
//           <p><b>Language</b>: ${Object.values(country.languages)}</p>`;
//       })
//       .join('');
//     countryInfo.innerHTML = markupInfoMurkup;
//   }
// }
// ---------------------------------
// inputData.addEventListener('input', evt => {
//   if (evt.currentTarget.value === '') {
//     countryList.innerHTML = '';
//     countryInfo.innerHTML = '';
//     return;
//   }
//   const name = evt.currentTarget.value;
//   fetchCountries(name)
//     .then(countreis => {
//       if (countreis.length >= 10) {
//         Notiflix.Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       } else {
//         renderCountreisListMurkup(countreis);
//       }
//       console.log(countreis);
//     })
//     .catch(() => {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//     });
// });
// __________________________________________________
