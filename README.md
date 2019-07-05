# automated-form-fillout
 Definitely not to be used against right-wing censoring websites!!!
 
### Disclaimer
Please do not use this project to spam anyones forms. This is just a proof of concept to test out how easy it is to manipulate html forms. I am not responsible for any damages you cause.

## Setup
1. Download this repo
2. Run ```npm install``` in the main direcotry
3. After successfully installing the dependencies, you are done

## How to use
Just run ```npm run start``` or ```npm start``` and let the magic happen!

## How to extend
The current database of names, text pieces and introductions is not quite big. If you want to help extending the database, just add a new string to the json files in the ```texts``` folder and create a pull requests

| File | Purpose | Placeholders |
| ---- | ------- | ------------ |
| salutations.json | Greetings | - |
| introductions.json | The first sentence | {NAME}, {REASON}, {PLACE} |
| names.json | First names | - |
| lastnames.json | Last names | - |
| places.json | Places where you found {REASON} | - |
| reasons.json | The reason, why you are writing the message | - |
| websiteintroductions.json | The sentence before the domain URL | - |
| websiteparts.json | Main words for the domain | - |
| websitepartsinbetweens.json | Connecting words for the domain | - |
| mailhosts.json | Free mail hosters | - |
| cities.json | Cities and places | - |
| endings.json | Final sentences | - |
| endingsalutations.json | Salutations before the name | - |

## Contributing
Feel free to contribute to this proof of concept by opening issues and pull requests.