import Image from "next/image";
import React from "react";

import NotFoundImg from "../../public/notFound.png";

const NotFound = () => {
  return (
    <section className="relative h-[600px] w-full mt-[5vh]">
      <Image
        src={NotFoundImg}
        alt="Beautiful vacation destination"
        // fill
        height={600}
        width={1600}
        className="object-cover brightness-75"
        priority
      />
    </section>
  );
};

export default NotFound;
