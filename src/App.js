import "./App.css";
import TicketForm from "./components/TicketForm";
import "./styles.css";
import ticketReducer from "./reducers/ticketReducer";
import { useReducer } from "react";
import TicketList from "./components/TicketList";
import { sortTickets } from "./utility/sortUtilty";

function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPref: "High to Low",
  };
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const sortedTickets = sortTickets(state.tickets, state.sortPref);

  return (
    <div className="App">
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm
          dispatch={dispatch}
          editingTicket={state.editingTicket}
        ></TicketForm>
        {state.tickets.length > 0 && (
          <div className="results">
            <h2>All Tickets</h2>
            <select
              value={state.sortPref}
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
