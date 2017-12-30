
import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import HomePage from "./home";
import FunctionalProgrammingPage from "./functional-programming";
import AlgorithmsPage from "./algorithms.js";
import MathFundamentalsPage from "./math-fundamentals";
import MathsForCompSciPage from "./maths-for-comp-sci.js";
import CLanguagePage from "./c-language.js";
import ClojurePage from "./clojure.js";
import { slide as Menu } from 'react-burger-menu';


class SideBar extends Component {
 constructor(props) {
    super(props);
    this.handleMenuClick =  this.handleMenuClick.bind(this);
  }

    
   handleMenuClick (event) {
       event.preventDefault();
         console.log('closing menu');
           this.setState({isOpen: false});
     }


    
  render() {
    return (
       <HashRouter>

            <Menu isOpen={ false }>
            <a onClick={ this.handleMenuClick }  > <NavLink exact to="/">Home</NavLink></a>
            <a  onClick={ this.handleMenuClick } > <NavLink to="/MathFundamentals">Math Fundamentals</NavLink></a>
            <a  onClick={ this.handleMenuClick } > <NavLink to="/MathsForCompSci">Maths for Computer Science</NavLink></a>
            <a onClick={ this.handleMenuClick } ><NavLink to="/Algorithms">Algorithm Fun</NavLink></a>
            <a onClick={ this.handleMenuClick } ><NavLink to="/clojure">Hipster Clojure</NavLink></a>
            <a onClick={ this.handleMenuClick } ><NavLink to="/FunctionalProgramming">Functional Programming</NavLink></a>
            <a onClick={ this.handleMenuClick } ><NavLink to="/CLanguage">A Little Bit of C Programming</NavLink></a>
            <a onClick={ this.handleMenuClick } ><NavLink to="/ProgrammingPearls">Programming Pearls</NavLink></a>
                    
            </Menu>


      </HashRouter>
    );
  }

}
 
export default SideBar;
