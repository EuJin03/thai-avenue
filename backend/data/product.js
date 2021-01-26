const products = [
  {
    name: "beef-salad",
    image: "/resources/beef-salad.png",
    description:
      "It's called waterfall beef because of the splashing sound of juices on the hot grill. The beef is sliced thinly and served with a mixture of salad greens and fresh papaya along with a special Thai dressing.",
    category: "appetizer",
    spicy: "no",

    size: [
      {
        name: "standard",
        price: 99.99,
      },
      { name: "large", price: 199.99 },
    ],
  },
  {
    name: "chicken-salad",
    image: "/resources/chicken-salad.png",
    description:
      "Larb Gai is a classic, traditional Thai dish that is made with pork in Thailand, but this recipe uses chicken.",
    category: "appetizer",
    spicy: "no",

    size: {
      name: "standard",
      price: 99.99,
    },
  },
  {
    name: "curry-chicken",
    image: "/resources/curry-chicken.png",
    description:
      "This classic yellow curry hearkens back to the marketplaces and streets of Bangkok. It's made with chunks of chicken and potatoes with prepared curry powder or you can make your own curry powder.",
    category: "chicken",
    spicy: "yes",

    size: {
      name: "standard",
      price: 99.99,
    },
  },
  {
    name: "green-curry",
    image: "/resources/green-curry.png",
    description:
      "Chunks of tender chicken are simmered in a homemade green curry sauce along with your choice of vegetables in this gourmet-style recipe.",
    category: "chicken",
    spicy: "yes",

    size: {
      name: "standard",
      price: 99.99,
    },
  },
  {
    name: "grilled-fish",
    image: "/resources/grilled-fish.png",
    description:
      "This traditional Thai fish recipe can be made outdoors on the barbecue or you can pan-fry the fish indoors.",
    category: "seafood",
    spicy: "no",

    size: {
      name: "standard",
      price: 99.99,
    },
  },
  {
    name: "shrimp",
    image: "/resources/shrimp.png",
    description:
      "Each mini wrap provides a burst of Thai flavors that hit different parts of the palate all at once. It's based on the traditional Thai appetizer miang kum. ",
    category: "seafood",
    spicy: "no",

    size: {
      name: "standard",
      price: 99.99,
    },
  },
  {
    name: "tomyam",
    image: "/resources/tomyam.png",
    description:
      "This delicious soup might even be good for what ails you. It's a version of Tom Yum Goong, which is basically Tom Yum soup",
    category: "soup",
    spicy: "yes",

    size: {
      name: "standard",
      price: 99.99,
    },
  },
  {
    name: "mango-sticky-rice",
    image: "/resources/mango-sticky-rice.png",
    description: "A very sweet and sticky der rice",
    category: "dessert",

    size: {
      name: "standard",
      price: 99.99,
    },
  },
  {
    name: "thai-tea",
    image: "/resources/thai-tea.png",
    description: "A very cool drink",
    category: "beverage",

    size: {
      name: "standard",
      price: 99.99,
    },
  },
];

export default products;
