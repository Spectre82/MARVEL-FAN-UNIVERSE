import { Hero } from '../types';

export const heroes: Hero[] = [
  {
    id: 'iron-man',
    name: 'Iron Man',
    alterEgo: 'Tony Stark',
    image: 'https://images.pexels.com/photos/10321131/pexels-photo-10321131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Genius billionaire playboy philanthropist who built a powered armored suit to escape captivity and now uses his technology to protect the world as Iron Man.',
    firstAppearance: 'Tales of Suspense #39 (March 1963)',
    abilities: ['Genius-level intellect', 'Master engineer', 'Powered armor suit', 'Repulsor technology'],
    mcuAppearances: ['Iron Man (2008)', 'The Incredible Hulk (2008)', 'Iron Man 2 (2010)', 'The Avengers (2012)', 'Iron Man 3 (2013)', 'Avengers: Age of Ultron (2015)', 'Captain America: Civil War (2016)', 'Spider-Man: Homecoming (2017)', 'Avengers: Infinity War (2018)', 'Avengers: Endgame (2019)']
  },
  {
    id: 'captain-america',
    name: 'Captain America',
    alterEgo: 'Steve Rogers',
    image: 'https://images.pexels.com/photos/8546536/pexels-photo-8546536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A patriotic supersoldier who was enhanced to the peak of human physicality by an experimental serum. He leads the Avengers and symbolizes courage and honor.',
    firstAppearance: 'Captain America Comics #1 (March 1941)',
    abilities: ['Enhanced strength, speed, and endurance', 'Master tactician', 'Expert fighter', 'Vibranium shield'],
    mcuAppearances: ['Captain America: The First Avenger (2011)', 'The Avengers (2012)', 'Captain America: The Winter Soldier (2014)', 'Avengers: Age of Ultron (2015)', 'Captain America: Civil War (2016)', 'Avengers: Infinity War (2018)', 'Avengers: Endgame (2019)']
  },
  {
    id: 'thor',
    name: 'Thor',
    alterEgo: 'Thor Odinson',
    image: 'https://images.pexels.com/photos/6499182/pexels-photo-6499182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'The Norse God of Thunder and prince of Asgard who wields the enchanted hammer Mjolnir, granting him power over lightning and storms.',
    firstAppearance: 'Journey into Mystery #83 (August 1962)',
    abilities: ['Superhuman strength and durability', 'Weather manipulation', 'Control of Mjolnir', 'Near immortality'],
    mcuAppearances: ['Thor (2011)', 'The Avengers (2012)', 'Thor: The Dark World (2013)', 'Avengers: Age of Ultron (2015)', 'Thor: Ragnarok (2017)', 'Avengers: Infinity War (2018)', 'Avengers: Endgame (2019)', 'Thor: Love and Thunder (2022)']
  },
  {
    id: 'black-widow',
    name: 'Black Widow',
    alterEgo: 'Natasha Romanoff',
    image: 'https://images.pexels.com/photos/6499023/pexels-photo-6499023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A former KGB assassin and spy who defected to S.H.I.E.L.D. and now fights as a member of the Avengers, utilizing her exceptional combat skills.',
    firstAppearance: 'Tales of Suspense #52 (April 1964)',
    abilities: ['Master martial artist', 'Expert spy and assassin', 'Enhanced agility and endurance', 'Widow\'s Bite electroshock weapons'],
    mcuAppearances: ['Iron Man 2 (2010)', 'The Avengers (2012)', 'Captain America: The Winter Soldier (2014)', 'Avengers: Age of Ultron (2015)', 'Captain America: Civil War (2016)', 'Avengers: Infinity War (2018)', 'Avengers: Endgame (2019)', 'Black Widow (2021)']
  },
  {
    id: 'spider-man',
    name: 'Spider-Man',
    alterEgo: 'Peter Parker',
    image: 'https://images.pexels.com/photos/6499198/pexels-photo-6499198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A teenage superhero who gained spider-like abilities after being bitten by a radioactive spider. He swings through New York City, fighting crime with his webs and witty banter.',
    firstAppearance: 'Amazing Fantasy #15 (August 1962)',
    abilities: ['Wall-crawling', 'Enhanced strength and reflexes', 'Spider-sense', 'Web-shooters'],
    mcuAppearances: ['Captain America: Civil War (2016)', 'Spider-Man: Homecoming (2017)', 'Avengers: Infinity War (2018)', 'Avengers: Endgame (2019)', 'Spider-Man: Far From Home (2019)', 'Spider-Man: No Way Home (2021)']
  }
];