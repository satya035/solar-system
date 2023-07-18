
import React, { useRef, useEffect } from 'react';
import './App.css';

const SolarSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const sun = { x: canvas.width / 2, y: canvas.height / 2, radius: 30, color: '#FFD700' };
    const planets = [
      { name: 'Mercury', distance: 100, radius: 5, color: '#CD5C5C', angle: 0, speed: 0.01 },
      { name: 'Venus', distance: 160, radius: 8, color: '#FF4500', angle: 0, speed: 0.008 },
      { name: 'Earth', distance: 220, radius: 10, color: '#00BFFF', angle: 0, speed: 0.006 },
      { name: 'Mars', distance: 290, radius: 7, color: '#9932CC', angle: 0, speed: 0.004 },
      { name: 'Jupiter', distance: 360, radius: 22, color: '#FFD700', angle: 0, speed: 0.002 },
    ];
    const moon = { distance: 25, radius: 5, color: '#A9A9A9', angle: 0, speed: 0.04 };

    const drawCelestialBody = (body) => {
      context.beginPath();
      context.arc(body.x, body.y, body.radius, 0, 2 * Math.PI);
      context.fillStyle = body.color;
      context.fill();
      context.closePath();
    };

    const drawTrajectory = (body) => {
      context.beginPath();
      context.arc(sun.x, sun.y, body.distance, 0, 2 * Math.PI);
      context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      context.stroke();
      context.closePath();
    };

    const drawSolarSystem = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sun
      drawCelestialBody(sun);

      // Draw planets and their trajectories
      planets.forEach((planet) => {
        planet.x = sun.x + planet.distance * Math.cos(planet.angle);
        planet.y = sun.y + planet.distance * Math.sin(planet.angle);
        drawCelestialBody(planet);
        drawTrajectory(planet);
        planet.angle += planet.speed;
      });

      // Draw moon and its trajectory
      moon.x = planets[2].x + moon.distance * Math.cos(moon.angle);
      moon.y = planets[2].y + moon.distance * Math.sin(moon.angle);
      drawCelestialBody(moon);
      drawTrajectory(moon);
      moon.angle += moon.speed;

      requestAnimationFrame(drawSolarSystem);
    };

    drawSolarSystem();
  }, []);

  return <canvas ref={canvasRef} width={900} height={900} />;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Solar System Simulation</h1>
        <SolarSystem />
      </header>
    </div>
  );
}

export default App;
