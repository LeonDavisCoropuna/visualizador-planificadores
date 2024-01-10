import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";
export const Test = ({
  newX,
  newY,
  time,
  proccessID,
  isInQueue,
}: {
  newX: number;
  newY: number;
  time: number;
  proccessID: number;
  isInQueue: boolean;
}) => {
  
  useEffect(() => {
    console.log("Component Test mounted with props:", {
      newX,
      newY,
      time,
      proccessID,
      isInQueue,
    });

    // Cleanup function (componentWillUnmount equivalent)
    return () => {
     
      console.log("Component Test unmounted");
    };
  }, []); 
  

  
  
  const [props, set] = useSpring(() => ({
    from: { x: 0, y: 50, backgroundColor: "blue", rotate: 0 },
    to: async (next) => {
      // Guardar el objeto creado en el estado
      

      await next({ x: 136, y: 50, backgroundColor: "orange" });
      await next({
        x: 136,
        y: 400 - newY,
        backgroundColor: "orange",
        config: { duration: 500 },
      });
      await next({
        x: 136,
        y: 400 - newY,
        backgroundColor: "pink",
        config: { duration: 500 + time },
      });

      for (let t = 136; t <= 500; t+=10) {
        const x = t;
        const y = -0.00242 * Math.pow(t - 278.1875, 2) + 448.8211;
        await next({
          x,
          y,
          backgroundColor: "green",
          config: { duration: 1 }, // Duración del bucle
        });
      }
      await next({
        x: 500,
        y: 220.2058,
        backgroundColor: "pink",
        config: { duration: 100 },
        rotate: 90,
      });
      await next({
        x: 500,
        y: 220.2058,
        backgroundColor: "pink",
        config: { duration: 100 },
        rotate: 180,
      });
      await next({
        x: 500,
        y: 220.2058,
        backgroundColor: "pink",
        config: { duration: 100 },
        rotate: 270,
      });
      await next({
        x: 500,
        y: 220.2058,
        backgroundColor: "pink",
        config: { duration: 100 },
        rotate: 360,
      });

      if (isInQueue) {
        //a la izquierda
        for (let t = 500; t >= 136; t-=10) {
          const x = t;
          const y = 0.00407 * Math.pow(t - 247.196, 2);

          await next({
            x,
            y,
            backgroundColor: "orange",
            config: { duration: 2 }, // Duración del bucle
          });
        }
       
        
      } else {
        //a la derecha proceso terminado
        await next({
          x: 950,
          y: 100 + newY,
          backgroundColor: "bg-green-900",
          config: { duration: 500 },
          rotate: 360,
        });

      }

    },
    config: { duration: 500},
    
    onRest: () => {
      // Manejar eventos después de que la animación haya finalizado
      if (isInQueue) {
        set({ opacity: 0 } as any); // Ocultar el componente después de la animación de salida
      }
    }
  }));

  

  return (
    <div>
      <animated.div
        style={props}
        className="absolute text-center flex items-center justify-center"
      >
        <p className="text-center items-center justify-center w-12 h-8 border-[1px] border-black">
          {proccessID}
        </p>
      </animated.div>
    </div>
  );
};
