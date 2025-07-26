import { useEffect, useState } from 'react';
import './App.css';
import MenuItem from './MenuItem';
import Btn from './Btn';

const url = 'https://api.jsonbin.io/v3/b/6884d8bcf7e7a370d1ee448f';

const App = () => {

    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchMenuItems = async()=>{
        try {
            let response = await fetch(url);
            let menuItems = await response.json();
            menuItems = menuItems.record;
            
            let uniqueCategories = menuItems.map((menuItem)=>{
                return menuItem.category;
            });
            uniqueCategories = ["all", ...new Set(uniqueCategories)];

            setUniqueCategories(uniqueCategories);
            setMenuItems(menuItems);

        } catch (error) {
            setIsError(true);
            console.log(error);
        }
        setIsLoading(false);
    }
    useEffect(()=>{
        fetchMenuItems();
    }, []);    

    const filterMenuItems = (text) => {
        let newMenuItems;
        const fetchMenuItems = async()=>{
            setIsLoading(true);
            try {
                let response = await fetch(url);
                let menuItems = await response.json();
                menuItems = menuItems.record;

                if(text == "all"){
                    newMenuItems = menuItems;
                }else{
                    newMenuItems = menuItems.filter(menuItem => menuItem.category === text);
                }
                setMenuItems(newMenuItems);
            } catch (error) {
                setIsError(true);
                console.log(error);
            }
            setIsLoading(false);
        }
        fetchMenuItems();
    }
    if(isLoading){
        return (
            <div className='app'>
                <div className='app-container'>
                    <div className='underline-title'>
                        <h2>our menu</h2>
                        <div className='underline underline-warning'></div>
                    </div>
                    <div className="circle-loading">
                        <div className="circle-loading-icon"></div>
                    </div>
                </div>
            </div>
        )
    }
    if(isError){
        return (
            <div className='app'>
                <div className='app-container'>
                    <div className='underline-title'>
                        <h2>our menu</h2>
                        <div className='underline underline-warning'></div>
                    </div>
                    <div className="alert alert-danger">
                        <div className='alert-icon'>&#10799;</div>
                        <p>there was an error</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='app'>
            <div className='app-container'>
                <div className='underline-title'>
                    <h2>our menu</h2>
                    <div className='underline underline-warning'></div>
                </div>
                <ul className='btn-container'>
                    {
                        uniqueCategories.map((uniqueCategory, index)=>{
                            return <Btn key={index} text={uniqueCategory} filterMenuItems={filterMenuItems}/>
                        })
                    }
                </ul>
                <div className='menu column column-3'>
                    {
                        menuItems.map((menuItem) => {
                            return <MenuItem key={menuItem.id} {...menuItem}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default App;