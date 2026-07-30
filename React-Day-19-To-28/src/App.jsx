// import Home from "./Day-19/Home"
// import Home from "./Day-20/Home"
// import Home from "./Day-22/Home"
// import Home from "./Day-23/Home"
// import { BrowserRouter } from "react-router-dom";
// import Home from "./Day-24/Home"
import { Provider } from "react-redux"
import Home from "./Day-25/Home"
import { store } from "./Day-25/store"


const App = () => {
  // return (
  //   <div>
  //     <Home />
  //   </div>
  // )
  // return (
  //   <BrowserRouter>
  //   <Home />
  // </BrowserRouter>
  // )

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )

}

export default App
