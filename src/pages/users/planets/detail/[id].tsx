import type { NextPage } from "next";
import Container from "../../../../components/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { timeAgo } from "helper/waktu";
import { wishList } from "model/whistlist";
import { useStoreWishList } from "store/wishlist";
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading';
import style from '../../../../styles/LoadingScreen.module.css';



const detailPlanet: NextPage = () => {
    const [planet, setPlanet] = useState<wishList>({name : "", climate : "", createdDate : "", population : ""});
    const {addWishList, wishlists} = useStoreWishList();
    const {query, isReady} = useRouter();
    const idRouter = query.id;
    const [isLoading, setIsLoading] = useState(false);
    


    const detailPlanets = async () => {
        try {
            setIsLoading(true);
            const res =  await axios.get(`https://swapi.dev/api/planets/${idRouter}`);
            setPlanet({createdDate : res.data.created, name : res.data.name, climate : res.data.climate, population : res.data.population});
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        if(isReady) {

            detailPlanets();
        }
    },[isReady]);

    const addWish = (plane: string) => {
        let isExist:boolean = false;
        for(let i=0; i < wishlists.length; i++) {
            if(wishlists[i].name === plane) {
                isExist = true;
                break;
            }
        }

        if(isExist) {
            Swal.fire({
                title : "Oops !!",
                text : `Data ini sudah ada di WishList`,
                icon : "error",
                timer : 2000
             });
        } else {
            addWishList(planet.name, planet.climate, planet.createdDate, planet.population);
            Swal.fire({
                title : "Yeee !!",
                text : `Data ini di tambahkan`,
                icon : "success",
                timer : 2000
             });
        }
    }



  return (
    <Container title="Customers">

        {
            isLoading ? (
                <div className={style.LoadingScreen}>
                    <ReactLoading type={"bars"} color="red" height={30} width={30}/>
                </div>
            ) : (
                <>
                     <div className="py-4 flex justify-center">
                        <div className="block p-6 max-w-sm bg-green-600 rounded-lg border border-gray-200 shadow-md">
                            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Name  : {planet.name}</h1>
                            <p className="font-normal text-white">Climate : {planet.climate}</p>
                            <p className="font-normal text-white">Population : {planet.population}</p>
                            <h1>Created  {timeAgo(planet.createdDate)}</h1>
                        </div>
                    </div>
                    <button className="inline-block px-5 py-2 mx-auto text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-0" onClick={() => addWish(planet.name)}>add to wishlist</button>
                </>
            )
        }
        
       

    </Container>
  );
};

export default detailPlanet;
