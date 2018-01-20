import React, { Component } from 'react';
import Latex from 'react-latex';
import { InlineMath, BlockMath } from 'react-katex';

const ConcreteMathematics  = () => (


        <div>
        <h2>Concrete Mathematics</h2>

        <p>The introduction chapter of Concrete Mathematics is tough, I have found that with many Computer Science Textbooks, so its sometimes good to revisit the first chapter once you have tried the relevant chapters, as the first usually covers a snapshot from the rest of the book. </p>

        <h3>Recurrent Problems</h3>

        <h4>Tower of Hanoi Problem: The Maths Explained</h4>

    

        <p><Latex>The Tower of Hanoi problem is a bit of fun, but the recurrence math behind it is intimidating, I hope we can walk through this and manage to get you to understand it as I have managed too with a lot of effort!</Latex></p>


        <p>The Tower of Hanoi problem is defined as given three pegs with one peg that has eight disks on it stacked in decreasing order. Transfer the disks to another peg moving only one disk at a time and never having a larger disk on top of a smaller one. There are some great examples of this <a href="https://www.mathsisfun.com/games/towerofhanoi.html">here</a>. Concrete Mathematics suggests some key points of tackling a problem like this firstly generalise the problem so what would happen if there were <Latex>$n$ disks? Then we can scale down the problem and look at small cases first what if there were only one or two disks? Then NAME and CONQUER basically add some notation to the problem. </Latex></p> <p><Latex>Here they say $T_n$ is the minimum number of moves to transfer $n$ disks from one peg to another peg. For example $T_1 = 1$ is one disk as you are just moving one. Moving $T_2$ disks needs thinking about so we are moving to the $2$ disks to the same peg. Following the rules we will need to move the top disk which is the smallest to a peg, then the next disk to another peg as it cannot go on top of the smallest disk and then the smallest disk on top of the other disk hence this is $3$ moves, $T_2 = 3$. We also can say that $T_0 = 0$ as no disks are moved.</Latex></p><p><Latex>Now we need to scale up what if we had a near infinite amount of disks. We have just shown optimally we can move two disks in $3$ moves. To move three optimally we follow the pattern moving the top two disks as mentioned above, to the middle peg and then move the third and then move the top two disks back on top of the third. Here we can say the movement of the smallest disk is </Latex><InlineMath math="T_{n-1}"></InlineMath><Latex> so the case of two disks it is $2$ disks to move it is one move, in the case of three disks to move the two smallest are two moves and so on. We then move the very bottom disk which is one move $T_1 = 1$. Then we have to move the </Latex><InlineMath math="T_{n-1}"></InlineMath> disks back on top.</p>

        <p>Producing the formula for disk movement as at most: </p>
   
        <BlockMath math="T_n \leq 2T_{n-1} + 1 \text{       for } (n > 0)"></BlockMath>

        <p>Lets do the actual calculation for three disks. With this formula when having three disks <Latex>$n = 3$ so $T_2 = 3$ we multiply that by $2$ giving us $6$ and then plus the constant of moving the largest disk as $1$. Hence we expect to be able to move three disks in $7$ moves.</Latex></p>
        <p>Firstly we need to move the smallest disk so<Latex> $T_1 = 1$ we then need to move the next disk again $1$ move and then place the smallest disk back onto it so another $1$ move this is the </Latex><InlineMath math="T_{n-1}"></InlineMath> part. We now need to move the bottom largest disk with the constant move of <Latex> $1$ and then move the other two disks back so the smallest onto another peg $1$ move and then the next disk on top of the largest disk which takes $1$ move and then the smallest disk on top again so another $1$ move totalling $3$ again and this all totals $7$ moves so the formula is correct.</Latex></p>

        <p><Latex>This has produced the following inequality and base case for $n = 0$:</Latex></p>

        <p><BlockMath math="T_0 = 0;"></BlockMath></p>

        <p><BlockMath math="T_n = 2T_{n-1} + 1"></BlockMath></p>

        <p><Latex>A set of equalities like this are called a recurrence (recurrence relation or recursion relation). It gives a boundary value and an equation for general value terms. The problem with this recurrence is that it is not in closed form (an expression that can be evaluated in finite number of steps) and what take a long time to computer for large values of $n$. As you need to know the sequence up to $n$ to work it out. To produce this closed form we need to solve the recurrence relation using mathematical induction, we have seen this in the Art of Computer Programming section before!</Latex></p>

        <p><Latex>Firstly we need to make a guess on the correct solution so we take a look at the small cases $T_1 = 0 \times 1 + 1 = 1;$ $T_2 = 2 \times 1 + 1 = 3;$ $T_3 = 2 \times 3 + 1 = 7;$ $T_4 = 2 \times 7 + 1 = 15;$ $T_5 = 2 \times 15 + 1 = 31;$ </Latex></p>

        <p>This pattern appears to be <BlockMath math="T_n = 2^{n - 1}, \text{ for } n \geq 0" /></p> <p><Latex>Mathematical induction is a general way to prove that some statement about the integer $n$ is true for all $n \geq n_0$. Firstly proving when $n$ has its smallest value, $n_0$ called the basis step. Then we prove for the statement $n$ > $n_0$ for all values between $n_0$ and $n-1$. So lets work this out by replacing $n$ by $n - 1$.</Latex></p>


        <p><Latex>Base case: $T_0 = 2^0 - 1 = 0$</Latex></p>

        <p><Latex>Inductive Step: Here the book assumes the reader knows rules of indices so we will walk through step by step.</Latex></p>
        
        <p><InlineMath math="T_n = 2T_{n-1} + 1"/> so lets replace <Latex>$n$ with the proposed solution </Latex><InlineMath math="2(2^{n-1} - 1) + 1" /></p>

        <p><Latex>Simplify: Firstly distribute parentheses </Latex><InlineMath math="2 \times 2^{n-1} + 2(-1)" />. <Latex>Now we apply that two minus&#39;s result in a plus rule.</Latex></p>

        <p><Latex>Resulting in: $2^n - 2 + 1$. Equalling $2^n - 1$ which is the proposed solution so this proof is correct. Throughout the rest of the book it will mainly focus on the recurrence relation part as the first two steps are provided. A recap 1: Look at small cases 2: Find and prove a mathematcal expression for theses small cases 3: FInd and prove a closed form for our mathematical expression in step 2.</Latex></p>

        <p><Latex>The problem with solving like this is that we had to make a guess. Alternatively we could simplify the recurrence by adding $1$ to both sides.</Latex></p>

         <BlockMath math="T_0 + 1 = 1" />

        <BlockMath math="T_n + 1 = 2T_n -1 + 2 \text{ for } n > 0"></BlockMath><p><Latex>for $n$ > $0$</Latex></p>

        <p><Latex>Now we let $U_n = T_n + 1$ giving $U_0 = 1$ and $$</Latex></p>

      
        
    
        <h3>Sums</h3>

     <p><Latex></Latex></p>
        <h3>Integer Functions</h3>

     <p><Latex></Latex></p>
        <h3>Number Theory</h3>

     <p><Latex></Latex></p>
        <h3>Binomial Coefficients</h3>

     <p><Latex></Latex></p>
        <h3>Special Numbers</h3>

     <p><Latex></Latex></p>
        <h3>Generating Functions</h3>

  <p><Latex></Latex></p>

        <h3>Discrete Probability</h3>

     <h3>Asymptotics</h3>
    
    </div>

);

export default ConcreteMathematics
