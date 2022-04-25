import React, { useEffect, useState } from 'react';
import {
  Grid,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
  ImageList,
  Breadcrumbs,
  Snackbar,
} from '@mui/material';
import './ProductListView.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { getProducts } from '../../services/ProductService';

const ProductListView = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [productsFiltered, setProductsFilter] = useState<any[]>([]);
  const [cookies, setCookies] = useCookies(['productsPersist', 'countProductsCart']);
  const [openAlert, setOpenAlert] = useState(false);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));

  const setProductsData = async () => {
    try {
      const result = await Promise.resolve(getProducts());
      setProducts(result.data);
      setProductsFilter(result.data);
      localStorage.setItem('products', JSON.stringify(result.data));
      setCookies('productsPersist', 'information-persisted', {
        expires: new Date(new Date().setHours(new Date().getHours() + 1)),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = (event) => {
    const filterText = event.target.value.toLowerCase();
    if (filterText || filterText !== '') {
      const filteredProds = products.filter(
        (product) =>
          product.model.toLowerCase().includes(filterText) ||
          product.brand.toLowerCase().includes(filterText) ||
          product.price.includes(filterText)
      );
      setProductsFilter(filteredProds);
    } else {
      setProductsFilter(products);
    }
  };

  const goToDetail = (id: string) => {
    navigate('/product', {
      state: id,
    });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    window.history.replaceState({}, document.title);
  };

  useEffect(() => {
    if (!localStorage.getItem('products')) {
      setProductsData();
    } else if (cookies.productsPersist) {
      setProducts(JSON.parse(localStorage.getItem('products') || '{}'));
      setProductsFilter(JSON.parse(localStorage.getItem('products') || '{}'));
    } else {
      localStorage.removeItem('products');
      setProductsData();
    }

    if (location && location.state) {
      setOpenAlert(location.state.openAlert);
    }
  }, []);

  return (
    <>
      {location.state && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseAlert} severity={location.state.severityAlert} sx={{ width: '100%' }}>
            {location.state.msgAlert}
          </Alert>
        </Snackbar>
      )}
      <Grid container direction="row" justifyContent="space-between" mt={4} ml={-1} p={0}>
        <Grid item mt={4} ml={3}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.secondary">Tienda</Typography>
            <Typography color="text.primary">Listado de Productos</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Buscar"
            variant="filled"
            helperText="Buscar por modelo, nombre o precio"
            onChange={(event) => filterProducts(event)}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ flexGrow: 1 }}>
        {productsFiltered.map((item: any) => (
          <Grid item md={3} sm={4} xs={6}>
            <ImageList cols={1}>
              <div
                role="button"
                className="product_box"
                onClick={() => goToDetail(item.id)}
                tabIndex={0}
                onKeyDown={() => goToDetail(item.id)}
              >
                <Typography variant="body1" component="div">
                  {item.price ? `$${item.price}` : 'Sin stock'}
                </Typography>
                <ImageListItem key={item.imgUrl}>
                  <img
                    style={{ objectFit: 'none' }}
                    src={`${item.imgUrl}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.imgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                    alt="ads"
                  />
                  <ImageListItemBar title={item.brand} subtitle={item.model} position="below" />
                </ImageListItem>
              </div>
            </ImageList>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductListView;
