import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <section className="relative h-[600px] w-full mt-[5vh]">
      <Image
        src="/notFound.png?height=600&width=1600"
        alt="Beautiful vacation destination"
        fill
        className="object-cover brightness-75"
        priority
      />
    </section>
  );
};

export default NotFound;
