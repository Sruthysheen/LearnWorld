import React from 'react';

// Sample data array for courses
const courses = [
  {
    name: "Course 1",
    tutor: "Tutor 1",
    priceOriginal: "MVR 1000",
    priceSale: "MVR 700",
    image: "https://example.com/image1.jpg",
    rating: "4.5 Stars"
  },
  {
    name: "Course 2",
    tutor: "Tutor 2",
    priceOriginal: "MVR 1200",
    priceSale: "MVR 800",
    image: "https://example.com/image2.jpg",
    rating: "4.8 Stars"
  },
  {
    name: "Course 3",
    tutor: "Tutor 3",
    priceOriginal: "MVR 1100",
    priceSale: "MVR 650",
    image: "https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg?w=2000&t=st=1678041911~exp=1678042511~hmac=e4aa55e70f8c231d4d23832a611004f86eeb3b6ca067b3fa0c374ac78fe7aba6",
    rating: "4.9 Stars"
  },
  {
    name: "Course 4",
    tutor: "Tutor 4",
    priceOriginal: "MVR 900",
    priceSale: "MVR 600",
    image: "https://example.com/image4.jpg",
    rating: "4.7 Stars"
  },
  // Add more courses as needed
  {
    name: "Course 5",
    tutor: "Tutor 4",
    priceOriginal: "MVR 900",
    priceSale: "MVR 600",
    image: "https://example.com/image4.jpg",
    rating: "4.7 Stars"
  },
  {
    name: "Course 6",
    tutor: "Tutor 4",
    priceOriginal: "MVR 900",
    priceSale: "MVR 600",
    image: "https://example.com/image4.jpg",
    rating: "4.7 Stars"
  },
  {
    name: "Course 7",
    tutor: "Tutor 4",
    priceOriginal: "MVR 900",
    priceSale: "MVR 600",
    image: "https://example.com/image4.jpg",
    rating: "4.7 Stars"
  },
  {
    name: "Course 8",
    tutor: "Tutor 4",
    priceOriginal: "MVR 900",
    priceSale: "MVR 600",
    image: "https://example.com/image4.jpg",
    rating: "4.7 Stars"
  },
];

function RecommendedForyouCard() {
  return (
    <>
      <div className='mt-10 w-full h-10 flex justify-start items-center p-10 font-bold text-3xl text-sky-600'>
        Recommended For You
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-10 p-10 bg-gradient-to-br from-indigo-100 px-2">

        {/* Mapping over the courses array */}
        {courses.map((course, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">
              <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${course.image})` }}>
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-700 text-lg mb-1">
                  {course.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {course.tutor}
                </p>
                <div className="mt-3">
                  {course.rating}
                </div>
                <div className="flex mt-3 text-sm">
                  <p className="text-gray-400 line-through mr-2">
                    {course.priceOriginal}
                  </p>
                  <p className="font-bold text-green-500">
                    {course.priceSale}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default RecommendedForyouCard;
