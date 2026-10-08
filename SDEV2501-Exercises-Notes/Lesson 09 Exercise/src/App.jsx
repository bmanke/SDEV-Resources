import './App.css'
import PageLayout from "./components/layout/PageLayout.jsx";
import Header from "./components/Header.jsx";
import Users from "./components/Users.jsx";
import Posts from "./components/Posts.jsx";

function App() {

  return (
    <PageLayout
        header={<Header tagline="JSONPlaceholder Dashboard"/>}
        left={<Users/>}
        right={<Posts/>}
    />
  )
}

export default App
