const Fetch = async () => {
    const data = await fetch('https://api.escuelajs.co/api/v1/products');
    const parsed = await data.json();
    const CategoriesMap = new Map();
  
    parsed.forEach(obj => {
      const categoryId = obj.category.id;
      const product = {
        id: obj.id,
        title: obj.title,
        price: obj.price,
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

    console.log(Categories);
  };
  
  Fetch();
  