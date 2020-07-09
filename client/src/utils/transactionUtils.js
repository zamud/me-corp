export const formatCategory = (category) => {
  let formattedCategory = '';
  if (category.includes('-')) {
    formattedCategory = category.split('-');
    formattedCategory.forEach((word, index, thisArray) => {
      thisArray[index] = word[0].toUpperCase() + word.substring(1);
    });
    formattedCategory = formattedCategory.join(' ');
  } else if (category.includes('_')) {
    formattedCategory = category.split('_');
    formattedCategory.forEach((word, index, thisArray) => {
      thisArray[index] = word[0].toUpperCase() + word.substring(1);
    });
    formattedCategory = formattedCategory.join(' & ');
  } else {
    formattedCategory = category[0].toUpperCase() + category.substring(1);
  }
  return formattedCategory;
};

const buildItems = (categories, group) => {
  let items = [];
  categories.forEach((category) => {
    if (category.group === group) {
      items.push({ value: category.value, label: category.displayName });
    }
  });
  return items;
};

const buildOptions = (categories) => {
  let options = [];
  let regExp = /\(([^)]+)\)/;
  Object.values(groups).forEach((group) => {
    let type = {
      type: 'group',
      name: regExp.exec(String(group))[1],
      items: buildItems(categories, group),
    };
    if (type.items.length > 0) options.push(type);
  });
  return options;
};

export const groups = Object.freeze({
  INCOME: Symbol('Income'),
  SAVINGS: Symbol('Savings'),
  ESSENTIALS: Symbol('Essentials'),
  CHARITABLE: Symbol('Charitable'),
  LIFESTYLE: Symbol('Lifestyle'),
});

export const expenseCategories = [
  {
    value: 'car_gas',
    displayName: formatCategory('car_gas'),
    group: groups.ESSENTIALS,
  },
  {
    value: 'charitable-giving',
    displayName: formatCategory('charitable-giving'),
    group: groups.CHARITABLE,
  },
  {
    value: 'entertainment',
    displayName: formatCategory('entertainment'),
    group: groups.LIFESTYLE,
  },
  {
    value: 'gifts',
    displayName: formatCategory('gifts'),
    group: groups.CHARITABLE,
  },
  {
    value: 'health',
    displayName: formatCategory('health'),
    group: groups.ESSENTIALS,
  },
  {
    value: 'home_groceries',
    displayName: formatCategory('home_groceries'),
    group: groups.ESSENTIALS,
  },
  {
    value: 'insurance',
    displayName: formatCategory('insurance'),
    group: groups.ESSENTIALS,
  },
  {
    value: 'miscellaneous',
    displayName: formatCategory('miscellaneous'),
    group: groups.LIFESTYLE,
  },
  {
    value: 'phone',
    displayName: formatCategory('phone'),
    group: groups.LIFESTYLE,
  },
  {
    value: 'rent_mortgage',
    displayName: formatCategory('rent_mortgage'),
    group: groups.ESSENTIALS,
  },
  {
    value: 'resturants',
    displayName: formatCategory('restaurants'),
    group: groups.LIFESTYLE,
  },
  {
    value: 'savings',
    displayName: formatCategory('savings'),
    group: groups.SAVINGS,
  },
  {
    value: 'subscriptions',
    displayName: formatCategory('subscriptions'),
    group: groups.LIFESTYLE,
  },
  {
    value: 'travel',
    displayName: formatCategory('travel'),
    group: groups.LIFESTYLE,
  },
  {
    value: 'utilities',
    displayName: formatCategory('utilities'),
    group: groups.ESSENTIALS,
  },
];

export const incomeCategories = [
  {
    value: 'work',
    displayName: formatCategory('work'),
    group: groups.INCOME,
  },
  {
    value: 'tax-returns',
    displayName: formatCategory('tax-returns'),
    group: groups.INCOME,
  },
  {
    value: 'interest',
    displayName: formatCategory('interest'),
    group: groups.INCOME,
  },
  {
    value: 'other',
    displayName: formatCategory('other'),
    group: groups.INCOME,
  },
];

export const expenseOptions = buildOptions(expenseCategories);
export const incomeOptions = buildOptions(incomeCategories);
