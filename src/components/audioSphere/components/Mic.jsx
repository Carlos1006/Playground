import React, { useEffect, useState } from 'react';

const MicrophoneFrequencyAnalyzer = () => {
  const [frequencies, setFrequencies] = useState(new Uint8Array(0));

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let source;
    let rafId;

    const handleSuccess = (stream) => {
      // Crear el contexto de audio y el nodo del analizador
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount; // Mitad de fftSize
      dataArray = new Uint8Array(bufferLength);

      // Conectar el micrófono al contexto de audio
      source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Función para obtener frecuencias y actualizar el estado
      const updateFrequencies = () => {
        analyser.getByteFrequencyData(dataArray);
        setFrequencies([...dataArray]); // Actualizar el estado con las frecuencias

        // average
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        console.log(average);

        // Volver a llamar a la función en el próximo frame
        rafId = requestAnimationFrame(updateFrequencies);

      };

      // get average frequency
     

      updateFrequencies(); // Iniciar el ciclo de actualización
    };

    // Solicitar acceso al micrófono
    navigator.mediaDevices.getUserMedia({ audio: true })
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

  return (
    <div>
      <h1>Frecuencias del Micrófono</h1>
      <div style={{ display: 'flex' }}>
        {frequencies.map((freq, index) => (
          <div
            key={index}
            style={{
              width: '5px',
              height: `${freq}px`,
              backgroundColor: 'blue',
              margin: '1px'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MicrophoneFrequencyAnalyzer;