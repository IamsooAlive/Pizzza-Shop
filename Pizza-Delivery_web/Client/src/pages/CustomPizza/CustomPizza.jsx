//multiple toppings
//only one crust
//only one sauce
//only one cheese
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchCheeses } from '../../redux/slices/cheeseSlice';
import { searchCrusts} from '../../redux/slices/crustSlice';
import { searchSauces} from '../../redux/slices/sauceSlice';
import { searchToppings} from '../../redux/slices/toppingSlice';
import axios from 'axios';
import "../../AddProduct_EditProduct.css";
import API_BASE_URL from '../../config/api.js';

const CustomPizza = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const { data: pizzaCrusts } = useSelector((state) => state.crust);
    const { data: pizzaSauces } = useSelector((state) => state.sauce);
    const { data: pizzaToppings } = useSelector((state) => state.topping);
    const { data: pizzaCheeses } = useSelector((state) => state.cheese);


    const [quantity, setQuantity] = useState(1);
    const [variantVal, setVariantVal] = useState({});
    const [pizzaCrustVal, setPizzaCrustVal] = useState();
    const [pizzaSauceVal, setPizzaSauceVal] = useState();
    const [pizzaCheeseVal, setPizzaCheeseVal] = useState();
    const [pizzaToppingsVal, setPizzaToppingsVal] = useState([]);
    const selectedExtras = [
        ...pizzaToppingsVal,
        pizzaSauceVal,
        pizzaCheeseVal,
    ].filter((option) => option && option.name);

    useEffect(() => {
        dispatch(fetchCheeses());
        dispatch(searchCrusts());
        dispatch(searchSauces());
        dispatch(searchToppings());
    }, [dispatch])



    const handleChooseToppings = (e, topping) => {
        if (e.target.checked) {
            setPizzaToppingsVal((currentToppings) => {
                if (currentToppings.some((item) => item.id === topping._id)) {
                    return currentToppings;
                }

                return [
                    ...currentToppings,
                    { id: topping._id, name: topping.name, category: topping.category, price: topping.price }
                ];
            });
        } else {
            setPizzaToppingsVal((currentToppings) =>
                currentToppings.filter((item) => item.id !== topping._id)
            );
        }
    }


    const addToCart = async (e) => {
        e.preventDefault();
        if (pizzaToppingsVal.length !== 0) {
            if (localStorage.getItem("token")) {
                try {
                    await axios.post(`${API_BASE_URL}/api/product/cart/addToCart`, {
                        name: pizzaCrustVal.name,
                        variant: { ...variantVal },
                        price: (pizzaCrustVal.price),
                        extraOptions: selectedExtras,
                        quantity: quantity,
                        productId: pizzaCrustVal.id,
                    },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": localStorage.getItem("token")
                            }
                        }

                    );
                    alert("Item added to cart successfully!");
                    navigate("/profile_dashboard/cart");
                } catch (error) {
                    console.log(error);
                    alert("Something went wrong!");
                }

            } else {
                alert("Login to add items to cart!");
                navigate("/login");
            }
        } else {
            alert("Toppings field is empty!")
        }


    }



    return (
        <div style={{ width: "70%", margin: "auto", marginBottom: "2rem" }}>
            <h1 className='poppins-semibold section-title form-title'>Order a Custom Pizza</h1>
            <form className='form' id="addProduct"
                onSubmit={addToCart}
            >

                <div className="option" id='pizzacrust-option-container'>
                    <label htmlFor="pizza-crust">Pizza Crust : </label>
                    <select name="pizza-crust" id="pizza-crust"
                        onChange={(e) => {
                            if (e.target.value == "") {
                                return;
                            } else {

                                if (JSON.parse(e.target.value).name) {
                                    setPizzaCrustVal(JSON.parse(e.target.value));
                                }
                            }
                        }}
                        required>
                        <option value={""}>Choose a Pizza Crust</option>
                        {pizzaCrusts.length !== 0 && pizzaCrusts.map(crust => (
                            <option value={JSON.stringify({ id: crust._id, name: crust.name, price: crust.price, variants: crust.variants })} key={`crust-${crust._id}`} >{crust.name}</option>
                        ))}
                    </select>
                </div>
                <div className="option" id='pizzasauce-option-container'>
                    <label htmlFor="pizza-sauce">Pizza Sauce : </label>
                    <select name="pizza-sauce" id="pizza-sauce"
                        onChange={(e) => {
                            if (e.target.value == "") {
                                return;
                            } else {

                                if (JSON.parse(e.target.value).name) {
                                    setPizzaSauceVal(JSON.parse(e.target.value))
                                }
                            }

                        }}
                        required>
                        <option value={""}>Choose a Sauce</option>
                        {pizzaSauces.length !== 0 && pizzaSauces.map(sauce => (
                            <option value={JSON.stringify({ id: sauce._id, name: sauce.name, category: sauce.category, price: sauce.price })} key={`sauce-${sauce._id}`} >{sauce.name}</option>
                        ))}
                    </select>
                </div>
                <div className="option" id='pizzacheese-option-container'>
                    <label htmlFor="pizza-cheese">Pizza Cheese : </label>
                    <select name="pizza-cheese" id="pizza-cheese"
                        onChange={(e) => {
                            if (e.target.value == "") {
                                return;
                            } else {
                                if (JSON.parse(e.target.value).name) {
                                    setPizzaCheeseVal(JSON.parse(e.target.value))
                                }
                            }

                        }}
                        required>
                        <option value={""}>Choose a Cheese</option>
                        {pizzaCheeses.length !== 0 && pizzaCheeses.map(cheese => (
                            <option value={JSON.stringify({ id: cheese._id, name: cheese.name, category: "Veg", price: cheese.price })} key={`cheese-${cheese._id}`}>{cheese.name}</option>
                        ))}
                    </select>
                </div>

                <div className="option" id='variant-option-container'>
                    {pizzaCrustVal && pizzaCrustVal?.variants?.length !== 0 ? (
                        <>
                            <label htmlFor="variant">Variant : </label>
                            <select name="variant" id="variant" onChange={(e) => {
                                if (e.target.value == "") {
                                    return;
                                } else {

                                    if (JSON.parse(e.target.value).name) {
                                        setVariantVal(JSON.parse(e.target.value))
                                    }
                                }


                            }} required>
                                <option value={""}>Select a Variant</option>
                                {pizzaCrustVal?.variants?.map(variant => (
                                    <option value={JSON.stringify({ name: variant.name, price: variant.price })} key={`variant-${variant._id}`} >{variant.name} =&gt; ({variant.price}rs)</option>

                                ))}
                            </select>
                        </>
                    ) : (
                        <>
                            <p className='poppins-medium' style={{ textAlign: "center", color: "blueviolet" }}>Choose a Pizza Crust to view available variants...</p>
                            <br />
                        </>
                    )}

                </div>

                <div className='variants-container' >
                    <br />
                    {pizzaToppingsVal.length === 0 && (
                        <>
                            <p className='poppins-medium' style={{ textAlign: "center", color: "var(--color-create-hover)" }}>Choose one or more toppings...</p>
                        </>
                    )}
                    <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>Toppings (multi-select):</p>
                    <div className="options-container" >
                        {pizzaToppings.map(topping => (
                            <div className="option" key={topping._id}>
                                <input
                                    type="checkbox"
                                    className="toppings-option"
                                    id={`topping-${topping._id}`}
                                    checked={pizzaToppingsVal.some((item) => item.id === topping._id)}
                                    onChange={(e) => { handleChooseToppings(e, topping) }}
                                />
                                <label htmlFor={`topping-${topping._id}`}>{topping.name}({topping.category})</label>
                                <input type="text" name="topping-price" value={`Price : ${topping.price}rs`} style={{ padding: ".3rem" }} readOnly />
                            </div>
                        ))}
                        {pizzaToppings.length === 0 && (
                            <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>
                                No toppings are available right now.
                            </p>
                        )}
                    </div>
                </div>


                <input type="number" name="quantity" id="quantity" placeholder='Enter the Quantity you want' onChange={(e) => { setQuantity(e.target.value) }} required min={1} />
                <button type="submit" id='update-product-btn'>Add To Cart</button>
            </form>
        </div>
    )
}

export default CustomPizza
