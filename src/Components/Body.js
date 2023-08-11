import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { swiggy_api_URL } from "./constant";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
function filterData(searchText, allRestaurants) {
  const filteredData = allRestaurants.filter((restaurant) => {
    return restaurant?.name
      .replace(/'/g, "")
      .toLowerCase()
      .includes(searchText.replace(/'/g, "").toLowerCase());
  });
  return filteredData;
}

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(swiggy_api_URL);
    const json = await data.json();
    const restaurantData =
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
        (restaurant) => restaurant.info
      );
    setAllRestaurants(restaurantData);
    setFilteredRestaurants(restaurantData);
  }

  const handleSearch = () => {
    const data = filterData(searchText, allRestaurants);

    setFilteredRestaurants(data);

    setDataNotFound(data?.length === 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="search flex items-center justify-center mt-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 w-2/5 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        {dataNotFound ? (
          <h1>Sorry, No match found for {searchText}</h1>
        ) : allRestaurants?.length === 0 ? (
          <Shimmer />
        ) : filteredRestaurants ? (
          filteredRestaurants.map((restaurant) => (
            <div className="w-80 p-4 mx-4 my-2 transform transition-transform hover:scale-110">
              <Link to={"/restaurant/" + restaurant?.id}>
                <RestaurantCard {...restaurant} key={restaurant?.id} />
              </Link>
            </div>
          ))
        ) : (
          <Shimmer/>
        )}
      </div>
    </>
  );
};

export default Body;
