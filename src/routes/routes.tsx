/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Components
import Header from '../components/header/Header';
import Loading from '../components/spinner/Loading';

const AppRoutes = () => {
  const ProductListView = lazy(() => import('../views/productListView/ProductListView'));
  const ProductDetailView = lazy(() => import('../views/productDetailView/ProductDetailView'));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/productList"
          element={
            <>
              <Header />
              <ProductListView />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <Header />
              <ProductDetailView />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/productList" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
