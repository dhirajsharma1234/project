"use client";

import { getFacilitiesAndExclusions } from "@/API/API";
import FacilityCard from "@/components/FacilityCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [facilities, setFacilities] = useState([]);
  const [exclusions, setExclusions] = useState([]);

  useEffect(() => {
    getFacilitiesAndExclusions()
      .then((res) => {
        setFacilities(res.data.facilities);
        setExclusions(res.data.exclusions);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const mutateExclusions = (facilities = []) => {
    return facilities.map((facility) => ({
      ...facility,
      options: facility.options.map((option) => {
        const isOptionDisabled = exclusions.some(([criteria, exclusion]) => {
          const isSelected = facilities.some((facility) =>
            facility.facility_id === criteria.facility_id
              ? facility.options.some(
                  (option) =>
                    option.id === criteria.options_id && option.isSelected
                )
              : false
          );
          if (!isSelected) return false;

          if (
            facility.facility_id === exclusion.facility_id &&
            option.id === exclusion.options_id
          ) {
            return true;
          } else return false;
        });

        if (isOptionDisabled) {
          return { ...option, isDisabled: true, isSelected: false };
        }
        return { ...option, isDisabled: false, isSelected: option.isSelected };
      }),
    }));
  };

  const onFacilityOptionSelect = (facilityId, optionId) => {
    let draftFacilities = facilities.map((facility) =>
      facility.facility_id === facilityId
        ? {
            ...facility,
            options: facility.options.map((option) =>
              option.id === optionId
                ? { ...option, isSelected: true }
                : { ...option, isSelected: false }
            ),
          }
        : facility
    );
    draftFacilities = mutateExclusions(draftFacilities);
    setFacilities(draftFacilities);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        {isLoading ? <p>Loading...</p> : null}
        {isError ? <p>Something went wrong.</p> : null}

        {!isLoading && !isError ? (
          <div>
            <div className="w-[50vw]">
              {facilities.map((facility) => (
                <FacilityCard
                  key={facility.facility_id}
                  facility={facility}
                  onFacilityOptionSelect={onFacilityOptionSelect}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
