import { useEffect, useState } from "react";

import { supabase } from "client";

const usePropertyById = (id) => {
  const [data, setData] = useState();

  const getData = async () => {
    const { data: property, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    setData(property);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return { data, getData };
};

export default usePropertyById;
