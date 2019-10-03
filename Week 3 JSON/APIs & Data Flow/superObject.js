// ES6
const Collection = (config) => {
  const models = [];

  const init = () => {
    if (config) {
      config.forEach(m => {
        models.push(m);
      });
    }
  };

  let changeCallback = null;

  const add = (item) => {
    if (!_.includes(models, item) || _.isEmpty(models)) {
      models.push(item);

      if (changeCallback) {
        changeCallback();
      }
    }
  };

  const change = (func) => changeCallback = func;

  init();

  return {
    add,
    models,
    change
  }
};

let postCollection = Collection();

postCollection.change(function () {
  console.log('changed!');
});

let postModel1 = Model({
  text: 'Hey man!',
  user: 'Aaron'
});
let postModel2 = Model({
  text: 'Sup, yo!',
  user: 'Brett'
});

postCollection.add(postModel1);
postCollection.add(postModel2);