import React from "react";
import BlogPage from './blog-page.js';
import Latex from 'react-latex';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {darcula} from 'react-syntax-highlighter/styles/hljs';
import {HashLink as Link} from 'react-router-hash-link';
import {InlineMath, BlockMath} from 'react-katex';

const algorithms = {
    title: 'Algorithms',
    contents:
        '',
    text: [
        <div>

            <h3>Topics</h3>
            <ul className="text-list">
                <li><Link to={"#Introduction"}>Introduction</Link></li>
                <li><Link to={"#Selections"}>Selections</Link></li>
                <li><Link to={"#Search"}>Binary Search</Link></li>
                <li><Link to={"#Asymptotic"}>Asymptotic Notation</Link></li>
                <li><Link to={"#DataStructures"}>Data Structures</Link></li>
                <li><Link to={"#Sorting"}>Sorting</Link></li>
            </ul>

            <h3 id={"Introduction"}>Introduction</h3>

            <p>This section owes massive thanks to <a
                href={"https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/functions-in-asymptotic-notation"}>Khan
                Academy</a> and <a
                href={"https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/index.htm"}>MIT
                Introduction to Algorithms</a>. </p>

            <h4>Algorithmic Thinking</h4>
            <h5>Finding a peak in a list of numbers</h5>
            <p>Lets start with our first and very simple algorithm that finds peaks if one exists in a list of numbers.
                To define this in mathematical form lets have a list of items <Latex>$[a b c d e f g h
                    i]$</Latex> position 2 in the list
                of items is only a peak if <Latex>$b \geq a$</Latex> and <Latex>$b \geq c$</Latex>.
                Position 9 is a peak if <Latex>$i \geq h$</Latex>. In plain english basically if either
                side of a point are smaller or equal too the point it is a peak. Note the equal too as we can still find
                a peak if all items are equal. Potentially all values in a list maybe equal so they are all peaks.
                A simple algorithm to find this would be to start at the beginning and check each item
                in the list. The problem with this approach is that it is slow. We have to check through each item in a
                list and for large lists this is very slow. It would be linear time <i>O(n)</i>. Alternatively the
                course by MIT states an approach using a divide and conquer algorithm similar to Binary Search. Where it
                takes the middle point of the list checks the left side if it is smaller
                than left find mid point of left list, else check if smaller than right side check right side list for a
                peak, else it is a peak. This algorithm will not necessarily find the max peak but will find a peak in
                the list.
                Lets write some Java code to see this.</p>
            <p>
                <SyntaxHighlighter language='java' style={darcula} showLineNumbers={true} wrapLines={true}>{`public static int findPeak(int[] data) {

        if(data == null || data.length == 0) {
            throw new IllegalArgumentException("Invalid data");
        }

        if(data.length == 1) {
            return data[0];
        }

        // Whole time running is O(1) + O(1) + T(N/2)
        // T(N) = O(1)
        int midpoint = data.length/2;

        // T(N) = O(1) 
        if(data[midpoint] < data[midpoint-1]) {

            int[] leftSide = new int[midpoint-1];
            System.arraycopy(data, 0,leftSide, 0, midpoint-1);
            // T(N/2)
            return findPeak(leftSide);
        // T(N) = O(1) 
        } else if( data[midpoint] < data[midpoint + 1]){

            int[] rightSide = new int[data.length - midpoint+1];
            System.arraycopy(data, midpoint+1,rightSide, 0, data.length - midpoint+1);
             // T(N/2)
            return findPeak(rightSide);
        } else {
            // T(N) = O(1) 
            return data[midpoint];
        }

}`}</SyntaxHighlighter>

                As Clojure is also awesome lets see it in a functional language style, you can see how much shorter it
                is granted we have not added the exception handling!
                <SyntaxHighlighter language='clojure' style={darcula} showLineNumbers={true} wrapLines={true}>{`(defn find-peak [data]
  (let [midpoint (Math/floor (/ (count data) 2))]
    (if (= 1 (count data)) (nth data 0)
        (cond
          (< (nth data midpoint) (nth data (- midpoint 1)))
          (recur
           (nth  (split-at (-  midpoint 1) data) 0))
          (<  (nth data midpoint) (nth data (+ midpoint 1)))
          (recur
           (nth (split-at (+ midpoint 1) data) 1))
          :else (nth data midpoint)))))\n\n(find-peak [6,7,4,3,2,1,4,5])\n;; => 7`}</SyntaxHighlighter>


            </p>
            <p>The time complexity of this algorithm has the constant time for the finding the midpoint then a
                constant time check for the comparison, and finally running it again on half the list so same problem
                but half input size <InlineMath
                    math="\Theta(1) + \Theta(\frac{n}{2})"></InlineMath>. Now we need to expand this. We replace the
                constant with <i>c</i> and run through the algorithm splitting the list by half each time.

                <p>Firstly lets check the case for a single element where n = 1.</p>

                <p>Base case</p>
                <BlockMath math="T(1) = O(1)"/>

                <p>Now lets work it out for any number of items n defining our recurrence relation.</p>
                <BlockMath math="T(n) = C + T(\frac{n}{2})"/>
                <BlockMath math="     = C + C + T(\frac{n}{4})"/>
                <BlockMath math="     = C + C + C + T(\frac{n}{8})"/>
                <BlockMath math="     = C + C + C + C + T(\frac{n}{16})"/>

                <p>We expand as many times as we need until we see the pattern which we can work out as</p>
                <BlockMath math="     = C \times i + T(\frac{n}{2^{i}})"/>

                <p>Now we want be able to write out the expanded form as the constant form plugging it in.
                    With <i>i</i> such
                    that <InlineMath
                        math="T(\frac{n}{2^i}) = T(1)"></InlineMath></p>
                <p>We want to replace the left side with the right side which are equal</p>
                <BlockMath math="\frac{n}{2^i} = 1"/>
                <p>Using logarithm law we want to get <i>i = </i></p>
                <BlockMath math="i = log n"/>

                <p>Now we need to plug it back into our expanded term formula we found previously to find our
                    function.</p>
                <BlockMath math="     = C \times i + T(\frac{n}{2^{i}})"/>
                <p>We worked out the value for <i>i</i> so can replace when we have the T(1) as i = n so its n/n.</p>
                <BlockMath math="     = C \times \log n + T(1)"/>
                <p>We plugged it in now we replace T with Theta and replace constant with Theta forcing it to become
                    base case</p>
                <BlockMath math="     = \Theta(1) \times \log n + \Theta(1)"/>
                <p>We know that log dominates the constant so solved: <InlineMath
                    math="\Theta( log n)"></InlineMath></p>


                This approach is very similar to any divide and conquer algorithm we break the problem down and down
                again until size of the elements is 1 and get the base case. This is a constant
                time <Latex>$O(1)$</Latex> which is for the comparison checks looking at left comparison and right
                comparison. We then gather back up the single elements that have been divided which was for
                example <Latex>$T(n) = T(n/2) + 1$</Latex> then <Latex>$T(n) = T(n/4) + 1$</Latex> this pattern
                continues which can be reverted from <Latex>$T(n/2^k) + 1$</Latex>to be <Latex>$O (\log 2
                    n)$</Latex>. Similar to this post <a
                    href="https://stackoverflow.com/questions/2307283/what-does-olog-n-mean-exactly/13093274#13093274">here</a>.
            </p>


            <h4>Bridge Crossing Problem Solving</h4>

            <p>A logical problem that commonly appears and is asked is scenarios of crossing a bridge in the shortest
                time. Please read a nice <a
                    href={"https://en.wikipedia.org/wiki/Bridge_and_torch_problem#Solution"}>here</a> and further
                explanation <a
                    href={"https://www.codeproject.com/Articles/804991/Bridge-Crossing-Puzzles-Optimal-Strategy"}>here.</a>
            </p>

            <h4>Models of Computation</h4>

            <h3 id={"Selections"}>Selections</h3>
            <h4>Hoare QuickSelect</h4>

            <h3 id={"Search"}>Binary Search</h3>

            <p>Binary search allows finding an item for a <strong>sorted</strong> list in <Latex>$O (\log
                n)$</Latex> time. This is usually <InlineMath math={"{log_2} n"}></InlineMath> but is irrelevant due to
                if <i>a</i> and <i>b</i> are constant then they only differ by a constant factor so it can be ignored in
                Big O notation explained later on.
            </p>

            <p>It does this by taking the midpoint and dividing the list in two and seeing if the item is higher or
                lower than the chosen midpoint then applies the same process to the chosen halved list.</p>

            <SyntaxHighlighter language='python' style={darcula} showLineNumbers={true} wrapLines={true}>{`def recursive_binary_search(data, start_index, end_index, to_find):
    if end_index >= start_index:
        mid_point = math.floor((start_index + end_index) / 2)

        # midpoint is found return it
        if data[mid_point] == to_find:
            return mid_point

        # midpoint is higher than to find check in lower half of list exclude midpoint
        elif data[mid_point] > to_find:
            return recursive_binary_search(data, start_index, mid_point - 1, to_find)

        # midpoint is lower than to find check in higher half of list exclude midpoint
        else:
            return recursive_binary_search(data, mid_point + 1, end_index, to_find)

    else:
        # Element is not in array
        return -1`}</SyntaxHighlighter>

            <h4>Time Complexity</h4>

            <p>Lets now understand the time complexity of binary search, as we have seen in the algorithm a incorrect
                guess will half the size of the search area so a incorrect guess on a list of elements length 8 will
                result in a new search on a list of 4 elements. Then it will be 2 then it will be 1. Therefore with a
                length of 8 you will need at most 4 guesses. Of course you could be lucky and find the element
                immediately or earlier as it could be the middle element. Hence the pattern is that every time the size
                of the list to search doubles we require another guess. The formula simply put is the number of times we
                half until we get to 1 then we add 1. Or the number of times we check so check in the 8, then the 4,
                then the 2 then the 1 so 4 guesses. This is the in mathematical terms as <InlineMath
                    math="{log_2} n + 1"></InlineMath> but we ignore constants taught later on so its <InlineMath
                    math="{log_2} n"></InlineMath> also remember that log is the inverse of exponential.
                <InlineMath math="{log_2} n = x"></InlineMath> is the same as <InlineMath
                    math={"n = 2^x"}></InlineMath> for example <InlineMath math={"{log_2} 32 = 5"}></InlineMath> is the
                same as <InlineMath math={"32 = 2^5"}></InlineMath>. This makes it simple to calculate the running time
                of a binary search on a list of length <i>n</i> which is a power of <i>2</i>. If it is not a power
                of <i>2</i> then we can round to the closest power of <i>2</i> or say its between two powers. For
                example a list of length <i>2000</i> would be between <InlineMath
                    math="2^{10} = 1024"></InlineMath> and
                <InlineMath math="2^{11} = 2048"></InlineMath>.
            </p>

            <h4>Conclusion</h4>

            <p>Boom we have just reviewed and completed a lovely search algorithm and understood the time complexity
                nice right! It was not even too hard.</p>

            <h3 id={"Asymptotic"}>Asymptotic Notation</h3>

            <p>Firstly a great video on this stuff is here <a
                href={"https://www.youtube.com/watch?v=P7frcB_-g4w&t=585s"}>MIT Open Courseware</a>.</p>

            <p>When analysing algorithms we need to think of two time aspects deciding how long it takes on size of
                input and then and then how fast the algorithm grows with the input size. This second part is the rate
                of growth as at some point different algorithms may differ on speed with larger input. When looking at
                asymptotic notation then we drop the less significant terms and the constant coefficients and focus on
                the important parts of the running time.</p>

            <h4>Big Theta</h4>

            <p>A simple search through a sorted list is a linear search where you check each item once. If you then have
                a nested loop you are then checking through <InlineMath math="n \times n = n^2"></InlineMath>. Commonly
                a algorithm also has some constant time complexity such as doing a compare or assigning a variable. As
                stated we ignore these and focus on the most significant term. So in a linear search you would have
                the <i>constant</i> of the check if value matches and return the value and this would be <InlineMath
                    math="constant \times n"></InlineMath>. But as are state we ignore the lower terms we focus on
                the <i>n</i>. For our first complexity we look at Theta so in this case we are stating that
                once <i>n</i> gets large enough the running time is at least <InlineMath
                    math="k_{1} \times n"></InlineMath> and at most <InlineMath
                    math="k_{2} \times n"></InlineMath> for some constants <InlineMath
                    math="k_{1}"></InlineMath> and <InlineMath math="k_{2}"></InlineMath>. For small values
                of <i>n</i> we are not interested in the Big Theta of <i>n</i> but once they get big enough we say that
                as
                long as the constants <InlineMath math="k_{1}"></InlineMath> and <InlineMath
                    math="k_{2}"></InlineMath> exist the running time is <InlineMath math="\Theta(n)"></InlineMath>.
                This can be applied to any function say <InlineMath math="f(n)"></InlineMath> the running time
                is <InlineMath math="\Theta(f(n))"></InlineMath> is between <InlineMath
                    math="k_{1} \times f(n)"></InlineMath> and <InlineMath math="k_{2} \times f(n)"></InlineMath>.
            </p>

            <p>An example we have:</p>

            <BlockMath math="1.1 \times x^2 + ( 10 + 121) = \Theta(x^2)"/>

            <p>as we can take the most significant term as when we graph this the factor that grows massively
                when <i>x</i> increases is the most significant term. The constant factors <InlineMath
                    math="k_{1}"></InlineMath> and <InlineMath math="k_{2}"></InlineMath> are the parts dropped. Here
            </p>

            <BlockMath math="g(x) = \Theta(f(x)"/>
            <p>Lower bound with <i>k1</i> as 0.2 the constant. As original was 1.1 its lower.</p>
            <BlockMath math="f(x) = 0.2 \times x^2"/>
            <p>Upper bound with <i>k2</i> as 1.2 the constant. As original is 1.1 its higher.</p>
            <BlockMath math="f(x) = 1.2 \times x^2"/>

            <p>In summary when using the <InlineMath math="Big \Theta"></InlineMath> notation we are saying that we
                have a <strong>asymptotically tight bound</strong> on running time. Which is bounded between two
                constants. It is asymptotically as it only matters for large values of <i>n</i> and tight bound as we
                have the running time stated within a constant factor above and below.</p>

            <h4>Big O</h4>

            <p>We have seen with Big Theta a time complexity bound between two constants. We now move to Big O which
                bounds only from above which is the worst case running time. Referring back to binary search we worked
                out the running time was <InlineMath math="log_2 n"></InlineMath> but this would
                be <strong>incorrectly</strong> stated as <InlineMath math="\Theta(log_2 n)"></InlineMath> due to the
                fact it is not true for all cases we could successfully get the item we are looking for in the first
                guess so <InlineMath math="\Theta(1)"></InlineMath>. What we actually can say is that the running of
                binary search is never worse than <InlineMath math="\Theta(log_2 n)"></InlineMath> but it can sometimes
                be better. This is where Big O steps up. It enables us to say that the running time grows at most this
                much (worst case/upper bound) but can grow slower (better cases like the first guess).
            </p>

            <p>When you are coding software you usually are not interested in the best lucky case you want to minimise
                the worst case timings say for example searching for something via Google you need to have a requirement
                met for the worst case upper bound.</p>

            <p>Big O notation lets you say things that can be true but are not the most accurate for example we could
                say Binary Search is <InlineMath math="O(n)"></InlineMath> and this is true as it will never worse than
                that. Like saying I have 3 cards in my wallet but could say I have an amount of cards in my waller thats
                no more than 10 cards.</p>

            <h4>General Functions Time Complexity</h4>

            <p>Some simple but important cases. For example if you had a sorted array in decreasing order so the largest
                element is at the front then tasked with finding the MAX then it would be in index 0. Looking at the Big
                Theta of this algorithm we would say that the runtime is <InlineMath
                    math="\Theta(n^0)"></InlineMath> because the lookup of the first index is constant and <InlineMath
                    math="n^0 = 1"></InlineMath> and practically we would write <InlineMath
                    math="\Theta(1)"></InlineMath>. </p>

            <p>Another case is looking at log times with different base constants. If you said an algorithm
                took <InlineMath math="{log_10} n"></InlineMath> then it would be the same as <InlineMath
                    math="{log_2} n"></InlineMath> because of the rule:</p>

            <BlockMath math="{log_a} n = \frac{{log_b} n}{{log_b} a}"/>

            <p>Therefore if <i>a</i> and <i>b</i> are constants which they are then they only differ by a constant
                factor which we said we ignore in asymptotic notation.</p>


            <p>The common complexities that come up in algorithm analysis are listed below in the order fastest to
                slowest. Note for logs bases and exponents inside the logs turn into constant factors so are
                dropped.</p>
            <ul>
                <li><InlineMath math="O(1)"></InlineMath></li>
                <li><InlineMath math="O(log_2 n)"></InlineMath></li>
                <li><InlineMath math="O(n)"></InlineMath></li>
                <li><InlineMath math="O(n log_2 n)"></InlineMath></li>
                <li><InlineMath math="O(n^2)"></InlineMath></li>
                <li><InlineMath math="O(n^2 log_2 n)"></InlineMath></li>
                <li><InlineMath math="O(n^3)"></InlineMath></li>
                <li><InlineMath math="O(2^n)"></InlineMath></li>
                <li><InlineMath math="O(n!)"></InlineMath></li>
            </ul>

            <h4>Big Omega</h4>

            <p>We now move to the final major time bound big Omega. Big Omega is used for asymptotic lower bounds. We
                say the running time is at least <InlineMath math="k \times f(n)"></InlineMath> for a constant <i>k</i>.
                Here we can also make correct but imprecise statements such as I have 10 cards in my wallet, but I say I
                have at least 4 cards in my wallet. It is correct but not very precise.
            </p>

            <p>Applying this idea to binary search we can say the worst case running time of binary search
                is <InlineMath math="\Omega(1)"></InlineMath> as we know it takes <strong>at least</strong> constant
                time.</p>

            <p>As before when <InlineMath math="\Theta(f(n))"></InlineMath> automatically implies <InlineMath
                math="O(f(n))"></InlineMath> it also automatically implies <InlineMath
                math="\Omega(f(n))"></InlineMath>.</p>

            <h4>Conclusion</h4>

            <p>Learn this section well it is critical for all algorithms also note people commonly write O(n) and really
                are talking Big Theta of N. We have show that you can be imprecise but correct with statements but
                please do always try and be as precise as possible.</p> <p>An point that clears up that if you have a
            running time and you cannot bound it either side by a constant then you cannot have Big Theta only Big O for
            upper bound and Big Omega for lower bound.</p>

            <BlockMath math="g(x) = (1 + sin(x)) \times x^{1.7} + x^{1.4}"/>

            <p>The constant here contains <InlineMath math="x^{1.4}"></InlineMath> and <InlineMath
                math="x^{1.7}"></InlineMath> the most significant term is <InlineMath math="x^{1.7}"></InlineMath>.</p>

            <p>The upper bound is in this example.</p>
            <BlockMath math="f(x) = 3 \times x^{1.5}"/>
            <p>The lower bound is in this example.</p>
            <BlockMath math="f(x) = x^{1.4}"/>

            <p>As the lower and upper bounds are not constant we cannot use Big Theta. Instead we have to say the Big O
                and Big Omega are:</p>

            <BlockMath math="O(x^{1.5})"/>
            <BlockMath math="\Omega(x^{1.4})"/>

            <p>Some examples</p>
            <BlockMath math="10^{62} -> O(1)"/>
            <BlockMath math="f(4n)^6 -> O(n^6)"/>
            <BlockMath math="log(n^{100}) = 100 log(n) -> O ({log} n)"/>
            <BlockMath math="{log_5}(n) = \frac{log n}{{log_5}} -> O ({log} n)"/>

            <h3 id={"DataStructures"}>Data Structures</h3>

            <h4>Introduction</h4>
            <p>Sets have already been covered in the Discrete Maths where they were usually fixed but sets that are
                manipulated by Algorithms
                can change by growing and shrinking over time, these sets are call dynamic. Algorithm may require the
                ability to insert, delete and test if items are contained in sets and we refer to these structures
                as <strong>dictionaries</strong>. Most dynamic sets assume that one of the objects attributes can
                uniquely identify it and this is referred to as a <strong>key</strong>. The object may also contain what
                is referred to as <strong>satellite data</strong>. Satellite data is the payload of the data which is
                not part of the structure of the data structure. If the key is unique then they can be ordered.</p>

            <h5>Stacks</h5>

            <p>Stacks are <i>last in first out</i> (LIFO) meaning the most recently added element to a stack is deleted.
                Insert is usually referred to as Push and deletion is referred to as Pop on a stack, much like with GIT
                if you are familiar with the stash feature. Stacks are also used as the <i>Execution Stack</i> to
                execute program code. This execution stack contains what are referred to as stack frames;
                subroutine calls in the order of the subroutine arguments as the first stack frame, then
                return address back to the routines caller, and the stack frame for the local variables of the
                subroutine. When a subroutine completes and executes the return statement it is popped off the stack. If
                an exception is thrown (c++ behaviour) it will walk the stack until it finds a handler, unwind the stack
                to to the handler and let it handle it. Back to the plain data structure, if we pop an empty stack it
                underflows, if we push to a full stack it overflows. Stacks are usually implemented with a linked list
                node as the <a href={"https://introcs.cs.princeton.edu/java/43stack/Stack.java.html"}>structure</a>.</p>

            <h5>Queues</h5>

            <p>Queues follow a <i>first in first out</i> (FIFO) policy meaning the one deleted is the one
                that has spent the longest time in the set. Where insert are referred to as ENQUEUE and delete DEQUEUE.
                Items are enqueued at the <strong>tail</strong> and elements are dequeued at the <strong>head</strong>.
            </p>

            <h5>Linked Lists</h5>

            <p>Linked lists are a data structure arranged in linear orders. Unlike a array the order is not determined
                by indices but a pointer in each object to the next item. <strong>Doubly linked lists</strong> nodes not
                only contain the
                key and satellite data but also pointers to next and previous objects in the linked lists. If the node
                property previous is nil then it is at the start of the list which is the <strong>head</strong>. If the
                node property next is nil then it has no next element so is the <strong>tail</strong> last element of
                the linked list. If the head element is nil then it is an empty list.</p>

            <h5>Linked List Types</h5>

            <table>
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td><strong>Single Linked</strong></td>
                    <td>Each node has no previous link only next</td>
                </tr>
                <tr>
                    <td><strong>Doubly Linked</strong></td>
                    <td>Each node has previous pointer and next pointer</td>
                </tr>
                <tr>
                    <td><strong>Sorted</strong></td>
                    <td>The linear order of the list corresponds to each items key in natural order</td>
                </tr>
                <tr>
                    <td><strong>Unsorted</strong></td>
                    <td>Items in the list can appear in any order</td>
                </tr>
                <tr>
                    <td><strong>Circular List</strong></td>
                    <td>The previous pointer of the head points to the tail, and the next pointer of the tail points to
                        the head. Like a ring of elements.
                    </td>
                </tr>
            </table>

            <h5>Searching a Linked List</h5>

            <p>To search a linked list you do a linear search through the objects starting at the head and checking if
                the key matches the item being searched for. If it does you break and return the item, else you move
                onto the next item pointed too by that item. This mean searching a linear list can be slow as you have
                to search potentially through all items so the search time is worst case is linear <Latex>$O(n)$</Latex>.
            </p>

            <h5>Inserting into a Linked List</h5>

            <p>Inserting into an unsorted linked list is easy if inserting item <Latex>x</Latex>, you take the current
                head of the list and then set <Latex>x.next=head</Latex> if it is a doubly linked list and not empty
                you set the head previous to <Latex>x</Latex> like so <Latex>if List.head</Latex><Latex>$!=$</Latex>
                <Latex>List.head.prev = x</Latex>. If inserting item into <strong>unsorted</strong> linked list the time
                complexity is <Latex>$O(1)$</Latex>, if inserting into linked list that is sorted and to keep the sort
                the time complexity is linear as you need to find the items position by checking each item in the list
                up to the correct position <Latex>$O(n)$</Latex>. A neat <a
                    href={"https://www.geeksforgeeks.org/given-a-linked-list-which-is-sorted-how-will-you-insert-in-sorted-way/"}>reference</a>.
            </p>

            <h5>Deleting from a Linked List</h5>

            <p>Simply deleting an element from a linked list is a case of updating pointers, you set the deleted
                nodes <Latex>$X$</Latex> next item to its own previous items next pointer, and you
                set <Latex>$X$</Latex> nexts item it pointers too previous value to <Latex>$X$</Latex> previous value. A
                simple delete time complexity is <Latex>$O(1)$</Latex> but a specific key delete you need to search
                first so its worst case time is <Latex>$O(n)$</Latex> as it maybe the tail of the list you are deleting.
            </p>

            <h5>Sentinel Node</h5>

            <p>A sentinel node in a linked list is a dummy node with all the attributes of the other objects in the
                list, and if a nil is referenced in the linked list then it points to the sentinel node. Adding a
                sentinel node between the head and tail of a list can simplify the code due to not requiring so many
                checks. Adding a sentinel to a doubly linked list makes it a circular linked list with a sentinel
                node.</p>

            <h5>Pointers and Objects</h5>

            <p>What happens if a language does not provide pointers how can we implement a Linked List? Well there are
                two main ways.</p>

            <h7>Multiple Array Representation</h7>

            <p>To represent a node of a linked list using arrays you can have three arrays one that stores the keys, one
                that stores the next address and one that stores the previous address. <i>key[i],next[i],prev[i]</i>. To
                represent the head or tail you usually use a negative index as it cannot exist such as <i>-1</i>.</p>

            <h7>A Single Array Representation</h7>

            <p>A single array representation of a linked list is done by having contiguous blocks in the array, so you
                use offsets to get to the key, next and prev for example. <i>list[i]</i> returns the
                key <i>list[i+1]</i> returns the next value array index key and <i>list[i+2]</i> returns the previous
                array index key it points too.</p>

            <h7>Allocating and Freeing Objects</h7>

            <p>To allocate and free objects when representing them with arrays you have a free list of the array that
                stores points to the next free index. This free list acts like a stack as you push and pop off it when
                allocating and freeing objects from it. If you have a total list of size <i>M</i> and it
                contains <i>N</i> items then the free space is <Latex>$M - N$</Latex></p>

            <h5>Representing Rooted Trees</h5>
            <p></p>

            <h4>Heap Data Structure</h4>

            <p>A Heap is tree based data structure where the nodes are in a particular order but it is ususally
                implemented as an
                array (and has nothing to do with storage with garbage collected storage
                like the Java heap). They are used for priority queue data structure. A heap puts all nodes in a
                specific order this is called the <strong>heap
                    property</strong>. Usually a Max Heap where the value of
                the parent node will always be greater than or equal to its children so the MAX value is stored at the
                root. Or a Min Heap where the parent
                node is always less than or equal to its children. Commonly max heaps are used for Heapsort and min
                heaps are used for priority queues. A priority queue is a queue but where each element has a priority
                associated with it and the item to be dequeued first has the highest priority.
                A <strong>binary</strong> heap is when there at most
                two children for each node. Other heaps exists and can differ on number of child nodes. The smallest
                possible size/height of a complete binary heap with <Latex>$N$</Latex> nodes is <InlineMath
                    math="\lg n"/>. The height is the number of edges on the longest simple downwards path from the root
                to a leaf. A heap will always be completely filled on all levels except the lowest. A heap has some
                simple operations to find the parent, left and right nodes when it is stored in a array. No pointers
                required.</p>

            <p>Root of the tree: is the first element in the stored array. These are when index of array start at 1.</p>
            <p><i>Parent(i) = i/2</i>: Finding the parent index of <i>i</i>.</p>
            <p><i>Left(i) = 2i</i>: Find index of node <i>i</i> left child. This can be optimised by doing a left bit
                shift.</p>
            <p><i>Right(i) = 2i + 1</i>: Find index of node <i>i</i> right child.</p>

            <p>Some common operations on Heaps are:</p>

            <p><i>Build Max(Min) Heap</i> produce a Max(Min) heap from unordered array runs in linear time. <InlineMath
                math="O(n)"/></p>
            <p><i>Max(Min) Heapify</i> correct a single violation of the Heap property. <InlineMath math="O(\lg n)"/>
            </p>

            <h5>Priority Queue with Max Heap</h5>

            <p>A priority queue keeps items in a queue and orders them by priority so they highest priority is removed
                from the queue and processed first. An efficient approach to this is to use heaps as they can insert and
                delete in O(log n) time. Our code example is a MAX priority queue where items with highest value are
                removed first as they are highest priority.</p>

            <h6>Maximum</h6>
            <p>The array backing the heap first element will be the max we can view this in O(1) but when we extract the
                maximum we take the first element remove it and swap it with the last, we then need to max heapify the
                array again which is O(log n).</p>

            <h6>Increase Priority of Value</h6>

            <h6>Insert Value</h6>

            <h3>Binary Search Tree</h3>

            <p>A search tree can be used as both a dictionary and a priority queue due to its ability to search, min,
                max, predecessor, successor, insert and delete. Such operations take &Theta;(lg n) worst case time
                proportionately to the height of the tree however if the tree is a linear set of nodes they
                take &Theta;(n).</p>

            <p>Binary search tree is represented by nodes linked where each node has a key and the satellite data along
                with a left, right and parent attribute. The <strong>binary search tree property</strong> that must be
                satisfied is let x be a node if y is a node in the left subtree its key is less than or equal to x.key,
                else if y is a node in the right subtree then y.key is greater than or equal to x.key.</p>

            <p>There are three methods for printing out the keys in a binary search tree, you can print the sorted keys
                with in order tree walk, preorder prints the root before the leaves and post order prints the leaves
                before the roots.</p>

            <h4>Hashing with Chaining</h4>
            <h4>Table Doubling</h4>
            <h4>Open Addressing</h4>

            <h3 id={"Sorting"}>Sorting</h3>

            <h4>Introduction</h4>

            <p>Sorting is sorting there is natural order of sorting the ascending and descending of values by number
                value or letter. Usually though data sorted in computing is rarely isolated like this and is usually on
                a data record with a key which would have related <strong>satellite data</strong>. For memory efficiency
                we usually would manipulate the pointers to the records rather that the records themselves to save
                moving around all of this satellite data.</p>

            <p><strong>In place</strong> sorting algorithms are algorithms which transforms input using a data structure
                with only a small constant amount of extra storage space outside of the array to be sorted.</p>

            <table>
                <tr>
                    <th>Algorithm</th>
                    <th>Worst Case<br/>Running Time</th>
                    <th>Average Case<br/>Running Time</th>
                </tr>
                <tr>
                    <td>Insertion Sort</td>
                    <td><InlineMath math="\Theta(n^2)"/></td>
                    <td><InlineMath math="\Theta(n^2)"/></td>
                </tr>
                <tr>
                    <td>Merge Sort</td>
                    <td><InlineMath math="\Theta(n \lg n)"/></td>
                    <td><InlineMath math="\Theta(n \lg n)"/></td>
                </tr>
                <tr>
                    <td>Heapsort</td>
                    <td><InlineMath math="O(n \lg n)"/></td>
                    <td><InlineMath math=""/></td>
                </tr>
                <tr>
                    <td>Quicksort</td>
                    <td><InlineMath math="\Theta(n^2)"/></td>
                    <td><InlineMath math="\Theta(n \lg n)"/></td>
                </tr>
                <tr>
                    <td>Counting Sort</td>
                    <td><InlineMath math="\Theta(k + n)"/></td>
                    <td><InlineMath math="\Theta(k + n)"/></td>
                </tr>
                <tr>
                    <td>Radix Sort</td>
                    <td><InlineMath math="\Theta(d(n + k))"/></td>
                    <td><InlineMath math="\Theta(d(n + k))"/></td>
                </tr>
                <tr>
                    <td>Bucket Sort</td>
                    <td><InlineMath math="\Theta(n^2)"/></td>
                    <td><InlineMath math="\Theta(n)"/></td>
                </tr>
            </table>

            <h4>Insertion Sort</h4>

            <p>Lets now see our first sort not the quickest but a good place to begin. Insertion sort.</p>


        </div>
    ]


};


const AlgorithmsPage = () => {
    return (
        <BlogPage
            title={algorithms.title}
            contents={algorithms.contents}
            text={algorithms.text}
        />
    );
}


export default AlgorithmsPage;
