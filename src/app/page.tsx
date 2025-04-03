'use client'
import Corousal from "@/components/Corousal/Corousal";
import Footer from "@/components/Footer/Footer";
import Products from "@/components/Products/Products";
import Filter from "@/components/Sort & Filter/Filter";
import { productInterface, useProducts } from "@/context/ProductContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false)
  const handleShow = (): void => { setShow(true) }
  const handleClose = (): void => { setShow(false) }
  const { setCardData, verifyLogin } = useProducts();

  useEffect(() => {
    verifyLogin();
  }, [])
  const handleFilter = () => {
    const check: string = localStorage.getItem('alldata') || '';
    const allData = JSON.parse(check);
    if (category.length === 0 && brand.length === 0) {
      setCardData(allData.product)
    } else {
      const product: productInterface[] = allData.product;
      const filterData: productInterface[] = product.filter(item => ((category.length && brand.length) ? (category.includes(item.category) && brand.includes(item.brand)) : category.length ? category.includes(item.category) : false || brand.length ? brand.includes(item.brand) : false));
      setCardData(filterData);
      handleClose();
    }
  }

  const highToLow = (item: productInterface[]) => {
    const sortHighToLow: productInterface[] = item.sort(function (a, b) { return b.price - a.price });
    setCardData(sortHighToLow);
  }
  const LowToHigh = (item: productInterface[]) => {
    const sortLowToHigh: productInterface[] = item.sort(function (a, b) { return a.price - b.price });
    setCardData(sortLowToHigh);
  }
  return (
    <>
      <div className="home" style={{ backgroundColor: "#fff5f2"}}>
        <Corousal />
        <Filter handleFilter={handleFilter} category={category} setCategory={setCategory} setBrand={setBrand} brand={brand} show={show} handleShow={handleShow} handleClose={handleClose} highToLow={highToLow} LowToHigh={LowToHigh} />
        <Products />
        <Footer />
      </div>
    </>
  );
}