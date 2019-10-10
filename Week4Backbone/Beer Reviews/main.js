var appModel = new AppModel();

appModel.get('beers').addBeer('120 Minute IPA','IPA',18, 'http://48tk9j3a74jb133e1k2fzz2s.wpengine.netdna-cdn.com/wp-content/uploads/2014/11/Dogfish-Head-120-Minute-IPA-2011-Bottle.jpg');
appModel.get('beers').addBeer('Breakfast Stout','Stout',9, 'https://res.cloudinary.com/ratebeer/image/upload/w_250,c_limit/beer_14956.jpg');
appModel.get('beers').addBeer('Big Bad Baptist','Imperial Stout',11, 'http://www.totalwine.com/media/sys_master/twmmedia/h5a/h80/8813243072542.png');

var appView = new AppView({ model: appModel });

