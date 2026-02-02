import { useState } from "react";
import Buttons from "./components/Buttons";
import UserCard from "./components/UserCard";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (gender = "") => {
    let url = `https://randomuser.me/api/?results=10`;

    if (gender) {
      url += `&gender=${gender}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setUsers(data.results);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Random Users</h1>

      <Buttons fetchUsers={fetchUsers} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
