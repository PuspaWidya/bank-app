import logo from "./logo.svg";
import "./App.css";
import Routes from "./Routes";
import Form from "./components/pages/form/register/form";
import Login from "./components/pages/form/login/login";
import CreateInvoice from "./components/pages/form/createInvoice/createInvoice";
import ExpenseIncome from "./components/pages/form/expenseIncome/expenseIncome";

function App() {
  return (
    <div className="App">
      <Form></Form>
      <Login></Login>
      <CreateInvoice></CreateInvoice>
      <ExpenseIncome />
    </div>
  );
}

export default App;
