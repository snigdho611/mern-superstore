import Footer from 'components/Footer'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import ProductList from 'components/ProductList'
import React from 'react'

const ProductsPage = () => {
    return (
        <>
            <Header />
            <Navbar />
            <ProductList />
            <Footer />
        </>
    )
}

export default ProductsPage