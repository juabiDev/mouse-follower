import { useEffect, useState } from "react"

const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // pointer move
  useEffect(() => {
    console.log("effect", { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event; // posicion de nuestro puntero en la pantalla
      setPosition({ x: clientX, y: clientY })
    }

    if(enabled) {
      window.addEventListener("pointermove", handleMove)
    }

    // limpiamos el useEffect y las suscripciones de eventos
    // se ejecuta cuando el componente se desmonta
    // tambien se ejecuta cuando cambian las dependencias

    return () => { // cleanup method
      console.log("cleanup", { enabled })
      window.removeEventListener("pointermove", handleMove)
    }

  }, [enabled]);

  // change body className
  useEffect(() => { 
    document.body.classList.toggle("no-cursor", enabled);

    return () => { // cleanup method
      document.body.classList.remove("no-cursor");
    }

  }, [enabled]);


  return (
    <>
      <div style={{
        position: "absolute",
        backgroundColor: "#000",
        borderRadius: "50%",
        opacity: 0.8,
        pointerEvents: "none",
        left: -40,
        top: -40,
        width: 60,
        height: 60,
        border: "2px solid #fff",
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <h1>MouseFollower</h1>

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"}
      </button>
    </>
  )
}

function App() {
  
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
