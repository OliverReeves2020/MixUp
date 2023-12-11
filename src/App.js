import logo from './logo.svg';
import './App.css';
import 'src/app/global.css'

import { Button } from "./components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "./components/ui/card";
import DemoPage from "./app/payments/page.tsx";

function App() {
  return (

    <main className="bg-background text-foreground">
      <header className="App-header ">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"

          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1 className={"text-2xl"}>lol</h1>
        <h1 className={"text-9xl text-red-500"}>hi</h1>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Button</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <DemoPage/>

          </CardContent>
        </Card>

      </header>
    </main>
  );
}

export default App;
