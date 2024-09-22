import { useEffect, useState } from "react";

import { supabase } from "client";

const useLocations = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data: locations, error } = await supabase
        .from("locations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(locations);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData(); // Fetch data on initial load
  }, []);

  return { data, getData };
};

export default useLocations;
