import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import MathIntro from './math-fundamentals/math-intro';
import MathPrerequisites from './math-fundamentals/math-prerequisites';
import BiteSizeMath from './math-fundamentals/bitesize-maths';
import ConcreteMathematics from './math-fundamentals/concrete-mathematics';
import { HashLink as Link } from 'react-router-hash-link';


import BlogPage from './blog-page.js';
import "./../css/list-menu.css";


const MathFundamentals = ({ match })  => {
  
   return (

       <BlogPage
       title='Math Fundamentals'

       contents={
           <div className='center'>
           
               <ul className='nav menu center'>
               
               <li className='gray'>
            <Link to={`${match.url}#text-body`}>
          Welcome to<br/>Maths
       </Link>
           </li>
     
           <li className='quay-pink'>
            <Link to={`${match.url}/BiteSizeMath#text-body`}>
          Bitesize<br/>Math
       </Link>
           </li>
               <li className='dark-blue'>
        <Link to={`${match.url}/MathPrerequisites#text-body`}>
          Math<br/>Prerequisites
        </Link>
           </li>
           <li className='teal'>
           <Link to={`${match.url}/ConcreteMathematics#text-body`}>
           Concrete<br/>Mathematics
           </Link>
      
           </li>
    
        
           </ul>
</div>
       }


       text={<div>
             <Route exact path={`${match.url}`} component={MathIntro} />
 
             <Route path={`${match.url}/MathPrerequisites`} component={MathPrerequisites}/>   
           <Route path={`${match.url}/BiteSizeMath`} component={BiteSizeMath}/>


        <Route path={`${match.url}/ConcreteMathematics`} component={ConcreteMathematics}/>
       </div>
            }
       
       
       />
   );
}
  


export default MathFundamentals;
