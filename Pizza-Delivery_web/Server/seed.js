const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/Usermodel");
const Product = require("./models/Productmodel");

const ADMIN = {
    name: "Admin",
    email: "admin@pizzaland.com",
    password: "Admin@1234",
    address: "PizzaLand HQ",
    isAdmin: true,
};

const PRODUCTS = [
    {
        name: "Margherita",
        product_type: 0,
        variants: [
            { name: "Small", price: 249 },
            { name: "Medium", price: 349 },
            { name: "Large", price: 499 },
        ],
        price: 249,
        quantity: 50,
        description: "Classic tomato base with fresh mozzarella and basil.",
        category: "Veg",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    },
    {
        name: "Pepperoni Feast",
        product_type: 0,
        variants: [
            { name: "Small", price: 299 },
            { name: "Medium", price: 429 },
            { name: "Large", price: 599 },
        ],
        price: 299,
        quantity: 50,
        description: "Loaded with premium pepperoni slices on a rich tomato base.",
        category: "Non-Veg",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    },
    {
        name: "BBQ Chicken",
        product_type: 0,
        variants: [
            { name: "Small", price: 329 },
            { name: "Medium", price: 459 },
            { name: "Large", price: 629 },
        ],
        price: 329,
        quantity: 50,
        description: "Smoky BBQ sauce, grilled chicken, red onions and cheddar.",
        category: "Non-Veg",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    },
    {
        name: "Veggie Supreme",
        product_type: 0,
        variants: [
            { name: "Small", price: 269 },
            { name: "Medium", price: 379 },
            { name: "Large", price: 529 },
        ],
        price: 269,
        quantity: 50,
        description: "Bell peppers, mushrooms, olives, onions and corn on tomato base.",
        category: "Veg",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    },
    {
        name: "Thin Crust",
        product_type: 1,
        variants: [
            { name: "Small", price: 49 },
            { name: "Medium", price: 69 },
            { name: "Large", price: 89 },
        ],
        price: 49,
        quantity: 100,
        description: "Crispy thin crust base.",
        category: "Crust",
        image: "",
    },
    {
        name: "Tomato Base Sauce",
        product_type: 2,
        variants: [
            { name: "Regular", price: 29 },
        ],
        price: 29,
        quantity: 100,
        description: "Classic tomato pizza sauce.",
        category: "Sauce",
        image: "",
    },
    {
        name: "Mozzarella",
        product_type: 4,
        variants: [
            { name: "Regular", price: 49 },
        ],
        price: 49,
        quantity: 100,
        description: "Fresh mozzarella cheese.",
        category: "Cheese",
        image: "",
    },
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Admin user
    const existing = await User.findOne({ email: ADMIN.email });
    if (existing) {
        console.log("Admin user already exists, skipping.");
    } else {
        await User.create(ADMIN);
        console.log(`Admin created: ${ADMIN.email} / ${ADMIN.password}`);
    }

    // Products
    for (const p of PRODUCTS) {
        const exists = await Product.findOne({ name: p.name });
        if (exists) {
            console.log(`Product "${p.name}" already exists, skipping.`);
        } else {
            await Product.create(p);
            console.log(`Product created: ${p.name}`);
        }
    }

    console.log("\nDone! Seed complete.");
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
