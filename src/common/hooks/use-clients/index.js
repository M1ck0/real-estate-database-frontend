import { useEffect, useState } from "react";

import { supabase } from "client";

const useClients = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data: clients, error } = await supabase
        .from("clients")
        .select("*, client_preferences(*, location(*)), agent(*)");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(
        clients?.map((item) => ({
          ...item,
          client_preferences: item?.client_preferences[0],
        })),
      );
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
