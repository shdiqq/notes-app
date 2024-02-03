import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { getUserLogged, putAccessToken } from "./utils/api";
import { Provider } from "./contexts";
import Navigation from "./components/Navbar";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFound";
import Notes from "./pages/Notes";
import AddNotes from "./pages/Notes/Add";
import DetailNotes from "./pages/Notes/Detail";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authedUser: null,
      initializing: true,
      context: {
        locale: localStorage.getItem('locale') || 'id',
        theme: localStorage.getItem('theme') || 'light',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.context.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              context: {
                ...prevState.context,
                locale: newLocale
              }
            }
          });
        },
        toggleTheme: () => {
          this.setState((prevState) => {
            const newTheme = prevState.context.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return {
              context: {
                ...prevState.context,
                theme: newTheme
              }
            }
          });
        }
      }
    };
  }

  componentDidMount = async() => {
    const response = await getUserLogged();

    this.setState(() => {
      if (response.error) {
        return {
          authedUser: null,
          initializing: false
        };
      }
      return {
        authedUser: response.data,
        initializing: false
      };
    });
  }

  onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const response = await getUserLogged();

    this.setState(() => {
      if (response.error) {
        return {
          authedUser: null,
          initializing: false
        };
      }
      return {
        authedUser: response.data,
        initializing: false
      };
    });
  }

  onLogout = () => {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return null;
    } else {
      if (this.state.authedUser === null) {
        return (
          <Provider value={this.state.context}>
            <div className={ (this.state.context.theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white') + ' transition-all duration-700'}>
              <header>
                <Navigation isAuthedUser={this.state.authedUser} logOut={this.onLogout}/>
              </header>
              <main className="w-screen min-h-screen flex justify-center items-center">
                <Routes>
                  <Route path="/" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/*" element={ <Navigate to="/" /> } />
                </Routes>
              </main>
            </div>
          </Provider>
        )
      } else {
        return (
          <Provider value={this.state.context}>
            <div className={ (this.state.context.theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white') + ' transition-all duration-700'}>
              <header>
                <Navigation isAuthedUser={this.state.authedUser} logOut={this.onLogout}/>
              </header>
              <main className="w-screen min-h-screen md:pl-64 pt-20">
                <Routes>
                  <Route path="/" element={<DashboardPage userData={this.state.authedUser}/>} />
                  <Route path="/notes/active" element={<Notes/>}/>
                  <Route path="/notes/active/add" element={<AddNotes/>}/>
                  <Route path="/notes/active/:id" element={<DetailNotes/>}/>
                  <Route path="/notes/archive" element={<Notes/>}/>
                  <Route path="/notes/archive/:id" element={<DetailNotes/>}/>
                  <Route path="/*" element={<NotFoundPage/>} />
                </Routes>
              </main>
            </div>
          </Provider>
        );
      }
    }
  }
}

export default App
