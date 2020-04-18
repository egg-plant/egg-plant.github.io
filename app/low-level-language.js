import React from "react";
import BlogPage from './blog-page.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {darcula} from 'react-syntax-highlighter/styles/hljs';
import {HashLink as Link} from 'react-router-hash-link';


const lowlevellanguage = {

    title: 'Low Level Programming',
    text: <div>

        <h3>Topics</h3>
        <ul className="text-list">
            <li><Link to={"#CProgramming"}>C Programming</Link></li>
            <li><Link to={"#Compilation"}>Java Compilation</Link></li>
            <li><Link to={"#Systems"}>Systems Programming</Link></li>
            <li><Link to={"#GC"}>Garbage Collection</Link></li>
            <li><Link to={"#Concurrency"}>Concurrency</Link></li>
            <li><Link to={"#Security"}>Security</Link></li>
        </ul>

        <h3 id={"CProgramming"}>OS X Mac (High Sierra) glib Tutorial</h3>
        <p>To being with you need to install homebrew for following this tutorial. Once setup you we need to install
            glib and pkg-config.</p>

        <p><SyntaxHighlighter language='shell' style={darcula}>brew install pkg-config</SyntaxHighlighter></p>
        <p><SyntaxHighlighter language='shell' style={darcula}>brew install glib</SyntaxHighlighter></p>

        <p>A found a great <a href="https://www.ibm.com/developerworks/linux/tutorials/l-glib/">IBM Tutorial based on
            UNIX</a> for this so we will follow this and get it working on Mac terminal.</p>

        <p>PKG is a tool make it easier to specify configuration locations and we will use this on Mac to make our lives
            much easier. To get the code to run I had to replace the quotations from &#39; to &#768;. The command to
            runcompile the first example is as follows: </p>
        <p><SyntaxHighlighter language='shell' style={darcula}>gcc &#768;pkg-config --cflags --libs glib-2.0 &#768; -o
            ex-compile ex-compile.c</SyntaxHighlighter></p>

        <p>For some reason when compiling you will see a warning so please include &lt;stdio.h&gt; for printf.</p>
        <p>Lets begin with playing around with a single linked list. To define a single linked list and to add an item
            you can do the following: </p>


        <p><SyntaxHighlighter language='c' style={darcula}>GSList* list = NULL;</SyntaxHighlighter></p>
        <p><SyntaxHighlighter language='c' style={darcula}>list = g_slist_append(list, "first");</SyntaxHighlighter></p>

        <p>This is C so lets not forget to clean the memory up once done.</p>

        <p><SyntaxHighlighter language='c' style={darcula}>g_slist_free(list);</SyntaxHighlighter></p>

        <p>If we want to remove from the list you can do the following:</p>

        <p><SyntaxHighlighter language='c' style={darcula}>list = g_slist_remove(list, "first");</SyntaxHighlighter></p>

        <p>Now we have seen a few examples we can see that the format for most code using glib is:</p>

        <p><SyntaxHighlighter language='c' style={darcula}>g_(container name)_(function name)</SyntaxHighlighter></p>

        <h2 id={"Compilation"}>Java Compilation and Execution</h2>

        <p>Java is build once run anywhere and hence has a build (compilation) process and then a execution process on
            the JVM. Here are the basic steps for this process:</p>

        <ol className="text-list">
            <li>Compile the source code <i>.java</i> files into machine independent bytecode encoding using <i>javac</i>.
                It parses the source file builds an AST, puts entries into the symbol table which maps where identifiers
                to where code is stored, processes annotations generating code if needed, attributes syntax tree and
                then generates the <i>.class</i> files.
            </li>
            <li>Now execution occurs with three further stages. The <i>main.class</i> file is loaded by the class loader
                by passing it to the JVM and loading it into memory.
            </li>
            <li>Once the class is loaded bytecode verification happens such checks include initialised variables, rules
                for accessing private fields and methods.
            </li>
            <li>Final stage of execution is JVM dependent just in time compiler where loaded and verified bytecode is
                converted into
                machine code and executed can be used. Alternatively the JVM interprets the bytecode each run. Then
                selects hot methods to be JIT compiled.
            </li>
        </ol>

        <p>The Jar file is a container file that is like a zip that contains the <i>.class</i> files and any metadata
            such as which is the <i>main.class</i>.</p>

        <h2 id={"Systems"}>Systems Programming</h2>

        <p>This section looks at the systems that build and run our applications primarily focusing on C Programming.
            Reference to Computer Systems: A Programmers Perspective (Bryant et al.).</p>

        <h3>Linking</h3>

        <p></p>

        <h2 id={"GC"}>Garbage Collection</h2>

        <h3>Reference Types</h3>

        <p><strong>Strong References</strong></p>
        <p><strong>Weak References</strong> <strong>Soft References</strong> or <strong>Phantom
            References</strong></p>

        <p><a href={"https://docs.oracle.com/javase/8/docs/api/java/util/WeakHashMap.html"}>Weak hashmap</a> will
            garbage collect a key and value even if its mapped with a value if its no longer in ordinary use. </p>


        <p></p>


        <h2 id={"Concurrency"}>Concurrency</h2>

        <p>Fundamentals of concurrency with reference to Concurrency in Practice (Goetz). Firstly concurrency is when
            two tasks can start, run and complete in overlapping time periods. Parallelism is when two processes run at
            the exact same time. <a
                href={"https://docs.oracle.com/cd/E19455-01/806-5257/6je9h032b/index.html"}>[Oracle]</a>
            A thread is a sequence of instructions executed within a process.
        </p>

        <h3>Thread Risks</h3>

        <h4>Safety Hazards</h4>
        <p>Race conditions where correct outcome depends on timing of events: example increment function two threads
            call it but see the same value they both read the initial value say 3 and then both increment 3 and it is
            incorrect as the incremented value remains at 4 even though it has been incremented twice. This type of
            action is called read-modify-write action, lazy initialization also has the same problem. We call these
            compound actions. Compound actions are a sequence of operations that must be processed atomically. </p>

        <h4>Liveness Hazards</h4>
        <p>Liveness hazard is when the system gets into a state where it is permanently unable to make forward
            progress.</p>
        <ul className="text-list">
            <li>Deadlock</li>
            <li>Starvation</li>
            <li>Livelock</li>
        </ul>

        <h4>Performance Hazards</h4>
        <p>The impacts of overheads of context switching between threads, the use of synchronization and locks that
            limit performance.</p>

        <h3>Thread Safety</h3>

        <p>If there is a shared variable across threads is is unsafe, therefore three key mechanisms need to be
            considered, you can not share the variable across threads, make it immutable or use synchronization when
            accessing it. Thread safety is ensuring that code behaves correctly when accessed by multiple threads.</p>
        <p>Stateless objects are always thread safe as there is no shared state. Once state is added
            mechanisms must be added to resolve this.</p>

        <h4>Atomicity</h4>
        <p>Update related state variables in atomic actions.</p>

        <h4>Locking</h4>
        <p>In Java synchronized methods are shorthand for synchronized block for that method. These are referred to
            as intrinsic locks or monitor locks these act as mutexes (mutual exclusion locks) meaning at most one thread
            may own the lock. <strong>Reentrancy</strong> locks are ones that if they already hold the lock and try and
            acquire it again then they can. Intrinsic locks are reentrant. When a tread takes ownership of a lock a
            count is taken a unheld lock has a count of 0, when a thread takes ownership it increments to 1 along with
            storing the owner which is the specific thread ID. If that same threads renters the lock it increments again
            the counter. When it leaves the lock it decrements and when the counter is 0 it will release the lock.</p>

        <p>Every shared mutable state should be guarded by one lock only. For liveness and performance locks should only
            lock small sections of code where they are required, which is why a synchronized method is not ideal.
            Consider the performance implications when using locks and synchronized code and avoid holding locks for
            lengthy computations or long I/O.</p>

        <h3>Sharing Objects</h3>

        <p>We have focused on ensuring the thread correctness and safety of state held within object classes, but we
            need to consider how to ensure thread safety of shared objects. Locking can be used to ensure that different
            threads see the correct most up to date shared data.</p>

        <p><strong>Volatile</strong> variables are a lighter weight alternate to read whats always stored directly in
            memory no caching is done, the compiler does not reorder with other memory operations so a read of a
            volatile variable is always the most recent write. Volatile variables are used for status flags but usually
            Atomic or locks are preferred. They can only be used by multi threads for writes if the write does not
            depend on the current value or a single thread only writes to it and locking is not required for any other
            reason when reading it.</p>

        <p>Confinement is a safe way to not share objects across threads where data is only accessed by a single thread.
            You can achieve this in code by design. Or <strong>ThreadLocal</strong> enables you to place a per thread
            value.</p>

        <p>Immutable objects can be shared safely as they will not be able to be changed. The final field can be
            used which means items cannot be modified and have special semantics under the Java memory model.</p>

        <h3>Composing Objects</h3>

        <p>Some simple ways to compose thread safe objects are firstly consider the data held within the objects. Then
            you can simply confine this data. Or you can use the Java Monitor pattern where you synchronize code on a
            lock.</p>

        <h3>Platform Concurrent Libraries and Synchronizers</h3>

        <h4>Old School Synchronized Collections</h4>

        <p>Synchronized collections in Java include <strong>vector</strong> which is a synchronized version of ArrayList
            and <strong>hashtable</strong> which is a synchronized version of HashMap. These are poor in performance as
            synchronize all methods on a common lock and considered legacy code.</p>

        <h3>Concurrent Collections</h3>

        <p><strong>ConcurrentHashMap</strong> for replacing synchronized hash based map structures
            and <strong>CopyOnWriteArrayList</strong> a thread safe list with good performance for
            iteration. <strong>Queue</strong> and <strong>BlockingQueue</strong> have also been added where blocking
            queue will block if you have nothing to read from it and also block if you cannot insert any more data into
            it perfect for the producer consumer patter. The queue provides a non
            concurrent <strong>PriorityQueue</strong> and also a concurrent FIFO
            queue <strong>ConcurrentLinkedQueue</strong>. <strong>ConcurrentSkipListMap</strong> and
            <strong>ConcurrentSkipListSet</strong> are sorted by natural ordering or comparator concurrent versions of a
            sorted map or sorted set such as <i>TreeMap</i> or <i>TreeSet</i>. <a
                href={"https://en.wikipedia.org/wiki/Skip_list"}>Skip lists</a> are made up of LinkedLists as
            a head and then has express lines to values.
        </p>

        <p><strong>ConcurrentHashMap</strong> uses lock striping where the array buckets are have individual locks. Many
            readers are allowed, a set number of writers are allowed and readers can access the map concurrently with
            writers. The iterator in the concurrent hash map can survive concurrentModificationException. But is not
            guaranteed to reflect modifications after iterator has been
            constructed. <i>Size</i> and <i>isEmpty</i> functions are
            actually estimates as they can modify when calculating. Compound actions are dealt with by the API as it has
            the methods for <i>put-if-absent</i> <i>remove-if-equal</i> <i>compute-if-present</i>.
        </p>

        <p><strong>CopyOnWriteArrayList</strong> and <strong>CopyOnWriteArraySet</strong> these work by being immutable
            and if modification is made a entire copy and new reference is made to the backing array. As the data is
            immutable you can have multiple iterators at the same time. They are designed to be used when iteration is
            far more used than modification.</p>

        <p><strong>Deques</strong> also has a blocking version. The enable a related pattern to producer consumer named
            work stealing. If a consumer finishes the work on its deque then it can steal from the tail work from
            another consumer. It does this from the tail rather than the head so that contention is reduced.</p>

        <p><strong>Interrupts</strong> can be used to stop a blocked thread these can be handled into two ways you pass
            the interrupt exception to the caller to handle or you catch it and call interrupt on the current thread who
            caught it to propagate the exception. Reminder when a exception is thrown it is referenced by the JVM with
            the exception type and current state at that time, the JVM then looks through the call stack starting at the
            top for an exception handler if it finds one great it is handled else it will terminate the program.</p>


        <h4>Synchronizers</h4>

        <p>A synchronizer is any object that controls the flow of threads based on
            state. <strong>CountdownLatch</strong> allows one or more threads to wait for a set of events to occur.
            FutureTask is a Future implementation and can act like a latch as you call <i>get()</i> it will block until
            the result state. <strong>Semaphore</strong> are used to control the number of activities that can access
            data or do an operation at the same time. Usually a counting semaphore you acquire a permit which is defined
            as a max number available for example 10. If the 10 permits are already in use then you are blocked until
            one becomes available. Commonly used for database connection pools to control
            connections. <strong>Barriers</strong> are similar to latches but are dependent on threads rather than
            events, a barrier will wait until all threads required are ready to do the next item before proceeding, like
            setting a meeting time at a train station awaiting for all to arrive (the threads) and then proceeding with
            the next task. </p>

        <h4>Summary</h4>

        <p>Mutable state shared across multiple threads cause problems, try hide state, make it immutable. If data is
            shared and mutable then guard this data with locks, if data is associated share the same lock, hold locks
            for entire duration of a compound action.</p>


        <h3>Executing Threads: Task Executor</h3>
        <p>When working with real systems you have overheads of thread creation and start up, also you need to bound the
            number of threads created as otherwise you are going to run out of memory and use up all your CPU. To
            resolve this we have the ExecutorService. Thread pools are running how do we shut them down safely? We
            maintain three states of the thread pool executor running, shutting down or terminated. When shutting down
            new tasks are not accepted and awaits for tasks to finish. If it needs to shutdown abruptly it signals
            cancel to threads running and awaits. Java has no set way of cancelling tasks submitted to run, but good
            programming will provide a mechanism to clean up threads in this case of early stopping. One method is each
            task to have a cancel flag that can be safely set which will be checked periodically by the task and then if
            set it shuts down as programmed too. This flag must be volatile. What happens if the task is waiting on a
            blocking queue and nothing ever arrives it will not check the flag. Then you need to request interrupt to
            the thread. When interrupted the thread will know and at the next cancellation point by the interruption
            policy in its code it throws up the exception. Java Futures allow you to call cancel on them to request an
            interrupt. Another method of shutting down is to use a Poison Pill in producer consumer style you can do
            this with dropping a distinct message that knows is a stop message. When consumed it then states to the
            consumers finish work and shutdown. You can return a list of cancelled tasks if you need to abruptly stop
            them or they were pending before shutdown. If exceptions are thrown and unhandled they can be returned to
            the executor and the runnable task shutdowns. </p>

        <h3>Liveness Hazards</h3>

        <h4>Deadlock</h4>
        <h4>Starvation</h4>
        <h4>Livelock</h4>

        <h2 id={"Security"}>Security</h2>

        <h3>Key Management</h3>

        <p>Some common terms for key management are <strong>keystore</strong> that stores sets of keys and
            certificates. <strong>Alias</strong> is a shortened keystore specific name for a entity. <strong>Distinguished
                Name (DN)</strong> is the subset of the full X.500 name. </p>

        <h3>Certificates</h3>

        <p>Certificates are used to verify a public key being sent to you be verified by a trusted entity known as a
            certificate authority. A certificate can provide extra confidence that the public key contained in the
            certificate does belong to the entity the CA says it does. A certificate contains three pieces of
            information.</p>

        <ol className={"text-list"}>
            <li>Name of the entity the certificate has been issued too. Referred to as the subject.</li>
            <li>Public key associated with the subject.</li>
            <li>Digital signature signed by the issuer of the certificate usually the CA but could be self signed.
                Naughty.
            </li>
        </ol>

        <p>We still need to verify the certificates digital signature which is signed by the CA. But how do we get the
            public key of the issuer CA? This is known as the bootstrapping problem and Java solves this problem by
            providing the public keys for well known CAs.</p>

        <p>Certificates are usually supplied as a chain. You have one CA sign it and then another CA sign it this allows
            users who do not know of all the certificate authorities to accept it as they will know one in the
            chain.</p>

        <p>It is possible to revoke a certificate once issued and signed if the tenant has used it illegally for
            example. To do this a <i>certificate revocation list</i> is issued by the CA validators then check this list
            before accepting it as genuine.</p>

        <h3>SSL and HTTPS</h3>

        <p>SSL provides a means to data encryption over TCP and is the basis for HTTPS. The Internet Engineering Task
            Force took over SSL and rebranded it to Transport layer security (TLS). The advantages of using SSL are it
            provides simple means for private key encryption by providing secret key exchange and data encryption with
            the exchanged key. It is also designed for environments where there are few servers but many clients where
            SSL servers have to authenticate themselves to clients but clients like web browsers do not need to
            authenticate themselves to the server. For example a internet shopper on a web browser does not authenticate
            to the server as they already can authenticate with credit card details and address when making the
            purchase.</p>

        <p><strong>The SSL Handshake</strong></p>

        <ol className={"text-list"}>
            <li>Client for example web browser initiates connection to server and states the ciphers it can accept.</li>
            <li>The server responds with the cipher suite it supports.</li>
            <li>The server then sends a certificate to verify its identity.</li>
            <li>The server then initiates a key exchange algorithm and sends the necessary information to the client and
                verifies the server certificate.
            </li>
            <li>The client completes the key exchange algorithm and sends the necessary key information to the server.
            </li>
            <li>The client then selects from the given cipher suite supported a cipher and tells the server.</li>
            <li>The server then makes a final decision on the cipher suite to use completing the handshake.</li>
        </ol>

        <p>Once the SSL handshake is complete the server and client can communicate over the connection as per usual. In
            Java programming SSL API abstracts all this away and a SSL connection is requested and once created the
            handshake is complete.</p>

        <h4>Keystores and Truststores</h4>

        <p>Keystores and truststores technically are a database that hold certificates they are functionally used for
            different things. Keystores are used for providing credentials and trustores are used to verify them. In SSL
            a server must have a private key for input into the key exchange algorithm and a
            certificate to identify who the server is this is contained within the keystore. If a server requires a
            client to authenticate themselves then they must have its own keystore with private key and certificate.</p>

        <p>The <strong>Truststore</strong> is used by a client to verify the certificate received from the server. The
            certificate from the server is signed by a trusted CA, when a client receives this certificate it checks in
            its trust store to verify the digital signature on the certificate. All clients must have a truststore and
            if a server requires client authentication it must also have a truststore.</p>

        <p>It is possible for keystore and truststore to be the same file. Ideally though they are not as truststore can
            be shared as it contains only public certificates but keystore has the private key so cannot be shared.</p>


    </div>,
    contents: ''

};


const lowlevellanguagePage = () => {

    return (

        <BlogPage
            title={lowlevellanguage.title}
            contents={lowlevellanguage.contents}
            text={lowlevellanguage.text}
        />
    );

}

export default lowlevellanguagePage;
