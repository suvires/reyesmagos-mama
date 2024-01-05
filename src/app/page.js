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
          <p>Haremos como que no hemos visto nada... ¡Podéis volver a intentarlo!</p>
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
            <h1>Madrid desde las alturas en la mejor terraza</h1>
            <p>Vale por una visita al 360º Rooftop Bar del Hotel Riu Madrid Plaza España.</p>
            <p>La visita incluye la subida a la terraza y disfrutar de las impactantes vistas con una consumición.</p>
            <button>Reiniciar</button>
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
          <p>Estáis un pasito más cerca de recibir vuestro regalo.</p>
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
          <p>A continuación, cada uno de SS.MM. os vamos a hacer 3 preguntas.</p>
          <p>Si las acertáis todas, ¡recibiréis vuestro regalo!; si no, carbón...</p>
          <p>¿Estáis preparados?</p>
          <button className="start" onClick={() => setStep(step + 1)}>Comenzar</button>
        </div>
      )}
      {step === 1 && (
        <div className="step">
          <h1>Ramillete de jazmines en forma de bola</h1>
          <ul>
            <li onClick={() => setError(true)}>Espeto</li>
            <li onClick={() => setRight(true)}>Biznaga</li>
            <li onClick={() => setError(true)}>Cenachero</li>
          </ul>
        </div>
      )}
      {step === 2 && (
        <div className="step">
          <h1>Mítico delantero malagueño del Real Madrid</h1>
          <ul>
            <li onClick={() => setError(true)}>Jaimito</li>
            <li onClick={() => setError(true)}>Jorgito</li>
            <li onClick={() => setRight(true)}>Juanito</li>
          </ul>
        </div>
      )}
      {step === 3 && (
        <div className="step">
          <h1>Típica sopa malagueña hecha con mayonesa</h1>
          <ul>
            <li onClick={() => setError(true)}>Pipirrana</li>
            <li onClick={() => setRight(true) }>Gazpachuelo</li>
            <li onClick={() => setError(true)}>Porra</li>
          </ul>
        </div>
      )}
    </main>
  )
}
