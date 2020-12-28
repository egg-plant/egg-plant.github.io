import React from 'react';

const DistributedData = () => (

    <div>
        <h2>Distributed Data</h2>

        <p><a href={"http://nathanmarz.com/blog/how-to-beat-the-cap-theorem.html"}>how to beat the cap theorem</a></p>

        <h3>Idempotent</h3>

        <p>Idempotent requests are ones which can be retried without causing duplicates and requiring deduplication.
            Take a counter for example if we increment a counter say on page visits from unique users and only increment
            when they visit for the first ever time and we increment
            it each time a <strong>unique</strong> user visits for example user A
            visits but a network failure fails the ack so user A tries again to increment the counter but it already has
            incremented then we will increment the visits counter twice instead of once for this user A. Instead a
            idempotent version could be to keep a set of users who visit our website. Therefore when user A visits they
            will be entered into the set and if they retry on the first visit then it will not matter they only enter
            the set again. A little contrived example I know but hopefully you get the point.</p>

        <p>This approach allows us to see the different semantics of <strong>retries</strong>. We can
            provide <strong>As-most-once</strong> semantics where we would send a request but do no retry so a request
            may not happen if it fails en route. <strong>At least once</strong> semantics where we retry the each
            request until it is acknowledged and may repeat the update if it retries
            incorrectly. <strong>Exactly once semantics</strong> where with retry and deduplication or idempotence we
            guarantee that requests are always completed once and only once.</p>

        <h3>Replication</h3>

        <p>For distributed systems replication simply put is keeping a copy of the same data on multiple nodes. A node
            that has a copy is called a replica.</p>

        <p>A sample problem we want to add user A profile to database 1 and database 2. The client sends to both 1 and 2
            and succeeds. It then wants to remove user A from both 1 and 2 but it fails to remove on B. Another scenario
            that can happen looks identical to the system state but is not. For example client adds user A but it fails
            to add to database 2. To overcome this we can add timestamps to the requests to add user A. Therefore we
            know the ordering of the requests by the timestamp on the message.</p>

        <p>Replicas will communicate between themselves to check for inconsistencies and they can compare timestamps
            to correct the data and correct it (anti entropy) providing ordering using the timestamps. For these
            timestamps we can use lamport or vector timestamps.</p>

        <p>Concurrent writes by different clients to different nodes and then replicated how do we correct these we can
            use <strong>last writer wins</strong> so we order by timestamps and keep the latest version but this can
            result in <strong>data loss</strong> if the data is dependent. If we use a vector clock we can
            use <strong>multi value register</strong> where we use timestamps with partial order a vector clock. If the
            updates are concurrent we keep both, but if they are strictly before the next then it keeps the latest.</p>

        <p>We have a high chance that a replica node maybe unavailable. How do we deal with this? </p>

        <p><strong>Read after write consistency</strong> think of a scenario with replace A and replica B. Client writes
            into replica A and B but it fails on the write to A. It then reads back the data and fails on the read from
            B which has the correct data now we have read back the stale data in A. This violates read after write
            consistency. How do we overcome this? We need to ensure that we have both replicas requirement that they
            read and write to both. To solve this problem we use a Quorum where we now have three nodes A, B and C. We
            now guarantee we only successfully write to at least two of the three nodes. If the client does not get two
            successful responses then it fails to write. Also on a read we only succeed on a read when two nodes return
            the result. We could still get back a stale result if the read returns a failed write nodes result, but
            timestamps can be used to choose the correct one on the client side.</p>

        <p>We say we have <i>w</i> replicas (write quorum) and then we
            have the <i>r</i> replicas (read quorum) and then if we have <i>r + w > n</i> we know we can trust the
            system. If this is the case we can guarantee read after write consistency. For example Zookeeper meets this
            requirement when having a quorum of nodes.</p>

        <p><strong>Read repair</strong> a client can be friendly and if it detects stale or a failed response it can set
            the bad nodes data with the correct data it got from the other nodes.
        </p>

        <h4>State Machine Replication</h4>

        <p>We can use the total broadcast protocols to enable replications. We can use FIFO total order broadcast to
            update all replicas and each replica applies it to its own state. Therefore applying an update is
            deterministic. Each replica starts off in a fixed empty state. Then when each replica is in the same state
            and we get the same updates and the same order we will maintain the cross state identically for all
            replicas. The limitations of this approach are that we have to wait for the broadcast to complete so adds
            latency.</p>

        <h4>Database Leader Replication</h4>
        <p>As mentioned total order broadcast can use a leader to broadcast. In database replication with a leader we
            can have one client talk to the leader and the leader then commits to the followers in a commit total
            order. To keep followers (replicas) in synch. Then the followers will apply the commits in the same order as
            the leader.</p>

        <h4>Replication with Weaker Broadcasts (Causal and others)</h4>

        <p>We can use these if our replica state updates are commutative, they can process updates in different orders
            and still result in the same state. To allow concurrent updates to be commutative.</p>

        <h4>Viewstamped Replication (VR)</h4>


        <h3>Consistency</h3>

        <p>Replicas should be in a consistent state with all other replicas but soon do they have to be consistent?
            Should reads be immediate, there are various consistency models in regards to replication.</p>

        <p>If we commit a transaction to multiple nodes all the nodes should commit or abort. And if any node crashes
            then they all should abort.</p>

        <h4>Two Phase Commit</h4>
        <p>Client wants to open a transaction on multiple database nodes so sends open identifier to all nodes. Apply
            the execution. The client will then send to a coordinator commit request.
            This coordinator will then send prepare to all nodes in the database and check they are in consistent state
            and each node is required to reply yes I am ready to commit. Then the coordinator decides if we can commit
            or not.</p>

        <p>If the coordinator crashes it has written decisions to disk that are durable it will then continue processing
            from this point. If it has no decision before crash it will abort.</p>

        <p>If a replica fails to respond we can timeout and abort or we can have nodes predict failures on nodes and
            use total order broadcast to message other nodes that this node suspects a failure to ensure liveness so we
            do not wait indefinitely for replicas to respond.</p>

        <h4>Linearizability</h4>

        <p>How do we get consistent data if we if we access replicated data from multiple nodes from multiple clients
            concurrently. Linearizability provides us with a distributed view but all operations behave like we have a
            single copy of the data. It provides strong consistency where if we read a value we will get up to date
            value. If one client updates a value and then another client reads the value afterwards we expect them to
            see the updated value. This is not the happens before relationship as that is to do with broadcast only as
            we want these semantics even if the clients have not directly interacted with each other. If the write from
            client and the read from another client happens at a overlapping time then the order can be any order and
            that is fine with linearizability. Quorum read and writes do not solve this problem as we may write to only
            Node A, but replication happens after the a client read to Node B which has the older data. We can solve
            this by the client telling the replicas enough to make a quorum that are not updated with the updated value
            read repair approach. </p>

        <p>Problems with linearizability is the performance cost as it takes a lot of messages and waiting for responses
            to these messages to get it to work. It also can be trick to scale if you are using a leader node. Also if
            you cannot contact a quorum then you cannot do the operation so availability is an issue.</p>

        <p><strong>Compare and swap</strong> in distributed system is achievable using total order broadcast we do this
            by total order broadcast get to get the current value. We then total order broadcast compare and swap with
            the old value and then new value to set. We then check and do the compare and swap to check if existing
            state is the old value and return true or we see the old value does not match we return false and fail the
            operation.</p>

        <h4>Eventual Consistency</h4>
        <p>This model is weaker than linerizability but has performance and availability benefits. The CAP theorem
            provides us with a theorem that we can only have two of three Consistency, Availability or Partition
            Tolerance. Therefore if the state of our system has the presence of a network partition then we can be
            either <strong>consistent</strong> or <strong>available</strong>.</p>

        <p>Eventual consistency replication process operations based on local state only. If we have no more updates
            then all of our nodes will eventually converge to the same state. Therefore any read requests use local
            state if an update is applied to one replica it will then eventually update other replicas. If updates never
            stop it could be impossible to get eventual consistency. A strong eventual consistency was created to help
            with this. The convergence point is that any two replicas processed same updates they will be in the same
            state. The benefits of this approach is high availability operations do not wait for the replication across
            the network and always reliable against partitions of the network.</p>

        <p>If we only become eventually consistent how do we deal with conflicts? Algorithms exist to help with these
            merge problems.</p>

        <h4>Kafka Distributed Replication</h4>

        <p><a href={"https://kafka.apache.org/documentation/#design_replicatedlog"}>Replicated Logs</a> when a write
            happens in Kafka it is served by the partition leader and replicated to the followers. Consume requests are
            also served by the partition leader to ensure consistency. If the leader fails a
            replica can step up and become the leader. But only if it is in synch with the leader this is <i>ISR</i>.
            You maybe blocked by slow ISR servers with this approach compared to other majority consensus algorithms
            such as Raft. Once the failed node returns it is unable to be part of the ISR set until it has caught up so
            will catch up missed data or start a fresh. If an unclean leader election scenario
            occurs where if all replicas become unavailable do we choose the first replica to come back to life even if
            its not in sync. Could result in data loss so if the <i>unclean.leader.election.enable</i> is true. Or we
            have this option set to false and wait for replica that is in ISR and elect it as the leader to come back.
            This is consistency vs availability problem and is up to the user of Kafka to decide.
        </p>

        <p>Ensuring consistency you can have a producer ack=all which will wait for all those in minimum ISR to respond
            before completing the produced message to Kafka so no messages are dropped.</p>

        <h3>Partitioning</h3>

        <h3>Transactions</h3>
        <p>When working with a single source a transaction can easily <strong>Two Phase Commit</strong> with
            <strong>BEGIN</strong> then do the operation then
            either <strong>COMMIT</strong> or <strong>ROLLBACK</strong>. For distributed systems we need to coordinate
            this process. In the distributed version the node starting the commit is the coordinator. In the PREPARE
            phase asks other nodes to promise to commit or rollback. If the node cannot PREPARE then it is rolled back
            the transaction. In the COMMIT phase the coordinator waits for all responses from the nodes that they are
            prepared. Once they are confirm the commit point site commits and all other nodes are asked to commit Once
            all nodes have committed successfully the FORGET phase happens where status information is erased and
            transaction is forgotten.</p>


    </div>


);

export default DistributedData;