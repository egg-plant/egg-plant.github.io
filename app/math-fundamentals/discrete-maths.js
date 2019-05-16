import React from 'react';
import {BlockMath, InlineMath} from 'react-katex';
import {HashLink as Link} from 'react-router-hash-link';
import Latex from 'react-latex';

const DiscreteMaths = () => (

    <div>

        <h2>Discrete Mathematics</h2>

        <p>Discrete Mathematics is taught on most Computer Science courses and is going to be required reading for when
            we move onto the Art of Computer Programming and Concrete Mathematics. Three great books on this subject
            are <a
                href="https://www.amazon.co.uk/Discrete-Mathematics-Elementary-Beyond-Undergraduate/dp/0387955852/ref=sr_1_2?ie=UTF8&qid=1537684223&sr=8-2&keywords=discrete+mathematics+springer">Discrete
                Mathematics: Elementary and Beyond</a> and <a
                href="https://www.amazon.co.uk/DISCRETE-MATHEMATICS-ITS-APPLN-GE/dp/9814670138/ref=sr_1_2?ie=UTF8&qid=1537684203&sr=8-2&keywords=discrete+mathematics">Discrete
                Mathematics and it Applications</a> and <a
                href="https://www.amazon.co.uk/gp/product/0198507178/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1">Discrete
                Mathematics</a>. I would recommend studying these three books if time permits, I have
            studied them and this section will be the parts I missed or need to recap on rather than the whole
            text.</p>

        <h3>Topics</h3>
        <ul className="text-list">
            <li><Link to="#sets">Sets</Link></li>
            <li><Link to="#sequences">Sequences and Summations</Link></li>
            <li><Link to="#Recurrence">Recurrence Relation</Link></li>
            <li><Link to={"#logic"}>Logical Framework</Link></li>
            <li><Link to={"#naturalnumbers"}>Natural Numbers</Link></li>
        </ul>

        <h3 id={"sets"}>Sets</h3>

        <p>The <a href={"https://en.wikipedia.org/wiki/Cardinality"}>cardinality</a> of a set is the number of elements
            in the set for example in coding we say length. This is
            represented using the cardinality symbol, for example for set <Latex>$X$</Latex> the cardinality of this set is denoted
            with <Latex>$|X|$</Latex>. If two sets have the same cardinality we say there is a one to one correspondence
            from set A to set B <Latex>$|A| = |B|$</Latex>.</p>

        <h3 id={"sequences"}>Sequences and Summations</h3>
        <h4>Sequence</h4>
        <p>A sequence is a structure used to represent an ordered list it can be finite or infinite. For
            example <InlineMath math="1, 2, 3, 4, 5"/> is an example of a finite sequence with five terms
            and <InlineMath math="1, 3, 9, ... 3^n"/> is an infinite sequence. The notation <InlineMath math="a_n"/> is
            used to denote a single entry in the sequence and is called a term.</p>

        <p>Now lets take a simple example of a sequence.</p>

        <BlockMath math="a_n = \frac{1}{n}"/>

        <BlockMath math="a_1,a_2,a_3 .... ,"/>
        <p>This sequence will start with the following:</p>
        <BlockMath math="\frac{1}{1},\frac{1}{2},\frac{1}{3} .... ,"/>

        <p>Two other important definitions are geometric progression and arithmetic progression I will leave it up to
            the reader to investigate these.</p>

        <h4 id={"Recurrence"}>Recurrence Relation</h4>
        <p>When we defined the sequence above we provided explicit formulas for the terms. Another way is to provide the
            initial terms and a rule for defining later terms. This is a recurrence relation. A sequence is said to be a
            solution of a recurrence relation if its terms satisfy the recurrence relation.</p>
        <p>Lets check a nice and easy example. This example provides a rule of <InlineMath
            math="a_n = a_{n-1} + 3"/> for <InlineMath math="n = 1,2,3 ... "/> for the initial term of <InlineMath
            math="a_0 = 2"/> This then produces the sequence <InlineMath math="a_1 = a_0 + 3 = 2 + 3 = 5"/> then
            followed by <InlineMath math="a_2 = 5 + 3 = 8"/> and <InlineMath math="a_3 = 8 + 3 = 11"/></p>

        <h4>Special Integer Sequences</h4>
        <p>With the above we were given the closed formula (the pattern the sequence is running in forumla) a recurrence
            relation or other type of general rule. What if this is not provided, well given the firt few values of the
            sequence then we have to make an educated conjecture (guess) about the identity of the sequence. Some common
            things to look for are there runs of the same value inthe sequence, are terms made from previous terms by
            adding, subtracting, multiplying or manipulting them in some way. Or are there specific cycles. </p>

        <h4 id={"Summations"}>Summations</h4>
        <p>Summations are simply sequences that are the additions of terms of a sequence. These expressions are
            expressed using the sigma notation.</p>

        <BlockMath math="\sum_{j=m}^n a_j"/>

        <p>This is read as the sum from <InlineMath math="j = m"/>, to <InlineMath math="j = n"/> of <InlineMath
            math="a_j"/> We have used the variable j to be used as the index of the summation but any variable can be
            used. We start with a lower limit m and a upper limit of n.</p>


        <h3 id={"numbertheory"}>Number Theory</h3>

        <h4>Division</h4>
        <p>When <i>a</i> divides <i>b</i> we say that <i>a</i> is a facotr or divisor of <i>b</i> and that <i>b</i> is a
            multiple of <i>a</i>. When dividing we gave the quotient as q, a as the dividend, d as the divisor and r as
            the remainder. It follows this formula.</p>

        <BlockMath math="q = a/d"/>
        <BlockMath math="r = a \mod d"/>

        <p>Lets see an example of this definition above. We have 113 divided by 12:</p>

        <BlockMath math="113 = 12*9+5"/>

        <p>Hence, the quotient when 113 is divided by 12 is 9 = 113 div 12 and the remainder is 5 = 113 mod 12. Simply
            you divide the 113 by 12 and floor to get the quotient and then you do the modulo on the 113 by 12 to get
            the remainder of 5.</p>


        <BlockMath math="quotient = a \div d"/>
        <BlockMath math="remainder = a\mod n"/>

        <p>If you get stuck a great reference is <a
            href="https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/what-is-modular-arithmetic">here</a> that
            discusses the clock method for dealing with mods. Just remember its mod 3 then you have a clock of 0,1,2 and
            you count clockwise the number of times the value of a or if a is negative you count counter clockwise. For
            example -11 mod 3. You count 2,1,0,2,1,0,2,1,0,2,1 so the answer of -11 mod 3 = 1. For negative numbers you
            round down when taking the floor for the quotient for example -3.6 is floored to -4. That is why the answer
            is 1 above as its <InlineMath math="-11 \div 3 = (floor) -4"/> so this is <InlineMath
                math="-4 \times 3 + 1 = -11"/></p>

        <h4>Modular Arithmetic</h4>
        <p>Sometimes we only care about the remainder for example when looking at a 24hour clock what time is it 40 hour
            from now, we add 40 hours plus to the current hour and divide by 24. A closely related notation indicates
            that two integers say a and b, have the same remainder when both divided ((a - b)/m) by positive m. The
            congruence is defined as follows: </p>

        <BlockMath math="a \equiv b  \text{ (mod  m) is a congruence and m is its modulus}"/>

        <p>Lets see an example determine if 16 is congruent to 4 modulo 6.</p>

        <BlockMath math="6 \div 16 - 4 = 12  \text{ shows that } 16 \equiv 4 \text{ mod } 6"/>

        <h4>Arithmetic Modulo</h4>
        <p>Arithmetic mod is simple just follow the formula and either add or multiply two numbers and then mod it.
            Simples.</p>

        <h3 id={"logic"}>Logical Framework</h3>

        <h4>Contrapositive Statement</h4>
        <p><b>Contrapositive statement</b> is when you negate both values of a implies statement and swap the order as
            follows: <Latex>$p \Longrightarrow q$</Latex> then the contrapositive statement is <Latex>$\neg q
                \Longrightarrow \neg
                p$</Latex> and these are logically equivalent as the truth table will be identical.</p>

        <p>Now for some examples taken from the exercise in Discrete Mathematics (Biggs). Write down the contrapositive
            statement of &quot; if n is a multiple of 7 then n is not a multiple of 3&quot;, where the contrapositive
            is &quot; if n is a multiple of 3 then n is not a multiple of 7&quot;.
        </p>

        <h5>Example</h5>

        <p>An example from the same book given is closely related to proof by contradiction. <i>&quot;The number 3 is a
            prime, and 3+1 = 4 is a perfect square. Show that there are no other prime numbers n such that n+1 is a
            perfect square.&quot;</i></p>

        <h5>Solution</h5>
        <p>So this question is dealing with the universe of all natural numbers greater than 4. We are asked to prove
            the statement.</p>

        <p><Latex>$n$ is a prime $\Longrightarrow n + 1$</Latex> is not a perfect square.</p>

        <p>Lets prove this as the contrapositive.</p>

        <p><Latex>$n + 1$ is a perfect square $\Longrightarrow n$</Latex> is not a prime.</p>

        <h6>Proof</h6>

        <p>If <Latex>$n + 1 = m^2$ then $n = m^2 -1 = (m+1)(m-1)$</Latex>. So we have moved the +1 to the other side to
            the square and then factorised it. Therefore as prime needs a single factor of m the only prime that can be
            made from the product of numbers is when <Latex>$m = 2$ then $n$ is $3$</Latex>. As stated the only prime so
            we have proved it.</p>

        <p>Nice things are starting to come together remember all of this for the Proofs section in Maths for Computer
            Science.</p>

        <h3 id={"naturalnumbers"}>Natural Numbers</h3>

        <p></p>


    </div>
);

export default DiscreteMaths;
