import { useEffect, useState } from "react";

import { supabase } from "client";

const usePropertyById = (id) => {
  const [data, setData] = useState();

  const getData = async () => {
    const { data: property, error } = await supabase
      .from("properties")
      .select(
        "*, location(id,name), property_amenities(amenity(id, name)), property_images(*)",
      )
      .eq("id", id)
      .single();

    setData({ ...property, images: property?.property_images?.[0]?.links });
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return { data, getData };
};

export default usePropertyById;
