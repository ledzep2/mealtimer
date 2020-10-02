import React from "react";
import "./styles.css";

function t(s) {
  if (s > 60) {
    return (
      <>
        <span className="number">{Math.trunc(s / 60)}</span>
        <span className="unit">m</span>
        <span className="number">{s % 60}</span>
        <span className="unit">s</span>
      </>
    );
  }
  return (
    <>
      <span className="number">{s % 60}</span>
      <span className="unit">s</span>
    </>
  );
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.setState({ now: 0, total: 30 * 60, elapsed: 0, remaining: 0 });
  }

  startCounting(total) {
    let now = new Date().getTime();
    this.setState({ start: now, total: total * 60, now });

    this.timer = setInterval(() => {
      let now = new Date().getTime();
      let elapsed = Math.trunc((this.state.now - this.state.start) / 1000);
      this.setState({
        now,
        elapsed,
        remaining: this.state.total - elapsed
      });
    }, 1000);
  }

  stopCounting() {
    clearInterval(this.timer);
    this.timer = undefined;
    this.setState({});
  }

  render() {
    return (
      <div className="App">
        <h1>Meal Timer 1.0</h1>
        <div style={{ display: this.state.remaining >= 0 ? "flex" : "none" }}>
          <div style={{ flex: 1, color: "green" }}>
            {t(this.state.remaining)}
          </div>
        </div>
        <div style={{ display: this.state.remaining >= 0 ? "none" : "flex" }}>
          <div style={{ flex: 1, color: "blue" }}>
            {t(-this.state.remaining)}
          </div>
          <div style={{ flex: 1, color: "red" }}>
            <span className="number">
              {Math.trunc(-this.state.remaining / 60)}
            </span>
            <span className="">Maths Questions</span>
          </div>
        </div>

        <button
          style={{ display: !this.timer ? "" : "none" }}
          onClick={() => this.startCounting(20)}
        >
          Start Breakfast
        </button>
        <button
          style={{ display: !this.timer ? "" : "none" }}
          onClick={() => this.startCounting(30)}
        >
          Start Lunch/Dinner
        </button>
        <button
          style={{ display: this.timer ? "" : "none" }}
          onClick={() => this.stopCounting()}
        >
          Stop
        </button>
      </div>
    );
  }
}
