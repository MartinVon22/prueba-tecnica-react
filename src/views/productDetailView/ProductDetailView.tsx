import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Snackbar,
  Breadcrumbs,
} from '@mui/material';
import './ProductDetailView.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useCookies } from 'react-cookie';
import { getProductById, saveProduct } from '../../services/ProductService';
import Loading from '../../components/spinner/Loading';

const ProductDetailView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [colorSelected, setColorSelected] = React.useState<any>();
  const [storageSelected, setStorageSelected] = React.useState<any>();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [msgAlert, setMsgAlert] = React.useState('');
  const [severityAlert, setSeverityAlert] = React.useState<any>('');
  const [cookies, setCookies] = useCookies(['countProductsCart']);

  const handleColorChange = (event) => {
    setColorSelected(event.target.value);
  };

  const handleStorageChange = (event) => {
    setStorageSelected(event.target.value);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));

  const setProductData = async (id: any) => {
    try {
      const result = await Promise.resolve(getProductById(id));
      setProduct(result.data);

      let defaultColorSelection = null;
      result.data.options.colors.map((val) => {
        if (val.name === result.data.colors[0]) {
          defaultColorSelection = val;
        }
        return defaultColorSelection;
      });
      setColorSelected(defaultColorSelection);
    } catch (error) {
      console.log(error);
    }
  };

  const addProductCart = async () => {
    if (!colorSelected || !storageSelected) {
      setSeverityAlert('error');
      setMsgAlert('Debes seleccionar un Color y un Almacenamiento');
      setOpenAlert(true);
    } else {
      const result = await Promise.resolve(
        saveProduct({
          id: state,
          colorCode: colorSelected.code ? colorSelected.code : colorSelected,
          storageCode: storageSelected,
        })
      );
      if (result && result.status === 200) {
        setSeverityAlert('success');
        setMsgAlert('Producto agregado al carrito');
        setOpenAlert(true);
        navigate('/productList', {
          state: {
            openAlert: true,
            msgAlert: 'Producto agregado al carrito',
            severityAlert: 'success',
          },
          replace: true,
        });
        setCookies(
          'countProductsCart',
          result.data.count + (Number(cookies.countProductsCart) ? Number(cookies.countProductsCart) : 0)
        );
      }
    }
  };

  useEffect(() => {
    setProductData(state);
  }, []);

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity={severityAlert} sx={{ width: '100%' }}>
          {msgAlert}
        </Alert>
      </Snackbar>
      {!product && <Loading />}
      {product && (
        <>
          <Grid item mt={4} ml={3}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link className="link-route" to="/productList">
                <Typography color="text.secondary">Tienda</Typography>
              </Link>
              <Link className="link-route" to="/productList">
                <Typography color="text.secondary">Listado de Productos</Typography>
              </Link>
              <Typography color="text.primary">Detalle del producto</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid container direction="row" justifyContent="space-evenly" alignItems="center" height="90vh">
            <Grid item md={2}>
              <Box component="div">
                <img
                  style={{ width: '100%', objectFit: 'cover' }}
                  src={product.imgUrl}
                  alt=""
                  srcSet={product.imgUrl}
                  loading="eager"
                />
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box component="div">
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Marca: </strong>
                  {product.brand}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Modelo: </strong>
                  {product.model}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Precio: </strong>${product.price}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>CPU: </strong>
                  {product.cpu}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>RAM: </strong>
                  {product.ram}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Sistema operativo: </strong>
                  {product.os}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Resolución: </strong>
                  {product.displayResolution}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Cámara principal: </strong>
                  {product.primaryCamera}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Cámara secundaria: </strong>
                  {product.secondaryCmera}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Dimensiones: </strong>
                  {product.dimentions}
                </Typography>
                <Typography variant="overline" gutterBottom display="block" align="center">
                  <strong>Peso: </strong>
                  {product.weight}
                </Typography>
              </Box>
              <Box component="div" mt={4}>
                <Grid container direction="row" justifyContent="space-evenly">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Colores</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={colorSelected ? colorSelected.code : ''}
                      onChange={handleColorChange}
                      label="Colores"
                    >
                      {product.options &&
                        product.options.colors.map((value: any) => (
                          <MenuItem value={value.code}>{value.name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-standard-label">Almacenamiento</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={storageSelected}
                      onChange={handleStorageChange}
                      label="Almacenamiento"
                    >
                      {product.options &&
                        product.options.storages.map((value: any) => (
                          <MenuItem value={value.code}>{value.name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid container justifyContent="center" mt={5}>
                  <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={addProductCart}>
                    Agregar producto al carrito
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductDetailView;
