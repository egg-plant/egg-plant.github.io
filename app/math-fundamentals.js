import React, { Component } from "react";
  
class MathFundamentals extends React.Component {
  render() {
    return (
      <div>
            <h2>Math Fundamentals</h2>

                    <h3>Maths Prerequisites</h3>
            <p>I was looking through the course notes for <a href="http://web.stanford.edu/class/cs103/">CS103</a> Mathematical Foundations of Computing and found a greate slide on <a href="http://web.stanford.edu/class/cs103/handouts/020%20Mathematical%20Prerequisites.pdf">mathematical prerequisites</a> for the course. I felt straight away this was a great small sample of the required maths for any maths for computer science or algorithm course in a short form, I still recommend Concrete Mathematics and the Math Preliminaries section in Art of Computer Programming vol1 by Knuth to add a fuller picture. Coming from the UK GCSE Bitesize maths is also great for really basic recap of High School maths.</p>


        <h4>Multiplying Polynomials</h4>
            <p>As part of this course polynomical knowledge is expected to be known which may not be the case if students did not have a great maths experience at earlier school years. They come to a specific case n^2 = (2k)^2 this is the same as n^2 = 4k^2. This is fairly trivial to understand as you take (2k)*(2k) = 2*2 and k*k = 4k^2.</p>

            <p>The next example is a little less trivial if you do not know polynomial multiplication and simply says n^2 = (2k + 1)^2 which simplied is n^2 = 4k^2 + 4k + 1. What always trips me up here is the 4k. Lets walk though this example. </p>
            <p>(2k+1)^2 can be written as (2k+1)(2k+1) so we take each part of multiply by the next section so: </p> <p> 2k * 2k and 2k * 1 and then also 1 * 2k and 1 * 1. This then equals 4k^2 + 2k + 2k + 1 = (reduced) 4k^2 + 4k + 1. </p>

            <p> We can now clearly see how they have got to n^2 = 4k^2 + 4k + 1(hopefully) Please message me if not.</p><p> 

            <strong>Congratulations this is a great starting step to understanding any future courses in this area!!</strong> 
            </p>
             </div>
    );
  }
}

export default MathFundamentals;
