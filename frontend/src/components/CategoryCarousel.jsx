import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="my-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-6">Explore by Category</h2>
            <Carousel className="w-full max-w-3xl mx-auto">
                <CarouselContent>
                {category.map((cat, index) => (
                    <CarouselItem
                    key={index}
                    className="basis-[95%] sm:basis-[9%] md:basis-1/3 lg:basis-1/4 flex justify-center"
                    >
                    <Button
                        onClick={() => searchJobHandler(cat)}
                        variant="outline"
                        className="rounded-full px-6 py-3 font-medium hover:bg-[#2563EB]/10 transition-all"
                    >
                        {cat}
                    </Button>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )
}

export default CategoryCarousel