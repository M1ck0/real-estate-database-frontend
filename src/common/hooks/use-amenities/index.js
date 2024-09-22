import { useEffect, useState } from "react";

import { supabase } from "client";

const useAmenities = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data: amenities, error } = await supabase
        .from("amenities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(amenities);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData(); // Fetch data on initial load
  }, []);

  return { data, getData };
};

export default useAmenities;
