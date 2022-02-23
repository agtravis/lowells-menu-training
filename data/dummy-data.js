import Meal from '../models/meal';

const MEALS = [
  new Meal(
    '001',
    'breakfast',
    'Breakfast Tacos',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
    'Scrambled eggs, chorizo, hashbrowns',
    ['Egg', 'Dairy']
  ),
  new Meal(
    '002',
    'lunch',
    'Salmon Filet',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sashimi_-_Maguro_Restaurant%2C_Bangna%2C_Bangkok_%2844856596864%29.jpg/640px-Sashimi_-_Maguro_Restaurant%2C_Bangna%2C_Bangkok_%2844856596864%29.jpg',
    'Scrambled eggs, chorizo, hashbrowns',
    ['Garlic', 'Dairy']
  ),
];

export default MEALS;
