import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import ItemCard from './components/ItemCard';
import items from '../../assets/data/items.json'; // data pizza
import toppings from '../../assets/data/toppings.json';

const Landing = props => {

  const [size, setSize]                           = useState('medium');
  const [itemIdSelected, setItemIdSelected]       = useState();
  const [totalPrice, setTotalPrice]               = useState('0');
  const [selectedToppings, setselectedToppings]   = useState([]);
  const [availableToppings, setAvailableToppings] = useState([]);

  function handleselectedToppings(value, name) {
    let newSelectedToppings = []

    if (!selectedToppings.includes(name)) {
      newSelectedToppings = [...selectedToppings, name];
      
    } else {
      newSelectedToppings = selectedToppings.filter((toppingName) => toppingName !== name)
    }

    setselectedToppings(newSelectedToppings)

    changeTotalPrice(itemIdSelected, size, newSelectedToppings);
  };

  const HandleChangeItem = (itemId) => {
    let newSelectedToppings = selectedToppings;

    setItemIdSelected(itemId)

    // set disabled toppings
    let itemIdSelected = items.find(item => item.id == itemId);
    setAvailableToppings(itemIdSelected.topping_detail);

    // unchecked non available topping
    selectedToppings.map((selected) => {
      if (!itemIdSelected.topping_detail.includes(selected)) {
        newSelectedToppings = newSelectedToppings.filter((toppingName) => toppingName !== selected)
      }
    })
    setselectedToppings(newSelectedToppings);

    changeTotalPrice(itemId, size, newSelectedToppings);
  }

  const HandleChangeSize = (size) => {
    setSize(size)

    changeTotalPrice(itemIdSelected, size, selectedToppings);
  }

  const changeTotalPrice = (itemId, size, selectedTopping) => {
    let total             = 0;
    let totalToppingPrice = 0;

    let itemIdSelected = items.find(item => item.id == itemId);
    let itemPrice = itemIdSelected ? itemIdSelected.price : 0;

    if (size == 'small') {
      itemPrice = Number(itemPrice) - 1;
    } else if (size == 'large') {
      itemPrice = Number(itemPrice) + 2;
    }

    // get all selected topping price
    let toppingSelected;
    selectedTopping.map((toppingName) => {
      toppingSelected = toppings.find(topping => topping.name == toppingName);
      totalToppingPrice += Number(toppingSelected.price);
    })

    total = Number(itemPrice) + Number(totalToppingPrice);

    setTotalPrice(total);
  }
    
  return (
    <div>
      <h4>Pizza</h4>

      <Grid container spacing={2}>

        {items.map(({id, name, price}) => (
          <Grid item xs={4}>
            <ItemCard 
              key={id} 
              id={id} 
              name={name} 
              price={price}
              idSelected={itemIdSelected}
              handleChange={e => HandleChangeItem(e.target.value)}
              />
          </Grid>
        ))}

        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={size}
              onChange={e => HandleChangeSize(e.target.value)}
            >
              <FormControlLabel value="small" control={<Radio />} label="Small" />
              <FormControlLabel value="medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="large" control={<Radio />} label="Large" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Toppings</FormLabel>
          
            <Grid container spacing={2}>
              {toppings.length > 0 ? (
                toppings.map((topping) => (
                  <Grid item xs={4} key={topping.id}>
                    <FormControlLabel 
                      onChange={e => handleselectedToppings(e.target.value, topping.name)}
                      checked={selectedToppings.includes(topping.name)}
                      disabled={!availableToppings.includes(topping.name)}
                      name="item_topping"
                      control={<Checkbox />} 
                      label={topping.name} 
                      />
                  </Grid>
                ))
                ) : (
                  <p>Loading</p>
                )
              }
            </Grid>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Price</FormLabel>
            <h4>${totalPrice}</h4>
          </FormControl>
        </Grid>

      </Grid>

    </div>
  );
}

export default Landing;
