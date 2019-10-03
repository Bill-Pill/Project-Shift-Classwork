var shoes = [
  { name: 'Nike', price: 200 },
  { name: 'Red Wings', price: 250 },
  { name: 'Vans', price: 50 },
  { name: 'Converse', price: 60 },
  { name: 'Reebok', price: 130 },
  { name: 'New Balance', price: 75 },
  { name: 'Adidas', price: 95 },
  { name: 'Keds', price: 40 },
  { name: 'Crocs', price: 35 }
];

var midShoes = shoes.filter(function(item){
  return (item.price >= 50 && item.price < 100)
})

console.log(midShoes)