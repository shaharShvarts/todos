import { TodoState } from "./context/TodoContext";

const SearchBar = () => {
  const { setSearch } = TodoState();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 15,
      }}
    >
      <input
        placeholder="Search…"
        style={{ width: "293px", padding: "10px" }}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
