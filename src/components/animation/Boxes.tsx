
import { useSprings, animated, SpringValue } from "@react-spring/web";
import { useEffect, useRef } from "react";

const Boxes = ({
  elements,
}: {
  elements: {
    newX: number;
    newY: number;
    time: number;
    proccessID: number;
    progress: boolean;
  }[];
}) => {
  console.log("Elements:", elements);
  
  const queue = elements.map((element) => ({
    ...element,
    modify: false // Nuevo atributo
  }));

  const springsRef = useRef<SpringValue[]>([]);

  const restartAnimations = () => {
    springsRef.current.forEach((spring) => spring.cancel());
    // Configurar nuevas animaciones...
  };

  const springs = useSprings(
    queue.length,
    queue.map((element, index) => {
      console.log("index:", index);
      console.log("adaddd:", element);
      if (queue.length === 0) return {}; // Si no hay elemento, retornar un objeto vacío

      return {
        
        from: { x: 0, y: 50, backgroundColor: "blue", rotate: 0, opacity: 0 },
        
        to:  
          async (next) => {
                        
              
              try {
                await next({ x: 136, y: 50, backgroundColor: "orange",opacity: 1 , delay: index * 2000  });
                await next({
                  x: 136,
                  y: 400 - element.newY,
                  backgroundColor: "orange",
                  config: { duration: 500, delay: index * 2000 },
                });

              }
              catch (err) {
                console.log("Error durante la asdfasdfasdf:", err);
              }
              
              try {
                await next({
                  x: 136,
                  y: 400 - element.newY,
                  backgroundColor: "pink",
                  config: { duration: 500 },
                });
              } catch (error) {
                // Manejar la excepción aquí
                console.log("Error durante la animación:", error);
              }
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
        
              if (element.progress) {
                // element.modify = true;
                //a la izquierda
                

                for (let t = 500; t >= 136; t -= 10) {
                  const x = t;
                  const y = 0.00407 * Math.pow(t - 247.196, 2);

                  await next({
                    x,
                    y,
                    backgroundColor: "orange",
                    config: { duration: 2 }, // Duración del bucle
                  });
                }
                await next({
                  
                  opacity: 0,
                });
                
              } else {
                //a la derecha proceso terminado
                await next({
                  x: 950,
                  y: 100 + element.newY,
                  backgroundColor: "bg-green-900",
                  config: { duration: 500 },
                  rotate: 360,
                });
        
              }
            
          }  
          
        ,
        config: { duration: 3000 },
        leave:{opacity: 0},
        onRest: (): { display: string } => {
          return { display: 'none' };
        }
      };
    })
  );

  return (
    <div>
      {queue.map((proccess, index) => (
        <animated.div key={index} style={springs[index]} className="absolute text-center flex items-center justify-center">
          <p className="text-center items-center justify-center w-12 h-8 border-[1px] border-black">
            {proccess.proccessID}
          </p>
        </animated.div>
      ))}
    </div>
  );
};

export default Boxes;
