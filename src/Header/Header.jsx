import React, { useEffect, useState } from 'react';
import Kanban from '../Kanban/Kanban_board';

const Header = () => {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState([]);
  const [groupingOption, setGroupingOption] = useState(null);
  const [sortingOption, setSortingOption] = useState(null);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUser(data.users);
      });
  }, []);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
    localStorage.setItem('groupingOption', option);
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
    localStorage.setItem('sortingOption', option);
  };

  return (
    <>
      <section className="header-container">
        <div className="dropdown">
          <button className="dropbtn">
            <span className="material-symbols-outlined">tune</span>
            Display
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <div className="dropdown-content">
            <div className="grouping">
              <p>Grouping</p>
              <select
                className="select-button"
                onChange={(e) => handleGroupingChange(e.target.value)}
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="ordering">
              <p> Ordering</p>
              <select
                className="select-button"
                onChange={(e) => handleSortingChange(e.target.value)}
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      {groupingOption === 'status' && (
        <Kanban 
          tickets={tickets}
          users={user}
          groupingOption={groupingOption}
          sortingOption={sortingOption}
        />
      )}
      {groupingOption !== 'status' && (
        <Kanban
          tickets={tickets}
          users={user}
          groupingOption={groupingOption}
          sortingOption={sortingOption}
        />
      )}
    </>
  );
};

export default Header;
