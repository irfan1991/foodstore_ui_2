import React , {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { SideNav, LayoutSidebar , Responsive, CardProduct, Pagination , InputText } from "upkit";
import menus from "./menus";
import TopBar from '../../components/TopBar'
import {config} from '../../config'
import { fetchProducts, goToNextPage, setPage, goToPrevPage, setKeyword, setCategory } from "../../features/Products/actions";
import BounceLoader from 'react-spinners/BounceLoader'

export default function Home() {
   
    let dispatch = useDispatch()
    let  products = useSelector(state => state.products);
   
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch, products.currentPage, products.keyword, products.category])

    return (
        <div>
           <LayoutSidebar  
           sidebar={<SideNav 
                    color="blue" 
                    items={menus}  
                    verticalAlign="top"
                    active={products.category}
                    onChange={category => dispatch(setCategory(category))}
                />}
           content={<div className="md:flex  md:flex-row-reverse w-full mr-5 h-full min-h-screen">

                <div className="w-full md:w-3/4 pl-5 pb-10">  
                   <TopBar />

                   <div className="w-full text-center mb-10 mt-5">
                   <InputText 
                        fullRound
                        value={products.keyword}
                        placeholder="cari makanan yang kamu inginkan ?"
                        fitContainer
                        onChange={e => dispatch(setKeyword(e.target.value))}
                   />
                   </div>

                   {products.status === 'process' && !products.data.length ? 
                        <div className="flex justify-center">
                           <BounceLoader color="blue" /> 
                        </div>
                   : null}

                 
                   <Responsive desktop={3} items="stretch" >
                       {products.data.map((product, index) => {
                           return  <div key={index} className="p-2">
                               <CardProduct
                               color="blue"
                                    title={product.name}
                                    imgUrl={`${config.api_host}/upload/${product.image_url}`}
                                    price={product.price}
                                    onAddToCart={_ =>  null}
                                />
                       </div>
                       })}
                       
                   </Responsive>
                

                   <div className="text-center my-10">
                       <Pagination 
                            totalItems={products.totalItems}
                            page={products.currentPage}
                            perPage={products.perPage}
                            onChange={_ => dispatch(setPage(products.page))}
                            onNext={_ => dispatch(goToNextPage())}
                            onPrev={_ => dispatch(goToPrevPage())}
                       />
                   </div>
                       
               </div>

               <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
                   Keranjang belanja disini
               </div>
              
           </div>}
           sidebarSize={80}
           />
        </div>
    )
}
