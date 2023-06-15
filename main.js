const Fetch = async () => {
    const data = await fetch('https://api.escuelajs.co/api/v1/products');
    const Change = await fetch('http://data.fixer.io/api/latest?access_key=02cab87f61a2396af45180a0010e1424&format=1&_gl=1*18n83no*_ga*MTA5NzM0Mjc0Ny4xNjg2ODQxMzI1*_ga_HGV43FGGVM*MTY4Njg0MTMyNS4xLjEuMTY4Njg0MTU2My42MC4wLjA.')

    const changeCur = await Change.json();
    const parsed = await data.json();
    const CategoriesMap = new Map();
    console.log(changeCur.rates.EGP);
  
    parsed.forEach(obj => {
      const categoryId = obj.category.id;
      const product = {
        id: obj.id,
        title: obj.title,
        price: `${(obj.price * changeCur.rates.EGP).toFixed(2)} EGP`,
        description: obj.description,
        category: {
          id: obj.category.id,
          name: obj.category.name,
          image: obj.category.image
        }
      };
  
      if (CategoriesMap.has(categoryId)) {
        const category = CategoriesMap.get(categoryId);
        category.products.push(product);
    } else {
        const category = {
            category: {
            id: categoryId,
            name: obj.category.name,
            image: obj.category.image,
            creationAt: obj.category.creationAt,
            updatedAt : obj.category.updatedAt
          },
          products: [product],
          
        };
        CategoriesMap.set(categoryId, category);
    }
});

const Categories = Array.from(CategoriesMap.values());

    console.log(Categories[0]);
  };
  
  Fetch();
  