import React from 'react';
import Card from '../Card/Card';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Kanban = ({ tickets, users, groupingOption, sortingOption }) => {
  if (groupingOption === null) {
    const savedGroupingOption = localStorage.getItem('groupingOption');
    if (savedGroupingOption) {
      groupingOption = savedGroupingOption;
    } else {
      groupingOption = 'status';
    }
  }

  if (sortingOption === null) {
    const savedSortingOption = localStorage.getItem('sortingOption');
    if (savedSortingOption) {
      sortingOption = savedSortingOption;
    } else {
      sortingOption = 'priority';
    }
  }

  const groupTickets = (option) => {
    const grouped = {};
    if (option === 'priority') {
      for (let i = 4; i >= 0; i--) {
        const priorityTickets = tickets.filter((ticket) => ticket.priority === i);
        if (priorityTickets.length > 0) {
          grouped[`Priority ${i}`] = priorityTickets;
        }
      }
    } else {
      tickets.forEach((ticket) => {
        const groupBy = ticket[option];
        if (!grouped[groupBy]) {
          grouped[groupBy] = [];
        }
        grouped[groupBy].push(ticket);
      });
    }

    return Object.keys(grouped).map((group) => ({
      groupName: group,
      tickets: grouped[group],
    }));
  };

  const sortGroupedData = (data, option) => {
    return data.map((group) => {
      let groupName;
      if (groupingOption === 'userId') {
        groupName = getUserById(group.groupName).name;
      } else if (groupingOption === 'priority') {
        groupName = getPriorityString(group.tickets[0].priority);
      } else {
        groupName = group.groupName;
      }

      return {
        groupName: groupName,
        tickets: group.tickets.slice().sort((a, b) => {
          if (option === 'title') {
            return a.title.localeCompare(b.title);
          } else {
            return b[option] - a[option];
          }
        })
      };
    });
  }

function getPriorityString(priority) {
  switch (priority) {
    case 4:
      return (<span style={{verticalAlign: 'middle' }}>
        <AssignmentLateIcon style={{ verticalAlign: 'middle'}} />&nbsp;
        Urgent
      </span>
      );
    case 3:
      return (<span style={{verticalAlign: 'middle' }}>
        <SignalCellularAltIcon style={{ verticalAlign: 'middle'}} />&nbsp;
        High
      </span>
      );
    case 2:
      return (<span style={{ verticalAlign: 'middle' }}>
        <SignalCellularAlt2BarIcon style={{ verticalAlign: 'middle'}} />&nbsp;
        Medium
      </span>
      );
    case 1:
      return (<span style={{verticalAlign: 'middle' }}>
        <SignalCellularAlt1BarIcon style={{ verticalAlign: 'middle'}} />&nbsp;
        Low
      </span>
      );
    case 0:
      return (<span style={{ verticalAlign: 'middle' }}>
        <MoreHorizIcon style={{ verticalAlign: 'middle'}} />&nbsp;
        No priority
      </span>
      );
    default:
      return "Unknown";
  }
}


  const getUserById = (userId) => {
    return users.find((u) => u.id === userId);
  };

  const groupedData = groupTickets(groupingOption);
  const sortedData = sortGroupedData(groupedData, sortingOption);

  return (
    <>
      <section>
        <div className="container">
          <div className="inner-div">
            <div className="kanban-grouping">
              {groupingOption === 'user' ? (
                // Render user cards based on user grouping
                users.map((user) => (
                  <div key={user.id}>
                    {/* Render user-specific cards here */}
                    {sortedData
                      .filter((group) => group.groupName === user.id)
                      .map((group) => (
                        <div key={group.groupName}>
                          <div className="group-heading">
                            <div>
                              <h4>
                                {group.groupName} &nbsp; &nbsp;{group.tickets.length}
                              </h4>
                            </div>
                            <div>
                              <span className="material-symbols-outlined">add</span>
                              <span className="material-symbols-outlined">more_horiz</span>
                            </div>
                          </div>
                          {group.tickets.map((ticket) => (
                            <div className="inner-div" key={ticket.id}>
                              <Card
                                id={ticket.id}
                                title={ticket.title}
                                status={ticket.status}
                                tag={ticket.tag[0]}
                                user={getUserById(ticket.userId).name}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                ))
              ) : (
                // Render other group cards (e.g., priority) here
                sortedData.map((group) => (
                  <div key={group.groupName}>
                    <div className="group-heading">
                      <div>
                        <h4>{group.groupName} &nbsp; &nbsp;{group.tickets.length}</h4>
                      </div>
                      <div>
                        <span className="material-symbols-outlined">add</span>
                        <span className="material-symbols-outlined">more_horiz</span>
                      </div>
                    </div>
                    {group.tickets.map((ticket) => (
                      <div className="inner-div" key={ticket.id}>
                        <Card
                          id={ticket.id}
                          title={ticket.title}
                          status={ticket.status}
                          tag={ticket.tag[0]}
                          user={getUserById(ticket.userId).name}
                        />
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kanban;
