import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// components from mui
import { Drawer } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import AddShoppinCartIcon from "@material-ui/icons/AddShoppingCart";
import { Badge } from "@material-ui/core";
// Components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
// styles
import { Wrapper, StyledButton } from "./App.styles";
// Types
export type CartItemType = {
  id: number;
  catergory: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    ["products"],
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something Went Wrong</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClick={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge
          overlap="rectangular"
          badgeContent={getTotalItems(cartItems)}
          color="error"
        >
          <AddShoppinCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
