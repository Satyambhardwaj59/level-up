// import Home from "./Day-19/Home"
// import Home from "./Day-20/Home"
// import Home from "./Day-22/Home"
// import Home from "./Day-23/Home"
import { BrowserRouter } from "react-router-dom";
// import Home from "./Day-24/Home"
import { Provider } from "react-redux"
// import Home from "./Day-25/Home"
// import { store } from "./Day-25/store"
// import Home from "./Day-26/Home"
import React from "react";
// import { store } from "./Day-26/store";
import Home from "./Day-28/Home"
import { store } from "./Day-28/store";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';


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

  // return (
  //   <Provider store={store}>
  //     <Home />
  //   </Provider>
  // )

  // day 26

  // return (
  //    <React.StrictMode>
  //   <Provider store={store}>
  //     <BrowserRouter>
  //       <Home />
  //     </BrowserRouter>
  //   </Provider>
  // </React.StrictMode>
  // )

  return (
    <React.StrictMode>
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Home />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </React.StrictMode>
  )

}

export default App
