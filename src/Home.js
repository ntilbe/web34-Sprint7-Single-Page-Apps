import React from "react";
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div>
            <div className="imageContainer">
                <img className="image" src="https://images.pexels.com/photos/2918537/pexels-photo-2918537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="pizza"/>
                <div>
                    <div className='pizza-background'>
                        <Link to='/pizza'>
                            <button className='pizza-btn'>Order Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
    );
  };
export default Home;