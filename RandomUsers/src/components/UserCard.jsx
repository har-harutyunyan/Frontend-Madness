function UserCard({ user }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <img src={user.picture.medium} alt="user" />
        <h3>
          {user.name.first} {user.name.last}
        </h3>
        <p>Gender: {user.gender}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  }
  
  export default UserCard;
  