import React from 'react';
import { render } from 'react-dom';
import Main from './Main';
import Footer from './footer.js';
import "./../css/index.css";




console.log('Testing version 4');
class App extends React.Component {

 myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "header") {
        x.className += " responsive";
    } else {
        x.className = "header";
    }
}
    
  render () {
    return (
<div>
            <Main/>
        <Footer />
</div>
);
}
}


render(<App/>, document.getElementById('app'));

