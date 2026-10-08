import { posts } from "../data/sampleData";

const Posts = () => {
    return (
        <div>
            <h2>Posts</h2>
            <ul className="flex flex-col gap-4">
                {posts.map((post) => (
                    <li key={post.id}>
                        <div>{post.title}</div>
                        <div>{post.body}</div>
                        <div>{post.userId}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;