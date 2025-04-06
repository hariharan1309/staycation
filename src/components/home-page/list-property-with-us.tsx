import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import RentImg from "../../../public/rent2.png";

const ListPropertyWithUs = () => {
  return (
    <>
      <div className="container px-4 md:px-6">
        <div className="rounded-lg bg-primary/5 p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                List Your Property With Us
              </h2>
              <p className="mb-6 text-muted-foreground">
                Join thousands of property owners who trust our platform to
                showcase their vacation rentals to millions of travelers
                worldwide.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/auth/signup/?type=host">Become a Host</Link>
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={RentImg}
                alt="Property owner"
                width={400}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPropertyWithUs;
