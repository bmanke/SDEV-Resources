import { users } from "../data/sampleData";

const Users = () => {
    return (
        <div>
            <h2>Users</h2>
            <ul className="flex flex-col gap-4">
                {users.map((user) => (
                    <li key={user.id}>
                        <div>{user.name}</div>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                        <div>{user.company.name}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;