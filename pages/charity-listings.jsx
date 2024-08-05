import React, { useState, useEffect } from "react";
import { WebLayout } from "./layout";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useQuery } from "react-query";

export default function CharityListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharities, setFilteredCharities] = useState([]);

  // Fetch charity list from API
  const fetchCharityList = async () => {
    try {
      const res = await axios.get("/api/getCharity");
      <h1>Charr</h1>
      console.log("Charity data received:", res.data); // Log the response data
      return res.data.charities; // Return charities directly
    } catch (error) {
      console.error("Error fetching charity list:", error);
      throw new Error("Failed to fetch charity list");
    }
  };

  const { data, isLoading } = useQuery("charity-list", fetchCharityList);

  useEffect(() => {
    if (data) {
      setFilteredCharities(
        data.filter((charity) =>
          charity.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [data, searchTerm]);

  return (
    <div>
      <Head>
        <title>Gift Right | Charity Listing</title>
      </Head>

      <WebLayout>
        <section className="p-7 h-full min-h-screen">
          <div className="mb-10">
            <input
              type="text"
              name="search"
              id="search"
              className="rounded-full p-2 border border-white shadow-2xl w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br/>
          </div>

          {isLoading ? (
            <div className="p-3 text-center font-semibold text-2xl">
              Loading...
            </div>
          ) : (
            <>
            <div className="font-bold font-weight-600 text-3xl p-3">Charities</div>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-2">
              
              {filteredCharities.length === 0 ? (
                <div className="text-red-500 text-center py-4 text-2xl font-semibold">
                  No Charities Found!
                </div>
              ) : (
                filteredCharities.map((item, index) => (
                  <div
                    className="px-3 py-7 rounded-md shadow-2xl flex justify-start space-x-3"
                    key={index}
                  >
                    
                    <div className="flex items-center">
                      <div className="size-[80px] shadow-2xl p-5 rounded-full flex items-center justify-center">
                        <img
                          className="w-full h-full rounded-md"
                          src={`/charity/${item.imgName || item.img_name}`} // Ensure image path
                          alt="charity-icon"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2">
                        <h2 className="text-xl font-semibold capitalize">
                          {item.name}
                        </h2>
                      </div>

                      <Link href={`/charity-details/${item.id}`}>
                        <button
                          type="button"
                          className="py-1 px-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-black text-sm font-semibold"
                        >
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            </>
          )}
        </section>
      </WebLayout>
    </div>
  );
}
