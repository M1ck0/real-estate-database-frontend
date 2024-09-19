import { useEffect, useState } from "react";

import { supabase } from "client";

const useProperties = () => {
  const [data, setData] = useState([]);

  const getData = async (filters) => {
    try {
      const query = supabase.from("properties").select("*, locations(id,name)");

      // Conditionally apply filters if they exist
      if (filters?.name || filters?.name === "") {
        query.ilike("title", `%${filters?.name}%`);
      }

      // Always apply the ordering
      query.order("created_at", { ascending: false });

      // Execute the query with abort signal
      const { data: properties, error } = await query;

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(properties);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData(); // Fetch data on initial load
  }, []);

  return { data, getData };
};

export default useProperties;
