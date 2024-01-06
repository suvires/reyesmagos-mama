"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function Home() {
  const { width, height } = useWindowSize()
  const [step, setStep] = useState(0)
  const [error, setError] = useState(false)
  const [right, setRight] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeConfetti, setFadeConfetti] = useState(false);

  const startConfetti = () => {
    setShowConfetti(true);
    setFadeConfetti(false);

    const fadeOutTimer = setTimeout(() => {
      setFadeConfetti(true);
    }, 4500); // Comienza a desvanecerse después de 4.5 segundos

    const hideTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Desaparece completamente después de 5 segundos

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  };

  useEffect(() => {
    if (step === 3 && right) {
      startConfetti();
    }
  }, [step, right]);

  if(error) {
    return (
      <main>
        <div className="step">
          <h1>¡Oh!</h1>
          <p>Haremos como que no hemos visto nada... ¡Puedes volver a intentarlo!</p>
          <button className="retry" onClick={() => setError(false)}>Reintentar</button>
        </div>
      </main>
    )
  }

  if(right && step === 3) {
    return (
      <>
        {showConfetti &&
          <div style={{ opacity: fadeConfetti ? 0 : 1, transition: 'opacity 0.5s' }}>
            <Confetti
              width={width}
              height={height}
            />
          </div>
        }
        <main>
          <div className="step">
            <h1>Recorre Mallorca para conocer los mejores rincones de la isla</h1>
            <p>Vale por el alquiler de un coche durante 4-5 días de tus vacaciones en Mallorca.</p>
            <button onClick={() => { setRight(false); setStep(0)}}>Reiniciar</button>
          </div>
        </main>
      </>
    )
  }

  if(right) {
    return (
      <main>
        <div className="step">
          <h1>¡Genial!</h1>
          <p>Estás un pasito más cerca de recibir tu regalo.</p>
          <button className="retry" onClick={() => { setRight(false); setStep(step+1)}}>Continuar</button>
        </div>
      </main>
    )
  }

  return (
    <main>
      {step === 0 && (
        <div className="step">
          <h1>¡Han venido los Reyes!</h1>
          <p>A continuación, cada uno de SS.MM. te hará 3 preguntas.</p>
          <p>Si las aciertas todas, ¡recibirás tu regalo! De lo contrario: carbón...</p>
          <p>¿Estás preparada?</p>
          <button className="start" onClick={() => setStep(step + 1)}>Comenzar</button>
        </div>
      )}
      {step === 1 && (
        <div className="step">
          <h1>Bollo típico de Mallorca</h1>
          <ul>
            <li onClick={() => setError(true)}>Bollet</li>
            <li onClick={() => setError(true)}>Mallorquina</li>
            <li onClick={() => setRight(true)}>Ensaimada</li>
          </ul>
        </div>
      )}
      {step === 2 && (
        <div className="step">
          <h1>Estilo arquitectónico de la catedral de Palma</h1>
          <ul>
            <li onClick={() => setError(true)}>Románico</li>
            <li onClick={() => setRight(true)}>Gótico</li>
            <li onClick={() => setError(true)}>Barroco</li>
          </ul>
        </div>

      )}
      {step === 3 && (
        <div className="step">
          <h1>Comida típica de Mallorca formada por varias tapas en un mismo plato</h1>
          <ul>
            <li onClick={() => setError(true)}>Revueltó</li>
            <li onClick={() => setRight(true) }>Variat</li>
            <li onClick={() => setError(true)}>Mezclat</li>
          </ul>
        </div>
      )}
    </main>
  )
}
