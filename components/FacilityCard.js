import React from "react";

//facility component
export default function FacilityCard({ facility, onFacilityOptionSelect }) {
  return (
    <div
      key={facility.facility_id}
      className="mb-4 rounded-md bg-gray-700 text-white"
    >
      <div className="p-2 border-b border-gray-400 border-solid">
        <h4>{facility.name}</h4>
      </div>
      <div className="p-2 h-20 flex flex-col flex-wrap">
        {facility.options.map((option) => (
          <div key={option.id} className="mr-4">
            <span>
              <input
                type="checkbox"
                className="text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={option.isSelected}
                disabled={option.isDisabled}
                onChange={() =>
                  onFacilityOptionSelect(facility.facility_id, option.id)
                }
              />
              <label htmlFor="checkbox" className="ml-1">
                {option.name}
              </label>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
