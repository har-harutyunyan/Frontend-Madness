function Buttons({ fetchUsers }) {
    return (
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => fetchUsers("")}>All</button>
        <button onClick={() => fetchUsers("male")}>Male</button>
        <button onClick={() => fetchUsers("female")}>Female</button>
      </div>
    );
  }
  
  export default Buttons;
  