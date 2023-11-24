"use client";

import AddressHomepageForm from "@/components/forms/address-homepage";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grid md:grid-cols-2 min-h-screen">
        <div className="bg-card flex flex-1">
          <div className="flex flex-col gap-4 justify-center p-6">
            <div>
              <h1 className="tracking-tight text-4xl lg:text-5xl font-extrabold">
                The dark kitchen
              </h1>
              <h2 className="text-muted-foreground">
                Vos restaurants de quartier à portée de main
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <AddressHomepageForm onSubmit={(fv) => console.log(fv)} />
            </div>
            <p>ou</p>
            <div className="flex items-center gap-2">
              <Button aria-describedby="geolocate" variant="secondary">
                <MapPin className="text-primary" />
              </Button>
              <div>
                <p id="geolocate">Utilisez votre position actuelle</p>
                <p className="text-xs text-muted-foreground">
                  Votre navigateur peut vous demander l&apos;autorisation pour
                  utiliser votre position
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary hidden md:flex flex-1 justify-center items-center">
          <Image
            src="/pictures/homepage-illustration.png"
            width={425}
            height={340}
            alt=""
          />
        </div>
      </div>
    </main>
  );
}
