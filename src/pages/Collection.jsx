import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets'
import Title from '../components/Title'
import ProductItems from '../components/ProductItems'
const Collection = () => {
  
    const { products, search, showSearch } = useContext(ShopContext)
    const [showFilters, setShowFilters] = useState(false)
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [sortType, setSortType] = useState('relavent')

    const toggleCategory = (e) => {
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }
    
    const toggleSubCategory = (e) => { 
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let newProducts = products.slice()

        if(search && showSearch){
            newProducts = newProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        }

        if(category.length > 0){
            newProducts = newProducts.filter(product => category.includes(product.category))
        }

        if(subCategory.length > 0){
            newProducts = newProducts.filter(product => subCategory.includes(product.subCategory))
        }

        setFilterProducts(newProducts)
    }

    const sortProduct = () => {
        let sortProducts = filterProducts.slice()

        switch (sortType) {
            case 'low-high':
                sortProducts = sortProducts.toSorted((a,b) => a.price - b.price)
                setFilterProducts(sortProducts)
                break;
            case 'high-low':
                setFilterProducts(sortProducts.toSorted((a,b) => b.price - a.price))
                break;
            default:
                applyFilter()   
                break;
        }
    }
    
    useEffect(() => {
        setFilterProducts(products)
    }, [products])

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch])

    useEffect(() => {
        sortProduct()
    }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-2'>
        <div className='min-w-60'>
            <p onClick={() => setShowFilters(!showFilters) } className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                <img src={assets.dropdown_icon} alt="icon" className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} />
            </p>
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input className='w-3' type='checkbox' value={'Samsung'} onChange={toggleCategory}/> Samsung
                    </p>
                    <p className='flex gap-2'>
                        <input className='w-3' type='checkbox' value={'iPhone'} onChange={toggleCategory}/> iPhone
                    </p>
                    <p className='flex gap-2'>
                        <input className='w-3' type='checkbox' value={'Redmi'} onChange={toggleCategory}/> Redmi
                    </p>
                </div>
            </div>

            <div className={`border border-gray-300 my-5 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>TYPE</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input className='w-3' type='checkbox' value={'Smartphone'} onChange={toggleSubCategory}/> Smartphone
                    </p>
                    <p className='flex gap-2'>
                        <input className='w-3' type='checkbox' value={'Smartwatch'} onChange={toggleSubCategory}/> Smartwatch
                    </p>
                    <p className='flex gap-2'>
                        <input className='w-3' type='checkbox' value={'Accessories'} onChange={toggleSubCategory}/>Accessories

                    </p>
                </div>
            </div>
        </div>
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'COLLECTIONS'} />
                <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                    <option value='relavent'>Sort by: Relavent</option>
                    <option value='low-high'>Sort by: low to high</option>
                    <option value='high-low'>Sort by: high to low</option>
                </select>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filterProducts.map((product,index) => (
                        <ProductItems key={index} name={product.name} id={product._id} price={product.price} image={product.image}/>
                    ))
                }            
            </div>
        </div>
    </div>
  )
}

export default Collection