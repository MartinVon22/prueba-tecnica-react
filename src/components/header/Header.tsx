import React, { useEffect, useState } from 'react';
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ShopIcon from '@mui/icons-material/Shop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCookies } from 'react-cookie';

const Header = () => {
  const [cookies, setCookies] = useCookies(['countProductsCart']);

  const [productsOnCart, setProductsOnCart] = useState(0);

  useEffect(() => {
    if (cookies.countProductsCart) {
      setProductsOnCart(cookies.countProductsCart);
    }
  }, [cookies]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar variant="regular">
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/productList">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <ShopIcon />
            </IconButton>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/productList">
            <Typography variant="h6" color="inherit" component="div">
              Tienda
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Badge badgeContent={productsOnCart} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
