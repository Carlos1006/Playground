import { CSSProperties, FC, useEffect, useState } from "react";
import css from "./styles/main.module.scss";
import { getColorAtPercentage } from "./utils";

interface IAudioFrequecies {
  scale?: number;
}

const AudioFrequecies: FC<IAudioFrequecies> = ({
  scale = 1,
}: IAudioFrequecies) => {
  const [frequencies, setFrequencies] = useState<Uint8Array>(new Uint8Array(0));

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let source;
    let rafId: number;

    const handleSuccess = (stream: MediaStream): void => {
      // Crear el contexto de audio y el nodo del analizador
      const win = window as unknown as { webkitAudioContext: AudioContext };
      audioContext = new (window.AudioContext ?? win.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount; // Mitad de fftSize
      dataArray = new Uint8Array(bufferLength);

      // Conectar el micrófono al contexto de audio
      source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Función para obtener frecuencias y actualizar el estado
      const updateFrequencies = (): void => {
        analyser.getByteFrequencyData(dataArray);
        setFrequencies([...dataArray] as unknown as Uint8Array); // Actualizar el estado con las frecuencias

        // Volver a llamar a la función en el próximo frame
        rafId = requestAnimationFrame(updateFrequencies);
      };

      updateFrequencies(); // Iniciar el ciclo de actualización
    };

    // Solicitar acceso al micrófono
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(handleSuccess)
      .catch((err) => console.error("Error al acceder al micrófono:", err));

    // Limpiar el contexto de audio cuando el componente se desmonta
    return () => {
      if (audioContext) {
        audioContext.close();
      }
      cancelAnimationFrame(rafId); // Detener la actualización de frecuencias
    };
  }, []); // Se ejecuta solo al montar y desmontar el componente

  const step = 100 / frequencies.length;
  const frequenciesNum: number[] = Array.from(frequencies);

  return (
    <div className={css.main} style={{ transform: `scale(${scale})` }}>
      {frequenciesNum.map((_, i) => {
        const color = getColorAtPercentage(i * step);
        const shadow = getColorAtPercentage(i * step, 0.1);
        const value = 100 + frequenciesNum[i];
        return (
          <div
            key={i}
            className={css.freq}
            style={
              {
                "--bg": color,
                "--shadow": shadow,
                height: `${value}px`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
};

export default AudioFrequecies;
