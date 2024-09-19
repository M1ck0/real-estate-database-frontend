import { useEffect, useState } from "react";

import { supabase } from "client";

const useClientById = (id) => {
  const [data, setData] = useState();

  const getData = async () => {
    const { data: clientPreferences } = await supabase
      .from("client_preferences")
      .select("*, preferred_location(*)")
      .eq("client", id)
      .single();

    const { data: client } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    setData({ ...clientPreferences, client });
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return { data, getData };
};

export default useClientById;
