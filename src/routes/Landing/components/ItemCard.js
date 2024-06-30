import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PizzaImage from '../../../assets/images/pizza-image.jpg';
import { Radio } from '@mui/material';

export default function ItemCard({id, name, price, idSelected, handleChange}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={PizzaImage}
        title="pizza image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Radio
          checked={idSelected == id}
          onChange={handleChange}
          value={id}
          name="item-radio"
        />
      </CardActions>
    </Card>
  );
}