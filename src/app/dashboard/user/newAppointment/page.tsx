"use client";
import React, { useState, useCallback, useMemo } from "react";

import DrawerComponent from "../components/DrawerComponent";
import DoctorCard from "@/app/therapist/components/DoctorCard";
import FetchTherapist from "@/hooks/FetchTherapist";
import useTherapistStore from "@/store/Therapist";

function NewAppointment() {
  const [open, setOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapists | null>(null);

  // Memoized therapists data to avoid re-computation
  const therapists = useTherapistStore((state) => state.data);

  // Combined function for closing the drawer
  const closeDrawer = useCallback(() => {
    setOpen(false);
    setSelectedTherapist(null);
  }, []);

  // Handler for opening the drawer
  const openDrawer = useCallback((data: Therapists) => {
    setOpen(true);
    setSelectedTherapist(data);
  }, []);

  // Memoize therapists map for optimization
  const therapistCards = useMemo(() => {
	console.log("rendering doctor card")
    return therapists.map((therapist, index) => (
      <DoctorCard user={therapist} key={index} onclickFunction={openDrawer} />
    ));
  }, [therapists]);

  return (
    <div>
      <DrawerComponent open={open} setOpen={closeDrawer} user={selectedTherapist} />
      <FetchTherapist>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
          {therapistCards}
        </div>
      </FetchTherapist>
    </div>
  );
}

export default React.memo(NewAppointment);
