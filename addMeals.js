const axios = require('axios').default;

axios
  .get('https://lowells-menu-training-default-rtdb.firebaseio.com/meals.json')
  .then(function (response) {
    const allDataObj = response.data;
    const copyObjsArr = [];
    for (const [key, value] of Object.entries(allDataObj)) {
      copyObjsArr.push(value);
    }
    console.log(copyObjsArr);
    // for (const obj of copyObjsArr) {
    //   axios({
    //     method: 'post',
    //     url: 'https://lowells-menu-training-default-rtdb.firebaseio.com/meals.json',
    //     data: obj,
    //   });
    // }
  })
  .catch(function (error) {
    console.log(error);
  });

[
  {
    allergens: ['Dairy', 'Egg'],
    description: '2 Tacos with eggs',
    imageUrl:
      'https://github.com/agtravis/lowells-menu-training/blob/main/assets/food-photos/breakfast-tacos.png?raw=true',
    menu: 'breakfast',
    title: 'Breakfast Tacos',
  },
  {
    allergens: ['Dairy', 'Egg'],
    description: '2 Tacos with eggs',
    imageUrl:
      'https://github.com/agtravis/lowells-menu-training/blob/main/assets/food-photos/bagel-lox.jpg?raw=true',
    menu: 'breakfast',
    title: 'Breakfast Tacos',
  },
];
