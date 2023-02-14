import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

interface Torta{
  id: number;
  nev: string;
  ar: number;
}
interface TortaResponse{
  Torta: Torta[];
}
interface State{
  Torta: Torta[];
  nevInput: string;
  arInput: number;
}
class App extends Component<{}, State>{
  constructor(props: {}){
    super(props);
    this.state = {
      nevInput: '',
      arInput: 0,
      Torta:[]
    }
  }
    async loadTortaok() {
      let response = await fetch('http://localhost:3500/TortaData');
      let data = await response.json() as Torta[];
      console.log(data);
      this.setState({
        Torta: data, 
      })
    }
    componentDidMount() {
      this.loadTortaok();
    }
    handleUpload = async () => {
      const { nevInput, arInput } = this.state;
      if(nevInput.trim() === '' || arInput < 1 ){
        return;
      }
      const dbData = {
          nev: nevInput,
          ar: arInput
      }
      let response = await fetch('http://localhost:3500/TortaData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dbData),
    });
    this.setState ({
      nevInput: '',
      arInput:0,
    });
    await this.loadTortaok();
    };
    render() {
      console.log(this.state);
      const {nevInput, arInput} = this.state;
      return <div>
        <h2>Torták:</h2>
        Név: <input type="text" value={nevInput} onChange={e => this.setState({ nevInput: e.currentTarget.value})} /> <br />
        ar: <input type="number" value={arInput} onChange={e => this.setState({ arInput: parseInt(e.currentTarget.value) })}/> <br />
        <button onClick={this.handleUpload}>Hozzáaddás</button> <br />
        <br />
        <h2>Eddigi tortáink:</h2>
      <table>
        <td>{
            this.state.Torta.map(Torta => 
              <tr>{Torta.nev}</tr>
            )
          }</td>
          <td>{
            this.state.Torta.map(Torta => 
              <tr> {Torta.ar} Ft</tr>
            )
          }</td>
          </table>  
      </div>
}
}
export default App;
