import { useEffect, useState } from "react";

import { supabase } from "client";

const useClients = () => {
  const [data, setData] = useState([]);

  const getData = async (filters) => {
    try {
      const { data: clients, error } = await supabase.from("clients").select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(clients);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData(); // Fetch data on initial load
  }, []);

  return { data, getData };
};

export default useClients;
