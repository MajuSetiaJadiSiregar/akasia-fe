import type { NextPage } from "next";
import Container from "../../../components/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { dataPlanets } from "model/planets";
import ReactLoading from 'react-loading';
import style from '../../../styles/LoadingScreen.module.css';





const Planets: NextPage = () => {

  const router = useRouter();
  const [planets, setDataPlanets] = useState<dataPlanets[]>([]);
  const [prev, setPrev] = useState<string>("start");
  const [next, setNext] = useState<string>("start");
  const [isLoading, setisLoading] = useState(false);

  const readPlanets = async (endpoint:string = "https://swapi.dev/api/planets") => {
    try {
      setisLoading(true);
      const res = await axios.get(endpoint);
      setDataPlanets(res.data.results);
      
      if(res.data.previous === null) {
        setPrev("start");
      } else {
        setPrev(res.data.previous);
        
      }

      if(res.data.next === null) {
        setNext('start');
      } else {
        setNext(res.data.next);
      }
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  }

  const onClickNext = () => {
    readPlanets(next)
  }

  const onClickPrev = () => {
    readPlanets(prev);
  }

  const detailPlanet = (id:number) => {
    try {
       router.push(`/users/planets/detail/${id}`);
    } catch (error) {
       console.log(error);
    }
 }

  useEffect(() => {
    readPlanets();
  },[]);
  return (
    <Container title="Customers">
      {
        isLoading ? (
          <div className={style.LoadingScreen}>
            <ReactLoading type={"bars"} color="red" height={30} width={30}/>
          </div>
        ) : (
          <>
          
          <div className="grid lg:grid-cols-4">
            {
              planets.map((item, index) => {
                return (
                  <div key={index} className="p-4 max-w-sm">
                    <div className="flex rounded-lg h-full bg-teal-400 p-8 flex-col">
                      <h2 className="text-white text-lg font-medium">Name : {item.name}</h2>
                      <p className="text-white text-lg font-medium">Gravity : {item.gravity}</p>
                      <p className="text-white text-lg font-medium">Diameter : {item.diameter}</p>
            
                      <div className="flex flex-col items-center flex-grow">
                        <button onClick={() => detailPlanet(index+1)} className="mt-3 text-black hover:text-blue-600 inline-flex items-center">Detail</button>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>

          <div className="mt-3">
          {
          prev !== "start" ? (
              <button onClick={onClickPrev} className="mr-2 inline-block py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700 rounded-xl">Prev</button>
            ) : <div></div>
          }

          {
          next !== "start" ? (
              <button onClick={onClickNext} className="inline-block py-4 text-xl text-white bg-gray-800 px-7 hover:bg-gray-700 rounded-xl">Next</button>
            ) : <div></div>
          }
          </div>

        </>
        )
      }


      
       

      

  
    </Container>
  );
};

export default Planets;
